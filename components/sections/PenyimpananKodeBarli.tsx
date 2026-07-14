"use client"

import { motion } from "framer-motion";
import { PLACEHOLDER } from "../../lib/placeholder-content";

const fadeUp = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
};



// pppp
interface UnitDetail {
  name: string;
  shortName?: string;
  logo?: string;
  slug: string;
  type: "bph" | "biro" | "departemen";
}

{/* MODAL STRUCTURE HUB */ }
function OrgModal({ unit, onClose }: { unit: UnitDetail | null; onClose: () => void }) {
    if (!unit) return null;
    return (
        <div
            className="fixed inset-0 z-[100] bg-ink/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-8 border border-gold-warm/20"
            >
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        {/* {unit.logo && <span className="text-3xl">{unit.logo}</span>} */}
                        {/* <Image src={unit.logo} width={91} height={91} alt={unit.name} /> */}
                        <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-forest-dark">
                            {unit.name}
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-9 h-9 rounded-full bg-smoke hover:bg-gold-warm/20 flex items-center justify-center transition-colors"
                        aria-label="Tutup"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>
                <p className="text-ink/60 text-sm leading-relaxed">
                    Informasi detail untuk <strong>{unit.name}</strong> akan tersedia setelah data struktur organisasi resmi dikunci. Kembali lagi nanti untuk melihat daftar anggota, tupoksi, dan program kerja unit ini.
                </p>
                <div className="mt-6 pt-6 border-t border-gold-warm/20">
                    <p className="text-bark text-xs">
                        ⏳ Data sedang dalam proses pengumpulan oleh tim konten.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

export default function PenyimpananKodeBarli() {
    // const [unit, onClose] = useState<UnitDetail | null>(null);

  const units: UnitDetail[] = [
    { ...PLACEHOLDER.struktur.bph, type: "bph", slug: "bph" },
    ...PLACEHOLDER.struktur.biro.map((b) => ({ ...b, type: "biro" as const })),
    ...PLACEHOLDER.struktur.departemen.map((d) => ({ ...d, type: "departemen" as const })),
  ];
    return (
        <>
            {/* DARI SECTION ANGKASA STORE */}
            {/* Product Grid + Carousel */}
            <div className="relative">
                {/* Desktop Grid */}
                <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
                    {PLACEHOLDER.store.products.map((product, i) => (
                        <motion.div
                            key={i}
                            {...fadeUp}
                            transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                            className="group bg-white rounded-2xl p-6 border border-gold-warm/10 shadow-card
                           hover:shadow-lift hover:-translate-y-1 transition-all duration-200 cursor-pointer"
                        >
                            {/* Placeholder image */}
                            <div className="aspect-square bg-smoke rounded-xl mb-4 flex items-center justify-center border border-gold-warm/10">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D4A678" strokeWidth="1.5" opacity="0.4">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                    <polyline points="21 15 16 10 5 21" />
                                </svg>
                            </div>
                            <h3 className="font-[family-name:var(--font-body)] font-semibold text-ink text-sm mb-1">
                                {product.name}
                            </h3>
                            <span className="inline-block px-3 py-1 rounded-full bg-amber/20 text-forest-dark text-xs font-bold">
                                {product.price}
                            </span>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile: Horizontal Swipe Carousel */}
                <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-none">
                    {PLACEHOLDER.store.products.map((product, i) => (
                        <motion.div
                            key={i}
                            {...fadeUp}
                            transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                            className="flex-shrink-0 w-56 snap-center bg-white rounded-2xl p-5 border border-gold-warm/10 shadow-card"
                        >
                            <div className="aspect-square bg-smoke rounded-xl mb-3 flex items-center justify-center">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#D4A678" strokeWidth="1.5" opacity="0.4">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                    <circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-ink text-sm mb-1">{product.name}</h3>
                            <span className="inline-block px-3 py-1 rounded-full bg-amber/20 text-forest-dark text-xs font-bold">
                                {product.price}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>


        </>
    )
}