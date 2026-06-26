import type { ReactNode } from "react"
import { NavHeader } from "@/components/nav-header"

export default function TemplatesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#f7f8fc]">
      <NavHeader />
      <main className="flex-1">{children}</main>
    </div>
  )
}
