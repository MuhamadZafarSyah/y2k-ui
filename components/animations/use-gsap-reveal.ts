"use client"

import { useRef, useEffect } from "react"

// ── Performance: lazy-load GSAP + ScrollTrigger to avoid
//    blocking the main thread during initial page load ──
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

    let cancelled = false
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let tl: any = null

    loadGSAP().then((gsap) => {
      if (cancelled || !el) return

      const children = el.querySelectorAll("[data-reveal]")
      const targets = children.length > 0 ? children : [el]

      gsap.set(targets, {
        opacity: 0,
        y,
        x,
        visibility: "visible",
      })

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: `top ${100 - threshold * 100}%`,
          once,
        },
      })

      timeline.to(targets, {
        opacity: 1,
        y: 0,
        x: 0,
        duration,
        ease,
        stagger,
        delay,
      })

      tl = timeline
    })

    return () => {
      cancelled = true
      if (tl) {
        ;(tl as { kill?: () => void }).kill?.()
      }
      if (ScrollTriggerModule) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ScrollTriggerModule.getAll().forEach((st: any) => {
          if (st.trigger === el) st.kill()
        })
      }
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

    let cancelled = false
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let tl: any = null

    loadGSAP().then((gsap) => {
      if (cancelled || !el) return

      gsap.set(children, {
        opacity: 0,
        y,
        visibility: "visible",
      })

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: `top ${100 - threshold * 100}%`,
          once,
        },
      })

      timeline.to(children, {
        opacity: 1,
        y: 0,
        duration,
        ease,
        stagger,
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
          if (st.trigger === el) st.kill()
        })
      }
    }
  }, [y, duration, delay, ease, stagger, threshold, once])

  return ref
}
