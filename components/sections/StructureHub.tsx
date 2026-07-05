"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PLACEHOLDER } from "../../lib/placeholder-content";
import Image from "next/image";

interface UnitDetail {
  name: string;
  shortName?: string;
  logo?: string;
  slug: string;
  type: "bph" | "biro" | "departemen";
}

const stagger = { duration: 0.4, ease: "easeOut" as const };
const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};


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
            {unit.logo && <span className="text-3xl">{unit.logo}</span>}
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
    <section id="struktur" className="relative bg-[#DCB06F] overflow-hidden">
      <div className="bg-[#870F0C] my-5 p-10">
        <div className="bg-[#DCB06F]">
          <div className="bg-[#FBF5EA] border-3 border-[#DCB06F] rounded-[25px]">
            {/* Ornamental accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-gold-warm/60" />

            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 my-15">
              <motion.h2
                {...fadeUp}
                transition={{ duration: 0.4 }}
                className="font-asimovian text-[80px] text-[#870F0C] uppercase leading-none mb-10"
              >
                {PLACEHOLDER.struktur.sectionTitle}
              </motion.h2>
              {/* <motion.p
              {...fadeUp}
              transition={{ duration: 0.4, delay: 0.06 }}
              className="mt-2 text-cream-soft/60 text-sm mb-12"
            >
              {PLACEHOLDER.struktur.sectionSub}
            </motion.p> */}

              {/* Tree Diagram */}
              <div className="flex flex-col items-center gap-0">
                {/* Level 1: BPH (Root) */}
                <motion.button
                  {...fadeUp}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  onClick={() => setSelectedUnit(units[0])}
                  className="flex flex-col items-center justify-center hover:border-crimson hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
                >
                  <Image src={PLACEHOLDER.struktur.bph.logo} alt={PLACEHOLDER.struktur.bph.name} width={104} height={115} className="object-contain" />
                  <div className="border-1 border-[#DCB06F] rounded-[10px] p-1">
                    <div className="border-2 border-[#DCB06F] rounded-[6px] p-3 text-[#701011] font-montserrat font-semibold text-[20px] uppercase">
                      {PLACEHOLDER.struktur.bph.name}
                    </div>
                  </div>
                </motion.button>

                {/* Connector Line */}
                <div className="w-[2px] h-8 bg-[#DCB06F]/40" />

                {/* Horizontal connector */}
                <div className="w-3/4 max-w-md h-[2px] bg-[#DCB06F]/40 relative">
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#DCB06F]/60" />
                </div>

                {/* Biro Branch + nodes */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                  {PLACEHOLDER.struktur.biro.map((biro, i) => (
                    <div key={i} className="flex flex-col w-full">
                      <motion.div
                        {...fadeUp}
                        transition={{ ...stagger, delay: 0.1 + i * 0.06 }}
                        onClick={() => setSelectedUnit({ ...biro, type: "biro" })}
                        className="flex flex-col items-center cursor-pointer w-70"
                      >
                        <div className="w-[2px] h-6 bg-[#DCB06F]/40" />
                        <div className=" bg-[#870F0C] p-1 text-[#F9D253] border-1 border-[#DCB06F] rounded-[10px]">
                          <div className="flex justify-center gap-3 items-center bg-[#870F0C] pr-2 py-1 border-2 border-[#DCB06F] rounded-[10px]">
                            <Image src={biro.logo} alt={biro.name} width={95} height={95} />
                            <span className="text-[#F9D253] text-[20px] text-left font-montserrat ">{biro.name}</span>
                          </div>
                        </div>

                        {/* <span className="text-gold-warm text-xs font-bold uppercase tracking-[0.3em] mb-3">
                          Biro
                        </span> */}
                        {/* <div className="flex flex-wrap justify-center gap-3">
                          {PLACEHOLDER.struktur.biro.map((unit, i) => (
                            <motion.button
                              key={unit.slug}
                              {...fadeUp}
                              transition={{ duration: 0.4, delay: 0.15 + i * 0.05 }}
                              onClick={() => setSelectedUnit({ ...unit, type: "biro" })}
                              className="px-4 py-3 rounded-xl bg-bark/40 border border-gold-warm/20 text-cream-soft/90 text-sm
                               hover:border-crimson hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 min-w-[120px]"
                            >
                              <span className="block text-lg mb-1">{unit.logo}</span>
                              <span className="text-xs leading-tight">{unit.name}</span>
                            </motion.button>
                          ))}
                        </div> */}
                      </motion.div>
                    </div>
                  ))}
                </div>

                {/* Horizontal connector */}
                <div className="w-3/4 max-w-md h-[2px] bg-[#DCB06F]/40 relative">
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#DCB06F]/60" />
                </div>

                {/* Dept Branch + nodes */}
                <div className="grid grid-cols-4 md:grid-cols-8 gap-1 w-full">
                  {PLACEHOLDER.struktur.departemen.map((dept, i) => (
                    <div key={i} className="flex flex-col items-center w-full">
                      <motion.div
                        {...fadeUp}
                        transition={{ ...stagger, delay: 0.1 + i * 0.06 }}
                        onClick={() => setSelectedUnit({ ...dept, type: "biro" })}
                        className="flex flex-col items-center w-20 cursor-pointer"
                      >
                        <div className="w-[2px] h-6 bg-[#DCB06F]/40" />
                        <div className=" bg-[#2C430B] p-1 text-[#F9D253] border-1 border-[#DCB06F] rounded-[10px]">
                          <div className="flex flex-wrap justify-center items-center bg-[#2C430B] p-1 border-2 border-[#DCB06F] rounded-[10px]">
                            <Image src={dept.logo} alt={dept.name} width={69} height={70} />
                            <span className="w-30 text-[#F9D253] text-[12px] font-montserrat ">{dept.name}</span>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
            {/* Departemen Branch */}
            {/* <div className="flex flex-col items-center">
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
                          <span className="block text-lg mb-1">{unit.logo}</span>
                          <span className="text-xs leading-tight">{unit.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div> */}

            {/* Modal */}
            {selectedUnit && (
              <OrgModal unit={selectedUnit} onClose={() => setSelectedUnit(null)} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
