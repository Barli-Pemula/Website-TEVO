"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./HeroSection.module.css";

/* ============================
   SWORD SVG — moves RIGHT
   Broad traditional sword blade
   ============================ */
function SwordSVG() {
  return (
    <svg viewBox="0 0 900 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bladeGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d6dae0" />
          <stop offset="25%" stopColor="#f0f2f5" />
          <stop offset="50%" stopColor="#c8cdd4" />
          <stop offset="75%" stopColor="#e8eaed" />
          <stop offset="100%" stopColor="#b0b6bf" />
        </linearGradient>
        <linearGradient id="bladeEdge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#c0c4ca" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="goldSword" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4d03f" />
          <stop offset="40%" stopColor="#daa520" />
          <stop offset="100%" stopColor="#8b6914" />
        </linearGradient>
        <linearGradient id="gripGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5c3a21" />
          <stop offset="50%" stopColor="#3e2413" />
          <stop offset="100%" stopColor="#2a1509" />
        </linearGradient>
        <filter id="bladeShadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Blade body — broad straight sword shape (not pointed) */}
      <polygon
        points="40,38 42,36 470,36 475,38 475,82 470,84 42,84 40,82"
        fill="url(#bladeGrad)"
        filter="url(#bladeShadow)"
      />
      {/* Blade tip — slightly rounded/clipped tip like a real broad sword */}
      <polygon
        points="40,38 40,82 22,68 18,60 22,52"
        fill="url(#bladeGrad)"
        filter="url(#bladeShadow)"
      />
      {/* Blade top edge highlight */}
      <line x1="42" y1="36" x2="470" y2="36" stroke="url(#bladeEdge)" strokeWidth="1.5" />
      {/* Fuller (blood groove) */}
      <rect x="80" y="53" width="380" height="5" rx="2" fill="#8a8f96" opacity="0.3" />
      <rect x="82" y="54" width="376" height="3" rx="1.5" fill="#bfc3c9" opacity="0.25" />
      {/* Second fuller line */}
      <rect x="80" y="62" width="380" height="5" rx="2" fill="#8a8f96" opacity="0.2" />

      {/* Cross-guard */}
      <rect x="475" y="18" width="20" height="84" rx="5" fill="url(#goldSword)" />
      <rect x="478" y="21" width="14" height="78" rx="4" fill="#b8860b" opacity="0.4" />
      {/* Cross-guard engraving lines */}
      <line x1="482" y1="24" x2="482" y2="96" stroke="#f4d03f" strokeWidth="0.6" opacity="0.5" />
      <line x1="488" y1="24" x2="488" y2="96" stroke="#f4d03f" strokeWidth="0.6" opacity="0.5" />
      {/* Gems on cross-guard */}
      <circle cx="485" cy="30" r="5" fill="#8b0000" />
      <circle cx="485" cy="30" r="3" fill="#c41e3a" opacity="0.7" />
      <circle cx="485" cy="90" r="5" fill="#8b0000" />
      <circle cx="485" cy="90" r="3" fill="#c41e3a" opacity="0.7" />

      {/* Grip */}
      <rect x="495" y="42" width="140" height="36" rx="7" fill="url(#gripGrad)" />
      {/* Grip wrapping pattern */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <line
          key={i}
          x1={504 + i * 13}
          y1="42"
          x2={512 + i * 13}
          y2="78"
          stroke="#1a0e06"
          strokeWidth="2.5"
          opacity="0.45"
        />
      ))}
      {/* Grip leather texture overlay */}
      <rect x="495" y="42" width="140" height="36" rx="7" fill="rgba(0,0,0,0.15)" />

      {/* Pommel */}
      <ellipse cx="648" cy="60" rx="18" ry="22" fill="url(#goldSword)" />
      <ellipse cx="648" cy="60" rx="13" ry="16" fill="#b8860b" opacity="0.3" />
      <circle cx="648" cy="60" r="7" fill="#8b0000" />
      <circle cx="648" cy="60" r="4" fill="#c41e3a" opacity="0.6" />
      {/* Pommel ring */}
      <ellipse cx="648" cy="60" rx="18" ry="22" fill="none" stroke="#f4d03f" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

