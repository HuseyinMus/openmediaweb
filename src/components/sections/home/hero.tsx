"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { Check, Layers3, ScanLine } from "lucide-react";
import type { PointerEvent, ReactNode } from "react";
import { SplitWords } from "@/components/motion/split-words";
import { CtaLink } from "@/components/primitives/cta-link";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { images } from "@/data/images";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

function Layer({
  mx,
  my,
  depth,
  className,
  children,
  delay = 0,
}: {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  depth: number;
  className?: string;
  children: ReactNode;
  delay?: number;
}) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return (
    <motion.div className={cn("absolute", className)} style={{ x, y }}>
      <motion.div
        className="h-full"
        initial={{ opacity: 0, scale: 0.92, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function RotatingBadge() {
  return (
    <div className="relative grid size-28 place-items-center rounded-full bg-om-yellow text-om-navy shadow-[0_20px_40px_-16px_rgb(16_24_43/0.5)] md:size-32">
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full animate-[spin_18s_linear_infinite]" aria-hidden="true">
        <defs>
          <path id="om-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
        </defs>
        <text className="fill-om-navy font-display text-[9.6px] font-semibold tracking-[0.22em] uppercase">
          <textPath href="#om-circle">Better content · Better sales ·</textPath>
        </text>
      </svg>
      <span className="font-display text-xl font-semibold">AI</span>
    </div>
  );
}

export function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });

  function onPointerMove(e: PointerEvent<HTMLElement>) {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  }

  return (
    <section
      onPointerMove={onPointerMove}
      className="mesh-light grain relative isolate overflow-hidden pt-28 pb-16 md:pt-36 lg:min-h-[100svh] lg:pb-24"
      aria-labelledby="hero-title"
    >
      {/* ambient light */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="hairline-grid absolute inset-0 [mask-image:radial-gradient(70%_60%_at_60%_40%,black,transparent)] opacity-60" />
        <div className="animate-om-drift absolute -top-40 right-[-10%] size-[42rem] rounded-full bg-om-blue/25 blur-[120px]" />
        <div className="animate-om-drift absolute bottom-[-20%] left-[-10%] size-[30rem] rounded-full bg-om-soft/60 blur-[100px] [animation-delay:-8s]" />
        <div className="absolute top-[55%] right-[22%] size-48 rounded-full bg-om-yellow/40 blur-[80px]" />
      </div>

      <div className="container-om relative grid items-center gap-14 lg:grid-cols-12 lg:gap-6">
        {/* Copy */}
        <div className="relative z-10 lg:col-span-7">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.2 }}>
            <Eyebrow>AI-Powered Creative &amp; Digital Growth Studio</Eyebrow>
          </motion.div>

          <SplitWords
            as="h1"
            id="hero-title"
            inView={false}
            delay={0.35}
            className="text-display-lg mt-6 max-w-[13ch] text-om-navy lg:text-[clamp(3rem,1rem+4.4vw,5.6rem)]"
            lines={[
              { text: "Ürünlerinizi daha iyi gösterin." },
              { text: "Dijitalde fark yaratın.", className: "text-gradient-blue" },
            ]}
          />

          <motion.p
            className="mt-7 max-w-[34rem] text-lg leading-relaxed text-om-navy/70 md:text-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1 }}
          >
            Yapay zekâ destekli yaratıcı çözümlerle ürünlerinizi, reklamlarınızı ve markanızı bir üst seviyeye taşıyoruz.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1.15 }}
          >
            <CtaLink href="/contact" size="lg">
              Projenizi Başlatın
            </CtaLink>
            <CtaLink href="/work" variant="ghost" size="lg">
              Çalışmalarımızı Keşfedin
            </CtaLink>
          </motion.div>
        </div>

        {/* Composition */}
        <div className="relative h-[30rem] sm:h-[36rem] lg:col-span-5 lg:h-[40rem]" aria-label="Örnek ürün görseli kompozisyonu">
          {/* main product frame */}
          <Layer mx={smx} my={smy} depth={10} delay={0.5} className="inset-x-[12%] top-[6%] bottom-[8%] sm:inset-x-[18%] lg:inset-x-[10%]">
            <div className="relative h-full overflow-hidden rounded-[2rem] shadow-[var(--om-shadow-lift)] ring-1 ring-om-navy/5">
              <Image
                src={images.serum.src}
                alt={images.serum.alt}
                fill
                preload
                sizes="(min-width: 1024px) 34vw, (min-width: 640px) 60vw, 80vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-om-navy/50 via-transparent to-transparent" />
              <div className="glass absolute inset-x-3 bottom-3 flex items-center justify-between rounded-2xl px-4 py-3">
                <div>
                  <p className="text-[0.7rem] tracking-wide text-om-navy/60 uppercase">Sahne</p>
                  <p className="font-display text-sm font-semibold text-om-navy">Premium lansman · 4:5</p>
                </div>
                <span className="grid size-8 place-items-center rounded-full bg-om-blue text-white">
                  <Check className="size-4" />
                </span>
              </div>
            </div>
          </Layer>

          {/* ad creative card */}
          <Layer mx={smx} my={smy} depth={-22} delay={0.75} className="top-0 left-0 w-[38%] sm:left-[4%] lg:-left-[6%]">
            <div className="animate-om-float [--om-rot:-7deg]">
              <div className="overflow-hidden rounded-3xl bg-white p-2 shadow-[var(--om-shadow-lift)]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.1rem]">
                  <Image src={images.headphonesYellow.src} alt={images.headphonesYellow.alt} fill sizes="220px" className="object-cover" />
                </div>
                <p className="px-1.5 pt-2 pb-1 text-[0.7rem] font-medium text-om-navy/70">Reklam kreatifi · Story</p>
              </div>
            </div>
          </Layer>

          {/* fashion card */}
          <Layer mx={smx} my={smy} depth={26} delay={0.9} className="right-0 bottom-[4%] w-[34%] sm:right-[4%] lg:-right-[4%]">
            <div className="animate-om-float [--om-rot:6deg] [animation-delay:-3s]">
              <div className="overflow-hidden rounded-3xl bg-white p-2 shadow-[var(--om-shadow-lift)]">
                <div className="relative aspect-square overflow-hidden rounded-[1.1rem]">
                  <Image src={images.fashionYellow.src} alt={images.fashionYellow.alt} fill sizes="200px" className="object-cover" />
                </div>
                <p className="px-1.5 pt-2 pb-1 text-[0.7rem] font-medium text-om-navy/70">Sosyal medya · 1:1</p>
              </div>
            </div>
          </Layer>

          {/* production panel */}
          <Layer mx={smx} my={smy} depth={-14} delay={1.05} className="top-[50%] -left-[2%] hidden w-56 md:block lg:-left-[16%]">
            <div className="glass animate-om-float rounded-2xl p-4 [animation-delay:-5s]">
              <div className="flex items-center gap-2 text-xs font-medium text-om-navy">
                <ScanLine className="size-4 text-om-blue" /> Üretim akışı
              </div>
              <ul className="mt-3 space-y-2 text-[0.78rem] text-om-navy/75">
                {["Işık ve renk", "Arka plan sahnesi", "Pazaryeri ölçüsü"].map((t, i) => (
                  <li key={t} className="flex items-center justify-between gap-3">
                    <span>{t}</span>
                    <motion.span
                      className="h-1.5 w-14 overflow-hidden rounded-full bg-om-navy/10"
                      aria-hidden="true"
                    >
                      <motion.span
                        className="block h-full rounded-full bg-om-blue"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.4, ease, delay: 1.6 + i * 0.35 }}
                      />
                    </motion.span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center gap-2 border-t border-om-navy/10 pt-3 text-[0.72rem] text-om-navy/60">
                <Layers3 className="size-3.5" /> 3 varyasyon hazır
              </div>
            </div>
          </Layer>

          <Layer mx={smx} my={smy} depth={34} delay={1.2} className="top-[2%] right-[2%] lg:-right-[2%]">
            <RotatingBadge />
          </Layer>

          <p className="absolute right-0 -bottom-6 text-[0.7rem] text-om-navy/45">Görseller temsilidir.</p>
        </div>
      </div>
    </section>
  );
}
