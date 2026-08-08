"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { PLACEHOLDER } from "../../lib/placeholder-content";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import FrameCustom from "../../styles/frameCustom.module.css"
import axios from "axios"
import Image from "next/image";

interface Birdep {
  id: string,
  name: string,
  code: string,
}

interface articleDetail {
  id: string,
  title: string,
  excerpt: string,
  slug: string,
  content: string,
  publishedAt: string,
  coverUrl: string,
  category: {
    name: string,
    slug: string,
  },
  birdeps: Birdep[],
}

const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Jakarta"
  }).format(new Date(dateString))
}

export default function NewsCarousel() {
  const reduced = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  // const articles = PLACEHOLDER.news.articles;
  const [articles, setArticles] = useState<articleDetail[]>([])
  const [loading, setLoading] = useState(true)

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getArticles = {
          method: "GET",
          url: "/api/nexus/public/tevo/articles",
        }

        const response = await axios.request(getArticles)
        const rawArticles: articleDetail[] = response.data?.data || []

        // Urutkan berdasarkan tanggal terbaru (publishedAt descending)
        const sortedArticles = [...rawArticles].sort((a, b) => {
          const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
          const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
          return dateB - dateA
        })

        // Ambil maksimal 9 artikel terbaru untuk halaman utama
        const latestNineArticles = sortedArticles.slice(0, 9)

        setArticles(latestNineArticles)
        setLoading(false)
      } catch (error) {
        console.error("Gagal mengambil data artikel:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const len = articles.length;
      if (len === 0) return;
      setActiveIndex(((index % len) + len) % len);
    },
    [articles.length]
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [goTo, activeIndex]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [goTo, activeIndex]);

  // Auto-play
  useEffect(() => {
    if (reduced) return;
    autoPlayRef.current = setInterval(goNext, 6000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [goNext, reduced]);

  // Pause on hover
  const pauseAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };
  const resumeAutoPlay = () => {
    if (reduced) return;
    pauseAutoPlay();
    autoPlayRef.current = setInterval(goNext, 6000);
  };

  const fadeUp = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
  };

  const getXOffset = () => {
    if (isMobile) {
      return `calc(-${activeIndex} * (100% + 16px))`;
    }
    if (isTablet) {
      const maxIdx = Math.max(0, articles.length - 2);
      const idx = Math.min(activeIndex, maxIdx);
      return `calc(-${idx} * (50% + 12px))`;
    }
    // Desktop
    const maxIdx = Math.max(0, articles.length - 3);
    const idx = Math.min(activeIndex, maxIdx);
    return `calc(-${idx} * (33.333% + 16px))`;
  };

  return (
    <section id="informasi" className="relative bg-forest-dark py-20 md:py-28">
      {/* Top ornament */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-gold-warm/60" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.4 }}
            className="font-asimovian text-[80px] uppercase text-[#F6E7CC]"
          >
            {PLACEHOLDER.news.title}
          </motion.h2>
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.4, delay: 0.06 }}
            className="mt-3 mx-auto w-16 h-[2px] bg-gold-warm"
          />
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-4 text-cream-soft/60 text-sm"
          >
            {PLACEHOLDER.news.subtitle}
          </motion.p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative px-2 md:px-6"
          onMouseEnter={pauseAutoPlay}
          onMouseLeave={resumeAutoPlay}
        >
          {/* Navigation Arrows - Visible on Mobile and Desktop */}
          <button
            onClick={goPrev}
            className="absolute -left-2 sm:-left-3 md:-left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 shadow-lg border border-gold-warm/30 flex items-center justify-center hover:bg-smoke hover:scale-105 active:scale-95 transition-all text-forest-dark"
            aria-label="Artikel sebelumnya"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={goNext}
            className="absolute -right-2 sm:-right-3 md:-right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 shadow-lg border border-gold-warm/30 flex items-center justify-center hover:bg-smoke hover:scale-105 active:scale-95 transition-all text-forest-dark"
            aria-label="Artikel selanjutnya"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Cards Track */}
          <div className="overflow-hidden py-2">
            <motion.div
              className="flex items-stretch gap-4 md:gap-6"
              animate={{ x: getXOffset() }}
              transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
            >
              {articles.map((article, i) => {
                const isActive = i === activeIndex;
                // const isFeatured = article.featured;

                return (
                  <motion.article
                    key={article.id}
                    animate={{
                      scale: isActive ? 1 : 0.95,
                      opacity: isActive || (!isMobile && Math.abs(i - activeIndex) <= 2) ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className={`${FrameCustom.royalFrame} w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex-shrink-0 bg-[#F6E7CC] overflow-hidden shadow-card border-3 border-[#DCB06F]
                      hover:shadow-lift transition-shadow duration-200`}
                  >
                    <div className="relative overflow-hidden">
                      {/* ${isFeatured && isActive ? "ring-2 ring-gold-warm shadow-lift" : ""} */}
                      {/* Cover image placeholder */}
                      {article.coverUrl ? (
                        <div className="relative h-40 overflow-hidden">
                          <Image src={article.coverUrl} alt={article.title} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="h-40 bg-gradient-to-br from-sky-pale/20 to-cream-soft/30 flex items-center justify-center">
                          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#D4A678" strokeWidth="1" opacity="0.4">
                            <rect x="2" y="2" width="20" height="20" rx="2" /><line x1="7" y1="7" x2="17" y2="7" />
                            <line x1="7" y1="11" x2="13" y2="11" /><line x1="7" y1="15" x2="15" y2="15" />
                          </svg>
                        </div>
                      )}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

                      {/* Meta */}
                      <div className="absolute bottom-2 left-3 z-10 flex items-center gap-2 font-montserrat font-semibold">
                        <span className="bg-[#A90900]/50 text-white py-0.5 px-2 text-[10px] border-1 border-[#DCB06F] rounded-[5px]">{formatDate(article.publishedAt)}</span>
                        <span className="bg-[#2C430B]/50 text-white py-0.5 px-2 text-[10px] border-1 border-[#DCB06F] rounded-[5px]">{article.category.name}</span>
                      </div>
                    </div>

                    <div className="px-5 py-3 md:px-6 md:py-4">
                      <div className="mb-3">
                        <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-ink leading-snug mb-2
                                     group-hover:text-crimson transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-ink/50 text-xs leading-relaxed line-clamp-2 mb-2">
                          {article.excerpt}
                        </p>

                        {article.birdeps.length > 0 && (
                          <div className="flex items-center justify-start gap-1">
                            {article.birdeps.slice(0, 3).map((birdep) => (
                              <div key={birdep.id} className="flex gap-1">
                                <span className="bg-[#2C430B]/50 text-white py-0.5 px-2 text-[10px] border-1 border-[#DCB06F] rounded-[5px]">{birdep.code}</span>
                              </div>
                            ))}
                            {article.birdeps.length > 3 && (
                              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#2C430B]/50 px-1 text-[10px] border-1 border-[#DCB06F] text-white">
                                +{article.birdeps.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Read more */}
                      <a
                        href={`/angkasa-news/${article.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-crimson text-xs font-semibold hover:gap-2 transition-all"
                      >
                        Selengkapnya
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                        </svg>
                      </a>
                    </div>
                    {/* </div> */}
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {articles.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`p-1 rounded-full transition-all duration-300 ${i === activeIndex
                ? "w-6 h-2.5 bg-crimson"
                : "w-2.5 h-2.5 bg-cream-soft/30 hover:bg-cream-soft/50"
                }`}
              aria-label={`Artikel ${i + 1}`}
              style={{ minWidth: i === activeIndex ? "24px" : "10px", minHeight: "10px" }}
            />
          ))}
        </div>
      </div>
    </section >
  );
}
