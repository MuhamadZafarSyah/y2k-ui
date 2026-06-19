"use client"

import * as React from "react"
import { SearchIcon } from "lucide-react"
import { useSearchContext } from "fumadocs-ui/contexts/search"

export function SearchTriggerSm() {
  const { setOpenSearch } = useSearchContext()
  return (
    <button
      type="button"
      data-search=""
      onClick={() => setOpenSearch(true)}
      aria-label="Open search"
      className="inline-flex h-8 items-center gap-2 rounded-md border-2 border-[#1b1b3a] bg-white px-2.5 text-xs font-semibold text-[#1b1b3a]/70 transition-colors hover:bg-[#d7dde8]"
    >
      <SearchIcon className="h-3.5 w-3.5" />
      <span className="font-mono">Search</span>
      <kbd className="inline-flex h-5 items-center rounded border-2 border-[#1b1b3a] bg-[#d7dde8] px-1 font-mono text-[10px] font-bold text-[#1b1b3a]">
        ⌘K
      </kbd>
    </button>
  )
}

export function SearchTriggerFull() {
  const { setOpenSearch } = useSearchContext()
  return (
    <button
      type="button"
      data-search-full=""
      onClick={() => setOpenSearch(true)}
      className="inline-flex w-full items-center gap-2 rounded-md border-2 border-[#1b1b3a] bg-white px-3 py-2 text-sm font-semibold text-[#1b1b3a]/70 transition-colors hover:bg-[#d7dde8]"
    >
      <SearchIcon className="h-4 w-4" />
      <span>Search docs…</span>
      <kbd className="ml-auto inline-flex h-5 items-center rounded border-2 border-[#1b1b3a] bg-[#d7dde8] px-1.5 font-mono text-[10px] font-bold text-[#1b1b3a]">
        ⌘K
      </kbd>
    </button>
  )
}