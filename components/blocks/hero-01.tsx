"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRightIcon,
  SparklesIcon,
} from "lucide-react"

export function HeroSectionBlock() {
  return (
    <div className="w-full max-w-3xl text-center">
      <div className="mb-4 flex items-center justify-center gap-2">
        <Badge variant="blue">
          <SparklesIcon className="size-3" />
          New Release
        </Badge>
        <Badge variant="pink">v0.3.0</Badge>
      </div>
      <h1 className="text-4xl font-black tracking-tight text-y2k-ink md:text-5xl">
        Build retro-future
        <br />
        <span className="inline-flex items-center gap-2">
          interfaces with{" "}
          <span className="rounded border-2 border-y2k-ink bg-y2k-lemon px-2">
            Y2K UI
          </span>
        </span>
      </h1>
      <p className="mx-auto mt-4 max-w-lg text-sm text-y2k-ink/70">
        A modern Y2K / kawaii-retro component library for React. Flat windows,
        thick navy outlines, pastel fills. Built on shadcn and Radix UI.
      </p>
      <div className="mt-6 flex items-center justify-center gap-3">
        <Button variant="blue" trailingIcon={<ArrowRightIcon />}>
          Get Started
        </Button>
        <Button variant="outline">View on GitHub</Button>
      </div>
      <div className="mt-6 flex items-center justify-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="flex size-5 items-center justify-center rounded border-2 border-y2k-ink bg-y2k-mint text-[10px] font-bold text-y2k-ink">
            ✓
          </span>
          <span className="text-xs font-semibold text-y2k-ink/70">
            Accessible
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="flex size-5 items-center justify-center rounded border-2 border-y2k-ink bg-y2k-pink text-[10px] font-bold text-y2k-ink">
            ✓
          </span>
          <span className="text-xs font-semibold text-y2k-ink/70">
            Customizable
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="flex size-5 items-center justify-center rounded border-2 border-y2k-ink bg-y2k-lilac text-[10px] font-bold text-y2k-ink">
            ✓
          </span>
          <span className="text-xs font-semibold text-y2k-ink/70">
            Open Source
          </span>
        </div>
      </div>
    </div>
  )
}
