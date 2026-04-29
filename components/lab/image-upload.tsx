// components/lab/image-upload.tsx
"use client";

import { useCallback, useRef, useState, type DragEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ImagePlus, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  previewUrl: string | null;
  onSelect: (file: File) => void;
  onClear: () => void;
};

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

export function ImageUpload({ previewUrl, onSelect, onClear }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(
    (file: File) => {
      setError(null);
      if (!ACCEPTED_TYPES.includes(file.type)) {
        setError("PNG, JPEG, or WebP only.");
        return;
      }
      if (file.size > MAX_BYTES) {
        setError("Max file size is 10MB.");
        return;
      }
      onSelect(file);
    },
    [onSelect],
  );

  function onDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(true);
  }
  function onDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
  }
  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          // Reset so re-selecting the same file fires onChange
          e.target.value = "";
        }}
      />

      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={cn(
          "relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl border bg-white/[0.02] backdrop-blur-md transition-all duration-300",
          isDragging
            ? "border-[var(--color-md-accent)] bg-[var(--color-md-accent)]/5 ring-2 ring-[var(--color-md-accent)]/40"
            : "border-border hover:border-foreground/20",
        )}
      >
        <AnimatePresence mode="wait">
          {previewUrl ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0"
            >
              <Image
                src={previewUrl}
                alt="Uploaded product"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-contain p-6"
                unoptimized
              />
              <button
                type="button"
                onClick={onClear}
                aria-label="Remove image"
                className="absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-full border border-border bg-background/80 text-muted-foreground backdrop-blur-md transition-colors duration-200 hover:border-foreground/30 hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            </motion.div>
          ) : (
            <motion.button
              key="empty"
              type="button"
              onClick={() => inputRef.current?.click()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-[var(--color-md-accent)]/10 text-[var(--color-md-accent)] ring-1 ring-inset ring-[var(--color-md-accent)]/20">
                <ImagePlus className="size-5" />
              </span>
              <span className="font-display text-lg font-bold tracking-tight">
                Drop your product photo
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                or click to browse · png · jpg · webp · 10mb
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {error && (
        <p className="text-xs text-[var(--color-md-accent-soft)]">{error}</p>
      )}
    </div>
  );
}