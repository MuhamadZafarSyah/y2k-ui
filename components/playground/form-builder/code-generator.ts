import type { FormConfig, FormField, FieldType } from "./types"

// ─── Helpers ───────────────────────────────────────────────

function toPascalCase(str: string): string {
  return str
    .split(/[^a-zA-Z0-9]/g)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join("")
}

function indent(code: string, level: number): string {
  const pad = "  ".repeat(Math.max(0, level))
  return code
    .split("\n")
    .map((line) => (line ? pad + line : line))
    .join("\n")
}

function fieldToZod(f: FormField): string {
  const { type, required, validation } = f

  let base = ""

  switch (type) {
    case "text":
    case "textarea":
      base = "z.string()"
      break
    case "number":
      base = "z.coerce.number()"
      if (validation?.min !== undefined) {
        base += `.min(${validation.min}, "Minimum ${validation.min}")`
      }
      if (validation?.max !== undefined) {
        base += `.max(${validation.max}, "Maximum ${validation.max}")`
      }
      break
    case "email":
      base = "z.string().email('Invalid email address')"
      break
    case "password":
      base = "z.string().min(8, 'Password must be at least 8 characters')"
      break
    case "select":
      if (f.options && f.options.length > 0) {
        const values = f.options.map((o) => `"${o.value}"`).join(" | ")
        base = `z.enum([${values}])`
      } else {
        base = "z.string()"
      }
      break
    case "multiselect":
      base = "z.array(z.string())"
      if (required) {
        base += ".min(1, 'Select at least one option')"
      }
      break
    case "checkbox":
    case "switch":
      base = "z.boolean()"
      break
    case "radio":
      if (f.options && f.options.length > 0) {
        const values = f.options.map((o) => `"${o.value}"`).join(" | ")
        base = `z.enum([${values}])`
      } else {
        base = "z.string()"
      }
      break
    case "date":
      base = "z.date()"
      break
    case "slider":
      base = "z.number()"
      if (validation?.min !== undefined) base += `.min(${validation.min})`
      if (validation?.max !== undefined) base += `.max(${validation.max})`
      break
    default:
      base = "z.string()"
  }

  // Required on strings and enums
  if (!required && (type === "text" || type === "textarea" || type === "select" || type === "radio")) {
    base += ".optional()"
  }

  if (type === "email" && !required) {
    base += ".optional()"
  }

  if (type === "password" && !required) {
    // Password as optional but with min length if provided
    if (validation?.minLength) {
      base = `z.string().min(${validation.minLength}).optional()`
    } else {
      base += ".optional()"
    }
  }

  // Min/max length for string types
  if ((type === "text" || type === "textarea" || type === "password") && validation) {
    if (validation.minLength !== undefined) {
      // Rebuild: we need to check if we already have something
      if (base.startsWith("z.string().optional()")) {
        base = `z.string().min(${validation.minLength}).optional()`
      } else if (base.startsWith("z.string().min(")) {
        // already has min
      } else {
        const optional = !required ? ".optional()" : ""
        base = `z.string().min(${validation.minLength}, "Minimum ${validation.minLength} characters")${optional}`
      }
    }
    if (validation.maxLength !== undefined) {
      base = base.replace(".optional()", `.max(${validation.maxLength}, "Maximum ${validation.maxLength} characters").optional()`)
      if (!base.includes(".optional()")) {
        base = base + `.max(${validation.maxLength}, "Maximum ${validation.maxLength} characters")`
      }
    }
  }

  if (validation?.pattern) {
    base = base.replace(/\.optional\(\)$/, `.regex(new RegExp("${validation.pattern.replace(/"/g, '\\"')}"), "${validation.message ?? "Invalid format"}").optional()`)
    if (!base.includes(".optional()")) {
      base = base + `.regex(new RegExp("${validation.pattern.replace(/"/g, '\\"')}"), "${validation.message ?? "Invalid format"}")`
    }
  }

  // Default value
  if (f.defaultValue !== undefined && !required) {
    if (type === "checkbox" || type === "switch") {
      // boolean defaults
    } else if (type === "number" || type === "slider") {
      base = base.replace(".optional()", `.default(${f.defaultValue}).optional()`)
    } else if (type === "select" || type === "radio") {
      base = base.replace(".optional()", `.default("${f.defaultValue}").optional()`)
    }
  }

  return base
}

