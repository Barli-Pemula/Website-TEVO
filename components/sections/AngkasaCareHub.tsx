"use client";

import { motion } from "framer-motion";
import { PLACEHOLDER } from "../../lib/placeholder-content";
import { CONFIG } from "../../lib/config";
const stagger = { duration: 0.4, ease: "easeOut" as const };
const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

export default function AngkasaCareHub() {
  return (
    <section id="angkasa-care" className="relative">
      {/* diagram venn dengan 1 irisan */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.4 }}
        className="flex justify-center items-center"
      >
        <div className="relative w-200 h-120">
          {/* diagram angkasa bot */}
          <div className="absolute left-0 justify-start pl-10 rounded-full w-130 h-130 border-3 border-[#DCB06F] items-center z-10"></div>
          {/* diagram mincare */}
          <div className="absolute right-0 justify-end pr-10 rounded-full w-130 h-130 border-3 border-[#DCB06F] items-center z-10"></div>

          <div className="absolute left-0 w-130 h-130 overflow-hidden rounded-full pointer-events-none">
            <div className="absolute top-0 -right-70 w-130 h-130 overflow-hidden rounded-full  ">
              {/* daerah irisan */}
              <div className="absolute inset-y-0 right-[280px] w-[240px] flex flex-col items-center justify-center text-center uppercase font-asimovian text-[40px] text-[#F9D253] leading-tight px-2 bg-[#870F0C]">
                <span>Angkasa</span>
                <span>Care</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* button */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.4 }}
        className="flex justify-center items-center mt-20 gap-20"
      >
        {PLACEHOLDER.angkasaCare.map((care, i) => (
          <button key={i} className="rounded-[70px] flex justify-center text-center border-1 px-5 py-2 text-[18px]">{care.buttonName} <span className="material-symbols-outlined ml-2">arrow_outward</span>
          </button>
        ))}

      </motion.div>
    </section>
  );
}
