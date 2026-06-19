"use client"

import * as React from "react"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const radioItemVariants = cva(
  "relative grid size-5 shrink-0 place-items-center rounded border-2 border-[#1b1b3a] bg-white outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#ff8fcf] disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "data-[state=checked]:bg-[#ffe45e]",
        blue: "data-[state=checked]:bg-[#8ed1fc]",
        pink: "data-[state=checked]:bg-[#ff8fcf]",
        mint: "data-[state=checked]:bg-[#8ff0d0]",
        lilac: "data-[state=checked]:bg-[#b69cff]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-2", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item> &
  VariantProps<typeof radioItemVariants>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(radioItemVariants({ variant }), className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="grid place-items-center data-[state=checked]:animate-in data-[state=checked]:zoom-in-50 data-[state=checked]:spin-in-15"
      >
        <span className="size-2 rounded-sm bg-[#1b1b3a]" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem, radioItemVariants }
