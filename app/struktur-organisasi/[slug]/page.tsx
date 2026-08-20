"use client"

import { PLACEHOLDER } from "../../../lib/placeholder-content";
import style from "./page.module.css"
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion"
import FrameCustom from "../../../styles/frameCustom.module.css"

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import "swiper/css/navigation";
import { EffectCards, Navigation } from 'swiper/modules';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareInstagram } from "@fortawesome/free-brands-svg-icons";

import axios from "axios"
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";

import type { Swiper as SwiperType } from "swiper"

declare global {
  interface Window {
    HSStaticMethods?: {
      autoInit: () => void;
    };
  }
}

interface Program {
  id: string,
  title: string,
  summary: string,
  slug: string,
  category: {
    id: string,
    name: string,
    slug: string,
  },
  birdep: {
    slug: string,
  },
  current: number,
  total: number,
}

type ProgramCategory = "event" | "konten" | "layanan"

const categoryIcons: Record<ProgramCategory, string> = {
  layanan: "support_agent",
  konten: "smart_display",
  event: "event_available",
}
interface Member {
  id: string,
  fullName: string,
  instagram?: string,
  positionLabel: string,
  imageUrl: string,
  birdep: {
    slug: string,
  }
  programAssignments: {
    id: string;
    title: string;
    slug: string;
    role: {
      name: string,
      slug: string,
    }
  }[];
}

