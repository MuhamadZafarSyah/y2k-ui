"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

type ProgressProps = React.ComponentProps<typeof ProgressPrimitive.Root> & {
  label?: React.ReactNode
  showValue?: boolean
  trailingLabel?: React.ReactNode
  wrapperClassName?: string
  indicatorClassName?: string
}

function Progress({
  className,
  value,
  max,
  label,
  showValue = false,
  trailingLabel,
  wrapperClassName,
  indicatorClassName,
  ...props
}: ProgressProps) {
  const safeMax = max ?? 100
  const pct = Math.min(100, Math.max(0, ((value ?? 0) / safeMax) * 100))

  if (!label && !showValue && !trailingLabel) {
    return (
      <ProgressPrimitive.Root
        data-slot="progress"
        className={cn(
          "relative h-4 w-full overflow-hidden rounded border-2 border-[#1b1b3a] bg-white",
          className
        )}
        value={value}
        max={max}
        {...props}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className={cn(
            "h-full bg-[#8ed1fc] transition-transform duration-700 ease-out",
            indicatorClassName
          )}
          style={{ transform: `translateX(-${100 - pct}%)` }}
        />
      </ProgressPrimitive.Root>
    )
  }

  return (
    <div data-slot="progress-wrapper" className={cn("w-full space-y-1.5", wrapperClassName)}>
      {(label || showValue || trailingLabel) && (
        <div className="flex items-center justify-between gap-2 text-xs font-semibold text-[#1b1b3a]">
          {label && <span id={`progress-label-${typeof label === 'string' ? label.replace(/\s+/g, '-') : ''}`}>{label}</span>}
          <span className="flex items-center gap-1.5">
            {showValue && (
              <span className="font-mono text-[#1b1b3a]/80">{Math.round(pct)}%</span>
            )}
            {trailingLabel && <span className="text-[#1b1b3a]/60">{trailingLabel}</span>}
          </span>
        </div>
      )}
      <ProgressPrimitive.Root
        data-slot="progress"
        className={cn(
          "relative h-4 w-full overflow-hidden rounded border-2 border-[#1b1b3a] bg-white",
          className
        )}
        aria-label={typeof label === 'string' ? label : undefined}
        value={value}
        max={max}
        {...props}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className={cn(
            "h-full bg-[#8ed1fc] transition-transform duration-700 ease-out",
            indicatorClassName
          )}
          style={{ transform: `translateX(-${100 - pct}%)` }}
        />
      </ProgressPrimitive.Root>
    </div>
  )
}

export { Progress, type ProgressProps }