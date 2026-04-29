"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import { ImageUpload } from "./image-upload";
import { PromptInput } from "./prompt-input";
import { ModeToggle, type Mode } from "./mode-toggle";
import { ResultPanel } from "./result-panel";
import { cn } from "@/lib/utils";

type Status = "idle" | "generating" | "complete" | "error";

// Shape that comes back from the FastAPI server. Mirrors GenerateResponse
// in main.py — when that file changes, update this too.
export type GenerateResult = {
  job_id: string;
  status: "mock" | "ok";
  mode: Mode;
  prompt: string;
  received_image_bytes: number;
  received_image_type: string;
  elapsed_seconds: number;
  cutout_url: string | null;
  depth_url: string | null;
  glb_url: string | null;
  scene_template: string | null;
};

export function Lab() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState<Mode>("parallax");
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const canGenerate = !!imageFile && status !== "generating";

  function handleImageSelected(file: File) {
    if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    setImageFile(file);
    setImagePreviewUrl(URL.createObjectURL(file));
    if (status === "complete" || status === "error") {
      setStatus("idle");
      setResult(null);
      setErrorMessage(null);
    }
  }

  function handleClearImage() {
    if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    setImageFile(null);
    setImagePreviewUrl(null);
    setStatus("idle");
    setResult(null);
    setErrorMessage(null);
  }

  async function handleGenerate() {
    if (!canGenerate || !imageFile) return;
    setStatus("generating");
    setErrorMessage(null);

    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("prompt", prompt);
      formData.append("mode", mode);

      const res = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.detail ?? data?.error ?? "Generation failed",
        );
      }

      setResult(data as GenerateResult);
      setStatus("complete");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setErrorMessage(message);
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-6">
      <header className="mb-12 flex flex-col gap-4">
        <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <span className="size-1.5 rounded-full bg-[var(--color-md-accent)] [animation:md-pulse-ring_1.6s_ease-in-out_infinite]" />
          Lab · pre-alpha · live ML server
        </span>
        <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
          Bring your product <br className="hidden sm:block" />
          <span className="text-muted-foreground">to life.</span>
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Drop a product photo, describe the vibe, and watch the hero scene
          come together. Wired to a live local ML server — mock responses for
          now, real models landing soon.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-12">
        <section className="flex flex-col gap-5 lg:col-span-5">
          <ImageUpload
            previewUrl={imagePreviewUrl}
            onSelect={handleImageSelected}
            onClear={handleClearImage}
          />

          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-white/[0.02] p-5 backdrop-blur-md">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              Mode
            </span>
            <ModeToggle value={mode} onChange={setMode} />
          </div>

          <PromptInput value={prompt} onChange={setPrompt} />

          <button
            type="button"
            onClick={handleGenerate}
            disabled={!canGenerate}
            className={cn(
              "group relative inline-flex h-14 items-center justify-center gap-2 overflow-hidden rounded-full text-base font-medium transition-all duration-300",
              canGenerate
                ? "bg-[var(--color-md-accent)] text-[var(--color-md-bg)] shadow-[0_20px_60px_-15px_rgba(255,91,31,0.55)] hover:bg-[var(--color-md-accent-soft)] hover:shadow-[0_25px_70px_-15px_rgba(255,91,31,0.65)]"
                : "cursor-not-allowed bg-white/[0.04] text-muted-foreground",
            )}
          >
            <AnimatePresence mode="wait" initial={false}>
              {status === "generating" ? (
                <motion.span
                  key="generating"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="flex items-center gap-2"
                >
                  <Loader2 className="size-4 animate-spin" />
                  Generating…
                </motion.span>
              ) : (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="flex items-center gap-2"
                >
                  {imageFile ? "Generate scene" : "Upload an image to begin"}
                  {canGenerate && (
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  )}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Error feedback if the ML server is down or rejected the upload */}
          <AnimatePresence>
            {status === "error" && errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive"
              >
                <p className="font-medium">Generation failed</p>
                <p className="mt-1 text-xs opacity-90">{errorMessage}</p>
                <p className="mt-2 text-xs opacity-70">
                  Is the FastAPI server running? In WSL, run{" "}
                  <code className="rounded bg-white/10 px-1 py-0.5 font-mono">
                    uvicorn main:app --reload --host 0.0.0.0 --port 8000
                  </code>
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
            <Sparkles className="mt-0.5 size-3.5 shrink-0 text-[var(--color-md-accent)]" />
            Now hitting our own GPU server. No third-party APIs, no data
            leaving the pipeline.
          </p>
        </section>

        <section className="lg:col-span-7">
          <ResultPanel
            status={status}
            previewUrl={imagePreviewUrl}
            mode={mode}
            prompt={prompt}
            result={result}
          />
        </section>
      </div>
    </div>
  );
}