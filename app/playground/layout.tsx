import type { ReactNode } from "react"
import Link from "next/link"
import { NavPlayground } from "@/components/playground/nav-playground"

export default function PlaygroundLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#f7f8fc]">
      <NavPlayground />
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  )
}
