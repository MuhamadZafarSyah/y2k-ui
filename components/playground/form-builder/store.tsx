"use client"

import * as React from "react"
import {
  type FormConfig,
  type FormField,
  type FormStep,
  createDefaultConfig,
  createDefaultField,
  type FieldType,
  generateId,
} from "./types"

// ─── Actions ───────────────────────────────────────────────

type BuilderAction =
  | { type: "SET_CONFIG"; config: FormConfig }
  | { type: "SET_NAME"; name: string }
  | { type: "SET_MODE"; mode: FormConfig["mode"] }
  | { type: "SET_VALIDATION"; validation: FormConfig["validation"] }
  | { type: "SET_COLUMNS"; columns: 1 | 2 }
  | { type: "SET_SUBMIT_LABEL"; submitLabel: string }
  | { type: "ADD_FIELD"; fieldType: FieldType; stepId?: string }
  | { type: "UPDATE_FIELD"; fieldId: string; patch: Partial<FormField> }
  | { type: "REMOVE_FIELD"; fieldId: string }
  | { type: "MOVE_FIELD"; fieldId: string; direction: "up" | "down" }
  | { type: "ADD_STEP"; title?: string }
  | { type: "UPDATE_STEP"; stepId: string; patch: Partial<FormStep> }
  | { type: "REMOVE_STEP"; stepId: string }
  | { type: "MOVE_FIELD_TO_STEP"; fieldId: string; stepId: string }
  | { type: "REORDER_FIELD"; fromIndex: number; toIndex: number }

// ─── Reducer ───────────────────────────────────────────────

function builderReducer(
  state: FormConfig,
  action: BuilderAction
): FormConfig {
  switch (action.type) {
    case "SET_CONFIG":
      return { ...action.config }

    case "SET_NAME":
      return { ...state, name: action.name }

    case "SET_MODE": {
      const mode = action.mode
      let steps = state.steps
      let fields = state.fields

      if (mode === "multi" && state.steps.length === 0) {
        steps = [{ id: "step_1", title: "Step 1", order: 0 }]
        fields = state.fields.map((f) => ({
          ...f,
          stepId: f.stepId ?? "step_1",
        }))
      }
      if (mode === "single") {
        fields = state.fields.map((f) => {
          const { stepId, ...rest } = f
          return rest
        })
        steps = []
      }

      return { ...state, mode, steps, fields }
    }

    case "SET_VALIDATION":
      return { ...state, validation: action.validation }

    case "SET_COLUMNS":
      return { ...state, columns: action.columns }

    case "SET_SUBMIT_LABEL":
      return { ...state, submitLabel: action.submitLabel }

    case "ADD_FIELD": {
      const newField = createDefaultField(action.fieldType)
      if (action.stepId) {
        newField.stepId = action.stepId
      } else if (state.mode === "multi" && state.steps.length > 0) {
        newField.stepId = state.steps[0].id
      }
      return { ...state, fields: [...state.fields, newField] }
    }

    case "UPDATE_FIELD":
      return {
        ...state,
        fields: state.fields.map((f) =>
          f.id === action.fieldId ? { ...f, ...action.patch } : f
        ),
      }

    case "REMOVE_FIELD":
      return {
        ...state,
        fields: state.fields.filter((f) => f.id !== action.fieldId),
      }

    case "MOVE_FIELD": {
      const idx = state.fields.findIndex((f) => f.id === action.fieldId)
      if (idx === -1) return state
      const targetIdx =
        action.direction === "up" ? idx - 1 : idx + 1
      if (targetIdx < 0 || targetIdx >= state.fields.length) return state
      const newFields = [...state.fields]
      ;[newFields[idx], newFields[targetIdx]] = [
        newFields[targetIdx],
        newFields[idx],
      ]
      return { ...state, fields: newFields }
    }

    case "REORDER_FIELD": {
      const newFields = [...state.fields]
      const [moved] = newFields.splice(action.fromIndex, 1)
      newFields.splice(action.toIndex, 0, moved)
      return { ...state, fields: newFields }
    }

    case "ADD_STEP": {
      const order = state.steps.length
      const step: FormStep = {
        id: `step_${generateId()}`,
        title: action.title ?? `Step ${order + 1}`,
        order,
      }
      return { ...state, steps: [...state.steps, step] }
    }

    case "UPDATE_STEP":
      return {
        ...state,
        steps: state.steps.map((s) =>
          s.id === action.stepId ? { ...s, ...action.patch } : s
        ),
      }

    case "REMOVE_STEP": {
      if (state.steps.length <= 1) return state
      const removedStep = state.steps.find(
        (s) => s.id === action.stepId
      )
      const remainingSteps = state.steps.filter(
        (s) => s.id !== action.stepId
      )
      const fallbackStepId = remainingSteps[0]?.id
      return {
        ...state,
        steps: remainingSteps,
        fields: state.fields.map((f) =>
          f.stepId === action.stepId
            ? { ...f, stepId: fallbackStepId }
            : f
        ),
      }
    }

    case "MOVE_FIELD_TO_STEP":
      return {
        ...state,
        fields: state.fields.map((f) =>
          f.id === action.fieldId
            ? { ...f, stepId: action.stepId }
            : f
        ),
      }

    default:
      return state
  }
}

// ─── Context ───────────────────────────────────────────────

type BuilderContextType = {
  config: FormConfig
  dispatch: React.Dispatch<BuilderAction>
  selectedFieldId: string | null
  selectField: (id: string | null) => void
  activeStep: number
  setActiveStep: (step: number) => void
  previewMode: "preview" | "filled" | "error"
  setPreviewMode: (mode: "preview" | "filled" | "error") => void
}

const BuilderContext = React.createContext<BuilderContextType | null>(null)

export function useBuilder() {
  const ctx = React.useContext(BuilderContext)
  if (!ctx) {
    throw new Error("useBuilder must be used within BuilderProvider")
  }
  return ctx
}

// ─── Provider ──────────────────────────────────────────────

export function BuilderProvider({
  children,
  initialConfig,
}: {
  children: React.ReactNode
  initialConfig?: FormConfig
}) {
  const [config, dispatch] = React.useReducer(
    builderReducer,
    initialConfig ?? createDefaultConfig()
  )
  const [selectedFieldId, selectField] = React.useState<string | null>(null)
  const [activeStep, setActiveStep] = React.useState(0)
  const [previewMode, setPreviewMode] = React.useState<
    "preview" | "filled" | "error"
  >("preview")

  const ctx: BuilderContextType = {
    config,
    dispatch,
    selectedFieldId,
    selectField,
    activeStep,
    setActiveStep,
    previewMode,
    setPreviewMode,
  }

  return (
    <BuilderContext.Provider value={ctx}>
      {children}
    </BuilderContext.Provider>
  )
}
