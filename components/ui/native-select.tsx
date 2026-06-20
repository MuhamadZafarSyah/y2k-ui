import * as React from "react"

import { cn } from "@/lib/utils"

type NativeSelectProps = React.ComponentProps<"select"> & {
  leadingIcon?: React.ReactNode
}

function NativeSelect({
  className,
  children,
  leadingIcon,
  ...props
}: NativeSelectProps) {
  return (
    <div
      data-slot="native-select-wrapper"
      className={cn(
        "relative flex h-8 w-full min-w-0 items-center rounded border-2 border-[#1b1b3a] bg-white transition-colors focus-within:ring-2 focus-within:ring-[#ff8fcf]",
        className
      )}
    >
      {leadingIcon && (
        <span
          data-slot="native-select-leading"
          className="pointer-events-none absolute left-0 flex h-full items-center px-2 text-[#1b1b3a]/70 [&_svg]:size-3.5 [&_svg]:shrink-0"
        >
          {leadingIcon}
        </span>
      )}
      <select
        data-slot="native-select"
        className={cn(
          "h-full w-full appearance-none rounded bg-transparent px-2 text-sm text-[#1b1b3a] outline-none",
          leadingIcon && "pl-8",
          props
        )}
        {...props}
      >
        {children}
      </select>
      <svg
        data-slot="native-select-chevron"
        className="pointer-events-none absolute right-2 size-3.5 text-[#1b1b3a]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m7 10 5 5 5-5" />
      </svg>
    </div>
  )
}

export { NativeSelect, type NativeSelectProps }
