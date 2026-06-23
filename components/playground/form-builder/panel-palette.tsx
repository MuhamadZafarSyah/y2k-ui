"use client"

import * as React from "react"
import { useBuilder } from "./store"
import { PALETTE_ITEMS, type FieldType, type FormConfig } from "./types"
import { FORM_TEMPLATES, type FormTemplate } from "./templates"
import { cn } from "@/lib/utils"
import { WindowControls } from "@/components/ui/window-controls"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Trash2Icon,
  GripVerticalIcon,
  LayoutTemplateIcon,
  PlusIcon,
  ClipboardCopyIcon,
} from "lucide-react"

// ─── @dnd-kit imports ────────────────────────────────────
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type Modifier,
} from "@dnd-kit/core"
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

// ─── Vertical-only drag modifier ──────────────────────────
const restrictToVerticalAxis: Modifier = ({ transform }) => ({
  ...transform,
  x: 0,
})

// ─── Template Picker ──────────────────────────────────────

function TemplatePicker() {
  const { dispatch } = useBuilder()

  const applyTemplate = (template: FormTemplate) => {
    const cloned = JSON.parse(JSON.stringify(template.config)) as FormConfig
    let counter = 0
    cloned.fields = cloned.fields.map((f) => ({
      ...f,
      id: `ft_${Date.now()}_${counter++}`,
    }))
    cloned.steps = cloned.steps.map((s, i) => ({
      ...s,
      id: `st_${Date.now()}_${i}`,
    }))
    dispatch({ type: "SET_CONFIG", config: cloned })
  }

  return (
    <div className="p-2 space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#1b1b3a]/60">
          Quick Templates
        </p>
        <span className="text-[10px] text-y2k-ink-muted">Click to apply</span>
      </div>
      <div className="grid grid-cols-2 gap-1.5  overflow-y-auto">
        {FORM_TEMPLATES.map((template) => (
          <button
            key={template.id}
            type="button"
            onClick={() => applyTemplate(template)}
            title={`${template.name} — ${template.description}`}
            className={cn(
              "flex flex-col gap-0.5 rounded border-2 border-[#1b1b3a] bg-white p-2 text-left transition-all hover:bg-[#8ff0d0]/30 hover:-translate-y-px active:scale-95"
            )}
          >
            <span className="flex items-center gap-1">
              <span className="text-sm">{template.emoji}</span>
              <span className="text-[11px] font-bold text-[#1b1b3a] truncate">{template.name}</span>
            </span>
            <span className="text-[9px] text-[#1b1b3a]/50 line-clamp-2">{template.description}</span>
            <span className="mt-0.5 inline-flex self-start rounded border border-[#1b1b3a]/30 bg-[#d7dde8]/50 px-1 text-[8px] font-semibold text-[#1b1b3a]/60">
              {template.config.fields.length} fields
              {template.config.mode === "multi" ? ` · ${template.config.steps.length} steps` : ""}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Field Palette ────────────────────────────────────────

function FieldPalette() {
  const { dispatch } = useBuilder()

  const addField = (type: FieldType) => {
    dispatch({ type: "ADD_FIELD", fieldType: type })
  }

  return (
    <div className="p-2 space-y-2">
      <p className="text-[10px] font-bold uppercase tracking-wider text-[#1b1b3a]/60">Add Field</p>
      <div className="grid grid-cols-2 gap-1">
        {PALETTE_ITEMS.map((item) => (
          <button
            key={item.type}
            type="button"
            onClick={() => addField(item.type)}
            className="flex items-center gap-1.5 rounded border-2 border-[#1b1b3a] bg-white px-2 py-1.5 text-left text-xs font-semibold text-[#1b1b3a] transition-all hover:bg-[#8ed1fc] hover:-translate-y-px active:scale-95"
          >
            <span className="flex size-5 shrink-0 items-center justify-center rounded-sm border-2 border-[#1b1b3a] bg-[#ffe45e] text-[10px] font-black">
              {item.icon}
            </span>
            <span className="truncate">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Sortable Field Item ──────────────────────────────────

function SortableFieldItem({
  field,
  isSelected,
  onSelect,
}: {
  field: { id: string; label: string; name: string; type: FieldType; required: boolean }
  isSelected: boolean
  onSelect: () => void
}) {
  const { config, dispatch, selectField, selectedFieldId } = useBuilder()

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : undefined,
  }

  const index = config.fields.findIndex((f) => f.id === field.id)
  const isFirst = index === 0
  const isLast = index === config.fields.length - 1

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "group flex items-center gap-1 rounded border-2 px-2 py-1.5 transition-all cursor-grab active:cursor-grabbing touch-none select-none",
        isDragging && "shadow-[2px_2px_0px_#1b1b3a] bg-[#ffe45e]/80 z-50",
        isSelected && !isDragging
          ? "border-[#1b1b3a] bg-[#ffe45e]"
          : "border-transparent bg-[#d7dde8]/40 hover:border-[#1b1b3a]/40 hover:bg-[#d7dde8]"
      )}
    >
      {/* Drag handle — visual only */}
      <span
        className="flex size-4 shrink-0 items-center justify-center text-y2k-ink-muted pointer-events-none"
        aria-hidden
      >
        <GripVerticalIcon className="size-3" />
      </span>

      {/* Field info */}
      <button
        type="button"
        onClick={onSelect}
        className="flex min-w-0 flex-1 items-center gap-1.5 text-left"
      >
        <span className="flex size-4 shrink-0 items-center justify-center rounded-sm border border-[#1b1b3a] bg-white text-[9px] font-black">
          {PALETTE_ITEMS.find((p) => p.type === field.type)?.icon ?? "?"}
        </span>
        <span className="truncate text-xs font-semibold text-[#1b1b3a]">
          {field.label || field.name}
        </span>
        {field.required && <span className="text-[10px] text-[#ff8fcf]">*</span>}
      </button>

      {/* Delete button */}
      <button
        type="button"
        onClick={() => {
          if (selectedFieldId === field.id) selectField(null)
          dispatch({ type: "REMOVE_FIELD", fieldId: field.id })
        }}
        aria-label="Remove field"
        className="flex size-5 shrink-0 items-center justify-center rounded-sm border border-[#1b1b3a] bg-[#ff8fcf]/50 text-[#1b1b3a] hover:bg-[#ff8fcf] opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2Icon className="size-3" />
      </button>
    </div>
  )
}

// ─── Field List (with DnD) ───────────────────────────────

function FieldList() {
  const { config, selectedFieldId, selectField, dispatch } = useBuilder()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 4 },
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = config.fields.findIndex((f) => f.id === active.id)
    const newIndex = config.fields.findIndex((f) => f.id === over.id)

    if (oldIndex !== -1 && newIndex !== -1) {
      dispatch({ type: "REORDER_FIELD", fromIndex: oldIndex, toIndex: newIndex })
    }
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="shrink-0 flex items-center justify-between px-3 py-2">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#1b1b3a]/60">
          Your Fields ({config.fields.length})
        </p>
        <span className="text-[11px] text-y2k-ink-muted font-mono">drag to reorder</span>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-2">
        {config.fields.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <span className="mb-2 text-2xl">📋</span>
            <p className="text-xs font-semibold text-[#1b1b3a]/50">No fields yet</p>
            <p className="text-[11px] text-y2k-ink-muted">Click a field type or template above</p>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext
              items={config.fields.map((f) => f.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-1">
                {config.fields.map((field) => (
                  <SortableFieldItem
                    key={field.id}
                    field={field}
                    isSelected={selectedFieldId === field.id}
                    onSelect={() => selectField(field.id)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  )
}

// ─── Main Panel ──────────────────────────────────────────

export function PanelPalette() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border-2 border-[#1b1b3a] bg-white">
      {/* Title bar */}
      <div className="flex shrink-0 items-center justify-between border-b-2 border-[#1b1b3a] bg-[#ffe45e] px-3 py-1.5">
        <div className="flex items-center gap-2">
          <span className="y2k-title-dots" aria-hidden>
            <span className="rounded-full size-2" />
            <span className="rounded-full size-2" />
            <span className="rounded-full size-2" />
          </span>
          <span className="font-mono text-[11px] font-black text-[#1b1b3a]">
            fields.palette
          </span>
        </div>
        {/* <WindowControls hideMinimize hideMaximize /> */}
      </div>

      <Tabs defaultValue="fields" className="flex flex-1 flex-col overflow-hidden">
        <TabsList className="shrink-0 px-2 pt-1 gap-0">
          <TabsTrigger value="fields" className="gap-1 text-[10px]">
            <PlusIcon className="size-3" /> Add
          </TabsTrigger>
          <TabsTrigger value="templates" className="gap-1 text-[10px]">
            <LayoutTemplateIcon className="size-3" /> Templates
          </TabsTrigger>
        </TabsList>

        <TabsContent value="fields" className="flex-1 flex flex-col overflow-hidden p-0 border-none rounded-none bg-transparent">
          <FieldPalette />
          <div className="shrink-0 border-t-2 border-[#1b1b3a]" />
          <FieldList />
        </TabsContent>

        <TabsContent value="templates" className="flex-1 overflow-y-auto p-0 border-none rounded-none bg-transparent">
          <TemplatePicker />
        </TabsContent>
      </Tabs>
    </div>
  )
}
