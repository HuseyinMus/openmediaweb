"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { processSteps } from "@/data/process";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ProcessTimeline({ index = "05" }: { index?: string }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-line-fill]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: "[data-steps]", start: "top 65%", end: "bottom 65%", scrub: 0.6 },
          },
        );
        gsap.utils.toArray<HTMLElement>("[data-step]").forEach((step) => {
          gsap.fromTo(
            step,
            { opacity: 0.28 },
            {
              opacity: 1,
              ease: "none",
              scrollTrigger: { trigger: step, start: "top 75%", end: "top 50%", scrub: true },
            },
          );
          const dot = step.querySelector("[data-dot]");
          if (dot) {
            gsap.fromTo(
              dot,
              { scale: 0.4, backgroundColor: "rgba(255,255,255,0.2)" },
              {
                scale: 1,
                backgroundColor: "#E9FF57",
                scrollTrigger: { trigger: step, start: "top 65%", toggleActions: "play none none reverse" },
                duration: 0.4,
              },
            );
          }
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="mesh-night grain relative overflow-hidden py-24 text-white md:py-36" aria-labelledby="process-title">
      <div className="container-om relative z-10 grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Eyebrow index={index} tone="light">
              Nasıl çalışıyoruz?
            </Eyebrow>
            <h2 id="process-title" className="text-display-lg mt-6 max-w-[11ch]">
              Fikirden yaratıcı <span className="text-om-yellow">sonuca.</span>
            </h2>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-white/65">
              Net, şeffaf ve hızlı bir süreç. Her adımda ne yaptığımızı ve neden yaptığımızı bilirsiniz.
            </p>
          </div>
        </div>

        <ol data-steps className="relative lg:col-span-6 lg:col-start-7">
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[11px] w-px bg-white/10" />
          <span
            aria-hidden="true"
            data-line-fill
            className="absolute top-2 bottom-2 left-[11px] w-px origin-top bg-gradient-to-b from-om-yellow to-om-soft"
          />
          {processSteps.map((s) => (
            <li key={s.index} data-step className="relative pb-16 pl-14 last:pb-0">
              <span
                data-dot
                aria-hidden="true"
                className="absolute top-1.5 left-0 size-[23px] rounded-full border-4 border-om-navy bg-om-yellow"
              />
              <div className="flex items-baseline gap-4">
                <span className="font-display text-sm text-om-soft tabular-nums">{s.index}</span>
                <span className="text-eyebrow text-[0.65rem] text-white/40">{s.titleEn}</span>
              </div>
              <h3 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">{s.title}</h3>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-white/70">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
