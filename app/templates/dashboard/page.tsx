"use client"

import { TemplateShowcase } from "@/components/templates/template-showcase"
import { Palette, Zap, MonitorPlay, Globe } from "lucide-react"

const features = [
  {
    icon: <Palette className="size-4" />,
    title: "Flat Y2K Dashboard Layout",
    desc: "Sidebar + topbar navigation with thick borders, custom scrollbars, and pastel accents.",
    color: "var(--y2k-mint)",
  },
  {
    icon: <Zap className="size-4" />,
    title: "Rich GSAP Motion Suite",
    desc: "Includes page transition sweeps, numeric count-ups for overview metrics, and hover staggers.",
    color: "var(--y2k-pink)",
  },
  {
    icon: <MonitorPlay className="size-4" />,
    title: "AI Assistant ByteBuddy",
    desc: "Mocked retro terminal dialog showing context conversations logs from template setup.",
    color: "var(--y2k-blue)",
  },
  {
    icon: <Globe className="size-4" />,
    title: "Complete SaaS Sub-pages",
    desc: "Fully-implemented mockups for Overview, Analytics, Customers, Conversations, Billing, and Settings.",
    color: "var(--y2k-lemon)",
  },
]

const componentsUsed = [
  "Button", "Card", "Badge", "Tabs", "Table", "Dropdown Menu",
  "Select", "Switch", "Checkbox", "Input", "Textarea", "Dialog",
  "Tooltip", "Avatar", "Progress", "Separator", "Skeleton", "Chart"
]

const dependencies = [
  { name: "y2k-ui-lib", version: "^0.0.3" },
  { name: "gsap", version: "^3.12.5" },
  { name: "@gsap/react", version: "^2.1.1" },
  { name: "recharts", version: "^2.15.0" },
  { name: "radix-ui", version: "^1.6.0" },
  { name: "lucide-react", version: "^1.21.0" },
  { name: "tw-animate-css", version: "^1.4.0" }
]

const techStack = [
  { name: "Next.js", version: "16 (App Router)", desc: "React Framework" },
  { name: "React", version: "19", desc: "UI Library" },
  { name: "TypeScript", version: "5", desc: "Type Safety" },
  { name: "TailwindCSS", version: "4", desc: "Utility-first styling" }
]

const cloneCommand = `git clone https://github.com/MuhamadZafarSyah/y2k-ui-dashboard-template.git
cd y2k-ui-dashboard-template
npm install
npm run dev`

export default function DashboardShowcase() {
  return (
    <TemplateShowcase
      title="Full SaaS Dashboard"
      subtitle="Y2K Style"
      description="A comprehensive SaaS dashboard template built using the Y2K Design System. Features full app shell with responsive sidebar navigation, metrics overview, data analysis charts, searchable client database tables, AI chat logs, settings forms, and smooth GSAP page reveals."
      screenshotSrc="/assets/images/templates/dashboard.png"
      screenshotAlt="Y2K Full SaaS Dashboard Template Screenshot"
      cloneCommand={cloneCommand}
      features={features}
      componentsUsed={componentsUsed}
      dependencies={dependencies}
      techStack={techStack}
      titleBarColor="#8ff0d0"
      accentColor="#8ff0d0"
      accentVar="var(--y2k-mint)"
      tag="NEW"
      tagColor="#ff8fcf"
      livePreviewUrl="http://dashboard-template.y2k-ui.web.id"
      githubUrl="https://github.com/MuhamadZafarSyah/y2k-ui-dashboard-template"
      windowTitle="template-dashboard-showcase.exe"
    />
  )
}
