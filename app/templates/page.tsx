"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  Monitor,
  Layout,
  Sparkles,
  ArrowRight,
  Star,
  Zap,
  Terminal,
  Download,
  Smile,
  Cpu,
  LockIcon,
  ExternalLinkIcon,
} from "lucide-react"

/* Hallmark · macrostructure: Bento Grid · tone: playful · genre: playful
 * Y2K redesign — preserved routes, copy, brand tokens. Replaced visual + interaction layer.
 */

// ── Lazy GSAP loader (follows existing project pattern) ──
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
type AccentKey = "blue" | "pink" | "mint" | "lemon"

interface TemplateCard {
  title: string
  description: string
  icon: React.ReactNode
  href?: string
  status: "live" | "coming-soon"
  tag?: string
  accent: AccentKey
  cli?: string
}

const templates: TemplateCard[] = [
  {
    title: "Personal Portfolio Y2K",
    description:
      "A retro desktop-OS styled personal portfolio template. Built using y2k-ui-lib, GSAP scroll animations, and pre-packaged with an AI hallmark design context.",
    icon: <Monitor className="size-5" />,
    href: "/templates/portfolio",
    status: "live",
    tag: "POPULAR",
    accent: "blue",
    cli: "npx y2kui add portfolio",
  },
  {
    title: "SaaS Landing Page",
    description:
      "A high-converting SaaS landing page with retro-future accents, interactive pricing grid, and retro product mockups.",
    icon: <Layout className="size-5" />,
    href: "/templates/saas-landing",
    status: "live",
    tag: "NEW",
    accent: "pink",
    cli: "npx y2kui add saas-landing",
  },
  {
    title: "Link-in-bio Console",
    description:
      "A retro handheld-console style link aggregator for creators. Lightweight, ultra-fast, and customisable.",
    icon: <Sparkles className="size-5" />,
    status: "coming-soon",
    accent: "mint",
  },
]

const y2kAccents = ["#8ed1fc", "#ff8fcf", "#b69cff", "#8ff0d0", "#ffe45e"] as const

const accentToVal = (a: AccentKey) =>
  a === "blue" ? "#8ed1fc" : a === "pink" ? "#ff8fcf" : a === "mint" ? "#8ff0d0" : "#ffe45e"

// ── Sparkle particle data for hero ──
const heroSparkles = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  x: 5 + Math.random() * 90,
  y: 5 + Math.random() * 85,
  size: 5 + Math.random() * 10,
  delay: Math.random() * 3,
  color: y2kAccents[i % y2kAccents.length],
  dx: (Math.random() - 0.5) * 20,
  dy: (Math.random() - 0.5) * 16,
}))

// ── Checkerboard background ──
function CheckerPattern() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.035]"
      style={{
        backgroundImage:
          "linear-gradient(45deg, #1b1b3a 25%, transparent 25%), linear-gradient(-45deg, #1b1b3a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1b1b3a 75%), linear-gradient(-45deg, transparent 75%, #1b1b3a 75%)",
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
      }}
    />
  )
}

