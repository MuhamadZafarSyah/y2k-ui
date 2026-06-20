import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"

/* ─── Pagination (nav root) ─── */

const Pagination = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav">
>(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
))
Pagination.displayName = "Pagination"

/* ─── PaginationContent (ul) ─── */

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentPropsWithoutRef<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

/* ─── PaginationItem (li) ─── */

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

/* ─── PaginationLink ─── */

type PaginationLinkProps = {
  isActive?: boolean
  size?: "default" | "sm" | "lg"
  asChild?: boolean
} & React.ComponentPropsWithoutRef<"a">

const PaginationLink = React.forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  (
    { className, isActive, size = "default", asChild = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "a"
    return (
      <Comp
        ref={ref}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "inline-flex items-center justify-center rounded-md border-2 border-y2k-ink font-mono text-sm font-bold text-y2k-ink transition-all hover:-translate-y-0.5 active:scale-95",
          isActive
            ? "bg-y2k-blue shadow-[2px_2px_0px_#1b1b3a]"
            : "bg-card hover:bg-y2k-lemon",
          size === "default" && "h-9 w-9",
          size === "sm" && "h-8 w-8 text-xs",
          size === "lg" && "h-11 w-11 text-base",
          className,
        )}
        {...props}
      />
    )
  },
)
PaginationLink.displayName = "PaginationLink"

/* ─── PaginationPrevious ─── */

type PaginationPreviousProps = React.ComponentPropsWithoutRef<"a"> & {
  asChild?: boolean
}

const PaginationPrevious = React.forwardRef<
  HTMLAnchorElement,
  PaginationPreviousProps
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"
  return (
    <Comp
      ref={ref}
      aria-label="Go to previous page"
      className={cn(
        "inline-flex items-center justify-center gap-1 rounded-md border-2 border-y2k-ink bg-card px-3 py-2 font-mono text-sm font-bold text-y2k-ink transition-all hover:bg-y2k-pink hover:-translate-y-0.5 active:scale-95",
        className,
      )}
      {...props}
    >
      <ChevronLeftIcon className="h-4 w-4" />
      <span>Previous</span>
    </Comp>
  )
})
PaginationPrevious.displayName = "PaginationPrevious"

/* ─── PaginationNext ─── */

type PaginationNextProps = React.ComponentPropsWithoutRef<"a"> & {
  asChild?: boolean
}

const PaginationNext = React.forwardRef<
  HTMLAnchorElement,
  PaginationNextProps
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"
  return (
    <Comp
      ref={ref}
      aria-label="Go to next page"
      className={cn(
        "inline-flex items-center justify-center gap-1 rounded-md border-2 border-y2k-ink bg-card px-3 py-2 font-mono text-sm font-bold text-y2k-ink transition-all hover:bg-y2k-mint hover:-translate-y-0.5 active:scale-95",
        className,
      )}
      {...props}
    >
      <span>Next</span>
      <ChevronRightIcon className="h-4 w-4" />
    </Comp>
  )
})
PaginationNext.displayName = "PaginationNext"

/* ─── PaginationEllipsis ─── */

const PaginationEllipsis = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    aria-hidden
    className={cn(
      "flex h-9 w-9 items-center justify-center font-mono text-sm text-y2k-ink",
      className,
    )}
    {...props}
  >
    ···
  </span>
))
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
