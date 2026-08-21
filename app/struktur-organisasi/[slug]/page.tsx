"use client";

import { PLACEHOLDER } from "../../../lib/placeholder-content";
import style from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import FrameCustom from "../../../styles/frameCustom.module.css";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import { EffectCards, Navigation } from "swiper/modules";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareInstagram } from "@fortawesome/free-brands-svg-icons";

import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";

import type { Swiper as SwiperType } from "swiper";

declare global {
  interface Window {
    HSStaticMethods?: {
      autoInit: () => void;
    };
  }
}

interface Program {
  id: string;
  title: string;
  summary: string;
  slug: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  birdep: {
    slug: string;
  };
  current: number;
  total: number;
}

type ProgramCategory = "event" | "konten" | "layanan";

const categoryIcons: Record<string, string> = {
  layanan: "support_agent",
  konten: "smart_display",
  event: "event_available",
};

interface Member {
  id: string;
  fullName: string;
  instagram?: string;
  positionLabel: string;
  imageUrl: string;
  birdep: {
    slug: string;
  };
  programAssignments: {
    id: string;
    title: string;
    slug: string;
    role: {
      name: string;
      slug: string;
    };
  }[];
}

function Proker({ title, summary, category, current, total }: Program) {
  const icon = category?.slug && categoryIcons[category.slug] ? categoryIcons[category.slug] : "event_available";

  return (
    <section className="hs-carousel-slide mt-2 relative mx-auto w-full shrink-0 max-w-3xl pt-14 sm:pt-16 px-2 sm:px-4">
      <div className="relative overflow-visible rounded-[26px] sm:rounded-[34px] border-2 border-[#DCB06F] bg-[#F6E7CC] px-4 sm:px-10 md:px-14 pb-6 sm:pb-8 pt-14 sm:pt-18 text-center shadow-[0_8px_0_#A86D21,0_16px_28px_rgba(0,0,0,0.18)]">
        {/* Cekungan visual */}
        <div
          className="absolute left-1/2 top-0 h-[65px] sm:h-[85px] md:h-[100px] w-[160px] sm:w-[210px] md:w-[250px] -translate-x-1/2 -translate-y-[2px] bg-[#2C430B] rounded-b-[40px] sm:rounded-b-[60px]"
          aria-hidden="true"
        />

        {/* LINGKARAN ICON */}
        <div className="absolute left-1/2 top-0 z-20 flex size-24 sm:size-28 md:size-34 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 sm:border-3 border-[#DCB06F] bg-[#870F0C] shadow-[0_8px_18px_rgba(0,0,0,0.24)]">
          <span className="material-symbols-outlined !text-[44px] sm:!text-[60px] md:!text-[72px] !leading-none text-[#DCB06F]">
            {icon}
          </span>
        </div>

        {/* Konten */}
        <div className="relative z-10 mt-4 sm:mt-6 font-montserrat">
          <h3 className="inline-block border-b-2 border-[#A90900] pb-1 font-bold text-[#A90900] text-lg sm:text-2xl md:text-3xl max-w-full break-words">
            {title}
          </h3>
          <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed text-[#32210F]">
            {summary}
          </p>

          <div className="mx-auto shadow-md mt-4 sm:mt-5 flex w-fit items-center gap-2 rounded-full border-2 border-[#DEB374] bg-[#F6E7CC] px-5 sm:px-7 py-1 sm:py-1.5 text-[#870F0C] font-semibold text-xs sm:text-sm shadow-[0_4px_0_#B98035,0_8px_14px_rgba(0,0,0,0.16)]">
            <span className="me-1">{current}</span>
            /
            <span className="ms-1">{total}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  const params = useParams();
  const slugParam = params?.slug;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;

  const [birdep, setBirdep] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [programs, setPrograms] = useState<Program[]>([]);
  const [loadingPrograms, setLoadingPrograms] = useState(true);
  const [programError, setProgramError] = useState<string | null>(null);

  const [members, setMembers] = useState<Member[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [memberError, setMemberError] = useState<string | null>(null);

  const activeMember = members[activeIndex];
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    import("preline").then(() => {
      window.HSStaticMethods?.autoInit();
    });
  }, [programs]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoadingPrograms(true);
        setProgramError(null);

        const response = await axios.get("/api/nexus/public/tevo/programs");
        const getPrograms = response.data?.data || [];
        const filteredPrograms = getPrograms.filter(
          (program: Program) => program.birdep?.slug === slug
        );
        setPrograms(filteredPrograms);
      } catch (error) {
        console.error("Gagal mengambil data program", error);
        setProgramError("Data program gagal dimuat.");
      } finally {
        setLoadingPrograms(false);
      }
    };

    if (slug) fetchPrograms();
  }, [slug]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoadingMembers(true);
        setMemberError(null);

        const response = await axios.get("/api/nexus/public/tevo/members");
        const getMembers = response.data?.data?.members || [];
        const filteredMembers = getMembers.filter(
          (member: Member) => member.birdep?.slug === slug
        );

        setMembers(filteredMembers);
        setActiveIndex(0);
      } catch (error) {
        console.error("Gagal mengambil data anggota", error);
        setMemberError("Data pengurus gagal dimuat.");
      } finally {
        setLoadingMembers(false);
      }
    };

    if (slug) {
      fetchMembers();
    }
  }, [slug]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getBirdeps = {
          method: "GET",
          url: "/api/nexus/public/tevo/birdeps",
        };

        const response = await axios.request(getBirdeps);
        const allBirdeps = response.data?.data?.birdeps || [];
        const getThisBirdep = allBirdeps.find(
          (thisBirdep: any) => thisBirdep.slug === slug
        );
        if (getThisBirdep) setBirdep(getThisBirdep);
        setLoading(false);
      } catch (error) {
        console.error("Gagal mengambil data struktur", error);
        setLoading(false);
      }
    };

    if (slug) fetchData();
  }, [slug]);

  const stagger = { duration: 0.4, ease: "easeOut" as const };
  const fadeUp = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBF5EA] flex flex-col items-center justify-center p-6 text-center font-montserrat">
        <div className="size-16 rounded-full border-4 border-[#DCB06F] border-t-[#870F0C] animate-spin mb-4" />
        <p className="text-lg font-semibold text-[#870F0C]">Memuat Data Struktur Organisasi...</p>
        <p className="text-xs text-[#32210F]/70 mt-1">Kabinet Astana Angkasa</p>
      </div>
    );
  }

  if (!birdep) {
    return (
      <div className="min-h-screen bg-[#FBF5EA] flex flex-col items-center justify-center p-6 text-center font-montserrat">
        <div className="max-w-md bg-[#F6E7CC] border-2 border-[#DCB06F] rounded-2xl p-8 shadow-xl">
          <span className="material-symbols-outlined !text-6xl text-[#870F0C] mb-3">
            sentiment_dissatisfied
          </span>
          <h2 className="text-2xl font-bold text-[#870F0C] mb-2 font-asimovian">
            Data Tidak Ditemukan
          </h2>
          <p className="text-sm text-[#32210F] mb-6">
            Informasi struktur organisasi untuk bagian ini belum tersedia atau tautan tidak valid.
          </p>
          <Link
            href="/#struktur"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#870F0C] text-white font-semibold text-sm shadow-md hover:bg-[#A90900] transition"
          >
            <span className="material-symbols-outlined !text-xl">arrow_back</span>
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="relative bg-[#FBF5EA] overflow-x-hidden min-h-screen">
      {/* Hero Header Area */}
      <div className={`${style.setImageForBackground} flex items-center pt-28 sm:pt-32 md:pt-36 pb-10 sm:pb-16`}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeUp}
            transition={stagger}
            className="flex flex-col justify-center items-center gap-6 sm:gap-8 md:flex-row md:items-center md:justify-start md:gap-12 lg:gap-16 pt-6 md:pt-10"
          >
            <div className="relative w-[150px] h-[150px] sm:w-[220px] sm:h-[220px] md:w-[280px] md:h-[280px] lg:w-[340px] lg:h-[340px] shrink-0">
              <Image
                className="drop-shadow-md object-contain"
                fill
                sizes="(max-width: 640px) 150px, (max-width: 768px) 220px, 340px"
                src={birdep.logoUrl || "/assets/logoBirdept/bph.png"}
                alt={birdep.name}
                priority
              />
            </div>
            <div className="w-full text-center md:text-left max-w-2xl">
              <h2 className="font-lacheyard text-[clamp(2.2rem,7vw,5.5rem)] text-[#A90900] leading-[1.15] mb-3 md:mb-5 drop-shadow-sm break-words">
                {birdep.name}
              </h2>
              <p className="font-montserrat text-sm sm:text-base md:text-[17px] text-[#32210F] leading-relaxed mb-3">
                {birdep.description}
              </p>
              {birdep.focusArea && (
                <p className="font-montserrat text-xs sm:text-sm md:text-[15px] text-[#553820] font-medium bg-[#F6E7CC]/70 border border-[#DCB06F]/60 rounded-xl p-3 sm:p-4 mt-2">
                  {birdep.focusArea}
                </p>
              )}
            </div>
          </motion.div>

          {/* Quick Stats Counter Banner */}
          <motion.div
            className={`relative bg-[#870F0C] px-4 sm:px-8 md:px-10 py-4 sm:py-6 text-white mt-8 sm:mt-12 mb-12 sm:mb-16 md:mb-20 max-w-4xl mx-auto border-2 sm:border-3 border-[#DCB06F] ${FrameCustom.royalFrame}`}
          >
            <div className="grid grid-cols-2 divide-x divide-[#E7B763]/60">
              {/* Anggota Aktif */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 px-2 sm:px-6">
                <div className="border-2 sm:border-3 border-[#DCB06F] bg-[#F6E7CC] rounded-[16px] sm:rounded-[22px] p-2 sm:p-2.5 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined !text-[30px] sm:!text-[44px] md:!text-[52px] text-[#870F0C]">
                    groups_2
                  </span>
                </div>
                <div className="font-montserrat leading-none text-center sm:text-left">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F9D253] mb-1">
                    {members.length}
                  </p>
                  <p className="uppercase font-semibold text-[10px] sm:text-xs md:text-sm tracking-wide text-white/90">
                    Anggota Aktif
                  </p>
                </div>
              </div>

              {/* Program Kerja */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 px-2 sm:px-6">
                <div className="border-2 sm:border-3 border-[#DCB06F] bg-[#F6E7CC] rounded-[16px] sm:rounded-[22px] p-2 sm:p-2.5 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined !text-[30px] sm:!text-[44px] md:!text-[52px] text-[#870F0C]">
                    assignment
                  </span>
                </div>
                <div className="font-montserrat leading-none text-center sm:text-left">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F9D253] mb-1">
                    {programs.length}
                  </p>
                  <p className="uppercase font-semibold text-[10px] sm:text-xs md:text-sm tracking-wide text-white/90">
                    Program Kerja
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Program Kerja Section */}
          <motion.section
            id="program-kerja"
            className="relative p-1 md:p-1.5 bg-[#DCB06F] rounded-[24px] sm:rounded-[28px]"
          >
            <div className="mx-auto p-4 sm:p-8 md:p-12 bg-[#2C430B] rounded-[20px] sm:rounded-[25px]">
              <div className="text-center mb-4">
                <motion.h2
                  {...fadeUp}
                  transition={{ duration: 0.4 }}
                  className="font-asimovian uppercase leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#FBF5EA]"
                >
                  Program Kerja
                </motion.h2>
              </div>

              {loadingPrograms ? (
                <div className="py-8 text-center font-montserrat text-[#F6E7CC]">
                  <div className="size-8 rounded-full border-2 border-[#DCB06F] border-t-[#F6E7CC] animate-spin mx-auto mb-2" />
                  <p className="text-xs sm:text-sm">Memuat program kerja...</p>
                </div>
              ) : programError ? (
                <div className="py-6 text-center font-montserrat text-red-300 text-xs sm:text-sm">
                  {programError}
                </div>
              ) : programs.length > 0 ? (
                <div
                  id="hs-carousel"
                  className="relative my-4 sm:my-8"
                  data-hs-carousel='{"isInfiniteLoop": true}'
                >
                  <div className="hs-carousel relative min-h-[360px] sm:min-h-[380px] md:min-h-[350px] w-full overflow-hidden">
                    {/* Carousel Body */}
                    <div className="hs-carousel-body absolute inset-s-0 top-0 bottom-0 flex flex-nowrap transition-transform duration-700">
                      {programs.map((program, i) => (
                        <Proker
                          key={program.id}
                          {...program}
                          current={i + 1}
                          total={programs.length}
                        />
                      ))}
                    </div>

                    {/* Carousel Controls */}
                    {programs.length > 1 && (
                      <>
                        <button
                          type="button"
                          className="hs-carousel-prev absolute top-1/2 left-1 sm:left-2 -translate-y-1/2 z-20 flex size-9 sm:size-11 items-center justify-center rounded-full border-2 border-[#DCB06F] bg-[#F6E7CC] text-[#870F0C] shadow-md hover:scale-105 active:scale-95 transition-transform"
                          aria-label="Proker sebelumnya"
                        >
                          <span className="material-symbols-outlined !text-[28px] sm:!text-[36px]">
                            keyboard_arrow_left
                          </span>
                        </button>
                        <button
                          type="button"
                          className="hs-carousel-next absolute top-1/2 right-1 sm:right-2 -translate-y-1/2 z-20 flex size-9 sm:size-11 items-center justify-center rounded-full border-2 border-[#DCB06F] bg-[#F6E7CC] text-[#870F0C] shadow-md hover:scale-105 active:scale-95 transition-transform"
                          aria-label="Proker selanjutnya"
                        >
                          <span className="material-symbols-outlined !text-[28px] sm:!text-[36px]">
                            keyboard_arrow_right
                          </span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="my-6 py-8 px-4 text-center rounded-[20px] border border-[#DCB06F]/40 bg-[#243709] text-[#F6E7CC] font-montserrat">
                  <span className="material-symbols-outlined !text-4xl sm:!text-5xl text-[#DCB06F] mb-2 inline-block">
                    assignment_turned_in
                  </span>
                  <p className="text-sm sm:text-base font-semibold">
                    Program Kerja Terpusat
                  </p>
                  <p className="text-xs sm:text-sm text-[#F6E7CC]/80 mt-1 max-w-md mx-auto">
                    Seluruh pelaksanaan program strategis dikoordinasikan secara komprehensif oleh kepengurusan.
                  </p>
                </div>
              )}
            </div>
          </motion.section>
        </div>
      </div>

      {/* Struktur Pengurus Section */}
      <div className="bg-[#DCB06F] overflow-hidden">
        <div className="my-3 sm:my-5 p-2 sm:p-6 md:p-10 bg-[#870F0C]">
          <div className="border-2 sm:border-3 border-[#DCB06F] bg-[#FBF5EA] rounded-[20px] sm:rounded-[25px] p-4 sm:p-8 md:p-10 mx-auto max-w-7xl">
            <div className="relative z-10 my-4 sm:my-8 text-center">
              <motion.h2
                {...fadeUp}
                transition={{ duration: 0.4 }}
                className="font-asimovian text-center text-3xl sm:text-5xl md:text-6xl lg:text-[72px] text-[#870F0C] uppercase leading-tight mb-4 sm:mb-8"
              >
                Struktur Pengurus
              </motion.h2>
            </div>

            {loadingMembers ? (
              <div className="py-12 text-center font-montserrat text-[#870F0C]">
                <div className="size-10 rounded-full border-3 border-[#DCB06F] border-t-[#870F0C] animate-spin mx-auto mb-3" />
                <p className="text-sm sm:text-base font-medium">Memuat pengurus...</p>
              </div>
            ) : memberError ? (
              <div className="py-10 text-center font-montserrat text-red-700 text-sm sm:text-base">
                {memberError}
              </div>
            ) : members.length === 0 || !activeMember ? (
              <div className="py-10 px-4 text-center font-montserrat text-[#701011] bg-[#F6E7CC]/50 rounded-xl border border-[#DCB06F]/60 max-w-lg mx-auto my-6">
                <span className="material-symbols-outlined !text-4xl text-[#870F0C] mb-2 inline-block">
                  badge
                </span>
                <p className="text-base font-semibold">Data Pengurus Sedang Diperbarui</p>
                <p className="text-xs sm:text-sm text-[#701011]/80 mt-1">
                  Daftar susunan pengurus untuk unit ini akan segera ditampilkan.
                </p>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 sm:gap-10 lg:gap-12 xl:gap-16 mb-8 sm:mb-14">
                {/* Swiper Card Pengurus */}
                <div className="w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[360px] shrink-0 flex flex-col items-center">
                  <div className={style.carouselWrapper}>
                    <Swiper
                      effect="cards"
                      grabCursor={true}
                      modules={[EffectCards, Navigation]}
                      cardsEffect={{
                        perSlideOffset: 7,
                        perSlideRotate: 4,
                        rotate: true,
                        slideShadows: false,
                      }}
                      onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                      }}
                      onSlideChange={(swiper) => {
                        setActiveIndex(swiper.activeIndex);
                      }}
                      className={style.storeSwiper}
                    >
                      {members.map((member, idx) => (
                        <SwiperSlide key={member.id} className={style.storeSlide}>
                          <div className="relative w-full h-full">
                            <Image
                              src={member.imageUrl || "/assets/contohKatalog.jpg"}
                              alt={member.fullName}
                              fill
                              sizes="(max-width: 640px) 220px, 260px"
                              className="object-cover rounded-[16px]"
                              priority={idx === 0}
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>

                  {/* Navigation controls */}
                  <div className="mt-4 sm:mt-6 flex items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => swiperRef.current?.slidePrev()}
                      disabled={activeIndex === 0}
                      className="flex size-10 sm:size-12 items-center justify-center rounded-full border-2 border-[#DCB06F] bg-[#F6E7CC] text-[#2C430B] shadow-sm transition hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Pengurus sebelumnya"
                    >
                      <span className="material-symbols-outlined !text-[32px] sm:!text-[36px]">
                        keyboard_arrow_left
                      </span>
                    </button>

                    <span className="min-w-16 text-center font-montserrat font-bold text-xs sm:text-sm md:text-base text-[#2C430B]">
                      {activeIndex + 1} / {members.length}
                    </span>

                    <button
                      type="button"
                      onClick={() => swiperRef.current?.slideNext()}
                      disabled={activeIndex === members.length - 1}
                      className="flex size-10 sm:size-12 items-center justify-center rounded-full border-2 border-[#DCB06F] bg-[#F6E7CC] text-[#2C430B] shadow-sm transition hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Pengurus selanjutnya"
                    >
                      <span className="material-symbols-outlined !text-[32px] sm:!text-[36px]">
                        keyboard_arrow_right
                      </span>
                    </button>
                  </div>
                </div>

                {/* Detail Pengurus Aktif */}
                <div className="w-full flex-1 max-w-2xl px-2 sm:px-4 font-montserrat text-center lg:text-left">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeMember.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.25 }}
                    >
                      <h3 className="inline-block mb-3 sm:mb-4 border-b-2 leading-tight border-[#A90900] text-[#A90900] text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold pb-1 break-words">
                        {activeMember.fullName}
                      </h3>

                      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-5 sm:mb-6">
                        <div
                          className={`${FrameCustom.royalFrame} bg-[#2C430B] px-4 sm:px-6 py-1 text-[#F9D253] border-2 sm:border-3 border-[#DCB06F]`}
                        >
                          <div className="px-3 sm:px-5 py-1 border-b-2 border-t-2 border-[#DCB06F] uppercase font-bold text-xs sm:text-sm tracking-wider">
                            {activeMember.positionLabel}
                          </div>
                        </div>
                        {activeMember.instagram && (
                          <a
                            href={`https://www.instagram.com/${activeMember.instagram.replace(/^@/, "")}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center text-[#2C430B] hover:text-[#870F0C] transition-colors p-1 hover:scale-110 active:scale-95"
                            aria-label="Instagram Pengurus"
                          >
                            <FontAwesomeIcon
                              icon={faSquareInstagram}
                              className="text-[34px] sm:text-[40px]"
                            />
                          </a>
                        )}
                      </div>

                      <h4 className="text-[#701011] text-xs sm:text-sm md:text-base font-semibold uppercase mb-3 text-center lg:text-left tracking-wide">
                        Jabatan di Program Kerja
                      </h4>

                      {activeMember.programAssignments &&
                      activeMember.programAssignments.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 w-full">
                          {activeMember.programAssignments.map((pa) => {
                            const findProgram = programs.find((p) => p.slug === pa.slug);
                            const icon =
                              findProgram?.category?.slug &&
                              categoryIcons[findProgram.category.slug as ProgramCategory]
                                ? categoryIcons[findProgram.category.slug as ProgramCategory]
                                : "person_2";

                            return (
                              <div
                                key={pa.id}
                                className="flex min-h-[48px] items-center rounded-[10px] border-2 border-[#DCB06F] bg-[#F6E7CC]/50 p-1.5 shadow-xs"
                              >
                                <div className="rounded-[6px] border border-[#DCB06F] bg-[#870F0C] p-1 shrink-0 flex items-center justify-center size-8 sm:size-9">
                                  <span className="material-symbols-outlined !text-[20px] sm:!text-[22px] text-[#DCB06F] !leading-none">
                                    {icon}
                                  </span>
                                </div>
                                <p className="px-2.5 font-bold text-[#870F0C] text-xs sm:text-sm leading-snug break-words text-left">
                                  <span className="text-[#2C430B] font-semibold">
                                    {pa.role?.name || "Anggota"}
                                  </span>{" "}
                                  {pa.title}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-xs sm:text-sm text-[#701011]/80 italic bg-[#F6E7CC]/40 p-3 rounded-[8px] border border-[#DCB06F]/40 text-center lg:text-left">
                          Anggota ini berfokus pada manajemen internal dan koordinasi fungsional organisasi.
                        </p>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}