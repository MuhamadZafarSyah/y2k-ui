"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { NavigationMenu as NavigationMenuPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function NavigationMenu({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root>) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      className={cn(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        className
      )}
      {...props}
    >
      {children}
      <NavigationMenuViewport />
    </NavigationMenuPrimitive.Root>
  )
}

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        "group flex flex-1 list-none items-center justify-center gap-1",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("relative", className)}
      {...props}
    />
  )
}

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(
        "group inline-flex h-9 w-max items-center justify-center rounded-md border-2 border-[#1b1b3a] bg-white px-4 py-2 text-sm font-medium text-[#1b1b3a] outline-none select-none",
        "hover:bg-[#d7dde8] hover:text-[#1b1b3a]",
        "focus:bg-[#d7dde8] focus:text-[#1b1b3a]",
        "data-[state=open]:bg-[#8ed1fc] data-[state=open]:text-[#1b1b3a]",
        "focus-visible:ring-2 focus-visible:ring-[#ff8fcf] focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon
        className="relative top-px ml-1 size-3 transition-transform duration-200 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  )
}

function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in-0",
        "data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out-0",
        "data-[motion=from-end]:slide-in-from-right-52",
        "data-[motion=from-start]:slide-in-from-left-52",
        "data-[motion=to-end]:slide-out-to-right-52",
        "data-[motion=to-start]:slide-out-to-left-52",
        "bg-white",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div
      className={cn(
        "absolute left-0 top-full flex justify-center"
      )}
    >
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          "origin-top-center relative mt-1.5 overflow-hidden rounded-md border-2 border-[#1b1b3a] bg-white text-[#1b1b3a]",
          "w-full min-w-[8rem] md:w-auto md:min-w-max",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          className
        )}
        {...props}
      />
    </div>
  )
}

function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "block select-none space-y-1 rounded-md p-3 text-sm leading-none font-medium text-[#1b1b3a] no-underline outline-none transition-colors",
        "hover:bg-[#8ed1fc] hover:text-[#1b1b3a]",
        "focus:bg-[#8ed1fc] focus:text-[#1b1b3a]",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
        "data-[state=visible]:animate-in data-[state=visible]:fade-in-0",
        "data-[state=hidden]:animate-out data-[state=hidden]:fade-out-0",
        className
      )}
      {...props}
    >
      <div className="relative top-[60%] size-2 rotate-45 rounded-tl-sm border-2 border-[#1b1b3a] bg-white" />
    </NavigationMenuPrimitive.Indicator>
  )
}

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
}

const navigationMenuTriggerStyle = () =>
  cn(
    "group inline-flex h-9 w-max items-center justify-center rounded-md border-2 border-[#1b1b3a] bg-white px-4 py-2 text-sm font-medium text-[#1b1b3a] outline-none select-none",
    "hover:bg-[#d7dde8] hover:text-[#1b1b3a]",
    "focus:bg-[#d7dde8] focus:text-[#1b1b3a]",
    "data-[state=open]:bg-[#8ed1fc] data-[state=open]:text-[#1b1b3a]",
    "focus-visible:ring-2 focus-visible:ring-[#ff8fcf] focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50"
  )
