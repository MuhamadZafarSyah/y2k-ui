import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textareaVariants = cva(
  "flex min-h-20 w-full rounded border-2 border-[#1b1b3a] px-3 py-2 text-sm text-[#1b1b3a] outline-none transition-colors placeholder:text-[#1b1b3a]/45 focus-visible:ring-2 focus-visible:ring-[#ff8fcf] disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-white",
        blue: "bg-[#8ed1fc]/25",
        pink: "bg-[#ff8fcf]/20",
        mint: "bg-[#8ff0d0]/25",
        lemon: "bg-[#ffe45e]/25",
      },
      resize: {
        none: "resize-none",
        y: "resize-y",
        x: "resize-x",
        both: "resize",
      },
    },
    defaultVariants: {
      variant: "default",
      resize: "y",
    },
  }
)

function Textarea({
  className,
  variant,
  resize,
  ...props
}: React.ComponentProps<"textarea"> & VariantProps<typeof textareaVariants>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(textareaVariants({ variant, resize }), className)}
      {...props}
    />
  )
}

export { Textarea, textareaVariants }
