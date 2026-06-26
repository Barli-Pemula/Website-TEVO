# SKILL.md — AI Context: TEVO (Astana Angkasa Website)

> Versi dokumen: 2.0 | Sinkron dengan UI/UX Spec v4 | Last updated: 2026-06

---

## 1. Identitas Proyek

| Atribut            | Nilai                                                                 |
|--------------------|-----------------------------------------------------------------------|
| **Nama proyek**    | TEVO — Website Publik Kabinet Astana Angkasa                         |
| **Organisasi**     | Ormawa Eksekutif PKU IPB — Kabinet Astana Angkasa (2025/2026)       |
| **Domain**         | `ormawaeksekutifpku.com`                                              |
| **Tipe halaman**   | One-scroll SPA + beberapa sub-page (`/birdep/[slug]`, `/informasi/[slug]`) |
| **Stack utama**    | Next.js 15 App Router · TypeScript · Tailwind CSS v4 · Framer Motion |
| **Store**          | External subdomain Angkasa Store (e-commerce terpisah)               |

---

## 2. Stack & Dependensi

```
next@15 (App Router, RSC + Client Components)
typescript@5
tailwindcss@4           ← BUKAN v3; konfigurasi via CSS @theme, bukan tailwind.config.ts
framer-motion@11        ← animasi scroll, pedang, parallax, gerbang
zustand                 ← state global ringan (drawer, modal, carousel index)
swr atau react-query    ← fetching data (news, struktur, store)
```

> **Penting Tailwind v4:** token warna dan font didefinisikan di dalam CSS menggunakan `@theme { --color-* ... }`. Tidak ada file `tailwind.config.ts`. Gunakan `@apply` hanya untuk utility yang benar-benar direpetisi.

---

## 3. Design Tokens — Color Palette & Design Direction

### 3.1 Philosophy: Clean Elegance

TEVO dirancang sebagai **company profile premium** — bukan sekadar website organisasi kampus. Setiap keputusan visual harus terasa **terarah, tenang, dan berwibawa**. Gunakan white space secara agresif. Hindari dekorasi berlebih. Biarkan tipografi dan warna berbicara.

> **Prinsip inti:** Jika sebuah elemen visual tidak menyampaikan informasi atau memperkuat identitas, hapus.

### 3.2 Color Tokens

```css
/* globals.css — @theme block */
@theme {
  /* ─── Brand Core ─────────────────────────────────────── */
  --color-crimson:        #A83931;  /* CTA utama, active state, aksen berani — gunakan hemat */
  --color-crimson-deep:   #2C440C;  /* Hero background, footer, heading berat — forest dark */
  --color-gold-warm:      #D4A678;  /* Divider, ornamen, badge, focus ring — champagne gold */
  --color-sky-vivid:      #03ABF6;  /* Aksen interaktif, link hover, highlight data — electric sky */

  /* ─── Surface & Background ───────────────────────────── */
  --color-sage-mid:       #9AAC69;  /* Accent nature section, tag, muted badge */
  --color-sky-pale:       #93D4E8;  /* Panel info ringan, bg card sekunder */
  --color-cream-soft:     #FEF8BC;  /* Card kontras, Visi/Misi, panel info — buttercream */
  --color-forest-dark:    #2C440C;  /* Alias deep bg; identik dengan crimson-deep */
  --color-bark:           #614C3B;  /* Teks sekunder, caption, label subdue — warm brown */
  --color-amber:          #F9D253;  /* Badge highlight, ornamen aktif, focus ring alternatif */

  /* ─── Neutral ─────────────────────────────────────────── */
  --color-ink:            #1A1A1A;  /* Teks utama — hampir hitam, bukan pure black */
  --color-smoke:          #F5F4F0;  /* Background section netral — off-white warm */
  --color-white:          #FFFFFF;

  /* ─── Tipografi ───────────────────────────────────────── */
  --font-display:   'Plus Jakarta Sans', 'Poppins', sans-serif;   /* ExtraBold 800 — heading utama */
  --font-body:      'Inter', 'Plus Jakarta Sans', sans-serif;     /* 400–600 — konten */
  --font-editorial: 'Playfair Display', 'Merriweather', serif;    /* kutipan Visi/Misi, editorial */

  /* ─── Shape ───────────────────────────────────────────── */
  --radius-card:    10px;
  --radius-pill:    9999px;
  --radius-sm:      6px;

  /* ─── Shadow ──────────────────────────────────────────── */
  --shadow-card:    0 2px 16px 0 rgba(0,0,0,0.07);
  --shadow-lift:    0 6px 28px 0 rgba(0,0,0,0.12);
  --shadow-crimson: 0 4px 20px 0 rgba(168,57,49,0.22);
  --shadow-amber:   0 4px 20px 0 rgba(249,210,83,0.18);
}
```

