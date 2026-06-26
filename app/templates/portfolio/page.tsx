"use client"

import { TemplateShowcase } from "@/components/templates/template-showcase"
import { Palette, Zap, MonitorPlay, Globe } from "lucide-react"

const features = [
  {
    icon: <Palette className="size-4" />,
    title: "Y2K Design System",
    desc: "Pre-loaded with the full Y2K token palette, retro window components, and kawaii aesthetic.",
    color: "var(--y2k-pink)",
  },
  {
    icon: <Zap className="size-4" />,
    title: "GSAP Animations",
    desc: "Smooth scroll-triggered animations, stagger reveals, and a retro boot loader splash screen.",
    color: "var(--y2k-lemon)",
  },
  {
    icon: <MonitorPlay className="size-4" />,
    title: "Desktop OS Feel",
    desc: "Draggable-like floating window sections, window controls, and an immersive desktop experience.",
    color: "var(--y2k-blue)",
  },
  {
    icon: <Globe className="size-4" />,
    title: "Fully Responsive",
    desc: "Looks great on desktop, tablet, and mobile. TailwindCSS 4 with mobile-first breakpoints.",
    color: "var(--y2k-mint)",
  },
]

const componentsUsed = [
  "Button", "Card", "Badge", "Avatar",
  "Tabs", "Dialog", "Tooltip", "Progress", "Separator"
]

const dependencies = [
  { name: "y2k-ui-lib", version: "^0.0.2" },
  { name: "gsap", version: "^3.12.5" },
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

const cloneCommand = `git clone https://github.com/MuhamadZafarSyah/y2k-ui-portfolio-template.git
cd y2k-ui-portfolio-template
npm install
npm run dev`

export default function PortfolioShowcase() {
  return (
    <TemplateShowcase
      title="Personal Portfolio"
      subtitle="Y2K Style"
      description="A premium, responsive portfolio styled as a retro desktop operating system. Complete with an interactive boot loader splash screen, draggable-like floating window sections, and clean GSAP stagger reveal animations."
      screenshotSrc="/assets/images/templates/portfolio.png"
      screenshotAlt="Y2K Personal Portfolio Template Screenshot"
      cloneCommand={cloneCommand}
      features={features}
      componentsUsed={componentsUsed}
      dependencies={dependencies}
      techStack={techStack}
      titleBarColor="#8ed1fc"
      accentColor="#8ed1fc"
      accentVar="var(--y2k-pink)"
      tag="POPULAR"
      tagColor="#ffe45e"
      livePreviewUrl="http://portfolio-template.y2k-ui.web.id"
      githubUrl="https://github.com/MuhamadZafarSyah/y2k-ui-portfolio-template"
      windowTitle="template-portfolio-showcase.exe"
    />
  )
}
