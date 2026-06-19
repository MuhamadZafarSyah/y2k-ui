"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md border-2 border-y2k-ink text-sm font-bold text-y2k-ink transition-all hover:bg-y2k-blue/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-y2k-pink disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-card",
        outline: "bg-transparent",
        pink: "bg-y2k-pink/20 hover:bg-y2k-pink/40",
        blue: "bg-y2k-blue/20 hover:bg-y2k-blue/40",
        mint: "bg-y2k-mint/25 hover:bg-y2k-mint/45",
        lemon: "bg-y2k-lemon/25 hover:bg-y2k-lemon/45",
      },
      size: {
        sm: "h-7 px-2 text-xs",
        md: "h-9 px-3",
        lg: "h-10 px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export type ToggleProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof toggleVariants> & {
    pressed?: boolean
    onPressedChange?: (pressed: boolean) => void
  }

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, variant, size, pressed, onPressedChange, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-pressed={pressed}
      data-slot="toggle"
      data-state={pressed ? "on" : "off"}
      className={cn(
        toggleVariants({ variant, size }),
        pressed && "bg-y2k-lemon shadow-[2px_2px_0_var(--y2k-ink)] translate-x-[-2px] translate-y-[-2px]",
        className
      )}
      onClick={() => onPressedChange?.(!pressed)}
      {...props}
    >
      {children}
    </button>
  )
)
Toggle.displayName = "Toggle"

/* ─── Toggle Group ─── */

export type ToggleGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  type?: "single" | "multiple"
  value?: string | string[]
  defaultValue?: string | string[]
  onValueChange?: (value: string | string[]) => void
}

const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ className, type = "single", value, defaultValue, onValueChange, children, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState<string | string[]>(
      defaultValue ?? (type === "single" ? "" : [])
    )

    const currentValue = value ?? internalValue

    const handleChange = (itemValue: string) => {
      let newValue: string | string[]
      if (type === "single") {
        newValue = currentValue === itemValue ? "" : itemValue
      } else {
        const arr = currentValue as string[]
        newValue = arr.includes(itemValue)
          ? arr.filter((v) => v !== itemValue)
          : [...arr, itemValue]
      }
      setInternalValue(newValue)
      onValueChange?.(newValue)
    }

    return (
      <div
        ref={ref}
        role="group"
        data-slot="toggle-group"
        className={cn(
          "inline-flex gap-1 rounded-md border-2 border-y2k-ink bg-card p-1",
          className
        )}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (!React.isValidElement<{ value?: string }>(child)) return child
          const itemValue = child.props.value
          if (!itemValue) return child
          const isPressed = type === "single"
            ? currentValue === itemValue
            : (currentValue as string[]).includes(itemValue)
          return React.cloneElement(child as React.ReactElement<Record<string, unknown>>, {
            pressed: isPressed,
            onPressedChange: () => handleChange(itemValue),
          })
        })}
      </div>
    )
  }
)
ToggleGroup.displayName = "ToggleGroup"

const ToggleGroupItem = React.forwardRef<
  HTMLButtonElement,
  ToggleProps & { value: string }
>(({ className, variant, size, ...props }, ref) => (
  <Toggle
    ref={ref}
    variant={variant}
    size={size}
    className={cn("rounded-none first:rounded-l-md last:rounded-r-md", className)}
    {...props}
  />
))
ToggleGroupItem.displayName = "ToggleGroupItem"

export { Toggle, ToggleGroup, ToggleGroupItem, toggleVariants }
