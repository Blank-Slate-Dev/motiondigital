import { cn } from "@/lib/utils";
import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Duration in seconds for one full loop. */
  durationSeconds?: number;
  /** Reverse direction. */
  reverse?: boolean;
  /** Tailwind padding/spacing between items, e.g. "gap-12". */
  gapClassName?: string;
  className?: string;
  pauseOnHover?: boolean;
};

/**
 * Pure-CSS infinite marquee. Children are rendered twice in a row and
 * translated by -50% to keep the loop seamless. Uses `aria-hidden` on the
 * duplicate to avoid a screen reader reading content twice.
 */
export function MarqueeRow({
  children,
  durationSeconds = 40,
  reverse = false,
  gapClassName = "gap-16",
  className,
  pauseOnHover = true,
}: Props) {
  const style: CSSProperties = {
    ["--md-marquee-duration" as never]: `${durationSeconds}s`,
    animationDirection: reverse ? "reverse" : "normal",
  };

  return (
    <div
      className={cn(
        "group relative flex w-full overflow-hidden",
        // soft fade on the edges
        "[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-max flex-none shrink-0 items-center",
          gapClassName,
          "md-marquee pr-16",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
        style={style}
      >
        <div className={cn("flex shrink-0 items-center", gapClassName)}>
          {children}
        </div>
        <div
          className={cn("flex shrink-0 items-center", gapClassName)}
          aria-hidden
        >
          {children}
        </div>
      </div>
    </div>
  );
}
