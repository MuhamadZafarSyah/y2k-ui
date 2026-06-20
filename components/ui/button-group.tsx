import * as React from "react"

import { cn } from "@/lib/utils"

type ButtonGroupProps = React.ComponentProps<"div"> & {
  orientation?: "horizontal" | "vertical"
}

function ButtonGroup({
  className,
  orientation = "horizontal",
  ...props
}: ButtonGroupProps) {
  return (
    <div
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(
        "flex",
        orientation === "horizontal" && "flex-row [&>[data-slot=button]:first-child]:rounded-r-none [&>[data-slot=button]:last-child]:rounded-l-none [&>[data-slot=button]:not(:first-child)]:-ml-[2px]",
        orientation === "vertical" && "flex-col [&>[data-slot=button]:first-child]:rounded-b-none [&>[data-slot=button]:last-child]:rounded-t-none [&>[data-slot=button]:not(:first-child)]:-mt-[2px]",
        className
      )}
      {...props}
    />
  )
}

export { ButtonGroup, type ButtonGroupProps }
