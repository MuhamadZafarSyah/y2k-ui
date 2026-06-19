import * as React from "react"

import { cn } from "@/lib/utils"

type InputProps = React.ComponentProps<"input"> & {
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  wrapperClassName?: string
}

function Input({
  className,
  type,
  leadingIcon,
  trailingIcon,
  prefix,
  suffix,
  wrapperClassName,
  ...props
}: InputProps) {
  const hasAddon = leadingIcon || trailingIcon || prefix || suffix

  if (!hasAddon) {
    return (
      <input
        type={type}
        data-slot="input"
        className={cn(
          "h-8 w-full min-w-0 rounded border-2 border-[#1b1b3a] bg-white px-2.5 py-1 text-sm text-[#1b1b3a] outline-none transition-colors placeholder:text-[#1b1b3a]/45 focus-visible:ring-2 focus-visible:ring-[#ff8fcf] disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-[#ff8fcf] aria-invalid:ring-2 aria-invalid:ring-[#ff8fcf]/40",
          className
        )}
        {...props}
      />
    )
  }

  return (
    <div
      data-slot="input-wrapper"
      className={cn(
        "flex h-8 w-full min-w-0 items-center rounded border-2 border-[#1b1b3a] bg-white transition-colors focus-within:ring-2 focus-within:ring-[#ff8fcf] aria-invalid:border-[#ff8fcf] aria-invalid:ring-2 aria-invalid:ring-[#ff8fcf]/40",
        wrapperClassName,
      )}
    >
      {leadingIcon && (
        <span
          data-slot="input-leading"
          className="flex h-full items-center justify-center border-r-2 border-[#1b1b3a]/15 bg-[#d7dde8] px-2 text-[#1b1b3a]/70 [&_svg]:size-3.5 [&_svg]:shrink-0"
        >
          {leadingIcon}
        </span>
      )}
      {prefix && (
        <span
          data-slot="input-prefix"
          className="flex h-full items-center bg-[#d7dde8] px-2 font-mono text-xs font-semibold text-[#1b1b3a]"
        >
          {prefix}
        </span>
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          "h-full min-w-0 flex-1 bg-transparent px-2 text-sm text-[#1b1b3a] outline-none placeholder:text-[#1b1b3a]/45 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
      {suffix && (
        <span
          data-slot="input-suffix"
          className="flex h-full items-center bg-[#d7dde8] px-2 font-mono text-xs font-semibold text-[#1b1b3a]"
        >
          {suffix}
        </span>
      )}
      {trailingIcon && (
        <span
          data-slot="input-trailing"
          className="flex h-full items-center justify-center border-l-2 border-[#1b1b3a]/15 bg-[#d7dde8] px-2 text-[#1b1b3a]/70 [&_svg]:size-3.5 [&_svg]:shrink-0"
        >
          {trailingIcon}
        </span>
      )}
    </div>
  )
}

export { Input, type InputProps }