"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import {
  Article,
  Birdep,
  formatArticleDate,
  getArticleCategory,
  formatMediaUrl,
} from "../../../lib/article-utils";
import RichTextRenderer from "../../../components/news/RichTextRenderer";

export default function InformasiPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get("/api/nexus/public/tevo/articles");
        const articles: Article[] = data?.data || [];
        const found = articles.find((item) => item.slug === slug);
        if (found) {
          setArticle(found);
        } else {
          setArticle(null);
        }
      } catch (err) {
        console.error("Gagal fetch artikel:", err);
        setError("Gagal memuat artikel. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchData();
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-forest-dark">
        <p className="text-cream-soft/60 animate-pulse font-medium">Memuat artikel...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-forest-dark">
        <p className="text-crimson font-medium">{error}</p>
        <Link
          href="/#informasi"
          className="text-cream-soft/60 hover:text-gold-warm underline underline-offset-2 transition-colors"
        >
          Kembali ke Informasi
        </Link>
      </div>
    );
  }

  // Artikel tidak ditemukan
  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-forest-dark">
        <p className="text-cream-soft/60">Artikel tidak ditemukan.</p>
        <Link
          href="/#informasi"
          className="text-crimson underline underline-offset-2 hover:text-gold-warm transition-colors"
        >
          Kembali ke Informasi
        </Link>
      </div>
    );
  }

  const birdeps: Birdep[] = Array.isArray(article.birdeps) ? article.birdeps : [];
  const categoryName = getArticleCategory(article.category);
  const formattedDate = formatArticleDate(article.publishedAt, false);
  const cover = formatMediaUrl(article.coverUrl);

  return (
    <div className="min-h-screen bg-transparent">
      {/* Article Header */}
      <section className="relative bg-forest-dark pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-gold-warm/60" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/#informasi"
            className="inline-flex items-center gap-1 text-cream-soft/60 hover:text-gold-warm text-sm mb-6 transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Kembali ke Informasi
          </Link>

          {/* Meta: Tanggal, Penulis, dan Kategori */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {formattedDate && (
              <span className="text-cream-soft/60 text-sm">
                {formattedDate}
              </span>
            )}
            {article.authorName && (
              <>
                <span className="w-1 h-1 rounded-full bg-cream-soft/30" />
                <span className="text-cream-soft/80 text-sm font-medium">
                  Oleh: {article.authorName}
                </span>
              </>
            )}
            <span className="w-1 h-1 rounded-full bg-cream-soft/30" />
            <span className="inline-block px-3 py-1 rounded-full bg-sky-pale/25 text-cream-soft text-xs font-bold uppercase tracking-wider">
              {categoryName}
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3.5vw,2.5rem)] font-extrabold text-cream-soft leading-tight">
            {article.title}
          </h1>

          {/* DAFTAR BIRDEP (KONTRIBUTOR) */}
          {birdeps.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-cream-soft/50 text-xs uppercase tracking-wider mr-1">
                Kontributor:
              </span>
              {birdeps.map((unit) => {
                const logo = formatMediaUrl(unit.logoUrl);
                return (
                  <span
                    key={unit.id || unit.code}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-warm/20 text-gold-warm text-xs font-bold uppercase tracking-wider border border-gold-warm/30"
                    title={unit.unitTypeLabel || unit.name}
                  >
                    {logo && (
                      <img
                        src={logo}
                        alt={unit.code || unit.name}
                        className="w-3.5 h-3.5 rounded-full object-cover"
                      />
                    )}
                    {unit.name}
                    {unit.code && (
                      <span className="text-[0.65rem] opacity-70">
                        ({unit.code})
                      </span>
                    )}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured image */}
          <div className="aspect-video bg-gradient-to-br from-sky-pale/20 to-cream-soft/30 rounded-2xl mb-10 flex items-center justify-center border border-gold-warm/10 overflow-hidden bg-smoke">
            {cover ? (
              <img
                src={cover}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#D4A678"
                strokeWidth="1"
                opacity="0.3"
              >
                <rect x="2" y="2" width="20" height="20" rx="2" />
                <line x1="7" y1="7" x2="17" y2="7" />
                <line x1="7" y1="11" x2="13" y2="11" />
                <line x1="7" y1="15" x2="15" y2="15" />
              </svg>
            )}
          </div>

          {/* Body */}
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-card border border-gold-warm/10">
            {article.excerpt && (
              <div className="mb-6 p-4 rounded-xl bg-gold-warm/10 border-l-4 border-gold-warm text-ink/90 text-base md:text-lg leading-relaxed font-medium">
                {article.excerpt}
              </div>
            )}

            <RichTextRenderer
              contentJson={article.contentJson}
              fallbackHtml={article.content}
            />
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <Link
              href="/#informasi"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-forest-dark hover:text-crimson transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Semua Informasi
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-crimson text-white text-sm font-bold rounded-full shadow-crimson hover:-translate-y-0.5 transition-all"
            >
              Beranda
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

