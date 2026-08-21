"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PLACEHOLDER } from "../../lib/placeholder-content";
import Image from "next/image";
import { X } from "lucide-react";
import axios from "axios";

interface unitDetail {
  id: number;
  name: string;
  code: string;
  logoUrl: string;
  slug: string;
  unitType: string;
  description: string;
  focusArea: string;
}

const stagger = { duration: 0.4, ease: "easeOut" as const };
const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

/**
 * Map unit data to the correct logo path from local assets.
 * Matches by unitType and name against the files in /public/assets/logoBirdept/
 */
function getUnitLogo(unit: unitDetail): string {
  const type = unit.unitType?.toUpperCase();
  const name = unit.name?.toLowerCase() || "";

  if (type === "BPH") {
    return "/assets/logoBirdept/bph.png";
  }

  // Biro mapping
  const biroMap: Record<string, string> = {
    internal: "/assets/logoBirdept/internal.png",
    "riset & teknologi": "/assets/logoBirdept/ristek.png",
    "riset dan teknologi": "/assets/logoBirdept/ristek.png",
    ristek: "/assets/logoBirdept/ristek.png",
    "kolaborasi & kemitraan": "/assets/logoBirdept/komit.png",
    "kolaborasi dan kemitraan": "/assets/logoBirdept/komit.png",
    komit: "/assets/logoBirdept/komit.png",
    "media & branding": "/assets/logoBirdept/medbrand.png",
    "media dan branding": "/assets/logoBirdept/medbrand.png",
    medbrand: "/assets/logoBirdept/medbrand.png",
  };

  // Departemen mapping
  const deptMap: Record<string, string> = {
    "advokasi & kesejahteraan mahasiswa": "/assets/logoBirdept/adkesmah.png",
    "advokasi dan kesejahteraan mahasiswa": "/assets/logoBirdept/adkesmah.png",
    adkesmah: "/assets/logoBirdept/adkesmah.png",
    "pengembangan sumber daya mahasiswa": "/assets/logoBirdept/psdm.png",
    psdm: "/assets/logoBirdept/psdm.png",
    "akademik & prestasi": "/assets/logoBirdept/akpres.png",
    "akademik dan prestasi": "/assets/logoBirdept/akpres.png",
    akpres: "/assets/logoBirdept/akpres.png",
    "sosial & lingkungan hidup": "/assets/logoBirdept/slh.png",
    "sosial dan lingkungan hidup": "/assets/logoBirdept/slh.png",
    slh: "/assets/logoBirdept/slh.png",
    "seni & budaya": "/assets/logoBirdept/senbud.png",
    "seni dan budaya": "/assets/logoBirdept/senbud.png",
    senbud: "/assets/logoBirdept/senbud.png",
    "pemuda & olahraga": "/assets/logoBirdept/peraga.png",
    "pemuda dan olahraga": "/assets/logoBirdept/peraga.png",
    peraga: "/assets/logoBirdept/peraga.png",
    "kajian & aksi strategis": "/assets/logoBirdept/kastrat.png",
    "kajian dan aksi strategis": "/assets/logoBirdept/kastrat.png",
    kastrat: "/assets/logoBirdept/kastrat.png",
    "ekonomi kreatif": "/assets/logoBirdept/ekraf.png",
    ekraf: "/assets/logoBirdept/ekraf.png",
  };

  if (type === "BIRO") {
    // Try to match by cleaning the name
    const cleanName = name.replace(/biro/gi, "").trim();
    if (biroMap[cleanName]) return biroMap[cleanName];
    // Fallback: try matching any biro key
    for (const [key, path] of Object.entries(biroMap)) {
      if (cleanName.includes(key) || key.includes(cleanName)) return path;
    }
    return "/assets/logoBirdept/internal.png"; // fallback
  }

  if (type === "DEPARTEMEN") {
    const cleanName = name.replace(/departemen/gi, "").trim();
    if (deptMap[cleanName]) return deptMap[cleanName];
    for (const [key, path] of Object.entries(deptMap)) {
      if (cleanName.includes(key) || key.includes(cleanName)) return path;
    }
    return "/assets/logoBirdept/adkesmah.png"; // fallback
  }

  return "/assets/logoBirdept/bph.png";
}

