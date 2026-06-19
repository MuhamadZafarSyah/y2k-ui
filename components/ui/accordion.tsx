"use client"

import * as React from "react"
import { Accordion as AccordionPrimitive } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const accordionRootVariants = cva("rounded-md border-2 border-[#1b1b3a]", {
  variants: {
    variant: {
      default: "bg-white",
      blue: "bg-[#8ed1fc]/20",
      pink: "bg-[#ff8fcf]/20",
      mint: "bg-[#8ff0d0]/25",
      lilac: "bg-[#b69cff]/20",
      lemon: "bg-[#ffe45e]/25",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

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
      className={cn("border-b-2 border-[#1b1b3a]/30 last:border-b-0", className)}
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
          "flex flex-1 items-center justify-between gap-3 border-2 border-transparent px-3 py-2.5 text-sm font-semibold text-[#1b1b3a] transition-colors hover:bg-[#8ed1fc]/30 [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="h-4 w-4 shrink-0 text-[#1b1b3a] transition-transform duration-300" />
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
      className="overflow-hidden text-sm text-[#1b1b3a] data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("px-3 pb-3 pt-1", className)}>{children}</div>
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