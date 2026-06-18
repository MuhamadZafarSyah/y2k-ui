import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-md border-2 border-[#1b1b3a] px-3 py-2.5 text-sm",
  {
    variants: {
      variant: {
        info: "bg-[#8ed1fc] text-[#1b1b3a]",
        pink: "bg-[#ff8fcf] text-[#1b1b3a]",
        lilac: "bg-[#b69cff] text-[#1b1b3a]",
        success: "bg-[#8ff0d0] text-[#1b1b3a]",
        warning: "bg-[#ffe45e] text-[#1b1b3a]",
        danger: "bg-[#ff8fcf] text-[#1b1b3a]",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      data-variant={variant}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"h5">) {
  return (
    <h5
      data-slot="alert-title"
      className={cn("mb-1 font-heading text-sm font-semibold leading-none", className)}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn("text-sm leading-relaxed", className)}
      {...props}
    />
  )
}

export { Alert, AlertDescription, AlertTitle, alertVariants }
