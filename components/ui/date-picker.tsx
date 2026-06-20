"use client"

import * as React from "react"
import { Popover } from "radix-ui"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"

// ─── Context ────────────────────────────────────────────────────

type DatePickerContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  value: Date | undefined
  onValueChange: (date: Date | undefined) => void
  month: Date
  onMonthChange: (date: Date) => void
}

const DatePickerContext = React.createContext<DatePickerContextValue | null>(null)

function useDatePicker() {
  const ctx = React.useContext(DatePickerContext)
  if (!ctx) throw new Error("DatePicker compound components must be used within <DatePicker>")
  return ctx
}

// ─── Root ───────────────────────────────────────────────────────

type DatePickerRootProps = {
  children: React.ReactNode
  value?: Date
  onValueChange?: (date: Date | undefined) => void
  defaultValue?: Date
}

function DatePickerRoot({ children, value, onValueChange, defaultValue }: DatePickerRootProps) {
  const [open, setOpen] = React.useState(false)
  const [internal, setInternal] = React.useState<Date | undefined>(defaultValue)
  const [month, setMonth] = React.useState<Date>(defaultValue ?? new Date())

  const date = value ?? internal
  const setDate = React.useCallback(
    (d: Date | undefined) => {
      setInternal(d)
      onValueChange?.(d)
      if (d) setMonth(d)
      setOpen(false)
    },
    [onValueChange]
  )

  const handleMonthChange = React.useCallback((d: Date) => {
    setMonth(d)
  }, [])

  return (
    <DatePickerContext.Provider value={{ open, setOpen, value: date, onValueChange: setDate, month, onMonthChange: handleMonthChange }}>
      <Popover.Root open={open} onOpenChange={setOpen}>
        {children}
      </Popover.Root>
    </DatePickerContext.Provider>
  )
}

// ─── Trigger ────────────────────────────────────────────────────

type DatePickerTriggerProps = {
  placeholder?: string
  formatStr?: string
  className?: string
}

function DatePickerTrigger({
  placeholder = "Pick a date",
  formatStr = "PPP",
  className,
}: DatePickerTriggerProps) {
  const { value } = useDatePicker()

  return (
    <Popover.Trigger asChild>
      <Button
        variant="outline"
        className={cn(
          "w-full justify-start gap-2 text-left font-normal",
          !value && "text-muted-foreground",
          className
        )}
      >
        <CalendarIcon className="size-4" />
        {value ? format(value, formatStr) : placeholder}
      </Button>
    </Popover.Trigger>
  )
}

// ─── Content ────────────────────────────────────────────────────

type DatePickerContentProps = Omit<
  React.ComponentProps<typeof Calendar>,
  "mode" | "selected" | "onSelect"
> & {
  className?: string
}

function DatePickerContent({ className, ...props }: DatePickerContentProps) {
  const { value, onValueChange, month, onMonthChange } = useDatePicker()

  return (
    <Popover.Portal>
      <Popover.Content
        align="start"
        sideOffset={4}
        className={cn(
          "z-50 w-auto p-0",
          "bg-y2k-panel border-2 border-y2k-ink rounded-md",
          "[&[data-state=open]]:animate-in [&[data-state=open]]:fade-in-0 [&[data-state=open]]:zoom-in-95",
          "[&[data-state=closed]]:animate-out [&[data-state=closed]]:fade-out-0 [&[data-state=closed]]:zoom-out-95",
          "[&[data-side=top]]:slide-in-from-bottom-2 [&[data-side=bottom]]:slide-in-from-top-2",
          className
        )}
      >
        <Calendar
          mode="single"
          selected={value}
          onSelect={onValueChange}
          month={month}
          onMonthChange={onMonthChange}
          {...props}
        />
      </Popover.Content>
    </Popover.Portal>
  )
}

// ─── Compound Export ────────────────────────────────────────────

const DatePicker = Object.assign(DatePickerRoot, {
  Trigger: DatePickerTrigger,
  Content: DatePickerContent,
})

export { DatePicker, DatePickerTrigger, DatePickerContent }
export type { DatePickerRootProps, DatePickerTriggerProps, DatePickerContentProps }
