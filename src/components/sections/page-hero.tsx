import type { ReactNode } from "react";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { SplitWords } from "@/components/motion/split-words";
import { Reveal } from "@/components/motion/reveal";

/** Opening section for inner pages. */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: [string, string];
  lead: string;
  children?: ReactNode;
}) {
  return (
    <section className="mesh-light grain relative isolate overflow-hidden pt-36 pb-16 md:pt-44 md:pb-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="hairline-grid absolute inset-0 [mask-image:radial-gradient(60%_70%_at_70%_20%,black,transparent)] opacity-50" />
        <div className="animate-om-drift absolute -top-32 right-[-8%] size-[34rem] rounded-full bg-om-blue/20 blur-[110px]" />
      </div>
      <div className="container-om relative z-10">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <SplitWords
          as="h1"
          inView={false}
          delay={0.15}
          className="text-display-xl mt-6 max-w-[14ch] text-om-navy"
          lines={[{ text: title[0] }, { text: title[1], className: "text-gradient-blue" }]}
        />
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <Reveal delay={0.5} className="md:col-span-6">
            <p className="text-lg leading-relaxed text-om-navy/70 md:text-xl">{lead}</p>
          </Reveal>
          {children ? (
            <Reveal delay={0.6} className="md:col-span-5 md:col-start-8">
              {children}
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