### 3.3 Panduan Penggunaan Warna

| Warna | Token | Kapan Digunakan |
|-------|-------|-----------------|
| Crimson `#A83931` | `crimson` | Tombol CTA primer, active state navbar, aksen section header |
| Forest Dark `#2C440C` | `crimson-deep` / `forest-dark` | Hero background, Footer background, heading yang memerlukan kedalaman visual |
| Champagne Gold `#D4A678` | `gold-warm` | Garis ornamen, divider section, badge, focus ring default |
| Electric Sky `#03ABF6` | `sky-vivid` | Link hover, highlight interaktif, elemen data digital |
| Sage `#9AAC69` | `sage-mid` | Badge "Angkasa Care", tag kategori, aksen section alam/lingkungan |
| Pale Sky `#93D4E8` | `sky-pale` | Card bg sekunder, panel informasi ringan |
| Buttercream `#FEF8BC` | `cream-soft` | Card Visi/Misi, panel info kontras di atas bg gelap |
| Warm Brown `#614C3B` | `bark` | Caption, label, teks sekunder — TIDAK untuk body text utama |
| Amber `#F9D253` | `amber` | Badge highlight, ornamen aktif, ikon kecil, skeleton shimmer accent |
| Off-white `#F5F4F0` | `smoke` | Background section netral (pengganti putih murni) |

### 3.4 Color Pairing yang Direkomendasikan

```
Hero / Footer:       forest-dark bg + cream-soft text + gold-warm ornament
CTA Button:          crimson bg + white text + shadow-crimson
Card (light):        smoke bg + ink text + gold-warm border
Card (contrast):     cream-soft bg + bark text + amber accent
Active Navbar Pill:  crimson bg + white text
Focus Ring:          2px solid gold-warm, offset 2px
Section Divider:     gold-warm, 1px, opacity 40%
Highlight / Link:    sky-vivid pada dark bg; crimson pada light bg
Care Badge:          sage-mid bg + forest-dark text
News Category Tag:   bark bg + cream-soft text (atau sky-pale bg + forest-dark text)
```

---

## 4. Design Direction — Company Profile Clean & Elegant

### 4.1 Prinsip Visual

TEVO bukan website mahasiswa yang ramai — ia adalah **wajah resmi sebuah kabinet** yang ingin memancarkan kewibawaan, kepercayaan, dan keanggunan. Desain harus merespons palette warna kaya ini dengan **komposisi yang tenang, bukan berisik**.

**Aturan desain utama:**

1. **White space adalah fitur.** Setiap section butuh napas. Jangan penuhi grid dengan elemen.
2. **Satu aksen berani per section.** Pilih satu warna dari palette untuk dominan di setiap section — yang lain pendukung.
3. **Tipografi sebagai ornamen.** Heading display besar (80–120px mobile-responsif) bisa menjadi dekorasi itu sendiri.
4. **Konsistensi border/divider.** Gunakan `gold-warm` secara konsisten sebagai penanda visual hierarki.
5. **Foto dan ilustrasi harus breathe.** Tidak ada card yang terasa sesak — padding minimal 24px.

