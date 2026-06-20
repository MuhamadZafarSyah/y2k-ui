"use client"

import * as React from "react"
import { Collapsible as CollapsiblePrimitive } from "radix-ui"
import { ChevronRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

function CollapsibleTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Trigger>) {
  return (
    <CollapsiblePrimitive.Trigger
      data-slot="collapsible-trigger"
      className={cn(
        "group flex w-full items-center gap-2 rounded-[4px] border-2 border-[#1b1b3a] bg-[#8ed1fc] px-3 py-2 text-sm font-bold text-[#1b1b3a]",
        "hover:bg-[#b69cff] transition-colors",
        "data-[state=open]:bg-[#b69cff]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8fcf]",
        className
      )}
      {...props}
    >
      <ChevronRightIcon className="size-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-90" />
      <span className="flex-1 text-left">{children}</span>
    </CollapsiblePrimitive.Trigger>
  )
}

function CollapsibleContent({
  className,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Content>) {
  return (
    <CollapsiblePrimitive.Content
      data-slot="collapsible-content"
      className={cn(
        "overflow-hidden rounded-[4px] border-2 border-t-0 border-[#1b1b3a] bg-white text-sm text-[#1b1b3a]",
        "data-[state=open]:animate-in data-[state=open]:slide-in-from-top-1 data-[state=open]:fade-in-0",
        "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top-1 data-[state=closed]:fade-out-0",
        className
      )}
      {...props}
    >
      <div className="p-3">{props.children}</div>
    </CollapsiblePrimitive.Content>
  )
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger }
