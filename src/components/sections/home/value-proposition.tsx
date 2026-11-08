import Image from "next/image";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { SplitWords } from "@/components/motion/split-words";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/parallax";
import { images } from "@/data/images";

const problems = [
  {
    problem: "Telefonla çekilmiş, karanlık ve düz ürün fotoğrafları",
    solution: "Temiz ışık, doğru renk ve markaya uygun sahnelerle profesyonel ürün görselleri",
  },
  {
    problem: "Her kanalda farklı görünen, tutarsız reklam kreatifleri",
    solution: "Tek bir görsel dile bağlı, her format için ayrı düzenlenmiş kampanya setleri",
  },
  {
    problem: "Pazaryerinde benzer ürünler arasında kaybolan ürün sayfaları",
    solution: "Ürünün farkını ilk bakışta anlatan infografikler ve lifestyle görseller",
  },
];

export function ValueProposition() {
  return (
    <section className="relative overflow-hidden bg-om-warm py-24 md:py-36" aria-labelledby="value-title">
      <div className="container-om grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <Eyebrow index="01">Neden önemli?</Eyebrow>
            </Reveal>
            <SplitWords
              id="value-title"
              className="text-display-md mt-6 text-om-navy"
              lines={[{ text: "İyi bir ürün," }, { text: "iyi bir sunumu", className: "text-om-blue" }, { text: "hak eder." }]}
            />
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-om-navy/70">
                Birçok işletmenin ürünü gerçekten iyi; ama ürün görselleri, reklam kreatifleri ve dijital sunumu bunu
                yansıtmıyor. Müşteri ürünü elinde tutamadığı için ilk kararı görsele bakarak veriyor.
              </p>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-om-navy/70">
                Open Media olarak bu boşluğu kapatıyoruz: yapay zekâyı yaratıcı yönetimle birleştirip ürününüzü olması
                gerektiği gibi gösteriyoruz.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="relative">
            <Parallax offset={40} className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-[var(--om-shadow-lift)]">
              <Image
                src={images.ceramics.src}
                alt={images.ceramics.alt}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="scale-110 object-cover"
              />
            </Parallax>
            <Reveal
              delay={0.2}
              className="glass absolute -bottom-8 left-4 max-w-xs rounded-2xl p-5 sm:left-8 md:-bottom-10"
            >
              <p className="font-display text-lg leading-snug font-medium text-om-navy">
                “Ürününüz zaten iyi. Şimdi görünüşü de öyle olsun.”
              </p>
            </Reveal>
          </div>

          <RevealGroup as="div" className="mt-20 divide-y divide-om-navy/10 border-y border-om-navy/10">
            {problems.map((p, i) => (
              <RevealItem key={i} as="article" className="grid gap-4 py-7 sm:grid-cols-[3rem_1fr_1fr] sm:gap-6">
                <span className="font-display text-sm text-om-blue tabular-nums">0{i + 1}</span>
                <div>
                  <p className="text-eyebrow text-[0.65rem] text-om-navy/45">Sorun</p>
                  <p className="mt-2 text-om-navy/60">{p.problem}</p>
                </div>
                <div>
                  <p className="text-eyebrow text-[0.65rem] text-om-blue">Open Media ile</p>
                  <p className="mt-2 font-medium text-om-navy">{p.solution}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
