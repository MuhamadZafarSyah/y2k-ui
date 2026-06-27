"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  FormInputIcon,
  SparklesIcon,
  PaletteIcon,
  ComponentIcon,
  LockIcon,
  ArrowRightIcon,
  ZapIcon,
  StarIcon,
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
type ToolStatus = "live" | "beta" | "coming-soon"
type AccentKey = "blue" | "pink" | "lilac" | "mint" | "lemon"

interface ToolCard {
  title: string
  description: string
  icon: React.ReactNode
  href?: string
  status: ToolStatus
  tag?: string
  accent: AccentKey
}

const y2kAccents = ["#8ed1fc", "#ff8fcf", "#b69cff", "#8ff0d0", "#ffe45e"] as const

const tools: ToolCard[] = [
  {
    title: "Form Builder",
    description:
      "Assemble production-ready forms visually. Drag, configure, and export React + Zod code with live Y2K preview.",
    icon: <FormInputIcon className="size-5" />,
    href: "/playground/form-builder",
    status: "live",
    tag: "NEW",
    accent: "blue",
  },
  {
    title: "Theme Generator",
    description:
      "Customize Y2K color tokens and see your design system come alive in real time.",
    icon: <PaletteIcon className="size-5" />,
    href: "/playground/theme-generator",
    status: "live",
    tag: "NEW",
    accent: "lilac",
  },
  {
    title: "Motion Playground",
    description:
      "Design CSS animations, cubic-bezier easings, and micro-interactions visually and export to your code.",
    icon: <ZapIcon className="size-5" />,
    href: "/playground/motion",
    status: "beta",
    tag: "NEW",
    accent: "pink",
  },
  {
    title: "Component Explorer",
    description:
      "Browse all Y2K components with interactive props playground and code snippets.",
    icon: <ComponentIcon className="size-5" />,
    status: "coming-soon",
    accent: "mint",
  },
  // {
  //   title: "AI Scaffolder",
  //   description:
  //     "Describe your form in natural language and let Y2K AI generate the layout for you.",
  //   icon: <SparklesIcon className="size-5" />,
  //   status: "coming-soon",
  //   accent: "lemon",
  // },
]

const statusConfig: Record<ToolStatus, { label: string; dotClass: string }> = {
  live: { label: "Live", dotClass: "bg-[#22c55e] shadow-[0_0_6px_#22c55e]" },
  beta: { label: "Beta", dotClass: "bg-[#f59e0b] shadow-[0_0_6px_#f59e0b] animate-pulse" },
  "coming-soon": { label: "Coming Soon", dotClass: "bg-[#a1a1aa]" },
}

// ── Sparkle particle data ──
const sparkles = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 6 + Math.random() * 10,
  delay: Math.random() * 2,
  duration: 1.5 + Math.random() * 2,
  color: y2kAccents[i % y2kAccents.length],
}))

