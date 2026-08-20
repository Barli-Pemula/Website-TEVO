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
    let targetProgress = 0;
    let currentProgress = 0;
    let isLocked = true;         // scroll is locked during animation
    let swordVisible = false;    // sword hidden until first scroll
    let rafId: number;

    const WHEEL_SENSITIVITY = 0.00045; // Silky smooth, slower wheel response
    const TOUCH_SENSITIVITY = 0.0016;  // Gentle, deliberate mobile swipe

    // Lock scroll on mount
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.overscrollBehavior = "none";

    // Safety timeout: auto-unlock after 6s if idle
    const safetyTimer = setTimeout(() => {
      if (isLocked) {
        unlockScroll();
        if (!swordVisible) revealSword();
        targetProgress = 1;
      }
    }, 6000);

    // Initially hide sword container until revealed
    if (containerRef.current) {
      containerRef.current.style.opacity = "0";
      containerRef.current.style.transition = "opacity 0.8s ease-out";
    }

    /* --- Fade in sword on first scroll --- */
    function revealSword() {
      if (swordVisible) return;
      swordVisible = true;
      if (containerRef.current) {
        containerRef.current.style.opacity = "1";
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.style.transition = "";
          }
        }, 800);
      }
      if (glowRef.current) {
        glowRef.current.style.opacity = "0.8";
      }
    }

    /* --- Unlock scroll immediately when animation complete --- */
    function unlockScroll() {
      if (!isLocked) return;
      isLocked = false;
      document.documentElement.style.overflow = "";
      document.documentElement.style.overscrollBehavior = "";
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
        hintRef.current.style.opacity = "0.9";
        return;
      }

      /*
       * ANIMATION TIMELINE (Cinematic & Smooth):
       *
       * Phase 1 — Sword separation       : 0.00 → 0.85
       * Phase 2 — Text reveals center-out : 0.06 → 0.40
       * Phase 3 — Subtitle appears       : 0.45 → 0.70
       * Phase 4 — HOLD (text visible)    : 0.70 → 1.00
       */

      /* Phase 1: Sword & sheath separate — slower, gradual slide */
      const sepProgress = Math.min(1, p / 0.85);
      const easedSep = easeOutCubic(sepProgress);
      const INITIAL_GAP = 11; // vw
      const maxSlide = 120;   // vw
      sheathRef.current.style.transform = `translateX(${-INITIAL_GAP + easedSep * -(maxSlide - INITIAL_GAP)}vw)`;
      swordRef.current.style.transform = `translateX(${INITIAL_GAP + easedSep * (maxSlide - INITIAL_GAP)}vw)`;

      /* Sword container fades out gradually */
      let containerFade = 1;
      if (p >= 0.50) {
        containerFade = Math.max(0, 1 - (p - 0.50) / 0.22);
      }
      containerRef.current.style.opacity = String(containerFade);

      /* Blade glow fades with container */
      glowRef.current.style.opacity = String(containerFade * easedSep * 0.8);

      /* Phase 2: Title center-out clip reveal */
      let textReveal = 0;
      if (p >= 0.06) {
        textReveal = Math.min(1, (p - 0.06) / 0.34);
        textReveal = easeOutCubic(textReveal);
      }
      const clipInset = 50 - (textReveal * 50); // 50% → 0%
      let titleOpacity = textReveal > 0.01 ? 1 : 0;

      /* Phase 3: Subtitle fades in */
      let subtitleOpacity = 0;
      if (p >= 0.45) {
        subtitleOpacity = Math.min(1, (p - 0.45) / 0.25);
        subtitleOpacity = easeOutCubic(subtitleOpacity);
      }

      /* Phase 4: Hold — text stays visible */
      titleRef.current.style.opacity = String(titleOpacity);
      titleRef.current.style.clipPath = `inset(0 ${clipInset}% 0 ${clipInset}%)`;
      titleRef.current.style.transform = `translate(-50%, -50%)`;

      const subtitleEl = titleRef.current.querySelector("p");
      if (subtitleEl) {
        subtitleEl.style.opacity = String(subtitleOpacity);
      }

      /* Scroll hint */
      let hintOpacity = 0.9;
      if (p > 0.05 && p < 0.65) {
        hintOpacity = Math.max(0, 0.9 * (1 - (p - 0.05) / 0.25));
      } else if (p >= 0.65) {
        hintOpacity = Math.min(0.9, (p - 0.65) / 0.25);
      }
      hintRef.current.style.opacity = String(hintOpacity);
    }

    /* --- LERP Animation Loop for 60/120fps ultra smooth gliding --- */
    function animateLoop() {
      const diff = targetProgress - currentProgress;
      if (Math.abs(diff) > 0.0004) {
        currentProgress += diff * 0.075; // 7.5% per frame for smooth deceleration
        renderFrame(currentProgress);
      } else if (currentProgress !== targetProgress) {
        currentProgress = targetProgress;
        renderFrame(currentProgress);
      }

      // When animation reaches completion, unlock scroll immediately
      if (currentProgress >= 0.97 && isLocked) {
        unlockScroll();
      }

      rafId = requestAnimationFrame(animateLoop);
    }
    rafId = requestAnimationFrame(animateLoop);

    /* --- Wheel handler (drives animation on desktop while locked) --- */
    function handleWheel(e: WheelEvent) {
      if (!isLocked) return;

      e.preventDefault();

      if (!swordVisible) {
        revealSword();
      }

      const delta = e.deltaY;
      targetProgress += delta * WHEEL_SENSITIVITY;
      targetProgress = Math.max(0, Math.min(1, targetProgress));
    }

    /* --- Touch support for mobile --- */
    let touchStartY = 0;

    function handleTouchStart(e: TouchEvent) {
      touchStartY = e.touches[0].clientY;
      if (isLocked && !swordVisible) {
        revealSword();
      }
    }

    function handleTouchMove(e: TouchEvent) {
      if (!isLocked) {
        // When unlocked, allow native scroll completely
        return;
      }

      // While locked, prevent default to drive animation
      e.preventDefault();

      if (!swordVisible) {
        revealSword();
      }

      const touchY = e.touches[0].clientY;
      const delta = touchStartY - touchY;
      touchStartY = touchY;

      if (delta > 0) {
        targetProgress += delta * TOUCH_SENSITIVITY;
        targetProgress = Math.max(0, Math.min(1, targetProgress));
      }
    }

    /* --- Attach all listeners --- */
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    // Render initial state
    renderFrame(0);

    return () => {
      clearTimeout(safetyTimer);
      cancelAnimationFrame(rafId);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
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
              src="/assets/backgrounds/hero-desktop.png"
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
          <h1 className="[-webkit-text-stroke:1px_#fff]" style={{
            textShadow: "0 6px 20px rgba(0,0,0,0.4), 0 0 3px rgba(255,255,255,0.8)",
          }}>Astana Angkasa</h1>
          <p className="px-5 py-3 bg-[var(--text-secondary)]/20">Menata Asa, Wujudkan Karya, Menjulang ke Angkasa.</p>
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
        <div
          ref={hintRef}
          className={styles.scrollHint}
          onClick={() => {
            const nextSection = document.getElementById("profile") || document.getElementById("identity");
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
          title="Scroll ke bawah"
          role="button"
          tabIndex={0}
        >
          <span>Scroll</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
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
