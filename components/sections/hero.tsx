"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ArrowRight, Play } from "lucide-react";
import { useRef } from "react";
import { VideoPlaceholder, PALETTE_KEYS } from "@/components/ui/video-placeholder";
import { SplitWords } from "@/components/ui/split-words";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax: grid moves slower (0 → -120px) while scroll hint fades to 0.
  const gridY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -120]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate flex h-[100svh] min-h-[640px] w-full items-center justify-center overflow-hidden"
    >
      {/* Background grid of 9 animated gradient placeholders */}
      <motion.div
        aria-hidden
        style={{ y: gridY }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute inset-[-6%] grid grid-cols-3 gap-3 opacity-60 blur-[2px] md:gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <VideoPlaceholder
              key={i}
              palette={PALETTE_KEYS[i % PALETTE_KEYS.length]}
              speed={1 + (i % 3) * 0.4}
              showLabel={false}
              rounded="rounded-2xl"
              className="aspect-square w-full"
            />
          ))}
        </div>
        {/* Darken + soften */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 60% at 50% 45%, transparent 0%, rgba(10,10,10,0.55) 70%, rgba(10,10,10,0.95) 100%)",
          }}
        />
      </motion.div>

      {/* Foreground content */}
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground backdrop-blur-md"
        >
          <span className="size-1.5 rounded-full bg-[var(--color-md-accent)] [animation:md-pulse-ring_1.6s_ease-in-out_infinite]" />
          Studio reel · 2026
        </motion.span>

        <h1 className="font-display text-5xl font-bold leading-[0.95] text-foreground sm:text-7xl md:text-8xl lg:text-[8.5rem]">
          <SplitWords
            as="span"
            text="Motion that"
            className="block"
            delay={0.05}
            stagger={0.09}
          />
          <SplitWords
            as="span"
            text="moves people."
            className="block bg-gradient-to-br from-[var(--color-md-accent)] via-[var(--color-md-accent-soft)] to-foreground bg-clip-text text-transparent"
            delay={0.45}
            stagger={0.09}
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          A motion-first creative studio crafting cinematic web experiences,
          brand films, and interactive moments that earn attention and keep it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <a
            href="#contact"
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-[var(--color-md-accent)] px-6 text-sm font-medium text-[var(--color-md-bg)] transition-all duration-300 hover:bg-[var(--color-md-accent-soft)]"
          >
            Start a project
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#work"
            className="group inline-flex h-12 items-center gap-2 rounded-full border border-border bg-white/[0.03] px-6 text-sm font-medium text-foreground backdrop-blur-md transition-all duration-300 hover:border-foreground/30 hover:bg-white/[0.07]"
          >
            <Play className="size-3.5 fill-current" />
            Watch the reel
          </a>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        style={{ opacity: hintOpacity }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <span>Scroll</span>
          <div className="relative h-10 w-px overflow-hidden bg-border">
            <span className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-[var(--color-md-accent)] to-transparent [animation:md-scroll-hint_2s_ease-in-out_infinite]" />
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes md-scroll-hint {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          40% {
            opacity: 1;
          }
          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