function Proker({ title, summary, category, current, total }: Program) {
  const icon = categoryIcons[category.slug]
  return (
    <section className="hs-carousel-slide mt-2 relative mx-auto w-full shrink-0 max-w-3xl pt-16">
      <div className="relative overflow-visible rounded-[34px] border-2 border-[#DCB06F] bg-[#F6E7CC] px-8 pb-7 pt-20 text-center shadow-[0_8px_0_#A86D21,0_16px_28px_rgba(0,0,0,0.18)] sm:px-14">
        {/* cekungan visual */}
        <div
          className="absolute left-1/2 top-0 h-[105px] w-[240px] -translate-x-1/2 -translate-y-[2px] bg-[#28470B]"
          // className="absolute left-1/2 top-0 h-24 w-40 -translate-x-1/2 -translate-y-[13%] bg-[#28470B]"
          aria-hidden="true"
          // style={{ clipPath: "path('M0 0 H160 V24 C160 69 124 96 80 96 C36 96 0 69 0 24 Z')", }}
          style={{
            clipPath:
              "path('M0 0 H280 V20 C220 20 205 38 190 58 C170 85 145 103 120 103 C95 103 70 85 50 58 C35 38 20 20 0 20 Z')",
          }}
        />
        {/* LINGKARAN ICON  */}
        <div className="absolute left-1/2 top-0 z-20 flex size-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#DCB06F] bg-[#870F0C] shadow-[0_8px_18px_rgba(0,0,0,0.24)]">
          <span className="material-symbols-outlined !text-[70px] md:!text-[100px] !leading-none text-[#DCB06F]">
            {icon}
          </span>
        </div>

        {/* Konten */}
        <div className="relative z-10 mt-8 font-montserrat">
          <h3 className="inline-block border-b-2 border-[#A90900] pb-1 font-bold text-[#A90900] text-[clamp(22px,2.2vw,32px)]">{title}</h3>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-5 md:leading-7 text-[clamp(14px,1.2vw,18px)]">{summary}</p>

          <div className="mx-auto shadow-lg mt-5 flex w-fit items-center gap-2 rounded-full border-2 border-[#DEB374] bg-[#F6E7CC] px-7 py-2 text-[#870F0C] shadow-[0_4x_0_#B98035,0_8px_14px_rgba(0,0,0,0.16)]">
            {/* <div className="hs-carousel-info inline-flex justify-center px-4 bottom-3 inset-s-1/2 -translate-x-1/2 bg-layer text-layer-foreground rounded-lg"> */}
            <span className="me-1">{current}</span>
            /
            <span className="ms-1">{total}</span>
            {/* </div> */}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function page() {
  const params = useParams()
  const slug = params.slug

  const [birdep, setBirdep] = useState(null)
  const [loading, setLoading] = useState(true)

  const [programs, setPrograms] = useState<Program[]>([])
  const [loadingPrograms, setLoadingPrograms] = useState(true)
  const [programError, setProgramError] = useState<string | null>(null)

  const [members, setMembers] = useState<Member[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [loadingMembers, setLoadingMembers] = useState(true)
  const [memberError, setMemberError] = useState<string | null>(null)
  const activeMember = members[activeIndex]

  const swiperRef = useRef<SwiperType | null>(null)

  useEffect(() => {
    import("preline").then(() => {
      window.HSStaticMethods?.autoInit();
    });
  }, []);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoadingPrograms(true)
        setProgramError(null)

        const response = await axios.get("/api/nexus/public/tevo/programs")
        const getPrograms = response.data.data
        const filteredPrograms = getPrograms.filter((program: Program) => program.birdep?.slug === slug)
        setPrograms(filteredPrograms)

        console.log(filteredPrograms.length)
      } catch (error) {
        console.error(error)
        setProgramError("Data gagal dimuat.")
      } finally {
        setLoadingPrograms(false)
      }

    }
    if (slug) fetchPrograms()
  }, [slug])

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoadingMembers(true)
        setMemberError(null)

        const response = await axios.get("/api/nexus/public/tevo/members")
        const getMembers = response.data.data.members
        const filteredMembers = getMembers.filter((member: Member) => member.birdep?.slug === slug)
        console.log(filteredMembers)

        setMembers(filteredMembers)
        setActiveIndex(0)

      } catch (error) {
        console.error("Gagal mengambil data anggota", error)
        setMemberError("Data gagal dimuat.")

      } finally {
        setLoadingMembers(false)
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
          url: "/api/nexus/public/tevo/birdeps"
        }

        const response = await axios.request(getBirdeps)
        const allBirdeps = response.data.data.birdeps
        const getThisBirdep = allBirdeps.find((thisBirdep) => thisBirdep.slug === slug)
        if (getThisBirdep) setBirdep(getThisBirdep)
        // console.log(getThisBirdep.logoUrl)
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }

    if (slug) fetchData()

  }, [slug])

  if (loading) return <div className="p-10 font-montserrat text-center mt-50">Memuat halaman...</div>
  if (!birdep) return <div className="p-10 font-montserrat text-center mt-50">Data tidak ditemukan.</div>

  if (loadingMembers) return (<div className="py-20 text-center font-montserrat">Memuat struktur pengurus...</div>)
  if (memberError) return (<div className="py-20 text-center font-montserrat text-red-700">{memberError}</div>)
  if (members.length == 0 || !activeMember) return (<div className="py-20 text-center font-montserrat">Data pengurus belum tersedia.</div>)

  const stagger = { duration: 0.4, ease: "easeOut" as const };
  const fadeUp = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
  };

  return (
    <section className="relative bg-[#FBF5EA]">
      <div className={`${style.setImageForBackground} flex items-center py-25`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            {...fadeUp}
            transition={stagger}
            className="flex flex-col justify-start items-center gap-8 pt-12 md:flex-row md:items-center md:justify-start md:gap-15 md:pt-15">
            <Image className="drop-shadow w-[200px] h-[200px] md:w-[357px] md:h-[357px]" width={357} height={357} src={birdep.logoUrl} alt={birdep.name} />
            <div className="px-10 md:pl-0 text-center md:text-start">
              <h2 className="font-lacheyard text-[clamp(40px,10vw,100px)] text-[#A90900] leading-none mb-5 drop-shadow-sm">{birdep.name}</h2>
              <p className="font-montserrat text-[18px]">{birdep.description}</p>
              <p className="font-montserrat text-[18px]">{birdep.focusArea}</p>
            </div>
          </motion.div>

          <motion.div
            className={`relative bg-[#870F0C] px-10 py-6 text-white mt-15 mb-25 max-w-5xl mx-10 md:mx-auto border-3 border-[#DCB06F] ${FrameCustom.royalFrame}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#E7B763]">
              <div className="flex flex-col items-center justify-center md:gap-5 md:px-8">
                {/* isi kiri */}
                <div className="flex justify-center items-center gap-5 mb-2 md:mb-0">
                  <div className="border-3 border-[#DCB06F] bg-[#F6E7CC] rounded-[25px] p-3">
                    <span className="material-symbols-outlined !text-[50px] md:!text-[80px] text-[#870F0C]">
                      groups_2
                    </span>
                  </div>
                  <div className="font-montserrat leading-none text-center md:text-start">
                    <p className="text-[clamp(30px,3vw,40px)] font-bold text-[#F9D253] mb-1">{members.length}</p>
                    <p className="uppercase font-semibold">Anggota Aktif</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-5 md:px-8">
                {/* isi kanan */}
                <div className="flex justify-center items-center gap-5 mt-2 md:mt-0">
                  <div className="border-3 border-[#DCB06F] bg-[#F6E7CC] rounded-[25px] p-3">
                    <span className="material-symbols-outlined !text-[50px] md:!text-[80px] text-[#870F0C]">
                      assignment
                    </span>
                  </div>
                  <div className="font-montserrat leading-none  text-center md:text-start">
                    <p className="text-[clamp(30px,3vw,40px)] font-bold text-[#F9D253] mb-1">{programs.length}</p>
                    <p className="uppercase font-semibold">Program Kerja</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.section
            id="program-kerja"
            className="relative p-1 md:p-2 bg-[#DCB06F] mx-5"
          >
            <div className="mx-auto p-8 md:p-12 bg-[#2C430B] rounded-[25px]">
              <div className="text-center">
                <motion.h2
                  {...fadeUp}
                  transition={{ duration: 0.4 }}
                  className="font-asimovian uppercase leading-tight text-[clamp(50px,5vw,65px)] text-[#FBF5EA]"
                >
                  Program Kerja
                </motion.h2>
              </div>
              {loadingPrograms ? (
                <div>Memuat program kerja...</div>
              ) : programError ? (
                <div>{programError}</div>
              ) : programs.length === 0 ? (
                <div>Tidak ada program kerja.</div>
              ) : (
                <div
                  id="hs-carousel"
                  className="relative my-10"
                  data-hs-carousel='{"isInfiniteLoop": true}'
                >
                  <div className="hs-carousel relative min-h-120 w-full overflow-hidden md:min-h-96 md:overflow-visible">
                    {/* Carousel Body */}
                    <div className="hs-carousel-body opacity-0 absolute inset-s-0 top-0 bottom-0 flex flex-nowrap transition-transform duration-700">
                      {programs.map((program, i) => (
                        <Proker
                          key={program.id}
                          {...program}
                          current={i + 1}
                          total={programs.length}
                        />
                      ))}
                    </div>
                    {/* End Carousel Body */}

                    {/* VERSI DESKTOP */}
                    <button
                      type="button"
                      disabled={programs.length === 1}
                      className="hidden md:inline-flex hs-carousel-prev absolute top-1/2 inset-s-2 justify-center items-center size-10 -translate-y-1/2 rounded-full border-2 border-[#DCB06F] bg-[#F6E7CC] shadow-2xs disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <span className="material-symbols-outlined !text-[40px] text-[#870F0C]">
                        keyboard_arrow_left
                      </span>
                    </button>

                    <button
                      type="button"
                      disabled={programs.length === 1}
                      className="hidden md:inline-flex hs-carousel-next absolute top-1/2 inset-e-2 justify-center items-center size-10 -translate-y-1/2 rounded-full border-2 border-[#DCB06F] bg-[#F6E7CC] shadow-2xs disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <span className="material-symbols-outlined !text-[40px] text-[#870F0C]">
                        keyboard_arrow_right
                      </span>
                    </button>
                  </div>
                </div>
              )}
              {!loadingPrograms && !programError && programs.length > 0 && (
                <>
                  {/* VERSI MOBILE */}
                  < button type="button" disabled={programs.length == 1} className="md:hidden mt-20 hs-carousel-prev absolute top-1/2 inset-s-2 justify-center items-center size-10 bg-layer text-layer-foreground rounded-full shadow-2xs hover:bg-layer-hover -translate-y-1/2 focus:outline-hidden bg-[#F6E7CC] border-2 border-[#DCB06F] rounded-full disabled:cursor-not-allowed disabled:opacity-40">
                    <span className="material-symbols-outlined !text-[40px] text-[#870F0C]">
                      keyboard_arrow_left
                    </span>
                  </button>
                  <button type="button" disabled={programs.length == 1} className="md:hidden mt-20 hs-carousel-next absolute top-1/2 inset-e-2 justify-center items-center size-10 bg-layer text-layer-foreground rounded-full shadow-2xs hover:bg-layer-hover -translate-y-1/2 focus:outline-hidden bg-[#F6E7CC] border-2 border-[#DCB06F] rounded-full disabled:cursor-not-allowed disabled:opacity-40">
                    <span className="material-symbols-outlined !text-[40px] text-[#870F0C]">
                      keyboard_arrow_right
                    </span>
                  </button>
                </>
              )}
            </div>
          </motion.section>

        </div>
      </div >

      <div className="bg-[#DCB06F] overflow-hidden">
        <div className="my-5 p-10 bg-[#870F0C]">
          <div className="bg-[#DCB06F]">
            <div className="border-3 border-[#DCB06F] bg-[#FBF5EA] rounded-[25px] mx-auto">
              <div className="max-w-8xl px-4 sm:px-6 lg:px-8 relative z-10 my-15">
                <motion.h2
                  {...fadeUp}
                  transition={{ duration: 0.4 }}
                  className="font-asimovian text-center text-[80px] text-[#870F0C] uppercase leading-none mb-10"
                >
                  Struktur Pengurus
                </motion.h2>
              </div>

              <div className="flex justify-center items-center mb-20">
                <div className="flex flex-col w-2/5">
                  {/* CARAOUSEL UDH LUMAYAN AMAN */}
                  <div className={`${style.carouselWrapper}`}>
                    <Swiper
                      effect="cards"
                      grabCursor={true}
                      // navigation={true}
                      modules={[EffectCards, Navigation]}
                      cardsEffect={{
                        perSlideOffset: 5,
                        perSlideRotate: 10,
                        rotate: true,
                        slideShadows: false,
                      }}
                      onSwiper={(swiper) => { swiperRef.current = swiper }}
                      onSlideChange={(swiper) => { setActiveIndex(swiper.activeIndex) }}
                      className={style.storeSwiper}
                    >
                      {members.map((member) => (
                        <SwiperSlide key={member.id} className={style.storeSlide}>
                          <Image src={member.imageUrl} width={250} height={350} alt={member.fullName} objectFit="cover" />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                  {/* end carousel */}

                  {/* navigation */}
                  <div className="mt-8 flex items-center justify-center gap-5">
                    <button
                      type="button"
                      onClick={() => swiperRef.current.slidePrev()}
                      disabled={activeIndex == 0}
                      className="flex size-12 items-center justify-center rounded-full border-2 border-[#DCB06F] bg-[#F6E7CC] text-[#870F0C] transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <span className="material-symbols-outlined !text-[40px] text-[#2C430B]">
                        keyboard_arrow_left
                      </span>
                    </button>

                    <span className="min-w-16 text-center font-montserrat font-bold text-[#2C430B]">
                      {activeIndex + 1} / {members.length}
                    </span>

                    <button
                      type="button"
                      onClick={() => swiperRef.current.slideNext()}
                      disabled={activeIndex == members.length - 1}
                      className="flex size-12 items-center justify-center rounded-full border-2 border-[#DCB06F] bg-[#F6E7CC] text-[#870F0C] transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <span className="material-symbols-outlined !text-[40px] text-[#2C430B]">
                        keyboard_arrow_right
                      </span>
                    </button>
                  </div>
                  {/* end of custom */}
                </div>

                <div className="w-2/3 px-20 font-montserrat">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeMember.id}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.h3 className="inline-block mb-5 border-b-2 leading-tight border-[#A90900] text-[#A90900] text-[50px] font-bold pb-1">
                        {activeMember.fullName}
                      </motion.h3>

                      <motion.div className="flex items-center gap-3 items-stretch mb-8">
                        <div className={`${FrameCustom.royalFrame} bg-[#2C430B] px-8 py-2 text-[#F9D253] border-3 border-[#DCB06F]`}>
                          <div className="px-8 py-2 border-b-2 border-t-2 border-[#DCB06F] uppercase font-bold text-[15px]">
                            {activeMember.positionLabel}
                          </div>
                        </div>
                        {activeMember.instagram && (
                          <a href={`https://www.instagram.com/${activeMember.instagram}/`} target="_blank" rel="noopener noreferrer" type="button" className="flex items-center">
                            <FontAwesomeIcon icon={faSquareInstagram} className="text-[50px] text-[#2C430B]" />
                          </a>
                        )}
                      </motion.div>

                      <motion.h3 className="text-[#701011] text-[20px] font-semibold uppercase mb-2">
                        Jabatan di Program Kerja
                      </motion.h3>

                      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                        {activeMember.programAssignments.map((programAssignment) => {
                          const findProgram = programs.find(
                            (program) => program.slug === programAssignment.slug
                          );
                          const icon = findProgram ? categoryIcons[findProgram.category.slug] : "person_2"

                          return (
                            <div
                              key={programAssignment.id}
                              className="flex min-h-14 items-center rounded-[10px] border-2 border-[#DCB06F] p-1"
                            >
                              <div className="rounded-[6px] border-1 border-[#DCB06F] p-1">
                                <span className="material-symbols-outlined !text-[70px] md:!text-[40px] text-[#870F0C] !leading-none">
                                  {icon}
                                </span>
                              </div>

                              <p className="px-3 font-bold text-[#DCB06F]">
                                {programAssignment.role.name} {programAssignment.title}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                  {/* <motion.h3
                    className="inline-block mb-5 border-b-2 border-[#A90900] text-[#A90900] text-[50px] font-bold pb-1"
                  >
                    kais
                  </motion.h3>

                  <motion.div
                    className="flex items-center gap-5 items-stretch mb-8"
                  >
                    <div className={`${FrameCustom.royalFrame} bg-[#870F0C] px-8 py-2 text-[#F9D253] border-3 border-[#DCB06F]`}>
                      <div className="px-8 py-2 border-b-2 border-t-2 border-[#DCB06F] uppercase font-bold text-[15px]">
                        Ketua
                      </div>
                    </div>
                    <div className="rounded-full bg-[#F6E7CC] p-2 text-[#F9D253] border-3 border-[#DCB06F] flex justify-center items-center">
                      <FontAwesomeIcon icon={faSquareInstagram} className="text-[40px] text-[#870F0C]" />
                    </div>
                  </motion.div>

                  <motion.h3
                    className="text-[#701011] text-[20px] font-semibold uppercase mb-2"
                  >
                    Jabatan di Program Kerja
                  </motion.h3>

                  <div className=" flex items-center justify-start items-stretch">
                    <motion.div
                      className="rounded-[10px] border-2 border-[#DCB06F] p-1 flex items-center justify-start"
                    >
                      <div className="rounded-[6px] border-1 border-[#DCB06F] p-1">
                        <FontAwesomeIcon icon={faSquareInstagram} className="text-[40px] text-[#870F0C]" />
                      </div>
                      <p className="font-bold text-[#DCB06F] px-3">SC & BOD Wellcoming Party</p>
                    </motion.div>
                  </div> */}

                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </ section >
  )
}