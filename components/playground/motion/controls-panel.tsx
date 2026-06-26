"use client"

import * as React from "react"
import {
  DEFAULT_CONFIG,
  type MotionConfig,
  type TriggerType,
} from "@/components/playground/motion/motion-presets"
import { BezierEditor } from "@/components/playground/motion/bezier-editor"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { WindowControls } from "@/components/ui/window-controls"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { RotateCcw, Share2, Check } from "lucide-react"

interface ControlsPanelProps {
  config: MotionConfig
  onConfigChange: React.Dispatch<React.SetStateAction<MotionConfig>>
  onBezierChange: (bezierStr: string) => void
  onShare: () => void
  copiedLink: boolean
}

export const ControlsPanel = React.memo(function ControlsPanel({
  config,
  onConfigChange,
  onBezierChange,
  onShare,
  copiedLink,
}: ControlsPanelProps) {
  return (
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
        <div className="space-y-1">
          <Label>Animation Name</Label>
          <Input
            value={config.name}
            onChange={(e) => onConfigChange(prev => ({ ...prev, name: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "") }))}
            placeholder="e.g. wiggle-fast"
            className="h-8 text-xs font-bold"
          />
        </div>

        <div className="space-y-1.5">
          <Label>Trigger Event</Label>
          <Select
            value={config.trigger}
            onValueChange={(val) => onConfigChange(prev => ({ ...prev, trigger: val as TriggerType }))}
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

        <Slider
          label="Duration"
          showValue
          trailingLabel="ms"
          min={100}
          max={5000}
          step={50}
          value={[config.duration]}
          onValueChange={([val]) => onConfigChange(prev => ({ ...prev, duration: val }))}
          variant="pink"
        />

        <Slider
          label="Delay"
          showValue
          trailingLabel="ms"
          min={0}
          max={3000}
          step={50}
          value={[config.delay]}
          onValueChange={([val]) => onConfigChange(prev => ({ ...prev, delay: val }))}
          variant="pink"
        />

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
                onConfigChange(prev => ({ ...prev, iterationCount: val }))
              }}
              className="h-8 w-20 text-xs font-bold"
            />
            <Label className="flex items-center gap-1.5 text-xs font-bold text-y2k-ink cursor-pointer">
              <Checkbox
                checked={config.iterationCount === "infinite"}
                onCheckedChange={(checked) => {
                  onConfigChange(prev => ({
                    ...prev,
                    iterationCount: checked ? "infinite" : 1,
                  }))
                }}
              />
              Infinite Loop
            </Label>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label>Animation Direction</Label>
          <Select
            value={config.direction}
            onValueChange={(val) => onConfigChange(prev => ({ ...prev, direction: val as any }))}
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

        <div className="space-y-1.5">
          <Label>Animation Fill Mode</Label>
          <Select
            value={config.fillMode}
            onValueChange={(val) => onConfigChange(prev => ({ ...prev, fillMode: val as any }))}
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

        <div className="space-y-1.5 border-t border-y2k-ink/10 pt-3">
          <BezierEditor value={config.easing.value} onChange={onBezierChange} />
        </div>

        <div className="flex items-center justify-between border-t border-y2k-ink/10 pt-3">
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-y2k-ink">Respect Reduced Motion</div>
            <div className="text-[10px] text-y2k-ink-muted">Adds fallback media queries to output code</div>
          </div>
          <Switch
            checked={config.respectReducedMotion}
            onCheckedChange={(checked) => onConfigChange(prev => ({ ...prev, respectReducedMotion: checked }))}
          />
        </div>
      </div>

      <div className="shrink-0 border-t-2 border-y2k-ink bg-y2k-panel p-3 flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onConfigChange(DEFAULT_CONFIG)}
          leadingIcon={<RotateCcw className="size-3.5" />}
          className="flex-1"
        >
          Reset Config
        </Button>

        <Button
          size="sm"
          variant="pink"
          onClick={onShare}
          leadingIcon={copiedLink ? <Check className="size-3.5" /> : <Share2 className="size-3.5" />}
          className="flex-1"
        >
          {copiedLink ? "Copied!" : "Share Preset"}
        </Button>
      </div>
    </div>
  )
})
