import * as React from "react"

import { cn } from "@/lib/utils"

type EmptyProps = React.ComponentProps<"div"> & {
  icon?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
}

function Empty({
  className,
  icon,
  title,
  description,
  action,
  children,
  ...props
}: EmptyProps) {
  return (
    <div
      data-slot="empty"
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded border-2 border-dashed border-[#1b1b3a]/30 px-6 py-10 text-center",
        className
      )}
      {...props}
    >
      {icon && (
        <div
          data-slot="empty-icon"
          className="text-[#1b1b3a]/50 [&_svg]:size-8"
        >
          {icon}
        </div>
      )}
      {title && (
        <p data-slot="empty-title" className="text-sm font-semibold text-[#1b1b3a]">
          {title}
        </p>
      )}
      {description && (
        <p data-slot="empty-description" className="max-w-xs text-xs text-[#1b1b3a]/60">
          {description}
        </p>
      )}
      {action && <div data-slot="empty-action">{action}</div>}
      {children}
    </div>
  )
}

export { Empty, type EmptyProps }
