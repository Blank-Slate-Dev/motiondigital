import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sparkles,
  Upload,
  Wand2,
  Code2,
  ArrowRight,
  Check,
  Zap,
  Boxes,
  Layers,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Gradient halo background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[50%] -translate-x-1/2 w-[1200px] h-[800px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-30%] right-[-10%] w-[800px] h-[800px] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur-xl bg-background/60">
        <div className="mx-auto max-w-7xl flex h-16 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="size-8 rounded-md bg-primary/15 border border-primary/30 flex items-center justify-center">
              <Boxes className="size-4 text-primary" />
            </div>
            <span className="font-semibold tracking-tight">Motion Digital</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <Link href="#features" className="hover:text-foreground transition">
              Features
            </Link>
            <Link href="#how" className="hover:text-foreground transition">
              How it works
            </Link>
            <Link href="#pricing" className="hover:text-foreground transition">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/sign-up">Get started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative mx-auto max-w-7xl px-6 pt-24 pb-32 text-center">
          <Badge
            variant="secondary"
            className="mb-6 bg-primary/10 text-primary border-primary/20"
          >
            <Sparkles className="size-3 mr-1.5" />
            Now in beta — join the waitlist
          </Badge>
          <h1 className="mx-auto max-w-4xl text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
            Turn your product photo into a{" "}
            <span className="text-primary">3D hero section</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
            Upload your product. Describe the vibe. Motion Digital generates a
            polished 3D animated hero section for your landing page — no
            designer, no Three.js knowledge, no friction.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" className="h-12 px-6 text-base" asChild>
              <Link href="/sign-up">
                Start creating free
                <ArrowRight className="size-4 ml-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-6 text-base"
              asChild
            >
              <Link href="#how">See how it works</Link>
            </Button>
          </div>
          <p className="mt-5 text-sm text-muted-foreground">
            No credit card required · Export to React, HTML, or embed code
          </p>

          {/* Hero preview placeholder */}
          <div className="mt-20 mx-auto max-w-5xl">
            <div className="relative rounded-2xl border border-border/60 bg-card/40 backdrop-blur aspect-video overflow-hidden shadow-2xl shadow-primary/5">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-flex size-20 rounded-2xl bg-primary/15 border border-primary/30 items-center justify-center mb-4">
                    <Layers className="size-10 text-primary" />
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Live 3D preview goes here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="mx-auto max-w-7xl px-6 py-24">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              How it works
            </Badge>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Three steps. No design skills needed.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Upload,
                step: "01",
                title: "Upload your product",
                body: "Drop in a clean product photo. We handle background removal automatically.",
              },
              {
                icon: Wand2,
                step: "02",
                title: "Describe the vibe",
                body: "Type a prompt like 'floating in soft clouds, cinematic, slow rotation'. Or tune with sliders.",
              },
              {
                icon: Code2,
                step: "03",
                title: "Export to your site",
                body: "Copy the React component or HTML embed. Paste into your landing page. Done.",
              },
            ].map(({ icon: Icon, step, title, body }) => (
              <Card
                key={step}
                className="bg-card/40 backdrop-blur border-border/60"
              >
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="size-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Icon className="size-5 text-primary" />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">
                      {step}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {body}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto max-w-7xl px-6 py-24">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Built for founders, marketers, and small teams.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Boxes,
                title: "True 3D models",
                body: "Your product becomes a real 3D object, not just a parallax effect. Rotate, zoom, and animate freely.",
              },
              {
                icon: Layers,
                title: "Parallax mode",
                body: "Prefer something lighter? Switch to 2.5D parallax for instant-loading scenes on any device.",
              },
              {
                icon: Wand2,
                title: "Prompt + sliders",
                body: "Start with a prompt, refine with sliders. Or type 'make it slower and darker' to iterate.",
              },
              {
                icon: Code2,
                title: "Framework-ready export",
                body: "Export as a React component, standalone HTML, or an embed snippet. Works anywhere.",
              },
              {
                icon: Zap,
                title: "Runs on our own GPUs",
                body: "No third-party APIs. No rate limits. Generation is fast, private, and fully under our control.",
              },
              {
                icon: Sparkles,
                title: "Scene templates",
                body: "Start from curated scene templates: floating, orbital, editorial, studio, cinematic, and more.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <Card
                key={title}
                className="bg-card/40 backdrop-blur border-border/60"
              >
                <CardContent className="p-6">
                  <div className="size-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold mb-2">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {body}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mx-auto max-w-7xl px-6 py-24">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Pricing
            </Badge>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Simple plans. Cancel anytime.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$29",
                tagline: "For side projects & indie founders",
                features: [
                  "15 hero generations / month",
                  "Parallax mode",
                  "React + HTML export",
                  "Standard support",
                ],
                cta: "Start with Starter",
                highlight: false,
              },
              {
                name: "Pro",
                price: "$79",
                tagline: "For growing startups",
                features: [
                  "50 hero generations / month",
                  "3D + Parallax modes",
                  "All scene templates",
                  "Advanced refinement",
                  "Priority support",
                ],
                cta: "Upgrade to Pro",
                highlight: true,
              },
              {
                name: "Agency",
                price: "$199",
                tagline: "For teams & agencies",
                features: [
                  "200 hero generations / month",
                  "Everything in Pro",
                  "Team seats (up to 5)",
                  "White-label export",
                  "Dedicated support",
                ],
                cta: "Go Agency",
                highlight: false,
              },
            ].map(
              ({ name, price, tagline, features, cta, highlight }) => (
                <Card
                  key={name}
                  className={
                    highlight
                      ? "bg-card border-primary/40 shadow-lg shadow-primary/10 relative"
                      : "bg-card/40 backdrop-blur border-border/60"
                  }
                >
                  {highlight && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                      Most popular
                    </Badge>
                  )}
                  <CardContent className="p-8">
                    <h3 className="text-lg font-semibold">{name}</h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      {tagline}
                    </p>
                    <div className="mt-6 flex items-baseline gap-1">
                      <span className="text-4xl font-semibold">{price}</span>
                      <span className="text-muted-foreground text-sm">
                        /month
                      </span>
                    </div>
                    <Separator className="my-6" />
                    <ul className="space-y-3">
                      {features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm">
                          <Check className="size-4 text-primary mt-0.5 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full mt-8"
                      variant={highlight ? "default" : "outline"}
                      asChild
                    >
                      <Link href="/sign-up">{cta}</Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-5xl px-6 py-24">
          <Card className="bg-gradient-to-br from-primary/10 via-card to-card border-primary/20 overflow-hidden">
            <CardContent className="p-12 md:p-16 text-center">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight max-w-2xl mx-auto">
                Ship a landing page that actually looks like{" "}
                <span className="text-primary">something</span>.
              </h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                Free to try. No credit card required. Your first hero section
                in under a minute.
              </p>
              <Button size="lg" className="mt-8 h-12 px-6" asChild>
                <Link href="/sign-up">
                  Start creating free
                  <ArrowRight className="size-4 ml-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-auto">
        <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-md bg-primary/15 border border-primary/30 flex items-center justify-center">
              <Boxes className="size-3.5 text-primary" />
            </div>
            <span className="text-sm font-medium">Motion Digital</span>
            <span className="text-xs text-muted-foreground ml-3">
              © {new Date().getFullYear()}
            </span>
          </div>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <Link
              href="https://x.com/motiondigital"
              className="hover:text-foreground transition"
            >
              X
            </Link>
            <Link
              href="https://github.com/motiondigital"
              className="hover:text-foreground transition"
            >
              GitHub
            </Link>
            <Link
              href="/privacy"
              className="hover:text-foreground transition"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-foreground transition"
            >
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}