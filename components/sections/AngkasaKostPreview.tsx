"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PLACEHOLDER } from "../../lib/placeholder-content";
import Image from "next/image";
import { CONFIG } from "../../lib/config";

export default function AngkasaKostPreview() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const kosts = PLACEHOLDER.angkasaKost.kosts || [];

  const fadeUp = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? kosts.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === kosts.length - 1 ? 0 : prev + 1));
  };

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

            {/* Desktop Grid View (>= md) */}
            <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto my-4">
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

                  {/* Bottom Info */}
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

            {/* Mobile Carousel Slider View (< md) */}
            <div className="md:hidden relative max-w-sm mx-auto my-2">
              <div className="relative overflow-hidden w-full min-h-[420px] rounded-[28px]">
                <AnimatePresence mode="wait">
                  {kosts[currentIndex] && (
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragEnd={(_, { offset, velocity }) => {
                        const swipe = offset.x;
                        if (swipe < -40 || velocity.x < -300) {
                          nextSlide();
                        } else if (swipe > 40 || velocity.x > 300) {
                          prevSlide();
                        }
                      }}
                      className="relative flex flex-col bg-[#F6E7CC] rounded-[28px] border-[2.5px] border-[#DCB06F] shadow-xl overflow-hidden cursor-grab active:cursor-grabbing"
                    >
                      {/* Top Photo */}
                      <div className="relative w-full h-[240px] overflow-hidden bg-black/10">
                        <Image
                          src={kosts[currentIndex].image}
                          alt={kosts[currentIndex].name}
                          fill
                          className="object-cover pointer-events-none"
                        />
                      </div>

                      {/* Bottom Info */}
                      <div className="p-5 bg-[#F6E7CC] flex flex-col justify-between flex-1">
                        <div>
                          {/* Nama Kost */}
                          <h3 className="font-[family-name:var(--font-display)] font-extrabold text-[20px] text-[#1A1A1A] uppercase tracking-wide leading-tight">
                            {kosts[currentIndex].name}
                          </h3>

                          {/* Label Harga */}
                          <span className="block text-[11px] font-bold text-[#8C7A6B] tracking-widest uppercase mt-2.5">
                            HARGA
                          </span>

                          {/* Nominal Harga */}
                          <p className="font-[family-name:var(--font-display)] font-black text-[24px] text-[#701011] leading-tight mt-0.5">
                            {kosts[currentIndex].price}
                          </p>

                          {/* Periode */}
                          <span className="block text-[12px] font-medium text-[#614C3B] mt-0.5">
                            {kosts[currentIndex].period}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation Controls: Left Arrow, Dots, Right Arrow */}
              <div className="flex items-center justify-between mt-5 px-2">
                <button
                  type="button"
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full bg-[#DCB06F] text-[#701011] flex items-center justify-center shadow-lg active:scale-90 hover:bg-[#F6E7CC] transition-all"
                  aria-label="Kost sebelumnya"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                {/* Indicator Dots */}
                <div className="flex items-center gap-2">
                  {kosts.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        idx === currentIndex
                          ? "w-7 bg-[#F6E7CC]"
                          : "w-2.5 bg-[#DCB06F]/50 hover:bg-[#DCB06F]"
                      }`}
                      aria-label={`Lihat kost ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full bg-[#DCB06F] text-[#701011] flex items-center justify-center shadow-lg active:scale-90 hover:bg-[#F6E7CC] transition-all"
                  aria-label="Kost selanjutnya"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
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