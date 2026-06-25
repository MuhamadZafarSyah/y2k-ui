"use client"

import * as React from "react"
import {
  PRESETS,
  PRESET_EASINGS,
  DEFAULT_CONFIG,
  type MotionConfig,
  type TargetType,
  type TriggerType,
  type MotionPreset,
} from "@/components/playground/motion/motion-presets"
import { BezierEditor } from "@/components/playground/motion/bezier-editor"
import { serializeMotionToUrl, deserializeMotionFromUrl } from "@/components/playground/motion/url-serializer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { WindowControls } from "@/components/ui/window-controls"
import { CodeBlock } from "@/components/docs/code-block"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import {
  Play,
  Pause,
  RotateCcw,
  Share2,
  Check,
  Zap,
  Sliders,
  Activity,
  Code,
  Layout,
} from "lucide-react"

// Retro Grid + Soft Gradient background
const gridStyle: React.CSSProperties = {
  backgroundImage: "radial-gradient(#1b1b3a26 1.5px, transparent 1.5px), linear-gradient(135deg, rgba(182, 156, 255, 0.15) 0%, rgba(142, 209, 252, 0.15) 100%)",
  backgroundSize: "16px 16px, 100% 100%",
  backgroundPosition: "-1px -1px, 0 0",
}

const generateKeyframesCss = (name: string, keyframes: Record<string, Record<string, string>> | undefined) => {
  if (!keyframes) return ""
  const rules = Object.entries(keyframes)
    .map(([percentage, props]) => {
      const propLines = Object.entries(props)
        .map(([prop, val]) => `    ${prop}: ${val};`)
        .join("\n")
      return `  ${percentage} {\n${propLines}\n  }`
    })
    .join("\n")
  return `@keyframes ${name} {\n${rules}\n}`
}

