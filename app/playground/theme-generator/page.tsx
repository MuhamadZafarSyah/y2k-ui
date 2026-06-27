"use client"

import * as React from "react"
import { HexColorPicker } from "react-colorful"
import { PRESETS, type ThemeConfig } from "@/components/playground/theme-generator/theme-presets"
import { ThemeGeneratorProvider, useThemeGenerator } from "@/components/playground/theme-generator/store"
import { deserializeThemeFromUrl } from "@/components/playground/theme-generator/url-serializer"
import { getContrastRatio, getContrastSuggestion } from "@/components/playground/theme-generator/wcag-contrast"
import { PreviewShowcase } from "@/components/playground/theme-generator/preview-showcase"
import { ExportDialog } from "@/components/playground/theme-generator/export-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { WindowControls } from "@/components/ui/window-controls"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import {
  PaletteIcon,
  RotateCcwIcon,
  Share2Icon,
  ChevronDownIcon,
  CheckIcon,
  AlertTriangleIcon,
} from "lucide-react"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"

// Color picker row with WCAG checker
function ColorPickerField({
  label,
  value,
  onChange,
  bgContext, // the background to test contrast against
  fgLabel,
}: {
  label: string
  value: string
  onChange: (color: string) => void
  bgContext?: string
  fgLabel?: string
}) {
  const [open, setOpen] = React.useState(false)

  // Contrast check if bgContext is provided
  const contrast = bgContext ? getContrastRatio(bgContext, value) : null

  return (
    <div className="flex flex-col gap-1 border-b border-[#1b1b3a]/10 pb-2 last:border-0 last:pb-0">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-[#1b1b3a]">{label}</label>

        {contrast && (
          <div className="flex items-center gap-1">
            <span className="text-[9px] font-mono text-y2k-ink-muted">
              Contrast: {contrast.ratio}:1
            </span>
            <span
              className={`rounded px-1 text-[8px] font-black leading-none border border-[#1b1b3a] ${contrast.aaNormal
                ? "bg-[#8ff0d0] text-[#1b1b3a]"
                : "bg-[#ff8fcf] text-[#1b1b3a] animate-pulse"
                }`}
              title={contrast.aaNormal ? "Passes WCAG AA" : "Fails WCAG AA (requires >= 4.5)"}
            >
              {contrast.aaNormal ? "AA Pass" : "Fail"}
            </span>
          </div>
        )}
      </div>

      <div className="flex gap-1.5 items-center">
        {/* Swatch popup */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="size-7 rounded border-2 border-[#1b1b3a] shadow-sm hover:scale-105 active:scale-95 transition-all outline-none"
              style={{ backgroundColor: value }}
              aria-label={`Pick color for ${label}`}
            />
          </PopoverTrigger>
          <PopoverContent className="w-auto p-3 flex flex-col gap-2">
            <HexColorPicker color={value} onChange={onChange} />
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold">Hex Code:</span>
              <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="h-6 w-24 text-xs font-mono px-1.5"
              />
            </div>
          </PopoverContent>
        </Popover>

        {/* Manual hex string input */}
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-7 font-mono text-xs flex-1 px-2"
          maxLength={7}
        />
      </div>

      {/* Suggestion alert */}
      {contrast && !contrast.aaNormal && fgLabel && bgContext && (
        <p className="text-[9px] text-[#ff8fcf] bg-[#1b1b3a] px-1.5 py-0.5 rounded font-medium flex items-center gap-1 mt-0.5">
          <AlertTriangleIcon className="size-2.5 text-[#ffe45e]" />
          {getContrastSuggestion(bgContext, value, fgLabel)}
        </p>
      )}
    </div>
  )
}

function ControlsPane() {
  const { config, dispatch, shareUrl } = useThemeGenerator()
  const [copiedLink, setCopiedLink] = React.useState(false)

  const handleShare = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2000)
    })
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border-2 border-[#1b1b3a] bg-white">
      {/* Title bar */}
      <div className="flex shrink-0 items-center justify-between border-b-2 border-[#1b1b3a] bg-[#8ed1fc] px-3 py-1.5">
        <div className="flex items-center gap-2">
          <span className="y2k-title-dots" aria-hidden>
            <span className="rounded-full size-2" />
            <span className="rounded-full size-2" />
            <span className="rounded-full size-2" />
          </span>
          <span className="font-mono text-[11px] font-black text-[#1b1b3a]">
            theme-controls.bat
          </span>
        </div>
        <WindowControls hideMinimize hideClose hideMaximize />
      </div>

      {/* Content wrapper */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Preset Selector */}
        <div className="space-y-2">
          <h3 className="text-xs font-black uppercase tracking-wide text-y2k-ink-muted">
            Theme Presets
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => dispatch({ type: "SET_PRESET", presetId: preset.id })}
                className={`rounded border-2 border-[#1b1b3a] px-2.5 py-1 text-xs font-bold transition-all hover:bg-[#8ff0d0] hover:-translate-y-px active:translate-y-0 inline-flex items-center gap-1 ${config.id === preset.id
                  ? "bg-[#ffe45e] text-[#1b1b3a]"
                  : "bg-white text-[#1b1b3a] hover:bg-[#d7dde8]"
                  }`}
              >
                {config.id === preset.id && <CheckIcon className="size-3" />}
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Colors section */}
        <div className="space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wide text-y2k-ink-muted">
            Colors (Hex)
          </h3>

          <ColorPickerField
            label="Ink (Outlines & Text)"
            value={config.colors.ink}
            onChange={(color) => dispatch({ type: "SET_COLOR", key: "ink", value: color })}
          />

          <ColorPickerField
            label="Panel Background"
            value={config.colors.panel}
            onChange={(color) => dispatch({ type: "SET_COLOR", key: "panel", value: color })}
            bgContext={config.colors.panel}
            fgLabel="Ink"
          />

          <ColorPickerField
            label="Lemon (Default Button)"
            value={config.colors.lemon}
            onChange={(color) => dispatch({ type: "SET_COLOR", key: "lemon", value: color })}
            bgContext={config.colors.lemon}
            fgLabel="Ink"
          />

          <ColorPickerField
            label="Pink Accent"
            value={config.colors.pink}
            onChange={(color) => dispatch({ type: "SET_COLOR", key: "pink", value: color })}
            bgContext={config.colors.pink}
            fgLabel="Ink"
          />

          <ColorPickerField
            label="Blue Primary"
            value={config.colors.blue}
            onChange={(color) => dispatch({ type: "SET_COLOR", key: "blue", value: color })}
            bgContext={config.colors.blue}
            fgLabel="Ink"
          />

          <ColorPickerField
            label="Mint Success"
            value={config.colors.mint}
            onChange={(color) => dispatch({ type: "SET_COLOR", key: "mint", value: color })}
            bgContext={config.colors.mint}
            fgLabel="Ink"
          />

          <ColorPickerField
            label="Lilac Secondary"
            value={config.colors.lilac}
            onChange={(color) => dispatch({ type: "SET_COLOR", key: "lilac", value: color })}
            bgContext={config.colors.lilac}
            fgLabel="Ink"
          />
        </div>

        {/* Shapes section */}
        <div className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-wide text-y2k-ink-muted">
            Shape (Borders & Radius)
          </h3>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span>Border Radius</span>
              <span className="font-mono">{config.shape.radius}px</span>
            </div>
            <Slider
              min={0}
              max={16}
              step={1}
              value={[config.shape.radius]}
              onValueChange={(val) => dispatch({ type: "SET_SHAPE", key: "radius", value: val[0] })}
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span>Window Border Width</span>
              <span className="font-mono">{config.shape.windowBorder}px</span>
            </div>
            <Slider
              min={1}
              max={4}
              step={1}
              value={[config.shape.windowBorder]}
              onValueChange={(val) => dispatch({ type: "SET_SHAPE", key: "windowBorder", value: val[0] })}
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span>Control Border Width</span>
              <span className="font-mono">{config.shape.controlBorder}px</span>
            </div>
            <Slider
              min={1}
              max={3}
              step={1}
              value={[config.shape.controlBorder]}
              onValueChange={(val) => dispatch({ type: "SET_SHAPE", key: "controlBorder", value: val[0] })}
            />
          </div>
        </div>

        {/* Typography section */}
        <div className="space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wide text-y2k-ink-muted">
            Typography
          </h3>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-[#1b1b3a]">Display Font</label>
            <Select
              value={config.typography.display}
              onValueChange={(val) => dispatch({ type: "SET_TYPOGRAPHY", key: "display", value: val })}
            >
              <SelectTrigger className="h-8 text-xs font-bold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Geist Sans">Geist Sans (Default)</SelectItem>
                <SelectItem value="Space Grotesk">Space Grotesk</SelectItem>
                <SelectItem value="Outfit">Outfit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-[#1b1b3a]">Body Font</label>
            <Select
              value={config.typography.body}
              onValueChange={(val) => dispatch({ type: "SET_TYPOGRAPHY", key: "body", value: val })}
            >
              <SelectTrigger className="h-8 text-xs font-bold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Geist Sans">Geist Sans</SelectItem>
                <SelectItem value="Inter">Inter (Standard)</SelectItem>
                <SelectItem value="Plus Jakarta Sans">Plus Jakarta Sans</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-[#1b1b3a]">Monospace Font</label>
            <Select
              value={config.typography.mono}
              onValueChange={(val) => dispatch({ type: "SET_TYPOGRAPHY", key: "mono", value: val })}
            >
              <SelectTrigger className="h-8 text-xs font-bold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Geist Mono">Geist Mono</SelectItem>
                <SelectItem value="JetBrains Mono">JetBrains Mono</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Motion section */}
        <div className="space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wide text-y2k-ink-muted">
            Motion & Speed
          </h3>

          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#1b1b3a]">Animations Enabled</label>
            <Switch
              checked={config.motion.enabled}
              onCheckedChange={(checked) => dispatch({ type: "SET_MOTION", key: "enabled", value: checked })}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-[#1b1b3a]">Transition Speed</label>
            <Select
              value={config.motion.speed}
              onValueChange={(val) => dispatch({ type: "SET_MOTION", key: "speed", value: val })}
              disabled={!config.motion.enabled}
            >
              <SelectTrigger className="h-8 text-xs font-bold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="smooth">Smooth (200ms)</SelectItem>
                <SelectItem value="snappy">Snappy (75ms)</SelectItem>
                <SelectItem value="off">Instant / Off</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Buttons Footer */}
      <div className="shrink-0 border-t-2 border-[#1b1b3a] bg-[#d7dde8] p-3 flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => dispatch({ type: "RESET" })}
          leadingIcon={<RotateCcwIcon className="size-3.5" />}
          className="flex-1"
        >
          Reset
        </Button>

        <Button
          size="sm"
          variant="pink"
          onClick={handleShare}
          leadingIcon={copiedLink ? <CheckIcon className="size-3.5" /> : <Share2Icon className="size-3.5" />}
          className="flex-1"
        >
          {copiedLink ? "Copied!" : "Share URL"}
        </Button>

        <ExportDialog
          trigger={
            <Button size="sm" variant="lemon" className="flex-1">
              Export CSS
            </Button>
          }
        />
      </div>
    </div>
  )
}

