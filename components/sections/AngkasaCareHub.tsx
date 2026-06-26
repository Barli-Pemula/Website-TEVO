"use client";

import { motion } from "framer-motion";
import { PLACEHOLDER } from "../../lib/placeholder-content";
import { CONFIG } from "../../lib/config";

export default function AngkasaCareHub() {
  const fadeUp = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
  };

  return (
    <section id="angkasa-care" className="relative bg-white py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.4 }}
            className="font-[family-name:var(--font-display)] text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold text-forest-dark"
          >
            {PLACEHOLDER.care.title}
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
            {PLACEHOLDER.care.subtitle}
          </motion.p>
        </div>

        {/* Desktop: Venn Diagram */}
        <div className="hidden md:flex items-center justify-center gap-0">
          {/* Angkasa Help circle */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="relative w-64 h-64 rounded-full bg-crimson/10 border-2 border-crimson/30 flex flex-col items-center justify-center text-center p-6 -mr-8 z-10"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-sage-mid/80 text-forest-dark text-xs font-bold mb-3">
              Angkasa Care
            </span>
            <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-forest-dark mb-2">
              {PLACEHOLDER.care.angkasaHelp.name}
            </h3>
            <p className="text-ink/60 text-xs leading-relaxed">
              {PLACEHOLDER.care.angkasaHelp.description}
            </p>
          </motion.div>

          {/* Intersection badge */}
          <div className="relative z-20 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-sage-mid/30 border-2 border-sage-mid flex items-center justify-center shadow-lg">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2C440C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <span className="mt-2 text-xs font-bold text-sage-mid uppercase tracking-wider">Care</span>
          </div>

          {/* MinCare circle */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="relative w-64 h-64 rounded-full bg-gold-warm/10 border-2 border-gold-warm/30 flex flex-col items-center justify-center text-center p-6 -ml-8 z-10"
          >
            <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-forest-dark mb-2">
              {PLACEHOLDER.care.minCare.name}
            </h3>
            <p className="text-ink/60 text-xs leading-relaxed">
              {PLACEHOLDER.care.minCare.description}
            </p>
          </motion.div>
        </div>

        {/* Mobile: 2-card stack */}
        <div className="md:hidden space-y-4">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.4 }}
            className="bg-sky-pale/30 border border-sky-pale/40 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-crimson/15 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A83931" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
              </div>
              <h3 className="font-[family-name:var(--font-display)] font-bold text-forest-dark">
                {PLACEHOLDER.care.angkasaHelp.name}
              </h3>
            </div>
            <p className="text-ink/60 text-sm">{PLACEHOLDER.care.angkasaHelp.description}</p>
          </motion.div>

          {/* Care badge between */}
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage-mid/20 text-forest-dark text-sm font-bold border border-sage-mid/30">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
              Angkasa Care
            </span>
          </div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-cream-soft/40 border border-gold-warm/30 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gold-warm/20 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4A678" strokeWidth="2" strokeLinecap="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <h3 className="font-[family-name:var(--font-display)] font-bold text-forest-dark">
                {PLACEHOLDER.care.minCare.name}
              </h3>
            </div>
            <p className="text-ink/60 text-sm">{PLACEHOLDER.care.minCare.description}</p>
          </motion.div>
        </div>

        {/* CTAs */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
        >
          <a
            href={CONFIG.angkasaHelpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-crimson text-white font-bold rounded-full shadow-crimson
                       hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98] transition-all duration-200 min-h-[48px]"
            aria-label="Buka chatbot Angkasa Help"
          >
            {PLACEHOLDER.care.angkasaHelp.cta}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
          <a
            href={CONFIG.minCareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-gold-warm text-forest-dark font-bold rounded-full
                       hover:bg-gold-warm/10 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 min-h-[48px]"
            aria-label="Hubungi MinCare"
          >
            {PLACEHOLDER.care.minCare.cta}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
