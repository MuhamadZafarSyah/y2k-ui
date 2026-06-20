"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type FieldProps = React.ComponentProps<"div"> & {
  error?: string
}

function Field({
  className,
  error,
  ...props
}: FieldProps) {
  return (
    <div
      data-slot="field"
      data-error={!!error || undefined}
      className={cn(
        "flex flex-col gap-1.5",
        "data-error:[&_[data-slot=input]]:border-[#ff8fcf] data-error:[&_[data-slot=input]]:ring-2 data-error:[&_[data-slot=input]]:ring-[#ff8fcf]/40",
        className
      )}
      {...props}
    />
  )
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="field-label"
      className={cn(
        "text-sm font-medium text-[#1b1b3a]",
        "group-data-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function FieldControl({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-control"
      className={cn("flex flex-col", className)}
      {...props}
    />
  )
}

function FieldDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn("text-xs text-[#1b1b3a]/60", className)}
      {...props}
    />
  )
}

function FieldError({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-error"
      className={cn("text-xs font-semibold text-[#ff8fcf]", className)}
      {...props}
    />
  )
}

export { Field, FieldControl, FieldDescription, FieldError, FieldLabel, type FieldProps }
