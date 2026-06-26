"use client"

import { TemplateShowcase } from "@/components/templates/template-showcase"
import { Palette, Zap, MonitorPlay, Globe } from "lucide-react"

const features = [
  {
    icon: <Palette className="size-4" />,
    title: "Flat Y2K Aesthetic",
    desc: "Thick borders, pastel tones, and retro window frames instead of generic modern shadows.",
    color: "var(--y2k-pink)",
  },
  {
    icon: <Zap className="size-4" />,
    title: "GSAP & ScrollTrigger",
    desc: "Rich scroll reveals, parallax hero windows, and dynamic element staggers for premium feel.",
    color: "var(--y2k-lemon)",
  },
  {
    icon: <MonitorPlay className="size-4" />,
    title: "Software Box Metafora",
    desc: "Hero layout styled like a physical software installer or floppy disk layout.",
    color: "var(--y2k-blue)",
  },
  {
    icon: <Globe className="size-4" />,
    title: "Interactive Components",
    desc: "Includes tabs-driven pricing model, bento feature grid, and accordion FAQ systems.",
    color: "var(--y2k-mint)",
  },
]

const componentsUsed = [
  "Button", "Card", "Badge", "Accordion",
  "Tabs", "Tooltip", "Avatar", "Dialog", "Input", "Window-Controls"
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

const cloneCommand = `git clone https://github.com/MuhamadZafarSyah/y2k-ui-saas-template.git
cd y2k-ui-saas-template
npm install
npm run dev`

export default function SaasShowcase() {
  return (
    <TemplateShowcase
      title="SaaS Landing Page"
      subtitle="Y2K Style"
      description="A high-converting SaaS landing page template built using the Y2K Design System. Features retro-themed components like a bento features grid, active pricing tiers, interactive accordion FAQs, and is fully layered with rich GSAP + ScrollTrigger reveals."
      screenshotSrc="/assets/images/templates/saas-landing.png"
      screenshotAlt="Y2K SaaS Landing Page Template Screenshot"
      cloneCommand={cloneCommand}
      features={features}
      componentsUsed={componentsUsed}
      dependencies={dependencies}
      techStack={techStack}
      titleBarColor="#ff8fcf"
      accentColor="#ff8fcf"
      accentVar="var(--y2k-pink)"
      tag="NEW"
      tagColor="#8ed1fc"
      livePreviewUrl="http://saas-template.y2k-ui.web.id"
      githubUrl="https://github.com/MuhamadZafarSyah/y2k-ui-saas-template"
      windowTitle="template-saas-showcase.exe"
    />
  )
}
