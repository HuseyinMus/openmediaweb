import { CtaLink } from "@/components/primitives/cta-link";
import { SplitWords } from "@/components/motion/split-words";
import { Reveal } from "@/components/motion/reveal";

/** Large closing call to action, shared by every page. */
export function CtaBand({
  title = ["Markanızı bir sonraki", "seviyeye taşıyalım."],
  text = "İşletmeniz için neler yapabileceğimizi birlikte keşfedelim.",
  cta = "Bizimle İletişime Geçin",
}: {
  title?: [string, string];
  text?: string;
  cta?: string;
}) {
  return (
    <section className="bg-om-warm px-3 py-3 sm:px-5 sm:py-5" aria-labelledby="cta-title">
      <div className="mesh-electric grain relative isolate overflow-hidden rounded-[2rem] text-white md:rounded-[2.5rem]">
        {/* animated light rings */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="animate-om-drift absolute -right-32 -bottom-48 size-[40rem] rounded-full border border-white/20" />
          <div className="animate-om-drift absolute -right-10 -bottom-24 size-[26rem] rounded-full border border-white/25 [animation-delay:-6s]" />
          <div className="animate-om-float absolute top-[18%] right-[14%] size-24 rounded-full bg-om-yellow/80 blur-2xl" />
        </div>

        <div className="container-om relative z-10 py-24 md:py-36">
          <SplitWords
            id="cta-title"
            className="text-display-lg max-w-[16ch]"
            lines={[{ text: title[0] }, { text: title[1], className: "text-om-yellow" }]}
          />
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-lg text-lg text-white/80 md:text-xl">{text}</p>
            <div className="mt-10">
              <CtaLink href="/contact" variant="accent" size="lg">
                {cta}
              </CtaLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
