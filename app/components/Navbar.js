"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScrollSpy } from "../../hooks/useScrollSpy";

const MENU = [
  { id: "beranda", label: "Beranda" },
  { id: "profile", label: "Profile" },
  { id: "angkasa-care", label: "Angkasa Care" },
  { id: "store", label: "Angkasa Store" },
  { id: "informasi", label: "Informasi" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const activeId = useScrollSpy(0.45);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const hamburgerRef = useRef(null);

  /* Track scroll position for bg transition */
  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  /* Lock body scroll when drawer open */
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  /* Close drawer on Escape */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && drawerOpen) {
        setDrawerOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  const handleNavClick = useCallback(
    (id) => {
      setDrawerOpen(false);
      if (!isHome) {
        window.location.href = `/#${id}`;
        return;
      }
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    },
    [isHome]
  );

  const navbarBg = scrolled
    ? "bg-forest-dark/95 backdrop-blur-xl shadow-lg"
    : "bg-transparent";

  if (!isHome) {
    // Sub-page: always solid navbar
    return (
      <nav className="fixed top-0 inset-x-0 z-50 bg-forest-dark/95 backdrop-blur-xl shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 min-w-[44px] min-h-[44px]"
            aria-label="Kembali ke Beranda"
          >
            <span className="text-cream-soft font-[family-name:var(--font-display)] text-lg font-extrabold tracking-tight">
              Astana Angkasa
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {MENU.map((item) => (
              <Link
                key={item.id}
                href={`/#${item.id}`}
                className="px-4 py-2 rounded-full text-cream-soft/80 text-sm font-medium hover:text-cream-soft hover:bg-white/10 transition-all duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      {/* ===== Desktop Navbar ===== */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${navbarBg}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-18">
          {/* Logo — click scrolls to #beranda */}
          <button
            onClick={() => handleNavClick("beranda")}
            className="flex items-center gap-2 min-w-[44px] min-h-[44px]"
            aria-label="Kembali ke Beranda"
          >
            <span className="text-cream-soft font-[family-name:var(--font-display)] text-lg font-extrabold tracking-tight">
              Astana Angkasa
            </span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {MENU.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${
                    activeId === item.id
                      ? "bg-crimson text-white shadow-crimson"
                      : scrolled
                      ? "text-cream-soft/70 hover:text-cream-soft hover:bg-cream-soft/10"
                      : "text-cream-soft/70 hover:text-cream-soft hover:bg-white/10"
                  }
                `}
              >
                {item.label}
                {/* External link icon for Store */}
                {item.id === "store" && (
                  <svg
                    className="inline-block ml-1 w-3 h-3 opacity-60"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                )}
              </button>
            ))}
          </div>

          {/* Hamburger (mobile) */}
          <button
            ref={hamburgerRef}
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-lg text-cream-soft hover:bg-white/10 transition-colors"
            onClick={() => setDrawerOpen(true)}
            aria-label="Buka menu navigasi"
            aria-expanded={drawerOpen}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* ===== Mobile Drawer ===== */}
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-forest-dark/60 backdrop-blur-sm transition-opacity duration-300 md:hidden
          ${drawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 z-[70] h-full w-[85%] max-w-sm bg-forest-dark shadow-2xl transition-transform duration-300 ease-out md:hidden
          ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi"
      >
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => {
              setDrawerOpen(false);
              hamburgerRef.current?.focus();
            }}
            className="w-11 h-11 flex items-center justify-center rounded-lg text-cream-soft hover:bg-white/10 transition-colors"
            aria-label="Tutup menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Menu items */}
        <nav className="px-6 pt-4 flex flex-col gap-2">
          {MENU.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-5 py-4 rounded-xl text-base font-medium transition-all duration-200 min-h-[48px]
                ${
                  activeId === item.id
                    ? "text-amber bg-amber/10 border-l-4 border-crimson pl-4"
                    : "text-cream-soft/80 hover:text-cream-soft hover:bg-cream-soft/5"
                }
              `}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Drawer footer */}
        <div className="absolute bottom-8 left-0 right-0 px-6 text-center">
          <p className="text-cream-soft/30 text-xs">
            © 2026 Astana Angkasa
          </p>
        </div>
      </div>
    </>
  );
}
