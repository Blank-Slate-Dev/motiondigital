// components/lab/prompt-input.tsx
"use client";

import { Textarea } from "@/components/ui/textarea";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const SUGGESTIONS = [
  "floating in soft clouds, slow rotation, cinematic",
  "studio plinth, dramatic spotlight, slow dolly",
  "neon grid floor, retrowave, hovering",
];

export function PromptInput({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-white/[0.02] p-5 backdrop-blur-md">
      <label
        htmlFor="prompt"
        className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground"
      >
        Describe the vibe
      </label>
      <Textarea
        id="prompt"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="floating in soft clouds, slow rotation, cinematic lighting…"
        className="min-h-24 resize-none border-0 bg-transparent p-0 text-base shadow-none focus-visible:ring-0"
      />
      <div className="flex flex-wrap gap-1.5 pt-1">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onChange(s)}
            className="rounded-full border border-border bg-white/[0.03] px-2.5 py-1 text-[11px] text-muted-foreground transition-all duration-200 hover:border-foreground/30 hover:text-foreground"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}