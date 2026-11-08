/**
 * Global site configuration. Contact channels are read from public env vars so
 * nothing fictional is rendered: when a value is missing, the UI shows a
 * neutral "yakında" (coming soon) state instead of an invented address.
 */

export const site = {
  name: "OPEN MEDIA",
  shortName: "Open Media",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  locale: "tr_TR",
  tagline: "AI-Powered Creative & Digital Growth Studio",
  slogan: { en: "Better Content. Better Sales.", tr: "Daha iyi içerik. Daha güçlü satış." },
  description:
    "Open Media; yapay zekâ destekli ürün görselleri, reklam kreatifleri ve sosyal medya içerikleriyle işletmelerin ürünlerini dijitalde daha iyi sunmasına yardımcı olan yaratıcı stüdyodur.",
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || null,
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || null,
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || null,
  },
} as const;

export const mainNav = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/services", label: "Hizmetler" },
  { href: "/work", label: "Çalışmalarımız" },
  { href: "/about", label: "Hakkımızda" },
] as const;
