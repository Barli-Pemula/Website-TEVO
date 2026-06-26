"use client";

import { motion } from "framer-motion";
import { PLACEHOLDER } from "../../lib/placeholder-content";

const stagger = { duration: 0.4, ease: "easeOut" as const };
const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

export default function ProfileSection() {
  return (
    <section id="profile" className="relative">
      {/* Subsection 1: Info Cards — smoke bg */}
      <div className="bg-smoke py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            {...fadeUp}
            transition={stagger}
            className="font-[family-name:var(--font-display)] text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold text-forest-dark text-center mb-2"
          >
            Mengenal Astana Angkasa
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ ...stagger, delay: 0.06 }}
            className="text-bark text-center mb-12 text-sm uppercase tracking-[0.15em] font-medium"
          >
            Profil Kabinet
          </motion.p>

          {/* 3 Info Cards — asimetris layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              PLACEHOLDER.intro.selayangPandang,
              PLACEHOLDER.intro.peranOrmawa,
              PLACEHOLDER.intro.pengertianKabinet,
            ].map((card, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ ...stagger, delay: 0.1 + i * 0.06 }}
                className="bg-white border border-gold-warm/20 rounded-[10px] p-6 md:p-8 shadow-card hover:shadow-lift hover:-translate-y-0.5 transition-all duration-200"
              >
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-forest-dark mb-3">
                  {card.title}
                </h3>
                <p className="text-ink/70 text-sm leading-relaxed">
                  {card.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-[1px] bg-gold-warm/40" />

      {/* Subsection 2: Visi & Misi — white bg + cream card */}
      <div className="bg-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12">
            {/* Visi Card — cream-soft bg, takes 2 cols */}
            <motion.div
              {...fadeUp}
              transition={stagger}
              className="md:col-span-2 bg-cream-soft rounded-[10px] p-8 md:p-10 border border-gold-warm/30 shadow-card"
            >
              <span className="inline-block px-3 py-1 rounded-full bg-gold-warm/20 text-forest-dark text-xs font-bold uppercase tracking-wider mb-6">
                Visi
              </span>
              <p className="font-[family-name:var(--font-editorial)] text-forest-dark text-lg leading-relaxed italic">
                &ldquo;{PLACEHOLDER.intro.visi}&rdquo;
              </p>
              {/* Ornamen */}
              <div className="mt-6 w-12 h-[2px] bg-gold-warm" />
            </motion.div>

            {/* Misi Card — smoke bg, takes 3 cols */}
            <motion.div
              {...fadeUp}
              transition={{ ...stagger, delay: 0.1 }}
              className="md:col-span-3 bg-smoke rounded-[10px] p-8 md:p-10 border border-gold-warm/20 shadow-card"
            >
              <span className="inline-block px-3 py-1 rounded-full bg-crimson/10 text-crimson text-xs font-bold uppercase tracking-wider mb-6">
                Misi
              </span>
              <ul className="space-y-4">
                {PLACEHOLDER.intro.misi.map((item, i) => (
                  <li key={i} className="flex gap-3 text-ink/80 text-sm leading-relaxed">
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-crimson mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
