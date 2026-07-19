"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { PLACEHOLDER } from "../../lib/placeholder-content";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export default function NewsCarousel() {
  const reduced = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const articles = PLACEHOLDER.news.articles;

  const goTo = useCallback(
    (index: number) => {
      const len = articles.length;
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
            className="font-[family-name:var(--font-display)] text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold text-cream-soft"
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

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={pauseAutoPlay}
          onMouseLeave={resumeAutoPlay}
        >
          {/* Cards */}
          <div className="flex items-stretch gap-4 md:gap-6 overflow-hidden">
            {articles.map((article, i) => {
              const offset = i - activeIndex;
              const isActive = i === activeIndex;
              const isFeatured = article.featured;

              return (
                <motion.article
                  key={article.slug}
                  animate={{
                    scale: isActive ? 1 : 0.92,
                    opacity: Math.abs(offset) <= 1 ? 1 : 0.3,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`flex-shrink-0 w-[85vw] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white rounded-2xl overflow-hidden shadow-card
                    ${isFeatured && isActive ? "ring-2 ring-gold-warm shadow-lift" : ""}
                    hover:shadow-lift transition-shadow duration-200`}
                >
                  {/* Cover image placeholder */}
                  <div className="h-40 bg-gradient-to-br from-sky-pale/20 to-cream-soft/30 flex items-center justify-center">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#D4A678" strokeWidth="1" opacity="0.4">
                      <rect x="2" y="2" width="20" height="20" rx="2" /><line x1="7" y1="7" x2="17" y2="7" />
                      <line x1="7" y1="11" x2="13" y2="11" /><line x1="7" y1="15" x2="15" y2="15" />
                    </svg>
                  </div>

                  <div className="p-5 md:p-6">
                    {/* Meta */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs text-bark">{article.date}</span>
                      <span className="w-1 h-1 rounded-full bg-bark/30" />
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-sky-pale/30 text-forest-dark text-[10px] font-bold uppercase tracking-wider">
                        {article.category}
                      </span>
                    </div>

                    <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-ink leading-snug mb-2
                                   group-hover:text-crimson transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-ink/50 text-xs leading-relaxed line-clamp-2 mb-4">
                      {article.excerpt}
                    </p>

                    {/* Read more */}
                    <a
                      href={`/informasi/${article.slug}`}
                      className="inline-flex items-center gap-1 text-crimson text-xs font-semibold hover:gap-2 transition-all"
                    >
                      Selengkapnya
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                      </svg>
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-10 h-10 rounded-full bg-white shadow-card
                       flex items-center justify-center hover:bg-smoke transition-colors hidden md:flex"
            aria-label="Artikel sebelumnya"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={goNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-10 h-10 rounded-full bg-white shadow-card
                       flex items-center justify-center hover:bg-smoke transition-colors hidden md:flex"
            aria-label="Artikel selanjutnya"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {articles.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-6 h-2.5 bg-crimson"
                  : "w-2.5 h-2.5 bg-cream-soft/30 hover:bg-cream-soft/50"
              }`}
              aria-label={`Artikel ${i + 1}`}
              style={{ minWidth: i === activeIndex ? "24px" : "10px", minHeight: "10px" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
