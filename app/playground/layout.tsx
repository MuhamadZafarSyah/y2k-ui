"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { NavHeader } from "@/components/nav-header"

export default function PlaygroundLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isHub = pathname === "/playground"

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#f7f8fc]">
      <NavHeader />
      <main className={isHub ? "flex-1 overflow-y-auto" : "flex-1 overflow-hidden"}>
        {children}
      </main>
    </div>
  )
}
