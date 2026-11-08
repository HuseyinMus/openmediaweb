import { CtaLink } from "@/components/primitives/cta-link";

export default function NotFound() {
  return (
    <section className="mesh-night grain relative grid min-h-[100svh] place-items-center overflow-hidden px-4 text-white">
      <div className="relative z-10 text-center">
        <p className="font-display text-[clamp(6rem,20vw,14rem)] leading-none font-semibold tracking-[-0.06em] text-om-yellow">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">Bu sayfa kadraja girmedi.</h1>
        <p className="mx-auto mt-4 max-w-md text-white/65">Aradığınız sayfa taşınmış veya hiç var olmamış olabilir.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <CtaLink href="/" variant="accent">
            Ana sayfaya dönün
          </CtaLink>
          <CtaLink href="/contact" variant="ghost-dark">
            İletişime geçin
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
