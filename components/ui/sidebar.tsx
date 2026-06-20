"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

const SIDEBAR_COOKIE_NAME = "sidebar:state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContextProps = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

type SidebarProviderProps = React.ComponentProps<"div"> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: SidebarProviderProps) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)

  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open]
  )

  const toggleSidebar = React.useCallback(() => {
    isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
  }, [isMobile, setOpen])

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  const state = open ? "expanded" : "collapsed"

  return (
    <SidebarContext.Provider
      value={{
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }}
    >
      <div
        data-slot="sidebar-provider"
        style={{
          "--sidebar-width": SIDEBAR_WIDTH,
          "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
          ...style,
        } as React.CSSProperties}
        className={cn(
          "group/sidebar-wrapper flex has-data-[variant=inset]:min-h-0",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

type SidebarProps = React.ComponentProps<"div"> & {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
}

function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}: SidebarProps) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        data-side={side}
        data-variant={variant}
        className={cn(
          "flex h-full w-(--sidebar-width) flex-col border-2 border-[#1b1b3a] bg-[#d7dde8] text-[#1b1b3a]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <>
        <div
          data-slot="sidebar-overlay"
          className={cn(
            "fixed inset-0 z-50 bg-[#1b1b3a]/30",
            openMobile ? "animate-in fade-in-0" : "hidden"
          )}
          onClick={() => setOpenMobile(false)}
        />
        <div
          data-slot="sidebar"
          data-side={side}
          data-variant={variant}
          className={cn(
            "fixed inset-y-0 z-50 flex h-full w-(--sidebar-width-mobile) flex-col border-2 border-[#1b1b3a] bg-[#d7dde8] text-[#1b1b3a] transition-transform duration-200",
            side === "left" && "-translate-x-full data-open:translate-x-0",
            side === "right" && "translate-x-full data-open:translate-x-0",
            openMobile && "data-open"
          )}
          {...props}
        >
          {children}
        </div>
      </>
    )
  }

  return (
    <div
      data-slot="sidebar"
      data-side={side}
      data-variant={variant}
      data-state={state}
      data-collapsible={collapsible}
      className={cn(
        "flex h-full flex-col border-2 border-[#1b1b3a] bg-[#d7dde8] text-[#1b1b3a]",
        "group-data-collapsible=icon:w-(--sidebar-width-icon)",
        "group-data-collapsible=offcanvas:w-0 group-data-collapsible=offcanvas:overflow-hidden group-data-collapsible=offcanvas:border-0",
        "transition-[width] duration-200",
        side === "right" && "border-l-2 border-r-0",
        state === "collapsed" && "w-(--sidebar-width-icon)",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function SidebarHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      className={cn(
        "flex items-center gap-2 border-b-2 border-[#1b1b3a] px-3 py-2",
        className
      )}
      {...props}
    />
  )
}

function SidebarFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn(
        "mt-auto flex items-center gap-2 border-t-2 border-[#1b1b3a] px-3 py-2",
        className
      )}
      {...props}
    />
  )
}

function SidebarContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      className={cn(
        "flex flex-1 flex-col gap-0.5 overflow-auto px-3 py-2",
        className
      )}
      {...props}
    />
  )
}

function SidebarGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      className={cn("flex flex-col gap-0.5", className)}
      {...props}
    />
  )
}

function SidebarGroupLabel({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-label"
      className={cn(
        "px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#1b1b3a]/50",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenu({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      className={cn("flex flex-col gap-0.5", className)}
      {...props}
    />
  )
}

function SidebarMenuItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      className={cn("list-none", className)}
      {...props}
    />
  )
}

type SidebarMenuButtonProps = React.ComponentProps<"button"> & {
  asChild?: boolean
  isActive?: boolean
}

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  className,
  ...props
}: SidebarMenuButtonProps) {
  const Comp = asChild ? Slot.Root : "button"
  return (
    <Comp
      data-slot="sidebar-menu-button"
      data-active={isActive}
      className={cn(
        "inline-flex h-8 w-full items-center gap-2 rounded-[3px] border-2 border-transparent px-2 text-sm text-[#1b1b3a] outline-none select-none",
        "hover:border-[#1b1b3a] hover:bg-[#8ed1fc]",
        "focus-visible:ring-2 focus-visible:ring-[#ff8fcf]",
        "data-active=true:border-[#1b1b3a] data-active=true:bg-[#ffe45e]",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        "[&_svg]:size-4 [&_svg]:shrink-0",
        "group-data-collapsible=icon:justify-center group-data-collapsible=icon:p-2",
        className
      )}
      {...props}
    />
  )
}

function SidebarMenuAction({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      data-slot="sidebar-menu-action"
      className={cn(
        "flex size-6 items-center justify-center rounded-[3px] border-2 border-transparent text-[#1b1b3a]",
        "hover:border-[#1b1b3a] hover:bg-[#d7dde8]",
        "focus-visible:ring-2 focus-visible:ring-[#ff8fcf]",
        "[&_svg]:size-3.5",
        className
      )}
      {...props}
    />
  )
}

function SidebarRail({
  className,
  ...props
}: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar()
  return (
    <button
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      onClick={toggleSidebar}
      className={cn(
        "absolute inset-y-0 z-20 hidden w-1 cursor-col-resize bg-[#1b1b3a]/10 after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 group-data-side=left:-right-1 group-data-side=right:-left-1 group-data-side=left:translate-x-1/2 group-data-side=right:-translate-x-1/2",
        "hover:bg-[#1b1b3a]/20",
        "sm:flex",
        className
      )}
      {...props}
    />
  )
}

function SidebarInset({
  className,
  ...props
}: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "relative flex min-h-svh flex-1 flex-col",
        "group-data-variant=inset:bg-[#d7dde8] group-data-variant=inset:border-2 group-data-variant=inset:border-[#1b1b3a]",
        className
      )}
      {...props}
    />
  )
}

function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar()
  return (
    <button
      data-slot="sidebar-trigger"
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      className={cn(
        "inline-flex size-7 items-center justify-center rounded-[3px] border-2 border-[#1b1b3a] bg-white text-[#1b1b3a]",
        "hover:bg-[#8ed1fc]",
        "focus-visible:ring-2 focus-visible:ring-[#ff8fcf]",
        className
      )}
      {...props}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
        aria-hidden="true"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M9 3v18" />
      </svg>
      <span className="sr-only">Toggle Sidebar</span>
    </button>
  )
}

export {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarRail,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
}
