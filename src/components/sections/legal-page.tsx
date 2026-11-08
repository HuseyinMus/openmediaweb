import type { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { Eyebrow } from "@/components/primitives/eyebrow";

/** Simple, readable layout for legal documents. */
export function LegalPage({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <article className="bg-om-warm pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="container-om max-w-3xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="text-display-md mt-6 text-om-navy">{title}</h1>
        <div className="mt-8 flex gap-3 rounded-2xl border border-om-yellow bg-om-yellow/25 p-5 text-sm leading-relaxed text-om-navy">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <p>
            Bu metin bir taslaktır. Köşeli parantez içindeki alanlar şirket bilgileriyle doldurulmalı ve metin yayına
            alınmadan önce bir hukuk danışmanı tarafından gözden geçirilmelidir.
          </p>
        </div>
        <div className="mt-12 space-y-8 text-[1.02rem] leading-relaxed text-om-navy/80 [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-om-navy [&_li]:mt-2 [&_ul]:list-disc [&_ul]:pl-5">
          {children}
        </div>
      </div>
    </article>
  );
}
