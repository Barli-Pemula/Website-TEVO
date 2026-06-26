import { PLACEHOLDER } from "../../../lib/placeholder-content";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * TEVO — Sub-page Biro / Departemen Detail
 * Route: /birdep/[slug]
 */
export default async function BirdepPage({ params }: PageProps) {
  const { slug } = await params;

  // Find unit data from all sources
  const allUnits = [
    { slug: "bph", ...PLACEHOLDER.struktur.bph, type: "bph" },
    ...PLACEHOLDER.struktur.biro.map((b) => ({ ...b, type: "biro" })),
    ...PLACEHOLDER.struktur.departemen.map((d) => ({ ...d, type: "departemen" })),
  ];

  const unit = allUnits.find((u) => u.slug === slug);

  if (!unit) {
    return (
      <div className="min-h-screen bg-smoke flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-forest-dark mb-4">
            Unit Tidak Ditemukan
          </h1>
          <p className="text-bark mb-6">
            Biro atau Departemen dengan slug &ldquo;{slug}&rdquo; tidak tersedia.
          </p>
          <Link
            href="/#struktur"
            className="inline-flex items-center gap-2 px-6 py-3 bg-crimson text-white font-bold rounded-full shadow-crimson hover:-translate-y-0.5 transition-all"
          >
            ← Kembali ke Struktur
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-smoke">
      {/* Hero Unit */}
      <section className="relative bg-forest-dark pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[1px] bg-gold-warm/60" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/#struktur"
            className="inline-flex items-center gap-1 text-cream-soft/60 hover:text-gold-warm text-sm mb-6 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Kembali ke Struktur Organisasi
          </Link>
          {unit.emoji && (
            <span className="block text-5xl md:text-6xl mb-4">{unit.emoji}</span>
          )}
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,4vw,2.8rem)] font-extrabold text-cream-soft">
            {unit.name}
          </h1>
          <span className="inline-block mt-3 px-4 py-1 rounded-full bg-gold-warm/20 text-gold-warm text-xs font-bold uppercase tracking-wider">
            {unit.type === "bph" ? "Badan Pengurus Harian" : unit.type === "biro" ? "Biro" : "Departemen"}
          </span>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Description */}
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-card border border-gold-warm/10 mb-8">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-forest-dark mb-4">
              Tentang {unit.shortName || unit.name}
            </h2>
            <div className="prose prose-sm text-ink/70 leading-relaxed max-w-none">
              <p>
                {unit.type === "bph"
                  ? `${unit.name} merupakan pimpinan tertinggi dalam struktur kepengurusan Kabinet Astana Angkasa. BPH bertanggung jawab atas seluruh kebijakan strategis, koordinasi antar unit kerja, dan representasi organisasi.`
                  : unit.type === "biro"
                  ? `${unit.name} adalah unit kerja kabinet yang menangani urusan administratif dan koordinasi. Biro berfungsi sebagai penunjang operasional seluruh kegiatan organisasi.`
                  : `${unit.name} adalah unit pelaksana program kerja yang berfokus pada bidang spesifik sesuai tupoksinya. Departemen menjadi motor utama kegiatan kemahasiswaan di bawah koordinasi BPH.`}
              </p>
            </div>
          </div>

          {/* Tupoksi */}
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-card border border-gold-warm/10 mb-8">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-forest-dark mb-4">
              Tupoksi
            </h2>
            <ul className="space-y-3">
              <li className="flex gap-3 text-ink/70 text-sm">
                <span className="flex-shrink-0 w-2 h-2 rounded-full bg-crimson mt-1.5" />
                <span>Data tupoksi akan diisi setelah struktur organisasi resmi dikunci.</span>
              </li>
            </ul>
          </div>

          {/* Members Placeholder */}
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-card border border-gold-warm/10">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-forest-dark mb-4">
              Anggota
            </h2>
            <div className="bg-smoke rounded-xl p-6 text-center">
              <p className="text-bark text-sm">
                ⏳ Data anggota {unit.name} sedang dalam proses pengumpulan.
                <br />
                Informasi akan ditampilkan setelah data resmi tersedia.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
