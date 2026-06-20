"use client"

import * as React from "react"
import { ScrollArea as ScrollAreaPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn(
        "relative overflow-hidden rounded-md border-2 border-[#1b1b3a] bg-white",
        className
      )}
      {...props}
    >
      {children}
      <ScrollAreaPrimitive.Corner
        data-slot="scroll-area-corner"
        className="border-2 border-[#1b1b3a] bg-white"
      />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollAreaViewport({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Viewport>) {
  return (
    <ScrollAreaPrimitive.Viewport
      data-slot="scroll-area-viewport"
      className={cn(
        "size-full rounded-none",
        // Smooth momentum scrolling on webkit
        "[&:has([data-orientation=vertical])]:!overflow-y-auto [&:has([data-orientation=horizontal])]:!overflow-x-auto",
        className
      )}
      {...props}
    >
      {children}
    </ScrollAreaPrimitive.Viewport>
  )
}

function Scrollbar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Scrollbar>) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "flex touch-none select-none transition-all duration-150",
        orientation === "vertical"
          ? "h-full w-3.5 border-l-2 border-[#1b1b3a] p-[2px]"
          : "h-3.5 w-full border-t-2 border-[#1b1b3a] p-[2px]",
        // Hide when not hovered
        "data-[state=hidden]:opacity-0",
        className
      )}
      {...props}
    >
      <ScrollThumb />
    </ScrollAreaPrimitive.Scrollbar>
  )
}

function ScrollThumb({
  className,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Thumb>) {
  return (
    <ScrollAreaPrimitive.Thumb
      data-slot="scroll-area-thumb"
      className={cn(
        "relative flex-1 rounded-[4px] border-2 border-[#1b1b3a] bg-[#8ed1fc]",
        // Shrink the thumb slightly to avoid overlapping the track border
        "before:absolute before:inset-0 before:rounded-[3px]",
        className
      )}
      {...props}
    />
  )
}

function ScrollCorner({
  className,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Corner>) {
  return (
    <ScrollAreaPrimitive.Corner
      data-slot="scroll-area-corner"
      className={cn(
        "border-2 border-[#1b1b3a] bg-white",
        className
      )}
      {...props}
    />
  )
}

export {
  ScrollArea,
  ScrollAreaViewport,
  Scrollbar,
  ScrollThumb,
  ScrollCorner,
}
