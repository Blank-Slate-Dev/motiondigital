import { StickyNav } from "@/components/sections/sticky-nav";
import { Hero } from "@/components/sections/hero";
import { LogoMarquee } from "@/components/sections/logo-marquee";
import { StickyScrollFeatures } from "@/components/sections/sticky-scroll-features";
import { ProjectGrid } from "@/components/sections/project-grid";
import { DragDemo } from "@/components/sections/drag-demo";
import { StatsStrip } from "@/components/sections/stats-strip";
import { ToolsMarquee } from "@/components/sections/tools-marquee";
import { HorizontalScroll } from "@/components/sections/horizontal-scroll";
import { FinalCta } from "@/components/sections/final-cta";
import { SiteFooter } from "@/components/sections/site-footer";

export default function Home() {
  return (
    <>
      <StickyNav />
      <main className="relative z-10">
        <Hero />
        <LogoMarquee />
        <StickyScrollFeatures />
        <ProjectGrid />
        <DragDemo />
        <StatsStrip />
        <ToolsMarquee />
        <HorizontalScroll />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
