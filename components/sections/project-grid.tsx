"use client";

import { motion, type Variants } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { VideoPlaceholder } from "@/components/ui/video-placeholder";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

type Tile = {
  title: string;
  category: string;
  palette:
    | "ember"
    | "violet"
    | "teal"
    | "rose"
    | "amber"
    | "ice"
    | "lime"
    | "cobalt"
    | "magenta";
  /** Tailwind aspect ratio for masonry variation */
  aspect: string;
  /** Optional column span for desktop */
  colSpan?: string;
};

const TILES: Tile[] = [
  {
    title: "Nocturne — brand film",
    category: "Film direction",
    palette: "ember",
    aspect: "aspect-[4/5]",
    colSpan: "md:col-span-4",
  },
  {
    title: "Halo — product launch",
    category: "Web experience",
    palette: "violet",
    aspect: "aspect-[16/10]",
    colSpan: "md:col-span-8",
  },
  {
    title: "Aurora — interactive type",
    category: "Motion lab",
    palette: "teal",
    aspect: "aspect-square",
    colSpan: "md:col-span-5",
  },
  {
    title: "Spire — campaign site",
    category: "Web experience",
    palette: "rose",
    aspect: "aspect-[5/6]",
    colSpan: "md:col-span-4",
  },
  {
    title: "Fieldwork — short doc",
    category: "Film direction",
    palette: "amber",
    aspect: "aspect-[3/4]",
    colSpan: "md:col-span-3",
  },
  {
    title: "Drift — generative UI",
    category: "Motion lab",
    palette: "cobalt",
    aspect: "aspect-[16/11]",
    colSpan: "md:col-span-12",
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const tileVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function ProjectGrid() {
  return (
    <section
      id="work"
      className="relative mx-auto w-full max-w-7xl px-6 py-24 md:py-32"
    >
      <div className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end">
        <SectionHeading
          eyebrow="Selected work"
          title={
            <>
              Frames from the <br className="hidden sm:block" />
              cutting room.
            </>
          }
        />
        <a
          href="#"
          className="group inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.03] px-4 py-2 text-sm text-foreground transition-all duration-300 hover:border-foreground/30 hover:bg-white/[0.07]"
        >
          View all work
          <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-12 md:gap-4"
      >
        {TILES.map((tile) => (
          <motion.article
            key={tile.title}
            variants={tileVariants}
            className={cn("group relative", tile.colSpan)}
          >
            <a
              href="#"
              className={cn(
                "relative block overflow-hidden rounded-2xl border border-border bg-card",
                "transition-transform duration-500 ease-out will-change-transform",
                "hover:scale-[1.03]",
              )}
            >
              {/* The placeholder switches to fast pan on hover via group-hover utility */}
              <div className={cn("relative w-full", tile.aspect)}>
                <VideoPlaceholder
                  palette={tile.palette}
                  speed={1.6}
                  label={tile.category.toUpperCase()}
                  rounded="rounded-none"
                  className="absolute inset-0 transition-[animation-duration] duration-300 group-hover:[animation-duration:5s]"
                />
              </div>

              {/* Hover overlay with title */}
              <div className="pointer-events-none absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                {/* Static lower-left label always visible */}
                <div className="flex items-end justify-between gap-4 opacity-90 transition-opacity duration-300 group-hover:opacity-0">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/70">
                      {tile.category}
                    </p>
                  </div>
                </div>
                {/* Hover-revealed full title block */}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:p-6">
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-md-accent-soft)]">
                    {tile.category}
                  </p>
                  <h3 className="font-display text-xl font-bold leading-tight text-white md:text-2xl">
                    {tile.title}
                  </h3>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs text-white/80">
                    View case study
                    <ArrowUpRight className="size-3.5" />
                  </span>
                </div>
              </div>
            </a>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
