import * as React from "react"

import { cn } from "@/lib/utils"

function Kbd({
  className,
  ...props
}: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "inline-flex items-center justify-center rounded border-2 border-[#1b1b3a] bg-white px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#1b1b3a] leading-none",
        className
      )}
      {...props}
    />
  )
}

export { Kbd }
