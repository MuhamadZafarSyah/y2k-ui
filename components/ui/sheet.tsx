"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "radix-ui"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type SheetProps = React.ComponentProps<typeof DialogPrimitive.Root>
function Sheet({ ...props }: SheetProps) {
  return <DialogPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-[#1b1b3a]/30",
        "data-open:animate-in data-open:fade-in-0",
        "data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

const SHEET_SIDES = ["top", "bottom", "left", "right"] as const
type SheetSide = (typeof SHEET_SIDES)[number]

const sideStyles: Record<SheetSide, string> = {
  top: "inset-x-0 top-0 border-b-2 max-h-[40vh] data-open:slide-in-from-top data-closed:slide-out-to-top",
  bottom:
    "inset-x-0 bottom-0 border-t-2 max-h-[40vh] data-open:slide-in-from-bottom data-closed:slide-out-to-bottom",
  left: "inset-y-0 left-0 border-r-2 max-w-sm data-open:slide-in-from-left data-closed:slide-out-to-left",
  right:
    "inset-y-0 right-0 border-l-2 max-w-sm data-open:slide-in-from-right data-closed:slide-out-to-right",
}

type SheetContentProps = React.ComponentProps<typeof DialogPrimitive.Content> & {
  side?: SheetSide
  title?: React.ReactNode
}

function SheetContent({
  className,
  children,
  side = "right",
  title,
  ...props
}: SheetContentProps) {
  const closeRef = React.useRef<HTMLButtonElement>(null)

  return (
    <SheetPortal>
      <SheetOverlay />
      <DialogPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "fixed z-50 flex flex-col gap-0 overflow-y-auto bg-[#d7dde8] text-[#1b1b3a] duration-100 outline-none",
          "data-open:animate-in data-closed:animate-out",
          sideStyles[side],
          className
        )}
        {...props}
      >
        <DialogPrimitive.Close
          ref={closeRef}
          className="sr-only"
          tabIndex={-1}
          aria-hidden
        />
        <div
          data-slot="sheet-titlebar"
          className="flex items-center justify-between gap-2 border-b-2 border-[#1b1b3a] bg-[#8ed1fc] px-2 py-1.5"
        >
          {title ? (
            <DialogPrimitive.Title className="truncate font-heading text-sm font-semibold text-[#1b1b3a]">
              {title}
            </DialogPrimitive.Title>
          ) : (
            <DialogPrimitive.Title className="sr-only">Sheet</DialogPrimitive.Title>
          )}
          <button
            type="button"
            onClick={() => closeRef.current?.click()}
            className="inline-flex size-5 items-center justify-center rounded border-2 border-[#1b1b3a] bg-white text-[10px] font-bold text-[#1b1b3a] hover:bg-[#ff8fcf] transition-colors"
            aria-label="Close"
          >
            <XIcon className="size-3" />
          </button>
        </div>
        <div className="flex-1 bg-white p-4 text-sm text-[#1b1b3a]">
          {children}
        </div>
      </DialogPrimitive.Content>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn(
        "mt-auto flex flex-col-reverse gap-2 border-t-2 border-[#1b1b3a] bg-[#d7dde8] p-3 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="sheet-title"
      className={cn("font-heading text-base font-medium", className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-[#1b1b3a]/80", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
  type SheetProps,
  type SheetContentProps,
}
