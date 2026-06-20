"use client"

import * as React from "react"
import { Form as FormPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

function Form({ ...props }: React.ComponentProps<typeof FormPrimitive.Root>) {
  return <FormPrimitive.Root data-slot="form" {...props} />
}

function FormField({
  ...props
}: React.ComponentProps<typeof FormPrimitive.Field>) {
  return <FormPrimitive.Field data-slot="form-field" {...props} />
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof FormPrimitive.Label>) {
  return (
    <FormPrimitive.Label asChild>
      <Label className={cn("data-invalid:text-[#ff8fcf]", className)} {...props} />
    </FormPrimitive.Label>
  )
}

function FormControl({
  ...props
}: React.ComponentProps<typeof FormPrimitive.Control>) {
  return <FormPrimitive.Control asChild {...props} />
}

function FormMessage({
  className,
  ...props
}: React.ComponentProps<typeof FormPrimitive.Message>) {
  return (
    <FormPrimitive.Message
      data-slot="form-message"
      className={cn("text-xs font-semibold text-[#ff8fcf]", className)}
      {...props}
    />
  )
}

function FormSubmit({
  className,
  ...props
}: React.ComponentProps<typeof FormPrimitive.Submit>) {
  return (
    <FormPrimitive.Submit
      data-slot="form-submit"
      className={className}
      {...props}
    />
  )
}

export {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormSubmit,
}
