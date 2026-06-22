"use client"

import * as React from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"

export type ProgressBarProps = {
  className?: string
}

/**
 * Y2K-styled top progress bar that appears during route navigation.
 * Watches pathname + searchParams to detect transitions.
 */
export function ProgressBar({ className }: ProgressBarProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [progress, setProgress] = React.useState(0)
  const [visible, setVisible] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Detect navigation: when pathname/search change, animate to 100% then fade
  const lastPath = React.useRef<string | null>(null)

  React.useEffect(() => {
    if (!mounted) return

    const currentPath = pathname + (searchParams?.toString() ?? "")
    if (lastPath.current === null) {
      lastPath.current = currentPath
      return
    }
    if (currentPath === lastPath.current) return

    // Path changed — start progress
    lastPath.current = currentPath
    setVisible(true)
    setProgress(8)

    // Animate towards ~85% while route is loading
    const interval = window.setInterval(() => {
      setProgress((p) => {
        if (p >= 85) return p
        // Slow down as we approach 85
        const increment = Math.max(1, (85 - p) * 0.08)
        return Math.min(85, p + increment)
      })
    }, 120)

    // Complete after a short delay (route finished)
    const completeTimeout = window.setTimeout(() => {
      window.clearInterval(interval)
      setProgress(100)
      window.setTimeout(() => {
        setVisible(false)
        // Reset after fade
        window.setTimeout(() => setProgress(0), 250)
      }, 220)
    }, 420)

    return () => {
      window.clearInterval(interval)
      window.clearTimeout(completeTimeout)
    }
  }, [pathname, searchParams, mounted])

  if (!mounted) return null

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed top-0 left-0 right-0 z-[100] h-1.5",
        className,
      )}
    >
      <div
        className={cn(
          "h-full origin-left transition-all",
          visible ? "opacity-100" : "opacity-0",
        )}
        style={{
          transform: `scaleX(${progress / 100})`,
          transitionProperty: visible
            ? "transform, opacity"
            : "transform 0.25s ease-out, opacity 0.25s ease-out",
          transitionDuration: visible ? "200ms, 0ms" : undefined,
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          className="h-full w-full"
          style={{
            backgroundColor: "#8ed1fc",
            boxShadow: "0 0 8px rgba(142, 209, 252, 0.6)",
          }}
        />
      </div>
      {/* Trailing pixel spark */}
      <div
        className={cn(
          "absolute top-0 h-1.5 w-3 transition-opacity",
          visible ? "opacity-100" : "opacity-0",
        )}
        style={{
          left: `calc(${progress}% - 12px)`,
          transition: visible
            ? "left 200ms cubic-bezier(0.4, 0, 0.2, 1)"
            : "opacity 0.25s ease-out",
        }}
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #1b1b3a 100%)",
          }}
        />
      </div>
    </div>
  )
}