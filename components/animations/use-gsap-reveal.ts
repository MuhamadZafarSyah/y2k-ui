"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface RevealOptions {
  y?: number
  x?: number
  duration?: number
  delay?: number
  ease?: string
  stagger?: number
  threshold?: number
  once?: boolean
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: RevealOptions = {}
) {
  const ref = useRef<T>(null)
  const {
    y = 40,
    x = 0,
    duration = 0.8,
    delay = 0,
    ease = "power3.out",
    stagger = 0.1,
    threshold = 0.15,
    once = true,
  } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const children = el.querySelectorAll("[data-reveal]")
    const targets = children.length > 0 ? children : [el]

    gsap.set(targets, {
      opacity: 0,
      y,
      x,
      visibility: "visible",
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: `top ${100 - threshold * 100}%`,
        once,
      },
    })

    tl.to(targets, {
      opacity: 1,
      y: 0,
      x: 0,
      duration,
      ease,
      stagger,
      delay,
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill()
      })
    }
  }, [y, x, duration, delay, ease, stagger, threshold, once])

  return ref
}

export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(
  options: RevealOptions = {}
) {
  const ref = useRef<T>(null)
  const {
    y = 30,
    duration = 0.6,
    delay = 0,
    ease = "power3.out",
    stagger = 0.08,
    threshold = 0.1,
    once = true,
  } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const children = el.children
    if (!children.length) return

    gsap.set(children, {
      opacity: 0,
      y,
      visibility: "visible",
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: `top ${100 - threshold * 100}%`,
        once,
      },
    })

    tl.to(children, {
      opacity: 1,
      y: 0,
      duration,
      ease,
      stagger,
      delay,
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill()
      })
    }
  }, [y, duration, delay, ease, stagger, threshold, once])

  return ref
}
