"use client";

import { motion } from "framer-motion";
import { PLACEHOLDER } from "../../lib/placeholder-content";
import { CONFIG } from "../../lib/config";

export default function StorePreview() {
  const fadeUp = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
  };

  return (
    <section id="store" className="relative bg-smoke py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.4 }}
            className="font-[family-name:var(--font-display)] text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold text-forest-dark"
          >
            {PLACEHOLDER.store.title}
          </motion.h2>
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.4, delay: 0.06 }}
            className="mt-3 mx-auto w-16 h-[2px] bg-gold-warm"
          />
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-4 text-bark text-sm"
          >
            {PLACEHOLDER.store.subtitle}
          </motion.p>
        </div>

        {/* Product Grid + Carousel */}
        <div className="relative">
          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
            {PLACEHOLDER.store.products.map((product, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                className="group bg-white rounded-2xl p-6 border border-gold-warm/10 shadow-card
                           hover:shadow-lift hover:-translate-y-1 transition-all duration-200 cursor-pointer"
              >
                {/* Placeholder image */}
                <div className="aspect-square bg-smoke rounded-xl mb-4 flex items-center justify-center border border-gold-warm/10">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D4A678" strokeWidth="1.5" opacity="0.4">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
                <h3 className="font-[family-name:var(--font-body)] font-semibold text-ink text-sm mb-1">
                  {product.name}
                </h3>
                <span className="inline-block px-3 py-1 rounded-full bg-amber/20 text-forest-dark text-xs font-bold">
                  {product.price}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Mobile: Horizontal Swipe Carousel */}
          <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-none">
            {PLACEHOLDER.store.products.map((product, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                className="flex-shrink-0 w-56 snap-center bg-white rounded-2xl p-5 border border-gold-warm/10 shadow-card"
              >
                <div className="aspect-square bg-smoke rounded-xl mb-3 flex items-center justify-center">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#D4A678" strokeWidth="1.5" opacity="0.4">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
                <h3 className="font-semibold text-ink text-sm mb-1">{product.name}</h3>
                <span className="inline-block px-3 py-1 rounded-full bg-amber/20 text-forest-dark text-xs font-bold">
                  {product.price}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center mt-10"
        >
          <a
            href={CONFIG.storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-crimson text-white font-bold rounded-full shadow-crimson
                       hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98] transition-all duration-200 min-h-[48px]
                       group"
            aria-label="Buka Angkasa Store di tab baru"
          >
            {PLACEHOLDER.store.cta}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:translate-x-0.5 transition-transform"
            >
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
