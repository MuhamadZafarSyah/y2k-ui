"use client"

import { useRef, useEffect, type ReactNode } from "react"

// ── Performance: lazy-load GSAP + ScrollTrigger ──
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

interface HighlightRevealProps {
  children: ReactNode
  className?: string
  color?: string
  delay?: number
  duration?: number
  threshold?: number
}

export function HighlightReveal({
  children,
  className = "",
  color = "var(--y2k-lemon)",
  delay = 0.3,
  duration = 0.8,
  threshold = 0.3,
}: HighlightRevealProps) {
  const wrapperRef = useRef<HTMLSpanElement>(null)
  const highlightRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const highlight = highlightRef.current
    if (!wrapper || !highlight) return

    let cancelled = false
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let tl: any = null

    loadGSAP().then((gsap) => {
      if (cancelled) return

      gsap.set(highlight, {
        scaleX: 0,
        transformOrigin: "left center",
      })

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: `top ${100 - threshold * 100}%`,
          once: true,
        },
      })

      timeline.to(highlight, {
        scaleX: 1,
        duration,
        ease: "power2.inOut",
        delay,
      })

      tl = timeline
    })

    return () => {
      cancelled = true
      if (tl) tl.kill?.()
      if (ScrollTriggerModule) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ScrollTriggerModule.getAll().forEach((st: any) => {
          if (st.trigger === wrapper) st.kill()
        })
      }
    }
  }, [delay, duration, threshold])

  return (
    <span
      ref={wrapperRef}
      className={`relative  ${className}`}
    >
      <span
        ref={highlightRef}
        className="absolute inset-0 -z-10 rounded-sm"
        style={{
          backgroundColor: color,
          transform: "scaleX(0)",
        }}
      />
      {children}
    </span>
  )
}
