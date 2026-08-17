"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useScrollSpy } from "../../hooks/useScrollSpy";
import FrameCustom from "../../styles/frameCustom.module.css";
import { CONFIG } from "../../lib/config";

const MENU = [
  { id: "beranda", label: "Beranda" },
  { id: "profile", label: "Profile" },
  { id: "struktur", label: "Struktur Organisasi" },
  { id: "angkasa-care", label: "Angkasa Care" },
  { id: "store", label: "Angkasa Store" },
  { id: "angkasa-kost", label: "Angkasa Kost" },
  { id: "informasi", label: "Informasi" },
];

// Color palette
const C = {
  dark: "#32210F",
  gold: "#DCB06F",
  red: "#870F0C",
  cream: "#F6E7CC",
  light: "#FBF5EA",
  peach: "#FFE3BB",
};

/* ================================================================
   NavItem — single menu button for Desktop
   ================================================================ */
function NavItem({ id, label, isActive, scrolled, onClick, isSpecial }) {
  const textColor = scrolled ? (isSpecial ? C.red : C.dark) : "rgba(251,245,234,0.85)";

  const baseStyle = {
    position: "relative",
    padding: "6px clamp(8px, 1.1vw, 16px)",
    borderRadius: "9999px",
    fontSize: "clamp(12px, 0.95vw, 14px)",
    fontWeight: isSpecial ? 600 : 500,
    transition: "all 0.2s",
    background: "transparent",
    color: textColor,
    cursor: "pointer",
    border: "none",
    whiteSpace: "nowrap",
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
    </button>
  );
}

/* ================================================================
   Sub-page NavLink — simpler, no scroll-spy for Desktop
   ================================================================ */
