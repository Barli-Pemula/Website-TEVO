# PRD — TEVO: Website Publik Kabinet Astana Angkasa

**Versi:** 2.0 (Sinkron dengan UI/UX Spec v4 — Color Palette Update)
**Organisasi:** Ormawa Eksekutif PKU IPB — Kabinet Astana Angkasa 2025/2026
**Domain:** `ormawaeksekutifpku.com`
**Tipe Dokumen:** Product Requirements Document
**Diperbarui:** Juni 2026

---

## Daftar Isi

1. [Latar Belakang & Tujuan](#1-latar-belakang--tujuan)
2. [Scope & Batasan](#2-scope--batasan)
3. [Arsitektur Halaman](#3-arsitektur-halaman)
4. [Foundation UI & Design System](#4-foundation-ui--design-system)
5. [Navbar](#5-navbar)
6. [Hero Section — Gates of Astana](#6-hero-section--gates-of-astana)
7. [Section 2 — Identity Launch](#7-section-2--identity-launch)
8. [Section 3 — Introduction, Vision & Mission](#8-section-3--introduction-vision--mission)
9. [Section 4 — Organization Structure Hub](#9-section-4--organization-structure-hub)
10. [Section 4b — Sub-Page Birdep](#10-section-4b--sub-page-birdep)
11. [Section 5 — Angkasa Care Hub](#11-section-5--angkasa-care-hub)
12. [Section 6 — Angkasa Store Preview](#12-section-6--angkasa-store-preview)
13. [Section 7 — Informasi & Update](#13-section-7--informasi--update)
14. [Global Footer](#14-global-footer)
15. [System States & Aksesibilitas](#15-system-states--aksesibilitas)
16. [Developer Handoff Checklist](#16-developer-handoff-checklist)
17. [Designer Handoff Checklist](#17-designer-handoff-checklist)
18. [Konten Placeholder — Perlu Dikunci Sebelum Go-Live](#18-konten-placeholder--perlu-dikunci-sebelum-go-live)

---

## 1. Latar Belakang & Tujuan

TEVO adalah website publik resmi Kabinet Astana Angkasa, organisasi kemahasiswaan eksekutif Program Khusus Undip (PKU) IPB University periode 2025/2026. Website ini berfungsi sebagai **wajah digital premium kabinet** kepada mahasiswa, civitas akademika, dan publik umum — setara kualitas company profile organisasi profesional.

### Tujuan Produk

| Tujuan | Deskripsi |
|--------|-----------|
| **First impression premium** | Menciptakan pengalaman pembuka yang berkesan melalui animasi gerbang dan hero bernuansa "memasuki Astana Angkasa". |
| **Informasi organisasi** | Menyampaikan identitas, visi/misi, struktur kabinet, dan profil unit secara mudah dipindai. |
| **Akses layanan** | Menghubungkan mahasiswa ke Angkasa Care (chatbot + MinCare), Angkasa Store (merchandise), dan informasi terbaru. |
| **Kesan organisatoris-premium** | Tampil formal, elegan, mudah dipindai, dan ringan di perangkat mobile. |

---

## 2. Scope & Batasan

### Dalam Scope (MVP)

- One-scroll homepage dengan 7 section utama
- Navbar desktop, tablet, dan mobile drawer
- Hero animasi gerbang + pedang (scroll-triggered)
- Sub-page: `/birdep/[slug]`, `/informasi/[slug]`
- Angkasa Care hub (Venn diagram)
- Store preview dengan CTA ke external subdomain
- News & update section dengan data statis/API

### Di Luar Scope MVP

- Sub-page `/profile` (jika tidak dibuat, menu scroll ke `#profile`)
- Halaman login/admin
- E-commerce penuh (dikelola di subdomain Angkasa Store)
- Chatbot Angkasa Help (external service, hanya di-link)

---

## 3. Arsitektur Halaman

### Homepage — One-Scroll Architecture

```
/ (homepage)
│
├─── [Navbar sticky]
│
├─── #beranda       → Section 1: Hero Gates of Astana
├─── #identity      → Section 2: Identity Launch
├─── #profile       → Section 3: Introduction + Vision & Mission
├─── #struktur      → Section 4: Organization Structure Hub
├─── #angkasa-care  → Section 5: Angkasa Care Hub
├─── #store         → Section 6: Angkasa Store Preview
├─── #informasi     → Section 7: Informasi & Update
│
└─── #footer        → Global Footer
```

### Sub-Routes

| Route | Keterangan |
|-------|------------|
| `/birdep/[slug]` | Detail Biro/Departemen: profil unit, program, anggota |
| `/informasi/[slug]` | Detail berita/update |
| `external: store subdomain` | E-commerce Angkasa Store (domain terpisah) |
| `external: chatbot URL` | Angkasa Help (dikunci saat IA final) |
| `external: linktree MinCare` | Kanal advokasi/kesejahteraan mahasiswa |

---

## 4. Foundation UI & Design System

### 4.1 Design Philosophy — Clean & Elegant Company Profile

TEVO adalah **company profile premium**, bukan website organisasi biasa. Setiap keputusan visual harus terasa terarah, tenang, dan berwibawa. Gunakan white space secara agresif. Hindari dekorasi berlebih. Biarkan tipografi dan warna berbicara sendiri.

**Prinsip inti:** Jika sebuah elemen visual tidak menyampaikan informasi atau memperkuat identitas, hapus.

### 4.2 Color Palette (Final)

| Token | Hex | Nama | Fungsi Utama |
|-------|-----|------|--------------|
| `crimson` | `#A83931` | Crimson Red | CTA primer, active state, aksen berani |
| `forest-dark` | `#2C440C` | Forest Dark | Hero/footer background, heading berat |
| `gold-warm` | `#D4A678` | Champagne Gold | Divider, ornamen, badge, focus ring |
| `sky-vivid` | `#03ABF6` | Electric Sky | Link hover, highlight interaktif |
| `sage-mid` | `#9AAC69` | Sage Green | Badge Care, tag kategori |
| `sky-pale` | `#93D4E8` | Pale Sky | Card bg sekunder, panel info ringan |
| `cream-soft` | `#FEF8BC` | Buttercream | Card Visi/Misi, teks di atas bg gelap |
| `bark` | `#614C3B` | Warm Brown | Caption, label, teks sekunder |
| `amber` | `#F9D253` | Amber | Badge highlight, ornamen aktif, glow pedang |
| `smoke` | `#F5F4F0` | Off-white | Background section netral |
| `ink` | `#1A1A1A` | Near Black | Teks utama |

**Color Pairing yang Direkomendasikan:**

```
Hero / Footer:       forest-dark bg  + cream-soft text  + gold-warm ornament
CTA Primer:          crimson bg      + white text        + shadow-crimson
Card (light):        smoke bg        + ink text          + gold-warm border
Card (contrast):     cream-soft bg   + bark text         + amber accent
Active Navbar Pill:  crimson bg      + white text
Focus Ring:          2px solid gold-warm, offset 2px
Section Divider:     gold-warm, 1px, opacity 40%
Highlight / Link:    sky-vivid (dark bg) / crimson (light bg)
Care Badge:          sage-mid bg     + forest-dark text
News Category Tag:   sky-pale bg     + forest-dark text
```

### 4.3 Tipografi

| Peran | Font | Weight | Keterangan |
|-------|------|--------|------------|
| **Display Heading** | Plus Jakarta Sans / Poppins | ExtraBold (800) | Hero headline, section title |
| **Body Text** | Inter / Plus Jakarta Sans | Regular–SemiBold (400–600) | Konten, deskripsi |
| **Editorial Accent** | Playfair Display / Merriweather | Regular | Kutipan Visi/Misi, slogan |

**Type Scale (Desktop):**
- H1 (Hero): 72–96px, ExtraBold, letter-spacing -0.02em, line-height 1.1
- H2 (Section): 40–52px, ExtraBold
- H3 (Sub): 24–28px, Bold
- Body: 16–18px, Regular
- Caption: 13–14px, Medium, warna `bark`

### 4.4 State Visual Global (Wajib di Semua Komponen)

| State | Visual | Timing |
|-------|--------|--------|
| Default | Warna dasar, shadow tipis | 200ms ease-out |
| Hover | translateY(-2–3px), shadow naik | 180–250ms; desktop/tablet only |
| Pressed/Tap | Opacity 85–90%, scale 0.98 | 80–120ms; penting mobile |
| Active | bg `crimson` solid, teks putih | IntersectionObserver |
| Focus | Outline 2px `gold-warm`, offset 2px | WAJIB; tidak boleh dihapus |
| Disabled | Opacity 45%, cursor not-allowed | Touch target tetap terjaga |
| Loading | Skeleton shimmer accent `amber/15` | Max 1–2 detik |
| Error | Panel merah lembut + CTA "Coba Lagi" | Recovery path wajib ada |

### 4.5 Panduan Animasi

- Scroll-reveal: `fade-in + translateY(16px → 0)`, stagger 60ms, duration 400ms ease-out
- Hover card: `shadow-lift + translateY(-3px)`, 200ms
- CTA hover: `translateY(-2px) + shadow-crimson`, 180ms
- Animasi besar (hero gate + pedang): hanya setelah user scroll
- `prefers-reduced-motion`: semua animasi fallback ke opacity-only

---

## 5. Navbar

### 5.1 Desktop & Tablet

**Elemen:**
- Logo Astana Angkasa (kiri) — hit area minimum 44×44px; click → scroll ke `#beranda`
  - Versi cream/putih saat di atas hero; versi gelap saat background terang
- Menu: **Beranda · Profile · Angkasa Care · Angkasa Store · Informasi**
- Active pill: `bg-crimson text-white rounded-full shadow-crimson`
- Sticky/fixed di atas

**Behavior Scroll:**
- Saat posisi di hero: background transparan gelap, teks cream/putih
- Setelah scroll melewati hero: background `forest-dark` + blur (transisi 250ms)
- Scroll spy aktif via `IntersectionObserver` threshold 0.45

**Interaksi:**

| Trigger | Visual | Sistem |
|---------|--------|--------|
| Hover menu | Pill transparan, teks lebih tebal | Padding penuh sebagai area hover |
| Click menu | Scale 0.98 → smooth scroll ke section | Durasi 650–900ms |
| Active scroll | Pill `crimson` solid; menu lain default | Observer threshold 0.45 |
| External CTA Store | Icon external-link kecil setelah teks | `aria-label: "Buka Angkasa Store"` |

**Responsivitas:**
- Tablet: font 13–14px, jarak antar menu dikurangi
- < 900px: sembunyikan menu tengah, tampilkan hamburger
- `scroll-margin-top` pada setiap section = tinggi navbar + 8px

### 5.2 Mobile Navigation — Hamburger Drawer

**Elemen:**
- Hamburger icon kanan atas → buka drawer → berubah jadi ikon X
- Drawer: full-height, 85% width dari kanan, background `forest-dark`
- Teks menu: `cream-soft`, active: `amber` atau `crimson`
- Overlay: backdrop `forest-dark/50`, tap overlay = tutup drawer
- Menu item: min-height 48px, active state tetap kontras
- Footer drawer: copyright atau CTA kecil ke Store

**Interaksi:**

| Trigger | Visual | Timing |
|---------|--------|--------|
| Tap hamburger | Icon morph ke X; drawer slide dari kanan | 300ms ease-out |
| Tap menu item | Pressed → close drawer → scroll ke section | 200ms + 650ms scroll |
| Tap overlay | Drawer close, overlay fade | 250ms |
| Escape key | Drawer close; focus kembali ke hamburger | Immediate |
| Active item | Teks `amber`, indikator garis kiri `crimson` | — |

---

## 6. Hero Section — Gates of Astana

**Anchor:** `#beranda`

### Elemen

| Elemen | Spesifikasi |
|--------|-------------|
| Background | `hero-castle.webp` — full-width, full-height, object-cover |
| Overlay | Gradient `forest-dark/70 → /25 → /85` arah vertikal |
| Gate Panels | Layer SVG/PNG kiri-kanan; slide keluar saat scroll ke-2+ |
| Sword SVG | Tersembunyi saat initial load; muncul saat scroll ke-1 |
| Headline | font-display ExtraBold, 72–96px desktop; `cream-soft` / `white` |
| Sub-headline | font-body SemiBold 18–20px, `cream-soft/80` |
| CTA | "Masuki Astana" / "Jelajahi Kabinet" → scroll ke `#identity` |
| Scroll Cue | Panah ↓ bounce infinite, warna `gold-warm` |

### Animasi Scroll-Triggered (Pedang & Gerbang)

| Fase | Trigger | Visual |
|------|---------|--------|
| `hidden` | Initial load | Sword opacity 0, scale 0.75 |
| `appeared` | Scroll ke-1 | Sword fade-in 600ms, glow `amber/30` |
| `animating` | Scroll ke-2+ | Gate panels slide; sword brightness naik; Framer Motion scroll progress |

**Warna glow pedang:** `amber` (#F9D253) sebagai fill/glow, outline tipis `gold-warm`.

### Interaksi

| Trigger | Visual | Timing |
|---------|--------|--------|
| Hover CTA | translateY(-2px), shadow-crimson | 180ms |
| Click CTA | Scale 0.98 → smooth scroll ke #identity | 650ms |
| Scroll pertama | Sword fade-in, gate mulai aktif | 600ms ease-out |
| Scroll lanjut | Gate panels terbelah; sword brightness naik | Framer scroll progress |

---

## 7. Section 2 — Identity Launch

**Anchor:** `#identity`

**Background:** `smoke` (#F5F4F0)

### Elemen

| Elemen | Spesifikasi |
|--------|-------------|
| Logo | Astana Angkasa — center atau split kiri-logo / kanan-slogan |
| Nama | "Astana Angkasa" — font-display ExtraBold, warna `forest-dark` |
| Slogan | font-editorial italic, warna `bark` |
| Ornamen | Garis horizontal `gold-warm` di atas dan bawah nama |

**Animasi reveal:** fade-in + scale 0.96→1, stagger 80ms per baris

---

## 8. Section 3 — Introduction, Vision & Mission

**Anchor:** `#profile`

**Background:** bergantian `smoke` dan `white` per subsection

### Elemen

| Elemen | Spesifikasi |
|--------|-------------|
| 3 Info Card | Selayang Pandang, Peran Ormawa, Pengertian Kabinet |
| Card Style | `white` bg, border `gold-warm/30`, radius `10px`, `shadow-card` |
| Visi Card | `cream-soft` bg, `forest-dark` text, ornamen `gold-warm` |
| Misi Card | `smoke` bg, `ink` text, list bullet `crimson` |
| Layout | Asimetris desktop; card stack full-width mobile |
| Divider | Garis ornamen `gold-warm`, 1px, opacity 40% |
| Ilustrasi | Gedung/istana parallax layer kiri-kanan (mobile: bg statis low-opacity) |

---

## 9. Section 4 — Organization Structure Hub

**Anchor:** `#struktur`

**Background:** `forest-dark` atau gradient `forest-dark → #1a2a06`

### Elemen

| Elemen | Spesifikasi |
|--------|-------------|
| Section Header | Teks `cream-soft`, ornamen `gold-warm` |
| Tree Diagram | Root (Kabinet) → BPH → Biro/Dept |
| Connector Line | `gold-warm/50` |
| Node Card | `bark` bg + `cream-soft` text; hover: border `crimson` 2px |
| Click | Route ke `/birdep/[slug]` |
| Mobile Fallback | Vertical card list bertingkat |

**Interaksi:**

| Trigger | Visual | Timing |
|---------|--------|--------|
| Hover node | Border `crimson` muncul; card naik 2px | 200ms |
| Click node | Pressed → navigate ke `/birdep/[slug]` | — |
| Mobile expand | Tap untuk expand sub-node | 250ms accordion |

---

## 10. Section 4b — Sub-Page Birdep

**Route:** `/birdep/[slug]`

### Elemen

| Elemen | Spesifikasi |
|--------|-------------|
| Hero Unit | `forest-dark` bg + ornamen `gold-warm` |
| Deskripsi | `smoke` section, card `white` |
| Tupoksi | List item dengan marker `crimson` |
| Member Carousel | Card `white`; hover zoom 1.05; overlay nama `forest-dark/70` |
| Modal | Click member → modal/bottom sheet |

**Data States:**

| State | UI |
|-------|----|
| Loading | Skeleton shimmer `amber/15` |
| Empty | Pesan informatif, ilustrasi kosong |
| Error | Panel + CTA "Coba Lagi" |

---

## 11. Section 5 — Angkasa Care Hub

**Anchor:** `#angkasa-care`

**Background:** `white` atau `smoke`

### Elemen

| Elemen | Spesifikasi |
|--------|-------------|
| Section Header | font-display, warna `forest-dark`, ornamen `gold-warm` |
| Venn Diagram | Angkasa Help (crimson/15 fill) + MinCare (gold-warm/20 fill) = irisan sage-mid |
| Care Badge | `sage-mid` bg + `forest-dark` text |
| CTA Chatbot | bg `crimson`, text white |
| CTA MinCare | outline `gold-warm`, text `forest-dark` |

**Mobile Fallback:**
- Card Angkasa Help: `sky-pale` bg + `crimson` icon
- Card MinCare: `cream-soft` bg + `gold-warm` icon
- Badge "Angkasa Care" di antara dua card

**Interaksi:**

| Trigger | Visual | Timing |
|---------|--------|--------|
| Hover Venn lingkaran | Lingkaran brighten; label muncul | 200ms |
| Click "Mulai Chatbot" | Pressed → external chatbot URL | — |
| Click "Hubungi MinCare" | Pressed → linktree/WA | — |
| Chatbot unavailable | Maintenance card `amber` bg | — |

---

## 12. Section 6 — Angkasa Store Preview

**Anchor:** `#store`

**Background:** `smoke`

### Elemen

| Elemen | Spesifikasi |
|--------|-------------|
| Section Header | font-display, warna `forest-dark`, ornamen `gold-warm` |
| Product Grid | 4–8 card; radius besar; `shadow-card`; hover `shadow-lift` |
| Price Badge | `amber` bg + `forest-dark` text |
| CTA | "Kunjungi Angkasa Store" — bg `crimson`, icon external-link |

**Interaksi:**

| Trigger | Visual | Timing |
|---------|--------|--------|
| Hover card | translateY(-3px), shadow-lift | 200ms |
| Click card | MVP: langsung external store | — |
| Hover CTA | translateY(-2px), shadow-crimson, icon geser 3px | 180ms |
| Click CTA | Pressed → buka subdomain store | — |
| Carousel swipe | Snap ke card terdekat | scroll-snap |

**Data States:**

| State | UI |
|-------|----|
| Loading | Skeleton card, rasio gambar tetap |
| No product | "Katalog Angkasa Store akan segera hadir." + CTA coming soon |
| Error | Toast: "Store belum dapat dibuka. Coba lagi beberapa saat." |

**Analytics events:** `store_cta_click`, `product_card_click`, `product_swipe`

**Mobile:** Horizontal swipe carousel, scroll-snap; CTA full-width di bawah.

---

## 13. Section 7 — Informasi & Update

**Anchor:** `#informasi`

**Background:** `forest-dark` (gelap untuk kontras dengan card terang)

### Elemen

| Elemen | Spesifikasi |
|--------|-------------|
| Section Header | Teks `cream-soft`, ornamen `gold-warm` |
| News Card | `white` bg; cover image; tanggal `bark`; kategori tag `sky-pale` bg; judul `ink`; excerpt `bark`; tombol "Selengkapnya" `crimson` |
| Featured Card | Border `gold-warm` 2px; `shadow-lift`; lebih besar dari card biasa |
| Carousel Nav | Arrow kiri/kanan + pagination dots |

**Interaksi:**

| Trigger | Visual | Timing |
|---------|--------|--------|
| Default | Featured card di tengah; card samping redup | Auto-play 5–7 detik |
| Hover card | Image zoom 1.03; judul jadi `crimson`; tombol lebih terang | Desktop only |
| Click "Selengkapnya" | Pressed → `/informasi/[slug]` | — |
| Drag/swipe | Snap ke card terdekat; indicator update | touch-action: pan-y |
| Arrow next/prev | Hover aktif; disabled opacity 40% | Mobile: kecil/hidden |
| Dot pagination | Dot aktif membesar / solid `crimson` | Target min 32–40px mobile |

**Data States:**

| State | UI |
|-------|----|
| Loading | Skeleton carousel 2–3 card, shimmer `amber/15` |
| Empty | "Belum ada informasi terbaru." + tombol cek kembali |
| Error | Panel error + CTA "Muat ulang informasi" |

**Mobile:** One-card-per-view, swipe horizontal; excerpt 2 baris; tombol "Selengkapnya" terlihat tanpa hover.

---

## 14. Global Footer

**Anchor:** `#footer`

**Background:** `forest-dark`

### Elemen

| Elemen | Spesifikasi |
|--------|-------------|
| Logo | Astana Angkasa — versi cream/putih |
| Kontak | Narahubung: nama, jabatan, nomor/email (placeholder); warna `sky-pale` untuk link |
| Alamat | Alamat fisik sekretariat (placeholder) |
| Quick Links | Beranda · Profile · Angkasa Care · Angkasa Store · Informasi |
| Garis Pemisah | `gold-warm/20` antar kolom |
| Social Media | Icon/link jika tersedia |
| Copyright | © 2026 Astana Angkasa / Ormawa Eksekutif PKU IPB — warna `cream-soft/50` |
| Back to Top | Icon `amber`, smooth scroll ke `#beranda` |

**Interaksi:**

| Trigger | Visual | Timing |
|---------|--------|--------|
| Hover link | Teks `gold-warm`; underline animasi dari kiri | Desktop only, 200ms |
| Click phone/WA | Pressed → `tel:` atau `wa.me` URI | — |
| Click address | Buka Google Maps / toast "Alamat disalin" | — |
| Back to top | translateY(-2px) hover → smooth scroll | 650ms |

**Mobile:** Stack vertikal logo → kontak → alamat → link → copyright; min tinggi elemen 44–48px.

---

## 15. System States & Aksesibilitas

### System States

| State | Standar |
|-------|---------|
| Loading | Skeleton sesuai konteks; shimmer accent `amber/15`; max 1–2 detik |
| Empty | Informatif, tidak menyalahkan user; beri konteks ketersediaan |
| Error | Pesan ramah + action: Coba Lagi / Kembali / Hubungi Admin |
| Offline/Slow | Lazy-load media berat; low-res placeholder; jangan blokir homepage |

### Aksesibilitas

| Aspek | Kriteria |
|-------|---------|
| Heading structure | Satu `<h1>` per halaman (hero headline); `<h2>` per section; `<h3>` sub-komponen |
| Alt text | Informatif: alt deskriptif (Bahasa Indonesia); dekoratif: `alt=""` |
| Keyboard navigation | Semua CTA, card, drawer, carousel, modal — keyboard accessible |
| Focus visible | Focus ring 2px `gold-warm`, offset 2px — tidak boleh dihapus |
| Contrast | WCAG AA minimum: `cream-soft` di atas `forest-dark` ✓; `white` di atas `crimson` ✓ |
| Motion | `prefers-reduced-motion`: matikan parallax, animasi pedang, carousel auto-play |
| Touch target | Minimum 44×44px; ideal 48px tinggi untuk mobile |

---

## 16. Developer Handoff Checklist

- [ ] Setiap section memiliki `id` anchor: `beranda`, `identity`, `profile`, `struktur`, `angkasa-care`, `store`, `informasi`, `footer`
- [ ] Navbar scroll spy aktif; route hash tidak mengganggu browser history
- [ ] **Hero background:** `hero-castle.webp` dipasang sebagai `<Image fill priority sizes="100vw" alt="" />`
- [ ] **Hero overlay:** `from-[#2C440C]/70 via-[#2C440C]/25 to-[#2C440C]/85`
- [ ] **Sword phase `hidden`:** Pedang tidak muncul saat initial load (`opacity: 0`, `scale: 0.75`)
- [ ] **Scroll ke-1 → phase `appeared`:** Sword fade-in 600ms, glow `amber/30`
- [ ] **Scroll ke-2+ → phase `animating`:** Gate panels slide; Framer Motion scroll progress aktif
- [ ] `useSwordScrollTrigger` hook terpasang dan hanya listen scroll satu kali untuk fase `appeared`
- [ ] Reduced-motion: semua animasi hero fallback ke opacity-only
- [ ] Drawer mobile: lock body scroll, Escape menutup, focus kembali ke hamburger
- [ ] External link (Store, Angkasa Help, MinCare): `aria-label` eksplisit
- [ ] Semua CTA punya state: loading / disabled / error
- [ ] Hero image: WebP, `priority`; semua gambar lain: `loading="lazy"`, explicit `width` + `height`
- [ ] Modal/bottom sheet: lock scroll body; kembalikan focus saat ditutup
- [ ] Carousel Store dan News: `scroll-snap` native atau library ringan
- [ ] Skeleton shimmer menggunakan `amber/15` sebagai accent
- [ ] Kontras semua teks vs background lulus WCAG AA minimum
- [ ] Color tokens di `globals.css @theme` sudah menggunakan palette final (bukan dummy)

---

## 17. Designer Handoff Checklist

- [ ] Logo Astana Angkasa → SVG transparan (versi horizontal + vertikal + monochrome cream)
- [ ] Pedang → file SVG terpisah (path-level); glow `amber` (#F9D253)
- [ ] **Background hero** sudah ada: `WhatsApp_Image_2026-06-25_at_23_33_25.jpeg` → konversi ke WebP
- [ ] Panel gerbang kiri/kanan → layer SVG/PNG transparan (curtain `forest-dark`)
- [ ] Semua komponen punya variant: default, hover, pressed, active, focus, disabled, loading, error
- [ ] Breakpoint: desktop (≥1280px), tablet (768–1279px), mobile (<768px)
- [ ] Figma component names konsisten dengan nama file di codebase
- [ ] Card template News dan Store mencakup skenario long-title dan empty-state
- [ ] Venn diagram Angkasa Care: siapkan versi mobile (2-card stack + badge)
- [ ] Ilustrasi parallax Section 3 (kiri dan kanan)
- [ ] Semua warna hanya dari palette resmi — tidak ada warna di luar 11 token yang ditetapkan

---

## 18. Konten Placeholder — Perlu Dikunci Sebelum Go-Live

| Item | Status | Keterangan |
|------|--------|------------|
| Logo resmi Astana Angkasa | ⏳ Belum final | SVG/PNG transparan |
| Slogan kabinet | ⏳ Belum final | Versi horizontal dan vertikal |
| Naskah Selayang Pandang | ⏳ Belum final | Disiapkan oleh tim konten |
| Filosofi & makna nama kabinet | ⏳ Belum final | — |
| Visi resmi | ⏳ Belum final | — |
| Misi resmi | ⏳ Belum final | — |
| Daftar BPH / Biro / Departemen | ⏳ Belum tersedia | Kunci struktur organisasi resmi |
| Data anggota per unit | ⏳ Belum tersedia | Foto, nama, jabatan |
| URL Angkasa Help chatbot | ⏳ Belum final | Simpan di `lib/config.ts` |
| URL MinCare / linktree Adkesmah | ⏳ Belum final | Simpan di `lib/config.ts` |
| Subdomain Angkasa Store | ⏳ Belum final | Simpan di `lib/config.ts` |
| Endpoint data (news, store, struktur) | ⏳ Belum final | Kunci sebelum integrasi |
| Narahubung formal (nama, jabatan, kontak) | ⏳ Belum final | Untuk footer |
| Alamat sekretariat / venue | ⏳ Belum final | Untuk footer + Google Maps link |
| Warna brand | ✅ **FINAL** | Palette baru aktif di `globals.css @theme` |
| Sosial media links | ⏳ Belum final | Jika tersedia |

---

*Dokumen ini hidup dan akan diperbarui mengikuti keputusan tim konten, desainer, dan pengembang. Setiap perubahan signifikan dinomori sebagai versi baru (v2.1, v2.2, dst.).*

*Sinkronkan dengan SKILL.md setiap kali ada perubahan stack, token warna, atau flow interaksi.*
