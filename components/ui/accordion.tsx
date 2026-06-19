"use client"

import * as React from "react"
import { Accordion as AccordionPrimitive } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("h-3.5 w-3.5", className)}
      aria-hidden="true"
    >
      <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z" />
    </svg>
  )
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-4 w-4 shrink-0 transition-transform duration-300", className)}
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

const accordionRootVariants = cva(
  "rounded-lg border-2 border-y2k-ink overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-card",
        blue: "bg-y2k-blue/20",
        pink: "bg-y2k-pink/20",
        mint: "bg-y2k-mint/25",
        lilac: "bg-y2k-lilac/20",
        lemon: "bg-y2k-lemon/25",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Accordion({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root> &
  VariantProps<typeof accordionRootVariants>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      data-variant={variant}
      className={cn(accordionRootVariants({ variant }), className)}
      {...props}
    />
  )
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "border-b-2 border-y2k-ink last:border-b-0",
        "group/item",
        className
      )}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex flex-1 items-center justify-between gap-3",
          "px-4 py-3 text-sm font-bold text-y2k-ink",
          "transition-all duration-200",
          "hover:bg-y2k-blue/20",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-y2k-pink",
          "[&[data-state=open]>svg]:rotate-180",
          "[&[data-state=open]]:bg-y2k-lemon/30",
          className
        )}
        {...props}
      >
        <span className="flex items-center gap-2">
          <SparkleIcon className="h-3 w-3 text-y2k-pink opacity-60 group-hover/item:opacity-100 transition-opacity" />
          {children}
        </span>
        <ChevronIcon className="text-y2k-ink" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn(
        "overflow-hidden text-sm text-y2k-ink",
        "data-[state=closed]:animate-accordion-up",
        "data-[state=open]:animate-accordion-down",
      )}
      {...props}
    >
      <div
        className={cn(
          "px-4 pb-4 pt-1",
          "border-t-2 border-y2k-ink/10",
          "bg-gradient-to-b from-y2k-panel/30 to-transparent",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}

export {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  accordionRootVariants,
}
