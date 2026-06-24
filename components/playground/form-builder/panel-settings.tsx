"use client"

import * as React from "react"
import { useBuilder } from "./store"
import { type FormField, type FieldType } from "./types"
import { generateAllCode } from "./code-generator"
import { cn } from "@/lib/utils"
import { WindowControls } from "@/components/ui/window-controls"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  CheckIcon,
  CopyIcon,
  DownloadIcon,
  FileCodeIcon,
  SettingsIcon,
} from "lucide-react"
import { Highlight, type PrismTheme } from "prism-react-renderer"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// ─── Y2K Syntax Highlighting Theme ────────────────────────

const y2kCodeTheme: PrismTheme = {
  plain: { color: "#1b1b3a", backgroundColor: "transparent" },
  styles: [
    { types: ["comment", "prolog", "doctype", "cdata"], style: { color: "#1b1b3a80", fontStyle: "italic" } },
    { types: ["punctuation"], style: { color: "#b69cff" } },
    { types: ["property", "tag", "boolean", "number", "constant", "symbol", "deleted"], style: { color: "#1b1b8a" } },
    { types: ["selector", "attr-name", "string", "char", "builtin", "inserted"], style: { color: "#d97706" } },
    { types: ["operator", "entity", "url", "variable"], style: { color: "#b69cff" } },
    { types: ["atrule", "attr-value", "keyword"], style: { color: "#8b5cf6", fontWeight: "bold" } },
    { types: ["function", "class-name"], style: { color: "#2563eb", fontWeight: "bold" } },
    { types: ["regex", "important"], style: { color: "#e11d48" } },
    { types: ["deleted"], style: { color: "#ef4444" } },
    { types: ["inserted"], style: { color: "#22c55e" } },
    { types: ["italic"], style: { fontStyle: "italic" } },
    { types: ["bold"], style: { fontWeight: "bold" } },
  ],
}

// ─── Field Settings Tab ──────────────────────────────────