// ─── Schema Generator ──────────────────────────────────────

export function generateSchema(config: FormConfig): string {
  const formName = toPascalCase(config.name || "MyForm")
  const hasFields = config.fields.length > 0

  let schema = `import { z } from "zod"\n\n`
  schema += `export const ${formName}Schema = z.object({\n`

  if (!hasFields) {
    schema += `  // Add your fields here\n`
    schema += `  name: z.string().optional(),\n`
  } else {
    config.fields.forEach((f) => {
      const zod = fieldToZod(f)
      schema += `  ${f.name}: ${zod},\n`
    })
  }

  schema += `})\n\n`
  schema += `export type ${formName}Values = z.infer<typeof ${formName}Schema>\n`

  return schema
}

// ─── Form Component Generator ──────────────────────────────

function buildImports(fields: FormField[]): string {
  const componentTypeMap: Record<FieldType, string> = {
    text: "Input",
    textarea: "Textarea",
    number: "Input",
    email: "Input",
    password: "Input",
    select: "Select",
    multiselect: "TagInput",
    checkbox: "Checkbox",
    switch: "Switch",
    radio: "RadioGroup",
    date: "DatePicker",
    slider: "Slider",
  }

  const needed = new Set<string>()
  needed.add("Button")
  needed.add("Label")
  needed.add("Input")

  fields.forEach((f) => {
    const comp = componentTypeMap[f.type]
    if (comp) needed.add(comp)

    if (f.type === "select") {
      needed.add("SelectContent")
      needed.add("SelectItem")
      needed.add("SelectTrigger")
      needed.add("SelectValue")
    }

    if (f.type === "radio") {
      needed.add("RadioGroupItem")
    }
  })

  const importSet = new Set<string>()
  importSet.add("Input")

  fields.forEach((f) => {
    importSet.add(componentTypeMap[f.type])
  })
  importSet.add("Button")

  // Build import string
  const comps = Array.from(importSet).filter(Boolean).sort()
  return `import { ${comps.join(", ")} } from "@/components/ui/button"\n// Note: adjust imports based on your actual component paths`
}

function fieldToJsx(f: FormField, formName: string): string {
  const { type, name, label, placeholder, description, required, options } = f

  const labelEl = label
    ? `      <Label htmlFor="${name}">${label}${required ? " *" : ""}</Label>\n`
    : ""

  const descEl = description
    ? `      <p className="text-xs text-[#1b1b3a]/60">{${JSON.stringify(description)}}</p>\n`
    : ""

  let inputEl = ""
  const registerStr = `{...register("${name}")}`

  switch (type) {
    case "text":
      inputEl = `      <Input id="${name}" type="text" placeholder={${JSON.stringify(placeholder ?? "")}} ${registerStr} />\n`
      break
    case "textarea":
      inputEl = `      <Textarea id="${name}" placeholder={${JSON.stringify(placeholder ?? "")}} ${registerStr} />\n`
      break
    case "number":
      inputEl = `      <Input id="${name}" type="number" placeholder={${JSON.stringify(placeholder ?? "")}} ${registerStr} />\n`
      break
    case "email":
      inputEl = `      <Input id="${name}" type="email" placeholder={${JSON.stringify(placeholder ?? "you@example.com")}} leadingIcon={<MailIcon className="size-3.5" />} ${registerStr} />\n`
      break
    case "password":
      inputEl = `      <Input id="${name}" type="password" placeholder={${JSON.stringify(placeholder ?? "••••••••")}} leadingIcon={<LockIcon className="size-3.5" />} ${registerStr} />\n`
      break
    case "select":
      const selectOptions = options?.map((o) =>
        `          <SelectItem value="${o.value}">${o.label}</SelectItem>`
      ).join("\n") ?? ""
      inputEl = `      <Select onValueChange={(v) => setValue("${name}", v)} defaultValue={watch("${name}")}>\n        <SelectTrigger id="${name}">\n          <SelectValue placeholder={${JSON.stringify(placeholder ?? "Select...")}} />\n        </SelectTrigger>\n        <SelectContent>\n${selectOptions}\n        </SelectContent>\n      </Select>\n`
      break
    case "multiselect":
      inputEl = `      <TagInput\n        id="${name}"\n        placeholder={${JSON.stringify(placeholder ?? "Type and press Enter...")}}\n        value={watch("${name}")}\n        onChange={(tags) => setValue("${name}", tags as [string, ...string[]])}\n      />\n`
      break
    case "checkbox":
      inputEl = `      <div className="flex items-center gap-2">\n        <Checkbox id="${name}" ${registerStr} />\n        <Label htmlFor="${name}" className="font-normal">${label}</Label>\n      </div>\n`
      break
    case "switch":
      inputEl = `      <div className="flex items-center gap-2">\n        <Switch id="${name}" ${registerStr} />\n        <Label htmlFor="${name}" className="font-normal">${label}</Label>\n      </div>\n`
      break
    case "radio":
      const radioOptions = options?.map((o) =>
        `          <div className="flex items-center gap-2">\n            <RadioGroupItem value="${o.value}" id="${name}_${o.value}" />\n            <Label htmlFor="${name}_${o.value}" className="font-normal">${o.label}</Label>\n          </div>`
      ).join("\n") ?? ""
      inputEl = `      <RadioGroup defaultValue={watch("${name}")} onValueChange={(v) => setValue("${name}", v)}>\n${radioOptions}\n      </RadioGroup>\n`
      break
    case "date":
      inputEl = `      <DatePicker>\n        <DatePicker.Trigger placeholder={${JSON.stringify(placeholder ?? "Pick a date")}} />\n        <DatePicker.Content />\n      </DatePicker>\n`
      break
    case "slider":
      inputEl = `      <Slider id="${name}" min={${f.validation?.min ?? 0}} max={${f.validation?.max ?? 100}} step={1} {...register("${name}")} />\n`
      break
  }

  const errorEl = `      {errors.${name} && (\n        <p className="text-xs font-semibold text-[#ff8fcf]" role="alert">{errors.${name}.message as string}</p>\n      )}\n`

  return `${labelEl}${descEl}${inputEl}${errorEl}`
}

