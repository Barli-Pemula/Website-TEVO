"use client";

import { motion } from "framer-motion";
import { PLACEHOLDER } from "../../lib/placeholder-content";
import { CONFIG } from "../../lib/config";
import Image from "next/image";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

export default function AngkasaCareHub() {
  return (
    <section id="angkasa-care" className="relative py-8 md:py-16 bg-[#FBF5EA] overflow-hidden">
      {/* Pohon Kiri (Tetap Setengah Badan di Ujung Kiri) */}
      <div className="hidden md:block absolute -left-[150px] lg:-left-[180px] top-0 bottom-0 w-[300px] lg:w-[360px] pointer-events-none z-0">
        <Image
          src="/assets/pohon.png"
          alt="Pohon Kiri"
          fill
          priority
          sizes="400px"
          style={{ objectFit: "contain", objectPosition: "center" }}
          className="rotate-90 origin-center scale-[1.6] lg:scale-[1.9] translate-y-6 opacity-95 drop-shadow-md"
        />
      </div>

      {/* Pohon Kanan (Tetap Setengah Badan di Ujung Kanan) */}
      <div className="hidden md:block absolute -right-[140px] lg:-right-[170px] top-0 bottom-0 w-[300px] lg:w-[360px] pointer-events-none z-0">
        <Image
          src="/assets/pohon.png"
          alt="Pohon Kanan"
          fill
          priority
          sizes="400px"
          style={{ objectFit: "contain", objectPosition: "center" }}
          className="rotate-90 scale-y-[-1] origin-center scale-[1.6] lg:scale-[1.9] translate-y-6 opacity-95 drop-shadow-md"
        />
      </div>
      {/* ================================================================
         DESKTOP & TABLET: Venn Diagram — Lingkaran Tengah Dikecilkan
         Disesuaikan per rasio agar pas di tengah antara dua pohon
         ================================================================ */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.4 }}
        className="hidden md:flex justify-center items-center py-6 lg:py-10 my-2"
      >
        <div className="relative w-[600px] h-[380px] scale-[0.75] min-[840px]:scale-[0.88] lg:scale-100 origin-center transition-transform duration-300">
          {/* ---- LEFT CIRCLE: Angkasa Help (Chatbot) ---- */}
          <a
            href={CONFIG.angkasaHelpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute left-0 flex flex-col items-start justify-center pl-10 rounded-full w-[380px] h-[380px] border-[3px] border-[#DCB06F] bg-transparent z-10 cursor-pointer hover:border-[#870F0C] transition-colors group"
          >
            {/* Logo Biro Ristek */}
            <div className="shrink-0 w-16 h-16 relative mb-3 group-hover:scale-110 transition-transform">
              <Image
                src="/assets/logoBirdept/ristek.png"
                alt="Biro Ristek - Angkasa Help"
                fill
                className="object-contain"
              />
            </div>
            {/* Name — bold */}
            <h3 className="font-[family-name:var(--font-display)] text-[#32210F] font-extrabold text-lg mb-1.5">
              {PLACEHOLDER.care.angkasaHelp.name}
            </h3>
            {/* CTA inside circle */}
            <span className="mt-1 inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#870F0C] text-white text-[12px] font-bold rounded-full group-hover:bg-[#6B0A08] transition-colors shadow-md">
              {PLACEHOLDER.care.angkasaHelp.cta}
              <span className="material-symbols-outlined text-[15px]">arrow_outward</span>
            </span>
          </a>

          {/* ---- RIGHT CIRCLE: MinCare ---- */}
          <a
            href={CONFIG.minCareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-0 flex flex-col items-end justify-center pr-10 rounded-full w-[380px] h-[380px] border-[3px] border-[#DCB06F] bg-transparent z-10 cursor-pointer hover:border-[#870F0C] transition-colors group"
          >
            {/* Logo Departemen Adkesmah */}
            <div className="shrink-0 w-16 h-16 relative mb-3 group-hover:scale-110 transition-transform">
              <Image
                src="/assets/logoBirdept/adkesmah.png"
                alt="Departemen Adkesmah - MinCare"
                fill
                className="object-contain"
              />
            </div>
            {/* Name — bold */}
            <h3 className="font-[family-name:var(--font-display)] text-[#32210F] font-extrabold text-lg mb-1.5 text-right">
              {PLACEHOLDER.care.minCare.name}
            </h3>
            {/* CTA inside circle */}
            <span className="mt-1 inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#DCB06F] text-[#32210F] text-[12px] font-bold rounded-full group-hover:bg-[#C49A5E] transition-colors shadow-md">
              {PLACEHOLDER.care.minCare.cta}
              <span className="material-symbols-outlined text-[15px]">arrow_outward</span>
            </span>
          </a>

          {/* ---- INTERSECTION: Angkasa Care (bold, centered) ---- */}
          <div className="absolute left-0 w-[380px] h-[380px] overflow-hidden rounded-full pointer-events-none">
            <div className="absolute top-0 -right-[220px] w-[380px] h-[380px] overflow-hidden rounded-full">
              <div className="absolute inset-y-0 right-[220px] w-[160px] flex flex-col items-center justify-center text-center uppercase font-asimovian text-[28px] lg:text-[32px] text-[#FFE3BB] leading-tight px-2 bg-[#870F0C] font-extrabold">
                <span>Angkasa</span>
                <span>Care</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ================================================================
         MOBILE: 2 Lingkaran Vertical
         BG dihilangkan, ikut background dasar
         ================================================================ */}
      <div className="flex flex-col items-center gap-0 md:hidden px-4">
        {/* ---- Lingkaran 1: Angkasa Help (Chatbot) ---- */}
        <motion.a
          href={CONFIG.angkasaHelpUrl}
          target="_blank"
          rel="noopener noreferrer"
          {...fadeUp}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="relative flex flex-col items-center justify-center w-[280px] max-[370px]:w-[240px] h-[280px] max-[370px]:h-[240px] rounded-full border-[3px] border-[#DCB06F] bg-transparent active:scale-[0.98] transition-all shadow-lg"
        >
          <div className="shrink-0 w-16 h-16 relative mb-4">
            <Image
              src="/assets/logoBirdept/ristek.png"
              alt="Biro Ristek - Angkasa Help"
              fill
              className="object-contain"
            />
          </div>
          <h3 className="font-[family-name:var(--font-display)] text-[#32210F] font-extrabold text-lg mb-2 text-center">
            {PLACEHOLDER.care.angkasaHelp.name}
          </h3>
          <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#870F0C] text-white text-[13px] font-bold rounded-full min-h-[44px] shadow-md">
            {PLACEHOLDER.care.angkasaHelp.cta}
            <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
          </span>
        </motion.a>

        {/* ---- Badge "Angkasa Care" ---- */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="relative z-20 -my-3"
        >
          <span className="inline-block rounded-full bg-[#870F0C] text-[#FFE3BB] text-[16px] font-asimovian uppercase tracking-wider font-extrabold px-8 py-3 shadow-lg border-2 border-[#DCB06F]">
            Angkasa Care
          </span>
        </motion.div>

        {/* ---- Lingkaran 2: MinCare ---- */}
        <motion.a
          href={CONFIG.minCareUrl}
          target="_blank"
          rel="noopener noreferrer"
          {...fadeUp}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="relative flex flex-col items-center justify-center w-[280px] max-[370px]:w-[240px] h-[280px] max-[370px]:h-[240px] rounded-full border-[3px] border-[#DCB06F] bg-transparent active:scale-[0.98] transition-all shadow-lg"
        >
          <div className="shrink-0 w-16 h-16 relative mb-4">
            <Image
              src="/assets/logoBirdept/adkesmah.png"
              alt="Departemen Adkesmah - MinCare"
              fill
              className="object-contain"
            />
          </div>
          <h3 className="font-[family-name:var(--font-display)] text-[#32210F] font-extrabold text-lg mb-2 text-center">
            {PLACEHOLDER.care.minCare.name}
          </h3>
          <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#DCB06F] text-[#32210F] text-[13px] font-bold rounded-full min-h-[44px] shadow-md">
            {PLACEHOLDER.care.minCare.cta}
            <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
          </span>
        </motion.a>
      </div>
    </section>
  );
}