function FieldSettingsTab() {
  const { config, dispatch, selectedFieldId } = useBuilder()

  const field = config.fields.find((f) => f.id === selectedFieldId)

  if (!field) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <SettingsIcon className="size-8 text-y2k-ink-muted mb-2" />
        <p className="text-xs font-semibold text-[#1b1b3a]/50">
          Select a field to edit
        </p>
        <p className="text-[11px] text-y2k-ink-muted mt-1">
          Click a field in the preview or list
        </p>
      </div>
    )
  }

  const update = (patch: Partial<FormField>) => {
    dispatch({ type: "UPDATE_FIELD", fieldId: field.id, patch })
  }

  return (
    <div className="space-y-3 p-3">
      {/* Basic Info */}
      <div className="space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#1b1b3a]/60">
          Basic Info
        </p>
        <div className="space-y-1.5">
          <div>
            <Label htmlFor={`label-${field.id}`} className="text-xs">
              Label
            </Label>
            <input
              id={`label-${field.id}`}
              type="text"
              value={field.label}
              onChange={(e) => update({ label: e.target.value })}
              className="mt-0.5 h-7 w-full rounded border-2 border-[#1b1b3a] bg-white px-2 text-xs text-[#1b1b3a] outline-none focus-visible:ring-2 focus-visible:ring-[#ff8fcf]"
            />
          </div>
          <div>
            <Label htmlFor={`name-${field.id}`} className="text-xs">
              Field Key (name)
            </Label>
            <input
              id={`name-${field.id}`}
              type="text"
              value={field.name}
              onChange={(e) => update({ name: e.target.value })}
              className="mt-0.5 h-7 w-full rounded border-2 border-[#1b1b3a] bg-white px-2 font-mono text-xs text-[#1b1b3a] outline-none focus-visible:ring-2 focus-visible:ring-[#ff8fcf]"
            />
          </div>
          <div>
            <Label htmlFor={`placeholder-${field.id}`} className="text-xs">
              Placeholder
            </Label>
            <input
              id={`placeholder-${field.id}`}
              type="text"
              value={field.placeholder ?? ""}
              onChange={(e) => update({ placeholder: e.target.value || undefined })}
              className="mt-0.5 h-7 w-full rounded border-2 border-[#1b1b3a] bg-white px-2 text-xs text-[#1b1b3a] outline-none focus-visible:ring-2 focus-visible:ring-[#ff8fcf]"
            />
          </div>
          <div>
            <Label htmlFor={`desc-${field.id}`} className="text-xs">
              Description / Help text
            </Label>
            <input
              id={`desc-${field.id}`}
              type="text"
              value={field.description ?? ""}
              onChange={(e) => update({ description: e.target.value || undefined })}
              className="mt-0.5 h-7 w-full rounded border-2 border-[#1b1b3a] bg-white px-2 text-xs text-[#1b1b3a] outline-none focus-visible:ring-2 focus-visible:ring-[#ff8fcf]"
            />
          </div>
        </div>
      </div>

      {/* Required & Width */}
      <div className="space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#1b1b3a]/60">
          Options
        </p>
        <div className="flex items-center justify-between rounded border-2 border-[#1b1b3a] bg-[#d7dde8]/30 px-2.5 py-1.5">
          <Label htmlFor={`req-${field.id}`} className="text-xs cursor-pointer">
            Required
          </Label>
          <Switch
            id={`req-${field.id}`}
            checked={field.required}
            onCheckedChange={(checked) => update({ required: checked })}
          />
        </div>
        <div className="flex items-center justify-between rounded border-2 border-[#1b1b3a] bg-[#d7dde8]/30 px-2.5 py-1.5">
          <Label htmlFor={`width-${field.id}`} className="text-xs cursor-pointer">
            Half width
          </Label>
          <Switch
            id={`width-${field.id}`}
            checked={field.width === "half"}
            onCheckedChange={(checked) => update({ width: checked ? "half" : "full" })}
          />
        </div>
      </div>

      {/* Validation */}
      {["text", "textarea", "number", "password", "slider"].includes(field.type) && (
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#1b1b3a]/60">
            Validation
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {(field.type === "number" || field.type === "slider") && (
              <>
                <div>
                  <Label htmlFor={`min-${field.id}`} className="text-[10px]">
                    Min
                  </Label>
                  <input
                    id={`min-${field.id}`}
                    type="number"
                    value={field.validation?.min ?? ""}
                    onChange={(e) =>
                      update({
                        validation: {
                          ...field.validation,
                          min: e.target.value ? Number(e.target.value) : undefined,
                        },
                      })
                    }
                    className="mt-0.5 h-7 w-full rounded border-2 border-[#1b1b3a] bg-white px-2 text-xs text-[#1b1b3a] outline-none"
                  />
                </div>
                <div>
                  <Label htmlFor={`max-${field.id}`} className="text-[10px]">
                    Max
                  </Label>
                  <input
                    id={`max-${field.id}`}
                    type="number"
                    value={field.validation?.max ?? ""}
                    onChange={(e) =>
                      update({
                        validation: {
                          ...field.validation,
                          max: e.target.value ? Number(e.target.value) : undefined,
                        },
                      })
                    }
                    className="mt-0.5 h-7 w-full rounded border-2 border-[#1b1b3a] bg-white px-2 text-xs text-[#1b1b3a] outline-none"
                  />
                </div>
              </>
            )}
            {(field.type === "text" || field.type === "textarea" || field.type === "password") && (
              <>
                <div>
                  <Label htmlFor={`minL-${field.id}`} className="text-[10px]">
                    Min Length
                  </Label>
                  <input
                    id={`minL-${field.id}`}
                    type="number"
                    value={field.validation?.minLength ?? ""}
                    onChange={(e) =>
                      update({
                        validation: {
                          ...field.validation,
                          minLength: e.target.value ? Number(e.target.value) : undefined,
                        },
                      })
                    }
                    className="mt-0.5 h-7 w-full rounded border-2 border-[#1b1b3a] bg-white px-2 text-xs text-[#1b1b3a] outline-none"
                  />
                </div>
                <div>
                  <Label htmlFor={`maxL-${field.id}`} className="text-[10px]">
                    Max Length
                  </Label>
                  <input
                    id={`maxL-${field.id}`}
                    type="number"
                    value={field.validation?.maxLength ?? ""}
                    onChange={(e) =>
                      update({
                        validation: {
                          ...field.validation,
                          maxLength: e.target.value ? Number(e.target.value) : undefined,
                        },
                      })
                    }
                    className="mt-0.5 h-7 w-full rounded border-2 border-[#1b1b3a] bg-white px-2 text-xs text-[#1b1b3a] outline-none"
                  />
                </div>
              </>
            )}
          </div>
          {(field.type === "text" || field.type === "textarea") && (
            <div>
              <Label htmlFor={`pattern-${field.id}`} className="text-[10px]">
                Pattern (regex)
              </Label>
              <input
                id={`pattern-${field.id}`}
                type="text"
                value={field.validation?.pattern ?? ""}
                onChange={(e) =>
                  update({
                    validation: {
                      ...field.validation,
                      pattern: e.target.value || undefined,
                    },
                  })
                }
                className="mt-0.5 h-7 w-full rounded border-2 border-[#1b1b3a] bg-white px-2 font-mono text-xs text-[#1b1b3a] outline-none"
              />
            </div>
          )}
        </div>
      )}

      {/* Options (select / radio / multiselect) */}
      {["select", "radio", "multiselect"].includes(field.type) && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#1b1b3a]/60">
              Options
            </p>
            <button
              type="button"
              onClick={() => {
                const opts = [...(field.options ?? [])]
                opts.push({ label: `Option ${opts.length + 1}`, value: `option_${opts.length + 1}` })
                update({ options: opts })
              }}
              className="rounded border-2 border-[#1b1b3a] bg-[#8ff0d0] px-1.5 py-0.5 text-[10px] font-bold text-[#1b1b3a] hover:bg-[#ffe45e]"
            >
              + Add
            </button>
          </div>
          <div className="space-y-1">
            {(field.options ?? []).map((opt, idx) => (
              <div key={idx} className="flex items-center gap-1">
                <input
                  type="text"
                  value={opt.label}
                  onChange={(e) => {
                    const opts = [...(field.options ?? [])]
                    opts[idx] = { ...opts[idx], label: e.target.value }
                    update({ options: opts })
                  }}
                  placeholder="Label"
                  className="h-7 flex-1 rounded border-2 border-[#1b1b3a] bg-white px-2 text-xs text-[#1b1b3a] outline-none"
                />
                <input
                  type="text"
                  value={opt.value}
                  onChange={(e) => {
                    const opts = [...(field.options ?? [])]
                    opts[idx] = { ...opts[idx], value: e.target.value }
                    update({ options: opts })
                  }}
                  placeholder="Value"
                  className="h-7 w-24 rounded border-2 border-[#1b1b3a] bg-white px-2 text-xs font-mono text-[#1b1b3a] outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    const opts = field.options?.filter((_, i) => i !== idx)
                    update({ options: opts })
                  }}
                  aria-label="Remove option"
                  className="flex size-6 shrink-0 items-center justify-center rounded border-2 border-[#1b1b3a] bg-[#ff8fcf]/50 text-[#1b1b3a] hover:bg-[#ff8fcf] text-[10px]"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Default Value */}
      <div className="space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#1b1b3a]/60">
          Default Value
        </p>
        {field.type === "checkbox" || field.type === "switch" ? (
          <div className="flex items-center justify-between rounded border-2 border-[#1b1b3a] bg-[#d7dde8]/30 px-2.5 py-1.5">
            <Label className="text-xs">Default checked</Label>
            <Switch
              checked={!!field.defaultValue}
              onCheckedChange={(checked) => update({ defaultValue: checked })}
            />
          </div>
        ) : field.type === "select" || field.type === "radio" ? (
          <Select onValueChange={(e) => update({ defaultValue: e || undefined })}
            defaultValue={String(field.defaultValue ?? "")}>
            <SelectTrigger>
              <SelectValue placeholder="None" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">None</SelectItem>
              {field.options?.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

        ) : (
          <input
            type={field.type === "number" ? "number" : "text"}
            value={field.defaultValue !== undefined ? String(field.defaultValue) : ""}
            onChange={(e) => {
              const val = e.target.value
              if (!val) {
                update({ defaultValue: undefined })
                return
              }
              if (field.type === "number" || field.type === "slider") {
                update({ defaultValue: Number(val) })
              } else {
                update({ defaultValue: val })
              }
            }}
            className="h-7 w-full rounded border-2 border-[#1b1b3a] bg-white px-2 text-xs text-[#1b1b3a] outline-none"
          />
        )}
      </div>
    </div>
  )
}

// ─── Code Export Tab ─────────────────────────────────────

function CodeExportTab() {
  const { config } = useBuilder()
  const [activeFile, setActiveFile] = React.useState<"form" | "schema" | "action">("form")
  const [copied, setCopied] = React.useState<string | null>(null)

  const code = generateAllCode(config)

  const files = [
    { key: "form" as const, label: "form.tsx", code: code.form, language: "tsx" },
    { key: "schema" as const, label: "schema.ts", code: code.schema, language: "ts" },
    ...(code.action ? [{ key: "action" as const, label: "action.ts", code: code.action, language: "ts" }] : []),
  ]

  const active = files.find((f) => f.key === activeFile) ?? files[0]

  const handleCopy = async (fileKey: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(fileKey)
      setTimeout(() => setCopied(null), 2000)
    } catch {
      // Fallback
    }
  }

  const handleCopyAll = async () => {
    const allCode = files.map((f) => `// ─── ${f.label} ───\n\n${f.code}`).join("\n\n\n")
    try {
      await navigator.clipboard.writeText(allCode)
      setCopied("all")
      setTimeout(() => setCopied(null), 2000)
    } catch {
      // Fallback
    }
  }

  const handleDownload = () => {
    const allCode = files.map((f) => `// ─── ${f.label} ───\n\n${f.code}`).join("\n\n\n")
    const blob = new Blob([allCode], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${config.name.toLowerCase().replace(/\s+/g, "-") || "form"}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col h-full">
      {/* File tabs */}
      <div className="flex shrink-0 items-center gap-1 border-b-2 border-[#1b1b3a] bg-[#d7dde8] px-2 py-1">
        {files.map((file) => (
          <button
            key={file.key}
            type="button"
            onClick={() => setActiveFile(file.key)}
            aria-pressed={activeFile === file.key}
            className={cn(
              "rounded-t border-2 border-b-0 px-2.5 py-0.5 text-[10px] font-bold transition-all",
              activeFile === file.key
                ? "border-[#1b1b3a] bg-white text-[#1b1b3a]"
                : "border-transparent text-[#1b1b3a]/60 hover:border-[#1b1b3a]/30 hover:bg-white/50"
            )}
          >
            <FileCodeIcon className="inline size-3 mr-1" />
            {file.label}
          </button>
        ))}
        <div className="flex-1" />
        <button
          type="button"
          onClick={handleCopyAll}
          className="flex items-center gap-1 rounded border-2 border-[#1b1b3a] bg-white px-2 py-0.5 text-[10px] font-bold text-[#1b1b3a] hover:bg-[#8ed1fc] transition-all"
        >
          {copied === "all" ? (
            <>
              <CheckIcon className="size-3" /> Copied
            </>
          ) : (
            <>
              <CopyIcon className="size-3" /> Copy All
            </>
          )}
        </button>
        <button
          type="button"
          onClick={handleDownload}
          className="flex items-center gap-1 rounded border-2 border-[#1b1b3a] bg-[#ffe45e] px-2 py-0.5 text-[10px] font-bold text-[#1b1b3a] hover:bg-[#8ff0d0] transition-all"
        >
          <DownloadIcon className="size-3" /> Download
        </button>
      </div>

      {/* Code content */}
      <div className="flex-1 overflow-auto" key={activeFile}>
        <div className="relative min-w-0">
          <button
            type="button"
            onClick={() => handleCopy(active.key, active.code)}
            className="absolute right-2 top-2 z-10 flex items-center gap-1 rounded border-2 border-[#1b1b3a] bg-white px-2 py-0.5 text-[10px] font-bold text-[#1b1b3a] hover:bg-[#ffe45e] transition-all"
          >
            {copied === active.key ? (
              <>
                <CheckIcon className="size-3" /> Copied
              </>
            ) : (
              <>
                <CopyIcon className="size-3" /> Copy
              </>
            )}
          </button>
          <Highlight
            code={active.code}
            language={active.language === "ts" ? "tsx" : active.language}
            theme={y2kCodeTheme}
          >
            {({ tokens, getLineProps, getTokenProps }) => (
              <pre className="p-3 text-xs font-mono !bg-transparent whitespace-pre overflow-x-auto leading-relaxed min-h-full w-max min-w-full">
                <code>
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line })} className="table-row">
                      <span className="table-cell text-right pr-3 select-none text-y2k-ink/50 text-[10px] w-8">
                        {i + 1}
                      </span>
                      <span className="table-cell">
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                      </span>
                    </div>
                  ))}
                </code>
              </pre>
            )}
          </Highlight>
        </div>
      </div>

      {/* CLI install hint */}
      <div className="shrink-0 border-t-2 border-[#1b1b3a] bg-[#d7dde8] px-3 py-2">
        <p className="text-[10px] font-semibold text-[#1b1b3a]/60 mb-1">
          Install dependencies via CLI
        </p>
        <code className="block rounded border-2 border-[#1b1b3a] bg-[#1b1b3a] px-2.5 py-1.5 text-[10px] font-mono text-[#8ff0d0] select-all">
          npx y2kui add input button label textarea select checkbox switch radio-group slider date-picker tag-input stepper
        </code>
      </div>
    </div>
  )
}

