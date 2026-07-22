"use client";

import { usePathname } from "next/navigation";

export default function GlobalBackground() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  if (isHomePage) {
    return (
      <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden">
        {/* Desktop & Tablet Background (>= 768px) */}
        <div
          className="hidden md:block absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/assets/Dekstop.png)" }}
        />
        {/* Mobile Background (< 768px) */}
        <div
          className="block md:hidden absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/assets/MOBILE.png)" }}
        />
      </div>
    );
  }

  // Sub-pages (/birdep/*, /informasi/*, etc.)
  // Blurred background across desktop, tablet, and mobile
  return (
    <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/assets/Sub-Page.png)",
          filter: "blur(8px)",
          transform: "scale(1.1)",
        }}
      />
    </div>
  );
}
