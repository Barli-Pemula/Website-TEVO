"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import FrameCustom from "../../styles/frameCustom.module.css";

interface Birdep {
  id: string;
  name: string;
  code: string;
}

interface Category {
  id?: string;
  name?: string;
  slug?: string;
}

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverUrl: string | null;
  publishedAt: string | null;
  birdeps: Birdep[];
  category?: Category | string | null;
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return "";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Jakarta"
  }).format(new Date(dateString));
};

export default function AllNewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/nexus/public/tevo/articles");
        const rawArticles: Article[] = data?.data || [];

        // Urutkan artikel terbaru
        const sorted = [...rawArticles].sort((a, b) => {
          const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
          const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
          return dateB - dateA;
        });

        setArticles(sorted);
      } catch (err) {
        console.error("Gagal memuat daftar berita:", err);
        setError("Gagal memuat berita. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredArticles = articles.filter((art) =>
    art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (art.excerpt && art.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-forest-dark py-24 md:py-32 px-4 sm:px-6 lg:px-8 text-[#F6E7CC]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6 border-b border-gold-warm/20 pb-8">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-cream-soft/60 hover:text-gold-warm text-sm mb-4 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Kembali ke Beranda
            </Link>
            <h1 className="font-asimovian text-[clamp(2.5rem,5vw,64px)] uppercase text-[#F6E7CC] leading-none">
              Angkasa News
            </h1>
            <p className="mt-2 text-cream-soft/60 text-sm">
              Seluruh kabar, pengumuman, dan berita terbaru dari Kabinet Astana Angkasa.
            </p>
          </div>

          {/* Search Box */}
          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Cari berita..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2.5 rounded-full bg-[#F6E7CC]/10 border border-[#DCB06F]/40 text-[#F6E7CC] placeholder-cream-soft/40 focus:outline-none focus:border-[#DCB06F] text-sm"
            />
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="py-20 text-center text-cream-soft/60 animate-pulse font-medium">
            Memuat seluruh berita...
          </div>
        ) : error ? (
          <div className="py-20 text-center text-crimson font-medium">
            {error}
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="py-20 text-center text-cream-soft/60 font-medium">
            Tidak ada berita yang ditemukan.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => {
              const categoryName =
                typeof article.category === "object" && article.category !== null
                  ? article.category.name || "Umum"
                  : typeof article.category === "string"
                  ? article.category
                  : "Umum";

              return (
                <article
                  key={article.id}
                  className={`${FrameCustom.royalFrame} bg-[#F6E7CC] overflow-hidden shadow-card border-3 border-[#DCB06F] flex flex-col justify-between hover:shadow-lift transition-shadow duration-200`}
                >
                  <div>
                    <div className="relative h-44 overflow-hidden bg-gradient-to-br from-sky-pale/20 to-cream-soft/30">
                      {article.coverUrl ? (
                        <Image src={article.coverUrl} alt={article.title} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#D4A678" strokeWidth="1" opacity="0.4">
                            <rect x="2" y="2" width="20" height="20" rx="2" />
                            <line x1="7" y1="7" x2="17" y2="7" />
                            <line x1="7" y1="11" x2="13" y2="11" />
                          </svg>
                        </div>
                      )}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
                      <div className="absolute bottom-2 left-3 z-10 flex items-center gap-2 font-montserrat font-semibold">
                        {article.publishedAt && (
                          <span className="bg-[#A90900]/50 text-white py-0.5 px-2 text-[10px] border border-[#DCB06F] rounded-[5px]">
                            {formatDate(article.publishedAt)}
                          </span>
                        )}
                        <span className="bg-[#2C430B]/50 text-white py-0.5 px-2 text-[10px] border border-[#DCB06F] rounded-[5px]">
                          {categoryName}
                        </span>
                      </div>
                    </div>

                    <div className="px-5 py-4">
                      <h2 className="font-[family-name:var(--font-display)] text-base font-bold text-ink leading-snug mb-2">
                        {article.title}
                      </h2>
                      <p className="text-ink/60 text-xs leading-relaxed line-clamp-3 mb-3">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-4 pt-1">
                    <Link
                      href={`/angkasa-news/${article.slug}`}
                      className="inline-flex items-center gap-1 text-crimson text-xs font-semibold hover:gap-2 transition-all"
                    >
                      Selengkapnya
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