// ─── Main Panel ──────────────────────────────────────────

export function PanelSettings() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border-2 border-[#1b1b3a] bg-white">
      {/* Title bar */}
      <div className="flex shrink-0 items-center justify-between border-b-2 border-[#1b1b3a] bg-[#b69cff] px-3 py-1.5">
        <div className="flex items-center gap-2">
          <span className="y2k-title-dots" aria-hidden>
            <span className="rounded-full size-2" />
            <span className="rounded-full size-2" />
            <span className="rounded-full size-2" />
          </span>
          <span className="font-mono text-[11px] font-black text-[#1b1b3a]">
            settings.app
          </span>
        </div>
        {/* <WindowControls hideMinimize hideClose /> */}
      </div>

      <Tabs defaultValue="settings" className="flex flex-1 flex-col overflow-hidden">
        <TabsList className="shrink-0 px-2 pt-1 gap-0">
          <TabsTrigger value="settings" className="gap-1">
            <SettingsIcon className="size-3" />
            Field Settings
          </TabsTrigger>
          <TabsTrigger value="code" className="gap-1">
            <FileCodeIcon className="size-3" />
            Code
          </TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="flex-1 overflow-y-auto p-0 border-none rounded-none bg-transparent">
          <FieldSettingsTab />
        </TabsContent>

        <TabsContent value="code" className="flex-1 overflow-hidden p-0 border-none rounded-none bg-transparent">
          <CodeExportTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