export function generateFormComponent(config: FormConfig): string {
  const formName = toPascalCase(config.name || "MyForm")

  let code = `"use client"\n\n`
  code += `import { useForm } from "react-hook-form"\n`
  code += `import { zodResolver } from "@hookform/resolvers/zod"\n`
  code += `import { ${formName}Schema, type ${formName}Values } from "./schema"\n\n`

  // Minimal imports — user adjusts paths
  code += `import { Button } from "@/components/ui/button"\n`
  code += `import { Input } from "@/components/ui/input"\n`
  code += `import { Label } from "@/components/ui/label"\n\n`

  // Additional imports based on field types used
  const types = new Set(config.fields.map((f) => f.type))
  if (types.has("textarea")) code += `import { Textarea } from "@/components/ui/textarea"\n`
  if (types.has("select")) code += `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"\n`
  if (types.has("multiselect")) code += `import { TagInput } from "@/components/ui/tag-input"\n`
  if (types.has("checkbox")) code += `import { Checkbox } from "@/components/ui/checkbox"\n`
  if (types.has("switch")) code += `import { Switch } from "@/components/ui/switch"\n`
  if (types.has("radio")) code += `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"\n`
  if (types.has("date")) code += `import { DatePicker } from "@/components/ui/date-picker"\n`
  if (types.has("slider")) code += `import { Slider } from "@/components/ui/slider"\n`

  // Icons for email/password fields
  if (types.has("email") || types.has("password")) {
    const icons: string[] = []
    if (types.has("email")) icons.push("MailIcon")
    if (types.has("password")) icons.push("LockIcon")
    code += `import { ${icons.join(", ")} } from "lucide-react"\n`
  }

  code += `\n`

  if (config.mode === "multi" && config.steps.length > 0) {
    code += `import { Stepper } from "@/components/ui/stepper"\n`
    code += `import { useState } from "react"\n\n`
  }

  code += `export function ${formName}Form() {\n`
  code += `  const {\n`
  code += `    register,\n`
  code += `    handleSubmit,\n`
  code += `    setValue,\n`
  code += `    watch,\n`
  code += `    formState: { errors, isSubmitting },\n`
  code += `  } = useForm<${formName}Values>({\n`
  code += `    resolver: zodResolver(${formName}Schema),\n`

  // Default values
  const defaults = config.fields
    .filter((f) => f.defaultValue !== undefined)
    .map((f) => `      ${f.name}: ${JSON.stringify(f.defaultValue)},`)
  if (defaults.length > 0) {
    code += `    defaultValues: {\n${defaults.join("\n")}\n    },\n`
  }

  code += `  })\n\n`

  // Submit handler
  if (config.validation === "client-server") {
    code += `  const onSubmit = async (data: ${formName}Values) => {\n`
    code += `    const result = await submit${formName}(data)\n`
    code += `    if (result?.error) {\n`
    code += `      console.error(result.error)\n`
    code += `      return\n`
    code += `    }\n`
    code += `    // Handle success\n`
    code += `    console.log("Form submitted:", data)\n`
    code += `  }\n\n`
  } else {
    code += `  const onSubmit = (data: ${formName}Values) => {\n`
    code += `    console.log("Form submitted:", data)\n`
    code += `  }\n\n`
  }

  // Multi-step state
  if (config.mode === "multi" && config.steps.length > 0) {
    code += `  const [activeStep, setActiveStep] = useState(0)\n`
    code += `  const steps = [\n`
    config.steps.forEach((s) => {
      code += `    { id: "${s.id}", title: "${s.title}" },\n`
    })
    code += `  ]\n\n`
  }

  code += `  return (\n`
  code += `    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">\n`
  code += `      <h2 className="text-lg font-bold text-[#1b1b3a]">${config.name}</h2>\n\n`

  if (config.mode === "multi" && config.steps.length > 0) {
    code += `      <Stepper\n`
    code += `        steps={steps}\n`
    code += `        activeStep={activeStep}\n`
    code += `        onBack={() => setActiveStep((s) => Math.max(0, s - 1))}\n`
    code += `        onNext={() => setActiveStep((s) => Math.min(steps.length - 1, s + 1))}\n`
    code += `        submitLabel="${config.submitLabel}"\n`
    code += `      />\n\n`

    config.steps.forEach((step, stepIdx) => {
      const stepFields = config.fields.filter((f) => f.stepId === step.id)
      if (stepFields.length === 0) return

      code += `      {activeStep === ${stepIdx} && (\n`
      code += `        <div className="space-y-3">\n`
      stepFields.forEach((f) => {
        const widthClass = f.width === "half" ? " w-full md:w-1/2" : " w-full"
        code += `          <div className="space-y-1.5${widthClass}">\n`
        code += fieldToJsx(f, formName)
        code += `          </div>\n`
      })
      code += `        </div>\n`
      code += `      )}\n\n`
    })
  } else {
    // Single step — all fields
    if (config.columns === 2) {
      code += `      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">\n`
      config.fields.forEach((f) => {
        code += `        <div className="space-y-1.5">\n`
        code += fieldToJsx(f, formName)
        code += `        </div>\n`
      })
      code += `      </div>\n\n`
    } else {
      config.fields.forEach((f) => {
        code += `      <div className="space-y-1.5">\n`
        code += fieldToJsx(f, formName)
        code += `      </div>\n\n`
      })
    }
  }

  if (config.mode !== "multi" || config.steps.length === 0) {
    code += `      <Button type="submit" disabled={isSubmitting} className="mt-4">\n`
    code += `        {isSubmitting ? "Submitting..." : "${config.submitLabel}"}\n`
    code += `      </Button>\n`
  }

  code += `    </form>\n`
  code += `  )\n`
  code += `}\n`

  return code
}

export function generateServerAction(config: FormConfig): string | null {
  if (config.validation !== "client-server") return null

  const formName = toPascalCase(config.name || "MyForm")

  let code = `"use server"\n\n`
  code += `import { ${formName}Schema } from "./schema"\n\n`
  code += `export async function submit${formName}(formData: unknown) {\n`
  code += `  const result = ${formName}Schema.safeParse(formData)\n`
  code += `  if (!result.success) {\n`
  code += `    return { error: result.error.flatten().fieldErrors }\n`
  code += `  }\n\n`
  code += `  // Process the validated data\n`
  code += `  // e.g., await db.insert(...)\n`
  code += `  console.log("Server received:", result.data)\n\n`
  code += `  return { success: true }\n`
  code += `}\n`

  return code
}

export function generateAllCode(config: FormConfig) {
  return {
    schema: generateSchema(config),
    form: generateFormComponent(config),
    action: generateServerAction(config),
  }
}