export default function MotionPlaygroundPage() {
  const [config, setConfig] = React.useState<MotionConfig>(DEFAULT_CONFIG)
  const [isPlaying, setIsPlaying] = React.useState(true)
  const [replayKey, setReplayKey] = React.useState(0)
  const [copiedLink, setCopiedLink] = React.useState(false)
  const [codeTab, setCodeTab] = React.useState<"tailwind" | "theme" | "css" | "cli">("tailwind")
  
  // Mobile UI States
  const [isMobile, setIsMobile] = React.useState(false)
  const [mobileTab, setMobileTab] = React.useState<"preview" | "configure" | "properties" | "bezier" | "code">("preview")
  
  // Visibility for Entrance scroll triggers
  const [isVisible, setIsVisible] = React.useState(true)
  const observerRef = React.useRef<HTMLDivElement>(null)

  // Initialize from URL
  React.useEffect(() => {
    const urlConfig = deserializeMotionFromUrl()
    if (urlConfig) {
      // Find matching preset keyframes if preset is known
      const matchedPreset = PRESETS.find(p => p.id === urlConfig.preset)
      setConfig({
        ...urlConfig,
        keyframes: matchedPreset ? matchedPreset.keyframes : urlConfig.keyframes || PRESETS[0].keyframes
      })
    } else {
      setConfig(DEFAULT_CONFIG)
    }
  }, [])

  // Sync to URL hash
  React.useEffect(() => {
    const newUrl = serializeMotionToUrl(config)
    if (newUrl && typeof window !== "undefined") {
      window.history.replaceState(null, "", newUrl)
    }
  }, [config])

  // Viewport checking
  React.useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkViewport()
    window.addEventListener("resize", checkViewport)
    return () => window.removeEventListener("resize", checkViewport)
  }, [])

  // Scroll Trigger simulation logic
  React.useEffect(() => {
    if (config.trigger !== "scroll") return
    const currentRef = observerRef.current
    if (!currentRef) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(false)
          setTimeout(() => setIsVisible(true), 50)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(currentRef)
    return () => observer.disconnect()
  }, [config.trigger, replayKey])

  const handleShare = () => {
    const shareUrl = serializeMotionToUrl(config)
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2000)
    })
  }

  const handlePresetSelect = (preset: MotionPreset) => {
    setConfig({
      ...config,
      preset: preset.id,
      name: preset.id,
      duration: preset.duration,
      delay: preset.delay,
      iterationCount: preset.iterationCount,
      direction: preset.direction,
      fillMode: preset.fillMode,
      easing: {
        type: preset.easing.type,
        value: preset.easing.value,
      },
      keyframes: preset.keyframes,
    })
    setIsPlaying(true)
    setReplayKey(k => k + 1)
  }

  const handleBezierChange = (bezierStr: string) => {
    setConfig(prev => ({
      ...prev,
      preset: "custom",
      easing: {
        type: "bezier",
        value: bezierStr,
      },
    }))
  }

  const triggerReplay = () => {
    setReplayKey(k => k + 1)
    if (config.trigger === "scroll") {
      setIsVisible(false)
      setTimeout(() => setIsVisible(true), 50)
    }
  }

  // Generate target HTML based on configuration
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

  // Animation CSS Generation
  const keyframesBlock = React.useMemo(() => {
    return generateKeyframesCss(config.name, config.keyframes)
  }, [config.name, config.keyframes])

  const styleTagContent = `
    ${keyframesBlock}
    
    .preview-element-autoplay {
      animation-name: ${config.name};
      animation-duration: ${config.duration}ms;
      animation-delay: ${config.delay}ms;
      animation-iteration-count: ${config.iterationCount};
      animation-direction: ${config.direction};
      animation-fill-mode: ${config.fillMode};
      animation-timing-function: ${config.easing.value};
      animation-play-state: ${isPlaying ? "running" : "paused"};
    }
    
    .preview-element-hover:hover {
      animation-name: ${config.name};
      animation-duration: ${config.duration}ms;
      animation-delay: ${config.delay}ms;
      animation-iteration-count: ${config.iterationCount};
      animation-direction: ${config.direction};
      animation-fill-mode: ${config.fillMode};
      animation-timing-function: ${config.easing.value};
      animation-play-state: ${isPlaying ? "running" : "paused"};
    }
    
    .preview-element-tap:active {
      animation-name: ${config.name};
      animation-duration: ${config.duration}ms;
      animation-delay: ${config.delay}ms;
      animation-iteration-count: ${config.iterationCount};
      animation-direction: ${config.direction};
      animation-fill-mode: ${config.fillMode};
      animation-timing-function: ${config.easing.value};
      animation-play-state: ${isPlaying ? "running" : "paused"};
    }
    
    .preview-element-scroll {
      animation-name: ${isVisible ? config.name : "none"};
      animation-duration: ${config.duration}ms;
      animation-delay: ${config.delay}ms;
      animation-iteration-count: ${config.iterationCount};
      animation-direction: ${config.direction};
      animation-fill-mode: ${config.fillMode};
      animation-timing-function: ${config.easing.value};
      animation-play-state: ${isPlaying ? "running" : "paused"};
    }
  `

  // Export Code Generators
  const getTailwindCode = () => {
    const durationStr = `${config.duration}ms`
    const delayStr = config.delay > 0 ? `${config.delay}ms` : ""
    const iterationStr = config.iterationCount === "infinite" ? "infinite" : config.iterationCount
    const directionStr = config.direction !== "normal" ? config.direction : ""
    const fillModeStr = config.fillMode !== "none" ? config.fillMode : ""
    const timingValue = config.easing.value.replace(/\s+/g, "")
    
    const parts = [
      config.name,
      durationStr,
      timingValue,
      delayStr,
      iterationStr,
      directionStr,
      fillModeStr
    ].filter(Boolean)
    
    const classBase = `animate-[${parts.join("_")}]`
    return config.respectReducedMotion ? `motion-safe:${classBase}` : classBase
  }

  const getThemeCode = () => {
    const durationStr = `${config.duration / 1000}s`
    const delayStr = config.delay > 0 ? ` ${config.delay / 1000}s` : ""
    const iterationStr = config.iterationCount === "infinite" ? " infinite" : ` ${config.iterationCount}`
    const directionStr = config.direction !== "normal" ? ` ${config.direction}` : ""
    const fillModeStr = config.fillMode !== "none" ? ` ${config.fillMode}` : ""
    const timingValue = config.easing.value
    
    const themeBlock = `@theme {
  --animate-${config.name}: ${config.name} ${durationStr} ${timingValue}${delayStr}${iterationStr}${directionStr}${fillModeStr};
}`

    const reducedMotionBlock = config.respectReducedMotion 
      ? `\n\n@media (prefers-reduced-motion: reduce) {
  @theme {
    --animate-${config.name}: none;
  }
}`
      : ""

    return `${themeBlock}${reducedMotionBlock}\n\n${keyframesBlock}`
  }

  const getPureCssCode = () => {
    const durationStr = `${config.duration}ms`
    const delayStr = config.delay > 0 ? ` ${config.delay}ms` : ""
    const iterationStr = config.iterationCount === "infinite" ? " infinite" : ` ${config.iterationCount}`
    const directionStr = config.direction !== "normal" ? ` ${config.direction}` : ""
    const fillModeStr = config.fillMode !== "none" ? ` ${config.fillMode}` : ""
    const timingValue = config.easing.value
    
    const cssClass = `.animate-${config.name} {
  animation: ${config.name} ${durationStr} ${timingValue}${delayStr}${iterationStr}${directionStr}${fillModeStr};
}`

    const reducedMotionBlock = config.respectReducedMotion
      ? `\n\n@media (prefers-reduced-motion: reduce) {
  .animate-${config.name} {
    animation: none !important;
  }
}`
      : ""

    return `${cssClass}${reducedMotionBlock}\n\n${keyframesBlock}`
  }

  const getCliCode = () => {
    return `npx y2kui add ${config.preset ?? "custom"}`
  }

  const codeContents = {
    tailwind: getTailwindCode(),
    theme: getThemeCode(),
    css: getPureCssCode(),
    cli: getCliCode(),
  }

  // Left Panel - Preset Gallery
  const PresetPanel = () => (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border-2 border-y2k-ink bg-white">
      <div className="flex shrink-0 items-center justify-between border-b-2 border-y2k-ink bg-y2k-blue px-3 py-1.5">
        <div className="flex items-center gap-2">
          <span className="y2k-title-dots" aria-hidden>
            <span className="rounded-full size-2" />
            <span className="rounded-full size-2" />
            <span className="rounded-full size-2" />
          </span>
          <span className="font-mono text-[11px] font-black text-y2k-ink">
            presets-list.cfg
          </span>
        </div>
        <WindowControls hideMinimize hideClose hideMaximize />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Target Select */}
        <div className="space-y-1.5">
          <Label>Preview Target</Label>
          <Select
            value={config.target}
            onValueChange={(val) => setConfig(prev => ({ ...prev, target: val as TargetType }))}
          >
            <SelectTrigger className="h-8 text-xs font-bold">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="button">Button Component</SelectItem>
              <SelectItem value="badge">Badge Component</SelectItem>
              <SelectItem value="card">Kawaii Window Card</SelectItem>
              <SelectItem value="dialog">Popup Dialog Box</SelectItem>
              <SelectItem value="text">Bold Text Block</SelectItem>
              <SelectItem value="image">💾 Retro Pixel Image</SelectItem>
              <SelectItem value="box">Simple Pastel Box</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Gallery */}
        <div className="space-y-2">
          <div className="text-[10px] font-black text-y2k-ink/50 uppercase tracking-wider">
            Animation Presets
          </div>
          <div className="space-y-1.5">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => handlePresetSelect(p)}
                className={`w-full p-2 text-left border-2 border-y2k-ink rounded transition-all active:scale-[0.98] ${
                  config.preset === p.id
                    ? "bg-y2k-pink text-y2k-ink"
                    : "bg-white text-y2k-ink hover:bg-y2k-panel"
                }`}
              >
                <div className="text-xs font-black">{p.name}</div>
                <div className="text-[10px] text-y2k-ink/75 leading-tight mt-0.5">
                  {p.description}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  // Right Panel - Properties & Bezier
  const ControlsPanel = () => (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border-2 border-y2k-ink bg-white">
      <div className="flex shrink-0 items-center justify-between border-b-2 border-y2k-ink bg-y2k-lemon px-3 py-1.5">
        <div className="flex items-center gap-2">
          <span className="y2k-title-dots" aria-hidden>
            <span className="rounded-full size-2" />
            <span className="rounded-full size-2" />
            <span className="rounded-full size-2" />
          </span>
          <span className="font-mono text-[11px] font-black text-y2k-ink">
            motion-settings.bat
          </span>
        </div>
        <WindowControls hideMinimize hideClose hideMaximize />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Name input */}
        <div className="space-y-1">
          <Label>Animation Name</Label>
          <Input
            value={config.name}
            onChange={(e) => setConfig(prev => ({ ...prev, name: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "") }))}
            placeholder="e.g. wiggle-fast"
            className="h-8 text-xs font-bold"
          />
        </div>

        {/* Trigger Select */}
        <div className="space-y-1.5">
          <Label>Trigger Event</Label>
          <Select
            value={config.trigger}
            onValueChange={(val) => setConfig(prev => ({ ...prev, trigger: val as TriggerType }))}
          >
            <SelectTrigger className="h-8 text-xs font-bold">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="autoplay">Autoplay (Looping)</SelectItem>
              <SelectItem value="hover">On Hover (Mouse Enter)</SelectItem>
              <SelectItem value="tap">On Tap / Click (Active)</SelectItem>
              <SelectItem value="scroll">Entrance (On Viewport Intersection)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Duration Slider */}
        <Slider
          label="Duration"
          showValue
          trailingLabel="ms"
          min={100}
          max={5000}
          step={50}
          value={[config.duration]}
          onValueChange={([val]) => setConfig(prev => ({ ...prev, duration: val }))}
          variant="pink"
        />

        {/* Delay Slider */}
        <Slider
          label="Delay"
          showValue
          trailingLabel="ms"
          min={0}
          max={3000}
          step={50}
          value={[config.delay]}
          onValueChange={([val]) => setConfig(prev => ({ ...prev, delay: val }))}
          variant="pink"
        />

        {/* Iteration Count */}
        <div className="space-y-1">
          <Label>Iteration Count</Label>
          <div className="flex items-center gap-4">
            <Input
              type="number"
              min={1}
              value={config.iterationCount === "infinite" ? 1 : config.iterationCount}
              disabled={config.iterationCount === "infinite"}
              onChange={(e) => {
                const val = parseInt(e.target.value) || 1
                setConfig(prev => ({ ...prev, iterationCount: val }))
              }}
              className="h-8 w-20 text-xs font-bold"
            />
            <Label className="flex items-center gap-1.5 text-xs font-bold text-y2k-ink cursor-pointer">
              <Checkbox
                checked={config.iterationCount === "infinite"}
                onCheckedChange={(checked) => {
                  setConfig(prev => ({
                    ...prev,
                    iterationCount: checked ? "infinite" : 1,
                  }))
                }}
              />
              Infinite Loop
            </Label>
          </div>
        </div>

        {/* Direction Select */}
        <div className="space-y-1.5">
          <Label>Animation Direction</Label>
          <Select
            value={config.direction}
            onValueChange={(val) => setConfig(prev => ({ ...prev, direction: val as any }))}
          >
            <SelectTrigger className="h-8 text-xs font-bold">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="reverse">Reverse</SelectItem>
              <SelectItem value="alternate">Alternate</SelectItem>
              <SelectItem value="alternate-reverse">Alternate Reverse</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Fill Mode Select */}
        <div className="space-y-1.5">
          <Label>Animation Fill Mode</Label>
          <Select
            value={config.fillMode}
            onValueChange={(val) => setConfig(prev => ({ ...prev, fillMode: val as any }))}
          >
            <SelectTrigger className="h-8 text-xs font-bold">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="forwards">Forwards</SelectItem>
              <SelectItem value="backwards">Backwards</SelectItem>
              <SelectItem value="both">Both</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Easing Bezier visual editor */}
        <div className="space-y-1.5 border-t border-y2k-ink/10 pt-3">
          <BezierEditor value={config.easing.value} onChange={handleBezierChange} />
        </div>

        {/* Reduced motion switcher */}
        <div className="flex items-center justify-between border-t border-y2k-ink/10 pt-3">
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-y2k-ink">Respect Reduced Motion</div>
            <div className="text-[10px] text-y2k-ink-muted">Adds fallback media queries to output code</div>
          </div>
          <Switch
            checked={config.respectReducedMotion}
            onCheckedChange={(checked) => setConfig(prev => ({ ...prev, respectReducedMotion: checked }))}
          />
        </div>
      </div>

      <div className="shrink-0 border-t-2 border-y2k-ink bg-y2k-panel p-3 flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setConfig(DEFAULT_CONFIG)}
          leadingIcon={<RotateCcw className="size-3.5" />}
          className="flex-1"
        >
          Reset Config
        </Button>

        <Button
          size="sm"
          variant="pink"
          onClick={handleShare}
          leadingIcon={copiedLink ? <Check className="size-3.5" /> : <Share2 className="size-3.5" />}
          className="flex-1"
        >
          {copiedLink ? "Copied!" : "Share Preset"}
        </Button>
      </div>
    </div>
  )

  // Middle Panel - Preview & Tab Code
  const PreviewPanel = () => (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border-2 border-y2k-ink bg-white">
      {/* Title bar */}
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

      {/* Styled animation styles injection */}
      <style dangerouslySetInnerHTML={{ __html: styleTagContent }} />

      {/* Preview Area Grid */}
      <div
        ref={observerRef}
        className="relative flex-1 min-h-[300px] border-b-2 border-y2k-ink flex items-center justify-center p-8 overflow-hidden select-none bg-y2k-panel"
        style={gridStyle}
      >
        {/* Star glyph decorations */}
        <span aria-hidden className="pointer-events-none absolute left-3 top-3 select-none text-base text-y2k-ink/40 animate-pulse">✦</span>
        <span aria-hidden className="pointer-events-none absolute right-3 bottom-3 select-none text-xs text-y2k-ink/35">★</span>

        {/* Dynamic target element wrapper */}
        <div className="flex items-center justify-center transform scale-125">
          {renderTarget()}
        </div>

        {/* Inline trigger label helper */}
        <div className="absolute bottom-3 left-3 bg-white/80 border border-y2k-ink/30 px-1.5 py-0.5 rounded font-mono text-[9px] text-y2k-ink">
          Trigger: <span className="font-bold underline">{config.trigger}</span>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="shrink-0 border-b-2 border-y2k-ink bg-[#d7dde8] px-3 py-2 flex items-center gap-2">
        <Button
          size="sm"
          variant={isPlaying ? "pink" : "default"}
          onClick={() => setIsPlaying(!isPlaying)}
          leadingIcon={isPlaying ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
        >
          {isPlaying ? "Pause Preview" : "Play Preview"}
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={triggerReplay}
          leadingIcon={<RotateCcw className="size-3.5" />}
        >
          Replay
        </Button>
      </div>

      {/* Tab Code Output */}
      <div className="flex-1 min-h-[220px] flex flex-col overflow-hidden bg-white">
        <div className="flex border-b border-y2k-ink bg-y2k-panel/30 shrink-0">
          {(["tailwind", "theme", "css", "cli"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setCodeTab(tab)}
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

  // Layout rendering
  return (
    <div className="h-full flex flex-col bg-[#f7f8fc] overflow-hidden">
      {isMobile ? (
        // Mobile Tabbed Workspace Layout
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile switcher tab items */}
          <div className="flex border-b-2 border-y2k-ink bg-white shrink-0 overflow-x-auto">
            <button
              type="button"
              onClick={() => setMobileTab("preview")}
              className={`flex-1 min-w-[70px] py-2.5 text-[10px] font-black border-r border-y2k-ink transition-all flex flex-col items-center gap-0.5 ${
                mobileTab === "preview" ? "bg-y2k-pink text-y2k-ink" : "bg-white text-y2k-ink-muted hover:bg-y2k-panel"
              }`}
            >
              <Layout className="size-3.5" />
              <span>Preview</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileTab("configure")}
              className={`flex-1 min-w-[70px] py-2.5 text-[10px] font-black border-r border-y2k-ink transition-all flex flex-col items-center gap-0.5 ${
                mobileTab === "configure" ? "bg-y2k-blue text-y2k-ink" : "bg-white text-y2k-ink-muted hover:bg-y2k-panel"
              }`}
            >
              <Zap className="size-3.5" />
              <span>Presets</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileTab("properties")}
              className={`flex-1 min-w-[70px] py-2.5 text-[10px] font-black border-r border-y2k-ink transition-all flex flex-col items-center gap-0.5 ${
                mobileTab === "properties" ? "bg-y2k-lemon text-y2k-ink" : "bg-white text-y2k-ink-muted hover:bg-y2k-panel"
              }`}
            >
              <Sliders className="size-3.5" />
              <span>Properties</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileTab("bezier")}
              className={`flex-1 min-w-[70px] py-2.5 text-[10px] font-black border-r border-y2k-ink transition-all flex flex-col items-center gap-0.5 ${
                mobileTab === "bezier" ? "bg-[#b69cff] text-y2k-ink" : "bg-white text-y2k-ink-muted hover:bg-y2k-panel"
              }`}
            >
              <Activity className="size-3.5" />
              <span>Bezier</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileTab("code")}
              className={`flex-1 min-w-[70px] py-2.5 text-[10px] font-black transition-all flex flex-col items-center gap-0.5 ${
                mobileTab === "code" ? "bg-[#8ff0d0] text-y2k-ink" : "bg-white text-y2k-ink-muted hover:bg-y2k-panel"
              }`}
            >
              <Code className="size-3.5" />
              <span>Code</span>
            </button>
          </div>

          <div className="flex-1 overflow-hidden p-2">
            {mobileTab === "preview" && <PreviewPanel />}
            {mobileTab === "configure" && <PresetPanel />}
            {mobileTab === "properties" && <ControlsPanel />}
            {mobileTab === "bezier" && (
              <div className="h-full overflow-y-auto rounded-lg border-2 border-y2k-ink bg-white p-4">
                <BezierEditor value={config.easing.value} onChange={handleBezierChange} />
              </div>
            )}
            {mobileTab === "code" && (
              <div className="h-full flex flex-col overflow-hidden rounded-lg border-2 border-y2k-ink bg-white">
                <div className="flex border-b border-y2k-ink bg-y2k-panel/30 shrink-0">
                  {(["tailwind", "theme", "css", "cli"] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setCodeTab(tab)}
                      className={`flex-1 py-1.5 text-[10px] font-black border-r border-y2k-ink last:border-r-0 transition-all ${
                        codeTab === tab
                          ? "bg-y2k-lemon text-y2k-ink"
                          : "bg-white text-y2k-ink-muted hover:bg-y2k-panel"
                      }`}
                    >
                      {tab.toUpperCase()}
                    </button>
                  ))}
                </div>
                <div className="flex-1 p-2 overflow-y-auto">
                  <CodeBlock
                    code={codeContents[codeTab]}
                    language={codeTab === "cli" ? "bash" : "css"}
                    filename={codeTab === "tailwind" ? "class.txt" : "code"}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        // Desktop 3-Column Workspace Layout (Original Working Design)
        <div className="flex-1 flex overflow-hidden p-3 gap-3">
          {/* Left panel: Preset gallery & target elements */}
          <div className="w-[300px] shrink-0 h-full">
            <PresetPanel />
          </div>

          {/* Middle panel: Live preview frame & Export code tabbed viewer */}
          <div className="flex-1 h-full">
            <PreviewPanel />
          </div>

          {/* Right panel: Animation properties controls & Bezier editor */}
          <div className="w-[320px] shrink-0 h-full">
            <ControlsPanel />
          </div>
        </div>
      )}
    </div>
  )
}
