import { cn } from "@/lib/utils";
import type { CSSProperties, HTMLAttributes } from "react";

const PALETTES: Record<string, [string, string, string]> = {
  ember: ["#ff5b1f", "#7a1f10", "#1a0a06"],
  violet: ["#7c5cff", "#3a1f7a", "#0c0a1a"],
  teal: ["#1ad1c4", "#1a4a7a", "#06121a"],
  rose: ["#ff4d80", "#7a1f3f", "#1a060c"],
  amber: ["#ffb74d", "#7a4f10", "#1a0e06"],
  ice: ["#7fd1ff", "#1f4a7a", "#06101a"],
  lime: ["#a8d957", "#3f6a1f", "#0a1206"],
  cobalt: ["#5c8aff", "#1f3a7a", "#06091a"],
  magenta: ["#ff5cd1", "#7a1f6a", "#1a061a"],
};

type Palette = keyof typeof PALETTES;

type VideoPlaceholderProps = HTMLAttributes<HTMLDivElement> & {
  label?: string;
  palette?: Palette;
  /** Multiplier on the gradient pan duration. Lower = faster. */
  speed?: number;
  showLabel?: boolean;
  rounded?: string;
};

export function VideoPlaceholder({
  label = "VIDEO",
  palette = "ember",
  speed = 1,
  showLabel = true,
  rounded = "rounded-xl",
  className,
  style,
  children,
  ...rest
}: VideoPlaceholderProps) {
  const [a, b, c] = PALETTES[palette];
  const duration = `${14 * speed}s`;

  const composed: CSSProperties = {
    backgroundImage: `radial-gradient(120% 80% at 20% 10%, ${a}55 0%, transparent 60%),
      radial-gradient(100% 60% at 80% 90%, ${b}66 0%, transparent 65%),
      linear-gradient(135deg, ${a} 0%, ${b} 45%, ${c} 100%)`,
    ["--md-gradient-duration" as never]: duration,
    ...style,
  };

  return (
    <div
      {...rest}
      className={cn(
        "relative overflow-hidden md-gradient-pan",
        rounded,
        "ring-1 ring-inset ring-white/5",
        className,
      )}
      style={composed}
    >
      {/* Subtle scanlines for video feel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 1px, transparent 1px, transparent 3px)",
        }}
      />
      {/* Soft vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      {showLabel && (
        <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
          <span className="size-1.5 rounded-full bg-[var(--color-md-accent)] [animation:md-pulse-ring_1.6s_ease-in-out_infinite]" />
          {label}
        </span>
      )}
      {children}
    </div>
  );
}

export const PALETTE_KEYS = Object.keys(PALETTES) as Palette[];
