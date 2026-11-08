import type { Metadata } from "next";
import { Info } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { PortfolioGrid } from "@/components/sections/work/portfolio-grid";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata: Metadata = {
  title: "Çalışmalarımız",
  description:
    "Ürün görselleri, reklam kreatifleri, sosyal medya ve marka içeriği alanlarında yaklaşımımızı gösteren konsept çalışmalar.",
  alternates: { canonical: "/work" },
  openGraph: { url: "/work", title: "Çalışmalarımız — Open Media" },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Çalışmalarımız"
        title={["Fikirleri", "görsellere dönüştürüyoruz."]}
        lead="Farklı sektörlerde ürünleri nasıl sunduğumuzu gösteren konsept projeler. Bir projeye tıklayarak galerisini ve varsa önce/sonra karşılaştırmasını inceleyin."
      >
        <div className="glass flex gap-3 rounded-2xl p-5 text-sm leading-relaxed text-om-navy/75">
          <Info className="mt-0.5 size-4 shrink-0 text-om-blue" aria-hidden="true" />
          <p>
            Open Media yeni bir stüdyo. Bu sayfadaki projeler yaklaşımımızı gösteren <strong>konsept çalışmalardır</strong>;
            gerçek müşteri projeleri değildir. Müşteri çalışmaları, izinleri alındıktan sonra burada yer alacaktır.
          </p>
        </div>
      </PageHero>
      <PortfolioGrid />
      <CtaBand
        title={["Sıradaki proje", "sizinki olsun."]}
        text="Ürünlerinizi ve hedeflerinizi anlatın; size özel bir yaratıcı yaklaşım önerelim."
        cta="Projenizi Başlatın"
      />
    </>
  );
}
