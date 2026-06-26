"use client"

import { useRef, useEffect, useState, useState as useReactState, useCallback, type ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  ExternalLink,
  Copy,
  Check,
  Cpu,
  Layers,
  Box,
  Terminal,
  Star,
  MonitorPlay,
  Palette,
  Zap,
  Smile,
  Sparkles,
  Code2,
  Globe,
} from "lucide-react"

// ── Lazy GSAP loader ──
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let gsapModule: any = null
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let ScrollTriggerModule: any = null

async function loadGSAP() {
  if (gsapModule) return gsapModule
  const mod = await import("gsap")
  const st = await import("gsap/ScrollTrigger")
  gsapModule = mod.gsap
  ScrollTriggerModule = st.ScrollTrigger
  gsapModule.registerPlugin(ScrollTriggerModule)
  return gsapModule
}

// ── Types ──
interface Feature {
  icon: ReactNode
  title: string
  desc: string
  color: string
}

interface Dependency {
  name: string
  version: string
}

interface TechItem {
  name: string
  version: string
  desc: string
}

interface TemplateShowcaseProps {
  title: string
  subtitle: string
  description: string
  screenshotSrc: string
  screenshotAlt: string
  cloneCommand: string
  features: Feature[]
  componentsUsed: string[]
  dependencies: Dependency[]
  techStack: TechItem[]
  titleBarColor: string
  accentColor: string
  accentVar: string
  tag: string
  tagColor: string
  livePreviewUrl: string
  githubUrl: string
  windowTitle: string
}

const y2kAccents = ["#8ed1fc", "#ff8fcf", "#b69cff", "#8ff0d0", "#ffe45e"] as const

function CheckerPattern() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage:
          "linear-gradient(45deg, #1b1b3a 25%, transparent 25%), linear-gradient(-45deg, #1b1b3a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1b1b3a 75%), linear-gradient(-45deg, transparent 75%, #1b1b3a 75%)",
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
      }}
    />
  )
}

// ── Sparkle particle data ──
const heroSparkles = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: 3 + Math.random() * 94,
  y: 3 + Math.random() * 88,
  size: 5 + Math.random() * 9,
  delay: Math.random() * 2.5,
  color: y2kAccents[i % y2kAccents.length],
  dx: (Math.random() - 0.5) * 18,
  dy: (Math.random() - 0.5) * 14,
}))

