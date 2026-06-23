import type { ReactNode } from "react"
import { NavHeader } from "@/components/nav-header"

export default function PlaygroundLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#f7f8fc]">
      <NavHeader />
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  )
}
