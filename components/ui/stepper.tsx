"use client"

import * as React from "react"
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/** A single step definition */
type Step = {
  id: string
  title: string
  description?: string
}

type StepperProps = {
  steps: Step[]
  activeStep: number
  onStepChange?: (step: number) => void
  /** Show navigation buttons (Back / Next / Submit) */
  showNavigation?: boolean
  onBack?: () => void
  onNext?: () => void
  onSubmit?: () => void
  submitLabel?: string
  /** Allow clicking step indicators to navigate */
  clickable?: boolean
  className?: string
  children?: React.ReactNode
}

function Stepper({
  steps,
  activeStep,
  onStepChange,
  showNavigation = true,
  onBack,
  onNext,
  onSubmit,
  submitLabel = "Submit",
  clickable = false,
  className,
  children,
}: StepperProps) {
  const isFirst = activeStep === 0
  const isLast = activeStep === steps.length - 1

  const handleStepClick = (index: number) => {
    if (clickable && onStepChange) {
      onStepChange(index)
    }
  }

  return (
    <div data-slot="stepper" className={cn("flex flex-col gap-4", className)}>
      {/* Step Indicators */}
      <nav aria-label="Progress" className="w-full">
        <ol className="flex items-center gap-1">
          {steps.map((step, index) => {
            const isActive = index === activeStep
            const isCompleted = index < activeStep
            const isPending = index > activeStep

            return (
              <li
                key={step.id}
                className={cn(
                  "flex items-center flex-1 min-w-0",
                  index < steps.length - 1 && "gap-1"
                )}
              >
                <button
                  type="button"
                  disabled={!clickable || isPending}
                  onClick={() => handleStepClick(index)}
                  aria-current={isActive ? "step" : undefined}
                  aria-label={`Step ${index + 1}: ${step.title}${isCompleted ? " (completed)" : ""}`}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md border-2 px-2 py-1 text-xs font-semibold transition-colors min-w-0 flex-1",
                    isActive &&
                      "border-[#1b1b3a] bg-[#ffe45e] text-[#1b1b3a]",
                    isCompleted &&
                      "border-[#1b1b3a] bg-[#8ff0d0] text-[#1b1b3a]",
                    isPending &&
                      "border-[#1b1b3a]/30 bg-transparent text-[#1b1b3a]/50",
                    clickable && !isPending && "cursor-pointer hover:bg-[#ff8fcf]",
                    !clickable && "cursor-default"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-4 shrink-0 items-center justify-center rounded-sm border-2 border-[#1b1b3a] text-[10px] font-black",
                      isActive && "bg-white",
                      isCompleted && "bg-[#8ff0d0]",
                      isPending && "border-[#1b1b3a]/30 bg-transparent text-[#1b1b3a]/50"
                    )}
                  >
                    {isCompleted ? (
                      <CheckIcon className="size-2.5 stroke-[3]" />
                    ) : (
                      index + 1
                    )}
                  </span>
                  <span className="truncate hidden sm:inline">{step.title}</span>
                </button>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div
                    aria-hidden
                    className={cn(
                      "h-0.5 w-4 shrink-0 rounded",
                      index < activeStep
                        ? "bg-[#1b1b3a]"
                        : "bg-[#1b1b3a]/20"
                    )}
                  />
                )}
              </li>
            )
          })}
        </ol>
      </nav>

      {/* Step Content */}
      {children && <div className="min-h-0">{children}</div>}

      {/* Navigation Buttons */}
      {showNavigation && (
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onBack}
            disabled={isFirst}
            className={cn(
              "inline-flex h-8 items-center gap-1 rounded border-2 border-[#1b1b3a] bg-white px-3 text-xs font-semibold text-[#1b1b3a] transition-all hover:bg-[#d7dde8] disabled:opacity-30 disabled:cursor-not-allowed"
            )}
          >
            <ChevronLeftIcon className="size-3.5" />
            Back
          </button>

          <span className="text-xs font-semibold text-[#1b1b3a]/60">
            Step {activeStep + 1} of {steps.length}
          </span>

          {isLast ? (
            <button
              type="button"
              onClick={onSubmit}
              className={cn(
                "inline-flex h-8 items-center gap-1 rounded border-2 border-[#1b1b3a] bg-[#ffe45e] px-4 text-xs font-bold text-[#1b1b3a] transition-all hover:bg-[#8ff0d0] hover:-translate-y-px active:scale-95"
              )}
            >
              {submitLabel}
            </button>
          ) : (
            <button
              type="button"
              onClick={onNext}
              className={cn(
                "inline-flex h-8 items-center gap-1 rounded border-2 border-[#1b1b3a] bg-[#ffe45e] px-3 text-xs font-semibold text-[#1b1b3a] transition-all hover:bg-[#8ed1fc] hover:-translate-y-px active:scale-95"
              )}
            >
              Next
              <ChevronRightIcon className="size-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export { Stepper, type StepperProps, type Step }
