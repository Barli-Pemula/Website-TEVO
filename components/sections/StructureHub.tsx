"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PLACEHOLDER } from "../../lib/placeholder-content";

interface UnitDetail {
  name: string;
  shortName?: string;
  emoji?: string;
  slug: string;
  type: "bph" | "biro" | "departemen";
}

function OrgModal({ unit, onClose }: { unit: UnitDetail | null; onClose: () => void }) {
  if (!unit) return null;
  return (
    <div
      className="fixed inset-0 z-[100] bg-ink/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-8 border border-gold-warm/20"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {unit.emoji && <span className="text-3xl">{unit.emoji}</span>}
            <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-forest-dark">
              {unit.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-smoke hover:bg-gold-warm/20 flex items-center justify-center transition-colors"
            aria-label="Tutup"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <p className="text-ink/60 text-sm leading-relaxed">
          Informasi detail untuk <strong>{unit.name}</strong> akan tersedia setelah data struktur organisasi resmi dikunci. Kembali lagi nanti untuk melihat daftar anggota, tupoksi, dan program kerja unit ini.
        </p>
        <div className="mt-6 pt-6 border-t border-gold-warm/20">
          <p className="text-bark text-xs">
            ⏳ Data sedang dalam proses pengumpulan oleh tim konten.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function StructureHub() {
  const [selectedUnit, setSelectedUnit] = useState<UnitDetail | null>(null);

  const units: UnitDetail[] = [
    { ...PLACEHOLDER.struktur.bph, type: "bph", slug: "bph" },
    ...PLACEHOLDER.struktur.biro.map((b) => ({ ...b, type: "biro" as const })),
    ...PLACEHOLDER.struktur.departemen.map((d) => ({ ...d, type: "departemen" as const })),
  ];

  const fadeUp = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
  };

  return (
    <section id="struktur" className="relative bg-gradient-to-b from-forest-dark to-[#1a2a06] py-20 md:py-28 overflow-hidden">
      {/* Ornamental accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-gold-warm/60" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.h2
          {...fadeUp}
          transition={{ duration: 0.4 }}
          className="font-[family-name:var(--font-display)] text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold text-cream-soft"
        >
          {PLACEHOLDER.struktur.sectionTitle}
        </motion.h2>
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.4, delay: 0.06 }}
          className="mt-2 text-cream-soft/60 text-sm mb-12"
        >
          {PLACEHOLDER.struktur.sectionSub}
        </motion.p>

        {/* Tree Diagram */}
        <div className="flex flex-col items-center gap-0">
          {/* Level 1: BPH (Root) */}
          <motion.button
            {...fadeUp}
            transition={{ duration: 0.4, delay: 0.1 }}
            onClick={() => setSelectedUnit(units[0])}
            className="px-6 py-3 rounded-xl bg-bark/60 border border-gold-warm/30 text-cream-soft font-bold
                       hover:border-crimson hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 shadow-lg"
          >
            <span className="text-xl mr-2">👑</span>
            {PLACEHOLDER.struktur.bph.shortName}
          </motion.button>

          {/* Connector Line */}
          <div className="w-[1px] h-8 bg-gold-warm/40" />

          {/* Horizontal connector */}
          <div className="w-3/4 max-w-md h-[1px] bg-gold-warm/30 relative">
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gold-warm/60" />
          </div>

          {/* Branch labels + nodes */}
          <div className="grid grid-cols-2 gap-6 md:gap-12 w-full mt-4">
            {/* Biro Branch */}
            <div className="flex flex-col items-center">
              <div className="w-[1px] h-6 bg-gold-warm/30" />
              <span className="text-gold-warm text-xs font-bold uppercase tracking-[0.3em] mb-3">
                Biro
              </span>
              <div className="flex flex-wrap justify-center gap-3">
                {PLACEHOLDER.struktur.biro.map((unit, i) => (
                  <motion.button
                    key={unit.slug}
                    {...fadeUp}
                    transition={{ duration: 0.4, delay: 0.15 + i * 0.05 }}
                    onClick={() => setSelectedUnit({ ...unit, type: "biro" })}
                    className="px-4 py-3 rounded-xl bg-bark/40 border border-gold-warm/20 text-cream-soft/90 text-sm
                               hover:border-crimson hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 min-w-[120px]"
                  >
                    <span className="block text-lg mb-1">{unit.emoji}</span>
                    <span className="text-xs leading-tight">{unit.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Departemen Branch */}
            <div className="flex flex-col items-center">
              <div className="w-[1px] h-6 bg-gold-warm/30" />
              <span className="text-gold-warm text-xs font-bold uppercase tracking-[0.3em] mb-3">
                Departemen
              </span>
              <div className="flex flex-wrap justify-center gap-3">
                {PLACEHOLDER.struktur.departemen.map((unit, i) => (
                  <motion.button
                    key={unit.slug}
                    {...fadeUp}
                    transition={{ duration: 0.4, delay: 0.15 + i * 0.05 }}
                    onClick={() => setSelectedUnit({ ...unit, type: "departemen" })}
                    className="px-4 py-3 rounded-xl bg-bark/40 border border-gold-warm/20 text-cream-soft/90 text-sm
                               hover:border-crimson hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 min-w-[120px]"
                  >
                    <span className="block text-lg mb-1">{unit.emoji}</span>
                    <span className="text-xs leading-tight">{unit.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedUnit && (
        <OrgModal unit={selectedUnit} onClose={() => setSelectedUnit(null)} />
      )}
    </section>
  );
}