function handleBreakSeal(unit: unitDetail) {
  setTimeout(() => {
    window.location.href = `/struktur-organisasi/${unit.slug}`;
  }, 400);
}

type ModalCardBirDepProps = {
  unit: unitDetail | null;
  setUnit: (unit: unitDetail | null) => void;
};

function ModalCardBirDep({ unit, setUnit }: ModalCardBirDepProps) {
  if (!unit) return null;

  const logoPath = getUnitLogo(unit);

  return (
    <AnimatePresence>
      {unit && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm md:p-8"
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          transition={{ duration: 0.25 }}
          onClick={() => setUnit(null)}
        >
          <motion.div
            className="relative my-auto w-full max-w-[760px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 0.9,
              transition: { delay: 0.45, duration: 0.2 },
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gulungan atas */}
            <motion.div
              className="relative z-30 mx-auto h-14 w-[calc(100%+36px)] rounded-full bg-gradient-to-b from-[#F1C578] via-[#C98E43] to-[#9B5C25] shadow-[0_10px_25px_rgba(0,0,0,0.35)]"
              initial={{ y: 38 }}
              animate={{ y: 0 }}
              exit={{ y: 38, transition: { delay: 0.2, duration: 0.35 } }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="absolute inset-x-8 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-[#744018]/50" />
              <div className="absolute left-2 top-1/2 size-9 -translate-y-1/2 rounded-full border-2 border-[#75411B] bg-[#C8893E]" />
              <div className="absolute right-2 top-1/2 size-9 -translate-y-1/2 rounded-full border-2 border-[#75411B] bg-[#C8893E]" />
            </motion.div>

            {/* Kertas */}
            <motion.div
              className="relative z-20 mx-5 overflow-hidden border-x-2 border-[#B77A38] bg-[#F5E2B7] shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
              initial={{ height: 0, opacity: 0.85 }}
              animate={{ height: "min(70vh, 620px)", opacity: 1 }}
              exit={{
                height: 0,
                opacity: 0.85,
                transition: { duration: 0.45, ease: "easeInOut" },
              }}
              transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
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

              <motion.div
                className="relative h-full overflow-y-auto px-5 py-8 sm:px-12 sm:py-10 text-[#4B2B18]"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  y: 16,
                  transition: { duration: 0.2 },
                }}
                transition={{ delay: 0.78, duration: 0.4, ease: "easeOut" }}
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
                    {unit.unitType === "BIRO"
                      ? `Biro ${unit.name.replace(/biro/gi, "").trim()}`
                      : unit.unitType === "DEPARTEMEN"
                        ? `Departemen ${unit.name.replace(/departemen/gi, "").trim()}`
                        : unit.name}
                  </h2>
                </div>

                <div className="my-6 h-[2px] w-full bg-gradient-to-r from-transparent via-[#B77A38] to-transparent" />

                <p className="text-justify text-base leading-relaxed sm:text-md font-montserrat">
                  {unit.description} {unit.focusArea}
                </p>

                {/* Logo + Cap lilin */}
                <div className="mt-10 flex justify-end items-center gap-6">
                  {/* Unit Logo */}
                  {/* <div className="relative size-28 rounded-full border-3 border-[#DCB06F] bg-[#FBF5EA] flex items-center justify-center overflow-hidden shadow-md">
                    <Image
                      src={logoPath}
                      alt={unit.name}
                      width={90}
                      height={90}
                      className="object-contain p-2"
                    />
                  </div> */}

                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      className="group flex size-20 rotate-[-8deg] items-center justify-center rounded-full border-4 border-[#7E0909] bg-[#A90900] shadow-[0_8px_16px_rgba(0,0,0,.28)]"
                      onClick={() => handleBreakSeal(unit)}
                    >
                      <span className="group-hover:hidden text-white font-montserrat font-bold text-[10px] uppercase text-center leading-tight">
                        Lihat Detail
                      </span>
                      <Image
                        src={unit.logoUrl}
                        alt={unit.name}
                        width={64}
                        height={64}
                        className="hidden group-hover:block object-contain"
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
              exit={{ y: -38, transition: { delay: 0.2, duration: 0.35 } }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="absolute inset-x-8 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-[#744018]/50" />
              <div className="absolute left-2 top-1/2 size-9 -translate-y-1/2 rounded-full border-2 border-[#75411B] bg-[#C8893E]" />
              <div className="absolute right-2 top-1/2 size-9 -translate-y-1/2 rounded-full border-2 border-[#75411B] bg-[#C8893E]" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function StructureHub() {
  const [unit, setUnit] = useState<unitDetail[]>([]);
  const [modal, setModal] = useState<unitDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getBirdep = {
          method: "GET",
          url: "/api/nexus/public/tevo/birdeps",
        };

        const response = await axios.request(getBirdep);
        setUnit(response.data.data.birdeps);
        console.log(response.data.data.birdeps);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section id="struktur" className="relative bg-[#DCB06F] overflow-hidden">
        <div className="bg-[#870F0C] my-5 p-10">
          <div className="bg-[#DCB06F]">
            <div className="bg-[#FBF5EA] border-3 border-[#DCB06F] rounded-[25px]">
              <div className="flex justify-center items-center min-h-[400px]">
                <p className="font-montserrat text-lg animate-pulse text-[#870F0C]">
                  Memuat Struktur Organisasi...
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const bphUnits = unit.filter((u) => u.unitType?.toUpperCase() === "BPH");
  const biroUnits = unit.filter((u) => u.unitType?.toUpperCase() === "BIRO");
  const deptUnits = unit.filter(
    (u) => u.unitType?.toUpperCase() === "DEPARTEMEN"
  );

  return (
    <section id="struktur" className="relative bg-[#DCB06F] overflow-hidden">
      <div className="bg-[#870F0C] my-5 p-4 sm:p-8 md:p-10">
        <div className="bg-[#DCB06F] rounded-[10px] p-[3px]">
          <div className="bg-[#FBF5EA] border-[3px] border-[#DCB06F] rounded-[25px]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 my-10 md:my-15">
              {/* Section Title */}
              <motion.h2
                {...fadeUp}
                transition={{ duration: 0.4 }}
                className="font-asimovian text-[clamp(2rem,6vw,72px)] text-[#870F0C] uppercase leading-none mb-2"
              >
                {PLACEHOLDER.struktur.sectionTitle}
              </motion.h2>

              {/* ===== TREE DIAGRAM ===== */}
              <div className="flex flex-col items-center gap-0 mt-8">
                {/* ---- Level 1: BPH (Root) ---- */}
                {bphUnits.map((bph) => (
                  <motion.button
                    key={bph.id}
                    {...fadeUp}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    onClick={() => setModal(bph)}
                    className="group flex flex-col items-center justify-center hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 cursor-pointer"
                  >
                    <div className="relative">
                      {/* BPH Logo */}
                      <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-[3px] border-[#DCB06F] bg-white flex items-center justify-center overflow-hidden shadow-md mx-auto mb-2 group-hover:border-[#870F0C] transition-colors">
                        <Image
                          src={bph.logoUrl}
                          alt={bph.name}
                          width={80}
                          height={80}
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="border-1 border-[#DCB06F] rounded-[10px] p-1 bg-white group-hover:bg-[#DCB06F] group-hover:border-[#701011]">
                        <div className="border-2 border-[#DCB06F] rounded-[6px] px-4 py-2 text-[#701011] font-montserrat font-semibold text-[16px] md:text-[20px] uppercase group-hover:border-[#701011] group-hover:text-white">
                          {bph.name}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}

                {/* Connector: BPH → Biro Stem */}
                <div className="w-[2px] h-8 bg-[#DCB06F]" />

                {/* ---- Level 2: Biro (centered, 100% connected) ---- */}
                <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center pb-8">
                  {/* Central vertical trunk behind */}
                  <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-[#DCB06F]/60 z-0" />

                  {/* Central golden junction node */}
                  <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 size-3 rounded-full bg-[#DCB06F] z-20 shadow-sm" />

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 md:gap-4 w-full relative z-10">
                    {biroUnits.map((biro, i) => {
                      const cleanName = biro.name.replace(/biro/gi, "").trim();
                      const nameLen = cleanName.length;
                      const nameFontClass =
                        nameLen <= 9
                          ? "text-[12px] sm:text-[14px] md:text-[16px]"
                          : nameLen <= 16
                            ? "text-[11px] sm:text-[13px] md:text-[14px]"
                            : "text-[10px] sm:text-[11px] md:text-[12px]";
                      return (
                        <div
                          key={biro.id}
                          className="flex flex-col items-center w-full"
                        >
                          <motion.div
                            {...fadeUp}
                            transition={{ ...stagger, delay: 0.1 }}
                            onClick={() => setModal(biro)}
                            className="flex flex-col items-center cursor-pointer w-full h-full flex-1"
                          >
                            {/* Intra-column connector: guaranteed 100% seamless intersection */}
                            <div className="relative w-full h-6 flex justify-center shrink-0">
                              {/* Desktop (4 cols) horizontal connector */}
                              {i === 0 && (
                                <div className="hidden md:block absolute top-0 left-1/2 -right-4 h-[2px] bg-[#DCB06F]" />
                              )}
                              {i === biroUnits.length - 1 && (
                                <div className="hidden md:block absolute top-0 -left-4 right-1/2 h-[2px] bg-[#DCB06F]" />
                              )}
                              {i > 0 && i < biroUnits.length - 1 && (
                                <div className="hidden md:block absolute top-0 -left-4 -right-4 h-[2px] bg-[#DCB06F]" />
                              )}

                              {/* Mobile (2 cols) horizontal connector */}
                              {i % 2 === 0 ? (
                                <div className="md:hidden absolute top-0 left-1/2 -right-3 h-[2px] bg-[#DCB06F]" />
                              ) : (
                                <div className="md:hidden absolute top-0 -left-3 right-1/2 h-[2px] bg-[#DCB06F]" />
                              )}

                              {/* Vertical stem */}
                              <div className="w-[2px] h-full bg-[#DCB06F]" />
                            </div>

                            <div className="group bg-[#870F0C] p-[3px] text-[#F9D253] border-1 border-[#DCB06F] rounded-[10px] w-full h-full flex flex-col flex-1 transition-shadow shadow-lg hover:bg-[#DCB06F] hover:border-[#870F0C] hover:-translate-y-1 active:scale-105">
                              <div className="flex flex-col items-center justify-center gap-1 bg-[#870F0C] px-2 py-2 border-2 border-[#DCB06F] rounded-[10px] h-full group-hover:bg-[#DCB06F] group-hover:border-[#870F0C]">
                                {/* Biro Logo */}
                                <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full border-2 border-[#F9D253]/30 bg-[#701011] group-hover:bg-[#F6E7CC] group-hover:border-[#870F0C]/50 flex items-center justify-center overflow-hidden">
                                  <Image
                                    src={biro.logoUrl}
                                    alt={biro.name}
                                    width={50}
                                    height={50}
                                    className="object-contain p-1"
                                  />
                                </div>
                                <div className="text-center font-montserrat uppercase leading-tight px-1">
                                  <span className="text-[#F9D253] font-semibold text-[11px] sm:text-[13px] md:text-[14px] group-hover:text-white">
                                    Biro
                                  </span>
                                  <br />
                                  <span className={`text-white font-semibold ${nameFontClass} group-hover:text-[#870F0C]`}>
                                    {cleanName}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Connector: Biro → Departemen Stem */}
                <div className="w-[2px] h-8 bg-[#DCB06F] relative z-10" />

                {/* ---- Level 3: Departemen (2/4/8 cols, 100% connected) ---- */}
                <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center pb-8">
                  {/* Central golden junction node */}
                  <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 size-3 rounded-full bg-[#DCB06F] z-20 shadow-sm" />

                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 md:gap-2 w-full relative z-10">
                    {deptUnits.map((dept, i) => {
                      const cleanDeptName = dept.name
                        .replace(/departemen/gi, "")
                        .trim();
                      const deptNameLen = cleanDeptName.length;
                      const deptNameFontClass =
                        deptNameLen <= 10
                          ? "text-[11px] sm:text-[13px] md:text-[14px]"
                          : deptNameLen <= 18
                            ? "text-[10px] sm:text-[12px] md:text-[13px]"
                            : deptNameLen <= 24
                              ? "text-[9px] sm:text-[11px] md:text-[11px]"
                              : "text-[9px] sm:text-[10px] md:text-[10px]";
                      return (
                        <div
                          key={dept.id}
                          className="flex flex-col items-center w-full h-full"
                        >
                          <motion.div
                            {...fadeUp}
                            transition={{ ...stagger, delay: 0.1 }}
                            onClick={() => setModal(dept)}
                            className="flex flex-col flex-1 h-full w-full items-center cursor-pointer"
                          >
                            {/* Intra-column connector: guaranteed 100% seamless intersection */}
                            <div className="relative w-full h-6 flex justify-center shrink-0">
                              {/* Desktop (8 cols) horizontal connector */}
                              {i === 0 ? (
                                <div className="hidden lg:block absolute top-0 left-1/2 -right-2 h-[2px] bg-[#DCB06F]" />
                              ) : i === deptUnits.length - 1 ? (
                                <div className="hidden lg:block absolute top-0 -left-2 right-1/2 h-[2px] bg-[#DCB06F]" />
                              ) : (
                                <div className="hidden lg:block absolute top-0 -left-2 -right-2 h-[2px] bg-[#DCB06F]" />
                              )}

                              {/* Tablet (4 cols) horizontal connector */}
                              {i % 4 === 0 ? (
                                <div className="hidden sm:block lg:hidden absolute top-0 left-1/2 -right-2 h-[2px] bg-[#DCB06F]" />
                              ) : i % 4 === 3 ? (
                                <div className="hidden sm:block lg:hidden absolute top-0 -left-2 right-1/2 h-[2px] bg-[#DCB06F]" />
                              ) : (
                                <div className="hidden sm:block lg:hidden absolute top-0 -left-2 -right-2 h-[2px] bg-[#DCB06F]" />
                              )}

                              {/* Mobile (2 cols) horizontal connector */}
                              {i % 2 === 0 ? (
                                <div className="sm:hidden absolute top-0 left-1/2 -right-2 h-[2px] bg-[#DCB06F]" />
                              ) : (
                                <div className="sm:hidden absolute top-0 -left-2 right-1/2 h-[2px] bg-[#DCB06F]" />
                              )}

                              {/* Vertical stem */}
                              <div className="w-[2px] h-full bg-[#DCB06F]" />
                            </div>

                            <div className="group bg-[#2C430B] p-[3px] text-[#F9D253] border-1 border-[#DCB06F] rounded-[10px] h-full w-full flex flex-1 shadow-lg transition-shadow hover:bg-[#DCB06F] hover:border-[#2C430B] hover:-translate-y-1 active:scale-105">
                              <div className="flex flex-col justify-center items-center w-full bg-[#2C430B] p-1 md:p-2 border-2 border-[#DCB06F] rounded-[10px] group-hover:bg-[#DCB06F] group-hover:border-[#2C430B]">
                                {/* Departemen Logo */}
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-[#F9D253]/20 bg-[#1A2E06] flex items-center justify-center overflow-hidden mb-1 group-hover:bg-[#F6E7CC] group-hover:border-[#2C430B]/50">
                                  <Image
                                    src={dept.logoUrl}
                                    alt={dept.name}
                                    width={40}
                                    height={40}
                                    className="object-contain p-1"
                                  />
                                </div>
                                <div className="font-montserrat uppercase leading-tight mt-1 mb-1 text-center">
                                  <span className="text-[#F9D253] font-semibold text-[10px] md:text-[14px] group-hover:text-white">
                                    Departemen
                                  </span>
                                  <br />
                                  <span className={`text-white font-semibold ${deptNameFontClass} group-hover:text-[#2C430B]`}>
                                    {cleanDeptName}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal */}
            <ModalCardBirDep unit={modal} setUnit={setModal} />
          </div>
        </div>
      </div>
    </section>
  );
}
