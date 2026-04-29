// app/lab/page.tsx
import { Lab } from "@/components/lab/lab";

export const metadata = {
  title: "Lab — Motion Digital",
  description:
    "Bring your product to life. Drop a photo, describe the vibe, get a hero scene that moves.",
};

export default function LabPage() {
  return (
    <main className="relative min-h-screen pt-32 pb-24">
      {/* Soft branded backdrop so the lab feels distinct from the marketing site */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(255,91,31,0.08) 0%, transparent 60%)",
        }}
      />
      <Lab />
    </main>
  );
}