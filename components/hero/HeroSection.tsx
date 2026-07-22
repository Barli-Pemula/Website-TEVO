"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./HeroSection.module.css";

/* ============================
   SWORD SVG — ornate detailed sword (Group 1000003664)
   Horizontal orientation, moves RIGHT on scroll
   ============================ */
function SwordSVG() {
  return (
    <img
      src="/assets/sword-detail.svg"
      alt="Sword"
      className={styles.swordImg}
      draggable={false}
    />
  );
}

/* ============================
   SHEATH SVG — red sword (Group 1000003665)
   Horizontal orientation, moves LEFT on scroll
   ============================ */
function SheathSVG() {
  return (
    <img
      src="/assets/sword-red.svg"
      alt="Sheath"
      className={styles.sheathImg}
      draggable={false}
    />
  );
}

/* ============================
   EASING FUNCTION
   ============================ */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/* ============================
   useEffect HOOK (ANIMATION LOGIC)
   ============================ */
export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const sheathRef = useRef<HTMLDivElement>(null);
  const swordRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animProgress = 0;       // 0 = start, 1 = animation complete
    let isLocked = true;         // scroll is locked during animation
    let swordVisible = false;    // sword hidden until first scroll
    const SENSITIVITY = 0.0008;  // how much each wheel pixel advances progress

    // Lock scroll on mount
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.overscrollBehavior = "none";

    // Safety timeout: auto-unlock after 5s on mobile to prevent getting stuck
    const safetyTimer = setTimeout(() => {
      if (isLocked) {
        unlockScroll();
        // Also reveal sword and complete animation
        if (!swordVisible) revealSword();
        animProgress = 1;
        renderFrame(1);
      }
    }, 5000);

    // Initially hide sword container
    if (containerRef.current) {
      containerRef.current.style.opacity = "0";
      containerRef.current.style.transition = "opacity 0.6s ease-out";
    }

    /* --- Fade in sword on first scroll --- */
    function revealSword() {
      swordVisible = true;
      if (containerRef.current) {
        containerRef.current.style.opacity = "1";
        // Remove CSS transition after fade-in so manual animation can take over
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.style.transition = "";
          }
        }, 650);
      }
      if (glowRef.current) {
        glowRef.current.style.opacity = "0.8";
      }
    }

    /* --- Render a single animation frame --- */
    function renderFrame(p: number) {
      if (
        !sheathRef.current ||
        !swordRef.current ||
        !containerRef.current ||
        !titleRef.current ||
        !glowRef.current ||
        !hintRef.current ||
        !heroRef.current
      ) return;

      // If sword not yet revealed, only show scroll hint
      if (!swordVisible) {
        hintRef.current.style.opacity = "0.7";
        return;
      }

      /*
       * ANIMATION TIMELINE:
       *
       * Phase 1 — Sword separation       : 0.00 → 0.75
       * Phase 2 — Text reveals center-out : 0.04 → 0.22
       * Phase 3 — Subtitle appears       : 0.40 → 0.55
       * Phase 4 — HOLD (text visible)    : 0.55 → 1.00
       *         → scroll unlocked, user scrolls naturally
       */

      /* Phase 1: Sword & sheath separate — slower, bigger gap */
      const sepProgress = Math.min(1, p / 0.75);
      const easedSep = easeOutCubic(sepProgress);
      const INITIAL_GAP = 11; // vw — right sword offset, handle visible
      const maxSlide = 120;   // vw — far enough to fully exit viewport
      sheathRef.current.style.transform = `translateX(${-INITIAL_GAP + easedSep * -(maxSlide - INITIAL_GAP)}vw)`;
      swordRef.current.style.transform = `translateX(${INITIAL_GAP + easedSep * (maxSlide - INITIAL_GAP)}vw)`;

      /* Both sword & sheath fade out — starts later to match slower separation */
      let containerFade = 1;
      if (p >= 0.50) {
        containerFade = Math.max(0, 1 - (p - 0.50) / 0.12);
      }
      containerRef.current.style.opacity = String(containerFade);

      /* Blade glow fades with the container */
      glowRef.current.style.opacity = String(containerFade * easedSep * 0.8);

      /* Phase 2: Title center-out clip reveal — starts as soon as swords part */
      let textReveal = 0;
      if (p >= 0.04) {
        textReveal = Math.min(1, (p - 0.04) / 0.18);
        textReveal = easeOutCubic(textReveal);
      }
      const clipInset = 50 - (textReveal * 50); // 50% → 0% (reveals from center outward)
      let titleOpacity = textReveal > 0.01 ? 1 : 0;

      /* Phase 3: Subtitle fades in */
      let subtitleOpacity = 0;
      if (p >= 0.40) {
        subtitleOpacity = Math.min(1, (p - 0.40) / 0.15);
        subtitleOpacity = easeOutCubic(subtitleOpacity);
      }

      /* Phase 4: Hold — nothing changes (0.55 → 1.00), hero stays visible */

      titleRef.current.style.opacity = String(titleOpacity);
      titleRef.current.style.clipPath = `inset(0 ${clipInset}% 0 ${clipInset}%)`;
      titleRef.current.style.transform = `translate(-50%, -50%)`;

      const subtitleEl = titleRef.current.querySelector("p");
      if (subtitleEl) {
        subtitleEl.style.opacity = String(subtitleOpacity);
      }

      /* Scroll hint */
      const hintOpacity = p < 0.06 ? 0.7 * (1 - p / 0.06) : 0;
      hintRef.current.style.opacity = String(hintOpacity);
    }

    /* --- Unlock scroll --- */
    function unlockScroll() {
      isLocked = false;
      document.documentElement.style.overflow = "";
      document.documentElement.style.overscrollBehavior = "";
    }

    /* --- Wheel handler (drives animation while locked) --- */
    function handleWheel(e: WheelEvent) {
      if (!isLocked) return;

      e.preventDefault();

      // First scroll → reveal sword, don't advance animation
      if (!swordVisible) {
        revealSword();
        return;
      }

      const delta = e.deltaY;
      animProgress += delta * SENSITIVITY;
      animProgress = Math.max(0, Math.min(1, animProgress));

      renderFrame(animProgress);

      // Animation complete → unlock scroll
      if (animProgress >= 1) {
        unlockScroll();
      }
    }

    /* --- Touch support for mobile --- */
    let touchStartY = 0;

    function handleTouchStart(e: TouchEvent) {
      touchStartY = e.touches[0].clientY;
    }

    function handleTouchMove(e: TouchEvent) {
      if (!isLocked) return;

      e.preventDefault();

      // First touch swipe → reveal sword, don't advance animation
      if (!swordVisible) {
        revealSword();
        return;
      }

      const touchY = e.touches[0].clientY;
      const delta = touchStartY - touchY;
      touchStartY = touchY;

      animProgress += delta * SENSITIVITY * 3;
      animProgress = Math.max(0, Math.min(1, animProgress));

      renderFrame(animProgress);

      if (animProgress >= 1) {
        unlockScroll();
      }
    }

    /* --- Regular scroll handler (no-op — animation plays once) --- */
    function handleScroll() {
      // No re-lock — animation plays once, then user scrolls freely
    }

    /* --- Attach all listeners --- */
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Render initial state
    renderFrame(0);

    return () => {
      clearTimeout(safetyTimer);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("scroll", handleScroll);
      document.documentElement.style.overflow = "";
      document.documentElement.style.overscrollBehavior = "";
    };
  }, []);

  return (
    <section ref={heroRef} className={styles.heroWrapper} id="beranda">
      <div className={styles.heroSticky}>
        {/* Background */}
        <div className={styles.bgImage}>
          <div className="hidden md:block absolute inset-0">
            <Image
              src="/assets/Dekstop.png"
              alt="Astana Angkasa Desktop Background"
              fill
              priority
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="block md:hidden absolute inset-0">
            <Image
              src="/assets/MOBILE.png"
              alt="Astana Angkasa Mobile Background"
              fill
              priority
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div className={styles.bgOverlay} />

        {/* Title — positioned at sword center, emerges from within */}
        <div ref={titleRef} className={`${styles.heroTitle}`}>
          <h1 className="[-webkit-text-stroke:1px_#fff]">Astana Angkasa</h1>
          <p>Menata Asa, Wujudkan Karya, Menjulang ke Angkasa.</p>
        </div>

        {/* Sword Assembly */}
        <div ref={containerRef} className={styles.swordContainer}>
          <div ref={glowRef} className={styles.bladeGlow} />
          <div ref={sheathRef} className={styles.sheath}>
            <SheathSVG />
          </div>
          <div ref={swordRef} className={styles.sword}>
            <SwordSVG />
          </div>
        </div>

        {/* Scroll Hint */}
        <div ref={hintRef} className={styles.scrollHint}>
          <span>Scroll</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </section>
  );
}
