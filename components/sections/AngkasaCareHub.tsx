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
      {/* Pohon Kiri (Geser 10px ke kiri) */}
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

      {/* Pohon Kanan (Desktop Only: Tegak Berdiri, Setengah Badan di Ujung Kanan) */}
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
         DESKTOP & TABLET: Venn Diagram — 2 lingkaran bersinggungan
         BG lingkaran dihilangkan (ikut background dasar)
         Elemen kiri digeser ke kiri, elemen kanan digeser ke kanan
         ================================================================ */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.4 }}
        className="hidden md:flex justify-center items-center"
      >
        <div className="relative w-[800px] h-[480px]">
          {/* ---- LEFT CIRCLE: Angkasa Help (Chatbot) ---- */}
          <a
            href={CONFIG.angkasaHelpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute left-0 flex flex-col items-start justify-center pl-16 rounded-full w-[520px] h-[520px] border-[3px] border-[#DCB06F] bg-transparent z-10 cursor-pointer hover:border-[#870F0C] transition-colors group"
          >
            {/* Icon */}
            <div className="shrink-0 w-20 h-20 rounded-full bg-[#870F0C] flex items-center justify-center mb-5 shadow-lg group-hover:scale-105 transition-transform">
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            {/* Name — bold */}
            <h3 className="font-[family-name:var(--font-display)] text-[#32210F] font-extrabold text-2xl mb-2">
              {PLACEHOLDER.care.angkasaHelp.name}
            </h3>
            {/* CTA inside circle */}
            <span className="mt-2 inline-flex items-center gap-2 px-6 py-2.5 bg-[#870F0C] text-white text-[14px] font-bold rounded-full group-hover:bg-[#6B0A08] transition-colors shadow-md">
              {PLACEHOLDER.care.angkasaHelp.cta}
              <span className="material-symbols-outlined text-[18px]">arrow_outward</span>
            </span>
          </a>

          {/* ---- RIGHT CIRCLE: MinCare ---- */}
          <a
            href={CONFIG.minCareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-0 flex flex-col items-end justify-center pr-16 rounded-full w-[520px] h-[520px] border-[3px] border-[#DCB06F] bg-transparent z-10 cursor-pointer hover:border-[#870F0C] transition-colors group"
          >
            {/* Icon */}
            <div className="shrink-0 w-20 h-20 rounded-full bg-[#DCB06F] flex items-center justify-center mb-5 shadow-lg group-hover:scale-105 transition-transform">
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
            </div>
            {/* Name — bold */}
            <h3 className="font-[family-name:var(--font-display)] text-[#32210F] font-extrabold text-2xl mb-2 text-right">
              {PLACEHOLDER.care.minCare.name}
            </h3>
            {/* CTA inside circle */}
            <span className="mt-2 inline-flex items-center gap-2 px-6 py-2.5 bg-[#DCB06F] text-[#32210F] text-[14px] font-bold rounded-full group-hover:bg-[#C49A5E] transition-colors shadow-md">
              {PLACEHOLDER.care.minCare.cta}
              <span className="material-symbols-outlined text-[18px]">arrow_outward</span>
            </span>
          </a>

          {/* ---- INTERSECTION: Angkasa Care (bold, centered) ---- */}
          <div className="absolute left-0 w-[520px] h-[520px] overflow-hidden rounded-full pointer-events-none">
            <div className="absolute top-0 -right-[280px] w-[520px] h-[520px] overflow-hidden rounded-full">
              <div className="absolute inset-y-0 right-[280px] w-[240px] flex flex-col items-center justify-center text-center uppercase font-asimovian text-[42px] text-[#FFE3BB] leading-tight px-2 bg-[#870F0C] font-extrabold">
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
          <div className="shrink-0 w-16 h-16 rounded-full bg-[#870F0C] flex items-center justify-center mb-4 shadow-md">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
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
          <div className="shrink-0 w-16 h-16 rounded-full bg-[#DCB06F] flex items-center justify-center mb-4 shadow-md">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
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