export default function TemplatesHub() {
  const heroRef = useRef<HTMLDivElement>(null!)
  const sparkleRef = useRef<HTMLDivElement>(null!)
  const liveGridRef = useRef<HTMLDivElement>(null!)
  const soonGridRef = useRef<HTMLDivElement>(null!)
  const footerRef = useRef<HTMLDivElement>(null!)
  const liveCardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [mounted, setMounted] = useState(false)
  const [prefersReduced, setPrefersReduced] = useState(false)

  const liveTemplates = templates.filter((t) => t.status === "live")
  const comingSoon = templates.filter((t) => t.status === "coming-soon")

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

      // Hero text stagger
      const heroLines = heroRef.current?.querySelectorAll("[data-hero-line]")
      if (heroLines?.length) {
        gsap.fromTo(
          heroLines,
          { y: 40, opacity: 0, filter: "blur(4px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.7, ease: "power3.out", stagger: 0.1 }
        )
      }

      const heroSub = heroRef.current?.querySelector("[data-hero-sub]")
      if (heroSub) {
        gsap.fromTo(
          heroSub,
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", delay: 0.4 }
        )
      }

      // Hero badge
      const heroBadge = heroRef.current?.querySelector("[data-hero-badge]")
      if (heroBadge) {
        gsap.fromTo(
          heroBadge,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)", delay: 0.2 }
        )
      }

      // Sparkle particles
      const sparkleEls = sparkleRef.current?.querySelectorAll("[data-sparkle]")
      if (sparkleEls?.length) {
        gsap.fromTo(
          sparkleEls,
          { scale: 0, opacity: 0, rotation: -40 },
          {
            scale: 1,
            opacity: (i: number) => 0.5 + (i % 4) * 0.15,
            rotation: 0,
            duration: 0.5,
            stagger: 0.03,
            ease: "back.out(2)",
            delay: 0.3,
          }
        )
        sparkleEls.forEach((el, i) => {
          gsap.to(el, {
            x: heroSparkles[i].dx,
            y: heroSparkles[i].dy,
            scale: 0.7 + (i % 3) * 0.2,
            duration: 2 + (i % 3) * 0.6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.1,
          })
        })
      }

      // Section headings
      const sectionHeads = [liveGridRef, soonGridRef]
        .map((r) => r.current?.querySelector("[data-section-head]"))
        .filter(Boolean)

      sectionHeads.forEach((head) => {
        if (!head) return
        gsap.fromTo(
          head.children,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.06,
            scrollTrigger: {
              trigger: head,
              start: "top 90%",
              once: true,
            },
          }
        )
      })

      // Live cards stagger reveal
      const liveCards = liveCardRefs.current.filter(Boolean) as HTMLDivElement[]
      if (liveCards.length && ScrollTriggerModule) {
        gsap.fromTo(
          liveCards,
          { y: 60, opacity: 0, scale: 0.94 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 0.7, ease: "power3.out", stagger: 0.1,
            scrollTrigger: { trigger: liveGridRef.current, start: "top 82%", once: true },
          }
        )
      } else if (liveCards.length) {
        gsap.fromTo(
          liveCards,
          { y: 60, opacity: 0, scale: 0.94 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "power3.out", stagger: 0.1, delay: 0.6 }
        )
      }

      // Coming-soon cards stagger
      const soonCards = soonGridRef.current?.querySelectorAll("[data-soon-card]")
      if (soonCards?.length && ScrollTriggerModule) {
        gsap.fromTo(
          soonCards,
          { y: 40, opacity: 0, scale: 0.96 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 0.6, ease: "power3.out", stagger: 0.08,
            scrollTrigger: { trigger: soonGridRef.current, start: "top 88%", once: true },
          }
        )
      }

      // Footer CTA
      const footerCta = footerRef.current?.querySelector("[data-cta]")
      if (footerCta && ScrollTriggerModule) {
        gsap.fromTo(
          footerCta,
          { y: 30, opacity: 0, scale: 0.95 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 0.6, ease: "back.out(1.4)",
            scrollTrigger: { trigger: footerRef.current, start: "top 90%", once: true },
          }
        )
      }
    })

    return () => {
      cancelled = true
      if (ScrollTriggerModule) {
        ScrollTriggerModule.getAll().forEach((st: { kill: () => void; trigger?: Element }) => st.kill())
      }
    }
  }, [mounted, prefersReduced])

  // ── Card hover tilt ──
  const cardHoverHandlers = useCallback(
    (index: number) => {
      const enter = (e: React.MouseEvent<HTMLDivElement>) => {
        if (prefersReduced) return
        const card = liveCardRefs.current[index]
        if (!card) return
        import("gsap").then(({ gsap }) => {
          const rect = card.getBoundingClientRect()
          const cy = rect.top + rect.height / 2
          const cx = rect.left + rect.width / 2
          const rx = (e.clientY - cy) / rect.height
          const ry = (e.clientX - cx) / rect.width
          gsap.to(card, {
            rotationX: rx * -5,
            rotationY: ry * 5,
            scale: 1.025,
            z: 10,
            boxShadow: "0 8px 28px -4px rgba(27,27,58,0.18)",
            duration: 0.35,
            ease: "power2.out",
            transformPerspective: 800,
            overwrite: "auto",
          })
        })
      }
      const move = (e: React.MouseEvent<HTMLDivElement>) => {
        if (prefersReduced) return
        const card = liveCardRefs.current[index]
        if (!card) return
        import("gsap").then(({ gsap }) => {
          const rect = card.getBoundingClientRect()
          const cy = rect.top + rect.height / 2
          const cx = rect.left + rect.width / 2
          const rx = (e.clientY - cy) / rect.height
          const ry = (e.clientX - cx) / rect.width
          gsap.to(card, {
            rotationX: rx * -5,
            rotationY: ry * 5,
            duration: 0.35,
            ease: "power2.out",
            transformPerspective: 800,
            overwrite: "auto",
          })
        })
      }
      const leave = () => {
        if (prefersReduced) return
        const card = liveCardRefs.current[index]
        if (!card) return
        import("gsap").then(({ gsap }) => {
          gsap.to(card, {
            rotationX: 0, rotationY: 0, scale: 1, z: 0,
            boxShadow: "0 0 0 0 transparent",
            duration: 0.5, ease: "power3.out", overwrite: "auto",
          })
        })
      }
      return { enter, move, leave }
    },
    [prefersReduced]
  )

  if (!mounted) {
    return (
      <div className="relative min-h-screen" style={{ background: "var(--y2k-panel)" }}>
        <CheckerPattern />
        <div className="mx-auto max-w-6xl px-4 py-10 sm:py-16">
          <div className="mb-14 text-center">
            <div className="mb-4 inline-flex h-7 w-40 rounded border-2 border-[#1b1b3a] bg-white" />
            <div className="mx-auto h-10 w-64 rounded bg-[#d7dde8]" />
            <div className="mx-auto mt-5 h-5 w-96 rounded bg-[#d7dde8]" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[1, 2].map((i) => (
              <div key={i} className="rounded-lg border-2 border-[#1b1b3a] bg-white p-6">
                <div className="h-8 w-40 rounded bg-[#d7dde8]" />
                <div className="mt-4 h-4 w-full rounded bg-[#d7dde8]" />
                <div className="mt-2 h-4 w-3/4 rounded bg-[#d7dde8]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden min-h-screen" style={{ background: "var(--y2k-panel)" }}>
      <CheckerPattern />

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:py-16">
        {/* ══════════════════════════════════════════ */}
        {/* Hero                                       */}
        {/* ══════════════════════════════════════════ */}
        <section ref={heroRef} className="relative mb-14 sm:mb-20 text-center">
          {/* Sparkle particles */}
          <div
            ref={sparkleRef}
            className="pointer-events-none absolute inset-0 select-none overflow-hidden"
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
                  opacity: prefersReduced ? 0.4 : 0,
                }}
              >
                <svg viewBox="0 0 16 16" fill={s.color} className="size-full">
                  <path d="M8 0l1.5 5.5L15 4l-5.5 2.5L11 12l-3-4.5L4 11l1.5-5.5L0 4l5.5 1.5L8 0z" />
                </svg>
              </span>
            ))}
          </div>

          {/* Badge */}
          <div
            data-hero-badge
            className="inline-flex items-center gap-2 mb-4 rounded border-2 border-[#1b1b3a] bg-white px-3 py-1"
            style={{ opacity: prefersReduced ? 1 : undefined }}
          >
            <Zap className="size-3.5" style={{ color: "#ffe45e" }} fill="currentColor" />
            <span className="font-mono text-[10px] font-black text-[#1b1b3a] uppercase tracking-widest">
              Ready-to-deploy templates
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-black text-4xl tracking-tight text-[#1b1b3a] sm:text-5xl lg:text-6xl leading-[1.1]"
          >
            <span data-hero-line className="inline">
              templates/
            </span>
            <span data-hero-line className="relative inline-block ml-0.5">
              <span className="relative z-10 px-1" style={{ color: "#ff8fcf" }}>
                gallery
              </span>
              <span
                className="absolute inset-x-0 bottom-0.5 h-[6px] rounded-sm -z-0"
                style={{ backgroundColor: "#ffe45e" }}
              />
            </span>
          </h1>

          {/* Subtitle */}
          <p
            data-hero-sub
            className="mx-auto mt-5 max-w-lg text-sm sm:text-base text-[#1b1b3a]/65 leading-relaxed font-medium"
          >
            Pre-built, production-ready websites styled with our Y2K Design System.
            <br className="hidden sm:block" />
            Pick one, clone it, and ship in minutes.
          </p>

          {/* Divider dots */}
          <div className="mt-6 flex items-center justify-center gap-2" aria-hidden="true" data-hero-sub>
            {y2kAccents.map((color, i) => (
              <span
                key={i}
                className="inline-block rounded-full transition-transform hover:scale-125"
                style={{
                  width: 7 + (i % 3),
                  height: 7 + (i % 3),
                  backgroundColor: color,
                  border: "1.5px solid #1b1b3a",
                }}
              />
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════ */}
        {/* Live Templates                             */}
        {/* ══════════════════════════════════════════ */}
        <section ref={liveGridRef} className="mb-12 sm:mb-16">
          <div data-section-head className="flex items-center gap-2 mb-5">
            <Star className="size-4" style={{ color: "#ffe45e" }} fill="currentColor" />
            <h2 className="font-black text-xs text-[#1b1b3a] uppercase tracking-[0.2em]">
              Available Templates
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {liveTemplates.map((tpl, idx) => {
              const accentVal = accentToVal(tpl.accent)
              const hover = cardHoverHandlers(idx)

              return (
                <Link
                  key={tpl.title}
                  href={tpl.href ?? "#"}
                  className="group block"
                  tabIndex={0}
                >
                  <div
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    ref={(el: any) => { liveCardRefs.current[idx] = el }}
                    className="relative h-full rounded-lg border-[3px] border-[#1b1b3a] bg-white flex flex-col overflow-hidden"
                    style={prefersReduced ? undefined : { transformStyle: "preserve-3d", perspective: "800px" }}
                    onMouseEnter={hover.enter as unknown as React.MouseEventHandler<HTMLDivElement>}
                    onMouseMove={hover.move as unknown as React.MouseEventHandler<HTMLDivElement>}
                    onMouseLeave={hover.leave}
                  >
                    {/* Title bar */}
                    <div
                      className="flex items-center justify-between border-b-[3px] border-[#1b1b3a] px-4 py-2.5"
                      style={{ background: accentVal }}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="y2k-title-dots" aria-hidden>
                          <span className="rounded-full" style={{ width: 10, height: 10 }} />
                          <span className="rounded-full" style={{ width: 10, height: 10 }} />
                          <span className="rounded-full" style={{ width: 10, height: 10 }} />
                        </span>
                        <span className="font-mono text-[11px] font-black text-[#1b1b3a] uppercase tracking-wider">
                          {tpl.title.toLowerCase().replace(/\s+/g, "-")}.app
                        </span>
                      </div>
                      <div className="flex gap-1.5" aria-hidden>
                        <span className="inline-block rounded-sm border-2 border-[#1b1b3a] bg-white" style={{ width: 8, height: 8 }} />
                        <span className="inline-block rounded-sm border-2 border-[#1b1b3a] bg-white" style={{ width: 8, height: 8 }} />
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2.5 flex-wrap mb-3">
                          <span
                            className="inline-flex size-10 shrink-0 items-center justify-center rounded border-[2.5px] border-[#1b1b3a] text-[#1b1b3a]"
                            style={{ background: accentVal }}
                          >
                            {tpl.icon}
                          </span>
                          <div>
                            <h3 className="font-black text-lg text-[#1b1b3a] tracking-tight leading-tight">
                              {tpl.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="inline-flex items-center gap-1 rounded border-2 border-[#1b1b3a] px-2 py-0.5 text-[10px] font-black uppercase text-[#1b1b3a]" style={{ background: "#8ff0d0" }}>
                                <span className="size-1.5 rounded-full bg-[#22c55e] shadow-[0_0_4px_#22c55e]" />
                                Live Preview
                              </span>
                              {tpl.tag && (
                                <span className="inline-flex rounded border-2 border-[#1b1b3a] bg-[#ff8fcf] px-1.5 py-px text-[9px] font-black text-[#1b1b3a]">
                                  {tpl.tag}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <p className="text-sm text-[#1b1b3a]/65 leading-relaxed">
                          {tpl.description}
                        </p>
                      </div>

                      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-1.5 rounded border-2 border-[#1b1b3a] px-3 py-1.5 text-xs font-bold text-[#1b1b3a] bg-[#ffe45e] group-hover:bg-[#ff8fcf] transition-colors">
                          <Download className="size-3.5" />
                          Explore Template
                          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                        </span>
                        {tpl.cli && (
                          <span className="text-[10px] font-mono text-[#1b1b3a]/40">
                            {tpl.cli}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Corner badge */}
                    {tpl.tag === "POPULAR" && (
                      <div className="absolute -top-2.5 -right-2.5 size-6 rounded border-2 border-[#1b1b3a] bg-[#ffe45e] flex items-center justify-center rotate-12">
                        <Star className="size-3 text-[#1b1b3a]" fill="currentColor" />
                      </div>
                    )}

                    {/* Hover glow */}
                    <div
                      className="pointer-events-none absolute inset-0 rounded-[4px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ boxShadow: `inset 0 0 24px 4px ${accentVal}40` }}
                    />
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* ══════════════════════════════════════════ */}
        {/* Coming Soon                                */}
        {/* ══════════════════════════════════════════ */}
        <section ref={soonGridRef}>
          <div data-section-head className="flex items-center gap-2 mb-5">
            <Cpu className="size-4" style={{ color: "#b69cff" }} />
            <h2 className="font-black text-xs text-[#1b1b3a] uppercase tracking-[0.2em]">
              In Development
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {comingSoon.map((tpl) => {
              const accentVal = accentToVal(tpl.accent)
              return (
                <div
                  key={tpl.title}
                  data-soon-card
                  className="group relative rounded-lg border-2 border-[#1b1b3a] bg-white overflow-hidden cursor-default"
                >
                  {/* Title bar */}
                  <div
                    className="flex items-center justify-between px-3 py-1.5 border-b-2 border-[#1b1b3a]"
                    style={{ background: accentVal }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="y2k-title-dots" aria-hidden>
                        <span className="rounded-full" style={{ width: 8, height: 8 }} />
                        <span className="rounded-full" style={{ width: 8, height: 8 }} />
                        <span className="rounded-full" style={{ width: 8, height: 8 }} />
                      </span>
                      <span className="font-mono text-[10px] font-black text-[#1b1b3a] uppercase tracking-wider">
                        {tpl.title.toLowerCase().replace(/\s+/g, "-")}.tpl
                      </span>
                    </div>
                    <div className="flex items-center gap-1 rounded border border-[#1b1b3a]/15 bg-white/80 px-1.5 py-0.5">
                      <span className="size-1.5 rounded-full bg-[#ff8fcf] animate-pulse" />
                      <span className="font-mono text-[8px] text-[#1b1b3a]/30 font-bold">WIP</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <span
                        className="flex size-9 shrink-0 items-center justify-center rounded border-2 border-[#1b1b3a] text-[#1b1b3a]"
                        style={{ background: accentVal }}
                      >
                        {tpl.icon}
                      </span>
                      <div>
                        <h3 className="font-black text-sm text-[#1b1b3a] tracking-tight">
                          {tpl.title}
                        </h3>
                        <p className="mt-1.5 text-xs text-[#1b1b3a]/55 leading-relaxed">
                          {tpl.description}
                        </p>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-4 pt-3 border-t-2 border-dashed border-[#1b1b3a]/10">
                      <span className="inline-flex items-center gap-1 rounded border-2 border-[#1b1b3a] px-2 py-0.5 text-[10px] font-black uppercase text-[#1b1b3a]" style={{ background: "#ff8fcf" }}>
                        <span className="size-1.5 rounded-full bg-[#1b1b3a]/40" />
                        Coming Soon
                      </span>
                      <div className="mt-2.5 h-1.5 w-full rounded-full border-[1.5px] border-[#1b1b3a] bg-[#d7dde8] overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: "35%",
                            background: `linear-gradient(90deg, ${accentVal}, color-mix(in oklch, ${accentVal} 60%, white))`,
                            animation: prefersReduced ? "none" : "shimmer-progress 2.5s ease-in-out infinite",
                          }}
                        />
                      </div>
                      <p className="mt-1.5 font-mono text-[9px] text-[#1b1b3a]/30 font-bold">
                        building... 35%
                      </p>
                    </div>
                  </div>

                  {/* Hover color tease */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-[4px] opacity-0 transition-all duration-500"
                    style={{ background: `radial-gradient(circle at 70% 30%, ${accentVal}12, transparent 60%)` }}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = "1" }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = "0" }}
                  />
                </div>
              )
            })}
          </div>
        </section>

        {/* ══════════════════════════════════════════ */}
        {/* Footer CTA                                 */}
        {/* ══════════════════════════════════════════ */}
        <section ref={footerRef} className="mt-16 sm:mt-20 text-center">
          <div
            data-cta
            className="inline-flex flex-col items-center gap-4 rounded-lg border-[3px] border-[#1b1b3a] bg-white px-8 py-6"
          >
            <Smile className="size-6" style={{ color: "#ffe45e" }} />
            <p className="font-black text-sm text-[#1b1b3a]">
              Got a template idea?
            </p>
            <p className="text-xs text-[#1b1b3a]/55 max-w-xs">
              We&apos;re building more templates. Suggest one on GitHub and we might ship it next.
            </p>
            <a
              href="https://github.com/MuhamadZafarSyah/y2k-ui/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded border-2 border-[#1b1b3a] bg-[#ffe45e] px-4 py-1.5 text-xs font-bold text-[#1b1b3a] hover:bg-[#ff8fcf] transition-colors"
            >
              <ExternalLinkIcon className="size-3.5" />
              Request a Template
            </a>
          </div>
        </section>
      </div>

      {/* Shimmer progress keyframe injected via style tag */}
      <style>{`
        @keyframes shimmer-progress {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