export default function PlaygroundHub() {
  const heroRef = useRef<HTMLDivElement>(null!)
  const gridRef = useRef<HTMLDivElement>(null!)
  const sparkleRef = useRef<HTMLDivElement>(null!)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [mounted, setMounted] = useState(false)
  const [prefersReduced, setPrefersReduced] = useState(false)

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

      // ── Hero text stagger ──
      const heroLines = heroRef.current?.querySelectorAll("[data-hero-line]")
      if (heroLines?.length) {
        gsap.fromTo(
          heroLines,
          { y: 48, opacity: 0, rotationX: 4, filter: "blur(6px)" },
          {
            y: 0,
            opacity: 1,
            rotationX: 0,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
          }
        )
      }

      const heroSub = heroRef.current?.querySelector("[data-hero-sub]")
      if (heroSub) {
        gsap.fromTo(
          heroSub,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.5 }
        )
      }

      // ── Sparkle particles ──
      const sparkleEls = sparkleRef.current?.querySelectorAll("[data-sparkle]")
      if (sparkleEls?.length) {
        gsap.fromTo(
          sparkleEls,
          { scale: 0, opacity: 0, rotation: -30 },
          {
            scale: 1,
            opacity: (i: number) => 0.6 + (i % 3) * 0.2,
            rotation: 0,
            duration: 0.5,
            stagger: 0.04,
            ease: "back.out(2)",
            delay: 0.3,
          }
        )

        sparkleEls.forEach((el, i) => {
          const dur = 1.8 + (i % 3) * 0.6
          const delay = i * 0.15
          gsap.to(el, {
            y: -8 + (i % 4) * 4,
            rotation: 10 + (i % 5) * 6,
            scale: 0.85 + (i % 3) * 0.15,
            duration: dur,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay,
          })
        })
      }

      // ── Card stagger reveal (ScrollTrigger) ──
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[]
      if (cards.length && ScrollTriggerModule) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0, scale: 0.94 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              once: true,
            },
          }
        )
      } else if (cards.length) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0, scale: 0.94 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
            delay: 0.7,
          }
        )
      }
    })

    return () => {
      cancelled = true
      if (ScrollTriggerModule) {
        ScrollTriggerModule.getAll().forEach((st: { kill: () => void; trigger?: Element }) => {
          if (
            st.trigger === gridRef.current ||
            st.trigger === heroRef.current
          )
            st.kill()
        })
      }
    }
  }, [mounted, prefersReduced])

  // ── Card hover tilt (GSAP, only desktop) ──
  const handleCardEnter = useCallback(
    (idx: number) => (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced) return
      const card = cardRefs.current[idx]
      if (!card || typeof window === "undefined") return

      import("gsap").then(({ gsap }) => {
        const rect = card.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const rx = (e.clientY - cy) / rect.height
        const ry = (e.clientX - cx) / rect.width

        gsap.to(card, {
          rotationX: rx * -6,
          rotationY: ry * 6,
          scale: 1.03,
          z: 12,
          boxShadow: "0 8px 32px -4px rgba(27,27,58,0.2)",
          duration: 0.35,
          ease: "power2.out",
          transformPerspective: 800,
          overwrite: "auto",
        })
      })
    },
    [prefersReduced]
  )

  const handleCardLeave = useCallback(
    (idx: number) => () => {
      if (prefersReduced) return
      const card = cardRefs.current[idx]
      if (!card) return

      import("gsap").then(({ gsap }) => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          z: 0,
          boxShadow: "0 0 0 0 transparent",
          duration: 0.5,
          ease: "power3.out",
          overwrite: "auto",
        })
      })
    },
    [prefersReduced]
  )

  const handleCardMove = useCallback(
    (idx: number) => (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced) return
      const card = cardRefs.current[idx]
      if (!card) return

      import("gsap").then(({ gsap }) => {
        const rect = card.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const rx = (e.clientY - cy) / rect.height
        const ry = (e.clientX - cx) / rect.width

        gsap.to(card, {
          rotationX: rx * -6,
          rotationY: ry * 6,
          duration: 0.35,
          ease: "power2.out",
          transformPerspective: 800,
          overwrite: "auto",
        })
      })
    },
    [prefersReduced]
  )

  if (!mounted) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-16">
        <div className="mb-10 text-center sm:mb-16">
          <h1 className="mb-3 font-black text-3xl tracking-tight text-[#1b1b3a] sm:text-4xl">
            Y2K Playground
          </h1>
          <p className="mx-auto max-w-xl text-sm text-[#1b1b3a]/70">
            Interactive tools to explore, build, and export Y2K UI components
            without writing boilerplate. Click a card to start.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {tools.map((tool) => (
            <div
              key={tool.title}
              className="rounded-lg border-2 border-[#1b1b3a] bg-white p-5"
            >
              <div className="h-6 w-24 rounded bg-[#d7dde8]" />
              <div className="mt-3 h-4 w-full rounded bg-[#d7dde8]" />
              <div className="mt-2 h-4 w-2/3 rounded bg-[#d7dde8]" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-14">
      {/* ══════════════════════════════════════════ */}
      {/* Hero Section                                */}
      {/* ══════════════════════════════════════════ */}
      <div ref={heroRef} className="relative mb-12 text-center sm:mb-16">
        {/* Sparkle particles */}
        <div
          ref={sparkleRef}
          className="pointer-events-none absolute inset-0 select-none overflow-hidden"
          aria-hidden="true"
        >
          {sparkles.map((s) => (
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

        <h1 className="relative mb-4 font-black text-3xl tracking-tight text-[#1b1b3a] sm:text-4xl lg:text-5xl">
          <span data-hero-line className="block" style={{ display: "block" }}>
            Y2K{" "}
            <span
              className="inline-block rounded-md bg-[#ffe45e] px-2 py-0.5"
              style={{ border: "2px solid #1b1b3a" }}
            >
              Playground
            </span>
          </span>
        </h1>

        <p
          data-hero-sub
          className="mx-auto max-w-xl text-sm text-[#1b1b3a]/65 sm:text-base"
        >
          Interactive tools to explore, build, and export Y2K UI components
          without writing boilerplate. Click a card to start.
        </p>

        {/* Bottom decorative dots */}
        <div
          className="mt-6 flex items-center justify-center gap-2"
          aria-hidden="true"
          data-hero-sub
        >
          {y2kAccents.map((color, i) => (
            <span
              key={i}
              className="inline-block rounded-full transition-transform hover:scale-125"
              style={{
                width: 8 + (i % 3) * 2,
                height: 8 + (i % 3) * 2,
                backgroundColor: color,
                border: "1.5px solid #1b1b3a",
              }}
            />
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════ */}
      {/* Tool Card Grid                             */}
      {/* ══════════════════════════════════════════ */}
      <div ref={gridRef} className="grid gap-5 sm:grid-cols-2">
        {tools.map((tool, idx) => {
          const status = statusConfig[tool.status]
          const isDisabled = tool.status === "coming-soon"

          const CardWrapper = tool.href ? Link : "div"

          // Accent color value for inline styles
          const accentVal =
            tool.accent === "blue" ? "#8ed1fc" :
              tool.accent === "pink" ? "#ff8fcf" :
                tool.accent === "lilac" ? "#b69cff" :
                  tool.accent === "mint" ? "#8ff0d0" :
                    "#ffe45e"

          return (
            <CardWrapper
              key={tool.title}
              href={tool.href ?? "#"}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-lg border-2 border-[#1b1b3a] bg-white transition-[border-color,opacity] duration-300",
                prefersReduced
                  ? cn(isDisabled
                    ? "cursor-not-allowed opacity-60"
                    : "cursor-pointer hover:border-[#1b1b3a]")
                  : cn(isDisabled
                    ? "cursor-not-allowed opacity-65 hover:opacity-80"
                    : "cursor-pointer will-change-transform")
              )}
              style={prefersReduced ? undefined : { transformStyle: "preserve-3d", perspective: "800px" }}
              aria-disabled={isDisabled || undefined}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ref={(el: any) => { cardRefs.current[idx] = el }}
              onMouseEnter={
                !isDisabled
                  ? handleCardEnter(idx) as unknown as React.MouseEventHandler<HTMLDivElement & HTMLAnchorElement>
                  : undefined
              }
              onMouseLeave={!isDisabled ? handleCardLeave(idx) : undefined}
              onMouseMove={
                !isDisabled
                  ? handleCardMove(idx) as unknown as React.MouseEventHandler<HTMLDivElement & HTMLAnchorElement>
                  : undefined
              }
              onClick={(e: React.MouseEvent) => {
                if (isDisabled) e.preventDefault()
              }}
            >
              {/* ── Title bar ── */}
              <div
                className="flex items-center justify-between border-b-2 border-[#1b1b3a] px-3 py-1.5"
                style={{ backgroundColor: accentVal }}
              >
                <div className="flex items-center gap-2">
                  <span className="y2k-title-dots" aria-hidden>
                    <span className="rounded-full" style={{ width: 10, height: 10 }} />
                    <span className="rounded-full" style={{ width: 10, height: 10 }} />
                    <span className="rounded-full" style={{ width: 10, height: 10 }} />
                  </span>
                  <span className="font-mono text-[11px] font-black text-[#1b1b3a]">
                    {tool.title.toLowerCase().replace(/\s+/g, "-")}.app
                  </span>
                </div>
                <div className="flex gap-1.5" aria-hidden>
                  <span className="inline-block rounded-sm border-2 border-[#1b1b3a] bg-white" style={{ width: 8, height: 8 }} />
                  <span className="inline-block rounded-sm border-2 border-[#1b1b3a] bg-white" style={{ width: 8, height: 8 }} />
                </div>
              </div>

              {/* ── Body ── */}
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-start gap-3">
                  {/* Icon box */}
                  <span
                    className="flex size-10 shrink-0 items-center justify-center rounded border-2 border-[#1b1b3a] text-[#1b1b3a]"
                    style={{ backgroundColor: accentVal }}
                  >
                    {tool.icon}
                  </span>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-[#1b1b3a]">
                        {tool.title}
                      </h3>
                      {tool.tag && (
                        <span className="inline-flex rounded border-2 border-[#1b1b3a] bg-[#ff8fcf] px-1.5 py-px text-[9px] font-black text-[#1b1b3a]">
                          {tool.tag}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-[#1b1b3a]/55 line-clamp-2">
                      {tool.description}
                    </p>
                  </div>
                </div>

                {/* ── Footer: status + action ── */}
                <div className="mt-auto flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded border-2 border-[#1b1b3a] bg-[#f7f8fc] px-2 py-0.5 text-[10px] font-bold text-[#1b1b3a]">
                    <span
                      className={cn("inline-block size-1.5 rounded-full", status.dotClass)}
                    />
                    {status.label}
                  </span>

                  {isDisabled ? (
                    <span className="inline-flex items-center gap-1 rounded border-2 border-[#1b1b3a] bg-[#d7dde8] px-2 py-0.5 text-[10px] font-bold text-[#1b1b3a]/50">
                      <LockIcon className="size-2.5" />
                      Soon
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1b1b3a] transition-transform duration-200 group-hover:translate-x-0.5">
                      <span className="hidden group-hover:inline sm:inline">
                        Open tool
                      </span>
                      <ArrowRightIcon className="size-3" />
                    </span>
                  )}
                </div>
              </div>

              {/* ── Hover accent glow (live/beta only) ── */}
              {!isDisabled && (
                <div
                  className="pointer-events-none absolute inset-0 rounded-[4px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    boxShadow: `inset 0 0 24px 4px ${accentVal}40`,
                  }}
                />
              )}

              {/* ── Coming-soon pulse tease ── */}
              {isDisabled && (
                <div
                  className="pointer-events-none absolute inset-0 rounded-[4px] opacity-0 transition-all duration-500"
                  style={{
                    background: `radial-gradient(circle at 70% 30%, ${accentVal}15, transparent 60%)`,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "1" }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "0" }}
                />
              )}
            </CardWrapper>
          )
        })}
      </div>

      {/* ══════════════════════════════════════════ */}
      {/* Footer badge                               */}
      {/* ══════════════════════════════════════════ */}
      <div className="mt-12 flex justify-center sm:mt-16">
        <div className="inline-flex items-center gap-2 rounded-lg border-2 border-[#1b1b3a] bg-[#f7f8fc] px-4 py-2.5 text-xs font-semibold text-[#1b1b3a]/60">
          <StarIcon className="size-3.5 text-[#ffe45e]" />
          <span>More tools shipping soon</span>
          <span className="inline-flex items-center gap-1 rounded border-2 border-[#1b1b3a] bg-[#8ed1fc] px-1.5 py-px text-[10px] font-black text-[#1b1b3a]">
            WIP
          </span>
        </div>
      </div>
    </div>
  )
}
