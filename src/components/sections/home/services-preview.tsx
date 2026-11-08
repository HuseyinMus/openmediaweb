import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { CtaLink } from "@/components/primitives/cta-link";
import { SplitWords } from "@/components/motion/split-words";
import { Reveal } from "@/components/motion/reveal";
import { services } from "@/data/services";
import { images } from "@/data/images";
import { cn } from "@/lib/utils";

function CardLink({ href, tone = "dark", label }: { href: string; tone?: "dark" | "light"; label: string }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={cn(
        "group/link inline-flex items-center gap-2 text-sm font-medium after:absolute after:inset-0 after:content-['']",
        tone === "light" ? "text-white" : "text-om-navy",
      )}
    >
      <span className="link-underline">Detayları gör</span>
      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
    </Link>
  );
}

export function ServicesPreview() {
  const [product, ads, social] = services;

  return (
    <section className="bg-white py-24 md:py-36" aria-labelledby="services-title">
      <div className="container-om">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal>
              <Eyebrow index="03">Hizmetler</Eyebrow>
            </Reveal>
            <SplitWords
              id="services-title"
              className="text-display-md mt-6 max-w-[16ch] text-om-navy"
              lines={[{ text: "Ürününüzden kampanyanıza," }, { text: "tek yaratıcı ekip.", className: "text-om-blue" }]}
            />
          </div>
          <Reveal delay={0.1}>
            <CtaLink href="/services" variant="ghost">
              Tüm hizmetler
            </CtaLink>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          {/* 01 — Product visuals: editorial light card with layered product */}
          <Reveal as="article" className="group relative overflow-hidden rounded-[2rem] bg-om-warm lg:col-span-7">
            <div className="grid h-full sm:grid-cols-2">
              <div className="flex flex-col p-7 md:p-10">
                <span className="font-display text-sm text-om-blue">{product.index}</span>
                <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight text-om-navy md:text-4xl">
                  {product.title}
                </h3>
                <p className="mt-1 text-sm text-om-navy/50">{product.titleEn}</p>
                <p className="mt-5 leading-relaxed text-om-navy/70">{product.short}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {["Beyaz zemin", "Lifestyle", "İnfografik", "Pazaryeri"].map((t) => (
                    <li key={t} className="rounded-full border border-om-navy/10 bg-white px-3 py-1 text-xs text-om-navy/70">
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-10">
                  <CardLink href={`/services#${product.slug}`} label={`${product.title} detayları`} />
                </div>
              </div>
              <div className="relative min-h-80 overflow-hidden">
                <Image
                  src={images.bottleLeaves.src}
                  alt={images.bottleLeaves.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1.2s] ease-om group-hover:scale-105"
                />
                <div className="glass absolute right-4 bottom-4 left-4 rounded-2xl p-4">
                  <p className="text-[0.7rem] tracking-wide text-om-navy/55 uppercase">Teslim formatı</p>
                  <div className="mt-2 grid grid-cols-3 gap-2 text-center font-display text-xs font-semibold text-om-navy">
                    <span className="rounded-lg bg-white/80 py-2">1:1</span>
                    <span className="rounded-lg bg-white/80 py-2">4:5</span>
                    <span className="rounded-lg bg-om-yellow py-2">1200×1800</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* 02 — Ad creatives: electric card with a story-format mockup */}
          <Reveal as="article" delay={0.1} className="mesh-electric group relative overflow-hidden rounded-[2rem] text-white lg:col-span-5">
            <div className="relative flex h-full flex-col p-7 md:p-10">
              <span className="font-display text-sm text-om-yellow">{ads.index}</span>
              <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">{ads.title}</h3>
              <p className="mt-1 text-sm text-white/60">{ads.titleEn}</p>
              <p className="mt-5 max-w-sm leading-relaxed text-white/80">{ads.short}</p>

              <div className="relative mt-10 flex justify-center gap-4">
                <div className="relative aspect-[9/16] w-36 -rotate-6 overflow-hidden rounded-[1.4rem] border-4 border-white/90 shadow-2xl transition-transform duration-700 ease-om group-hover:-rotate-3 sm:w-40">
                  <Image src={images.headphonesYellow.src} alt={images.headphonesYellow.alt} fill sizes="160px" className="object-cover" />
                  <div className="absolute inset-x-2 bottom-2 rounded-lg bg-om-navy/85 px-2 py-1.5 text-center text-[0.65rem] font-semibold">
                    Şimdi keşfet
                  </div>
                </div>
                <div className="relative mt-8 aspect-square w-32 rotate-6 overflow-hidden rounded-[1.2rem] border-4 border-white/90 shadow-2xl transition-transform duration-700 ease-om group-hover:rotate-3 sm:w-36">
                  <Image src={images.watchWhite.src} alt={images.watchWhite.alt} fill sizes="150px" className="object-cover" />
                </div>
              </div>

              <div className="mt-auto pt-10">
                <CardLink href={`/services#${ads.slug}`} tone="light" label={`${ads.title} detayları`} />
              </div>
            </div>
          </Reveal>

          {/* 03 — Social: navy card with a feed grid */}
          <Reveal as="article" delay={0.05} className="group relative overflow-hidden rounded-[2rem] bg-om-navy text-white lg:col-span-12">
            <div className="grid items-center gap-10 p-7 md:p-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <span className="font-display text-sm text-om-yellow">{social.index}</span>
                <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">{social.title}</h3>
                <p className="mt-1 text-sm text-white/50">{social.titleEn}</p>
                <p className="mt-5 max-w-md leading-relaxed text-white/75">{social.short}</p>
                <div className="mt-10">
                  <CardLink href={`/services#${social.slug}`} tone="light" label={`${social.title} detayları`} />
                </div>
              </div>
              <div className="lg:col-span-7">
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {[images.coffeeLatte, images.fashionYellow, images.candle, images.makeupFlatlay, images.foodTable, images.ceramics].map(
                    (img, i) => (
                      <div
                        key={img.src}
                        className="relative aspect-square overflow-hidden rounded-xl"
                        style={{ transitionDelay: `${i * 40}ms` }}
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          sizes="(min-width: 1024px) 18vw, 30vw"
                          className="object-cover transition-transform duration-700 ease-om group-hover:scale-105"
                        />
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
        <p className="mt-4 text-xs text-om-navy/45">Kartlardaki görseller temsilidir.</p>
      </div>
    </section>
  );
}