export function TemplateShowcase({
  title,
  subtitle,
  description,
  screenshotSrc,
  screenshotAlt,
  cloneCommand,
  features,
  componentsUsed,
  dependencies,
  techStack,
  titleBarColor,
  accentColor,
  accentVar,
  tag,
  tagColor,
  livePreviewUrl,
  githubUrl,
  windowTitle,
}: TemplateShowcaseProps) {
  const [copied, setCopied] = useReactState(false)
  const [mounted, setMounted] = useReactState(false)
  const [prefersReduced, setPrefersReduced] = useReactState(false)

  const sparkleRef = useRef<HTMLDivElement>(null!)
  const heroWindowRef = useRef<HTMLDivElement>(null!)
  const backLinkRef = useRef<HTMLAnchorElement>(null!)
  const screenshotRef = useRef<HTMLDivElement>(null!)
  const featuresRef = useRef<HTMLDivElement>(null!)
  const gettingStartedRef = useRef<HTMLDivElement>(null!)
  const techSpecsRef = useRef<HTMLDivElement>(null!)
  const bottomCtaRef = useRef<HTMLDivElement>(null!)
  const featureCardRefs = useRef<(HTMLDivElement | null)[]>([])

  const handleCopy = () => {
    navigator.clipboard.writeText(cloneCommand)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    setMounted(true)
    setPrefersReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  // ── GSAP entrance animations ──
  useEffect(() => {
    if (!mounted || prefersReduced) return
    let cancelled = false

    loadGSAP().then((gsap) => {
      if (cancelled) return

      // Back link
      if (backLinkRef.current) {
        gsap.fromTo(backLinkRef.current, { x: -12, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" })
      }

      // Hero window entrance
      if (heroWindowRef.current) {
        gsap.fromTo(
          heroWindowRef.current,
          { y: 40, opacity: 0, scale: 0.97 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "power3.out", delay: 0.15 }
        )
      }

      // Hero text lines stagger
      const heroLines = heroWindowRef.current?.querySelectorAll("[data-hero-line]")
      if (heroLines?.length) {
        gsap.fromTo(heroLines, { y: 24, opacity: 0, filter: "blur(3px)" }, {
          y: 0, opacity: 1, filter: "blur(0px)",
          duration: 0.55, ease: "power3.out", stagger: 0.08, delay: 0.35,
        })
      }

      // Hero badges stagger
      const heroBadges = heroWindowRef.current?.querySelectorAll("[data-hero-badge]")
      if (heroBadges?.length) {
        gsap.fromTo(heroBadges, { scale: 0.6, opacity: 0 }, {
          scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2)", stagger: 0.05, delay: 0.25,
        })
      }

      // Hero CTA buttons
      const heroCtas = heroWindowRef.current?.querySelectorAll("[data-hero-cta]")
      if (heroCtas?.length) {
        gsap.fromTo(heroCtas, { scale: 0.9, opacity: 0 }, {
          scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.6)", stagger: 0.06, delay: 0.5,
        })
      }

      // Screenshot window
      if (screenshotRef.current) {
        gsap.fromTo(
          screenshotRef.current,
          { y: 30, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power3.out", delay: 0.55 }
        )
      }

      // Feature cards stagger + hover tilt
      const featCards = featureCardRefs.current.filter(Boolean) as HTMLDivElement[]
      if (featCards.length) {
        gsap.fromTo(
          featCards,
          { y: 40, opacity: 0, scale: 0.94 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 0.55, ease: "power3.out", stagger: 0.08, delay: 0.65,
          }
        )
      }

      // Getting Started section
      const gsChildren = gettingStartedRef.current?.children
      if (gsChildren?.length) {
        gsap.fromTo(
          gsChildren,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, ease: "power2.out", stagger: 0.07, delay: 0.8 }
        )
      }

      // Tech Specs section
      const tsChildren = techSpecsRef.current?.children
      if (tsChildren?.length) {
        gsap.fromTo(
          tsChildren,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, ease: "power2.out", stagger: 0.07, delay: 0.9 }
        )
      }

      // Bottom CTA
      if (bottomCtaRef.current) {
        gsap.fromTo(
          bottomCtaRef.current,
          { y: 24, opacity: 0, scale: 0.92 },
          { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: "back.out(1.5)", delay: 1.0 }
        )
      }

      // Floating sparkle particles
      const sparkleEls = sparkleRef.current?.querySelectorAll("[data-sparkle]")
      if (sparkleEls?.length) {
        gsap.fromTo(
          sparkleEls,
          { scale: 0, opacity: 0, rotation: -30 },
          {
            scale: 1,
            opacity: (i: number) => 0.4 + (i % 4) * 0.15,
            rotation: 0,
            duration: 0.45,
            stagger: 0.03,
            ease: "back.out(2)",
            delay: 0.15,
          }
        )
        sparkleEls.forEach((el, i) => {
          gsap.to(el, {
            x: heroSparkles[i].dx,
            y: heroSparkles[i].dy,
            scale: 0.65 + (i % 3) * 0.2,
            duration: 2 + (i % 3) * 0.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.08,
          })
        })
      }
    })

    return () => {
      cancelled = true
      if (ScrollTriggerModule) {
        ScrollTriggerModule.getAll().forEach((st: { kill: () => void }) => st.kill())
      }
    }
  }, [mounted, prefersReduced])

  // ── Feature card hover tilt ──
  const handleFeatureEnter = useCallback((idx: number) => (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced) return
    const card = featureCardRefs.current[idx]
    if (!card) return
    import("gsap").then(({ gsap }) => {
      const rect = card.getBoundingClientRect()
      const cy = rect.top + rect.height / 2
      const cx = rect.left + rect.width / 2
      const rx = (e.clientY - cy) / rect.height
      const ry = (e.clientX - cx) / rect.width
      gsap.to(card, {
        rotationX: rx * -4, rotationY: ry * 4, scale: 1.03, z: 6,
        boxShadow: "0 6px 20px -4px rgba(27,27,58,0.15)",
        duration: 0.3, ease: "power2.out",
        transformPerspective: 600, overwrite: "auto",
      })
    })
  }, [prefersReduced])

  const handleFeatureMove = useCallback((idx: number) => (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced) return
    const card = featureCardRefs.current[idx]
    if (!card) return
    import("gsap").then(({ gsap }) => {
      const rect = card.getBoundingClientRect()
      const cy = rect.top + rect.height / 2
      const cx = rect.left + rect.width / 2
      const rx = (e.clientY - cy) / rect.height
      const ry = (e.clientX - cx) / rect.width
      gsap.to(card, {
        rotationX: rx * -4, rotationY: ry * 4,
        duration: 0.3, ease: "power2.out",
        transformPerspective: 600, overwrite: "auto",
      })
    })
  }, [prefersReduced])

  const handleFeatureLeave = useCallback((idx: number) => () => {
    if (prefersReduced) return
    const card = featureCardRefs.current[idx]
    if (!card) return
    import("gsap").then(({ gsap }) => {
      gsap.to(card, {
        rotationX: 0, rotationY: 0, scale: 1, z: 0,
        boxShadow: "0 0 0 0 transparent",
        duration: 0.45, ease: "power3.out", overwrite: "auto",
      })
    })
  }, [prefersReduced])

  if (!mounted) {
    return (
      <div className="relative min-h-screen pb-20" style={{ background: "var(--y2k-panel)" }}>
        <CheckerPattern />
        <div className="mx-auto max-w-4xl px-4 py-6 sm:py-10">
          <div className="mb-6 h-6 w-32 rounded bg-[#d7dde8]" />
          <div className="rounded-lg border-[3px] border-[#1b1b3a] bg-white overflow-hidden">
            <div className="h-10 border-b-[3px] border-[#1b1b3a]" style={{ background: titleBarColor }} />
            <div className="p-6 sm:p-8">
              <div className="h-8 w-64 rounded bg-[#d7dde8] mb-3" />
              <div className="h-5 w-96 rounded bg-[#d7dde8] mb-6" />
              <div className="aspect-video rounded border-[3px] border-[#1b1b3a] bg-[#d7dde8]" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden min-h-screen pb-20" style={{ background: "var(--y2k-panel)" }}>
      <CheckerPattern />

      {/* Floating sparkles */}
      <div
        ref={sparkleRef}
        className="pointer-events-none fixed inset-0 select-none overflow-hidden z-10"
        aria-hidden="true"
      >
        {heroSparkles.map((s) => (
          <span
            key={s.id}
            data-sparkle
            className="absolute inline-block"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              opacity: prefersReduced ? 0.35 : 0,
            }}
          >
            <svg viewBox="0 0 16 16" fill={s.color} className="size-full">
              <path d="M8 0l1.5 5.5L15 4l-5.5 2.5L11 12l-3-4.5L4 11l1.5-5.5L0 4l5.5 1.5L8 0z" />
            </svg>
          </span>
        ))}
      </div>

      <div className="relative mx-auto max-w-4xl px-4 py-6 sm:py-10">
        {/* Back Link */}
        <Link
          ref={backLinkRef}
          href="/templates"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1b1b3a]/60 hover:text-[#1b1b3a] mb-6 group transition-colors"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Templates</span>
        </Link>

        {/* ══════════════════════════════════════════ */}
        {/* HERO WINDOW                                */}
        {/* ══════════════════════════════════════════ */}
        <div ref={heroWindowRef} className="rounded-lg border-[3px] border-[#1b1b3a] bg-white overflow-hidden mb-8">
          {/* Title Bar */}
          <div
            className="flex items-center justify-between border-b-[3px] border-[#1b1b3a] px-4 py-2.5"
            style={{ background: titleBarColor }}
          >
            <div className="flex items-center gap-2.5">
              <span className="y2k-title-dots" aria-hidden>
                <span className="rounded-full" style={{ width: 10, height: 10 }} />
                <span className="rounded-full" style={{ width: 10, height: 10 }} />
                <span className="rounded-full" style={{ width: 10, height: 10 }} />
              </span>
              <span className="font-mono text-xs font-black text-[#1b1b3a] uppercase tracking-wider">
                {windowTitle}
              </span>
            </div>
            <div className="flex gap-1.5" aria-hidden>
              <span className="inline-block rounded-sm border-2 border-[#1b1b3a] bg-white" style={{ width: 8, height: 8 }} />
              <span className="inline-block rounded-sm border-2 border-[#1b1b3a] bg-white" style={{ width: 8, height: 8 }} />
            </div>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8">
            {/* Hero header */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
              <div className="max-w-2xl">
                {/* Badges */}
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <span data-hero-badge className="inline-flex items-center gap-1 rounded border-2 border-[#1b1b3a] px-2 py-0.5 text-[9px] font-black uppercase text-[#1b1b3a]" style={{ background: "#8ff0d0" }}>
                    <span className="size-1.5 rounded-full bg-[#22c55e] shadow-[0_0_4px_#22c55e]" />
                    LIVE PREVIEW
                  </span>
                  <span data-hero-badge className="inline-flex items-center gap-1 rounded border-2 border-[#1b1b3a] px-2 py-0.5 text-[9px] font-black uppercase text-[#1b1b3a]" style={{ background: "#ffe45e" }}>
                    FREE TEMPLATE
                  </span>
                  <span data-hero-badge className="inline-flex items-center gap-1 rounded border-2 border-[#1b1b3a] px-1.5 py-px text-[9px] font-black text-[#1b1b3a]" style={{ background: tagColor }}>
                    <Star className="size-2.5" fill="currentColor" />
                    {tag}
                  </span>
                </div>

                {/* Headline */}
                <h1 className="font-black text-3xl tracking-tight text-[#1b1b3a] sm:text-4xl lg:text-5xl leading-[1.1]">
                  <span data-hero-line className="inline">{title}</span>
                  <span data-hero-line className="block relative">
                    <span className="relative z-10" style={{ color: accentVar }}>
                      {subtitle}
                    </span>
                    <span className="absolute inset-x-0 bottom-0.5 h-[5px] rounded-sm -z-0" style={{ background: "#ffe45e" }} />
                  </span>
                </h1>

                {/* Description */}
                <p data-hero-line className="mt-3 text-sm text-[#1b1b3a]/60 leading-relaxed max-w-lg">
                  {description}
                </p>
              </div>

              {/* CTA stack */}
              <div className="flex flex-row lg:flex-col gap-2.5 shrink-0">
                <a
                  data-hero-cta
                  href={livePreviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button variant="lemon" size="sm" className="w-full h-9 text-xs font-bold border-[2.5px] border-[#1b1b3a]">
                    <ExternalLink className="size-3.5" />
                    Live Preview
                  </Button>
                </a>
                <a
                  data-hero-cta
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button variant="outline" size="sm" className="w-full h-9 text-xs font-bold border-[2.5px] border-[#1b1b3a]">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-3.5">
                      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.1c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.07.78 2.16v3.2c0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
                    </svg>
                    View on GitHub
                  </Button>
                </a>
              </div>
            </div>

            {/* Screenshot Window */}
            <div
              ref={screenshotRef}
              className="relative rounded border-[3px] border-[#1b1b3a] bg-[#d7dde8] overflow-hidden aspect-video mb-10"
            >
              <Image
                src={screenshotSrc}
                alt={screenshotAlt}
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 1080px) 100vw, 1080px"
              />
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded border-2 border-[#1b1b3a] bg-white/90 px-2.5 py-1">
                <span className="size-2 rounded-full bg-[#8ff0d0] border border-[#1b1b3a]" />
                <span className="font-mono text-[9px] font-black text-[#1b1b3a] uppercase">
                  screenshot.png
                </span>
              </div>
            </div>

            {/* ═══════ FEATURE WINDOWS ═══════ */}
            <div ref={featuresRef} className="grid gap-4 sm:grid-cols-2 mb-10">
              {features.map((feat, idx) => (
                <div
                  key={feat.title}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  ref={(el: any) => { featureCardRefs.current[idx] = el }}
                  className="group rounded border-2 border-[#1b1b3a] bg-white overflow-hidden"
                  style={prefersReduced ? undefined : { transformStyle: "preserve-3d", perspective: "600px" }}
                  onMouseEnter={handleFeatureEnter(idx) as unknown as React.MouseEventHandler<HTMLDivElement>}
                  onMouseMove={handleFeatureMove(idx) as unknown as React.MouseEventHandler<HTMLDivElement>}
                  onMouseLeave={handleFeatureLeave(idx)}
                >
                  <div
                    className="flex items-center gap-1.5 px-3 py-1.5 border-b-2 border-[#1b1b3a]"
                    style={{ background: feat.color, opacity: 0.9 }}
                  >
                    <span className="font-mono text-[9px] font-black text-[#1b1b3a]/60 uppercase tracking-wider">
                      {feat.title.toLowerCase().replace(/\s+/g, "-")}.feature
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <span
                        className="flex size-8 shrink-0 items-center justify-center rounded border-2 border-[#1b1b3a] text-[#1b1b3a]"
                        style={{ background: feat.color }}
                      >
                        {feat.icon}
                      </span>
                      <div>
                        <h3 className="font-black text-sm text-[#1b1b3a] tracking-tight">
                          {feat.title}
                        </h3>
                        <p className="mt-1 text-xs text-[#1b1b3a]/55 leading-relaxed">
                          {feat.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Hover glow */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-[0px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ boxShadow: `inset 0 0 16px 3px ${feat.color}30` }}
                  />
                </div>
              ))}
            </div>

            {/* ═══════ GETTING STARTED + TECH SPECS ═══════ */}
            <div className="grid gap-8 md:grid-cols-2">
              {/* Getting Started */}
              <div ref={gettingStartedRef}>
                <div className="flex items-center gap-2 mb-4">
                  <Terminal className="size-4 text-[#ffe45e]" strokeWidth={3} />
                  <h2 className="font-black text-lg text-[#1b1b3a]">Getting Started</h2>
                </div>
                <p className="text-xs text-[#1b1b3a]/55 mb-4 leading-relaxed">
                  Clone the repository and spin up a local development environment in seconds.
                </p>

                {/* Terminal-styled code block */}
                <div className="relative rounded border-2 border-[#1b1b3a] bg-[#1b1b3a] text-[#8ff0d0] overflow-hidden mb-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 border-b border-white/10 bg-white/5">
                    <span className="size-2 rounded-full bg-[#ff8fcf]" />
                    <span className="size-2 rounded-full bg-[#ffe45e]" />
                    <span className="size-2 rounded-full bg-[#8ff0d0]" />
                    <span className="ml-2 font-mono text-[9px] font-bold text-white/40 uppercase tracking-wider">
                      terminal — bash
                    </span>
                  </div>
                  <div className="p-4 font-mono text-[11px] leading-relaxed overflow-x-auto">
                    <pre className="pr-12">{cloneCommand}</pre>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="absolute top-7 right-3 flex size-7 items-center justify-center rounded border border-white/15 bg-white/5 text-white/60 hover:bg-white/15 hover:text-[#8ff0d0] active:scale-95 transition-all"
                    aria-label="Copy code block"
                  >
                    {copied ? <Check className="size-3.5 text-[#8ff0d0]" /> : <Copy className="size-3.5" />}
                  </button>
                </div>

                <div className="flex items-start gap-2 rounded border-2 border-[#1b1b3a] bg-[#ffe45e]/20 px-3 py-2.5">
                  <Smile className="size-3.5 text-[#1b1b3a]/60 mt-0.5 shrink-0" />
                  <p className="text-[11px] text-[#1b1b3a]/70 leading-normal font-medium">
                    <strong className="text-[#1b1b3a]">Pro tip:</strong> Click{" "}
                    <strong className="text-[#1b1b3a]">&quot;Use this template&quot;</strong> on GitHub to
                    create your own copy instantly.
                  </p>
                </div>
              </div>

              {/* Tech Specs */}
              <div ref={techSpecsRef} className="space-y-5">
                {/* Y2K Components */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Box className="size-4 text-[#ff8fcf]" strokeWidth={3} />
                    <h2 className="font-black text-sm text-[#1b1b3a] uppercase tracking-wide">
                      Components Used
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {componentsUsed.map((comp) => (
                      <span
                        key={comp}
                        className="inline-flex items-center rounded border-2 border-[#1b1b3a] bg-white px-2 py-1 text-[10px] font-bold text-[#1b1b3a] hover:bg-[#8ed1fc]/30 transition-colors cursor-default"
                      >
                        <Code2 className="size-2.5 mr-1 text-[#1b1b3a]/40" />
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu className="size-4 text-[#8ed1fc]" strokeWidth={3} />
                    <h2 className="font-black text-sm text-[#1b1b3a] uppercase tracking-wide">
                      Tech Stack
                    </h2>
                  </div>
                  <div className="rounded border-2 border-[#1b1b3a] overflow-hidden">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-[#d7dde8] border-b-2 border-[#1b1b3a] font-black text-[#1b1b3a]">
                          <th className="p-2 border-r-2 border-[#1b1b3a]">Tech</th>
                          <th className="p-2 border-r-2 border-[#1b1b3a]">Version</th>
                          <th className="p-2">Role</th>
                        </tr>
                      </thead>
                      <tbody>
                        {techStack.map((tech, i) => (
                          <tr
                            key={tech.name}
                            className={i !== techStack.length - 1 ? "border-b border-[#1b1b3a]" : ""}
                          >
                            <td className="p-2 border-r-2 border-[#1b1b3a] font-bold text-[#1b1b3a]">
                              {tech.name}
                            </td>
                            <td className="p-2 border-r-2 border-[#1b1b3a] font-mono text-[11px] text-[#1b1b3a]/70">
                              {tech.version}
                            </td>
                            <td className="p-2 text-[#1b1b3a]/55">{tech.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Dependencies */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Layers className="size-4 text-[#8ff0d0]" strokeWidth={3} />
                    <h2 className="font-black text-sm text-[#1b1b3a] uppercase tracking-wide">
                      Key Dependencies
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {dependencies.map((dep) => (
                      <div
                        key={dep.name}
                        className="flex items-center justify-between px-2.5 py-2 rounded border-2 border-[#1b1b3a] bg-white hover:bg-[#8ed1fc]/10 transition-colors cursor-default"
                      >
                        <span className="font-bold text-[11px] text-[#1b1b3a]">{dep.name}</span>
                        <span className="font-mono text-[10px] text-[#1b1b3a]/45">{dep.version}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════ */}
        {/* BOTTOM CTA                                  */}
        {/* ══════════════════════════════════════════ */}
        <div ref={bottomCtaRef} className="text-center">
          <Link href="/templates">
            <Button variant="lemon" size="lg" className="text-sm font-black border-[2.5px] border-[#1b1b3a]">
              <Sparkles className="size-4" />
              Browse More Templates
            </Button>
          </Link>
          <p className="mt-3 text-[11px] font-mono text-[#1b1b3a]/30 font-bold">
            more templates coming soon. nya~ (◕‿◕)
          </p>
        </div>
      </div>
    </div>
  )
}
