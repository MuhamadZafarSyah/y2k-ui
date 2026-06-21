"use client"

import { useRef, useEffect, type ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface TextRevealProps {
  children: ReactNode
  className?: string
  tag?: "h1" | "h2" | "h3" | "p" | "span"
  delay?: number
  duration?: number
  stagger?: number
  splitBy?: "chars" | "words"
  threshold?: number
}

export function TextReveal({
  children,
  className = "",
  tag = "p",
  delay = 0,
  duration = 0.6,
  stagger = 0.03,
  splitBy = "words",
  threshold = 0.2,
}: TextRevealProps) {
  const containerRef = useRef<HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el || typeof children !== "string") return

    const text = children as string
    const parts =
      splitBy === "words"
        ? text.split(/(\s+)/)
        : text.split("")

    el.innerHTML = ""
    const spans: HTMLSpanElement[] = []

    parts.forEach((part) => {
      if (splitBy === "words" && /^\s+$/.test(part)) {
        el.appendChild(document.createTextNode(part))
      } else {
        const span = document.createElement("span")
        span.style.display = "inline-block"
        span.style.willChange = "transform, opacity"
        span.textContent = part
        el.appendChild(span)
        spans.push(span)
      }
    })

    gsap.set(spans, { opacity: 0, y: 20 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: `top ${100 - threshold * 100}%`,
        once: true,
      },
    })

    tl.to(spans, {
      opacity: 1,
      y: 0,
      duration,
      ease: "power3.out",
      stagger: splitBy === "chars" ? stagger : stagger * 3,
      delay,
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill()
      })
    }
  }, [children, duration, stagger, splitBy, threshold, delay])

  const Tag = tag

  return (
    <Tag
      ref={containerRef as never}
      className={`overflow-hidden ${className}`}
    />
  )
}
