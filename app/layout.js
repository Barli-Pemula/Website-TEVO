import { Plus_Jakarta_Sans, Inter, Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Lacheyard from "next/font/local"

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900",],
  style: ["normal", "italic"],
  display: "swap",
})

const lacheyard = Lacheyard({
  src: "../assets/fonts/LacheyardScript.otf",
  variable: "--font-lacheyard",
  display: "swap",
})

export const metadata = {
  title: "Astana Angkasa — Kabinet Ormawa Eksekutif PKU IPB",
  description:
    "Website publik resmi Kabinet Astana Angkasa, Ormawa Eksekutif PKU IPB University periode 2025/2026. Menata Asa, Wujudkan Karya, Menjulang ke Angkasa.",
  keywords: [
    "Astana Angkasa",
    "Ormawa Eksekutif",
    "PKU IPB",
    "Kabinet",
    "IPB University",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${plusJakarta.variable} ${inter.variable} ${playfair.variable}`}
    >
      <head>
        {/* cdn icon google */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=arrow_outward" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Asimovian&family=Kapakana:wght@300;400&display=swap" />
      </head>
      <body className={`${montserrat.variable} ${lacheyard.variable} font-[family-name:var(--font-body)]`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
