"use client";

import { PLACEHOLDER } from "../../lib/placeholder-content";
import { CONFIG } from "../../lib/config";

export default function Footer() {
  const scrollToTop = () => {
    const el = document.getElementById("beranda");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer id="footer" className="bg-forest-dark text-cream-soft safe-area-bottom">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Logo + Description */}
          <div className="md:col-span-5">
            <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-cream-soft mb-3">
              Astana Angkasa
            </h3>
            <p className="text-cream-soft/60 text-sm leading-relaxed max-w-sm">
              Kabinet Ormawa Eksekutif PKU IPB University
              <br />
              Periode 2025/2026
            </p>
            <p className="text-cream-soft/40 text-sm mt-3 italic font-[family-name:var(--font-editorial)]">
              &ldquo;Menata Asa, Wujudkan Karya, Menjulang ke Angkasa&rdquo;
            </p>
          </div>

          {/* Quick Links — separated by gold divider */}
          <div className="md:col-span-3 border-l-0 border-t border-gold-warm/20 pt-6 md:border-l md:border-t-0 md:pt-0 pl-0 md:pl-8">
            <h4 className="font-[family-name:var(--font-display)] text-xs font-bold uppercase tracking-[0.15em] text-gold-warm mb-4">
              Navigasi
            </h4>
            <ul className="space-y-3 md:space-y-2.5">
              {PLACEHOLDER.footer.quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-cream-soft/60 text-sm hover:text-gold-warm transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gold-warm hover:after:w-full after:transition-all"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4 border-l-0 border-t border-gold-warm/20 pt-6 md:border-l md:border-t-0 md:pt-0 pl-0 md:pl-8">
            <h4 className="font-[family-name:var(--font-display)] text-xs font-bold uppercase tracking-[0.15em] text-gold-warm mb-4">
              Kontak
            </h4>
            <div className="space-y-3 text-sm text-cream-soft/60">
              <p>
                <span className="block text-cream-soft/80 font-medium">
                  {CONFIG.contact.name}
                </span>
                <span className="text-cream-soft/40 text-xs">
                  {CONFIG.contact.role}
                </span>
              </p>
              {CONFIG.contact.email && (
                <p>
                  <a
                    href={`mailto:${CONFIG.contact.email}`}
                    className="text-sky-vivid hover:text-sky-vivid/80 transition-colors"
                  >
                    {CONFIG.contact.email}
                  </a>
                </p>
              )}
              <p className="text-cream-soft/40 text-xs leading-relaxed">
                {CONFIG.address.line1}
                <br />
                {CONFIG.address.line2}
              </p>
            </div>

            {/* Social */}
            {CONFIG.socials.instagram && (
              <div className="mt-4 flex gap-3">
                <a
                  href={CONFIG.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream-soft/40 hover:text-gold-warm transition-colors"
                  aria-label="Instagram Astana Angkasa"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gold-warm/20" />

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-cream-soft/40 text-xs">
          {PLACEHOLDER.footer.copyright}
        </p>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 text-amber hover:text-amber/80 transition-colors text-sm font-medium min-w-[44px] min-h-[44px] justify-center"
          aria-label="Kembali ke atas"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
          <span className="hidden sm:inline">Kembali ke Atas</span>
        </button>
      </div>
    </footer>
  );
}