function MainLayout() {
  const [activePane, setActivePane] = React.useState<"controls" | "preview">("controls")
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkViewport()
    window.addEventListener("resize", checkViewport)
    return () => window.removeEventListener("resize", checkViewport)
  }, [])

  if (isMobile) {
    return (
      <div className="flex h-full flex-col overflow-hidden bg-[#f7f8fc]">
        {/* Mobile/Tablet Tab Switcher */}
        <div className="flex border-b-2 border-[#1b1b3a] bg-white shrink-0">
          <button
            type="button"
            onClick={() => setActivePane("controls")}
            className={`flex-1 py-3 text-xs font-black border-r border-[#1b1b3a] transition-all flex items-center justify-center gap-1.5 ${activePane === "controls"
              ? "bg-[#ffe45e] text-[#1b1b3a]"
              : "bg-white text-y2k-ink-muted hover:bg-[#d7dde8]"
              }`}
          >
            <span>🎨</span> Configure Theme
          </button>
          <button
            type="button"
            onClick={() => setActivePane("preview")}
            className={`flex-1 py-3 text-xs font-black transition-all flex items-center justify-center gap-1.5 ${activePane === "preview"
              ? "bg-[#ffe45e] text-[#1b1b3a]"
              : "bg-white text-y2k-ink-muted hover:bg-[#d7dde8]"
              }`}
          >
            <span>👁️</span> Live Preview
          </button>
        </div>

        {/* Panels Workspace */}
        <div className="flex-1 overflow-hidden">
          {activePane === "controls" ? (
            <div className="w-full h-full p-2 bg-[#f7f8fc]">
              <ControlsPane />
            </div>
          ) : (
            <div className="w-full h-full bg-[#f7f8fc]">
              <PreviewShowcase />
            </div>
          )}
        </div>
      </div>
    )
  }

  // Desktop Side-by-Side Panel (resizable controls panel)
  return (
    <ResizablePanelGroup orientation="horizontal" className="h-full w-full bg-[#f7f8fc]">
      {/* Left Side: Resizable Controls Panel */}
      <ResizablePanel defaultSize={300} minSize={22} maxSize={300} className="p-2 bg-[#f7f8fc]">
        <ControlsPane />
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* Right Side: Live Canvas Showcase */}
      <ResizablePanel defaultSize={72} className="bg-[#f7f8fc]">
        <PreviewShowcase />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default function ThemeGeneratorPage() {
  const [initialConfig, setInitialConfig] = React.useState<ThemeConfig | undefined>(undefined)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    // Read theme query configuration from URL hash
    const urlConfig = deserializeThemeFromUrl()
    setInitialConfig(urlConfig ?? PRESETS[0])
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f7f8fc]">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 rounded-full border-2 border-[#1b1b3a] border-t-[#ff8fcf] animate-spin" />
          <p className="text-xs font-semibold text-[#1b1b3a]/60">Loading palette desk...</p>
        </div>
      </div>
    )
  }

  return (
    <ThemeGeneratorProvider initialConfig={initialConfig}>
      <MainLayout />
    </ThemeGeneratorProvider>
  )
}
