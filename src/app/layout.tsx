import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PageLoader } from "@/components/layout/page-loader";
import { MotionProvider } from "@/components/motion/motion-provider";
import { site } from "@/data/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Open Media — Yapay Zekâ Destekli Yaratıcı Stüdyo",
    template: "%s — Open Media",
  },
  description: site.description,
  applicationName: "Open Media",
  keywords: [
    "AI ürün görselleri",
    "yapay zeka ürün fotoğrafı",
    "reklam kreatifi",
    "sosyal medya içerik",
    "Trendyol ürün görseli",
    "Hepsiburada ürün görseli",
    "e-ticaret görsel",
  ],
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: "Open Media",
    url: "/",
    title: "Open Media — Daha iyi içerik. Daha güçlü satış.",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Open Media — Daha iyi içerik. Daha güçlü satış.",
    description: site.description,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#10182B",
  width: "device-width",
  initialScale: 1,
};

// Only facts we can state accurately: name, URL, description, service area.
const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Open Media",
  url: site.url,
  description: site.description,
  slogan: site.slogan.en,
  areaServed: { "@type": "Country", name: "Türkiye" },
  knowsAbout: ["AI product photography", "Advertising creatives", "Social media content"],
};

const introScript = `try{if(sessionStorage.getItem('om-intro-seen')||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('om-no-intro')}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body className="min-h-dvh">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd).replace(/</g, "\\u003c") }}
        />
        <MotionProvider>
          <PageLoader />
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
