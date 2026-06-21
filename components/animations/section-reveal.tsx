"use client"

import { useRef, useEffect, type ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface SectionRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  threshold?: number
}

export function SectionReveal({
  children,
  className = "",
  delay = 0,
  threshold = 0.1,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    gsap.set(el, {
      opacity: 0,
      y: 50,
      visibility: "visible",
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: `top ${100 - threshold * 100}%`,
        once: true,
      },
    })

    tl.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      delay,
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill()
      })
    }
  }, [delay, threshold])

  return (
    <div ref={ref} className={className} style={{ visibility: "hidden" }}>
      {children}
    </div>
  )
}
