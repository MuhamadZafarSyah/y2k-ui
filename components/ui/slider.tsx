"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const sliderRangeVariants = cva("absolute h-full rounded-sm rounded-none!", {
  variants: {
    variant: {
      default: "bg-[#8ed1fc]",
      pink: "bg-[#ff8fcf]",
      mint: "bg-[#8ff0d0]",
      lilac: "bg-[#b69cff]",
      lemon: "bg-[#ffe45e]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

type SliderProps = React.ComponentProps<typeof SliderPrimitive.Root> &
  VariantProps<typeof sliderRangeVariants> & {
    label?: React.ReactNode
    showValue?: boolean
    trailingLabel?: React.ReactNode
    wrapperClassName?: string
  }

function Slider({
  className,
  variant,
  value,
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = false,
  trailingLabel,
  wrapperClassName,
  ...props
}: SliderProps) {
  const thumbValues = value ?? defaultValue ?? [min]
  const thumbCount = Array.isArray(thumbValues) ? thumbValues.length : 1

  const root = (
    <SliderPrimitive.Root
      data-slot="slider"
      value={value}
      defaultValue={defaultValue}
      min={min}
      max={max}
      step={step}
      className={cn(
        "relative flex w-full touch-none select-none items-center data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="relative h-4 w-full grow overflow-hidden rounded border-2 border-[#1b1b3a] bg-white"
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(sliderRangeVariants({ variant }))}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: thumbCount }).map((_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          data-slot="slider-thumb"
          className="block size-5 rounded border-2 border-[#1b1b3a] bg-[#ffe45e] outline-none transition-colors hover:bg-[#ff8fcf] focus-visible:ring-2 focus-visible:ring-[#ff8fcf] disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  )

  if (!label && !showValue && !trailingLabel) {
    return root
  }

  return (
    <div data-slot="slider-wrapper" className={cn("w-full space-y-1.5", wrapperClassName)}>
      {(label || showValue || trailingLabel) && (
        <div className="flex items-center justify-between gap-2 text-xs font-semibold text-[#1b1b3a]">
          {label && <span>{label}</span>}
          <span className="flex items-center gap-1.5">
            {showValue && (
              <span className="font-mono text-[#1b1b3a]/80">
                {Array.isArray(thumbValues)
                  ? thumbValues.join(" – ")
                  : thumbValues}
              </span>
            )}
            {trailingLabel && <span className="text-[#1b1b3a]/60">{trailingLabel}</span>}
          </span>
        </div>
      )}
      {root}
    </div>
  )
}

export { Slider, sliderRangeVariants, type SliderProps }