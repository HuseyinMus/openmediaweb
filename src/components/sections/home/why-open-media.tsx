import { Wand2, Lightbulb, Timer, Layers, Briefcase, type LucideIcon } from "lucide-react";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { SplitWords } from "@/components/motion/split-words";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

type Point = { icon: LucideIcon; title: string; text: string; className: string; tone: "electric" | "light" | "white" | "yellow" };

const points: Point[] = [
  {
    icon: Wand2,
    title: "Yapay zekâ destekli üretim",
    text: "Güncel üretken yapay zekâ araçlarını profesyonel bir tasarım süreciyle birlikte kullanıyoruz. Araç değil, sonuç odaklıyız.",
    className: "md:col-span-2 md:row-span-2",
    tone: "electric",
  },
  {
    icon: Lightbulb,
    title: "Yaratıcı düşünce",
    text: "Her görselin arkasında bir fikir, bir kompozisyon ve bir hikâye var.",
    className: "",
    tone: "white",
  },
  {
    icon: Timer,
    title: "Daha hızlı içerik akışı",
    text: "Klasik çekim organizasyonlarına kıyasla daha az bekleme, daha çok varyasyon.",
    className: "",
    tone: "light",
  },
  {
    icon: Layers,
    title: "Size özel çözümler",
    text: "Hazır şablon değil; ürününüze, kanalınıza ve kitlenize göre tasarlanmış içerikler.",
    className: "",
    tone: "light",
  },
  {
    icon: Briefcase,
    title: "İş odaklı yaklaşım",
    text: "Güzel görselin ötesinde: ürününüzü daha anlaşılır ve daha ikna edici sunmayı hedefliyoruz.",
    className: "",
    tone: "yellow",
  },
];

const toneClass = {
  electric: "mesh-electric text-white",
  light: "bg-om-warm text-om-navy",
  white: "bg-white text-om-navy ring-1 ring-om-navy/10",
  yellow: "bg-om-yellow text-om-navy",
} as const;

export function WhyOpenMedia({ index = "06" }: { index?: string }) {
  return (
    <section className="bg-white py-24 md:py-36" aria-labelledby="why-title">
      <div className="container-om">
        <div className="max-w-3xl">
          <Eyebrow index={index}>Neden Open Media?</Eyebrow>
          <SplitWords
            id="why-title"
            className="text-display-md mt-6 text-om-navy"
            lines={[{ text: "Teknolojiyi yaratıcılıkla," }, { text: "yaratıcılığı iş hedefleriyle", className: "text-om-blue" }, { text: "buluşturuyoruz." }]}
          />
        </div>

        <RevealGroup className="mt-14 grid auto-rows-[minmax(15rem,auto)] gap-4 md:grid-cols-4">
          {points.map((p) => {
            const Icon = p.icon;
            const big = p.tone === "electric";
            return (
              <RevealItem
                key={p.title}
                as="article"
                className={cn(
                  "group relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] p-7 transition-transform duration-500 ease-om hover:-translate-y-1",
                  toneClass[p.tone],
                  p.className,
                )}
              >
                <span
                  className={cn(
                    "grid size-12 place-items-center rounded-2xl",
                    p.tone === "electric" ? "bg-white/15 text-om-yellow" : p.tone === "yellow" ? "bg-om-navy text-om-yellow" : "bg-om-blue/10 text-om-blue",
                  )}
                >
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div className={big ? "mt-24" : "mt-10"}>
                  <h3 className={cn("font-display font-semibold tracking-tight", big ? "text-4xl md:text-5xl" : "text-xl")}>
                    {p.title}
                  </h3>
                  <p className={cn("mt-3 leading-relaxed", big ? "max-w-md text-lg text-white/80" : "text-sm opacity-75")}>{p.text}</p>
                </div>
                {big && (
                  <div
                    aria-hidden="true"
                    className="animate-om-drift absolute -top-24 -right-24 size-72 rounded-full border border-white/20"
                  />
                )}
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
