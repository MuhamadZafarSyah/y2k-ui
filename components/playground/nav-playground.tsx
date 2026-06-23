"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { SparklesIcon, Terminal } from "lucide-react"
import { Button } from "../ui/button"

const navLinks = [
  { href: "/playground", label: "Hub", exact: true },
  { href: "/playground/form-builder", label: "Form Builder" },
]

export function NavPlayground() {
  const pathname = usePathname()

  return (
    <header className="sticky pr-3 top-0 z-50 border-b-2 border-y2k-ink bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-black tracking-tight text-y2k-ink">
          <span className="flex size-5 items-center justify-center rounded border-2 border-y2k-ink bg-y2k-lemon text-[10px] font-bold">
            Y
          </span>
          <span className="text-sm">Y2K UI</span>
        </Link>
        <nav className="flex items-center gap-3">
          <Link href="/docs" className="text-xs font-semibold text-y2k-ink/70 hover:text-y2k-ink transition-colors">
            Docs
          </Link>
          <Link href="/blocks" className="text-xs font-semibold text-y2k-ink/70 hover:text-y2k-ink transition-colors">
            Blocks
          </Link>
          <Link
            href="/playground"
            className="inline-flex items-center gap-1 rounded border-2 border-y2k-ink bg-y2k-lemon px-2 py-0.5 text-[10px] font-black text-y2k-ink transition-all hover:bg-y2k-pink hover:-translate-y-px"
          >
            Playground
            <span className="inline-flex items-center rounded border-2 border-y2k-ink bg-y2k-pink px-1 py-px text-[8px] font-black leading-none text-y2k-ink">
              NEW
            </span>
          </Link>
          <a
            href="https://github.com/MuhamadZafarSyah/y2k-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-y2k-ink/70 hover:text-y2k-ink transition-colors"
          >
            GitHub
          </a>
          <Link href="/docs/installation">
            <Button size="sm" variant="lemon">
              <Terminal className="size-3.5" />
              Install
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}
