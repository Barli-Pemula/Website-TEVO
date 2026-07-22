import { PLACEHOLDER } from "../../../lib/placeholder-content";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState } from "react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * TEVO — Sub-page Detail Berita / Informasi
 * Route: /informasi/[slug]
 */
export default async function InformasiPage({ params }: PageProps) {
  const { slug } = await params;

  const article = PLACEHOLDER.news.articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-smoke">
      {/* Article Header */}
      <section className="relative bg-forest-dark pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-gold-warm/60" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/#informasi"
            className="inline-flex items-center gap-1 text-cream-soft/60 hover:text-gold-warm text-sm mb-6 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Kembali ke Informasi
          </Link>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-cream-soft/60 text-sm">{article.date}</span>
            <span className="w-1 h-1 rounded-full bg-cream-soft/30" />
            <span className="inline-block px-3 py-1 rounded-full bg-sky-pale/25 text-cream-soft text-xs font-bold uppercase tracking-wider">
              {article.category}
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3.5vw,2.5rem)] font-extrabold text-cream-soft leading-tight">
            {article.title}
          </h1>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured image placeholder */}
          <div className="aspect-video bg-gradient-to-br from-sky-pale/20 to-cream-soft/30 rounded-2xl mb-10 flex items-center justify-center border border-gold-warm/10">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#D4A678" strokeWidth="1" opacity="0.3">
              <rect x="2" y="2" width="20" height="20" rx="2" />
              <line x1="7" y1="7" x2="17" y2="7" />
              <line x1="7" y1="11" x2="13" y2="11" />
              <line x1="7" y1="15" x2="15" y2="15" />
            </svg>
          </div>

          {/* Body */}
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-card border border-gold-warm/10">
            <div className="prose prose-sm md:prose-base text-ink/70 leading-relaxed max-w-none">
              <p className="text-lg leading-relaxed">
                {article.excerpt}
              </p>
              <p>
                Konten lengkap untuk artikel ini sedang dipersiapkan oleh tim konten Kabinet Astana Angkasa.
                Artikel akan diperbarui dengan informasi detail, dokumentasi foto, dan materi pendukung lainnya
                sebelum website resmi diluncurkan.
              </p>
              <p>
                Sementara itu, pantau terus kanal informasi resmi Kabinet Astana Angkasa untuk mendapatkan
                update terbaru seputar kegiatan dan program kerja kabinet.
              </p>
            </div>

            {/* Placeholder notice */}
            <div className="mt-8 pt-6 border-t border-gold-warm/20">
              <p className="text-bark text-xs">
                ⏳ Artikel ini masih dalam proses penyusunan. Konten dapat berubah sebelum go-live.
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <Link
              href="/#informasi"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-forest-dark hover:text-crimson transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
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
