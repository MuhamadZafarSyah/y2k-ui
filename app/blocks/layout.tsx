import type { ReactNode } from "react"
import { NavHeader } from "@/components/nav-header"

export default function BlocksLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavHeader />
      <main className="flex-1">{children}</main>
    </div>
  )
}
