"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { WindowControls } from "@/components/ui/window-controls"
import { Badge } from "@/components/ui/badge"
import {
  FormInputIcon,
  SparklesIcon,
  PaletteIcon,
  ComponentIcon,
  LockIcon,
} from "lucide-react"

type ToolCard = {
  title: string
  description: string
  icon: React.ReactNode
  href?: string
  status: "live" | "beta" | "coming-soon"
  tag?: string
}

const tools: ToolCard[] = [
  {
    title: "Form Builder",
    description:
      "Assemble production-ready forms visually. Drag, configure, and export React + Zod code with live Y2K preview.",
    icon: <FormInputIcon className="size-5" />,
    href: "/playground/form-builder",
    status: "live",
    tag: "NEW",
  },
  {
    title: "Theme Generator",
    description:
      "Customize Y2K color tokens and see your design system come alive in real time.",
    icon: <PaletteIcon className="size-5" />,
    href: "/playground/theme-generator",
    status: "live",
    tag: "NEW",
  },
  {
    title: "Component Explorer",
    description:
      "Browse all Y2K components with interactive props playground and code snippets.",
    icon: <ComponentIcon className="size-5" />,
    status: "coming-soon",
  },
  {
    title: "AI Scaffolder",
    description:
      "Describe your form in natural language and let Y2K AI generate the layout for you.",
    icon: <SparklesIcon className="size-5" />,
    status: "coming-soon",
  },
]

const statusConfig = {
  live: { label: "Live", variant: "mint" as const },
  beta: { label: "Beta", variant: "lemon" as const },
  "coming-soon": { label: "Coming Soon", variant: "pink" as const },
}

export default function PlaygroundHub() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-16">
      {/* Hero */}
      <div className="mb-10 text-center sm:mb-14">
        <h1 className="mb-3 font-black text-3xl tracking-tight text-[#1b1b3a] sm:text-4xl">
          Y2K Playground
        </h1>
        <p className="mx-auto max-w-xl text-sm text-[#1b1b3a]/70">
          Interactive tools to explore, build, and export Y2K UI components
          without writing boilerplate. Click a card to start.
        </p>
      </div>

      {/* Tool Grid */}
      <div className="grid gap-5 sm:grid-cols-2">
        {tools.map((tool) => {
          const status = statusConfig[tool.status]
          const isDisabled = tool.status === "coming-soon"

          const CardWrapper = tool.href ? Link : "div"

          return (
            <CardWrapper
              key={tool.title}
              href={tool.href ?? "#"}
              className={cn(
                "group relative flex flex-col rounded-lg border-2 border-[#1b1b3a] bg-white transition-all duration-200",
                isDisabled
                  ? "cursor-not-allowed opacity-60"
                  : "cursor-pointer hover:-translate-y-1"
              )}
              aria-disabled={isDisabled || undefined}
              onClick={(e: React.MouseEvent) => {
                if (isDisabled) e.preventDefault()
              }}
            >
              {/* Title bar */}
              <div className="flex items-center justify-between border-b-2 border-[#1b1b3a] bg-[#8ed1fc] px-3 py-1.5">
                <div className="flex items-center gap-2">
                  <span className="y2k-title-dots" aria-hidden>
                    <span className="rounded-full size-2" />
                    <span className="rounded-full size-2" />
                    <span className="rounded-full size-2" />
                  </span>
                  <span className="font-mono text-[11px] font-black text-[#1b1b3a]">
                    {tool.title.toLowerCase().replace(/\s+/g, "-")}.app
                  </span>
                </div>
                <WindowControls hideClose hideMaximize />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-start gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded border-2 border-[#1b1b3a] bg-[#ffe45e] text-[#1b1b3a]">
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
                    <p className="mt-1 text-xs text-[#1b1b3a]/60 line-clamp-2">
                      {tool.description}
                    </p>
                  </div>
                </div>

                <div className="mt-auto flex items-center gap-2">
                  <Badge variant={status.variant} size="sm">
                    {status.label}
                  </Badge>
                  {isDisabled && (
                    <LockIcon className="size-3 text-y2k-ink-muted" />
                  )}
                </div>
              </div>
            </CardWrapper>
          )
        })}
      </div>
    </div>
  )
}
