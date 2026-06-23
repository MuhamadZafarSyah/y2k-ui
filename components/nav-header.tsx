"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Terminal, Menu, X } from "lucide-react"

const navLinks = [
  { href: "/docs", label: "Docs" },
  { href: "/blocks", label: "Blocks" },
  { href: "/playground", label: "Playground", highlight: true, badge: "NEW" },
]

export function NavHeader() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  // ── Prevent hydration mismatch: usePathname() returns null during SSR ──
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const isActive = (href: string) => {
    if (!mounted || !pathname) return false
    if (href === "/docs") return pathname.startsWith("/docs")
    if (href === "/blocks") return pathname.startsWith("/blocks")
    if (href === "/playground") return pathname.startsWith("/playground")
    return pathname === href
  }

  return (
    <header className="sticky top-0 z-50 border-b-2 border-y2k-ink bg-white/95 backdrop-blur-sm">
      <div className="relative mx-auto flex h-12 max-w-6xl items-center justify-between gap-4 px-4">
        {/* Left: Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 font-black tracking-tight text-y2k-ink"
        >
          <span className="flex size-6 items-center justify-center rounded border-2 border-y2k-ink bg-y2k-lemon text-[11px] font-bold">
            Y
          </span>
          <span className="text-sm">Y2K UI</span>
        </Link>

        {/* Desktop navigation */}
        <div className="max-sm:hidden flex items-center gap-2">
          <nav className="flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link: { href: string; label: string; highlight?: boolean; badge?: string }) => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "inline-flex h-7 items-center gap-1 rounded-md px-2.5 text-xs font-semibold transition-all",
                    link.highlight
                      ? cn(
                        "border-2",
                        active
                          ? "border-y2k-ink bg-y2k-pink text-y2k-ink"
                          : "border-y2k-ink bg-y2k-lemon text-y2k-ink hover:bg-y2k-pink hover:-translate-y-px"
                      )
                      : active
                        ? "bg-y2k-panel text-y2k-ink"
                        : "text-y2k-ink-muted hover:bg-y2k-panel hover:text-y2k-ink"
                  )}
                >
                  {link.label}
                  {link.badge && (
                    <span className="inline-flex items-center rounded border-2 border-y2k-ink bg-y2k-pink px-1 py-px text-[10px] font-black leading-none text-y2k-ink">
                      {link.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>

          <span className="w-px h-5 bg-y2k-ink/15" />

          <div className="flex items-center gap-1.5">
            <a
              href="https://github.com/MuhamadZafarSyah/y2k-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-7 items-center gap-1.5 rounded-md border-2 border-y2k-ink bg-white px-2.5 text-xs font-semibold text-y2k-ink transition-all hover:bg-y2k-mint/40 hover:-translate-y-px"
              aria-label="GitHub repository"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-3.5">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.1c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.07.78 2.16v3.2c0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
              </svg>
              GitHub
            </a>

            <Link href="/docs/installation">
              <Button size="sm" variant="lemon" className="h-7 text-xs">
                <Terminal className="size-3.5" />
                Install
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile: install + hamburger */}
        <div className="sm:hidden flex items-center gap-1.5">
          <Link href="/docs/installation">
            <Button size="sm" variant="lemon" className="h-8 min-w-18">
              <Terminal className="size-3.5" />
              Install
            </Button>
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex size-10 items-center justify-center rounded-md border-2 border-y2k-ink bg-white text-y2k-ink hover:bg-y2k-lemon transition-all"
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown – absolutely positioned to overlay content */}
      {menuOpen && (
        <>
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 z-40 bg-y2k-ink/15  sm:hidden"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          {/* Dropdown menu */}
          <div className="absolute left-0 right-0 top-full z-50 sm:hidden border-t-2 border-y2k-ink bg-white shadow-[0_8px_16px_-8px_#1b1b3a40] animate-in slide-in-from-top-2 fade-in duration-150">
            <nav className="flex flex-col gap-1 px-4 py-3" aria-label="Mobile navigation">
              {navLinks.map((link: { href: string; label: string; highlight?: boolean; badge?: string }) => {
                const active = isActive(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-2 rounded-md border-2 px-3 py-2 text-sm font-semibold transition-all",
                      link.highlight
                        ? cn(
                          active
                            ? "border-y2k-ink bg-y2k-pink text-y2k-ink"
                            : "border-y2k-ink bg-y2k-lemon text-y2k-ink"
                        )
                        : cn(
                          active
                            ? "border-y2k-ink bg-y2k-panel text-y2k-ink"
                            : "border-y2k-ink bg-white text-y2k-ink hover:bg-y2k-panel"
                        )
                    )}
                  >
                    {link.label === "Docs" && "📄 "}
                    {link.label === "Blocks" && "🧱 "}
                    {link.label === "Playground" && "🎮 "}
                    {link.label}
                    {link.badge && (
                      <span className="ml-auto inline-flex items-center rounded border-2 border-y2k-ink bg-y2k-pink px-1.5 py-px text-[11px] font-black text-y2k-ink">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                )
              })}
              <span className="my-1 border-t-2 border-y2k-ink/15" />
              <a
                href="https://github.com/MuhamadZafarSyah/y2k-ui"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 rounded-md border-2 border-y2k-ink bg-white px-3 py-2 text-sm font-semibold text-y2k-ink hover:bg-y2k-mint/40 transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-4">
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.1c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.07.78 2.16v3.2c0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
                </svg>
                GitHub
              </a>
            </nav>
          </div>
        </>
      )}
    </header>
  )
}
