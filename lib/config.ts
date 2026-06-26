/**
 * TEVO — External URLs & Configuration
 * Update before go-live.
 */
export const CONFIG = {
  /** Angkasa Help chatbot URL */
  angkasaHelpUrl: "https://chatbot.ormawaeksekutifpku.com",

  /** MinCare / Adkesmah linktree or WA */
  minCareUrl: "https://linktr.ee/mincare_astana",

  /** Angkasa Store subdomain */
  storeUrl: "https://angkasastore.ormawaeksekutifpku.com",

  /** Narahubung */
  contact: {
    name: "Narahubung Kabinet",
    role: "Sekretaris Jenderal",
    phone: "+62812-XXXX-XXXX",
    email: "astanaangkasa@apps.ipb.ac.id",
  },

  /** Sekretariat */
  address: {
    line1: "Gedung Kemahasiswaan Lt. 2",
    line2: "IPB University, Kampus Dramaga",
    mapsUrl: "https://maps.google.com/?q=IPB+University",
  },

  /** Social Media */
  socials: {
    instagram: "https://instagram.com/astanaangkasa",
    youtube: null,
    tiktok: null,
  },
} as const;
