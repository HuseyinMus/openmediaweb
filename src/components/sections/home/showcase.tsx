"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow, ConceptBadge } from "@/components/primitives/eyebrow";
import { images, type SiteImage } from "@/data/images";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Panel = { category: string; line: string; image: SiteImage; width: string };

const panels: Panel[] = [
  { category: "Kozmetik", line: "Işığı ve dokuyu öne çıkaran ürün sahneleri", image: images.bottleLeaves, width: "lg:w-[34vw]" },
  { category: "Moda", line: "Koleksiyonu anlatan editoryal kareler", image: images.rackNeutral, width: "lg:w-[26vw]" },
  { category: "Ev ürünleri", line: "Ürünü gerçek bir yaşam alanında gösteren kurgular", image: images.interiorChair, width: "lg:w-[40vw]" },
  { category: "Gıda", line: "İştah açan, tutarlı menü ve ambalaj görselleri", image: images.bruschetta, width: "lg:w-[28vw]" },
  { category: "Yaşam tarzı ürünleri", line: "Ürünü kullanım anıyla buluşturan sahneler", image: images.watchHand, width: "lg:w-[32vw]" },
  { category: "E-ticaret reklamları", line: "Kampanyaya hazır, dikkat çeken kreatifler", image: images.headphonesGrey, width: "lg:w-[30vw]" },
];

export function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [enhanced, setEnhanced] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        setEnhanced(true);
        const track = trackRef.current!;
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.utils.toArray<HTMLElement>("[data-sc-img]").forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -6 },
            {
              xPercent: 6,
              ease: "none",
              scrollTrigger: {
                trigger: img.parentElement,
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });

        return () => setEnhanced(false);
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-om-warm py-24 md:py-32 lg:flex lg:h-[100svh] lg:flex-col lg:justify-center lg:py-0"
      aria-labelledby="showcase-title"
    >
      <div className="container-om flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <Eyebrow index="04">Yaratıcı vitrin</Eyebrow>
          <h2 id="showcase-title" className="text-display-md mt-5 max-w-[18ch] text-om-navy">
            Her kategoride, ürüne özel bir görsel dil.
          </h2>
        </div>
        <p className="max-w-sm text-om-navy/60">
          Aşağıdaki kareler, farklı sektörlerde nasıl bir yaklaşım izlediğimizi gösteren konsept çalışmalardır.
        </p>
      </div>

      <div
        className={cn(
          "mt-12 lg:mt-14",
          enhanced ? "overflow-visible" : "no-scrollbar snap-x snap-mandatory overflow-x-auto overscroll-x-contain",
        )}
      >
        <div ref={trackRef} className="flex w-max gap-4 px-4 will-change-transform sm:px-6 lg:gap-6 lg:px-10">
          {panels.map((p, i) => (
            <article
              key={p.category}
              className={cn(
                "group relative aspect-[3/4] w-[78vw] shrink-0 snap-start overflow-hidden rounded-[1.75rem] bg-om-navy sm:w-[46vw] lg:aspect-auto lg:h-[58svh]",
                p.width,
              )}
            >
              <div data-sc-img className="absolute inset-y-0 -inset-x-[8%]">
                <Image
                  src={p.image.src}
                  alt={p.image.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 80vw"
                  className="object-cover transition-transform duration-[1.2s] ease-om group-hover:scale-[1.06]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-om-navy/85 via-om-navy/10 to-transparent" />
              <ConceptBadge className="absolute top-4 left-4" />
              <span className="absolute top-4 right-5 font-display text-sm text-white/80 tabular-nums">0{i + 1}</span>
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                <h3 className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">{p.category}</h3>
                <p className="mt-2 max-w-xs translate-y-1 text-sm text-white/75 transition-all duration-500 ease-om group-hover:translate-y-0 group-hover:text-white">
                  {p.line}
                </p>
              </div>
            </article>
          ))}

          <Link
            href="/work"
            className="group relative flex aspect-[3/4] w-[78vw] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-[1.75rem] bg-om-blue p-7 text-white sm:w-[46vw] lg:aspect-auto lg:h-[58svh] lg:w-[24vw]"
          >
            <span className="font-display text-sm text-om-yellow">Portfolyo</span>
            <div>
              <p className="font-display text-3xl leading-tight font-semibold tracking-tight md:text-4xl">
                Tüm çalışmaları keşfedin
              </p>
              <span className="mt-6 grid size-14 place-items-center rounded-full bg-om-yellow text-om-navy transition-transform duration-500 ease-om group-hover:rotate-45">
                <ArrowUpRight className="size-5" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
