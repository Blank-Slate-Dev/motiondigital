"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { VideoPlaceholder } from "@/components/ui/video-placeholder";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    id: "01",
    title: "Cinematic direction",
    body: "From narrative arc to final colour grade, we treat every frame like a film. Storyboard, motion language, and pacing that earn the user's attention.",
    palette: "ember" as const,
  },
  {
    id: "02",
    title: "Built-for-web motion",
    body: "Animations that respect the medium — frame-perfect on a phone, buttery on a 144Hz display, and lighter than a single hero image.",
    palette: "violet" as const,
  },
  {
    id: "03",
    title: "Interaction as content",
    body: "Drag, scrub, scroll, hover. We design moments that reward curiosity and turn passive viewers into active explorers of the brand.",
    palette: "teal" as const,
  },
];

export function StickyScrollFeatures() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Active feature index 0..2 → highlight on left list.
  // 3 cards roughly mapped across the scroll progress.
  const activeIndex = useTransform(scrollYProgress, (v): number => {
    if (v < 0.33) return 0;
    if (v < 0.66) return 1;
    return 2;
  });

  return (
    <section
      ref={sectionRef}
      id="studio"
      className="relative mx-auto w-full max-w-7xl px-6 py-24 md:py-32 lg:py-40"
    >
      <div className="mb-16 max-w-3xl md:mb-24">
        <SectionHeading
          eyebrow="Capabilities"
          title={
            <>
              Three things we do, <br />
              <span className="text-muted-foreground">all the way through.</span>
            </>
          }
          description="A focused practice instead of a buffet. Every project lands at the intersection of direction, motion, and interaction."
        />
      </div>

      <div className="grid gap-12 md:grid-cols-12 md:gap-16">
        {/* LEFT: sticky list */}
        <aside className="md:col-span-5 md:sticky md:top-32 md:self-start">
          <ol className="flex flex-col gap-2 md:gap-3">
            {FEATURES.map((feature, i) => (
              <FeatureListItem
                key={feature.id}
                index={i}
                title={feature.title}
                id={feature.id}
                activeIndex={activeIndex}
              />
            ))}
          </ol>
          <p className="mt-10 hidden max-w-sm text-sm leading-relaxed text-muted-foreground md:block">
            Scroll through to see each capability in motion. Each card is a
            sample of how we apply that discipline in production.
          </p>
        </aside>

        {/* RIGHT: scrolling cards */}
        <div className="flex flex-col gap-8 md:col-span-7 md:gap-12">
          {FEATURES.map((feature, i) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              isLast={i === FEATURES.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureListItem({
  index,
  id,
  title,
  activeIndex,
}: {
  index: number;
  id: string;
  title: string;
  activeIndex: MotionValue<number>;
}) {
  // Per-item: opacity & color animate based on active match.
  const opacity = useTransform(activeIndex, (v) =>
    Math.round(v) === index ? 1 : 0.35,
  );
  const x = useTransform(activeIndex, (v) =>
    Math.round(v) === index ? 8 : 0,
  );
  const dotScale = useTransform(activeIndex, (v) =>
    Math.round(v) === index ? 1 : 0.45,
  );

  return (
    <motion.li
      style={{ opacity, x }}
      className="group flex items-center gap-5 py-3 transition-colors duration-300"
    >
      <motion.span
        style={{ scale: dotScale }}
        className="size-2.5 shrink-0 rounded-full bg-[var(--color-md-accent)] shadow-[0_0_24px_rgba(255,91,31,0.5)] transition-shadow duration-500"
      />
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        {id}
      </span>
      <motion.h3
        className={cn(
          "font-display text-2xl font-bold leading-tight md:text-3xl",
        )}
      >
        <ActiveTitle title={title} index={index} activeIndex={activeIndex} />
      </motion.h3>
    </motion.li>
  );
}

function ActiveTitle({
  title,
  index,
  activeIndex,
}: {
  title: string;
  index: number;
  activeIndex: MotionValue<number>;
}) {
  const color = useTransform(activeIndex, (v) =>
    Math.round(v) === index ? "var(--color-md-accent-soft)" : "#a1a1aa",
  );
  return <motion.span style={{ color }}>{title}</motion.span>;
}

function FeatureCard({
  feature,
  isLast,
}: {
  feature: (typeof FEATURES)[number];
  isLast: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "rounded-2xl border border-border bg-white/[0.02] p-5 backdrop-blur-md md:p-6",
        !isLast && "md:mb-8",
      )}
    >
      <VideoPlaceholder
        palette={feature.palette}
        speed={1.4}
        label={`CAPABILITY ${feature.id}`}
        rounded="rounded-xl"
        className="aspect-[4/3] w-full md:aspect-[16/10]"
      />
      <div className="mt-6 flex flex-col gap-3 px-1 pb-1 md:mt-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
          {feature.id} · case study
        </span>
        <h4 className="font-display text-2xl font-bold leading-tight md:text-3xl">
          {feature.title}
        </h4>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          {feature.body}
        </p>
      </div>
    </motion.article>
  );
}
