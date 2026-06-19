"use client"

import * as React from "react"
import { Separator as SeparatorPrimitive } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const separatorVariants = cva(
  "shrink-0 rounded-full border-0 data-[orientation=horizontal]:h-0.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:self-stretch data-[orientation=vertical]:w-0.5",
  {
    variants: {
      variant: {
        default: "bg-[#1b1b3a]",
        blue: "bg-[#8ed1fc]",
        pink: "bg-[#ff8fcf]",
        mint: "bg-[#8ff0d0]",
        lemon: "bg-[#ffe45e]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  variant,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root> &
  VariantProps<typeof separatorVariants>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(separatorVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Separator, separatorVariants }