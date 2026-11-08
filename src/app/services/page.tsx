import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceDetail } from "@/components/sections/services/service-detail";
import { ProcessTimeline } from "@/components/sections/home/process-timeline";
import { CtaBand } from "@/components/sections/cta-band";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Hizmetler",
  description:
    "AI ürün görselleri, AI reklam kreatifleri ve sosyal medya içerikleri. Trendyol, Hepsiburada ve e-ticaret markaları için pazaryerine hazır yaratıcı üretim.",
  alternates: { canonical: "/services" },
  openGraph: { url: "/services", title: "Hizmetler — Open Media" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Hizmetler"
        title={["Ürününüzü anlatan,", "satışa hazır içerikler."]}
        lead="Teknik bilgiye ihtiyacınız yok. Ürününüzü ve hedefinizi anlatın; size uygun görselleri, reklamları ve sosyal medya içeriklerini biz hazırlayalım."
      >
        <nav aria-label="Hizmetlere git">
          <ul className="divide-y divide-om-navy/10 border-y border-om-navy/10">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`#${s.slug}`} className="group flex items-center justify-between py-4">
                  <span className="flex items-baseline gap-4">
                    <span className="font-display text-sm text-om-blue tabular-nums">{s.index}</span>
                    <span className="font-display text-xl font-medium text-om-navy">{s.title}</span>
                  </span>
                  <ArrowDownRight className="size-5 text-om-navy/40 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:text-om-blue" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {services.map((s, i) => (
        <ServiceDetail key={s.slug} service={s} position={i} />
      ))}

      <ProcessTimeline index="04" />
      <CtaBand
        title={["Ürününüz için doğru", "içeriği birlikte seçelim."]}
        text="Hangi hizmetin size uygun olduğundan emin değil misiniz? Kısa bir form doldurun, birlikte değerlendirelim."
        cta="Proje teklifi isteyin"
      />
    </>
  );
}
