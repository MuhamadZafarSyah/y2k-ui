"use client"

import * as React from "react"
import {
  PRESETS,
  DEFAULT_CONFIG,
  type MotionConfig,
  type TargetType,
  type MotionPreset,
} from "@/components/playground/motion/motion-presets"
import { BezierEditor } from "@/components/playground/motion/bezier-editor"
import { serializeMotionToUrl, deserializeMotionFromUrl } from "@/components/playground/motion/url-serializer"
import { PresetPanel } from "@/components/playground/motion/preset-panel"
import { ControlsPanel } from "@/components/playground/motion/controls-panel"
import { PreviewPanel } from "@/components/playground/motion/preview-panel"
import { CodeBlock } from "@/components/docs/code-block"
import {
  Zap,
  Sliders,
  Activity,
  Code,
  Layout,
} from "lucide-react"

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

  const [isMobile, setIsMobile] = React.useState(false)
  const [mobileTab, setMobileTab] = React.useState<"preview" | "configure" | "properties" | "bezier" | "code">("preview")

  const [isVisible, setIsVisible] = React.useState(true)
  const observerRef = React.useRef<HTMLDivElement>(null)
  const configRef = React.useRef(config)
  configRef.current = config

  const onTargetChange = React.useCallback((val: TargetType) => {
    setConfig(prev => ({ ...prev, target: val }))
  }, [])

  const onTogglePlay = React.useCallback(() => {
    setIsPlaying(prev => !prev)
  }, [])

  React.useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkViewport()
    window.addEventListener("resize", checkViewport)
    return () => window.removeEventListener("resize", checkViewport)
  }, [])

  // Initialize config from URL hash on mount
  React.useEffect(() => {
    const urlConfig = deserializeMotionFromUrl()
    if (!urlConfig) return
    const matchedPreset = PRESETS.find(p => p.id === urlConfig.preset)
    setConfig({
      ...urlConfig,
      keyframes: matchedPreset ? matchedPreset.keyframes : urlConfig.keyframes || PRESETS[0].keyframes,
    })
  }, [])

  // Debounced sync config to URL hash (only after user stops interacting)
  const syncTimerRef = React.useRef<ReturnType<typeof setTimeout>>(null)
  React.useEffect(() => {
    if (syncTimerRef.current) clearTimeout(syncTimerRef.current)
    syncTimerRef.current = setTimeout(() => {
      const url = serializeMotionToUrl(config)
      if (url && typeof window !== "undefined") {
        window.history.replaceState(null, "", url)
      }
    }, 800)
    return () => {
      if (syncTimerRef.current) clearTimeout(syncTimerRef.current)
    }
  }, [config])

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

  const handleShare = React.useCallback(() => {
    const shareUrl = serializeMotionToUrl(configRef.current)
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2000)
    })
  }, [])

  const handlePresetSelect = React.useCallback((preset: MotionPreset) => {
    setConfig(prev => ({
      ...prev,
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
    }))
    setIsPlaying(true)
    setReplayKey(k => k + 1)
  }, [])

  const handleBezierChange = React.useCallback((bezierStr: string) => {
    setConfig(prev => ({
      ...prev,
      preset: "custom",
      easing: {
        type: "bezier",
        value: bezierStr,
      },
    }))
  }, [])

  const triggerReplay = React.useCallback(() => {
    setReplayKey(k => k + 1)
    if (configRef.current.trigger === "scroll") {
      setIsVisible(false)
      setTimeout(() => setIsVisible(true), 50)
    }
  }, [])

  const keyframesBlock = React.useMemo(() => {
    return generateKeyframesCss(config.name, config.keyframes)
  }, [config.name, config.keyframes])

  const styleTagContent = React.useMemo(() => {
    return `
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
  }, [config.name, config.duration, config.delay, config.iterationCount, config.direction, config.fillMode, config.easing.value, isPlaying, isVisible, keyframesBlock])

  const codeContents = React.useMemo(() => {
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

    return {
      tailwind: getTailwindCode(),
      theme: getThemeCode(),
      css: getPureCssCode(),
      cli: getCliCode(),
    }
  }, [config, keyframesBlock])

  const mobileCodeTab = React.useMemo(() => (
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
  ), [codeTab, codeContents])

  return (
    <div className="h-full flex flex-col bg-[#f7f8fc] overflow-hidden">
      {isMobile ? (
        <div className="flex-1 flex flex-col overflow-hidden">
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
            {mobileTab === "preview" && (
              <PreviewPanel
                config={config}
                isPlaying={isPlaying}
                onTogglePlay={onTogglePlay}
                onReplay={triggerReplay}
                replayKey={replayKey}
                isVisible={isVisible}
                styleTagContent={styleTagContent}
                codeTab={codeTab}
                onCodeTabChange={setCodeTab}
                codeContents={codeContents}
                observerRef={observerRef}
              />
            )}
            {mobileTab === "configure" && (
              <PresetPanel
                target={config.target}
                onTargetChange={onTargetChange}
                activePreset={config.preset ?? ""}
                onPresetSelect={handlePresetSelect}
              />
            )}
            {mobileTab === "properties" && (
              <ControlsPanel
                config={config}
                onConfigChange={setConfig}
                onBezierChange={handleBezierChange}
                onShare={handleShare}
                copiedLink={copiedLink}
              />
            )}
            {mobileTab === "bezier" && (
              <div className="h-full overflow-y-auto rounded-lg border-2 border-y2k-ink bg-white p-4">
                <BezierEditor value={config.easing.value} onChange={handleBezierChange} />
              </div>
            )}
            {mobileTab === "code" && mobileCodeTab}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex overflow-hidden p-3 gap-3">
          <div className="w-[300px] shrink-0 h-full">
            <PresetPanel
              target={config.target}
              onTargetChange={onTargetChange}
              activePreset={config.preset ?? ""}
              onPresetSelect={handlePresetSelect}
            />
          </div>

          <div className="flex-1 h-full">
            <PreviewPanel
              config={config}
              isPlaying={isPlaying}
              onTogglePlay={onTogglePlay}
              onReplay={triggerReplay}
              replayKey={replayKey}
              isVisible={isVisible}
              styleTagContent={styleTagContent}
              codeTab={codeTab}
              onCodeTabChange={setCodeTab}
              codeContents={codeContents}
              observerRef={observerRef}
            />
          </div>

          <div className="w-[320px] shrink-0 h-full">
            <ControlsPanel
              config={config}
              onConfigChange={setConfig}
              onBezierChange={handleBezierChange}
              onShare={handleShare}
              copiedLink={copiedLink}
            />
          </div>
        </div>
      )}
    </div>
  )
}