### 4.2 Tone Estetika

| Kata Kunci | Implementasi |
|-----------|-------------|
| **Berwibawa** | Font display berat, heading besar, palette gelap di atas fold |
| **Elegan** | Banyak white space, warna netral dominan, aksen hemat |
| **Hangat** | Cream, gold-warm, bark — bukan dingin atau corporate |
| **Progresif** | Sky-vivid dan amber sebagai kejutan visual yang terasa segar |
| **Lokal-Premium** | Nuansa Jawa/istana (merah, emas, hijau tua) tanpa terasa kuno |

### 4.3 Panduan Animasi

Animasi harus **purposeful**, bukan dekoratif:
- Scroll-reveal: fade-in + translateY(16px → 0), stagger 60ms, duration 400ms ease-out
- Hover card: shadow naik + translateY(-3px), 200ms
- CTA button hover: translateY(-2px), shadow-crimson aktif, 180ms
- Animasi besar (hero gate + pedang): hanya saat user sudah mulai scroll
- Reduced-motion: semua animasi fallback ke opacity-only, tanpa translate/scale

---

## 5. Struktur Route

```
/                       → one-scroll homepage (Hero → Identity → Intro/VM → Struktur → Care → Store → News → Footer)
/birdep/[slug]          → sub-page detail Biro/Departemen
/informasi/[slug]       → detail berita/update
/profile                → (opsional MVP) sub-page profil organisasi; jika tidak ada → scroll ke #profile
external: angkasastore.ormawaeksekutifpku.com
external: chatbot Angkasa Help (URL dikunci saat IA final)
external: linktree/kanal MinCare/Adkesmah
```

### Anchor ID Homepage (Wajib)

```
#beranda        → Hero (Section 1)
#identity       → Identity Launch (Section 2)
#profile        → Introduction + Visi/Misi (Section 3)
#struktur       → Organization Structure Hub (Section 4)
#angkasa-care   → Angkasa Care Hub (Section 5)
#store          → Angkasa Store Preview (Section 6)
#informasi      → News & Update (Section 7)
#footer         → Footer
```

---

## 6. Komponen Global

### 6.1 Navbar

- **Desktop/Tablet:** Sticky, transparan di atas hero, berubah jadi `forest-dark` + blur saat scroll melewati hero.
- **Active pill:** `bg-crimson text-white rounded-full shadow-crimson`
- **Scroll spy:** `IntersectionObserver` threshold `0.45` per section.
- **Mobile:** Hamburger → full-height drawer dari kanan, overlay `forest-dark/50`.
- Drawer lock body scroll; Escape menutup drawer; focus kembali ke hamburger icon.
- `scroll-margin-top` di setiap section = tinggi navbar + 8px.
- Logo: versi putih/cream saat di atas hero, versi gelap saat background terang.

### 6.2 Global State Visual

| State     | Behavior                                                              |
|-----------|-----------------------------------------------------------------------|
| Default   | Transisi 200ms ease-out                                               |
| Hover     | 180–250ms; hanya desktop pointer                                      |
| Pressed   | scale 0.98, opacity 85-90%, 80–120ms; penting di mobile              |
| Active    | Background `crimson` solid, teks putih                                |
| Focus     | Outline 2px `gold-warm` offset 2px; TIDAK boleh dihilangkan          |
| Disabled  | Opacity 45%, cursor not-allowed                                       |
| Loading   | Skeleton shimmer dengan shimmer accent `amber/20`; max 1–2 detik     |
| Error     | Panel merah lembut + CTA "Coba Lagi"                                  |

---

## 7. Hero Section — Gates of Astana

### 7.1 Background Asset

