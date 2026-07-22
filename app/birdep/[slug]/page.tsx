"use client"

import { PLACEHOLDER } from "../../../lib/placeholder-content";
import style from "./page.module.css"
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion"
import type { LucideIcon } from "lucide-react";
import { UsersRound, ClipboardList, CalendarDays } from "lucide-react"
import FrameCustom from "../../../styles/frameCustom.module.css"

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import "swiper/css/navigation";
import { EffectCards, Navigation } from 'swiper/modules';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareInstagram } from "@fortawesome/free-brands-svg-icons";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

import axios from "axios"
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import type { Swiper as SwiperType } from "swiper"
import { ChevronLeft, ChevronRight } from "lucide-react";

type birdepDetail = {
  slug: string;
  name: string;
  code: string;
  birdepType: string;
  logo: string;
};

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type ProkerProps = {
  name: string,
  description: string,
  date: string,
  icon: LucideIcon,
}

type Member = {
  id: string,
  fullName: string,
  instagram?: string,
  positionLabel: string,
  photo: string,
  birdep: {
    slug: string,
  }
  programs?: {
    id: string,
    name: string,
  }
}

export default function page() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug

  const [birdep, setBirdep] = useState(null)
  const [loading, setLoading] = useState(true)

  const [members, setMembers] = useState<Member[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [loadingMembers, setLoadingMembers] = useState(true)
  const [memberError, setMemberError] = useState<string | null>(null)
  const activeMember = members[activeIndex]

  const swiperRef = useRef<SwiperType | null>(null)

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoadingMembers(true)
        setMemberError(null)

        const response = await axios.get("https://nexus.ormawaeksekutifpku.com/api/public/tevo/members")
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
        const getBirdep = {
          method: "GET",
          url: "https://nexus.ormawaeksekutifpku.com/api/public/tevo/birdeps"
        }

        const response = await axios.request(getBirdep)
        const allBirdeps = response.data.data.birdeps
        const getThisBirdep = allBirdeps.find((thisBirdep) => thisBirdep.slug === slug)
        if (getThisBirdep) setBirdep(getThisBirdep)
        console.log(getThisBirdep)
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

  function Proker({ name, description, date, icon: Icon }: ProkerProps) {
    return (
      <section id="proker" className="relative mx-auto w-full max-w-3xl pt-16">
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
            <Icon className="size-16 text-[#DCB06F]" strokeWidth={2.2} />
          </div>

          {/* Konten */}
          <div className="relative z-10 mt-8 font-montserrat">
            <h3 className="inline-block border-b-2 border-[#A90900] pb-1 text-3xl font-bold text-[#A90900] sm:text-4xl">{name}</h3>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[black] sm:tex-lg">{description}</p>

            <div className="mx-auto mt-5 flex w-fit items-center gap-2 rounded-full border-2 border-[#DEB374] bg-[#F6E7CC] px-7 py-2 text-[#870F0C] shadow-[0_4x_0_#B98035,0_8px_14px_rgba(0,0,0,0.16)]">
              <CalendarDays className="size-5" />
              <span className="font-semibold">{date}</span>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const stagger = { duration: 0.4, ease: "easeOut" as const };
  const fadeUp = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
  };

  return (
    <section className="relative bg-transparent">
      <div className={`${style.setImageForBackground} flex items-center py-25`}>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            {...fadeUp}
            transition={stagger}
            className="flex justify-start items-center gap-15 pt-15">
            <Image width={357} height={357} src={birdep.logo} alt="birdep.name" />
            <div className="pr-10">
              <h2 className="font-lacheyard text-[100px] text-[#A90900] leading-none mb-5">{birdep.name}</h2>
              <p className="font-montserrat text-[18px]">{birdep.description}</p>
            </div>
          </motion.div>

          <motion.div
            className={`relative bg-[#870F0C] px-12 py-6 text-white mt-15 mb-25 max-w-5xl mx-auto border-3 border-[#DCB06F] ${FrameCustom.royalFrame}`}
          >
            <div className="grid grid-cols-2 divide-x divide-[#E7B763]">
              <div className="flex items-center justify-center gap-5 px-8">
                {/* isi kiri */}
                <div className="flex justify-center items-center gap-5">
                  <div className="border-3 border-[#DCB06F] bg-[#F6E7CC] rounded-[25px] p-3">
                    <UsersRound className="size-20 text-[#870F0C]" />
                  </div>
                  <div className="font-montserrat leading-none">
                    <p className="text-[40px] font-bold text-[#F9D253] mb-1">{members.length}</p>
                    <p className="uppercase font-semibold">Anggota Aktif</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-5 px-8">
                {/* isi kanan */}
                <div className="flex justify-center items-center gap-5">
                  <div className="border-3 border-[#DCB06F] bg-[#F6E7CC] rounded-[25px] p-3">
                    <ClipboardList className="size-20 text-[#870F0C]" />
                  </div>
                  <div className="font-montserrat leading-none">
                    <p className="text-[40px] font-bold text-[#F9D253] mb-1">5</p>
                    <p className="uppercase font-semibold">Program Kerja</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.section
            id="program-kerja"
            className="relative p-1 md:p-2 bg-transparent"
          >
            <div className="mx-auto p-1 sm:p-8 lg:p-12 bg-[#2C430B]/90 backdrop-blur-md rounded-[25px]">
              <div className="text-center">
                <motion.h2
                  {...fadeUp}
                  transition={{ duration: 0.4 }}
                  className="font-asimovian uppercase text-[65px] text-[#FBF5EA]"
                >
                  Program Kerja
                </motion.h2>
              </div>

              {/* {birdep.proker.map((proker, i) => (
                <Proker
                  key={i}
                  name={proker.name}
                  description={proker.description}
                  date={proker.date}
                  icon={proker.icon}
                />
              ))} */}
            </div>
          </motion.section>
        </div>
      </div>

      <div className="bg-transparent overflow-hidden">
        <div className="my-5 p-10 bg-transparent">
          <div className="bg-transparent">
            <div className="border-3 border-[#DCB06F] bg-[#FBF5EA]/90 backdrop-blur-md rounded-[25px] mx-auto">
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
                          {/* <Image src={product.image} width={100} height={100} alt={product.name} /> */}
                          <h3>{member.fullName}</h3>
                          <p>{member.positionLabel}</p>
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
                      <FontAwesomeIcon icon={faAngleLeft} className="text-[#2C430B] text-[25px]" />
                    </button>

                    <span className="min-w-16 text-center font-montserrat font-bold text-[#2C430B]">
                      {activeIndex + 1} / {members.length}
                    </span>

                    <button
                      type="button"
                      onClick={() => swiperRef.current.slideNext()}
                      disabled={activeIndex == members.length - 1}
                      className="flex size-12 items-center justify-center rounded-full border-2 border-[#DCB06F] bg-[#F6E7CC] text-[#870F0C] transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity:40"
                    >
                      <FontAwesomeIcon icon={faAngleRight} className="text-[#2C430B] text-[25px]" />
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
                      <motion.h3 className="inline-block mb-5 border-b-2 border-[#A90900] text-[#A90900] text-[50px] font-bold pb-1">
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
                        {activeMember.programs?.map((program) => (
                          <div key={program.id} className="flex min-h-14 items-center rounded-[10px] border-2 border-[#DCB06F] p-1">
                            <div className="rounded-[6px] border-1 border-[#DCB06F] p-1">
                              <FontAwesomeIcon icon={faSquareInstagram} className="text-[40px] text-[#870F0C]" />
                            </div>
                            <p className="font-bold text-[#DCB06F] px-3">{program.name}</p>
                          </div>
                        ))}
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
    </ section>
  )
}