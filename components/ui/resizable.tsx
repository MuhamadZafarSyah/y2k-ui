"use client"

import * as React from "react"
import { Group, Panel, Separator } from "react-resizable-panels"

import { cn } from "@/lib/utils"

type ResizablePanelGroupProps = React.ComponentProps<typeof Group>

function ResizablePanelGroup({
  className,
  ...props
}: ResizablePanelGroupProps) {
  return (
    <Group
      data-slot="resizable-panel-group"
      className={cn(
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
        className
      )}
      {...props}
    />
  )
}

type ResizablePanelProps = React.ComponentProps<typeof Panel>

function ResizablePanel({ className, ...props }: ResizablePanelProps) {
  return (
    <Panel
      data-slot="resizable-panel"
      className={cn("relative", className)}
      {...props}
    />
  )
}

type ResizableHandleProps = React.ComponentProps<typeof Separator> & {
  withHandle?: boolean
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}: ResizableHandleProps) {
  return (
    <Separator
      data-slot="resizable-handle"
      className={cn(
        "relative flex w-px items-center justify-center bg-[#1b1b3a]/20 after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8fcf] focus-visible:ring-offset-1",
        "data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0 data-[panel-group-direction=vertical]:after:-translate-y-1/2",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="z-10 flex h-4 w-3 items-center justify-center rounded-[2px] border-2 border-[#1b1b3a] bg-white">
          <svg
            className="size-2.5 text-[#1b1b3a]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="9" cy="12" r="1" />
            <circle cx="15" cy="12" r="1" />
            <circle cx="9" cy="5" r="1" />
            <circle cx="15" cy="5" r="1" />
            <circle cx="9" cy="19" r="1" />
            <circle cx="15" cy="19" r="1" />
          </svg>
        </div>
      )}
    </Separator>
  )
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle, type ResizableHandleProps }
