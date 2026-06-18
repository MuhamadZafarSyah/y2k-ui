"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function DialogDefaultDemo() {
  return (
    <Dialog>
      <DialogTrigger
        className="inline-flex h-9 items-center rounded border-2 border-[#1b1b3a] bg-[#ffe45e] px-4 text-sm font-semibold text-[#1b1b3a] hover:bg-[#ff8fcf]"
        asChild={false}
      >
        Open dialog
      </DialogTrigger>
      <DialogContent title="Edit profile">
        <DialogHeader>
          <DialogDescription>
            Make changes to your profile. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-3 space-y-2">
          <label className="text-xs font-semibold text-[#1b1b3a]">
            Display name
          </label>
          <input
            type="text"
            defaultValue="kawaii_user"
            className="h-8 w-full rounded border-2 border-[#1b1b3a] bg-white px-2 text-sm"
          />
        </div>
        <DialogFooter>
          <button
            type="button"
            className="inline-flex h-7 items-center rounded border-2 border-[#1b1b3a] bg-white px-3 text-xs font-semibold text-[#1b1b3a] hover:bg-[#ffe45e]"
          >
            Cancel
          </button>
          <button
            type="button"
            className="inline-flex h-7 items-center rounded border-2 border-[#1b1b3a] bg-[#8ff0d0] px-3 text-xs font-semibold text-[#1b1b3a] hover:bg-[#b69cff]"
          >
            Save
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function DialogHideControlsDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Dialog>
        <DialogTrigger className="inline-flex h-9 items-center rounded border-2 border-[#1b1b3a] bg-[#8ed1fc] px-4 text-sm font-semibold text-[#1b1b3a] hover:bg-[#b69cff]">
          Hide close
        </DialogTrigger>
        <DialogContent title="No close ✕" hideClose>
          <DialogDescription>
            The close (✕) button is hidden via <code>hideClose</code>. Press
            Esc or click the overlay to close.
          </DialogDescription>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger className="inline-flex h-9 items-center rounded border-2 border-[#1b1b3a] bg-[#b69cff] px-4 text-sm font-semibold text-[#1b1b3a] hover:bg-[#8ed1fc]">
          Min only
        </DialogTrigger>
        <DialogContent title="Minimize only" hideMaximize hideClose>
          <DialogDescription>
            Only the minimize (_) control is shown.
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  )
}
