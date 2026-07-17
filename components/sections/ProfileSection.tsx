"use client";

import { motion } from "framer-motion";
import { PLACEHOLDER } from "../../lib/placeholder-content";
import style from "./ProfileSection.module.css";
import IdentitySection from "./IdentitySection";

const stagger = { duration: 0.4, ease: "easeOut" as const };
const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

export default function ProfileSection() {
  return (
    <section id="profile" className="relative bg-[#FBF5EA]">
      <div className={`${style.setImageForBackground} `}>
        {/* subsection 1: logo dan jargon */}
        <IdentitySection />

        {/* subsection 2: selayang pandang dan pengertian kabinet */}
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
            {/* selayang pandang */}
            <motion.div
              {...fadeUp}
              transition={stagger}
              className="bg-[#870F0C] shadow-card hover:shadow-lift hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="h-full rounded-[25px] bg-[#FBF5EA] border-2 border-[#870F0C] relative">
                <div className="mx-10 my-7">
                  <motion.p
                    {...fadeUp}
                    transition={stagger}
                    className="font-asimovian uppercase text-[#870F0C] text-[clamp(1.8rem,6vw,50px)] text-center"
                  >
                    Selayang Pandang
                  </motion.p>
                  <motion.p
                    {...fadeUp}
                    transition={stagger}
                    className="font-montserrat text-[#870F0C] text-[clamp(1rem,3vw,20px)] text-center mb-6"
                  >
                    Ormawa Eksekutif PKU IPB
                  </motion.p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {[
                      PLACEHOLDER.intro.ormawaEkse,
                      PLACEHOLDER.intro.peranOrmawa,
                    ].map((card, i) => (
                      <motion.div
                        key={i}
                        {...fadeUp}
                        transition={{ ...stagger, delay: 0.1 + i * 0.06 }}
                        className="bg-white border border-gold-warm/20 rounded-[25px] p-3 md:p-4 shadow-card hover:shadow-lift hover:-translate-y-0.5 transition-all duration-200"
                      >
                        <h3 className="font-montserrat text-center text-[#A90900] text-[18px] text-lg font-bold mb-3">
                          {card.title}
                        </h3>
                        <hr className="mb-3 text-[#A90900] border-t-2" />
                        <p className="text-ink/70 leading-relaxed text-center text-[clamp(0.75rem,2.5vw,0.875rem)]">
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
                <div className="mx-10 my-7">
                  <motion.p
                    {...fadeUp}
                    transition={stagger}
                    className="font-asimovian uppercase text-[#870F0C] text-[clamp(1.8rem,6vw,50px)] text-center"
                  >
                    Pengertian Kabinet
                  </motion.p>
                  <motion.p
                    {...fadeUp}
                    transition={stagger}
                    className="font-montserrat text-[#870F0C] text-[clamp(1rem,3vw,20px)] text-center mb-6"
                  >
                    Astana Angkasa
                  </motion.p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {[
                      PLACEHOLDER.intro.astana,
                      PLACEHOLDER.intro.angkasa,
                    ].map((card, i) => (
                      <motion.div
                        key={i}
                        {...fadeUp}
                        transition={{ ...stagger, delay: 0.1 + i * 0.06 }}
                        className="bg-[#F6E7CC] border border-[#DCB06F] border-3 rounded-[25px] p-3 md:p-4 shadow-card hover:shadow-lift hover:-translate-y-0.5 transition-all duration-200"
                      >
                        <h3 className="font-montserrat text-center text-[#A90900] text-[18px] text-lg font-bold mb-3">
                          {card.title}
                        </h3>
                        <hr className="mb-3 text-[#A90900] border-t-2" />
                        <p className="text-ink/70 leading-relaxed text-center text-[clamp(0.75rem,2.5vw,0.875rem)]">
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
        <div className="max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8 mb-10">
          <motion.h2
            {...fadeUp}
            transition={stagger}
            className="font-kapakana text-center text-[#701011] text-[clamp(3rem,10vw,100px)] tracking-tight drop-shadow"
          // className="font-[family-name:var(--font-display)] text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold text-forest-dark text-center mb-2"
          >
            Astana Angkasa
          </motion.h2>

          <motion.p
            {...fadeUp}
            transition={stagger}
            className="mx-4 md:mx-20 lg:mx-40 text-center font-montserrat font-[500] text-[clamp(0.875rem,2.5vw,18px)]"
          >
            {PLACEHOLDER.intro.astanaAngkasa.barisSatu}
          </motion.p>
          <br />
          <motion.p
            {...fadeUp}
            transition={stagger}
            className="mx-4 md:mx-20 lg:mx-40 text-center font-montserrat font-[500] text-[clamp(0.875rem,2.5vw,18px)]"
          >
            {PLACEHOLDER.intro.astanaAngkasa.barisDua}
          </motion.p>
        </div>

        {/* Subsection 4: Visi */}
        <div className="max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8 mb-10">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-[20px] md:gap-[50px]">
            <div />

            <motion.h2
              {...fadeUp}
              transition={stagger}
              className="font-asimovian uppercase text-[clamp(2rem,8vw,64px)] text-[#2C430B] leading-none mb-10"
            >
              Visi
            </motion.h2>

            <div className="h-[5px] bg-[#2C430B]" />
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
        <div className="max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8 pb-30">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-[20px] md:gap-[50px]">
            <div className="h-[5px] bg-[#701011]" />
            <motion.h2
              {...fadeUp}
              transition={stagger}
              className="font-asimovian uppercase text-[clamp(2rem,8vw,64px)] text-[#701011] leading-none text-center mb-10"
            >
              Misi
            </motion.h2>
            <div />
          </div>
          <motion.ul
            {...fadeUp}
            transition={stagger}
            className="list-none bg-[#701011] border-3 border-[#DCB06F] rounded-[25px] p-7 drop-shadow text-[white] [&_strong]:font-bold"
          >
            {PLACEHOLDER.intro.misi.map((baris, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: baris }} className="relative pl-7 before:content-['✨'] before:absolute before:left-0 before:top-0 text-[clamp(0.875rem,2.2vw,18px)] font-montserrat" />
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
