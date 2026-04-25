import { cn } from "@/lib/utils";

type Shape = "circle" | "square" | "diamond" | "ring" | "triangle";

type Props = {
  letter: string;
  shape?: Shape;
  className?: string;
  size?: number;
};

/**
 * Muted-grey monogram logo placeholder. Shape varies so the marquee row
 * doesn't read as a uniform pattern.
 */
export function PlaceholderLogo({
  letter,
  shape = "circle",
  className,
  size = 28,
}: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-zinc-400/80",
        className,
      )}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden
      >
        {shape === "circle" && (
          <circle
            cx="16"
            cy="16"
            r="13"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        )}
        {shape === "square" && (
          <rect
            x="4"
            y="4"
            width="24"
            height="24"
            rx="3"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        )}
        {shape === "diamond" && (
          <rect
            x="6"
            y="6"
            width="20"
            height="20"
            rx="2"
            transform="rotate(45 16 16)"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        )}
        {shape === "ring" && (
          <>
            <circle
              cx="16"
              cy="16"
              r="13"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle
              cx="16"
              cy="16"
              r="6"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </>
        )}
        {shape === "triangle" && (
          <path
            d="M16 4 L29 27 L3 27 Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        )}
      </svg>
      <span className="font-display text-base font-bold tracking-tight">
        {letter}
      </span>
    </span>
  );
}
