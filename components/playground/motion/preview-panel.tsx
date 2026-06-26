"use client"

import * as React from "react"
import { type MotionConfig } from "@/components/playground/motion/motion-presets"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { WindowControls } from "@/components/ui/window-controls"
import { CodeBlock } from "@/components/docs/code-block"
import { Play, Pause, RotateCcw } from "lucide-react"

const gridStyle: React.CSSProperties = {
  backgroundImage: "radial-gradient(#1b1b3a26 1.5px, transparent 1.5px), linear-gradient(135deg, rgba(182, 156, 255, 0.15) 0%, rgba(142, 209, 252, 0.15) 100%)",
  backgroundSize: "16px 16px, 100% 100%",
  backgroundPosition: "-1px -1px, 0 0",
}

interface PreviewPanelProps {
  config: MotionConfig
  isPlaying: boolean
  onTogglePlay: () => void
  onReplay: () => void
  replayKey: number
  isVisible: boolean
  styleTagContent: string
  codeTab: "tailwind" | "theme" | "css" | "cli"
  onCodeTabChange: (tab: "tailwind" | "theme" | "css" | "cli") => void
  codeContents: Record<string, string>
  observerRef: React.RefObject<HTMLDivElement | null>
}

export const PreviewPanel = React.memo(function PreviewPanel({
  config,
  isPlaying,
  onTogglePlay,
  onReplay,
  replayKey,
  isVisible,
  styleTagContent,
  codeTab,
  onCodeTabChange,
  codeContents,
  observerRef,
}: PreviewPanelProps) {
  const triggerClass =
    config.trigger === "autoplay" ? "preview-element-autoplay" :
    config.trigger === "hover" ? "preview-element-hover" :
    config.trigger === "tap" ? "preview-element-tap" :
    "preview-element-scroll"

  const renderTarget = () => {
    const commonClass = `${triggerClass} transition-transform`
    switch (config.target) {
      case "button":
        return (
          <Button key={replayKey} variant="default" className={commonClass}>
            Interact with Me
          </Button>
        )
      case "badge":
        return (
          <Badge key={replayKey} variant="mint" className={commonClass}>
            Y2K Badge
          </Badge>
        )
      case "card":
        return (
          <div key={replayKey} className={`${commonClass} y2k-window w-48 text-left overflow-hidden bg-white`}>
            <div className="y2k-window-title bg-y2k-blue px-2 py-1 font-mono text-[10px] flex items-center justify-between border-b-2 border-y2k-ink">
              <span>window.exe</span>
              <span className="flex gap-1">
                <span className="size-2 border border-y2k-ink rounded-full bg-white" />
                <span className="size-2 border border-y2k-ink rounded-full bg-white" />
              </span>
            </div>
            <div className="p-3 text-xs">
              <p className="font-bold">Kawaii Card</p>
              <p className="text-[10px] text-y2k-ink-muted">Tweak properties to animate!</p>
            </div>
          </div>
        )
      case "dialog":
        return (
          <div key={replayKey} className={`${commonClass} y2k-window w-56 text-left overflow-hidden bg-white shadow-md`}>
            <div className="y2k-window-title bg-y2k-pink px-2 py-1 font-mono text-[10px] flex items-center justify-between border-b-2 border-y2k-ink">
              <span>Alert System</span>
              <span className="font-bold">[✕]</span>
            </div>
            <div className="p-3 text-center space-y-2">
              <p className="text-xs font-bold">Process completed!</p>
              <Button size="xs" variant="lemon">Okay</Button>
            </div>
          </div>
        )
      case "text":
        return (
          <div key={replayKey} className={`${commonClass} font-black text-2xl tracking-tight text-y2k-ink select-none`}>
            Y2K MOTION ⚡
          </div>
        )
      case "image":
        return (
          <div key={replayKey} className={`${commonClass} size-16 rounded border-2 border-y2k-ink bg-y2k-lemon flex items-center justify-center`}>
            <span className="text-3xl select-none">💾</span>
          </div>
        )
      case "box":
      default:
        return (
          <div key={replayKey} className={`${commonClass} size-16 rounded-md border-2 border-y2k-ink bg-[#b69cff]`} />
        )
    }
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border-2 border-y2k-ink bg-white">
      <div className="flex shrink-0 items-center justify-between border-b-2 border-y2k-ink bg-y2k-pink px-3 py-1.5">
        <div className="flex items-center gap-2">
          <span className="y2k-title-dots" aria-hidden>
            <span className="rounded-full size-2" />
            <span className="rounded-full size-2" />
            <span className="rounded-full size-2" />
          </span>
          <span className="font-mono text-[11px] font-black text-y2k-ink">
            live-render.exe
          </span>
        </div>
        <WindowControls hideMinimize hideClose hideMaximize />
      </div>

      <style dangerouslySetInnerHTML={{ __html: styleTagContent }} />

      <div
        ref={observerRef}
        className="relative flex-1 min-h-[300px] border-b-2 border-y2k-ink flex items-center justify-center p-8 overflow-hidden select-none bg-y2k-panel"
        style={gridStyle}
      >
        <span aria-hidden className="pointer-events-none absolute left-3 top-3 select-none text-base text-y2k-ink/40 animate-pulse">✦</span>
        <span aria-hidden className="pointer-events-none absolute right-3 bottom-3 select-none text-xs text-y2k-ink/35">★</span>

        <div className="flex items-center justify-center transform scale-125">
          {renderTarget()}
        </div>

        <div className="absolute bottom-3 left-3 bg-white/80 border border-y2k-ink/30 px-1.5 py-0.5 rounded font-mono text-[9px] text-y2k-ink">
          Trigger: <span className="font-bold underline">{config.trigger}</span>
        </div>
      </div>

      <div className="shrink-0 border-b-2 border-y2k-ink bg-[#d7dde8] px-3 py-2 flex items-center gap-2">
        <Button
          size="sm"
          variant={isPlaying ? "pink" : "default"}
          onClick={onTogglePlay}
          leadingIcon={isPlaying ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
        >
          {isPlaying ? "Pause Preview" : "Play Preview"}
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={onReplay}
          leadingIcon={<RotateCcw className="size-3.5" />}
        >
          Replay
        </Button>
      </div>

      <div className="flex-1 min-h-[220px] flex flex-col overflow-hidden bg-white">
        <div className="flex border-b border-y2k-ink bg-y2k-panel/30 shrink-0">
          {(["tailwind", "theme", "css", "cli"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => onCodeTabChange(tab)}
              className={`flex-1 py-1.5 text-[10px] font-black border-r border-y2k-ink last:border-r-0 transition-all ${
                codeTab === tab
                  ? "bg-y2k-lemon text-y2k-ink"
                  : "bg-white text-y2k-ink-muted hover:bg-y2k-panel"
              }`}
            >
              {tab === "tailwind" && "Tailwind Class"}
              {tab === "theme" && "@theme CSS"}
              {tab === "css" && "Pure CSS"}
              {tab === "cli" && "CLI Add"}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-3 relative font-mono text-xs">
          <CodeBlock
            code={codeContents[codeTab]}
            language={codeTab === "cli" ? "bash" : "css"}
            filename={
              codeTab === "tailwind" ? "class.txt" :
              codeTab === "theme" ? "globals.css" :
              codeTab === "css" ? "style.css" :
              "install.sh"
            }
          />
        </div>
      </div>
    </div>
  )
})