```
File   : WhatsApp_Image_2026-06-25_at_23_33_25.jpeg
Konten : Ilustrasi istana/Astana fantasi dengan menara merah-marun,
         tembok batu krem, gerbang lengkung, jalan setapak menuju gerbang,
         bukit hijau, pohon, dan langit biru dengan awan cerah.
Peran  : HERO BACKGROUND IMAGE — full-width, full-height, object-cover.
```

**Cara penggunaan di Next.js:**

```tsx
// Simpan sebagai: /public/assets/hero-castle.webp  (konversi dari JPEG ke WebP)
import Image from 'next/image'

<div className="relative h-svh w-full overflow-hidden">
  <Image
    src="/assets/hero-castle.webp"
    alt=""                    {/* dekoratif, alt kosong */}
    fill
    priority                  {/* hero = above the fold, TIDAK lazy-load */}
    className="object-cover object-center"
    sizes="100vw"
  />
  {/* Layer overlay gradient gelap forest-dark di atas gambar */}
  <div className="absolute inset-0 bg-gradient-to-b from-[#2C440C]/70 via-[#2C440C]/25 to-[#2C440C]/85" />
  {/* Konten hero di atas overlay */}
  ...
</div>
```

**Komposisi layer hero (dari belakang ke depan):**

```
Layer 0: hero-castle.webp         (background ilustrasi istana)
Layer 1: gradient overlay          (forest-dark/70 → /25 → /85, arah vertikal)
Layer 2: panel gerbang kiri/kanan  (curtain forest-dark gelap yang terbelah saat scroll)
Layer 3: pedang SVG                (lihat Seksi 7.2)
Layer 4: headline + CTA            (teks HTML, bukan gambar)
Layer 5: scroll cue icon           (panah bounce bawah tengah, warna gold-warm)
```

### 7.2 Pedang (Sword) — Animasi Scroll-Triggered

> **⚠️ Aturan Khusus (WAJIB diikuti):**
>
> Pedang **TIDAK muncul saat halaman pertama kali dibuka** (`initial load`).
> Pedang baru muncul setelah **user melakukan scroll pertama kali** (deteksi scroll event ke-1).
> Baru pada **scroll selanjutnya** (scroll ke-2 dst.), animasi gerbang dan pedang berjalan sesuai desain.

**Implementasi logika scroll:**

```tsx
// hooks/useSwordScrollTrigger.ts
import { useEffect, useRef, useState } from 'react'

export function useSwordScrollTrigger() {
  const [phase, setPhase] = useState<'hidden' | 'appeared' | 'animating'>('hidden')
  const scrollCountRef = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      scrollCountRef.current += 1
      if (scrollCountRef.current === 1) {
        setPhase('appeared')
      } else if (scrollCountRef.current >= 2) {
        setPhase('animating')
        window.removeEventListener('scroll', onScroll)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return phase
}
```

**Visual sword per fase:**

```
hidden     → opacity: 0, scale: 0.75, translateY: 20px
appeared   → opacity: 1, scale: 1, translateY: 0 | glow: amber/30 | 600ms ease-out
animating  → Framer Motion useScroll; gate panels slide kiri-kanan;
             sword brightness naik saat user scroll lebih dalam ke hero
```

