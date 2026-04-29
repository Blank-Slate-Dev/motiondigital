"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Loader2, Sparkles, Wand2 } from "lucide-react";
import type { Mode } from "./mode-toggle";
import type { GenerateResult } from "./lab";

type Status = "idle" | "generating" | "complete" | "error";

type Props = {
  status: Status;
  previewUrl: string | null;
  mode: Mode;
  prompt: string;
  result: GenerateResult | null;
};

export function ResultPanel({
  status,
  previewUrl,
  mode,
  prompt,
  result,
}: Props) {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-white/[0.02] backdrop-blur-md md:aspect-[16/12] lg:aspect-square xl:aspect-[5/4]">
      <span className="absolute left-4 top-4 z-20 inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground backdrop-blur-md">
        <span className="size-1.5 rounded-full bg-[var(--color-md-accent)]" />
        {mode === "3d" ? "3D model" : "Parallax"} · preview
      </span>

      <AnimatePresence mode="wait">
        {status === "idle" && <IdleState key="idle" hasImage={!!previewUrl} />}
        {status === "generating" && (
          <GeneratingState key="generating" mode={mode} />
        )}
        {status === "complete" && (
          <CompleteState
            key="complete"
            previewUrl={previewUrl}
            mode={mode}
            prompt={prompt}
            result={result}
          />
        )}
        {status === "error" && <ErrorState key="error" />}
      </AnimatePresence>
    </div>
  );
}

function IdleState({ hasImage }: { hasImage: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center"
    >
      <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-[var(--color-md-accent)]/10 text-[var(--color-md-accent)] ring-1 ring-inset ring-[var(--color-md-accent)]/20">
        <Wand2 className="size-6" />
      </span>
      <p className="font-display text-xl font-bold tracking-tight">
        {hasImage ? "Ready when you are" : "Your scene appears here"}
      </p>
      <p className="max-w-xs text-sm text-muted-foreground">
        {hasImage
          ? "Hit Generate to send to the ML server."
          : "Drop a product photo on the left to get started."}
      </p>
    </motion.div>
  );
}

function GeneratingState({ mode }: { mode: Mode }) {
  const steps =
    mode === "3d"
      ? ["Removing background", "Reconstructing depth", "Building 3D model"]
      : ["Removing background", "Estimating depth", "Composing scene"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center"
    >
      <div className="relative flex size-28 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-[var(--color-md-accent)]/10 [animation:md-pulse-ring_2s_ease-in-out_infinite]" />
        <span className="absolute inset-3 rounded-full bg-[var(--color-md-accent)]/15 [animation:md-pulse-ring_2s_ease-in-out_infinite_0.3s]" />
        <span className="absolute inset-6 rounded-full bg-[var(--color-md-accent)]/25 [animation:md-pulse-ring_2s_ease-in-out_infinite_0.6s]" />
        <Loader2 className="relative z-10 size-7 animate-spin text-[var(--color-md-accent)]" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-display text-xl font-bold tracking-tight">
          Generating…
        </p>
        <p className="text-sm text-muted-foreground">
          Running on the local GPU.
        </p>
      </div>
      <ul className="flex flex-col gap-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        {steps.map((step, i) => (
          <motion.li
            key={step}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            · {step}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

function CompleteState({
  previewUrl,
  mode,
  prompt,
  result,
}: {
  previewUrl: string | null;
  mode: Mode;
  prompt: string;
  result: GenerateResult | null;
}) {
  // Format the bytes into a human-readable size for the info card.
  const sizeKB = result
    ? (result.received_image_bytes / 1024).toFixed(1)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="absolute inset-0"
    >
      <div
        className="md-gradient-pan absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(120% 80% at 30% 20%, rgba(255,91,31,0.45) 0%, transparent 60%),
            radial-gradient(100% 60% at 80% 90%, rgba(124,92,255,0.3) 0%, transparent 65%),
            linear-gradient(135deg, #1a0f0a 0%, #0a0a0a 50%, #060912 100%)`,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {previewUrl && (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative size-3/5"
          >
            <Image
              src={previewUrl}
              alt="Generated scene preview"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-contain drop-shadow-[0_30px_60px_rgba(255,91,31,0.35)]"
              unoptimized
            />
          </motion.div>
        </div>
      )}

      <div className="absolute inset-x-4 bottom-4 z-10 flex flex-col gap-2 rounded-xl border border-border bg-background/70 p-4 backdrop-blur-md md:inset-x-6 md:bottom-6 md:p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="size-3.5 text-[var(--color-md-accent)]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              {result ? `Job ${result.job_id}` : "Mock result"} ·{" "}
              {mode === "3d" ? "3D model mode" : "Parallax mode"}
            </span>
          </div>
          {result && (
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              {sizeKB} KB · {result.elapsed_seconds.toFixed(2)}s
            </span>
          )}
        </div>
        <p className="line-clamp-2 text-sm text-foreground">
          {prompt || "No prompt provided."}
        </p>
        <p className="text-[11px] text-muted-foreground">
          Real ML output replaces this once depth + cutout models are wired in.
        </p>
      </div>
    </motion.div>
  );
}

function ErrorState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center"
    >
      <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-destructive/15 text-destructive ring-1 ring-inset ring-destructive/30">
        <Wand2 className="size-6" />
      </span>
      <p className="font-display text-xl font-bold tracking-tight">
        Generation hit a snag
      </p>
      <p className="max-w-xs text-sm text-muted-foreground">
        Check the error message on the left for details.
      </p>
    </motion.div>
  );
}