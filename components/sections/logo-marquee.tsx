import { MarqueeRow } from "@/components/ui/marquee-row";
import { PlaceholderLogo } from "@/components/ui/placeholder-logo";

const SHAPES = ["circle", "square", "diamond", "ring", "triangle"] as const;
const LETTERS = "ABCDEFGHIJKL".split("");

const LOGOS = LETTERS.map((letter, i) => ({
  letter,
  shape: SHAPES[i % SHAPES.length],
}));

export function LogoMarquee() {
  return (
    <section
      aria-label="Trusted by"
      className="relative border-y border-border bg-background py-14 md:py-20"
    >
      <p className="mb-10 text-center font-mono text-[11px] uppercase tracking-[0.32em] text-muted-foreground">
        Trusted by teams that ship
      </p>

      <MarqueeRow durationSeconds={50} gapClassName="gap-14 md:gap-20">
        {LOGOS.map(({ letter, shape }) => (
          <div
            key={letter}
            className="opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
          >
            <PlaceholderLogo letter={letter} shape={shape} size={32} />
          </div>
        ))}
      </MarqueeRow>
    </section>
  );
}
