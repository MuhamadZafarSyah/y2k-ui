// ─── Form Builder Types ────────────────────────────────────
// Mirrors PRD §9.1 — single source of truth for the builder state.

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "email"
  | "password"
  | "select"
  | "multiselect"
  | "checkbox"
  | "switch"
  | "radio"
  | "date"
  | "slider"

export interface FormField {
  id: string
  type: FieldType
  name: string
  label: string
  placeholder?: string
  description?: string
  required: boolean
  defaultValue?: unknown
  options?: { label: string; value: string }[]
  validation?: {
    min?: number
    max?: number
    minLength?: number
    maxLength?: number
    pattern?: string
    message?: string
  }
  width?: "full" | "half"
  stepId?: string
}

export interface FormStep {
  id: string
  title: string
  order: number
}

export interface FormConfig {
  name: string
  mode: "single" | "multi"
  validation: "client" | "client-server"
  columns: 1 | 2
  submitLabel: string
  steps: FormStep[]
  fields: FormField[]
}

/** Palette item shown in the left panel */
export interface PaletteItem {
  type: FieldType
  label: string
  icon: string
  description: string
}

export const DEFAULT_FIELD_NAME: Record<FieldType, string> = {
  text: "textField",
  textarea: "textareaField",
  number: "numberField",
  email: "emailField",
  password: "passwordField",
  select: "selectField",
  multiselect: "multiSelectField",
  checkbox: "checkboxField",
  switch: "switchField",
  radio: "radioField",
  date: "dateField",
  slider: "sliderField",
}

export const FIELD_LABELS: Record<FieldType, string> = {
  text: "Text Input",
  textarea: "Textarea",
  number: "Number",
  email: "Email",
  password: "Password",
  select: "Select",
  multiselect: "Multi-select",
  checkbox: "Checkbox",
  switch: "Switch",
  radio: "Radio Group",
  date: "Date Picker",
  slider: "Slider",
}

let _fieldCounter = 0
export function generateId(): string {
  _fieldCounter++
  return `f_${Date.now()}_${_fieldCounter}`
}

export function createDefaultField(type: FieldType): FormField {
  const id = generateId()
  const name = `${DEFAULT_FIELD_NAME[type]}_${_fieldCounter}`

  const base: FormField = {
    id,
    type,
    name,
    label: FIELD_LABELS[type],
    required: false,
    width: "full",
  }

  // Set default options for select/radio/multiselect
  if (type === "select" || type === "radio" || type === "multiselect") {
    base.options = [
      { label: "Option 1", value: "option_1" },
      { label: "Option 2", value: "option_2" },
      { label: "Option 3", value: "option_3" },
    ]
  }

  if (type === "checkbox" || type === "switch") {
    base.defaultValue = false
  }

  if (type === "slider") {
    base.defaultValue = 50
    base.validation = { min: 0, max: 100 }
  }

  if (type === "number") {
    base.defaultValue = 0
  }

  if (type === "date") {
    base.defaultValue = undefined
  }

  return base
}

export const PALETTE_ITEMS: PaletteItem[] = [
  { type: "text", label: "Text Input", icon: "Aa", description: "Single-line text" },
  { type: "textarea", label: "Textarea", icon: "¶", description: "Multi-line text" },
  { type: "number", label: "Number", icon: "#", description: "Numeric input" },
  { type: "email", label: "Email", icon: "@", description: "Email address" },
  { type: "password", label: "Password", icon: "•••", description: "Password field" },
  { type: "select", label: "Select", icon: "▼", description: "Dropdown select" },
  { type: "multiselect", label: "Multi-select", icon: "☰", description: "Tag/multi-select" },
  { type: "checkbox", label: "Checkbox", icon: "☑", description: "Single checkbox" },
  { type: "switch", label: "Switch", icon: "⇄", description: "Toggle switch" },
  { type: "radio", label: "Radio Group", icon: "◉", description: "Radio buttons" },
  { type: "date", label: "Date Picker", icon: "📅", description: "Date picker" },
  { type: "slider", label: "Slider", icon: "—", description: "Range slider" },
]

export function createDefaultConfig(): FormConfig {
  return {
    name: "My Form",
    mode: "single",
    validation: "client",
    columns: 1,
    submitLabel: "Submit",
    steps: [{ id: "step_1", title: "Step 1", order: 0 }],
    fields: [],
  }
}
