"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Controls the sword/gate animation phases:
 * - hidden:    initial load — sword invisible
 * - appeared:  first scroll — sword fades in with glow
 * - animating: second+ scroll — gate panels slide, sword brightens
 */
export function useSwordScrollTrigger() {
  const [phase, setPhase] = useState<"hidden" | "appeared" | "animating">(
    "hidden"
  );
  const scrollCountRef = useRef(0);
  const lockedRef = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setPhase("animating"); // skip animation entirely
      return;
    }

    const onScroll = () => {
      if (lockedRef.current) return;
      scrollCountRef.current += 1;

      if (scrollCountRef.current === 1) {
        setPhase("appeared");
      } else if (scrollCountRef.current >= 2) {
        setPhase("animating");
        lockedRef.current = true;
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return phase;
}
