import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import { Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border-2 border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all duration-150 outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-[1.5px] active:not-aria-[haspopup]:scale-[0.97] active:not-aria-[haspopup]:duration-75 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[#ffe45e] text-[#1b1b3a] border-[#1b1b3a] hover:bg-[#ff8fcf]",
        pink: "bg-[#ff8fcf] text-[#1b1b3a] border-[#1b1b3a] hover:bg-[#ffe45e]",
        blue: "bg-[#8ed1fc] text-[#1b1b3a] border-[#1b1b3a] hover:bg-[#b69cff]",
        mint: "bg-[#8ff0d0] text-[#1b1b3a] border-[#1b1b3a] hover:bg-[#8ed1fc]",
        lilac: "bg-[#b69cff] text-[#1b1b3a] border-[#1b1b3a] hover:bg-[#ff8fcf]",
        lemon: "bg-[#ffe45e] text-[#1b1b3a] border-[#1b1b3a] hover:bg-[#8ff0d0]",
        outline:
          "border-[#1b1b3a] bg-white text-[#1b1b3a] hover:bg-[#d7dde8]",
        secondary:
          "bg-[#d7dde8] text-[#1b1b3a] border-[#1b1b3a] hover:bg-[#8ed1fc]",
        ghost:
          "border-transparent bg-transparent text-[#1b1b3a] hover:bg-[#d7dde8]",
        destructive:
          "bg-[#ff8fcf] text-[#1b1b3a] border-[#1b1b3a] hover:bg-[#1b1b3a] hover:text-[#ffe45e]",
        link: "border-transparent bg-transparent text-[#1b1b3a] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 has-[>svg]:px-3 [&_svg:not([class*='size-'])]:size-4",
        xs: "h-6 gap-1 rounded-md px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1 rounded-md px-3 text-[0.8rem] [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-10 gap-2 px-5 [&_svg:not([class*='size-'])]:size-5",
        icon: "size-9 [&_svg:not([class*='size-'])]:size-4",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 rounded-md",
        "icon-lg": "size-10 [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    loading?: boolean
    loadingText?: string
    leadingIcon?: React.ReactNode
    trailingIcon?: React.ReactNode
  }

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  loading = false,
  loadingText,
  leadingIcon,
  trailingIcon,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button"
  const isDisabled = disabled || loading

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-loading={loading}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {loading ? (
        <>
          <Loader2Icon
            data-slot="button-spinner"
            className="size-[1em] animate-spin"
            aria-hidden
          />
          {loadingText ?? children}
        </>
      ) : (
        <>
          {leadingIcon && (
            <span data-slot="button-leading-icon" className="contents">
              {leadingIcon}
            </span>
          )}
          {children}
          {trailingIcon && (
            <span data-slot="button-trailing-icon" className="contents">
              {trailingIcon}
            </span>
          )}
        </>
      )}
    </Comp>
  )
}

export { Button, buttonVariants, type ButtonProps }