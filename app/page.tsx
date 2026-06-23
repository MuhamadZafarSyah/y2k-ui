"use client"

import Link from "next/link"
import { Suspense } from "react"
import dynamic from "next/dynamic"
import { ArrowUpRight, Palette, Package, Terminal, Layers, Star, Monitor, Cpu, Hash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { StructuredData } from "@/components/structured-data"
import { HighlightReveal } from "@/components/animations/highlight-reveal"
import { useScrollReveal } from "@/components/animations/use-gsap-reveal"
import { NavHeader } from "@/components/nav-header"
import { SparkleSprinkle } from "@/components/landing/sparkle"

// ─── Dynamic imports (code-split below-fold sections) ───
const Showcase = dynamic(() => import("@/components/landing/showcase").then((m) => ({ default: m.Showcase })))
const Features = dynamic(() => import("@/components/landing/features").then((m) => ({ default: m.Features })))
const CTASection = dynamic(() => import("@/components/landing/cta").then((m) => ({ default: m.CTA })))

// ─── Skeleton placeholder for lazy-loaded sections ───
function SectionSkeleton() {
  return (
    <section className="border-b-2 border-y2k-ink py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="animate-pulse space-y-4">
          <div className="mx-auto h-8 w-48 rounded bg-y2k-panel" />
          <div className="mx-auto h-4 w-64 rounded bg-y2k-panel" />
        </div>
      </div>
    </section>
  )
}

/* ─── Hero ─── */
function Hero() {
  const headingRef = useScrollReveal({ y: 20, delay: 0.1 })
  const subtitleRef = useScrollReveal({ y: 15, delay: 0.25 })
  const ctaRef = useScrollReveal({ y: 15, delay: 0.35 })
  const windowRef = useScrollReveal({ y: 20, delay: 0.15 })
  const rightSideRef = useScrollReveal({ y: 20, delay: 0.15 })

  return (
    <section className="relative overflow-hidden border-b-2 border-y2k-ink">
      <div className="absolute inset-0 flex pointer-events-none">
        <div className="h-full w-1/6 bg-y2k-blue/[0.07]" />
        <div className="h-full w-1/6 bg-y2k-pink/[0.07]" />
        <div className="h-full w-1/6 bg-y2k-lilac/[0.07]" />
        <div className="h-full w-1/6 bg-y2k-mint/[0.07]" />
        <div className="h-full w-1/6 bg-y2k-lemon/[0.07]" />
        <div className="h-full w-1/6 bg-y2k-pink/[0.07]" />
      </div>

      <SparkleSprinkle className="absolute left-[8%] top-16 size-4 animate-wiggle text-y2k-lemon" />
      <SparkleSprinkle className="absolute right-[12%] top-24 size-3 animate-wiggle text-y2k-pink" style={{ animationDelay: '1s' }} />
      <SparkleSprinkle className="absolute left-[5%] bottom-20 size-3.5 animate-wiggle text-y2k-blue" style={{ animationDelay: '0.5s' }} />

      <div className="relative mx-auto max-w-6xl px-4 pt-20 md:pt-24 pb-16 md:pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h1 ref={headingRef} className="text-4xl font-black tracking-tight text-y2k-ink md:text-5xl lg:text-6xl leading-[1.08]" style={{ visibility: "hidden" }}>
              Build{" "}
              <HighlightReveal delay={0.8} duration={0.7}>
                <span className="px-2 border-y-2 border-y2k-ink">Retro-Future</span>
              </HighlightReveal>{" "}
              Interfaces
            </h1>

            <p ref={subtitleRef} className="mt-4 text-base text-y2k-ink-muted md:text-lg max-w-xl leading-relaxed" style={{ visibility: "hidden" }}>
              Modern Y2K / kawaii-retro components built on{" "}
              <span className="font-semibold text-y2k-ink">shadcn</span> +{" "}
              <span className="font-semibold text-y2k-ink">Radix UI</span>.
              Flat windows, thick navy outlines, pastel fills. No nostalgia required.
            </p>

            <div ref={ctaRef} className="mt-8 flex flex-wrap items-center gap-3" style={{ visibility: "hidden" }}>
              <Link href="/docs/installation" className="group">
                <Button size="lg" variant="lemon">
                  Get Started
                  <ArrowUpRight className="size-3.5 group-hover:translate-x-1  transition-transform duration-200" />
                </Button>
              </Link>
              <Link href="/docs">
                <Button size="lg" variant="outline">
                  Browse Components
                </Button>
              </Link>
            </div>

            <div ref={windowRef} className="mt-10 flex items-center gap-2 rounded border-2 border-y2k-ink bg-y2k-panel/40 px-4 py-2.5 w-fit" style={{ visibility: "hidden" }}>
              <Terminal className="size-3.5 text-y2k-ink/50" />
              <code className="font-mono text-[11px] font-black uppercase tracking-wider text-y2k-ink">
                npx y2k-ui-lib@latest init
              </code>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div ref={rightSideRef} className="overflow-hidden rounded border-2 border-y2k-ink bg-white shadow-[4px_4px_0px_#1b1b3a] md:rotate-4! md:hover:rotate-0! md:transition-all md:duration-300!" style={{ visibility: 'hidden' }}>
              <div className="flex items-center gap-2 border-b-2 border-y2k-ink bg-y2k-mint px-3 py-1.5">
                <span className="flex items-center gap-1" aria-hidden>
                  <span className="size-2.5 rounded-xs border-[1.5px] border-y2k-ink bg-white" />
                  <span className="size-2.5 rounded-xs border-[1.5px] border-y2k-ink bg-white" />
                  <span className="size-2.5 rounded-xs border-[1.5px] border-y2k-ink bg-y2k-pink" />
                </span>
                <span className="font-mono text-[11px] font-black uppercase tracking-tight text-y2k-ink">preview.exe</span>
                <span className="ml-auto font-mono text-[10px] text-y2k-ink/60" aria-hidden="true">_ ▢ ✕</span>
              </div>

              <div className="space-y-4 p-4">
                <div className="flex flex-wrap gap-1.5">
                  <Button variant="default" size="xs">Default</Button>
                  <Button variant="pink" size="xs">Pink</Button>
                  <Button variant="blue" size="xs">Blue</Button>
                  <Button variant="mint" size="xs">Mint</Button>
                  <Button variant="lilac" size="xs">Lilac</Button>
                  <Button variant="lemon" size="xs">Lemon</Button>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="blue" size="sm">New</Badge>
                  <Badge variant="pink" size="sm">Hot</Badge>
                  <Badge variant="mint" size="sm">Stable</Badge>
                  <span className="ml-auto">
                    <Switch defaultChecked aria-label="Toggle feature" />
                  </span>
                </div>

                <div className="space-y-1.5">
                  <Progress value={85} label="CPU" showValue />
                  <Progress value={42} label="Memory" showValue indicatorClassName="bg-y2k-pink" />
                </div>

                <Input placeholder="y2k@retro.web.id" />

                <div className="flex items-center justify-between border-t-2 border-y2k-ink pt-2 text-[10px] font-mono font-bold text-y2k-ink-muted">
                  <span>30+ components</span>
                  <span className="flex items-center gap-1">
                    <span className="inline-block size-1.5 rounded-full bg-y2k-mint animate-glow-pulse" />
                    READY
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Stats Bar ─── */
function Stats() {
  const ref = useScrollReveal({ y: 20, delay: 0.1 })

  const stats = [
    { icon: Monitor, label: "Components", value: "30+" },
    { icon: Palette, label: "Color Variants", value: "8" },
    { icon: Cpu, label: "Radix Primitives", value: "100%" },
    { icon: Hash, label: "MIT License", value: "Free" },
  ]

  return (
    <section className="border-b-2 border-y2k-ink bg-y2k-panel/30 py-8 md:py-10">
      <div ref={ref} className="mx-auto max-w-6xl px-4" style={{ visibility: "hidden" }}>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-3 rounded border-2 border-y2k-ink bg-white px-4 py-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded border-2 border-y2k-ink bg-y2k-lemon">
                <s.icon className="size-4 text-y2k-ink" />
              </div>
              <div>
                <div className="font-mono text-lg font-black text-y2k-ink leading-none">{s.value}</div>
                <div className="text-[11px] font-semibold text-y2k-ink-muted">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="border-t-2 border-y2k-ink bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
        <div className="flex flex-col items-center gap-1 md:items-start">
          <span className="text-sm font-bold text-y2k-ink">Y2K UI</span>
          <span className="text-xs text-y2k-ink-muted">MIT License</span>
        </div>
        <div className="flex items-center gap-6 text-xs text-y2k-ink-muted">
          <Link href="/docs" className="hover:text-y2k-ink transition-colors">Docs</Link>
          <a href="https://github.com/MuhamadZafarSyah/y2k-ui" target="_blank" rel="noopener noreferrer" className="hover:text-y2k-ink transition-colors">GitHub</a>
          <span>&copy; 2026</span>
        </div>
      </div>
    </footer>
  )
}

/* ─── Page ─── */
export default function Home() {
  return (
    <div className="min-h-screen bg-white text-y2k-ink">
      <StructuredData type="website" />
      <StructuredData type="software" />
      <StructuredData type="faq" />
      <NavHeader />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Stats />
        <Suspense fallback={<SectionSkeleton />}>
          <Showcase />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Features />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <CTASection />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
