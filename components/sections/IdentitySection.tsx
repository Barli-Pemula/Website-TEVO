"use client";

import { motion } from "framer-motion";
import { PLACEHOLDER } from "../../lib/placeholder-content";
import Image from "next/image";

export default function IdentitySection() {
  return (
    <section id="" className="relative text-center">
      <div className="p-7 md:p-10">
        {/* <div className="border-2 border-[#DCB06F] bg-[#DCB06F]">
          <div className="rounded-[25px] border-1 border-[#DCB06F] bg-[#FBF5EA]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"> */}
              {/* Ornamen atas */}
              {/* <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "80px" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mx-auto h-[2px] bg-gold-warm mb-8"
              /> */}

              {/* Logo placeholder */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-25"
              >
                <Image src="/assets/logoKabinet.png" alt="logo" width={400} height={377} className="inline-flex mt-10" />
                {/* <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-gold-warm/40 bg-cream-soft/40">
            <span className="text-3xl md:text-4xl font-[family-name:var(--font-display)] font-extrabold text-forest-dark">
              AA
            </span>
          </div> */}
              </motion.div>

              {/* Nama */}
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
                className={`font-kapakana text-[150px] leading-none text-[#A90900] drop-shadow [text-shadow:0_10px_20px_rgba(0,0,0,0.35)] tracking-tight`}
              // className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-forest-dark tracking-tight"
              >
                {PLACEHOLDER.identity.name}
              </motion.h2>

              {/* Slogan */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.16, ease: "easeOut" }}
                className="mt-3 text-lg md:text-xl text-bark font-montserrat]"
              >
                <div className="inline-flex items-center justify-center rounded-full border-2 border-[#DEB374] px-8 py-3 bg-[#F6E7CC] mb-10">
                  <span>&ldquo;{PLACEHOLDER.identity.slogan}&rdquo;</span>
                </div>
              </motion.div>

              {/* Ornamen bawah */}
              {/* <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "80px" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.24, ease: "easeOut" }}
                className="mx-auto h-[2px] bg-gold-warm mt-8"
              /> */}
            </div>
          {/* </div>
        </div>
      </div> */}
    </section>
  );
}
