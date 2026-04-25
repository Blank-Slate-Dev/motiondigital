"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";

type Stat = {
  value: number;
  suffix?: string;
  label: string;
};

const STATS: Stat[] = [
  { value: 120, suffix: "+", label: "Projects shipped" },
  { value: 40, suffix: "+", label: "Studio collaborators" },
  { value: 6, label: "Industry awards" },
  { value: 15, suffix: "M+", label: "Combined views" },
];

export function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative mx-auto w-full max-w-7xl px-6 py-24 md:py-32">
      <div
        ref={ref}
        className="grid grid-cols-2 gap-y-12 rounded-3xl border border-border bg-white/[0.02] px-6 py-12 backdrop-blur-md md:grid-cols-4 md:gap-0 md:px-10 md:py-16"
      >
        {STATS.map((stat, i) => (
          <Counter
            key={stat.label}
            stat={stat}
            inView={inView}
            isFirst={i === 0}
          />
        ))}
      </div>
    </section>
  );
}

function Counter({
  stat,
  inView,
  isFirst,
}: {
  stat: Stat;
  inView: boolean;
  isFirst: boolean;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => {
    // For "15M+" we want plain integer; for everything else also integer.
    return Math.round(v).toString();
  });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, stat.value, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo-ish
    });
    return controls.stop;
  }, [inView, stat.value, count]);

  return (
    <div
      className={
        // First column has no left divider; on md+ each non-first cell gets a left border
        "flex flex-col items-start gap-2 px-6 md:items-center md:px-8 md:text-center" +
        (isFirst ? "" : " md:border-l md:border-border")
      }
    >
      <span className="font-display text-5xl font-bold leading-none tracking-tight text-foreground sm:text-6xl md:text-7xl">
        <motion.span>{rounded}</motion.span>
        {stat.suffix && (
          <span className="text-[var(--color-md-accent)]">{stat.suffix}</span>
        )}
      </span>
      <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground md:text-[11px]">
        {stat.label}
      </span>
    </div>
  );
}
