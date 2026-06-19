"use client"

import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer h-5 w-5 shrink-0 rounded border-2 border-[#1b1b3a] bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8fcf] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#ffe45e] data-[state=checked]:text-[#1b1b3a]",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current data-[state=checked]:animate-in data-[state=checked]:zoom-in-50 data-[state=checked]:spin-in-15"
      >
        <CheckIcon className="h-3.5 w-3.5 stroke-[3]" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
