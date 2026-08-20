"use client";

import { motion } from "framer-motion";
import { PLACEHOLDER } from "../../lib/placeholder-content";
import Image from "next/image";
import { CONFIG } from "../../lib/config";

export default function AngkasaKostPreview() {
  const fadeUp = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
  };

  const kosts = PLACEHOLDER.angkasaKost.kosts || [];

  return (
    <section id="angkasa-kost" className="relative py-8 md:py-16 bg-[#FBF5EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative p-2 md:p-2 bg-[#DCB06F] rounded-[30px]">
          <div className="mx-auto p-4 sm:p-8 lg:p-12 bg-[#701011] rounded-[25px]">
            {/* Section Header */}
            <div className="text-center mb-8 sm:mb-12">
              <motion.h2
                {...fadeUp}
                transition={{ duration: 0.4 }}
                className="font-asimovian uppercase text-[clamp(2rem,6vw,72px)] text-[#FBF5EA]"
              >
                {PLACEHOLDER.angkasaKost.title}
              </motion.h2>
              {PLACEHOLDER.angkasaKost.subtitle && (
                <motion.p
                  {...fadeUp}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="mt-2 text-[#F6E7CC]/80 text-sm md:text-base max-w-2xl mx-auto"
                >
                  {PLACEHOLDER.angkasaKost.subtitle}
                </motion.p>
              )}
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto my-4">
              {kosts.map((kost, index) => (
                <motion.div
                  key={index}
                  {...fadeUp}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                  className="relative flex flex-col bg-[#F6E7CC] rounded-[28px] border-[2.5px] border-[#DCB06F] shadow-xl overflow-hidden hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 group"
                >
                  {/* Top Photo */}
                  <div className="relative w-full h-[240px] sm:h-[260px] overflow-hidden bg-black/10">
                    <Image
                      src={kost.image}
                      alt={kost.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Bottom Info matching template */}
                  <div className="p-5 sm:p-6 bg-[#F6E7CC] flex flex-col justify-between flex-1">
                    <div>
                      {/* Nama Kost */}
                      <h3 className="font-[family-name:var(--font-display)] font-extrabold text-[20px] sm:text-[22px] text-[#1A1A1A] uppercase tracking-wide leading-tight">
                        {kost.name}
                      </h3>

                      {/* Label Harga */}
                      <span className="block text-[11px] font-bold text-[#8C7A6B] tracking-widest uppercase mt-3">
                        HARGA
                      </span>

                      {/* Nominal Harga */}
                      <p className="font-[family-name:var(--font-display)] font-black text-[24px] sm:text-[28px] text-[#701011] leading-tight mt-0.5">
                        {kost.price}
                      </p>

                      {/* Periode */}
                      <span className="block text-[12px] font-medium text-[#614C3B] mt-0.5">
                        {kost.period}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-center mt-8 md:mt-12"
            >
              <a
                href={CONFIG.angkasaKostUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#F6E7CC] text-[#701011] font-bold rounded-full shadow-crimson
               hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98] transition-all duration-200 min-h-[48px]
               group border-2 border-[#DCB06F]"
                aria-label="Buka Angkasa Kost di tab baru"
              >
                {PLACEHOLDER.angkasaKost.cta}
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
        </div>
      </div>
    </section>
  );
}