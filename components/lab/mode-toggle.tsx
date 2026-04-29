// components/lab/mode-toggle.tsx
"use client";

import { Boxes, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

export type Mode = "parallax" | "3d";

const MODES: { value: Mode; label: string; sub: string; icon: typeof Boxes }[] =
  [
    {
      value: "parallax",
      label: "Parallax",
      sub: "Fast · 2.5D depth",
      icon: Layers,
    },
    {
      value: "3d",
      label: "3D Model",
      sub: "Premium · full rotation",
      icon: Boxes,
    },
  ];

type Props = {
  value: Mode;
  onChange: (mode: Mode) => void;
};

export function ModeToggle({ value, onChange }: Props) {
  return (
    <div role="radiogroup" className="grid grid-cols-2 gap-2">
      {MODES.map(({ value: v, label, sub, icon: Icon }) => {
        const active = value === v;
        return (
          <button
            key={v}
            role="radio"
            aria-checked={active}
            type="button"
            onClick={() => onChange(v)}
            className={cn(
              "group relative flex flex-col items-start gap-1 rounded-xl border p-4 text-left transition-all duration-200",
              active
                ? "border-[var(--color-md-accent)]/60 bg-[var(--color-md-accent)]/10"
                : "border-border bg-white/[0.02] hover:border-foreground/20 hover:bg-white/[0.04]",
            )}
          >
            <span
              className={cn(
                "inline-flex size-8 items-center justify-center rounded-lg ring-1 ring-inset transition-colors duration-200",
                active
                  ? "bg-[var(--color-md-accent)] text-[var(--color-md-bg)] ring-transparent"
                  : "bg-white/[0.04] text-muted-foreground ring-border group-hover:text-foreground",
              )}
            >
              <Icon className="size-4" />
            </span>
            <span className="mt-2 font-display text-sm font-bold tracking-tight">
              {label}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              {sub}
            </span>
          </button>
        );
      })}
    </div>
  );
}