"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { VideoPlaceholder } from "@/components/ui/video-placeholder";
import { SectionHeading } from "@/components/ui/section-heading";

const STEPS = [
  {
    id: "01",
    title: "Discover",
    body: "We start with the problem behind the brief — audience, business goal, what success looks like in motion.",
    palette: "ember" as const,
  },
  {
    id: "02",
    title: "Direct",
    body: "Storyboards, motion language, reference cuts. We pin the look, feel, and pacing before pixels move.",
    palette: "violet" as const,
  },
  {
    id: "03",
    title: "Build",
    body: "Designers, animators, and engineers work in the same room. Frames go straight into a working build.",
    palette: "teal" as const,
  },
  {
    id: "04",
    title: "Launch",
    body: "We ship the page, the film, and a measurement plan. Then we iterate — motion improves with data too.",
    palette: "amber" as const,
  },
];

export function HorizontalScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // 4 cards roughly the size of the viewport, plus padding. We translate the
  // track from 0 to roughly -75% so the user sees all 4 cards by the time the
  // section finishes its sticky pin.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-72%"]);

  return (
    <section
      ref={sectionRef}
      // Tall enough that the sticky inner has scroll runway = ~3 viewports.
      className="relative h-[320vh]"
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* Section header pinned along with the scroller */}
        <div className="mx-auto w-full max-w-7xl px-6 pt-24 pb-8 md:pt-28">
          <SectionHeading
            eyebrow="Process"
            title={
              <>
                Four moves, <br className="hidden sm:block" />
                <span className="text-muted-foreground">in horizontal time.</span>
              </>
            }
          />
        </div>

        {/* The horizontal track */}
        <div className="relative flex flex-1 items-center overflow-hidden">
          <motion.div
            style={{ x }}
            className="flex h-full items-center gap-6 pl-6 pr-[10vw] will-change-transform md:gap-10 md:pl-10"
          >
            {STEPS.map((step) => (
              <article
                key={step.id}
                className="relative flex h-[64vh] w-[80vw] shrink-0 flex-col gap-5 overflow-hidden rounded-3xl border border-border bg-white/[0.02] p-6 backdrop-blur-md md:h-[68vh] md:w-[42vw] md:p-8"
              >
                <VideoPlaceholder
                  palette={step.palette}
                  speed={1.3}
                  label={`STEP ${step.id}`}
                  rounded="rounded-2xl"
                  className="aspect-[16/10] w-full"
                />
                <div className="flex flex-col gap-3 px-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                    {step.id} · workflow
                  </span>
                  <h3 className="font-display text-3xl font-bold leading-tight md:text-4xl">
                    {step.title}
                  </h3>
                  <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                    {step.body}
                  </p>
                </div>
              </article>
            ))}

            {/* Trailing affordance card so the last real card lands centred */}
            <div className="flex h-[64vh] w-[12vw] shrink-0 items-center justify-end font-mono text-[10px] uppercase tracking-[0.32em] text-muted-foreground md:h-[68vh]">
              ↓ end
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
