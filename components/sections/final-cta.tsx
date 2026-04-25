"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { SplitWords } from "@/components/ui/split-words";

export function FinalCta() {
  return (
    <section
      id="contact"
      className="relative isolate mx-auto flex w-full max-w-7xl flex-col items-center px-6 py-32 text-center md:py-44"
    >
      {/* Animated gradient backdrop */}
      <div
        aria-hidden
        className="absolute inset-x-6 inset-y-12 -z-10 overflow-hidden rounded-3xl border border-border md:inset-x-12 md:inset-y-16"
      >
        <div
          className="md-gradient-pan absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(80% 60% at 30% 30%, rgba(255,91,31,0.45) 0%, transparent 60%), radial-gradient(60% 50% at 80% 80%, rgba(124,92,255,0.35) 0%, transparent 65%), linear-gradient(135deg, #1a0f0a 0%, #0a0a0a 50%, #0a0612 100%)",
          }}
        />
        {/* Soft scrim so text stays high contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background/60" />
        {/* Grain bias */}
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 4px)",
          }}
        />
      </div>

      <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground backdrop-blur-md">
        <span className="size-1.5 rounded-full bg-[var(--color-md-accent)] [animation:md-pulse-ring_1.6s_ease-in-out_infinite]" />
        Now booking · Q3 2026
      </span>

      <h2 className="font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl md:text-8xl lg:text-[8rem]">
        <SplitWords
          as="span"
          text="Make something"
          className="block"
          trigger="inView"
          stagger={0.08}
        />
        <SplitWords
          as="span"
          text="people remember."
          className="block bg-gradient-to-br from-[var(--color-md-accent)] via-[var(--color-md-accent-soft)] to-foreground bg-clip-text text-transparent"
          trigger="inView"
          delay={0.2}
          stagger={0.08}
        />
      </h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
      >
        Tell us about the project. We reply within one business day, and yes
        we read every brief twice.
      </motion.p>

      <motion.a
        href="mailto:hello@motion.digital"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="group mt-10 inline-flex h-14 items-center gap-3 rounded-full bg-[var(--color-md-accent)] px-7 text-base font-medium text-[var(--color-md-bg)] shadow-[0_20px_60px_-15px_rgba(255,91,31,0.6)] transition-all duration-300 hover:bg-[var(--color-md-accent-soft)] hover:shadow-[0_25px_70px_-15px_rgba(255,91,31,0.7)]"
      >
        Start a project
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
      </motion.a>

      <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        or email · hello@motion.digital
      </p>
    </section>
  );
}
