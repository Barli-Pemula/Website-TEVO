"use client";

import { useEffect, useState } from "react";

const SECTION_IDS = [
  "beranda",
  "identity",
  "profile",
  "struktur",
  "angkasa-care",
  "store",
  "angkasa-kost",
  "informasi",
];

/**
 * Returns the currently visible section id based on IntersectionObserver.
 * Used by Navbar for scroll-spy active pill.
 */
export function useScrollSpy(threshold = 0.45) {
  const [activeId, setActiveId] = useState<string>("beranda");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(id);
          }
        },
        { threshold }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [threshold]);

  return activeId;
}
