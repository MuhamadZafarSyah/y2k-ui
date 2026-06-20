import * as React from "react"

import { cn } from "@/lib/utils"

type ItemProps = React.ComponentProps<"div"> & {
  selected?: boolean
  disabled?: boolean
}

function Item({
  className,
  selected = false,
  disabled = false,
  ...props
}: ItemProps) {
  return (
    <div
      data-slot="item"
      data-selected={selected || undefined}
      data-disabled={disabled || undefined}
      className={cn(
        "flex w-full cursor-default items-center gap-2 rounded-[3px] border-2 border-transparent px-2 py-1.5 text-sm text-[#1b1b3a] outline-none select-none",
        "data-[selected=true]:border-[#1b1b3a] data-[selected=true]:bg-[#ffe45e]",
        "data-[highlighted]:border-[#1b1b3a] data-[highlighted]:bg-[#8ed1fc]",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function ItemSection({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-section"
      className={cn(
        "flex flex-col gap-0.5",
        className
      )}
      {...props}
    />
  )
}

function ItemLabel({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="item-label"
      className={cn("flex-1 truncate text-sm", className)}
      {...props}
    />
  )
}

function ItemIndicator({
  className,
  children,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="item-indicator"
      className={cn(
        "flex size-4 shrink-0 items-center justify-center text-[#1b1b3a] [&_svg]:size-3.5",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export { Item, ItemSection, ItemLabel, ItemIndicator, type ItemProps }
