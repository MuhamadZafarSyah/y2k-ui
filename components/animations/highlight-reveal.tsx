"use client"

import { useRef, useEffect, type ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
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

    gsap.set(highlight, {
      scaleX: 0,
      transformOrigin: "left center",
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: `top ${100 - threshold * 100}%`,
        once: true,
      },
    })

    tl.to(highlight, {
      scaleX: 1,
      duration,
      ease: "power2.inOut",
      delay,
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === wrapper) st.kill()
      })
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
