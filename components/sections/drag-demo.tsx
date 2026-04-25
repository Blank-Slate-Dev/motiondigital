"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "motion/react";
import { Camera, RotateCcw } from "lucide-react";
import { useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";

export function DragDemo() {
  // Pure rotation in degrees, controlled by drag.
  const rotation = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  // Mirror motion value into React state for the readout (subscribes once).
  useMotionValueEvent(rotation, "change", (v) => {
    setDisplayValue(Math.round(((v % 360) + 360) % 360));
  });

  // Visual transforms derived from rotation.
  const sphereRotate = useTransform(rotation, (v) => `rotate(${v}deg)`);
  const tickRotate = useTransform(rotation, (v) => `rotate(${-v}deg)`);

  return (
    <section className="relative mx-auto w-full max-w-7xl px-6 py-24 md:py-32">
      <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
        {/* Copy */}
        <div className="md:col-span-5">
          <SectionHeading
            eyebrow="Interactive lab"
            title={
              <>
                Drag to rotate. <br />
                <span className="text-muted-foreground">Feel the weight.</span>
              </>
            }
            description="A taste of the kind of micro-interaction we build into product pages and brand sites — the kind that turns a static frame into something users actually touch."
          />
          <ul className="mt-8 flex flex-col gap-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-3">
              <span className="size-1.5 rounded-full bg-[var(--color-md-accent)]" />
              Pointer + touch input, momentum-aware
            </li>
            <li className="flex items-center gap-3">
              <span className="size-1.5 rounded-full bg-[var(--color-md-accent)]" />
              Reactive readouts wired straight to motion values
            </li>
            <li className="flex items-center gap-3">
              <span className="size-1.5 rounded-full bg-[var(--color-md-accent)]" />
              Reduced-motion safe — animation is disabled, dragging still works
            </li>
          </ul>
        </div>

        {/* The rig */}
        <div className="md:col-span-7">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 backdrop-blur-md md:p-10">
            {/* Top status bar */}
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                <Camera className="size-3.5 text-[var(--color-md-accent)]" />
                Camera control · live
              </div>
              <button
                type="button"
                onClick={() => rotation.set(0)}
                className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-all duration-200 hover:border-foreground/30 hover:text-foreground"
              >
                <RotateCcw className="size-3 transition-transform duration-300 group-hover:-rotate-45" />
                Reset
              </button>
            </div>

            <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center">
              {/* Backplate concentric grid */}
              <div className="absolute inset-0 rounded-full border border-border" />
              <div className="absolute inset-[12%] rounded-full border border-border/70" />
              <div className="absolute inset-[28%] rounded-full border border-border/40" />

              {/* Rotating tick ring (rotates opposite to sphere drag, like a compass dial) */}
              <motion.svg
                style={{ transform: tickRotate }}
                viewBox="0 0 100 100"
                className="absolute inset-0 size-full will-change-transform"
                aria-hidden
              >
                {Array.from({ length: 36 }).map((_, i) => (
                  <line
                    key={i}
                    x1="50"
                    y1="1.5"
                    x2="50"
                    y2={i % 3 === 0 ? 6 : 4}
                    stroke="rgba(245,245,245,0.35)"
                    strokeWidth={i % 3 === 0 ? 0.5 : 0.3}
                    transform={`rotate(${i * 10} 50 50)`}
                  />
                ))}
              </motion.svg>

              {/* Cardinal labels */}
              <div className="pointer-events-none absolute inset-0 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                <span className="absolute left-1/2 top-2 -translate-x-1/2">N</span>
                <span className="absolute right-2 top-1/2 -translate-y-1/2">E</span>
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2">S</span>
                <span className="absolute left-2 top-1/2 -translate-y-1/2">W</span>
              </div>

              {/* Draggable sphere */}
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0}
                dragMomentum
                onDrag={(_, info) => {
                  // Convert horizontal drag delta into rotation degrees.
                  rotation.set(rotation.get() + info.delta.x * 0.6);
                }}
                whileTap={{ cursor: "grabbing", scale: 0.98 }}
                whileHover={{ scale: 1.02 }}
                style={{ transform: sphereRotate }}
                className="relative size-[58%] cursor-grab touch-none rounded-full bg-gradient-to-br from-[#1a1a1a] via-[#0f0f0f] to-[#050505] shadow-[inset_0_-30px_60px_rgba(0,0,0,0.6),inset_0_20px_40px_rgba(255,255,255,0.04),0_30px_60px_-20px_rgba(255,91,31,0.25)] ring-1 ring-inset ring-white/10 will-change-transform"
              >
                {/* Highlight */}
                <span className="absolute left-[18%] top-[14%] size-[28%] rounded-full bg-white/15 blur-2xl" />
                {/* Equator stripes show rotation visibly */}
                <span
                  aria-hidden
                  className="absolute left-1/2 top-1/2 h-[88%] w-[2px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-md-accent)]/70 shadow-[0_0_12px_rgba(255,91,31,0.6)]"
                />
                <span
                  aria-hidden
                  className="absolute left-1/2 top-1/2 h-[3px] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/20"
                />
                {/* Subtle marker so rotation is unambiguous */}
                <span className="absolute left-1/2 top-[6%] size-2 -translate-x-1/2 rounded-full bg-[var(--color-md-accent)] shadow-[0_0_18px_rgba(255,91,31,0.8)]" />
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70">
                  drag
                </span>
              </motion.div>
            </div>

            {/* Readout */}
            <div className="mt-10 grid grid-cols-3 gap-3 border-t border-border pt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground md:gap-6">
              <Stat label="Yaw" value={`${displayValue.toString().padStart(3, "0")}°`} />
              <Stat label="Lens" value="35mm" />
              <Stat label="Status" value="locked" accent />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span>{label}</span>
      <span
        className={
          accent
            ? "font-display text-lg text-[var(--color-md-accent-soft)] tracking-tight normal-case md:text-xl"
            : "font-display text-lg text-foreground tracking-tight normal-case md:text-xl"
        }
      >
        {value}
      </span>
    </div>
  );
}
