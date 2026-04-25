import Link from "next/link";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Studio",
    links: [
      { label: "About", href: "#" },
      { label: "Process", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
    ],
  },
  {
    title: "Work",
    links: [
      { label: "Selected", href: "#work" },
      { label: "Films", href: "#" },
      { label: "Web", href: "#" },
      { label: "Motion lab", href: "#" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contact", href: "#contact" },
      { label: "Newsletter", href: "#" },
      { label: "Brief", href: "#" },
      { label: "FAQ", href: "#" },
    ],
  },
];

const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "Vimeo", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Are.na", href: "#" },
];

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-border bg-background">
      <div className="mx-auto w-full max-w-7xl px-6 pb-10 pt-16 md:pb-12 md:pt-24">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Logo + tagline */}
          <div className="md:col-span-4">
            <Link
              href="/"
              className="font-display text-xl font-bold tracking-tight text-foreground"
              aria-label="Motion Digital"
            >
              motion<span className="text-[var(--color-md-accent)]">.</span>
              digital
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A motion-first creative studio. We build cinematic web
              experiences and brand films from a small studio in two cities.
            </p>
          </div>

          {/* Three link columns */}
          <div className="grid grid-cols-3 gap-8 md:col-span-8 md:gap-10">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                  {col.title}
                </p>
                <ul className="flex flex-col gap-3 text-sm">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-foreground/85 transition-colors duration-200 hover:text-[var(--color-md-accent-soft)]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Socials row */}
        <div className="mt-14 flex flex-wrap items-center gap-x-5 gap-y-3 md:mt-20">
          {SOCIALS.map((s, i) => (
            <span key={s.label} className="flex items-center gap-5">
              <Link
                href={s.href}
                className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                {s.label}
              </Link>
              {i < SOCIALS.length - 1 && (
                <span className="size-1 rounded-full bg-border" aria-hidden />
              )}
            </span>
          ))}
        </div>

        {/* Copyright bar */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Motion Digital · All rights reserved</span>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <span>v0.1 — placeholder build</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
