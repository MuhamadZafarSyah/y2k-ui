"use client"

import * as React from "react"
import { Popover } from "radix-ui"
import { Command as CommandPrimitive } from "cmdk"

import { cn } from "@/lib/utils"
import { CheckIcon, ChevronDownIcon } from "lucide-react"

// ─── Combobox Root ─────────────────────────────────────────────

type ComboboxContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  value: string
  onValueChange: (value: string) => void
}

const ComboboxContext = React.createContext<ComboboxContextValue | null>(null)

function useCombobox() {
  const ctx = React.useContext(ComboboxContext)
  if (!ctx) throw new Error("Combobox sub-components must be used within <Combobox>")
  return ctx
}

type ComboboxProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  children?: React.ReactNode
}

function Combobox({
  open: openProp,
  onOpenChange,
  defaultValue,
  value: valueProp,
  onValueChange: onValueChangeProp,
  children,
}: ComboboxProps) {
  const [_open, _setOpen] = React.useState(false)
  const open = openProp ?? _open
  const setOpen = onOpenChange ?? _setOpen

  const [_value, _setValue] = React.useState(defaultValue ?? "")
  const value = valueProp ?? _value
  const onValueChange = onValueChangeProp ?? _setValue

  return (
    <ComboboxContext.Provider
      value={{ open, setOpen, value, onValueChange }}
    >
      <Popover.Root open={open} onOpenChange={setOpen}>
        {children}
      </Popover.Root>
    </ComboboxContext.Provider>
  )
}

// ─── Trigger ──────────────────────────────────────────────────

function ComboboxTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <Popover.Trigger
      data-slot="combobox-trigger"
      className={cn(
        "flex h-8 w-full min-w-0 items-center justify-between gap-2 rounded border-2 border-[#1b1b3a] bg-white px-2.5 py-1 text-sm text-[#1b1b3a] outline-none transition-colors",
        "focus-visible:ring-2 focus-visible:ring-[#ff8fcf]",
        "data-disabled:cursor-not-allowed data-disabled:opacity-50",
        "data-placeholder:text-[#1b1b3a]/45",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="size-3.5 shrink-0 text-[#1b1b3a]/50" />
    </Popover.Trigger>
  )
}

// ─── Value ─────────────────────────────────────────────────────

type ComboboxValueProps = {
  placeholder?: string
  className?: string
}

function ComboboxValue({ placeholder = "Select...", className }: ComboboxValueProps) {
  const { value } = useCombobox()
  return (
    <span data-slot="combobox-value" className={cn("flex-1 truncate text-left", !value && "text-[#1b1b3a]/45", className)}>
      {value || placeholder}
    </span>
  )
}

// ─── Popup ─────────────────────────────────────────────────────

function ComboboxPopup({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Popover.Content>) {
  return (
    <Popover.Portal>
      <Popover.Content
        data-slot="combobox-popup"
        side="bottom"
        align="start"
        sideOffset={4}
        className={cn(
          "z-50 min-w-[var(--radix-popover-trigger-width)] origin-(--radix-popover-content-transform-origin) rounded-md border-2 border-[#1b1b3a] bg-white p-0 text-sm text-[#1b1b3a] shadow-none outline-none",
          "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
          "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      >
        <CommandPrimitive>
          <label
            data-slot="combobox-input-wrapper"
            className="flex items-center border-b-2 border-[#1b1b3a]/15 px-2"
          >
            <CommandPrimitive.Input
              placeholder="Search..."
              className="h-8 w-full bg-transparent text-sm text-[#1b1b3a] outline-none placeholder:text-[#1b1b3a]/45"
            />
          </label>
          <CommandPrimitive.List
            data-slot="combobox-list"
            className="max-h-60 overflow-y-auto p-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <CommandPrimitive.Empty
              data-slot="combobox-empty"
              className="py-6 text-center text-xs text-[#1b1b3a]/45"
            >
              No results found.
            </CommandPrimitive.Empty>
            {children}
          </CommandPrimitive.List>
        </CommandPrimitive>
        <Popover.Arrow className="fill-white stroke-[#1b1b3a] stroke-2" />
      </Popover.Content>
    </Popover.Portal>
  )
}

// ─── Item ──────────────────────────────────────────────────────

type ComboboxItemProps = {
  value: string
  disabled?: boolean
  children?: React.ReactNode
  className?: string
}

function ComboboxItem({ value: itemValue, disabled, className, children }: ComboboxItemProps) {
  const { value, onValueChange, setOpen } = useCombobox()
  const isSelected = value === itemValue

  return (
    <CommandPrimitive.Item
      data-slot="combobox-item"
      value={itemValue}
      disabled={disabled}
      onSelect={(currentValue) => {
        onValueChange(currentValue)
        setOpen(false)
      }}
      className={cn(
        "relative flex cursor-default justify-between  items-center gap-2 rounded-[3px] px-2 py-1.5 text-sm text-[#1b1b3a] outline-none select-none",
        "hover:bg-[#8ed1fc]/70 data-highlighted:bg-[#8ed1fc] data-highlighted:text-[#1b1b3a]",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        "[&_svg]:size-3.5 [&_svg]:shrink-0",
        className
      )}
    >
      {children}

      <span className="flex size-4 items-center justify-center">
        {isSelected && <CheckIcon className="size-3" />}
      </span>
    </CommandPrimitive.Item>
  )
}

// ─── Group ─────────────────────────────────────────────────────

function ComboboxGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="combobox-group"
      className={cn("py-1", className)}
      {...props}
    />
  )
}

// ─── Label ─────────────────────────────────────────────────────

function ComboboxLabel({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="combobox-label"
      className={cn(
        "px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#1b1b3a]/50",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// ─── Separator ─────────────────────────────────────────────────

function ComboboxSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="combobox-separator"
      className={cn("mx-2 my-1 h-px bg-[#1b1b3a]/15", className)}
      {...props}
    />
  )
}

export {
  Combobox,
  ComboboxTrigger,
  ComboboxValue,
  ComboboxPopup,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxSeparator,
}
