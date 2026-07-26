"use client"

import { motion } from "framer-motion";
import { PLACEHOLDER } from "../../lib/placeholder-content";
import { useEffect } from "react";
import Image from "next/image";
import {CONFIG} from "../../lib/config";

declare global {
    interface Window {
        HSStaticMethods?: {
            autoInit: () => void;
        };
    }
}

export default function AngkasaKostPreview() {
    const fadeUp = {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
    }

    useEffect(() => {
        import("preline").then(() => {
            window.HSStaticMethods?.autoInit();
        });
    }, []);

    return (
        <section id="angkasa-kost" className="relative py-8 md:py-16 bg-[#FBF5EA]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative p-2 md:p-2 bg-[#DCB06F] rounded-[30px]">
                    <div className="mx-auto p-3 sm:p-8 lg:p-12 bg-[#701011] rounded-[25px]">
                {/* section header */}
                <div className="text-center mb-12">
                    <motion.h2
                        {...fadeUp}
                        transition={{ duration: 0.4 }}
                        className="font-asimovian uppercase text-[clamp(2.5rem,10vw,80px)] text-[#FBF5EA]"
                    >
                        {PLACEHOLDER.angkasaKost.title}
                    </motion.h2>
                </div>

                <div id="hs-carousel"
                    className="relative"
                    data-hs-carousel='{
                "loadingClasses": "opacity-0",
                "dotsItemClasses": "hs-carousel-active:bg-red-700 hs-carousel-active:border-red-700 size-3 border border-gray-300 rounded-full cursor-pointer",
                "isAutoPlay":true,
                "isInfiniteLoop":true,
                "slidesQty":{"xs":1, "sm":3}
                }'
                >
                    <div className="hs-carousel relative w-full h-80 sm:h-120 overflow-hidden ">
                        <div className="hs-carousel-body flex flex-nowrap absolute top-0 bottom-0 start-0 transition-transform duration-700 -mx-1 opacity-0">
                            {["First", "Second", "Third", "Fourth", "Fifth", "Sixth"].map(
                                (item, i) => (
                                    <div key={i} className="hs-carousel-slide px-3 ">
                                        <div className="flex flex-col items-center h-full bg-[#F6E7CC] p-2 rounded-[25px] border-3 border-[#DCB06F]">
                                            <span className="self-center text-sm text-foreground transition duration-700">
                                                {/* {item} slide */}
                                                <Image src={"/assets/hero-bg.png"} alt="coba" width={700} height={700} className="rounded-[25px]" />
                                            </span>
                                            <h3 className="font-montserrat py-3">halo {i + 1}</h3>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    {/* arrows */}
                    <button type="button" className="hs-carousel-prev hs-carousel-disabled:opacity-50 hs-carousel-disabled:cursor-default absolute top-1/2 inset-s-2 inline-flex justify-center items-center size-10 bg-[#DCB06F] text-layer-foreground rounded-full shadow-2xs hover:bg-layer-hover -translate-y-1/2 focus:outline-hidden">
                        <span className="text-2xl" aria-hidden="true">
                            <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                        </span>
                        <span className="sr-only">Previous</span>
                    </button>
                    <button type="button" className="hs-carousel-next hs-carousel-disabled:opacity-50 hs-carousel-disabled:cursor-default absolute top-1/2 inset-e-2 inline-flex justify-center items-center size-10 bg-[#DCB06F] text-layer-foreground rounded-full shadow-2xs hover:bg-layer-hover -translate-y-1/2 focus:outline-hidden">
                        <span className="sr-only">Next</span>
                        <span className="text-2xl" aria-hidden="true">
                            <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                        </span>
                    </button>
                    {/* end arrows */}

                    <div className="hs-carousel-pagination absolute bottom-3 start-0 end-0 flex justify-center gap-x-2" />
                </div>

                {/* CTA */}
                <motion.div
                    {...fadeUp}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="text-center mt-6 md:mt-10"
                >
                    <a
                        href={CONFIG.angkasaKostUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#F6E7CC] text-[#2C440C] font-bold rounded-full shadow-crimson
                       hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98] transition-all duration-200 min-h-[48px]
                       group border-2 border-[#DCB06F]"
                        aria-label="Buka Angkasa Store di tab baru"
                    >
                        {PLACEHOLDER.angkasaKost.cta}
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="group-hover:translate-x-0.5 transition-transform"
                        >
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                    </a>
                </motion.div>


                    </div>
                </div>
            </div>
        </section>
    )
}