import * as React from "react"
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse rounded-md border-2 border-y2k-ink/10 bg-y2k-panel",
        className
      )}
      {...props}
    />
  )
}

function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "y2k-window overflow-hidden",
        className
      )}
      data-slot="skeleton-card"
    >
      <div className="y2k-window-title">
        <span className="y2k-title-dots" aria-hidden>
          <span /><span /><span />
        </span>
      </div>
      <div className="bg-card space-y-3 p-4">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-6 w-16 rounded-sm" />
          <Skeleton className="h-6 w-16 rounded-sm" />
        </div>
      </div>
    </div>
  )
}

function SkeletonAvatar({ className }: { className?: string }) {
  return (
    <Skeleton
      className={cn("h-10 w-10 rounded-sm border-2 border-y2k-ink/20", className)}
      data-slot="skeleton-avatar"
    />
  )
}

function SkeletonButton({ className }: { className?: string }) {
  return (
    <Skeleton
      className={cn("h-8 w-20 rounded-sm border-2 border-y2k-ink/20", className)}
      data-slot="skeleton-button"
    />
  )
}

export { Skeleton, SkeletonAvatar, SkeletonButton, SkeletonCard }