function NavLink({ id, label, isSpecial }) {
  const [hover, setHover] = useState(false);
  const textColor = isSpecial ? C.red : C.dark;
  return (
    <Link
      key={id}
      href={`/#${id}`}
      style={{
        padding: "6px clamp(8px, 1.1vw, 16px)",
        borderRadius: "9999px",
        fontSize: "clamp(12px, 0.95vw, 14px)",
        fontWeight: isSpecial ? 600 : 500,
        transition: "all 0.2s",
        color: textColor,
        background: hover ? C.peach : "transparent",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {label}
    </Link>
  );
}

/* ================================================================
   Drawer Nav Item — Styled matching reference design
   ================================================================ */
function DrawerItem({ label, isActive, onClick }) {
  return (
    <div className="w-full flex flex-col items-center">
      <button
        type="button"
        onClick={onClick}
        className={`w-full py-2 px-5 rounded-full text-center transition-all duration-200 text-sm sm:text-base font-semibold tracking-wide cursor-pointer ${
          isActive
            ? "bg-[#DDB87E] text-[#32210F] shadow-sm"
            : "text-[#32210F] hover:bg-[#DDB87E]/30"
        }`}
      >
        {label}
      </button>
      <div className="w-full h-[1px] bg-[#E3CDA4] my-1" />
    </div>
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
    const el = document.getElementById(id) || (id === "narahubung" ? document.getElementById("footer") : null);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, [isHome, router]);

  const isBarActive = scrolled || drawerOpen;

  const navbarOuter = isBarActive
    ? { background: "#DCB06F" }
    : { background: "transparent" };

  const navbarScrolledClass = isBarActive
    ? "backdrop-blur-md shadow-lg p-[2.5px] sm:p-[3px]"
    : "";

  const innerStyle = isBarActive
    ? { background: C.light }
    : {};

  return (
    <>
      {/* Outer Fixed Container for Navbar & Dropdown */}
      <div
        className={`fixed z-50 transition-all duration-300 ${
          isBarActive
            ? "top-[15px] inset-x-[5px] md:inset-x-[35px]"
            : "top-0 inset-x-0"
        }`}
      >
        {/* Top Navbar Header */}
        <nav
          className={`${FrameCustom.royalFrame} ${navbarScrolledClass} relative z-50`}
          style={{ transition: "all 0.3s", ...navbarOuter }}
        >
          <div className={isBarActive ? FrameCustom.royalFrame : ""} style={innerStyle}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 lg:h-[72px]">
              {/* Logo — Always on the Left */}
              <button
                onClick={() => handleNavClick("beranda")}
                className="flex items-center shrink-0 min-w-[44px] min-h-[44px] cursor-pointer bg-transparent border-0 border-none outline-none focus:outline-none focus:ring-0 p-0 shadow-none"
                style={{ border: "none", outline: "none", background: "transparent" }}
                aria-label="Kembali ke Beranda"
              >
                <Image
                  src="/assets/logo-astana-angkasa.png"
                  alt="Astana Angkasa"
                  width={150}
                  height={42}
                  priority
                  className="h-[36px] sm:h-[40px] lg:h-[42px] w-auto border-0 outline-none"
                  style={{ border: "none", outline: "none" }}
                />
              </button>

              {/* Desktop Menu (1024px and up) */}
              <div className="hidden lg:flex items-center gap-1">
                {isHome
                  ? MENU.map((item) => (
                      <NavItem
                        key={item.id}
                        id={item.id}
                        label={item.label}
                        isActive={activeId === item.id}
                        scrolled={scrolled}
                        onClick={handleNavClick}
                      />
                    ))
                  : MENU.map((item) => (
                      <NavLink key={item.id} id={item.id} label={item.label} />
                    ))
                }
              </div>

              {/* Hamburger / Close Button — Always on the Right */}
              {drawerOpen ? (
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="lg:hidden w-10 h-10 rounded-full bg-[#FBF5EA] border-2 border-[#DCB06F] shadow-[0_2px_8px_rgba(0,0,0,0.12)] flex items-center justify-center text-[#870F0C] hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  aria-label="Tutup menu"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              ) : (
                <button
                  ref={hamburgerRef}
                  className="lg:hidden flex items-center justify-center w-11 h-11 rounded-lg transition-colors cursor-pointer"
                  style={{ color: scrolled ? C.dark : C.light, background: hamHover ? (scrolled ? "rgba(220,176,111,0.1)" : "rgba(246,231,204,0.1)") : "transparent" }}
                  onClick={() => setDrawerOpen(true)}
                  aria-label="Buka menu navigasi"
                  aria-expanded={drawerOpen}
                  onMouseEnter={() => setHamHover(true)}
                  onMouseLeave={() => setHamHover(false)}
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </nav>

        {/* Dropdown Menu Card (Mobile & Tablet) — Aligned to the Right */}
        {drawerOpen && (
          <div className="lg:hidden absolute top-[100%] right-0 mt-1.5 mr-1 w-[82vw] max-w-[310px] bg-[#FBF5EA] border-2 border-[#DCB06F] rounded-2xl shadow-2xl p-4 sm:p-5 z-50 flex flex-col items-center max-h-[calc(100vh-110px)] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Menu List */}
            <div className="w-full flex flex-col items-center">
              {MENU.map((item) => (
                <DrawerItem
                  key={item.id}
                  label={item.label}
                  isActive={activeId === item.id}
                  onClick={() => handleNavClick(item.id)}
                />
              ))}
            </div>

            {/* Footer: Social Icons & Copyright */}
            <div className="w-full flex flex-col items-center pt-3 pb-1">
              {/* Social Icons */}
              <div className="flex items-center justify-center gap-4 mb-2.5">
                {/* Instagram */}
                <a
                  href={CONFIG.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#F6E7CC] border border-[#DCB06F] shadow-[0_2px_8px_rgba(50,33,15,0.12)] flex items-center justify-center hover:scale-105 transition-transform"
                  aria-label="Instagram Astana Angkasa"
                >
                  <div className="w-6.5 h-6.5 rounded-full bg-[#870F0C] flex items-center justify-center text-white">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  </div>
                </a>

                {/* YouTube */}
                <a
                  href={CONFIG.socials.youtube || "https://www.youtube.com/@ormawaeksekutifpku"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#F6E7CC] border border-[#DCB06F] shadow-[0_2px_8px_rgba(50,33,15,0.12)] flex items-center justify-center hover:scale-105 transition-transform"
                  aria-label="YouTube Astana Angkasa"
                >
                  <div className="w-6.5 h-6.5 rounded-full bg-[#870F0C] flex items-center justify-center text-white">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                </a>
              </div>

              {/* Copyright text */}
              <div className="text-[10px] text-[#32210F]/80 text-center font-medium leading-tight">
                <p>Copyright © Astana Angkasa 2026.</p>
                <p>All rights reserved.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile/Tablet Backdrop Overlay */}
      <div
        className={`fixed inset-0 z-40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${drawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        style={{ background: "rgba(50,33,15,0.55)" }}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />
    </>
  );
}
