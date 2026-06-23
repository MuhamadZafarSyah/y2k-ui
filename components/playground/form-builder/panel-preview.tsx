"use client"

import * as React from "react"
import { useBuilder } from "./store"
import { type FormField } from "./types"
import { cn } from "@/lib/utils"
import { WindowControls } from "@/components/ui/window-controls"

// ─── Actual Y2K Global Components ─────────────────────────
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { TagInput } from "@/components/ui/tag-input"
import { MailIcon, LockIcon } from "lucide-react"

// ─── Individual Field Renderers using Y2K Components ─────

function FieldRenderer({ field, mode }: { field: FormField; mode: "preview" | "filled" | "error" }) {
  const isError = mode === "error"
  const isFilled = mode === "filled"

  // Build a unique key for the preview (not for real form submission)
  const fieldKey = `preview_${field.id}`

  switch (field.type) {
    // ── Text / Number ──────────────────────────────
    case "text":
      return (
        <Input
          id={fieldKey}
          type="text"
          placeholder={field.placeholder ?? "Enter text..."}
          defaultValue={isFilled ? "Sample text" : ""}
          aria-invalid={isError && field.required ? true : undefined}
          required={field.required}
        />
      )
    case "number":
      return (
        <Input
          id={fieldKey}
          type="number"
          placeholder={field.placeholder ?? "0"}
          defaultValue={isFilled ? "42" : ""}
          min={field.validation?.min}
          max={field.validation?.max}
          aria-invalid={isError && field.required ? true : undefined}
          required={field.required}
        />
      )

    // ── Email (with leading icon) ───────────────────
    case "email":
      return (
        <Input
          id={fieldKey}
          type="email"
          placeholder={field.placeholder ?? "you@example.com"}
          defaultValue={isFilled ? "hello@y2kui.dev" : ""}
          leadingIcon={<MailIcon className="size-3.5" />}
          aria-invalid={isError || undefined}
          required={field.required}
        />
      )

    // ── Password (with leading icon) ────────────────
    case "password":
      return (
        <Input
          id={fieldKey}
          type="password"
          placeholder={field.placeholder ?? "••••••••"}
          defaultValue={isFilled ? "p@ssw0rd!" : ""}
          leadingIcon={<LockIcon className="size-3.5" />}
          aria-invalid={isError && field.required ? true : undefined}
          required={field.required}
        />
      )

    // ── Textarea ────────────────────────────────────
    case "textarea":
      return (
        <Textarea
          id={fieldKey}
          placeholder={field.placeholder ?? "Enter text..."}
          defaultValue={isFilled ? "Sample text for textarea field." : ""}
          aria-invalid={isError && field.required ? true : undefined}
          required={field.required}
        />
      )

    // ── Select (compound component) ──────────────────
    case "select": {
      const options = field.options ?? []
      return (
        <Select defaultValue={isFilled ? options[0]?.value : undefined}>
          <SelectTrigger id={fieldKey}>
            <SelectValue placeholder={field.placeholder ?? "Select..."} />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    }

    // ── Multi-select (TagInput) ──────────────────────
    case "multiselect": {
      const filledTags = isFilled
        ? (field.options?.slice(0, 2).map((o) => o.label) ?? [])
        : []
      return (
        <TagInput
          defaultValue={filledTags}
          placeholder={field.placeholder ?? "Type and press Enter..."}
        />
      )
    }

    // ── Checkbox ─────────────────────────────────────
    case "checkbox":
      return (
        <div className="flex items-center gap-2">
          <Checkbox
            id={fieldKey}
            defaultChecked={!!isFilled}
            required={field.required}
          />
          <Label htmlFor={fieldKey} className="font-normal text-sm cursor-pointer">
            {field.label}
          </Label>
        </div>
      )

    // ── Switch ───────────────────────────────────────
    case "switch":
      return (
        <div className="flex items-center gap-2">
          <Switch
            id={fieldKey}
            defaultChecked={!!isFilled}
            required={field.required}
          />
          <Label htmlFor={fieldKey} className="font-normal text-sm cursor-pointer">
            {field.label}
          </Label>
        </div>
      )

    // ── RadioGroup ───────────────────────────────────
    case "radio": {
      const options = field.options ?? []
      return (
        <RadioGroup defaultValue={isFilled ? options[0]?.value : undefined}>
          {options.map((opt) => (
            <div key={opt.value} className="flex items-center gap-2">
              <RadioGroupItem value={opt.value} id={`${fieldKey}_${opt.value}`} />
              <Label htmlFor={`${fieldKey}_${opt.value}`} className="font-normal text-sm cursor-pointer">
                {opt.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      )
    }

    // ── Date Picker (compound component) ─────────────
    case "date":
      return (
        <DatePicker defaultValue={isFilled ? new Date("2026-06-23") : undefined}>
          <DatePicker.Trigger placeholder={field.placeholder ?? "Pick a date"} />
          <DatePicker.Content />
        </DatePicker>
      )

    // ── Slider ───────────────────────────────────────
    case "slider": {
      const min = field.validation?.min ?? 0
      const max = field.validation?.max ?? 100
      return (
        <Slider
          min={min}
          max={max}
          defaultValue={[isFilled ? Math.round((max - min) * 0.75 + min) : Math.round((max - min) / 2 + min)]}
          label={field.label}
          showValue
        />
      )
    }

    default:
      return <div className="text-xs text-[#1b1b3a]/50 italic">Unsupported field type: {field.type}</div>
  }
}

// ─── Main Preview Panel ──────────────────────────────────

const gridStyle: React.CSSProperties = {
  backgroundImage:
    "radial-gradient(#1b1b3a26 1.5px, transparent 1.5px), linear-gradient(135deg, rgba(182, 156, 255, 0.08) 0%, rgba(142, 209, 252, 0.08) 100%)",
  backgroundSize: "16px 16px, 100% 100%",
  backgroundPosition: "-1px -1px, 0 0",
}

export function PanelPreview() {
  const {
    config,
    selectedFieldId,
    selectField,
    previewMode,
    setPreviewMode,
    activeStep,
    setActiveStep,
  } = useBuilder()

  const currentStep = config.mode === "multi" && config.steps.length > 0
    ? config.steps[activeStep]
    : null

  const fields = currentStep
    ? config.fields.filter((f) => f.stepId === currentStep.id)
    : config.fields

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
            preview.app
          </span>
        </div>

        <div className="flex items-center gap-1">
          {(["preview", "filled", "error"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setPreviewMode(mode)}
              aria-pressed={previewMode === mode}
              className={cn(
                "rounded border-2 px-2 py-0.5 text-[10px] font-bold transition-all",
                previewMode === mode
                  ? "border-[#1b1b3a] bg-[#ffe45e] text-[#1b1b3a]"
                  : "border-transparent bg-white/50 text-[#1b1b3a]/70 hover:border-[#1b1b3a]/40"
              )}
            >
              {mode === "preview" ? "Empty" : mode === "filled" ? "Filled" : "Error"}
            </button>
          ))}
          {/* <WindowControls hideMinimize hideClose /> */}
        </div>
      </div>

      {/* Preview area */}
      <div className="flex-1 overflow-auto" style={gridStyle}>
        <div className="flex h-full items-start justify-center p-4 md:p-6">
          <form
            className="w-full max-w-lg space-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Form title */}
            <div className="mb-4">
              <h2 className="text-lg font-bold text-[#1b1b3a]">{config.name || "Untitled Form"}</h2>
              {config.mode === "multi" && config.steps.length > 0 && (
                <p className="text-xs text-[#1b1b3a]/60">
                  Step {activeStep + 1} of {config.steps.length}
                </p>
              )}
            </div>

            {/* Multi-step navigation */}
            {config.mode === "multi" && config.steps.length > 0 && (
              <div className="flex flex-wrap items-center gap-1">
                {config.steps.map((step, idx) => (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    aria-current={idx === activeStep ? "step" : undefined}
                    className={cn(
                      "rounded border-2 px-2.5 py-1 text-xs font-semibold transition-all",
                      idx === activeStep
                        ? "border-[#1b1b3a] bg-[#ffe45e] text-[#1b1b3a]"
                        : idx < activeStep
                          ? "border-[#1b1b3a] bg-[#8ff0d0] text-[#1b1b3a]"
                          : "border-[#1b1b3a]/30 bg-transparent text-[#1b1b3a]/50"
                    )}
                  >
                    {step.title}
                  </button>
                ))}
              </div>
            )}

            {/* Fields */}
            {fields.length === 0 ? (
              <div className="rounded border-2 border-dashed border-[#1b1b3a]/30 py-12 text-center">
                <p className="text-xs font-semibold text-y2k-ink-muted">
                  Add fields from the palette to preview them here
                </p>
                <p className="mt-1 text-[11px] text-y2k-ink-muted">
                  ← Click field types in the left panel or choose a template
                </p>
              </div>
            ) : (
              <div
                className={cn(
                  config.columns === 2
                    ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                    : "flex flex-col gap-4"
                )}
              >
                {fields.map((field) => (
                  <div
                    key={field.id}
                    className={cn(
                      "space-y-1.5 rounded border-2 p-3 transition-all cursor-pointer",
                      selectedFieldId === field.id
                        ? "border-[#ff8fcf] bg-[#ff8fcf]/5"
                        : "border-transparent hover:border-[#1b1b3a]/20"
                    )}
                    onClick={() => selectField(field.id)}
                  >
                    {/* Label */}
                    {field.type !== "checkbox" && field.type !== "switch" && (
                      <Label
                        htmlFor={`preview_${field.id}`}
                        className="text-sm font-semibold text-[#1b1b3a]"
                      >
                        {field.label || field.name}
                        {field.required && (
                          <span className="ml-0.5 text-[#ff8fcf]">*</span>
                        )}
                      </Label>
                    )}
                    {field.description && (
                      <p className="text-xs text-[#1b1b3a]/60">{field.description}</p>
                    )}

                    {/* Field renderer */}
                    <FieldRenderer field={field} mode={previewMode} />

                    {/* Error message */}
                    {previewMode === "error" && (field.required || field.type === "email") && (
                      <p className="text-xs font-semibold text-[#ff8fcf]" role="alert">
                        {field.type === "email"
                          ? "Please enter a valid email address"
                          : `${field.label || "This field"} is required`}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Submit button */}
            {fields.length > 0 && (
              <button
                type="button"
                className="inline-flex h-9 items-center rounded border-2 border-[#1b1b3a] bg-[#ffe45e] px-5 text-sm font-bold text-[#1b1b3a] transition-all hover:bg-[#8ff0d0] hover:-translate-y-px"
              >
                {config.submitLabel || "Submit"}
              </button>
            )}

            {/* Multi-step nav buttons */}
            {config.mode === "multi" && config.steps.length > 0 && fields.length > 0 && (
              <div className="flex items-center justify-between gap-2 pt-2">
                <button
                  type="button"
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                  className="rounded border-2 border-[#1b1b3a] bg-white px-3 py-1 text-xs font-semibold text-[#1b1b3a] hover:bg-[#d7dde8] disabled:opacity-30"
                >
                  ← Back
                </button>
                {activeStep < config.steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setActiveStep(Math.min(config.steps.length - 1, activeStep + 1))}
                    className="rounded border-2 border-[#1b1b3a] bg-[#ffe45e] px-3 py-1 text-xs font-semibold text-[#1b1b3a] hover:bg-[#8ed1fc] hover:-translate-y-px"
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    type="button"
                    className="rounded border-2 border-[#1b1b3a] bg-[#ffe45e] px-4 py-1 text-xs font-bold text-[#1b1b3a] hover:bg-[#8ff0d0] hover:-translate-y-px"
                  >
                    {config.submitLabel}
                  </button>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
