"use client"

import * as React from "react"
import { BuilderProvider, useBuilder } from "@/components/playground/form-builder/store"
import { PanelPalette } from "@/components/playground/form-builder/panel-palette"
import { PanelPreview } from "@/components/playground/form-builder/panel-preview"
import { PanelSettings } from "@/components/playground/form-builder/panel-settings"
import { readConfigFromUrl, buildShareUrl } from "@/components/playground/form-builder/url-serializer"
import { type FormConfig, createDefaultConfig } from "@/components/playground/form-builder/types"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable"
import {
  Share2Icon,
  CheckIcon,
  LinkIcon,
  PanelLeftIcon,
  PanelRightIcon,
  EyeIcon,
  SettingsIcon,
  LayersIcon,
  MonitorIcon,
} from "lucide-react"

// ─── Global Settings Bar ──────────────────────────────────

function GlobalSettingsBar() {
  const { config, dispatch } = useBuilder()
  const [shareUrl, setShareUrl] = React.useState("")
  const [copied, setCopied] = React.useState(false)

  const handleShare = () => {
    const url = buildShareUrl(config)
    setShareUrl(url)
    try {
      navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2 border-b-3 border-[#1b1b3a] bg-white px-3 py-1.5">
      {/* Form Name */}
      <div className="flex items-center gap-1.5">
        <Label htmlFor="form-name" className="text-[11px] font-bold whitespace-nowrap">
          Form
        </Label>
        <Input
          id="form-name"
          value={config.name}
          onChange={(e) => dispatch({ type: "SET_NAME", name: e.target.value })}
          className="h-6 w-36 text-[11px] px-2"
        />
      </div>

      {/* Compact toggles */}
      <span className="text-[#1b1b3a]/20 hidden sm:inline">|</span>

      <label className="hidden sm:flex items-center gap-1 cursor-pointer">
        <Switch
          checked={config.mode === "multi"}
          onCheckedChange={(v) => dispatch({ type: "SET_MODE", mode: v ? "multi" : "single" })}
        />
        <span className="text-[10px] font-semibold text-[#1b1b3a]">Multi</span>
      </label>

      <label className="hidden sm:flex items-center gap-1 cursor-pointer">
        <Switch
          checked={config.validation === "client-server"}
          onCheckedChange={(v) =>
            dispatch({ type: "SET_VALIDATION", validation: v ? "client-server" : "client" })
          }
        />
        <span className="text-[10px] font-semibold text-[#1b1b3a]">Server</span>
      </label>

      <label className="hidden sm:flex items-center gap-1 cursor-pointer">
        <Switch
          checked={config.columns === 2}
          onCheckedChange={(v) => dispatch({ type: "SET_COLUMNS", columns: v ? 2 : 1 })}
        />
        <span className="text-[10px] font-semibold text-[#1b1b3a]">2-Col</span>
      </label>

      {/* Submit label */}
      <div className="hidden sm:flex items-center gap-1.5">
        <span className="text-[#1b1b3a]/20">|</span>
        <Input
          value={config.submitLabel}
          onChange={(e) => dispatch({ type: "SET_SUBMIT_LABEL", submitLabel: e.target.value })}
          className="h-6 w-20 text-[11px] px-2"
        />
      </div>

      {/* Multi-step controls */}
      {config.mode === "multi" && (
        <>
          <span className="text-[#1b1b3a]/20">|</span>
          <div className="flex items-center gap-1">
            {config.steps.map((step, idx) => (
              <div key={step.id} className="flex items-center gap-0.5">
                <input
                  value={step.title}
                  onChange={(e) =>
                    dispatch({ type: "UPDATE_STEP", stepId: step.id, patch: { title: e.target.value } })
                  }
                  className="h-6 w-16 rounded border-2 border-[#1b1b3a] bg-white px-1.5 text-[10px] font-semibold text-[#1b1b3a] outline-none"
                />
                {config.steps.length > 1 && (
                  <button
                    type="button"
                    onClick={() => dispatch({ type: "REMOVE_STEP", stepId: step.id })}
                    className="flex size-4 items-center justify-center rounded border border-[#1b1b3a] bg-[#ff8fcf]/50 text-[9px] text-[#1b1b3a] hover:bg-[#ff8fcf]"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => dispatch({ type: "ADD_STEP" })}
              className="flex size-6 items-center justify-center rounded border-2 border-dashed border-[#1b1b3a]/40 text-[11px] font-bold text-[#1b1b3a]/50 hover:border-[#1b1b3a] hover:bg-[#ffe45e]"
            >
              +
            </button>
          </div>
        </>
      )}

      <div className="flex-1" />

      {/* Share + link feedback */}
      {shareUrl && (
        <span className="hidden sm:inline-flex items-center gap-1 rounded border-2 border-[#1b1b3a] bg-[#d7dde8] px-2 py-0.5 text-[10px] font-mono text-[#1b1b3a] max-w-40 truncate">
          {copied ? <><CheckIcon className="size-3 text-[#8ff0d0]" /> Copied!</> : <><LinkIcon className="size-3" /> Link ready</>}
        </span>
      )}
      {/* <Button size="xs" variant="blue" onClick={handleShare} leadingIcon={<Share2Icon className="size-3" />}>
        Share
      </Button> */}
    </div>
  )
}

// ─── Desktop Builder (Resizable 3-Panel) ──────────────────

function DesktopBuilder() {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <GlobalSettingsBar />

      <ResizablePanelGroup className="flex-1">
        {/* Left Panel */}
        <ResizablePanel defaultSize={25} minSize={18} maxSize={400}>
          <div className="absolute inset-0 overflow-hidden p-1.5 bg-[#f7f8fc]">
            <PanelPalette />
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Center Panel */}
        <ResizablePanel defaultSize={45} minSize={30}>
          <div className="absolute inset-0 overflow-hidden p-1.5 bg-[#f7f8fc]">
            <PanelPreview />
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right Panel */}
        <ResizablePanel defaultSize={30} minSize={18} maxSize={400}>
          <div className="absolute inset-0 overflow-hidden p-1.5 bg-[#f7f8fc]">
            <PanelSettings />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

// ─── Mobile Builder (Tab-based) ──────────────────────────

function MobileBuilder() {
  const { config, dispatch } = useBuilder()
  const [activeTab, setActiveTab] = React.useState("preview")

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <GlobalSettingsBar />

      {/* Tab content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === "palette" && (
          <div className="h-full p-1.5 bg-[#f7f8fc]">
            <PanelPalette />
          </div>
        )}
        {activeTab === "preview" && (
          <div className="h-full p-1.5 bg-[#f7f8fc]">
            <PanelPreview />
          </div>
        )}
        {activeTab === "settings" && (
          <div className="h-full p-1.5 bg-[#f7f8fc]">
            <PanelSettings />
          </div>
        )}
      </div>

      {/* Bottom tab bar */}
      <div className="flex shrink-0 items-center border-t-3 border-[#1b1b3a] bg-white">
        {[
          { id: "palette", icon: LayersIcon, label: "Fields" },
          { id: "preview", icon: EyeIcon, label: "Preview" },
          { id: "settings", icon: SettingsIcon, label: "Settings" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            aria-pressed={activeTab === tab.id}
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-bold transition-all",
              activeTab === tab.id
                ? "bg-[#ffe45e] text-[#1b1b3a] border-t-2 border-[#1b1b3a] -mt-0.5"
                : "bg-white text-[#1b1b3a]/60 hover:bg-[#d7dde8]"
            )}
          >
            <tab.icon className="size-4" />
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Tablet Builder (Sidebar toggle) ─────────────────────

function TabletBuilder() {
  const [showLeft, setShowLeft] = React.useState(true)
  const [showRight, setShowRight] = React.useState(false)
  const { selectedFieldId } = useBuilder()

  // Auto-open right panel when a field is selected
  React.useEffect(() => {
    if (selectedFieldId) setShowRight(true)
  }, [selectedFieldId])

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <GlobalSettingsBar />

      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar (toggle) */}
        <div
          className={cn(
            "shrink-0 transition-all duration-200 overflow-hidden border-r-2 border-[#1b1b3a] bg-[#f7f8fc]",
            showLeft ? "w-64" : "w-0 border-r-0"
          )}
        >
          <div className="w-64 h-full p-1.5">
            <PanelPalette />
          </div>
        </div>

        {/* Center */}
        <div className="flex-1 min-w-0 p-1.5 bg-[#f7f8fc] overflow-auto">
          {/* Toggle buttons */}
          <div className="flex items-center gap-1 mb-1">
            <button
              type="button"
              onClick={() => setShowLeft((v) => !v)}
              aria-pressed={showLeft}
              className={cn(
                "flex items-center gap-1 rounded border-2 border-[#1b1b3a] px-2 py-0.5 text-[10px] font-bold transition-all",
                showLeft ? "bg-[#ffe45e] text-[#1b1b3a]" : "bg-white text-[#1b1b3a]/60"
              )}
            >
              <PanelLeftIcon className="size-3" /> Fields
            </button>
            <button
              type="button"
              onClick={() => setShowRight((v) => !v)}
              aria-pressed={showRight}
              className={cn(
                "flex items-center gap-1 rounded border-2 border-[#1b1b3a] px-2 py-0.5 text-[10px] font-bold transition-all",
                showRight ? "bg-[#ffe45e] text-[#1b1b3a]" : "bg-white text-[#1b1b3a]/60"
              )}
            >
              <PanelRightIcon className="size-3" /> Settings
            </button>
          </div>

          <div className="h-[calc(100%-2rem)]">
            <PanelPreview />
          </div>
        </div>

        {/* Right sidebar (toggle) */}
        <div
          className={cn(
            "shrink-0 transition-all duration-200 overflow-hidden border-l-2 border-[#1b1b3a] bg-[#f7f8fc]",
            showRight ? "w-72" : "w-0 border-l-0"
          )}
        >
          <div className="w-72 h-full p-1.5">
            <PanelSettings />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────

type Breakpoint = "desktop" | "tablet" | "mobile"

export default function FormBuilderPage() {
  const [initialConfig, setInitialConfig] = React.useState<FormConfig | undefined>(undefined)
  const [breakpoint, setBreakpoint] = React.useState<Breakpoint>("desktop")
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const checkBreakpoint = () => {
      const w = window.innerWidth
      if (w < 768) setBreakpoint("mobile")
      else if (w < 1024) setBreakpoint("tablet")
      else setBreakpoint("desktop")
    }
    checkBreakpoint()
    window.addEventListener("resize", checkBreakpoint)

    const urlConfig = readConfigFromUrl()
    setInitialConfig(urlConfig ?? createDefaultConfig())
    setLoading(false)

    return () => window.removeEventListener("resize", checkBreakpoint)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f7f8fc]">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 rounded-full border-2 border-[#1b1b3a] border-t-[#ff8fcf] animate-spin" />
          <p className="text-xs font-semibold text-[#1b1b3a]/60">Loading builder...</p>
        </div>
      </div>
    )
  }

  return (
    <BuilderProvider initialConfig={initialConfig}>
      {breakpoint === "mobile" ? (
        <MobileBuilder />
      ) : breakpoint === "tablet" ? (
        <TabletBuilder />
      ) : (
        <DesktopBuilder />
      )}
    </BuilderProvider>
  )
}