**Warna glow pedang:** `amber` (#F9D253) sebagai fill/glow, dengan outline tipis `gold-warm`.

### 7.3 Headline & CTA Hero

```
Headline utama   : font-display ExtraBold, 72–96px desktop, 40–52px mobile
                   Warna: cream-soft (#FEF8BC) atau white
                   Letter-spacing: -0.02em
                   Line-height: 1.1

Sub-headline     : font-body SemiBold, 18–20px
                   Warna: cream-soft/80 atau sky-pale/90

CTA Button       : "Masuki Astana" / "Jelajahi Kabinet"
  → smooth scroll ke #identity, durasi 650ms
  → Warna: bg-crimson, text-white, shadow-crimson
  → Hover: translateY(-2px), shadow lebih besar, icon panah muncul
  → Pressed: scale 0.98

Scroll Cue       : panah ↓ bounce infinite, warna gold-warm
  → Posisi: bottom-center, 32px dari bawah
  → Pause jika reduced-motion
```

---

## 8. Section-by-Section Quick Reference

### Section 2 — Identity Launch (`#identity`)
- Background: `smoke` (#F5F4F0) atau `white`
- Logo Astana Angkasa: center atau split kiri-logo / kanan-slogan
- Nama: "Astana Angkasa" — font-display ExtraBold, warna `forest-dark`
- Slogan: font-editorial italic, warna `bark`
- Ornamen: garis `gold-warm` tipis di atas dan bawah nama
- Reveal: fade-in + scale 0.96→1, stagger 80ms per baris

### Section 3 — Introduction, Vision & Mission (`#profile`)
- Background: bergantian `smoke` dan `white` per subsection
- 3 content card: Selayang Pandang, Peran Ormawa, Pengertian Kabinet
  - Card bg: `white`, border `gold-warm/30`, radius `radius-card`
- Visi card: `cream-soft` bg + `forest-dark` text + `gold-warm` ornamen
- Misi card: `smoke` bg + `ink` text, list item dengan bullet `crimson`
- Layout asimetris desktop; mobile: card stack full-width
- Divider antar subsection: garis ornamen `gold-warm`, opacity 40%

### Section 4 — Organization Structure Hub (`#struktur`)
- Background: `forest-dark` atau gradient `forest-dark` → `#1a2a06`
- Teks: `cream-soft` dan `gold-warm`
- Tree diagram: Root (Kabinet) → BPH → Biro/Dept
- Connector line: `gold-warm/50`
- Node card: `bark` bg + `cream-soft` text + hover `crimson` border
- Click node → route ke `/birdep/[slug]`
- Mobile fallback: vertical card list bertingkat

### Section 4b — Sub-Page Birdep (`/birdep/[slug]`)
- Hero unit: `forest-dark` background + ornamen `gold-warm`
- Deskripsi, tupoksi: `smoke` section
- Member carousel: card `white`, hover zoom 1.05, overlay nama `forest-dark/70`
- Click → modal/bottom sheet
- Skeleton loading: shimmer `amber/15`; empty state jelas

### Section 5 — Angkasa Care Hub (`#angkasa-care`)
- Background: `white` atau `smoke`
- Diagram Venn:
  - Angkasa Help: `crimson/15` fill + `crimson` border
  - MinCare: `gold-warm/20` fill + `gold-warm` border
  - Irisan "Angkasa Care": `sage-mid/30` + badge `sage-mid`
- Mobile fallback: 2 card stack + badge "Angkasa Care" di antara keduanya
  - Card Angkasa Help: `sky-pale` bg + `crimson` icon
  - Card MinCare: `cream-soft` bg + `gold-warm` icon
- CTA: "Mulai Chatbot" (bg `crimson`) + "Hubungi MinCare" (outline `gold-warm`)
- Edge case: chatbot unavailable → maintenance card dengan ikon `amber`

### Section 6 — Angkasa Store Preview (`#store`)
- Background: `smoke`
- Section header: "Angkasa Store" — font-display, warna `forest-dark`, ornamen `gold-warm`
- Grid/carousel foto produk (4–8 item pertama)
- Card: `white` bg, radius besar, `shadow-card`, hover `shadow-lift`
- Badge harga: `amber` bg + `forest-dark` text
- CTA: "Kunjungi Angkasa Store" — bg `crimson`, icon external-link
- Mobile: horizontal swipe carousel + scroll-snap
- Analytics event: `store_cta_click`, `product_card_click`

### Section 7 — Informasi & Update (`#informasi`)
- Background: `forest-dark` (gelap untuk kontras dengan news card terang)
- Section header: teks `cream-soft` + ornamen `gold-warm`
- Carousel horizontal; featured card lebih besar/terang
- News card: `white` bg, cover image, tanggal (`bark`), kategori tag (`sky-pale` bg), judul (`ink`), excerpt (`bark`), tombol "Selengkapnya" (`crimson` text atau outline)
- Featured card: border `gold-warm` 2px, `shadow-lift`
- Click → `/informasi/[slug]`
- Auto-play: 5–7 detik (dimatikan saat reduced-motion)
- Loading: skeleton shimmer; Empty: pesan informatif; Error: CTA "Muat ulang"

### Global Footer
- Background: `forest-dark`, teks `cream-soft`
- Logo: versi putih/cream
- Kontak: `sky-pale` untuk link/nomor yang bisa diklik
- Quick links: `cream-soft/70` default, `gold-warm` hover, underline animasi kiri
- Garis pemisah antar kolom: `gold-warm/20`
- Copyright: `cream-soft/50` — kecil, tidak mencolok
- Back-to-top: `amber` icon, smooth scroll ke `#beranda`

---

## 9. Aksesibilitas & Performance

### Aksesibilitas
- Satu `<h1>` per page (headline hero). Section heading = `<h2>`. Sub-komponen = `<h3>`.
- Gambar dekoratif: `alt=""`. Gambar informatif: `alt` deskriptif dalam bahasa Indonesia.
- Semua CTA, card clickable, drawer, modal: keyboard accessible.
- Focus ring: `outline: 2px solid var(--color-gold-warm); outline-offset: 2px;`
- `prefers-reduced-motion`: matikan parallax, sword animation, carousel auto-play.
- Touch target minimum: 44×44px; ideal 48px tinggi untuk mobile.
- Kontras warna wajib WCAG AA: `cream-soft` di atas `forest-dark` ✓, `white` di atas `crimson` ✓.

### Performance
- Hero image: WebP/AVIF, `priority`, `fill`, `sizes="100vw"`.
- Layer tambahan hero: lazy-loaded setelah first paint.
- Semua gambar non-hero: `loading="lazy"`, `width` + `height` eksplisit.
- Carousel: `scroll-snap` native > library berat.
- Konten dinamis: SWR/React Query dengan `stale-while-revalidate`.
- Bundle: tree-shake Framer Motion imports.

---

## 10. Konten Placeholder (Harus Diganti Sebelum Go-Live)

| Item                     | Status        | Lokasi di Code                  |
|--------------------------|---------------|---------------------------------|
| Logo Astana Angkasa      | Belum final   | `/public/assets/logo.svg`       |
| Slogan kabinet           | Belum final   | `lib/placeholder-content.ts`    |
| Teks Selayang Pandang    | Belum final   | `lib/placeholder-content.ts`    |
| Visi & Misi              | Belum final   | `lib/placeholder-content.ts`    |
| Daftar BPH/Biro/Dept     | Belum tersedia | Data layer internal            |
| URL Angkasa Help chatbot | Belum final   | `lib/config.ts`                 |
| URL MinCare/linktree     | Belum final   | `lib/config.ts`                 |
| URL Angkasa Store        | Belum final   | `lib/config.ts`                 |
| Narahubung + alamat      | Belum final   | `lib/placeholder-content.ts`    |
| Warna brand final        | **SUDAH DIPERBARUI** | `globals.css @theme`    |

---

## 11. File Struktur Proyek (Rekomendasi)

```
tevo/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                       ← one-scroll homepage
│   ├── birdep/[slug]/page.tsx
│   ├── informasi/[slug]/page.tsx
│   └── globals.css                    ← @theme tokens (DIPERBARUI)
├── components/
│   ├── navbar/
│   │   ├── Navbar.tsx
│   │   └── MobileDrawer.tsx
│   ├── hero/
│   │   ├── HeroSection.tsx            ← composite: bg + gate + sword + headline
│   │   ├── GatePanel.tsx              ← panel kiri/kanan
│   │   ├── SwordSVG.tsx               ← SVG pedang teranimasikan
│   │   └── ScrollCue.tsx
│   ├── sections/
│   │   ├── IdentitySection.tsx
│   │   ├── IntroVisionMission.tsx
│   │   ├── StructureHub.tsx
│   │   ├── AngkasaCareHub.tsx
│   │   ├── StorePreview.tsx
│   │   └── NewsCarousel.tsx
│   ├── ui/                            ← primitive: Button, Card, Modal, BottomSheet, Skeleton
│   └── footer/Footer.tsx
├── hooks/
│   ├── useSwordScrollTrigger.ts       ← ⭐ scroll-triggered sword hook
│   ├── useScrollSpy.ts                ← navbar active section
│   └── useReducedMotion.ts
├── lib/
│   ├── config.ts                      ← URL eksternal (chatbot, store, mincare)
│   └── placeholder-content.ts         ← teks dummy siap diganti
└── public/
    └── assets/
        ├── hero-castle.webp           ← ⭐ ilustrasi istana hero (konversi dari JPEG)
        ├── sword.svg                  ← ⭐ pedang SVG terpisah
        └── logo.svg                   ← (placeholder)
```

---

## 12. Developer Handoff Checklist

- [ ] Setiap section memiliki `id` anchor sesuai daftar di Seksi 5
- [ ] Navbar scroll spy aktif (`IntersectionObserver` threshold 0.45)
- [ ] Hero background `hero-castle.webp` terpasang dengan `priority` + `fill` + `alt=""`
- [ ] Overlay hero: `from-[#2C440C]/70 via-[#2C440C]/25 to-[#2C440C]/85`
- [ ] `useSwordScrollTrigger` mengontrol phase `hidden → appeared → animating`
- [ ] Sword TIDAK muncul pada initial load (phase default = `'hidden'`)
- [ ] Scroll pertama → phase `'appeared'` (sword fade-in, glow amber)
- [ ] Scroll ke-2+ → phase `'animating'` (gate panels slide; Framer Motion scroll progress)
- [ ] Reduced-motion: semua animasi hero fallback ke statis/opacity-only
- [ ] Drawer mobile: lock body scroll, Escape closes, focus returns
- [ ] Semua external link (Store, Angkasa Help, MinCare): `aria-label` eksplisit
- [ ] Semua CTA punya state: loading / disabled / error
- [ ] Gambar hero = WebP, priority; gambar lain = lazy-loaded dengan explicit width/height
- [ ] Modal/bottom sheet: lock scroll body, kembalikan focus saat ditutup
- [ ] Skeleton shimmer menggunakan `amber/15` accent
- [ ] Kontras warna semua text vs background lulus WCAG AA minimum

---

## 13. Designer Handoff Checklist

- [ ] Logo Astana Angkasa → SVG transparan (versi horizontal + vertikal + monochrome cream)
- [ ] Pedang → file SVG terpisah (path-level untuk animasi CSS/Framer); glow `amber`
- [ ] Background hero (hero-castle) sudah disediakan: `WhatsApp_Image_2026-06-25_at_23_33_25.jpeg`
      → Konversi ke WebP sebelum dipakai di produksi
- [ ] Panel gerbang kiri/kanan sebagai layer SVG/PNG transparan (curtain `forest-dark`)
- [ ] Semua component variants: default, hover, pressed, active, focus, disabled, loading, error
- [ ] Breakpoint: desktop (≥1280px), tablet (768–1279px), mobile (<768px)
- [ ] Figma component names konsisten dengan nama komponen di codebase
- [ ] Venn diagram Angkasa Care: siapkan versi mobile (2-card stack)
- [ ] Siapkan ilustrasi parallax (istana/gedung) untuk Section 3 — kiri dan kanan
- [ ] Semua warna yang digunakan hanya dari palette resmi (Seksi 3.2) — tidak ada warna di luar palette

---

*Dokumen ini bersifat living document. Perbarui setiap kali ada perubahan stack, token, atau flow interaksi. Sinkronkan selalu dengan PRD.md.*
