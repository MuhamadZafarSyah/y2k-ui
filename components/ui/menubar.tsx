"use client"

import * as React from "react"
import { Menubar as MenubarPrimitive } from "radix-ui"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Menubar({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Root>) {
  return (
    <MenubarPrimitive.Root
      data-slot="menubar"
      className={cn(
        "inline-flex h-9 items-center gap-1 rounded-md border-2 border-[#1b1b3a] bg-[#d7dde8] p-1 text-sm text-[#1b1b3a]",
        className
      )}
      {...props}
    />
  )
}

function MenubarMenu({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />
}

function MenubarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Trigger>) {
  return (
    <MenubarPrimitive.Trigger
      data-slot="menubar-trigger"
      className={cn(
        "inline-flex items-center gap-1 rounded-[4px] border-2 border-transparent px-2.5 py-1 text-xs font-semibold",
        "outline-none select-none",
        "data-open:border-[#1b1b3a] data-open:bg-white",
        "data-highlighted:border-[#1b1b3a] data-highlighted:bg-white",
        "focus-visible:border-[#ff8fcf]",
        className
      )}
      {...props}
    />
  )
}

function MenubarContent({
  className,
  align = "start",
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Content>) {
  return (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        data-slot="menubar-content"
        align={align}
        sideOffset={4}
        className={cn(
          "z-50 min-w-[12rem] overflow-hidden rounded-md border-2 border-[#1b1b3a] bg-white p-1 text-sm text-[#1b1b3a]",
          "shadow-[3px_3px_0px_0px_#1b1b3a]",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          className
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  )
}

function MenubarItem({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Item> & { inset?: boolean }) {
  return (
    <MenubarPrimitive.Item
      data-slot="menubar-item"
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-[4px] px-2 py-1.5 text-xs font-semibold outline-none select-none",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        "data-highlighted:bg-[#8ed1fc] data-highlighted:text-[#1b1b3a]",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  )
}

function MenubarCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>) {
  return (
    <MenubarPrimitive.CheckboxItem
      data-slot="menubar-checkbox-item"
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-[4px] px-2 py-1.5 text-xs font-semibold outline-none select-none",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        "data-highlighted:bg-[#8ed1fc] data-highlighted:text-[#1b1b3a]",
        "pl-8",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex size-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <CheckIcon className="size-3" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  )
}

function MenubarRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioItem>) {
  return (
    <MenubarPrimitive.RadioItem
      data-slot="menubar-radio-item"
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-[4px] px-2 py-1.5 text-xs font-semibold outline-none select-none",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        "data-highlighted:bg-[#8ed1fc] data-highlighted:text-[#1b1b3a]",
        "pl-8",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex size-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  )
}

function MenubarSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <MenubarPrimitive.SubTrigger
      data-slot="menubar-sub-trigger"
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-[4px] px-2 py-1.5 text-xs font-semibold outline-none select-none",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        "data-highlighted:bg-[#8ed1fc] data-highlighted:text-[#1b1b3a]",
        "data-open:bg-[#8ed1fc]",
        inset && "pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-3" />
    </MenubarPrimitive.SubTrigger>
  )
}

function MenubarSubContent({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubContent>) {
  return (
    <MenubarPrimitive.SubContent
      data-slot="menubar-sub-content"
      className={cn(
        "z-50 min-w-[12rem] overflow-hidden rounded-md border-2 border-[#1b1b3a] bg-white p-1 text-sm text-[#1b1b3a]",
        "shadow-[3px_3px_0px_0px_#1b1b3a]",
        "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
        "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
        className
      )}
      {...props}
    />
  )
}

function MenubarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Separator>) {
  return (
    <MenubarPrimitive.Separator
      data-slot="menubar-separator"
      className={cn("mx-1 my-1 h-px bg-[#1b1b3a]/20", className)}
      {...props}
    />
  )
}

function MenubarLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Label> & { inset?: boolean }) {
  return (
    <MenubarPrimitive.Label
      data-slot="menubar-label"
      className={cn(
        "px-2 py-1.5 text-xs font-bold text-[#1b1b3a]/60",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  )
}

function MenubarShortcut({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="menubar-shortcut"
      className={cn("ml-auto text-xs tracking-widest text-[#1b1b3a]/40", className)}
      {...props}
    />
  )
}

export {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
}
