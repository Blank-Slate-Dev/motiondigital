import { MarqueeRow } from "@/components/ui/marquee-row";

const TOOLS = [
  "After Effects",
  "Cinema 4D",
  "Houdini",
  "Blender",
  "Unreal",
  "TouchDesigner",
  "Figma",
  "Webflow",
  "Three.js",
  "GSAP",
  "Lottie",
  "DaVinci Resolve",
  "Spline",
  "Rive",
];

export function ToolsMarquee() {
  return (
    <section
      aria-label="Toolset"
      className="relative border-y border-border bg-background/60 py-10 md:py-14"
    >
      <p className="mb-8 text-center font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
        Built with · pipeline
      </p>
      <MarqueeRow
        durationSeconds={60}
        reverse
        gapClassName="gap-6 md:gap-10"
      >
        {TOOLS.map((tool) => (
          <div
            key={tool}
            className="flex items-center gap-6 text-muted-foreground transition-colors duration-300 hover:text-foreground md:gap-10"
          >
            <span className="whitespace-nowrap font-display text-base font-bold tracking-tight md:text-lg">
              {tool}
            </span>
            <span className="size-1 shrink-0 rounded-full bg-[var(--color-md-accent)]/70" />
          </div>
        ))}
      </MarqueeRow>
    </section>
  );
}
