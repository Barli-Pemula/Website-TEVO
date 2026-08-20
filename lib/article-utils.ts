export interface Birdep {
  id: string;
  name: string;
  code: string;
  slug?: string;
  unitType?: string;
  unitTypeLabel?: string;
  logoUrl?: string | null;
}

export interface Category {
  id?: string;
  name?: string;
  slug?: string;
}

export interface ContentJsonMark {
  type: string;
  attrs?: Record<string, any>;
}

export interface ContentJsonNode {
  type: string;
  attrs?: Record<string, any>;
  content?: ContentJsonNode[];
  marks?: ContentJsonMark[];
  text?: string;
}

export interface ContentJson {
  type: string;
  content?: ContentJsonNode[];
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  contentJson?: ContentJson | null;
  contentVersion?: number;
  coverUrl: string | null;
  authorName?: string | null;
  publishedAt: string | null;
  updatedAt?: string | null;
  birdeps: Birdep[];
  category?: Category | string | null;
}

/**
 * Format tanggal dalam format Bahasa Indonesia (contoh: 5 Agu 2026 atau 5 Agustus 2026)
 */
export function formatArticleDate(
  dateString: string | null | undefined,
  shortMonth: boolean = true
): string {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: shortMonth ? "short" : "long",
      year: "numeric",
      timeZone: "Asia/Jakarta",
    }).format(date);
  } catch {
    return "";
  }
}

/**
 * Mengambil nama kategori dengan aman dari berbagai format response backend
 */
export function getArticleCategory(category: Category | string | null | undefined): string {
  if (!category) return "Umum";
  if (typeof category === "object") {
    return category.name || "Umum";
  }
  if (typeof category === "string") {
    return category.trim() || "Umum";
  }
  return "Umum";
}

/**
 * Memastikan URL media/gambar memiliki absolute URL yang valid
 */
export function formatMediaUrl(url: string | null | undefined): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  if (url.startsWith("/api/media/") || url.startsWith("/uploads/")) {
    return `https://nexus.ormawaeksekutifpku.com${url}`;
  }
  return url;
}

/**
 * Mengekstrak teks polos dari AST ContentJson (ProseMirror / TipTap)
 */
function extractTextFromContentJson(node: ContentJsonNode): string {
  if (node.text) return node.text;
  if (node.content && Array.isArray(node.content)) {
    return node.content.map(extractTextFromContentJson).join(" ");
  }
  return "";
}

/**
 * Mengambil ringkasan/excerpt artikel dengan fallback otomatis dari contentJson atau content
 */
export function getArticleExcerpt(article: Partial<Article>, maxLength: number = 180): string {
  if (article.excerpt && article.excerpt.trim().length > 0) {
    const trimmed = article.excerpt.trim();
    if (trimmed.length <= maxLength) return trimmed;
    return trimmed.slice(0, maxLength).trim() + "...";
  }

  if (article.contentJson && article.contentJson.content) {
    const fullText = article.contentJson.content
      .map(extractTextFromContentJson)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    if (fullText.length > 0) {
      if (fullText.length <= maxLength) return fullText;
      return fullText.slice(0, maxLength).trim() + "...";
    }
  }

  if (article.content && typeof article.content === "string") {
    const clean = article.content.replace(/<[^>]*>?/gm, "").replace(/\s+/g, " ").trim();
    if (clean.length <= maxLength) return clean;
    return clean.slice(0, maxLength).trim() + "...";
  }

  return "";
}
