/**
 * TEVO — Placeholder Content
 * Semua teks di file ini WAJIB diganti sebelum go-live.
 */

import { body } from "framer-motion/client";
import { title } from "node:process";

export const PLACEHOLDER = {
  /** Hero headline & sub */
  hero: {
    headline: "Astana Angkasa",
    subheadline: "Kabinet Ormawa Eksekutif PKU IPB 2025/2026",
    cta: "Masuki Astana",
  },

  /** Identity Launch — Section 2 */
  identity: {
    name: "Astana Angkasa",
    slogan: "Menata Asa, Wujudkan Karya, Menjulang ke Angkasa",
  },

  /** Introduction — Section 3 */
  intro: {
    ormawaEkse: {
      title: "Ormawa Eksekutif PKU IPB",
      body: "Ormawa Eksekutif PKU IPB merupakan organisasi kemahasiswaan di lingkup Pendidikan Kompetensi Umum yang dikhususkan untuk mahasiswa tingkat PKU IPB. Fungsinya melibatkan pemberian kesejahteraan penanganan segala problematika yang dialami mahasiswa PKU IPB."
    },
    peranOrmawa: {
      title: "Peran Ormawa Eksekutif PKU IPB",
      body: "Perannya sangat signifikan dalam kehidupan kampus mahasiswa PKU, dengan pergerakan, pengembangan, pelayanan, dan pengabdian. Dengan demikian, organisasi ini bukan hanya berfungsi sebagai penanganan masalah, tetapi juga sebagai penggerak pengembangan dan kesejahteraan mahasiswa PKU IPB melalui berbagai kegiatan dan prgrgam yang dijalankan.",
    },
    pengertianKabinet: {
      title: "Pengertian Kabinet",
      body: "Kabinet Astana Angkasa terdiri dari Badan Pengurus Harian (BPH), Biro, dan Departemen yang bekerja secara kolektif-kolegial menjalankan program kerja selama satu periode kepengurusan.",
    },
    astana: {
      title: "Astana",
      body: "Astana dimaknai sebagai sebuah istana, rumah besar yang kokoh secara fondasi, terstruktur dalam tata kelola, dan berdiri atas sistem yang saling menopang. la merepresentasikan tatanan, keteraturan, dan kekuatan kolektif yang menjadi pijakan setiap langkah.",
    },
    angkasa: {
      title: "Angkasa",
      body: "Angkasa melambangkan ruang luas untuk bertumbuh, melampaui batas, dan menatap masa depan dengan visi yang lebih jauh. Sebuah simbol keberanian untuk bermimpi tinggi dan menjadikan cita-cita sebagai arah perjuangan.",
    },
    astanaAngkasa:{
      barisSatu: "Kabinet Astana Angkasa hadir sebagai ruang bersama bagi seluruh elemen Senapati, Ksatria, dan Laksana untuk membangun organisasi yang solid, adaptif, dan terus berkembang, tanpa melupakan pijakan yang telah dibentuk sebelumnya.",
      barisDua: "Astana Angkasa merepresentasikan sebuah organisasi yang memiliki sistem internal solid, tertata, dan kuat (Astana), namun tetap bergerak dengan keberanian, adaptabilitas, serta visi yang luas dan tinggi untuk berkembang tanpa batas (Angkasa).",
    },
    visi: "Mewujudkan Ormawa Eksekutif PKU IPB sebagai organisasi yang unggul, profesional, dan berintegritas dalam membangun sinergi mahasiswa yang progresif serta berdampak nyata bagi masyarakat.",
    misi: [
      "Memperkuat sinergi dan solidaritas antar elemen mahasiswa PKU IPB",
      "Menyelenggarakan program kerja inovatif yang responsif terhadap kebutuhan mahasiswa",
      "Membangun budaya organisasi yang profesional, transparan, dan akuntabel",
      "Mengembangkan potensi kepemimpinan dan kreativitas seluruh anggota kabinet",
      "Menjalin kolaborasi strategis dengan pihak internal dan eksternal kampus",
    ],
  },

  /** Organization Structure — Section 4 */
  struktur: {
    sectionTitle: "Struktur Organisasi",
    sectionSub: "Bagan hierarki kabinet — klik setiap unit untuk informasi detail",
    bph: {
      slug: "bph",
      name: "Badan Pengurus Harian",
      shortName: "BPH",
      logo: "/assets/logoBirdept/bph.png",
    },
    biro: [
      { slug: "biro-internal", name: "Biro Internal", shortName: "Biro Internal", logo: "/assets/logoBirdept/internal.png" },
      { slug: "biro-ristek", name: "Biro Riset & Teknologi", shortName: "Biro Ristek", logo: "/assets/logoBirdept/ristek.png" },
      { slug: "biro-komit", name: "Biro Kolaborasi & Kemitraan", shortName: "Biro Komit", logo: "/assets/logoBirdept/komit.png" },
      { slug: "biro-medbrand", name: "Biro Media & Branding", shortName: "Biro Medbrand", logo: "/assets/logoBirdept/medbrand.png" },
    ],
    departemen: [
      { slug: "dept-adkesmah", name: "Departemen Advokasi & Kesejahteraan Mahasiswa", shortName: "Dept. Adkesmah", logo: "/assets/logoBirdept/adkesmah.png" },
      { slug: "dept-psdm", name: "Departemen Pengembangan Sumber Daya Mahasiswa", shortName: "Dept. PSDM", logo: "/assets/logoBirdept/psdm.png" },
      { slug: "dept-akpres", name: "Departemen Akademik & Prestasi", shortName: "Dept. Akpres", logo: "/assets/logoBirdept/akpres.png" },
      { slug: "dept-slh", name: "Departemen Sosial & Lingkungan Hidup", shortName: "Dept. SLH", logo: "/assets/logoBirdept/slh.png" },
      { slug: "dept-senbud", name: "Departemen Seni & Budaya", shortName: "Dept. Senbud", logo: "/assets/logoBirdept/senbud.png" },
      { slug: "dept-peraga", name: "Departemen Pemuda & Olahraga", shortName: "Dept. Peraga", logo: "/assets/logoBirdept/peraga.png" },
      { slug: "dept-kastrat", name: "Departemen Kajian & Aksi Strategis", shortName: "Dept. Kastrat", logo: "/assets/logoBirdept/kastrat.png" },
      { slug: "dept-ekraf", name: "Departemen Ekonomi Kreatif", shortName: "Dept. Ekraf", logo: "/assets/logoBirdept/ekraf.png" },
    ],
  },

  /** Angkasa Care — Section 5 */
  care: {
    title: "Angkasa Care",
    subtitle: "Layanan terpadu untuk mahasiswa PKU IPB",
    angkasaHelp: {
      name: "Angkasa Help",
      description: "Chatbot asisten virtual yang siap membantu menjawab pertanyaan seputar akademik, organisasi, dan layanan kampus kapan saja.",
      cta: "Mulai Chatbot",
    },
    minCare: {
      name: "MinCare",
      description: "Kanal advokasi dan kesejahteraan mahasiswa. Laporkan kendala, sampaikan aspirasi, atau dapatkan pendampingan melalui tim Adkesmah.",
      cta: "Hubungi MinCare",
    },
  },

  /** Store — Section 6 */
  store: {
    title: "Angkasa Store",
    subtitle: "Merchandise resmi Kabinet Astana Angkasa",
    cta: "Kunjungi Angkasa Store",
    products: [
      { name: "Hoodie Astana", price: "Rp 185.000", image: null },
      { name: "T-Shirt Logo", price: "Rp 95.000", image: null },
      { name: "Tote Bag", price: "Rp 65.000", image: null },
      { name: "Sticker Pack", price: "Rp 25.000", image: null },
      { name: "Lanyard", price: "Rp 35.000", image: null },
      { name: "Notebook", price: "Rp 45.000", image: null },
    ],
  },

  /** News — Section 7 */
  news: {
    title: "Informasi & Update",
    subtitle: "Kabar terbaru dari Kabinet Astana Angkasa",
    articles: [
      {
        slug: "pelantikan-kabinet-2025",
        title: "Pelantikan Kabinet Astana Angkasa 2025/2026",
        excerpt: "Prosesi pelantikan dan serah terima jabatan kabinet baru telah dilaksanakan secara khidmat di Aula Gedung Bersama.",
        date: "12 Januari 2025",
        category: "Organisasi",
        featured: true,
      },
      {
        slug: "raker-2025",
        title: "Rapat Kerja Kabinet: Menyusun Program Strategis",
        excerpt: "Seluruh BPH, Biro, dan Departemen mengikuti rapat kerja untuk merancang program prioritas satu periode ke depan.",
        date: "25 Januari 2025",
        category: "Organisasi",
        featured: false,
      },
      {
        slug: "safari-ramadhan",
        title: "Safari Ramadhan: Berbagi Bersama Masyarakat",
        excerpt: "Rangkaian kegiatan sosial selama bulan Ramadhan meliputi bakti sosial, buka bersama, dan santunan anak yatim.",
        date: "15 Maret 2025",
        category: "Sosial",
        featured: true,
      },
      {
        slug: "workshop-kepemimpinan",
        title: "Workshop Kepemimpinan: Mencetak Pemimpin Masa Depan",
        excerpt: "Workshop dua hari yang menghadirkan pembicara inspiratif dari berbagai latar belakang profesional.",
        date: "5 April 2025",
        category: "Pengembangan",
        featured: false,
      },
    ],
  },

  /** Footer */
  footer: {
    copyright: "© 2026 Kabinet Astana Angkasa — Ormawa Eksekutif PKU IPB",
    quickLinks: [
      { label: "Beranda", href: "#beranda" },
      { label: "Profile", href: "#profile" },
      { label: "Angkasa Care", href: "#angkasa-care" },
      { label: "Angkasa Store", href: "#store" },
      { label: "Informasi", href: "#informasi" },
    ],
  },
} as const;
