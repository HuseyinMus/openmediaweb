import { Hero } from "@/components/sections/home/hero";
import { CategoryMarquee } from "@/components/sections/home/category-marquee";
import { ValueProposition } from "@/components/sections/home/value-proposition";
import { BeforeAfterSection } from "@/components/sections/home/before-after-section";
import { ServicesPreview } from "@/components/sections/home/services-preview";
import { Showcase } from "@/components/sections/home/showcase";
import { ProcessTimeline } from "@/components/sections/home/process-timeline";
import { WhyOpenMedia } from "@/components/sections/home/why-open-media";
import { CtaBand } from "@/components/sections/cta-band";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryMarquee />
      <ValueProposition />
      <BeforeAfterSection />
      <ServicesPreview />
      <Showcase />
      <ProcessTimeline />
      <WhyOpenMedia />
      <CtaBand />
    </>
  );
}
