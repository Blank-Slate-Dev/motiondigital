import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { NoiseOverlay } from "@/components/ui/noise-overlay";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Motion Digital — Crafting motion-driven brand experiences",
  description:
    "Motion Digital is a creative studio building cinematic web experiences, brand films, and interactive moments that move people.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-background text-foreground font-sans selection:bg-primary/30 selection:text-foreground">
        <NoiseOverlay />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
