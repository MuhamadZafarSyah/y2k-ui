"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { CodeBlock } from "./code-block"
import {
  Maximize2Icon,
  Minimize2Icon,
  MonitorIcon,
  TabletIcon,
  SmartphoneIcon,
  ExternalLinkIcon,
} from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

export type BlockPreviewProps = {
  name: string
  title: string
  description: string
  category: string
  preview: React.ReactNode
  source: string
  className?: string
}

type ViewMode = "desktop" | "tablet" | "mobile"

const viewWidths: Record<ViewMode, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "375px",
}

export function BlockPreview({
  name,
  title,
  description,
  category,
  preview,
  source,
  className,
}: BlockPreviewProps) {
  const [active, setActive] = React.useState<"preview" | "code">("preview")
  const [viewMode, setViewMode] = React.useState<ViewMode>("desktop")
  const [fullscreen, setFullscreen] = React.useState(false)
  const isMobile = useIsMobile()

  React.useEffect(() => {
    if (fullscreen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [fullscreen])

  const tabClass = (selected: boolean) =>
    cn(
      "inline-flex h-7 items-center rounded-t-[6px] border-2 border-b-0 border-y2k-ink px-4 text-xs font-bold transition-all relative top-[2px]",
      selected
        ? "bg-card text-y2k-ink border-b-card shadow-[0_2px_0px_#fff]"
        : "bg-y2k-panel/85 text-y2k-ink hover:bg-y2k-pink/80 hover:translate-y-[-1px]",
    )

  const viewBtnClass = (mode: ViewMode) =>
    cn(
      "flex h-7 w-7 items-center justify-center rounded border transition-all",
      viewMode === mode
        ? "border-y2k-ink bg-y2k-lemon text-y2k-ink shadow-[1px_1px_0px_#1b1b3a]"
        : "border-y2k-ink/30 text-y2k-ink/50 hover:border-y2k-ink hover:text-y2k-ink",
    )

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-white overflow-hidden">
        {/* Fullscreen toolbar */}
        <div className="flex items-center justify-between border-b-2 border-y2k-ink bg-y2k-blue px-4 py-2">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-black text-y2k-ink">
              {name}
            </span>
            <span className="rounded border border-y2k-ink bg-white px-2 py-0.5 text-[10px] font-bold text-y2k-ink">
              {category}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setFullscreen(false)}
            className="inline-flex h-7 items-center gap-1.5 rounded border-2 border-y2k-ink bg-card px-3 text-xs font-bold text-y2k-ink transition-all hover:bg-y2k-pink"
          >
            <Minimize2Icon className="size-3" />
            Exit fullscreen
          </button>
        </div>
        {/* Fullscreen content */}
        <div className="flex-1 overflow-auto bg-y2k-panel p-6 ">
          <div className="mx-auto flex justify-center items-center" style={{ maxWidth: viewWidths[viewMode] }}>
            {preview}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn("not-prose w-full select-none", className)}
      data-slot="block-preview"
      data-name={name}
    >
      {/* Block info above */}
      <div className="mb-3 flex items-center justify-between px-1">
        <div>
          <h3 className="text-sm font-bold text-y2k-ink">{title}</h3>
          <p className="text-xs text-y2k-ink/60">{description}</p>
        </div>
      </div>

      <div className="y2k-window overflow-hidden border-2 border-y2k-ink bg-card shadow-none">
        {/* ===== Title Bar ===== */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-y2k-ink bg-y2k-blue px-2 py-1.5 sm:px-3">
          <div className="flex min-w-0 items-center gap-2">
            <span className="y2k-title-dots hidden sm:inline-flex" aria-hidden>
              <span className="rounded-full w-2 h-2" />
              <span className="rounded-full w-2 h-2" />
              <span className="rounded-full w-2 h-2" />
            </span>
            <span className="truncate font-mono text-xs font-black text-y2k-ink select-none tracking-tight">
              {name}.block
            </span>
            <span className="hidden rounded border border-y2k-ink bg-white px-1.5 py-0.5 text-[10px] font-bold text-y2k-ink sm:inline-block">
              {category}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {/* View mode toggles */}
            {active === "preview" && !isMobile && (
              <div className="mr-1 flex items-center gap-0.5 sm:mr-2">
                <button
                  type="button"
                  aria-label="Desktop view"
                  onClick={() => setViewMode("desktop")}
                  className={viewBtnClass("desktop")}
                >
                  <MonitorIcon className="size-3" />
                </button>
                <button
                  type="button"
                  aria-label="Tablet view"
                  onClick={() => setViewMode("tablet")}
                  className={viewBtnClass("tablet")}
                >
                  <TabletIcon className="size-3" />
                </button>
                <button
                  type="button"
                  aria-label="Mobile view"
                  onClick={() => setViewMode("mobile")}
                  className={viewBtnClass("mobile")}
                >
                  <SmartphoneIcon className="size-3" />
                </button>
              </div>
            )}
            <button
              type="button"
              onClick={() => setFullscreen(true)}
              aria-label="Fullscreen"
              className="flex h-5 w-5 items-center justify-center rounded border border-y2k-ink bg-card text-y2k-ink transition-all hover:bg-y2k-mint hover:scale-105 active:scale-95"
            >
              <Maximize2Icon className="size-2.5 stroke-[3px]" />
            </button>
          </div>
        </div>

        {/* ===== Tabs ===== */}
        <div className="flex items-end justify-between border-b-2 border-y2k-ink bg-y2k-panel px-2 pt-1 gap-1 sm:px-3">
          <div className="flex gap-1">
            <button
              type="button"
              role="tab"
              aria-selected={active === "preview"}
              onClick={() => setActive("preview")}
              className={tabClass(active === "preview")}
            >
              Preview
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={active === "code"}
              onClick={() => setActive("code")}
              className={tabClass(active === "code")}
            >
              Code
            </button>
          </div>
          <div className="hidden pb-1.5 sm:block">
            <span className="text-[10px] font-semibold text-y2k-ink/50">
              {title}
            </span>
          </div>
        </div>

        {/* ===== Content ===== */}
        <div className="relative bg-card overflow-hidden">
          {active === "preview" ? (
            <div className="overflow-auto bg-y2k-panel p-3 sm:p-6" style={{
              backgroundImage: "radial-gradient(#1b1b3a15 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}>
              <div
                className="mx-auto flex justify-center items-center transition-all duration-300 ease-in-out"
                style={{ maxWidth: viewWidths[viewMode] }}
              >
                {preview}
              </div>
            </div>
          ) : (
            <div className="[&_pre]:select-text [&_code]:select-text [&_*]:!select-text">
              <CodeBlock
                code={source}
                language="tsx"
                filename={`${name}.tsx`}
                className="my-0! rounded-none border-0"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
