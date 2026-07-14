"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PLACEHOLDER } from "../../lib/placeholder-content";
import Image from "next/image";
import { X } from "lucide-react";
import Link from "next/link";
import axios from "axios"
import { METHODS } from "node:http";
import { url } from "node:inspector";

const getBirdep = {
  method: "GET",
  url: "https://nexus.ormawaeksekutifpku.com/api/public/tevo/birdeps"
}

try {
  const dataBirdeps = await axios.request(getBirdep)
  // console.log('berhasil get birdep')
} catch (error) {
  console.error(error)
}

interface unitDetail {
  name: string,
  shortName: string,
  logo: string,
  slug: string,
  type: "bph" | "biro" | "departemen"
};

const stagger = { duration: 0.4, ease: "easeOut" as const };
const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

function handleBreakSeal(unit: unitDetail) {
  setTimeout(() => {
    window.open(
      `/birdep/${unit.slug}`,
      "_blank",
      "noopener,noreferrer"
    );
  }, 700);
}

type ModalCardBirDepProps = { unit: unitDetail | null; setUnit: () => void }

function ModalCardBirDep({ unit, setUnit }: ModalCardBirDepProps) {
  if (!unit) return null
  return (
    <AnimatePresence>
      {unit && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm md:p-8"
          initial={{
            opacity: 0,
            backdropFilter: "blur(0px)",
          }}
          animate={{
            opacity: 1,
            backdropFilter: "blur(8px)",
          }}
          exit={{
            opacity: 0,
            backdropFilter: "blur(0px)",
          }}
          transition={{ duration: 0.25 }}
          onClick={() => setUnit()}
        >
          {/* Wrapper seluruh gulungan */}
          <motion.div
            className="relative my-auto w-full max-w-[760px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 0.9,
              transition: {
                delay: 0.45,
                duration: 0.2,
              },
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* gulungan atas */}
            <motion.div
              className="relative z-30 mx-auto h-14 w-[calc(100%+36px)] rounded-full bg-gradient-to-b from-[#F1C578] via-[#C98E43] to-[#9B5C25] shadow-[0_10px_25px_rgba(0,0,0,0,0.35)]"
              initial={{ y: 38 }}
              animate={{ y: 0 }}
              exit={{ y: 38, transition: { delay: 0.2, duration: 0.35 } }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="absolute inset-x-8 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-[#744018]/50" />
              <div className="absolute left-2 top-1/2 size-9 -translate-y-1/2 rounded-full border-2 border-[#75411B] bg-[#C8893E]" />
              <div className="absolute right-2 top-1/2 size-9 -translate-y-1/2 rounded-full border-2 border-[#75411B] bg-[#C8893E]" />
            </motion.div>

            {/* kertas terbuka */}
            {/* Kertas yang membuka */}
            <motion.div
              className="relative z-20 mx-5 overflow-hidden border-x-2 border-[#B77A38] bg-[#F5E2B7] shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
              initial={{
                height: 0,
                opacity: 0.85,
              }}
              animate={{
                height: "min(70vh, 620px)",
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0.85,
                transition: {
                  duration: 0.45,
                  ease: "easeInOut",
                },
              }}
              transition={{
                delay: 0.25,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Tekstur halus */}
              <div
                className="pointer-events-none absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 20% 20%, rgba(112,65,25,.14), transparent 22%),
                    radial-gradient(circle at 80% 75%, rgba(112,65,25,.12), transparent 26%),
                    linear-gradient(rgba(255,255,255,.15), rgba(126,74,28,.08))
                  `,
                }}
              />

              {/* Isi surat */}
              <motion.div
                className="relative h-full overflow-y-auto px-7 py-10 text-[#4B2B18] sm:px-12"
                initial={{
                  opacity: 0,
                  y: 24,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 16,
                  transition: {
                    duration: 0.2,
                  },
                }}
                transition={{
                  delay: 0.78,
                  duration: 0.4,
                  ease: "easeOut",
                }}
              >
                <button
                  type="button"
                  onClick={() => setUnit(null)}
                  className="absolute right-5 top-5 z-20 flex size-10 items-center justify-center rounded-full border border-[#9B5C25] bg-[#F1D49A] text-[#701011] shadow-md transition hover:scale-105 hover:bg-[#E7BF76]"
                  aria-label="Tutup modal"
                >
                  <X className="size-5" />
                </button>

                <div className="pr-12">
                  <p className="mb-2 text-sm font-semibold font-montserrat uppercase tracking-[0.2em] text-[#9B5C25]">
                    Struktur Organisasi
                  </p>

                  <h2 className="text-3xl font-bold font-asimovian uppercase leading-tight text-[#701011] sm:text-5xl">
                    {unit.type === "biro" ? `Biro ${unit.name}` : unit.type === "departemen" ? `Departemen ${unit.name}` : unit.name}
                  </h2>
                </div>

                <div className="my-6 h-[2px] w-full bg-gradient-to-r from-transparent via-[#B77A38] to-transparent" />

                <p className="text-justify text-base leading-tight sm:text-md font-montserrat">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem optio magnam deserunt corrupti recusandae quo et, neque veniam ullam quos, commodi repudiandae quod necessitatibus? Dolor modi voluptatibus eligendi quas repellat.
                  {/* {unit.type == "biro" ? `Biro ${unit.name}` : unit.type == "departemen" ? `Departemen ${unit.name}` : unit.name} */}
                </p>

                {/* Cap lilin */}
                <div className="mt-10 flex justify-end">
                  <div className="relative">

                    <motion.div
                      animate={{
                        x: [0, 8, 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.8,
                      }}
                      className="absolute right-24 top-1/2 -translate-y-1/2 whitespace-nowrap font-monstserrat uppercase text-1xl text-[#A90900]"
                    >
                      Tekan Logo Ini →
                    </motion.div>

                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      className="flex size-20 rotate-[-8deg] items-center justify-center rounded-full border-4 border-[#7E0909] bg-[#A90900] shadow-[0_8px_16px_rgba(0,0,0,.28)]"
                      onClick={() => handleBreakSeal(unit)}
                    >
                      <Image
                        src={unit.logo}
                        alt={unit.name}
                        width={100}
                        height={100}
                      />
                    </motion.button>

                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Gulungan bawah */}
            <motion.div
              className="relative z-30 mx-auto h-14 w-[calc(100%+36px)] rounded-full border-2 border-[#9B5C25] bg-gradient-to-b from-[#F1C578] via-[#C98E43] to-[#9B5C25] shadow-[0_10px_25px_rgba(0,0,0,0.35)]"
              initial={{ y: -38 }}
              animate={{ y: 0 }}
              exit={{
                y: -38,
                transition: {
                  delay: 0.2,
                  duration: 0.35,
                },
              }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
              }}
            >
              <div className="absolute inset-x-8 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-[#744018]/50" />
              <div className="absolute left-2 top-1/2 size-9 -translate-y-1/2 rounded-full border-2 border-[#75411B] bg-[#C8893E]" />
              <div className="absolute right-2 top-1/2 size-9 -translate-y-1/2 rounded-full border-2 border-[#75411B] bg-[#C8893E]" />
            </motion.div>
          </motion.div>
        </motion.div>

      )}
    </AnimatePresence>
  )
}


export default function StructureHub() {
  const [unit, setUnit] = useState<unitDetail | null>(null)

  const units: unitDetail[] = [
    {
      ...PLACEHOLDER.struktur.bph, type: "bph", slug: "bph",
      ...PLACEHOLDER.struktur.biro.map((b) => ({ ...b, type: "biro" as const })),
      ...PLACEHOLDER.struktur.departemen.map((d) => ({ ...d, type: "deprtemen" as const }))
    }
  ];

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
                  onClick={() => setUnit(units[0])}
                  className="flex flex-col items-center justify-center hover:border-crimson hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
                >
                  <Image src={PLACEHOLDER.struktur.bph.logo} alt={PLACEHOLDER.struktur.bph.name} width={104} height={115} className="object-contain" />
                  <div className="border-1 border-[#DCB06F] rounded-[10px] p-1">
                    <div className="border-2 border-[#DCB06F] rounded-[6px] p-3 text-[#701011] font-montserrat font-semibold text-[20px] uppercase">
                      {dataBirdep}
                    </div>
                  </div>
                </motion.button>

                {/* Connector Line */}
                <div className="w-[2px] h-8 bg-[#DCB06F]/40" />

                {/* Horizontal connector */}
                <div className="w-3/4 h-[2px] bg-[#DCB06F]/40 relative">
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#DCB06F]/60" />
                </div>
                <div className="relative w-full flex flex-col items-center pb-8">
                  {/* konektor vertikal tengah sampai ke departemen */}
                  <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-[#DCB06F]/40 z-0" />

                  {/* Biro Branch + nodes */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full h-full items-strecth">
                    {PLACEHOLDER.struktur.biro.map((biro, i) => (
                      <div key={i} className="flex flex-col w-full h-full items-center">
                        <motion.div
                          {...fadeUp}
                          transition={{ ...stagger, delay: 0.1 + i * 0.06 }}
                          onClick={() => setUnit({ ...biro, type: "biro" })}
                          className="flex flex-col items-center cursor-pointer w-70 h-full flex-1"
                        >
                          <div className="w-[2px] h-6 bg-[#DCB06F]/40 shrink-0" />
                          <div className="bg-[#870F0C] p-1 text-[#F9D253] border-1 border-[#DCB06F] rounded-[10px] w-full h-full flex flex-col flex-1">
                            <div className="flex flex-1 justify-center gap-3 items-center bg-[#870F0C] pr-2 py-1 border-2 border-[#DCB06F] rounded-[10px]">
                              <div className="shrink-0">
                                <Image src={biro.logo} alt={biro.name} width={95} height={95} />
                              </div>
                              <div className=" text-[20px] text-left font-montserrat uppercase leading-tight">
                                <span className="text-[#F9D253] font-semibold">Biro</span>
                                <br />
                                <span className="text-[white]">{biro.name}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Horizontal connector */}
                <div className="w-7/8 h-[2px] bg-[#DCB06F]/40 relative">
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#DCB06F]/60" />
                </div>

                {/* Dept Branch + nodes */}
                <div className="grid grid-cols-4 md:grid-cols-8 gap-1 w-full">
                  {PLACEHOLDER.struktur.departemen.map((dept, i) => (
                    <div key={i} className="flex flex-col items-center w-full h-full">
                      <motion.div
                        {...fadeUp}
                        transition={{ ...stagger, delay: 0.1 + i * 0.06 }}
                        onClick={() => setUnit({ ...dept, type: "departemen" })}
                        className="flex flex-col flex-1 h-full w-full items-center w-20 cursor-pointer"
                      >
                        <div className="w-[2px] h-6 bg-[#DCB06F]/40 shrink-0" />
                        <div className=" bg-[#2C430B] p-1 text-[#F9D253] border-1 border-[#DCB06F] rounded-[10px] h-full w-full flex flex-1">
                          <div className="flex flex-wrap justify-center items-center bg-[#2C430B] p-1 border-2 border-[#DCB06F] rounded-[10px]">
                            <div className="h-1/3">
                              <Image src={dept.logo} alt={dept.name} width={69} height={70} className="object-contain" />
                            </div>
                            <div className="h-1/3 text-[14px] font-montserrat uppercase leading-tight mt-4 mb-2">
                              <span className="text-[#F9D253] font-semibold">Departemen</span>
                              <br />
                              <span className="text-[white] ">{dept.name}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* Modal */}
            {unit && (
              <ModalCardBirDep unit={unit} setUnit={() => setUnit(null)} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
