import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded border-2 border-[#1b1b3a] px-2 py-0.5 text-xs font-semibold leading-none transition-colors",
  {
    variants: {
      variant: {
        default: "bg-white text-[#1b1b3a]",
        blue: "bg-[#8ed1fc] text-[#1b1b3a]",
        pink: "bg-[#ff8fcf] text-[#1b1b3a]",
        lilac: "bg-[#b69cff] text-[#1b1b3a]",
        mint: "bg-[#8ff0d0] text-[#1b1b3a]",
        lemon: "bg-[#ffe45e] text-[#1b1b3a]",
        outline: "border-dashed bg-transparent",
      },
      size: {
        sm: "text-[10px] px-1.5",
        md: "text-xs",
        lg: "text-sm px-2.5 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

function Badge({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      data-variant={variant}
      data-size={size}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
