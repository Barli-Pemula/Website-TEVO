"use client";

import { motion } from "framer-motion";
import { PLACEHOLDER } from "../../lib/placeholder-content";
import style from "./ProfileSection.module.css";
import IdentitySection from "./IdentitySection";
import Image from "next/image";

const stagger = { duration: 0.4, ease: "easeOut" as const };
const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

export default function ProfileSection() {
  return (
    <section id="profile" className="relative bg-[#FBF5EA]">
      <div className={style.setImageForBackground}>
        {/* Menara Kiri */}
          <div className="absolute -left-20 sm:-left-24 md:-left-[90px] lg:-left-[110px] xl:-left-[170px] top-[60%] -translate-y-1/2 w-48 sm:w-60 md:w-[220px] lg:w-[280px] xl:w-[420px] pointer-events-none z-0">
            <Image
              src="/assets/menara-only.png"
              alt="Menara Astana Kiri"
              width={600}
              height={300}
              className="w-full h-auto rotate-[110deg] object-contain opacity-75 md:opacity-85 xl:opacity-100 drop-shadow-md"
            />
          </div>

          {/* Menara Kanan */}
          <div className="absolute -right-20 sm:-right-24 md:-right-[105px] lg:-right-[125px] xl:-right-[195px] top-[60%] -translate-y-1/2 w-48 sm:w-60 md:w-[220px] lg:w-[280px] xl:w-[420px] pointer-events-none z-0">
            <Image
              src="/assets/menara-only.png"
              alt="Menara Astana Kanan"
              width={600}
              height={300}
              className="w-full h-auto rotate-[70deg] object-contain opacity-75 md:opacity-85 xl:opacity-100 drop-shadow-md"
            />
          </div>
        {/* subsection 1: logo dan jargon */}
        <IdentitySection />

        {/* subsection 2: selayang pandang dan pengertian kabinet */}
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            {/* selayang pandang */}
            <motion.div
              {...fadeUp}
              transition={stagger}
              className="bg-[#870F0C] shadow-card hover:shadow-lift hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="h-full rounded-[25px] bg-[#FBF5EA] border-2 border-[#870F0C] relative">
                <div className="mx-4 my-5 md:mx-6 lg:mx-10 md:my-7">
                  <motion.p
                    {...fadeUp}
                    transition={stagger}
                    className="font-asimovian uppercase text-[#870F0C] text-[clamp(1.8rem,5vw,50px)] text-center"
                  >
                    Selayang Pandang
                  </motion.p>
                  <motion.p
                    {...fadeUp}
                    transition={stagger}
                    className="font-montserrat text-[#870F0C] text-[clamp(0.95rem,2.5vw,20px)] text-center mb-6"
                  >
                    Ormawa Eksekutif PKU IPB
                  </motion.p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {[
                      PLACEHOLDER.intro.ormawaEkse,
                      PLACEHOLDER.intro.peranOrmawa,
                    ].map((card, i) => (
                      <motion.div
                        key={i}
                        {...fadeUp}
                        transition={{ ...stagger, delay: 0.1 + i * 0.06 }}
                        className="bg-white border border-gold-warm/20 rounded-[25px] p-3.5 md:p-4 shadow-card hover:shadow-lift hover:-translate-y-0.5 transition-all duration-200"
                      >
                        <h3 className="font-montserrat text-center text-[#A90900] text-[16px] md:text-[18px] font-bold mb-3">
                          {card.title}
                        </h3>
                        <hr className="mb-3 text-[#A90900] border-t-2" />
                        <p className="text-ink/70 leading-relaxed text-center text-[clamp(0.8125rem,1.8vw,0.875rem)]">
                          {card.body}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Pengertian Kabinet */}
            <motion.div
              {...fadeUp}
              transition={stagger}
              className="bg-[#870F0C] shadow-card hover:shadow-lift hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="h-full rounded-[25px] bg-[#FBF5EA] border-2 border-[#870F0C] relative">
                <div className="mx-4 my-5 md:mx-6 lg:mx-10 md:my-7">
                  <motion.p
                    {...fadeUp}
                    transition={stagger}
                    className="font-asimovian uppercase text-[#870F0C] text-[clamp(1.8rem,5vw,50px)] text-center"
                  >
                    Pengertian Kabinet
                  </motion.p>
                  <motion.p
                    {...fadeUp}
                    transition={stagger}
                    className="font-montserrat text-[#870F0C] text-[clamp(0.95rem,2.5vw,20px)] text-center mb-6"
                  >
                    Astana Angkasa
                  </motion.p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {[
                      PLACEHOLDER.intro.astana,
                      PLACEHOLDER.intro.angkasa,
                    ].map((card, i) => (
                      <motion.div
                        key={i}
                        {...fadeUp}
                        transition={{ ...stagger, delay: 0.1 + i * 0.06 }}
                        className="bg-[#F6E7CC] border border-[#DCB06F] border-3 rounded-[25px] p-3.5 md:p-4 shadow-card hover:shadow-lift hover:-translate-y-0.5 transition-all duration-200"
                      >
                        <h3 className="font-montserrat text-center text-[#A90900] text-[16px] md:text-[18px] font-bold mb-3">
                          {card.title}
                        </h3>
                        <hr className="mb-3 text-[#A90900] border-t-2" />
                        <p className="text-ink/70 leading-relaxed text-center text-[clamp(0.8125rem,1.8vw,0.875rem)]">
                          {card.body}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Subsection 3: Astana Angkasa */}
        <div className="relative max-w-7xl mx-auto py-8 px-2 sm:px-6 lg:px-8 mb-10 overflow-hidden">
          {/* Content Text */}
          <div className="relative z-10 max-w-[82%] sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto text-center px-4 sm:px-6 py-2">
            <motion.h2
              {...fadeUp}
              transition={stagger}
              className="font-kapakana text-center text-[#701011] text-[clamp(2.8rem,9vw,54px)] sm:text-[clamp(3.6rem,8vw,80px)] md:text-[clamp(4.5rem,7vw,100px)] tracking-tight drop-shadow-sm mb-3 md:mb-6"
            >
              Astana Angkasa
            </motion.h2>

            <motion.p
              {...fadeUp}
              transition={stagger}
              className="text-center font-montserrat font-[500] text-[#32210F] text-[clamp(0.75rem,2.8vw,13.5px)] md:text-[clamp(0.875rem,2vw,18px)] leading-relaxed mb-3 md:mb-4"
            >
              {PLACEHOLDER.intro.astanaAngkasa.barisSatu}
            </motion.p>

            <motion.p
              {...fadeUp}
              transition={stagger}
              className="text-center font-montserrat font-[500] text-[#32210F] text-[clamp(0.75rem,2.8vw,13.5px)] md:text-[clamp(0.875rem,2vw,18px)] leading-relaxed"
            >
              {PLACEHOLDER.intro.astanaAngkasa.barisDua}
            </motion.p>
          </div>
        </div>

        {/* Subsection 4: Visi */}
        <div className="max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8 mb-10">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-[20px] md:gap-[50px] mb-6 md:mb-10">
            <div />

            <motion.h2
              {...fadeUp}
              transition={stagger}
              className="font-asimovian uppercase text-[clamp(2rem,8vw,64px)] text-[#2C430B] leading-none"
            >
              Visi
            </motion.h2>

            <div className="h-[4px] md:h-[5px] bg-[#2C430B] rounded-full" />
          </div>
          <motion.p
            {...fadeUp}
            transition={stagger}
            className="bg-[#2C430B] border-3 border-[#DCB06F] text-center rounded-[25px] p-5 drop-shadow font-semibold text-[white] text-[clamp(0.875rem,2.2vw,18px)] font-montserrat"
          >
            {PLACEHOLDER.intro.visi}
          </motion.p>
        </div>

        {/* Subsection 5: Misi */}
        <div className="max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8 pb-16 md:pb-30">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-[20px] md:gap-[50px] mb-6 md:mb-10">
            <div className="h-[4px] md:h-[5px] bg-[#701011] rounded-full" />
            <motion.h2
              {...fadeUp}
              transition={stagger}
              className="font-asimovian uppercase text-[clamp(2rem,8vw,64px)] text-[#701011] leading-none text-center"
            >
              Misi
            </motion.h2>
            <div />
          </div>
          <motion.ol
            {...fadeUp}
            transition={stagger}
            className="list-none bg-[#701011] border-3 border-[#DCB06F] rounded-[25px] p-6 md:p-8 drop-shadow text-[white] [&_strong]:font-bold space-y-4"
          >
            {PLACEHOLDER.intro.misi.map((baris, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-[clamp(0.875rem,2.2vw,18px)] font-montserrat leading-relaxed"
              >
                <span className="font-bold text-[#DCB06F] text-[clamp(1rem,2.3vw,20px)] shrink-0 min-w-[24px]">
                  {i + 1}.
                </span>
                <span dangerouslySetInnerHTML={{ __html: baris }} />
              </li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
