"use client";

import { motion } from "framer-motion";
import { PLACEHOLDER } from "../../lib/placeholder-content";
import Image from "next/image";

export default function IdentitySection() {
  return (
    <section id="identity" className="relative text-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/assets/Sub-Page.png"
          alt="Background Castle"
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center",
            filter: "blur(8px)",
            transform: "scale(1.1)",
          }}
        />
      </div>

      {/* Light transparent overlay — keeps background bright and natural */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-white/20 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 p-7 md:p-10">
        {/* Logo placeholder — responsive sizing per PRD §5 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-10 md:mt-25"
        >
          <div className="inline-flex justify-center w-full">
            <Image
              src="/assets/logoKabinet.png"
              alt="Logo Kabinet Astana Angkasa"
              width={400}
              height={377}
              className="inline-flex mt-10 w-auto h-auto max-w-[180px] min-[390px]:max-w-[220px] md:max-w-[400px] drop-shadow-[0_12px_24px_rgba(0,0,0,0.3)]"
              style={{ width: "auto", height: "auto", maxWidth: "auto" }}
            />
          </div>
        </motion.div>

        {/* Nama — mobile: clamp-based, not hardcoded 150px */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
          className="font-kapakana leading-none text-[#990000] opacity-100
                     text-[clamp(3rem,12vw,150px)]
                     md:text-[150px]"
          style={{
            textShadow: "0 6px 20px rgba(0,0,0,0.4), 0 0 3px rgba(255,255,255,0.8)",
          }}
        >
          {PLACEHOLDER.identity.name}
        </motion.h2>

        {/* Slogan — mobile: margin-top ≥16px, max-width 90% */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.16, ease: "easeOut" }}
          className="mt-4 md:mt-3 text-lg md:text-xl text-bark font-montserrat"
        >
          <div className="inline-flex items-center justify-center rounded-full border-2 border-[#DEB374] px-6 md:px-8 py-3 bg-[#F6E7CC]/95 shadow-[0_6px_20px_rgba(0,0,0,0.18)] mb-6 md:mb-10 max-w-[90%] text-[#701011] font-semibold">
            <span>&ldquo;{PLACEHOLDER.identity.slogan}&rdquo;</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
