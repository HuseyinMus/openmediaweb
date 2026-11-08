import { Info } from "lucide-react";
import { BeforeAfter } from "@/components/primitives/before-after";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { SplitWords } from "@/components/motion/split-words";
import { Reveal } from "@/components/motion/reveal";
import { images } from "@/data/images";

const changes = [
  { k: "Işık", v: "Düz flaş yerine yönlü, yumuşak stüdyo ışığı" },
  { k: "Kadraj", v: "Ürünü merkeze alan, nefes alan kompozisyon" },
  { k: "Renk", v: "Markaya uygun, tutarlı renk düzenlemesi" },
  { k: "Bilgi", v: "Ürünün öne çıkan özelliklerini anlatan etiketler" },
];

export function BeforeAfterSection() {
  return (
    <section className="mesh-night grain relative overflow-hidden py-24 text-white md:py-36" aria-labelledby="ba-title">
      <div className="container-om relative z-10 grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <Eyebrow index="02" tone="light">
              Önce / Sonra
            </Eyebrow>
          </Reveal>
          <SplitWords
            id="ba-title"
            className="text-display-md mt-6"
            lines={[{ text: "Aynı ürün." }, { text: "Bambaşka bir sunum.", className: "text-om-yellow" }]}
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/70">
              Kaydırıcıyı sürükleyin ve sıradan bir ürün fotoğrafının yaratıcı yönetimle nasıl dönüştüğünü görün.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <dl className="mt-10 space-y-4">
              {changes.map((c) => (
                <div key={c.k} className="flex gap-4 border-t border-white/10 pt-4">
                  <dt className="w-16 shrink-0 font-display text-sm text-om-soft">{c.k}</dt>
                  <dd className="text-sm text-white/75">{c.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-8">
          <BeforeAfter
            image={images.serum}
            productLabel="Serum · 30 ml"
            chips={["Cam damlalık", "Günlük bakım", "Pazaryeri hazır"]}
            sizes="(min-width: 1024px) 60vw, 100vw"
          />
          <p className="mt-4 flex items-start gap-2 text-sm text-white/55">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            Konsept gösterimdir; gerçek bir müşteri sonucu değildir. “Önce” görünümü tipik bir telefon çekimini simüle
            eder.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
