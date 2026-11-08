import Image from "next/image";
import { Check } from "lucide-react";
import type { Service } from "@/data/services";
import { CtaLink } from "@/components/primitives/cta-link";
import { ConceptBadge } from "@/components/primitives/eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/parallax";
import { cn } from "@/lib/utils";

const themes = [
  { section: "bg-white text-om-navy", muted: "text-om-navy/65", index: "text-om-blue", chip: "border-om-navy/10 bg-om-warm", rule: "border-om-navy/10" },
  { section: "mesh-night text-white", muted: "text-white/65", index: "text-om-yellow", chip: "border-white/15 bg-white/5", rule: "border-white/10" },
  { section: "bg-om-warm text-om-navy", muted: "text-om-navy/65", index: "text-om-blue", chip: "border-om-navy/10 bg-white", rule: "border-om-navy/10" },
] as const;

export function ServiceDetail({ service, position }: { service: Service; position: number }) {
  const t = themes[position % themes.length];
  const flip = position % 2 === 1;
  const dark = position % themes.length === 1;
  const [main, second, third] = service.gallery;

  return (
    <section id={service.slug} className={cn("scroll-mt-24 py-24 md:py-32", t.section)} aria-labelledby={`${service.slug}-title`}>
      <div className="container-om grid items-start gap-14 lg:grid-cols-12 lg:gap-12">
        {/* Copy */}
        <div className={cn("lg:col-span-6", flip && "lg:order-2")}>
          <Reveal>
            <p className={cn("font-display text-sm tabular-nums", t.index)}>
              {service.index} <span className="opacity-60">/ 03</span>
            </p>
            <h2 id={`${service.slug}-title`} className="text-display-md mt-4">
              {service.title}
            </h2>
            <p className={cn("mt-2 text-sm", t.muted)}>{service.titleEn}</p>
            <p className={cn("mt-6 max-w-xl text-lg leading-relaxed", t.muted)}>{service.description}</p>
          </Reveal>

          <div className={cn("mt-10 grid gap-10 border-t pt-10 sm:grid-cols-2", t.rule)}>
            <div>
              <h3 className="text-eyebrow text-[0.7rem] opacity-60">Neler dahil?</h3>
              <RevealGroup as="div" className="mt-4 space-y-3">
                {service.includes.map((item) => (
                  <RevealItem key={item} as="p" className="flex gap-3 text-[0.95rem]">
                    <Check className={cn("mt-0.5 size-4 shrink-0", t.index)} aria-hidden="true" />
                    <span>{item}</span>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
            <div>
              <h3 className="text-eyebrow text-[0.7rem] opacity-60">Kimler için uygun?</h3>
              <ul className="mt-4 space-y-3">
                {service.suitableFor.map((item) => (
                  <li key={item} className={cn("text-[0.95rem]", t.muted)}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-eyebrow text-[0.7rem] opacity-60">Örnek teslimatlar</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {service.deliverables.map((d) => (
                <li key={d} className={cn("rounded-full border px-3.5 py-1.5 text-sm", t.chip)}>
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12">
            <CtaLink href={`/contact?service=${service.slug}`} variant={dark ? "accent" : "primary"}>
              Proje teklifi isteyin
            </CtaLink>
          </div>
        </div>

        {/* Visual showcase */}
        <div className={cn("lg:sticky lg:top-28 lg:col-span-6", flip && "lg:order-1")}>
          <div className="grid grid-cols-5 grid-rows-[repeat(6,minmax(0,1fr))] gap-3 sm:gap-4 aspect-[5/6]">
            <Parallax offset={24} className="col-span-3 row-span-6 overflow-hidden rounded-[1.5rem]">
              <div className="relative h-[115%] w-full -translate-y-[7%]">
                <Image src={main.src} alt={main.alt} fill sizes="(min-width: 1024px) 30vw, 60vw" className="object-cover" />
              </div>
            </Parallax>
            {second && (
              <Reveal delay={0.1} className="relative col-span-2 row-span-3 overflow-hidden rounded-[1.5rem]">
                <Image src={second.src} alt={second.alt} fill sizes="(min-width: 1024px) 20vw, 40vw" className="object-cover transition-transform duration-700 ease-om hover:scale-105" />
              </Reveal>
            )}
            {third && (
              <Reveal delay={0.2} className="relative col-span-2 row-span-3 overflow-hidden rounded-[1.5rem]">
                <Image src={third.src} alt={third.alt} fill sizes="(min-width: 1024px) 20vw, 40vw" className="object-cover transition-transform duration-700 ease-om hover:scale-105" />
              </Reveal>
            )}
          </div>
          <div className="mt-4 flex items-center justify-between gap-4">
            <ConceptBadge tone={dark ? "dark" : "light"} />
            <p className={cn("text-xs", t.muted)}>Görseller temsilidir.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
