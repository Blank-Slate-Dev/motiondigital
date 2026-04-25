"use client";

import { cn } from "@/lib/utils";
import { motion, type Variants } from "motion/react";

type Props = {
  text: string;
  className?: string;
  /** Delay (s) before the stagger begins. */
  delay?: number;
  /** Stagger gap (s) between each word. */
  stagger?: number;
  /** When the parent already controls reveal timing, pass `inView`. */
  trigger?: "load" | "inView";
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: "0.55em" },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function SplitWords({
  text,
  className,
  delay = 0,
  stagger = 0.08,
  trigger = "load",
  as = "h1",
}: Props) {
  const Tag = motion[as];
  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: { delayChildren: delay, staggerChildren: stagger },
    },
  };

  const animateProps =
    trigger === "load"
      ? { initial: "hidden" as const, animate: "show" as const }
      : {
          initial: "hidden" as const,
          whileInView: "show" as const,
          viewport: { once: true, margin: "-80px" },
        };

  const words = text.split(" ");

  return (
    <Tag
      variants={containerVariants}
      {...animateProps}
      className={cn("inline-block", className)}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="mr-[0.25em] inline-block overflow-hidden align-baseline"
        >
          <motion.span variants={wordVariants} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
