import * as React from "react"

import { cn } from "@/lib/utils"

type InputGroupProps = React.ComponentProps<"div">

function InputGroup({ className, ...props }: InputGroupProps) {
  return (
    <div
      data-slot="input-group"
      className={cn(
        "flex items-center gap-0 rounded border-2 border-[#1b1b3a] bg-white has-[>input:focus]:ring-2 has-[>input:focus]:ring-[#ff8fcf]",
        "[&>[data-slot=input]]:border-none [&>[data-slot=input]]:rounded-none [&>[data-slot=input]]:focus-visible:ring-0",
        "[&>[data-slot=button]:first-child]:rounded-r-none [&>[data-slot=button]:last-child]:rounded-l-none [&>[data-slot=button]]:border-0 [&>[data-slot=button]]:rounded-none",
        className
      )}
      {...props}
    />
  )
}

export { InputGroup, type InputGroupProps }
