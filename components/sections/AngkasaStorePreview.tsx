"use client";

import { motion } from "framer-motion";
import { PLACEHOLDER } from "../../lib/placeholder-content";
import { CONFIG } from "../../lib/config";
import { useEffect } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import "swiper/css/navigation";

import styles from "./AngkasaStorePreview.module.css";

// import required modules
import { EffectCards, Navigation } from 'swiper/modules';

// import required modules
// import { EffectCoverflow, Pagination } from 'swiper/modules';

declare global {
  interface Window {
    HSStaticMethods?: {
      autoInit: () => void;
    };
  }
}


export default function AngkasaStorePreview() {
  const fadeUp = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
  };

  useEffect(() => {
    import("preline").then(() => {
      window.HSStaticMethods?.autoInit();
    });
  }, []);

  return (
    <section id="store" className="relative p-1 md:p-2 bg-[#DCB06F] m-4 md:m-10 lg:m-15">
      <div className="mx-auto p-1 sm:p-8 lg:p-12 bg-[#2C430B] rounded-[25px]">
        {/* Section Header */}
        <div className="text-center">
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.4 }}
            className="font-asimovian uppercase text-[clamp(2.5rem,10vw,80px)] text-[#FBF5EA]"
          >
            {PLACEHOLDER.store.title}
          </motion.h2>
        </div>

        {/* CARAOUSEL UDH LUMAYAN AMAN */}
        <div className={`${styles.carouselWrapper}`}>
          <Swiper
            effect="cards"
            grabCursor={true}
            navigation={true}
            modules={[EffectCards, Navigation]}
            cardsEffect={{
              perSlideOffset: 20,
              perSlideRotate: 10,
              rotate: true,
              slideShadows: false,
            }}
            className={styles.storeSwiper}
          >
            {PLACEHOLDER.store.products.map((product, i) => (
              <SwiperSlide key={i} className={styles.storeSlide}>
                <Image src={product.image} width={100} height={100} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.price}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* end carousel */}

        {/* <!-- Destroy and Reinitialize --> */}
        {/* <div className="flex flex-wrap gap-2 mt-4">
          <button type="button" id="hs-destroy-carousel" className="py-1 px-2 inline-flex items-center gap-x-1 text-sm rounded-lg bg-layer border border-layer-line text-layer-foreground hover:bg-layer-hover disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-layer-focus">
            <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            Destroy carousel
          </button>
          <button type="button" id="hs-auto-init-carousel" className="py-1 px-2 inline-flex items-center gap-x-1 text-sm rounded-lg bg-surface border border-surface-line text-surface-foreground hover:bg-surface-hover disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-surface-focus" disabled>
            <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path><path d="M16 16h5v5"></path></svg>
            Reinitialize carousel
          </button>
        </div> */}
        {/* <!-- End Destroy and Reinitialize --> */}


        {/* CTA */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center mt-10"
        >
          <a
            href={CONFIG.storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#F6E7CC] text-[#870F0C] font-bold rounded-full shadow-crimson
                       hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98] transition-all duration-200 min-h-[48px]
                       group border-2 border-[#DCB06F]"
            aria-label="Buka Angkasa Store di tab baru"
          >
            {PLACEHOLDER.store.cta}
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
    </section>
  );
}
