"use client"

import * as React from "react"
import {
  PRESETS,
  type TargetType,
  type MotionPreset,
} from "@/components/playground/motion/motion-presets"
import { Label } from "@/components/ui/label"
import { WindowControls } from "@/components/ui/window-controls"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

interface PresetPanelProps {
  target: TargetType
  onTargetChange: (val: TargetType) => void
  activePreset: string
  onPresetSelect: (preset: MotionPreset) => void
}

export const PresetPanel = React.memo(function PresetPanel({
  target,
  onTargetChange,
  activePreset,
  onPresetSelect,
}: PresetPanelProps) {
  return (
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
        <div className="space-y-1.5">
          <Label>Preview Target</Label>
          <Select
            value={target}
            onValueChange={(val) => onTargetChange(val as TargetType)}
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

        <div className="space-y-2">
          <div className="text-[10px] font-black text-y2k-ink/50 uppercase tracking-wider">
            Animation Presets
          </div>
          <div className="space-y-1.5">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => onPresetSelect(p)}
                className={`w-full p-2 text-left border-2 border-y2k-ink rounded transition-all active:scale-[0.98] ${
                  activePreset === p.id
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
})