/* ============================
   SHEATH SVG — moves LEFT
   ============================ */
function SheathSVG() {
  return (
    <svg viewBox="0 0 900 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="leatherGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3d2b1f" />
          <stop offset="40%" stopColor="#2d1f15" />
          <stop offset="60%" stopColor="#241811" />
          <stop offset="100%" stopColor="#1a100a" />
        </linearGradient>
        <linearGradient id="goldSheath" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4d03f" />
          <stop offset="40%" stopColor="#daa520" />
          <stop offset="100%" stopColor="#8b6914" />
        </linearGradient>
        <linearGradient id="sheathHighlight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.2)" />
        </linearGradient>
        <filter id="sheathShadow">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000" floodOpacity="0.5" />
        </filter>
      </defs>

      {/* Sheath body — wider to match the broad sword */}
      <rect
        x="30"
        y="32"
        width="475"
        height="56"
        rx="10"
        fill="url(#leatherGrad)"
        filter="url(#sheathShadow)"
      />
      {/* Sheath highlight overlay */}
      <rect x="30" y="32" width="475" height="56" rx="10" fill="url(#sheathHighlight)" />

      {/* Chape (metal tip - left end) — broader */}
      <path
        d="M 35,38 L 14,56 Q 10,60 14,64 L 35,82 Z"
        fill="url(#goldSheath)"
      />
      <path
        d="M 35,42 L 20,56 Q 16,60 20,64 L 35,78 Z"
        fill="#b8860b"
        opacity="0.3"
      />

      {/* Throat (metal opening - right end) — wider */}
      <rect x="495" y="29" width="20" height="62" rx="5" fill="url(#goldSheath)" />
      <rect x="498" y="32" width="14" height="56" rx="4" fill="#b8860b" opacity="0.3" />

      {/* Decorative metal bands */}
      <rect x="140" y="30" width="8" height="60" rx="2" fill="url(#goldSheath)" opacity="0.75" />
      <rect x="280" y="30" width="8" height="60" rx="2" fill="url(#goldSheath)" opacity="0.75" />
      <rect x="400" y="30" width="8" height="60" rx="2" fill="url(#goldSheath)" opacity="0.75" />

      {/* Engraved line details */}
      <line x1="55" y1="52" x2="135" y2="52" stroke="#4a3320" strokeWidth="1" opacity="0.5" />
      <line x1="55" y1="68" x2="135" y2="68" stroke="#4a3320" strokeWidth="1" opacity="0.5" />
      <line x1="153" y1="52" x2="275" y2="52" stroke="#4a3320" strokeWidth="1" opacity="0.5" />
      <line x1="153" y1="68" x2="275" y2="68" stroke="#4a3320" strokeWidth="1" opacity="0.5" />
      <line x1="293" y1="52" x2="395" y2="52" stroke="#4a3320" strokeWidth="1" opacity="0.5" />
      <line x1="293" y1="68" x2="395" y2="68" stroke="#4a3320" strokeWidth="1" opacity="0.5" />
      <line x1="413" y1="52" x2="490" y2="52" stroke="#4a3320" strokeWidth="1" opacity="0.5" />
      <line x1="413" y1="68" x2="490" y2="68" stroke="#4a3320" strokeWidth="1" opacity="0.5" />

      {/* Crimson accent lines */}
      <line x1="60" y1="60" x2="130" y2="60" stroke="#8b0000" strokeWidth="2" opacity="0.3" />
      <line x1="160" y1="60" x2="270" y2="60" stroke="#8b0000" strokeWidth="2" opacity="0.3" />
      <line x1="300" y1="60" x2="390" y2="60" stroke="#8b0000" strokeWidth="2" opacity="0.3" />
    </svg>
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
       * Phase 1 — Sword opens & exits : 0.00 → 0.50  (sword slides 120vw off-screen)
       * Phase 2 — Text reveals L→R    : 0.10 → 0.50  (text clips left-to-right)
       * Phase 3 — Subtitle appears    : 0.40 → 0.55  (subtitle fades in)
       * Phase 4 — HOLD (text visible) : 0.55 → 0.72  (sword gone, text shown)
       * Phase 5 — Smooth transition   : 0.72 → 1.00  (hero fades + slides up)
       */

      /* Phase 1: Sword & sheath separate at EQUAL speed */
      const sepProgress = Math.min(1, p / 0.50);
      const easedSep = easeOutCubic(sepProgress);
      const maxSlide = 120; // vw — far enough to fully exit viewport
      sheathRef.current.style.transform = `translateX(${easedSep * -maxSlide}vw)`;
      swordRef.current.style.transform = `translateX(${easedSep * maxSlide}vw)`;

      /* Both sword & sheath fade out together once off-screen */
      let containerFade = 1;
      if (p >= 0.40) {
        containerFade = Math.max(0, 1 - (p - 0.40) / 0.12);
      }
      containerRef.current.style.opacity = String(containerFade);

      /* Blade glow fades with the container */
      glowRef.current.style.opacity = String(containerFade * easedSep * 0.8);

      /* Phase 2: Title left-to-right clip reveal */
      let textReveal = 0;
      if (p >= 0.10) {
        textReveal = Math.min(1, (p - 0.10) / 0.40);
        textReveal = easeOutCubic(textReveal);
      }
      const clipRight = 100 - (textReveal * 100);
      let titleOpacity = textReveal > 0.01 ? 1 : 0;

      /* Phase 3: Subtitle fades in */
      let subtitleOpacity = 0;
      if (p >= 0.40) {
        subtitleOpacity = Math.min(1, (p - 0.40) / 0.15);
        subtitleOpacity = easeOutCubic(subtitleOpacity);
      }

      /* Phase 4: Hold — nothing changes (0.55 → 0.72) */

      /* Phase 5: Smooth transition — hero fades out + slides up */
      let heroOpacity = 1;
      let heroSlideY = 0;
      if (p > 0.72) {
        const fade = Math.min(1, (p - 0.72) / 0.28);
        const easedFade = easeOutCubic(fade);
        heroOpacity = 1 - easedFade;
        heroSlideY = easedFade * -60; // slides up 60px
        titleOpacity *= heroOpacity;
        subtitleOpacity *= heroOpacity;
      }

      heroRef.current.style.opacity = String(heroOpacity);
      heroRef.current.style.transform = `translateY(${heroSlideY}px)`;

      titleRef.current.style.opacity = String(titleOpacity);
      titleRef.current.style.clipPath = `inset(0 ${clipRight}% 0 0)`;
      titleRef.current.style.transform = `translate(-50%, -50%)`;

      const subtitleEl = titleRef.current.querySelector("p");
      if (subtitleEl) {
        subtitleEl.style.opacity = String(subtitleOpacity);
      }

      /* Scroll hint */
      const hintOpacity = p < 0.06 ? 0.7 * (1 - p / 0.06) : 0;
      hintRef.current.style.opacity = String(hintOpacity);
    }

    /* --- Unlock scroll & transition smoothly --- */
    function unlockAndTransition() {
      isLocked = false;
      document.documentElement.style.overflow = "";
      document.documentElement.style.overscrollBehavior = "";
      // Smooth scroll to content section
      if (heroRef.current) {
        window.scrollTo({
          top: heroRef.current.offsetHeight,
          behavior: "smooth",
        });
      }
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
        unlockAndTransition();
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

      animProgress += delta * SENSITIVITY * 2;
      animProgress = Math.max(0, Math.min(1, animProgress));

      renderFrame(animProgress);

      if (animProgress >= 1) {
        unlockAndTransition();
      }
    }

    /* --- Regular scroll handler (for when unlocked) --- */
    function handleScroll() {
      // If user scrolls back to very top, re-lock and reset animation
      if (!isLocked && window.scrollY <= 0) {
        isLocked = true;
        animProgress = 0.98;
        document.documentElement.style.overflow = "hidden";
        document.documentElement.style.overscrollBehavior = "none";
        // Reset hero visibility
        if (heroRef.current) {
          heroRef.current.style.opacity = "1";
          heroRef.current.style.transform = "translateY(0)";
        }
        renderFrame(animProgress);
      }
    }

    /* --- Attach all listeners --- */
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Render initial state
    renderFrame(0);

    return () => {
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
          <Image
            src="/assets/hero-bg.png"
            alt="Crimson Royale Background"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
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
