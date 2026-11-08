import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/page-hero";
import { ProcessTimeline } from "@/components/sections/home/process-timeline";
import { CtaBand } from "@/components/sections/cta-band";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { SplitWords } from "@/components/motion/split-words";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/parallax";
import { images } from "@/data/images";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Open Media, işletmelerin ürünlerini dijitalde daha iyi sunmasına yardımcı olan küçük ve tutkulu bir yaratıcı teknoloji stüdyosudur.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", title: "Hakkımızda — Open Media" },
};

const principles = [
  {
    title: "Önce ürün",
    text: "Her işe ürünü anlamakla başlarız. Ne olduğunu, kime hitap ettiğini ve onu farklı kılan şeyi bilmeden tek bir görsel üretmeyiz.",
  },
  {
    title: "Teknoloji araçtır, fikir esastır",
    text: "Yapay zekâ üretimi hızlandırır; ama iyi bir sonucu belirleyen hâlâ yaratıcı yönetim, kompozisyon ve doğru karardır.",
  },
  {
    title: "Dürüst sunum",
    text: "Ürünü olduğundan farklı göstermeyiz. Amacımız onu en iyi ve en anlaşılır hâliyle sunmaktır.",
  },
  {
    title: "Sade ve net",
    text: "Karmaşık süreçleri sizin yerinize yönetir, size anlaşılır seçenekler ve kullanıma hazır dosyalar sunarız.",
  },
];

const audiences = [
  "Küçük ve orta ölçekli işletmeler",
  "Trendyol ve Hepsiburada satıcıları",
  "E-ticaret markaları",
  "Moda ve tekstil markaları",
  "Kozmetik ve güzellik işletmeleri",
  "Yerel işletmeler",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Hakkımızda"
        title={["Küçük bir stüdyo.", "Büyük bir yaratıcı hedef."]}
        lead="Open Media, yapay zekâ destekli yaratıcı üretimi işletmeler için erişilebilir kılmak üzere kurulmuş, küçük ve tutkulu bir yaratıcı teknoloji stüdyosu."
      />

      {/* Manifesto */}
      <section className="bg-white py-24 md:py-36" aria-labelledby="manifesto-title">
        <div className="container-om grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Eyebrow index="01">Felsefemiz</Eyebrow>
          </div>
          <div className="lg:col-span-9">
            <h2 id="manifesto-title" className="sr-only">
              Felsefemiz
            </h2>
            <Reveal>
              <p className="font-display text-[clamp(1.6rem,1.1rem+2vw,3rem)] leading-[1.15] font-medium tracking-tight text-om-navy">
                Bugün müşteriler bir ürünle çoğu zaman önce bir ekranda tanışıyor. Ürün ne kadar iyi olursa olsun,{" "}
                <span className="text-om-blue">sunumu zayıfsa fark edilmiyor.</span> Biz, iyi ürünlerin dijitalde de hak
                ettiği gibi görünmesi için çalışıyoruz —{" "}
                <span className="rounded-md bg-om-yellow px-1.5 box-decoration-clone">yaratıcı düşünceyi yapay zekânın hızıyla</span>{" "}
                birleştirerek.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="bg-om-warm py-24 md:py-32" aria-labelledby="principles-title">
        <div className="container-om">
          <Eyebrow index="02">Yaklaşımımız</Eyebrow>
          <SplitWords
            id="principles-title"
            className="text-display-md mt-6 max-w-[18ch] text-om-navy"
            lines={[{ text: "Her projede bağlı kaldığımız" }, { text: "dört ilke.", className: "text-om-blue" }]}
          />
          <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-[1.75rem] bg-om-navy/10 sm:grid-cols-2">
            {principles.map((p, i) => (
              <RevealItem key={p.title} as="article" className="group bg-om-warm p-8 transition-colors duration-500 hover:bg-white md:p-10">
                <span className="font-display text-sm text-om-blue tabular-nums">0{i + 1}</span>
                <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-om-navy md:text-3xl">{p.title}</h3>
                <p className="mt-3 max-w-md leading-relaxed text-om-navy/65">{p.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* AI + creative direction */}
      <section className="bg-white py-24 md:py-32" aria-labelledby="craft-title">
        <div className="container-om grid items-center gap-14 lg:grid-cols-12">
          <div className="relative lg:col-span-6">
            <Parallax offset={36} className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <div className="relative h-[115%] w-full -translate-y-[7%]">
                <Image src={images.interiorChair.src} alt={images.interiorChair.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
              </div>
            </Parallax>
            <div className="glass absolute right-4 -bottom-6 max-w-[16rem] rounded-2xl p-5 md:-right-8">
              <p className="text-eyebrow text-[0.65rem] text-om-blue">Formül</p>
              <p className="mt-2 font-display text-lg leading-snug font-semibold text-om-navy">
                Yapay zekâ + yaratıcı yönetim + ürün bilgisi
              </p>
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Eyebrow index="03">Nasıl üretiyoruz?</Eyebrow>
            <SplitWords
              id="craft-title"
              className="text-display-md mt-6 text-om-navy"
              lines={[{ text: "Araçlar değişir." }, { text: "Özen değişmez.", className: "text-om-blue" }]}
            />
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-om-navy/70">
                Üretken yapay zekâ araçlarını; ışık, kompozisyon, renk ve tipografi bilgisiyle birlikte kullanıyoruz.
                Ortaya çıkan her görseli tek tek kontrol ediyor, ürünün gerçeğe uygun ve markaya yakışır göründüğünden
                emin oluyoruz.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-om-navy/70">
                Böylece klasik çekim süreçlerinin zaman ve maliyet yükü olmadan, işletmenize özel ve tutarlı içerikler
                üretebiliyoruz.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <ProcessTimeline index="04" />

      {/* Focus */}
      <section className="bg-om-warm py-24 md:py-32" aria-labelledby="focus-title">
        <div className="container-om grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow index="05">Odağımız</Eyebrow>
            <h2 id="focus-title" className="text-display-md mt-6 text-om-navy">
              Dijitalde daha iyi görünmek isteyen işletmeler.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-om-navy/70">
              Türkiye’deki işletmelerin ürünlerini daha iyi sunmasına ve dijitalde daha güçlü rekabet etmesine yardımcı
              olmayı hedefliyoruz.
            </p>
          </div>
          <RevealGroup as="div" className="lg:col-span-6 lg:col-start-7">
            <ul className="divide-y divide-om-navy/10 border-y border-om-navy/10">
              {audiences.map((a, i) => (
                <RevealItem key={a} as="li" className="flex items-baseline justify-between gap-6 py-5">
                  <span className="font-display text-xl font-medium text-om-navy md:text-2xl">{a}</span>
                  <span className="font-display text-sm text-om-navy/35 tabular-nums">0{i + 1}</span>
                </RevealItem>
              ))}
            </ul>
          </RevealGroup>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
