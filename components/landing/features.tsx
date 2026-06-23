"use client";

import { Palette, Package as PackageIcon, Terminal, Layers } from "lucide-react";
import { useScrollReveal, useStaggerReveal } from "@/components/animations/use-gsap-reveal";
import { SparkleSprinkle } from "@/components/landing/sparkle";

export function Features() {
  const features = [
    { icon: Palette, title: "Y2K Design System", desc: "Thick navy outlines, pastel fills, flat windows. Consistent tokens across every component.", color: "bg-y2k-blue" },
    { icon: PackageIcon, title: "shadcn Compatible", desc: "Built on shadcn primitives. Drop-in replacement -- use the same CLI workflow you already know.", color: "bg-y2k-mint" },
    { icon: Layers, title: "Radix-Powered", desc: "Accessible, headless Radix UI under the hood. Keyboard nav, ARIA, focus management.", color: "bg-y2k-lilac" },
    { icon: Terminal, title: "CLI Install", desc: "npx y2kui add <component>. Zero config, tree-shakeable, works with any Next.js app.", color: "bg-y2k-pink" },
  ];

  const headingRef = useScrollReveal({ y: 20, delay: 0.1 });
  const vinylRef = useScrollReveal({ y: 30, delay: 0.2 });
  const cardsRef = useStaggerReveal({ y: 20, stagger: 0.12 });

  return (
    <section className="relative overflow-hidden border-b-2 border-y2k-ink bg-y2k-panel/20 py-16 md:py-24">
      <SparkleSprinkle className="absolute left-[15%] top-12 size-5 animate-wiggle text-y2k-lemon" />
      <SparkleSprinkle className="absolute right-[20%] top-20 size-4 animate-wiggle text-y2k-pink" style={{ animationDelay: '1s' }} />
      <SparkleSprinkle className="absolute bottom-20 left-[10%] size-3.5 animate-wiggle text-y2k-blue" style={{ animationDelay: '0.5s' }} />
      <SparkleSprinkle className="absolute bottom-16 right-[12%] size-5 animate-wiggle text-y2k-mint" style={{ animationDelay: '1.5s' }} />

      <div className="mx-auto max-w-6xl px-4">
        <div ref={headingRef} className="mb-12 text-center" style={{ visibility: "hidden" }}>
          <h2 className="text-2xl font-black tracking-tight text-y2k-ink md:text-3xl">Everything You Need</h2>
          <p className="mt-1.5 text-sm text-y2k-ink-muted">Production-ready components that don&apos;t compromise on personality.</p>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-5">
          <div ref={vinylRef} className="lg:col-span-2" style={{ visibility: "hidden" }}>
            <div className="overflow-hidden rounded border-2 border-y2k-ink bg-white">
              <div className="flex items-center gap-2 border-b-2 border-y2k-ink bg-y2k-mint px-3 py-1.5">
                <span className="flex items-center gap-1" aria-hidden>
                  <span className="size-2 rounded-xs border-[1.5px] border-y2k-ink bg-white" />
                  <span className="size-2 rounded-xs border-[1.5px] border-y2k-ink bg-white" />
                  <span className="size-2 rounded-xs border-[1.5px] border-y2k-ink bg-white" />
                </span>
                <span className="font-mono text-[11px] font-black uppercase tracking-tight text-y2k-ink">now_playing.exe</span>
                <span className="ml-auto flex items-center gap-1.5 text-[11px] font-semibold text-y2k-ink-muted">
                  <span className="inline-block size-1.5 rounded-full bg-y2k-pink animate-glow-pulse" />LIVE
                </span>
              </div>
              <div className="relative flex items-center justify-center p-6 md:p-8">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="size-16 rounded-full border-2 border-y2k-ink bg-y2k-pink flex items-center justify-center">
                    <span className="font-mono text-[8px] font-black text-center leading-tight text-y2k-ink">Y2K<br />UI</span>
                  </div>
                </div>
                <img src="/assets/images/10.svg" alt="Y2K vinyl record spinning" width={224} height={224} className="animate-spin-slow size-56 object-contain md:size-64" style={{ animationDuration: '10s' }} />
                <div className="absolute right-4 top-4 text-[11px] font-mono font-black text-y2k-ink/45 rotate-12 select-none" aria-hidden="true">~</div>
              </div>
              <div className="border-t-2 border-y2k-ink bg-y2k-panel/50 px-3 py-2">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-semibold text-y2k-ink-muted">
                    <span className="font-black text-y2k-ink">Now Playing:</span> y2k-retro-vibes.mp3
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="inline-block size-1.5 rounded-full bg-y2k-pink" />
                    <span className="inline-block size-1.5 rounded-full bg-y2k-blue" />
                    <span className="inline-block size-1.5 rounded-full bg-y2k-mint animate-glow-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div ref={cardsRef} className="grid gap-4 md:grid-cols-2 lg:col-span-3" style={{ visibility: "hidden" }}>
            {features.map((f) => (
              <div key={f.title} className="group rounded border-2 border-y2k-ink bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-y2k-ink">
                <div className={`mb-3 inline-flex size-9 items-center justify-center rounded border-2 border-y2k-ink ${f.color} group-hover:scale-105 transition-transform`}>
                  <f.icon className="size-4 text-y2k-ink" />
                </div>
                <h3 className="text-sm font-black text-y2k-ink">{f.title}</h3>
                <p className="mt-1 text-xs text-y2k-ink-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
