"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useScrollSpy } from "../../hooks/useScrollSpy";

const MENU = [
  { id: "beranda", label: "Beranda" },
  { id: "struktur", label: "Struktur Organisasi" },
  { id: "angkasa-care", label: "Angkasa Care" },
  { id: "store", label: "Angkasa Store" },
  { id: "angkasa-kost", label: "Angkasa Kost" },
  { id: "informasi", label: "Informasi" },
  { id: "narahubung", label: "Narahubung", isSpecial: true },
];

// Color palette
const C = {
  dark:      "#32210F",
  gold:      "#DCB06F",
  red:       "#870F0C",
  cream:     "#F6E7CC",
  light:     "#FBF5EA",
  peach:     "#FFE3BB",
};

/* ================================================================
   NavItem — single menu button with hover & active via inline style
   ================================================================ */
function NavItem({ id, label, isActive, scrolled, showArrow, onClick, isSpecial }) {
  const textColor = scrolled ? (isSpecial ? C.red : C.dark) : "rgba(251,245,234,0.85)";

  const baseStyle = {
    position: "relative",
    padding: "8px 16px",
    borderRadius: "9999px",
    fontSize: "14px",
    fontWeight: isSpecial ? 600 : 500,
    transition: "all 0.2s",
    background: "transparent",
    color: textColor,
    cursor: "pointer",
    border: "none",
  };

  const activeStyle = {
    ...baseStyle,
    background: C.peach,
    color: isSpecial ? C.red : C.dark,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  };

  const [hover, setHover] = useState(false);
  const isActiveState = isActive;

  const currentStyle = isActiveState ? activeStyle : {
    ...baseStyle,
    color: hover ? (isSpecial ? C.red : C.dark) : textColor,
    background: hover ? C.peach : "transparent",
  };

  return (
    <button
      onClick={() => onClick(id)}
      style={currentStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {label}
      {showArrow && (
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
  );
}

/* ================================================================
   Sub-page NavLink — simpler, no scroll-spy
   ================================================================ */
function NavLink({ id, label, showArrow, isSpecial }) {
  const [hover, setHover] = useState(false);
  const textColor = isSpecial ? C.red : C.dark;
  return (
    <Link
      key={id}
      href={`/#${id}`}
      style={{
        padding: "8px 16px",
        borderRadius: "9999px",
        fontSize: "14px",
        fontWeight: isSpecial ? 600 : 500,
        transition: "all 0.2s",
        color: textColor,
        background: hover ? C.peach : "transparent",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {label}
      {showArrow && (
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
    </Link>
  );
}

/* ================================================================
   Drawer Nav Item
   ================================================================ */
function DrawerItem({ label, isActive, onClick, isSpecial }) {
  const [hover, setHover] = useState(false);
  const textColor = isSpecial ? C.red : "rgba(251,245,234,0.8)";

  const baseStyle = {
    width: "100%",
    textAlign: "left",
    padding: "16px 24px",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: isSpecial ? 600 : 500,
    transition: "all 0.2s",
    minHeight: "48px",
    background: "transparent",
    color: textColor,
    borderLeft: "4px solid transparent",
    cursor: "pointer",
  };

  const activeStyle = {
    ...baseStyle,
    background: C.peach,
    color: isSpecial ? C.red : C.dark,
    borderLeft: `4px solid ${C.gold}`,
  };

  const currentStyle = isActive ? activeStyle : {
    ...baseStyle,
    color: textColor,
    background: hover ? "rgba(255,227,187,0.15)" : "transparent",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      style={currentStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {label}
    </button>
  );
}

/* ================================================================
   MAIN NAVBAR
   ================================================================ */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const activeId = useScrollSpy(0.25);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const hamburgerRef = useRef(null);
  const [hamHover, setHamHover] = useState(false);
  const [closeHover, setCloseHover] = useState(false);

  useEffect(() => {
    if (!isHome) { setScrolled(true); return; }
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

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

  const handleNavClick = useCallback((id) => {
    setDrawerOpen(false);
    if (!isHome) {
      router.push(`/#${id}`);
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, [isHome, router]);

  const navbarOuter = scrolled
    ? {} // background handled by className for responsive support
    : { background: "transparent" };

  const navbarScrolledClass = scrolled
    ? "backdrop-blur-sm bg-[#FBF5EA]/80 md:bg-[#DCB06F] md:backdrop-blur-[12px]"
    : "";

  const innerStyle = scrolled
    ? { background: C.light, margin: "3px", borderRadius: "2px" }
    : {};

  // ===== SUB-PAGE =====
  if (!isHome) {
    return (
      <nav className={navbarScrolledClass} style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, ...navbarOuter }}>
        <div style={innerStyle}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-[72px]">
            <Link href="/" className="flex items-center min-w-[44px] min-h-[44px]" aria-label="Kembali ke Beranda">
              <Image src="/assets/logo-astana-angkasa.png" alt="Astana Angkasa" width={150} height={42} priority className="h-[36px] md:h-[42px] w-auto" />
            </Link>
            <div className="hidden md:flex items-center gap-1">
              {MENU.map((item) => (
                <NavLink key={item.id} id={item.id} label={item.label} showArrow={item.id === "store"} isSpecial={item.isSpecial} />
              ))}
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // ===== HOME PAGE =====
  return (
    <>
      {/* Desktop Navbar */}
      <nav className={navbarScrolledClass} style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, transition: "all 0.3s", ...navbarOuter }}>
        <div style={innerStyle}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-[72px]">
          {/* Logo */}
          <button onClick={() => handleNavClick("beranda")} className="flex items-center min-w-[44px] min-h-[44px]" aria-label="Kembali ke Beranda">
            <Image src="/assets/logo-astana-angkasa.png" alt="Astana Angkasa" width={150} height={42} priority className="h-[36px] md:h-[42px] w-auto" />
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {MENU.map((item) => (
              <NavItem
                key={item.id}
                id={item.id}
                label={item.label}
                isActive={activeId === item.id}
                scrolled={scrolled}
                showArrow={item.id === "store"}
                onClick={handleNavClick}
                isSpecial={item.isSpecial}
              />
            ))}
          </div>

          {/* Hamburger */}
          <button
            ref={hamburgerRef}
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-lg transition-colors"
            style={{ color: scrolled ? C.dark : C.light, background: hamHover ? (scrolled ? "rgba(220,176,111,0.1)" : "rgba(246,231,204,0.1)") : "transparent" }}
            onClick={() => setDrawerOpen(true)}
            aria-label="Buka menu navigasi"
            aria-expanded={drawerOpen}
            onMouseEnter={() => setHamHover(true)}
            onMouseLeave={() => setHamHover(false)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </button>
        </div>
      </div>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${drawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        style={{ background: "rgba(50,33,15,0.5)" }}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 z-50 w-[85vw] max-w-[320px] h-dvh shadow-2xl transition-transform duration-300 ease-out md:hidden ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{ background: C.dark }}
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi"
        inert={drawerOpen ? undefined : true}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => { setDrawerOpen(false); hamburgerRef.current?.focus(); }}
            className="w-11 h-11 flex items-center justify-center rounded-lg transition-colors"
            style={{ color: C.light, background: closeHover ? "rgba(246,231,204,0.1)" : "transparent" }}
            aria-label="Tutup menu"
            onMouseEnter={() => setCloseHover(true)}
            onMouseLeave={() => setCloseHover(false)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="px-6 pt-4 flex flex-col gap-2">
          {MENU.map((item) => (
            <DrawerItem
              key={item.id}
              label={item.label}
              isActive={activeId === item.id}
              onClick={() => handleNavClick(item.id)}
              isSpecial={item.isSpecial}
            />
          ))}
        </nav>

        <div className="absolute bottom-8 left-0 right-0 px-6 text-center">
          <p style={{ color: "rgba(251,245,234,0.3)", fontSize: "12px" }}>
            © 2026 Astana Angkasa
          </p>
        </div>
      </div>
    </>
  );
}
