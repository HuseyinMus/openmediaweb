import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/sections/contact/contact-form";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { SplitWords } from "@/components/motion/split-words";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Yeni bir proje başlatalım. İşletmenizi ve ihtiyaçlarınızı anlatın; size uygun yaratıcı çözümleri birlikte değerlendirelim.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact", title: "İletişim — Open Media" },
};

const steps = [
  { t: "Formu doldurun", d: "İşletmenizi, ürünlerinizi ve ihtiyacınızı kısaca anlatın." },
  { t: "Talebinizi inceleyelim", d: "Ürünlerinize ve hedeflerinize uygun yaklaşımı değerlendirelim." },
  { t: "Size dönüş yapalım", d: "Önerimizi ve sonraki adımları e-posta ile paylaşalım." },
];

function FormSkeleton() {
  return (
    <div className="space-y-5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-12 animate-pulse rounded-xl bg-om-navy/5" />
      ))}
    </div>
  );
}

export default function ContactPage() {
  return (
    <section className="mesh-light grain relative isolate overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-om-drift absolute -top-40 -left-40 size-[36rem] rounded-full bg-om-blue/20 blur-[120px]" />
        <div className="absolute right-0 bottom-0 size-80 rounded-full bg-om-yellow/30 blur-[100px]" />
      </div>

      <div className="container-om relative z-10 grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <Eyebrow>İletişim</Eyebrow>
            </Reveal>
            <SplitWords
              as="h1"
              inView={false}
              delay={0.15}
              className="text-display-lg mt-6 text-om-navy"
              lines={[{ text: "Yeni bir proje" }, { text: "başlatalım.", className: "text-gradient-blue" }]}
            />
            <Reveal delay={0.4}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-om-navy/70">
                İşletmenizi ve ihtiyaçlarınızı anlatın. Size uygun yaratıcı çözümleri birlikte değerlendirelim.
              </p>
            </Reveal>

            <Reveal delay={0.55}>
              <ol className="mt-12 space-y-6">
                {steps.map((s, i) => (
                  <li key={s.t} className="flex gap-4">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-om-navy font-display text-sm text-om-yellow">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-display font-semibold text-om-navy">{s.t}</p>
                      <p className="mt-1 text-sm text-om-navy/60">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
              {site.contact.email && (
                <p className="mt-10 text-sm text-om-navy/60">
                  Doğrudan yazmak isterseniz:{" "}
                  <a href={`mailto:${site.contact.email}`} className="link-underline font-medium text-om-navy">
                    {site.contact.email}
                  </a>
                </p>
              )}
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.3} className="lg:col-span-7">
          <div className="glass rounded-[2rem] p-6 sm:p-8 md:p-10">
            <Suspense fallback={<FormSkeleton />}>
              <ContactForm />
            </Suspense>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
