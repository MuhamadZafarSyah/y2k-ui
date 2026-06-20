import * as React from "react"
import { Label as LabelPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "inline-flex items-center gap-1 text-sm font-medium text-[#1b1b3a] leading-none select-none group-data-disabled:pointer-events-none group-data-disabled:opacity-50 peer-data-disabled:pointer-events-none peer-data-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
