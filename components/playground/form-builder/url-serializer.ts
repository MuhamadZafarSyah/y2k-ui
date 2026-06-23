"use client"

import type { FormConfig, FormField, FieldType } from "./types"

// ─── Serialize ─────────────────────────────────────────────
// Compress FormConfig into a URL-safe string using LZ-based approach.
// For MVP, we use JSON + base64 (URL-safe). This keeps the URL shareable.

const CONFIG_KEY = "fb"

export function serializeConfig(config: FormConfig): string {
  try {
    // Strip empty/default values to keep URL short
    const stripped = stripDefaults(config)
    const json = JSON.stringify(stripped)
    const encoded = btoa(encodeURIComponent(json))
    return encoded
  } catch {
    return ""
  }
}

export function deserializeConfig(encoded: string): FormConfig | null {
  try {
    const json = decodeURIComponent(atob(encoded))
    const parsed = JSON.parse(json)
    return restoreDefaults(parsed)
  } catch {
    return null
  }
}

/** Build URL with config embedded */
export function buildShareUrl(config: FormConfig): string {
  const encoded = serializeConfig(config)
  if (!encoded) return ""

  if (typeof window !== "undefined") {
    const url = new URL(window.location.href)
    url.pathname = "/playground/form-builder"
    url.searchParams.set(CONFIG_KEY, encoded)
    return url.toString()
  }
  return `/playground/form-builder?${CONFIG_KEY}=${encoded}`
}

/** Read config from URL search params */
export function readConfigFromUrl(): FormConfig | null {
  if (typeof window === "undefined") return null
  const params = new URLSearchParams(window.location.search)
  const encoded = params.get(CONFIG_KEY)
  if (!encoded) return null
  return deserializeConfig(encoded)
}

// ─── Compression helpers ──────────────────────────────────

function stripDefaults(config: FormConfig): Record<string, unknown> {
  const fields = config.fields.map((f) => {
    const stripped: Record<string, unknown> = { id: f.id, type: f.type, name: f.name, label: f.label }
    if (f.required) stripped.req = true
    if (f.placeholder) stripped.ph = f.placeholder
    if (f.description) stripped.desc = f.description
    if (f.defaultValue !== undefined) stripped.def = f.defaultValue
    if (f.width === "half") stripped.w = "half"
    if (f.stepId) stripped.sid = f.stepId
    if (f.options) stripped.opt = f.options.map((o) => o.value === o.label ? o.value : `${o.value}::${o.label}`)
    if (f.validation) {
      const v: Record<string, unknown> = {}
      if (f.validation.min !== undefined) v.min = f.validation.min
      if (f.validation.max !== undefined) v.max = f.validation.max
      if (f.validation.minLength !== undefined) v.minL = f.validation.minLength
      if (f.validation.maxLength !== undefined) v.maxL = f.validation.maxLength
      if (f.validation.pattern) v.pat = f.validation.pattern
      if (f.validation.message) v.msg = f.validation.message
      if (Object.keys(v).length > 0) stripped.val = v
    }
    return stripped
  })

  const result: Record<string, unknown> = {
    n: config.name,
    f: fields,
  }
  if (config.mode === "multi") result.m = "multi"
  if (config.validation === "client-server") result.v = "cs"
  if (config.columns === 2) result.c = 2
  if (config.submitLabel !== "Submit") result.s = config.submitLabel
  if (config.steps.length > 0) {
    result.st = config.steps.map((s) => ({ id: s.id, t: s.title, o: s.order }))
  }

  return result
}

function restoreDefaults(raw: Record<string, unknown> & { f?: unknown[]; st?: unknown[] }): FormConfig {
  const fields: FormField[] = (raw.f as Array<Record<string, unknown>> ?? []).map((f: Record<string, unknown>) => {
    const opts = f.opt as string[] | undefined
    return {
      id: f.id as string,
      type: f.type as FieldType,
      name: f.name as string,
      label: f.label as string,
      required: (f.req as boolean) ?? false,
      placeholder: f.ph as string | undefined,
      description: f.desc as string | undefined,
      defaultValue: f.def,
      width: ((f.w as string | undefined) === "half" ? "half" : "full") as "full" | "half",
      stepId: f.sid as string | undefined,
      options: opts?.map((o: string) => {
        const [value, label] = o.includes("::") ? o.split("::") : [o, o]
        return { label, value }
      }),
      validation: f.val as FormField["validation"] | undefined,
    }
  })

  return {
    name: (raw.n as string) ?? "My Form",
    mode: raw.m === "multi" ? "multi" : "single",
    validation: raw.v === "cs" ? "client-server" : "client",
    columns: (raw.c === 2 ? 2 : 1) as 1 | 2,
    submitLabel: (raw.s as string) ?? "Submit",
    steps: (raw.st as Array<Record<string, unknown>> ?? []).map((s: Record<string, unknown>) => ({
      id: s.id as string,
      title: s.t as string,
      order: (s.o as number) ?? 0,
    })),
    fields,
  }
}
