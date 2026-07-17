import HeroSection from "../components/hero/HeroSection";
import IdentitySection from "../components/sections/IdentitySection";
import ProfileSection from "../components/sections/ProfileSection";
import StructureHub from "../components/sections/StructureHub";
import AngkasaCareHub from "../components/sections/AngkasaCareHub";
import StorePreview from "../components/sections/AngkasaStorePreview";
import NewsCarousel from "../components/sections/NewsCarousel";
import Proker from "../components/sections/Proker";

/**
 * TEVO — One-Scroll Homepage
 * Kabinet Astana Angkasa — Company Profile Premium
 *
 * Anchor IDs:
 *   #beranda      → Hero (Section 1)
 *   #identity     → Identity Launch (Section 2)
 *   #profile      → Introduction + Vision & Mission (Section 3)
 *   #struktur     → Organization Structure Hub (Section 4)
 *   #angkasa-care → Angkasa Care Hub (Section 5)
 *   #store        → Angkasa Store Preview (Section 6)
 *   #informasi    → Informasi & Update (Section 7)
 */
export default function Home() {
  return (
    <>
      {/* Section 1: Hero — Gates of Astana */}
      <HeroSection />

      {/* Section 2: Identity Launch */}
      {/* <IdentitySection /> */}

      {/* Section 3: Introduction, Vision & Mission */}
      <ProfileSection />

      {/* Section 4: Organization Structure Hub */}
      <StructureHub />

      {/* Section 5: Angkasa Care Hub */}
      <AngkasaCareHub />

      {/* section 6: preview proker adkes, ekraf, dan ristek */}
      <Proker />
      {/* Section 7: Informasi & Update */}
      <NewsCarousel />
    </>
  );
}
