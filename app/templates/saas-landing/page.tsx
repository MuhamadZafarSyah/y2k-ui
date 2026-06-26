"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { WindowControls } from "@/components/ui/window-controls"
import {
  ArrowLeft,
  ExternalLink,
  Copy,
  Check,
  Cpu,
  Layers,
  Box,
  Terminal,
  Star,
  MonitorPlay,
  Palette,
  Zap,
  Smile,
  Sparkles,
  Code2,
  Globe,
} from "lucide-react"

function CheckerPattern() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage:
          "linear-gradient(45deg, #1b1b3a 25%, transparent 25%), linear-gradient(-45deg, #1b1b3a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1b1b3a 75%), linear-gradient(-45deg, transparent 75%, #1b1b3a 75%)",
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
      }}
    />
  )
}

function SparkleDeco({ className, delay }: { className?: string; delay?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      style={delay ? { animationDelay: delay } : undefined}
    >
      <path d="M12 0l2.5 9.5L24 12l-9.5 2.5L12 24l-2.5-9.5L0 12l9.5-2.5z" />
    </svg>
  )
}

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

export default function SaasShowcase() {
  const [copied, setCopied] = useState(false)
  const cloneCommand = `git clone https://github.com/MuhamadZafarSyah/y2k-ui-saas-template.git
cd y2k-ui-saas-template
npm install
npm run dev`

  const handleCopy = () => {
    navigator.clipboard.writeText(cloneCommand)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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

  return (
    <div className="relative overflow-hidden min-h-screen pb-20" style={{ background: "var(--y2k-panel)" }}>
      <CheckerPattern />

      {/* Floating sparkles */}
      <div className="absolute top-[8%] left-[5%] animate-[twinkle_2s_ease-in-out_infinite] opacity-60">
        <SparkleDeco className="size-4 text-y2k-pink" />
      </div>
      <div className="absolute top-[12%] right-[8%] animate-[twinkle_2s_ease-in-out_infinite] opacity-50">
        <SparkleDeco className="size-3 text-y2k-lemon" delay="0.8s" />
      </div>
      <div className="absolute top-[60%] left-[3%] animate-[twinkle_2s_ease-in-out_infinite] opacity-40">
        <SparkleDeco className="size-3.5 text-y2k-blue" delay="1.5s" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 py-6 sm:py-10">
        {/* Back Link */}
        <Link
          href="/templates"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-y2k-ink/60 hover:text-y2k-ink mb-6 group transition-colors"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Templates</span>
        </Link>

        {/* ═══════ HERO WINDOW ═══════ */}
        <div className="rounded-lg border-[3px] border-y2k-ink bg-white overflow-hidden mb-8">
          {/* Title Bar */}
          <div className="flex items-center justify-between border-b-[3px] border-y2k-ink px-4 py-2.5" style={{ background: "var(--y2k-pink)" }}>
            <div className="flex items-center gap-2.5">
              <span className="y2k-title-dots" aria-hidden>
                <span className="rounded-full size-2.5 bg-y2k-ink" />
                <span className="rounded-full size-2.5 bg-y2k-ink" />
                <span className="rounded-full size-2.5 bg-y2k-ink" />
              </span>
              <span className="font-mono text-xs font-black text-y2k-ink uppercase tracking-wider">
                template-saas-showcase.exe
              </span>
            </div>
            <WindowControls hideClose hideMaximize />
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8">
            {/* Hero header */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <Badge variant="mint" size="sm" className="font-black uppercase text-[9px] tracking-wide">
                    LIVE PREVIEW
                  </Badge>
                  <Badge variant="lemon" size="sm" className="font-black uppercase text-[9px] tracking-wide">
                    FREE TEMPLATE
                  </Badge>
                  <span className="inline-flex items-center gap-1 rounded border-2 border-y2k-ink bg-y2k-blue px-1.5 py-px text-[9px] font-black text-y2k-ink">
                    <Star className="size-2.5" fill="currentColor" />
                    NEW
                  </span>
                </div>

                <h1 className="font-black text-3xl tracking-tight text-y2k-ink sm:text-4xl lg:text-5xl leading-[1.1]">
                  SaaS Landing Page
                  <span className="block relative">
                    <span className="relative z-10" style={{ color: "var(--y2k-pink)" }}>
                      Y2K Style
                    </span>
                    <span className="absolute inset-x-0 bottom-0.5 h-[5px] rounded-sm bg-y2k-lemon -z-0" />
                  </span>
                </h1>

                <p className="mt-3 text-sm text-y2k-ink/60 leading-relaxed max-w-lg">
                  A high-converting SaaS landing page template built using the Y2K Design System.
                  Features retro-themed components like a bento bento features grid, active pricing tiers,
                  interactive accordion FAQs, and is fully layered with rich GSAP + ScrollTrigger reveals.
                </p>
              </div>

              {/* CTA stack */}
              <div className="flex flex-row lg:flex-col gap-2.5 shrink-0 w-full sm:w-auto">
                <a
                  href="http://saas-template.y2k-ui.web.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button variant="lemon" size="sm" className="w-full h-9 text-xs font-bold border-[2.5px] border-y2k-ink">
                    <ExternalLink className="size-3.5" />
                    Live Preview
                  </Button>
                </a>
                <a
                  href="https://github.com/MuhamadZafarSyah/y2k-ui-saas-template"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button variant="outline" size="sm" className="w-full h-9 text-xs font-bold border-[2.5px] border-y2k-ink">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-3.5">
                      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.1c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.07.78 2.16v3.2c0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
                    </svg>
                    View on GitHub
                  </Button>
                </a>
              </div>
            </div>

            {/* Screenshot Window */}
            <div className="relative rounded border-[3px] border-y2k-ink bg-y2k-panel overflow-hidden aspect-video mb-10">
              <Image
                src="/assets/images/templates/saas-landing.png"
                alt="Y2K SaaS Landing Page Template Screenshot"
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 1080px) 100vw, 1080px"
              />
              {/* Screenshot overlay decoration */}
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded border-2 border-y2k-ink bg-white/90 px-2.5 py-1">
                <span className="size-2 rounded-full bg-y2k-mint border border-y2k-ink" />
                <span className="font-mono text-[9px] font-black text-y2k-ink uppercase">
                  screenshot.png
                </span>
              </div>
            </div>

            {/* ═══════ FEATURE WINDOWS ═══════ */}
            <div className="grid gap-4 sm:grid-cols-2 mb-10">
              {features.map((feat) => (
                <div
                  key={feat.title}
                  className="group rounded border-2 border-y2k-ink bg-white overflow-hidden transition-all duration-150 hover:-translate-y-0.5"
                >
                  <div
                    className="flex items-center gap-1.5 px-3 py-1.5 border-b-2 border-y2k-ink"
                    style={{ background: feat.color }}
                  >
                    <span className="font-mono text-[9px] font-black text-y2k-ink/60 uppercase tracking-wider">
                      {feat.title.toLowerCase().replace(/\s+/g, "-")}.feature
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <span
                        className="flex size-8 shrink-0 items-center justify-center rounded border-2 border-y2k-ink text-y2k-ink"
                        style={{ background: feat.color }}
                      >
                        {feat.icon}
                      </span>
                      <div>
                        <h3 className="font-black text-sm text-y2k-ink tracking-tight">
                          {feat.title}
                        </h3>
                        <p className="mt-1 text-xs text-y2k-ink/55 leading-relaxed">
                          {feat.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ═══════ GETTING STARTED + TECH SPECS ═══════ */}
            <div className="grid gap-8 md:grid-cols-2">
              {/* Getting Started */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Terminal className="size-4 text-y2k-lemon" strokeWidth={3} />
                  <h2 className="font-black text-lg text-y2k-ink">Getting Started</h2>
                </div>
                <p className="text-xs text-y2k-ink/55 mb-4 leading-relaxed">
                  Clone the repository and spin up a local development environment in seconds.
                </p>

                {/* Terminal-styled code block */}
                <div className="relative rounded border-2 border-y2k-ink bg-y2k-ink text-y2k-mint overflow-hidden mb-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 border-b border-white/10 bg-white/5">
                    <span className="size-2 rounded-full bg-y2k-pink" />
                    <span className="size-2 rounded-full bg-y2k-lemon" />
                    <span className="size-2 rounded-full bg-y2k-mint" />
                    <span className="ml-2 font-mono text-[9px] font-bold text-white/40 uppercase tracking-wider">
                      terminal — bash
                    </span>
                  </div>
                  <div className="p-4 font-mono text-[11px] leading-relaxed overflow-x-auto">
                    <pre className="pr-12">{cloneCommand}</pre>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="absolute top-7 right-3 flex size-7 items-center justify-center rounded border border-white/15 bg-white/5 text-white/60 hover:bg-white/15 hover:text-y2k-mint active:scale-95 transition-all"
                    aria-label="Copy code block"
                  >
                    {copied ? <Check className="size-3.5 text-y2k-mint" /> : <Copy className="size-3.5" />}
                  </button>
                </div>

                <div className="flex items-start gap-2 rounded border-2 border-y2k-ink bg-y2k-lemon/20 px-3 py-2.5">
                  <Smile className="size-3.5 text-y2k-ink/60 mt-0.5 shrink-0" />
                  <p className="text-[11px] text-y2k-ink/70 leading-normal font-medium">
                    <strong className="text-y2k-ink">Pro tip:</strong> Click{" "}
                    <strong className="text-y2k-ink">&quot;Use this template&quot;</strong> on GitHub to
                    create your own copy instantly.
                  </p>
                </div>
              </div>

              {/* Tech Specs */}
              <div className="space-y-5">
                {/* Y2K Components */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Box className="size-4 text-y2k-pink" strokeWidth={3} />
                    <h2 className="font-black text-sm text-y2k-ink uppercase tracking-wide">
                      Components Used
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {componentsUsed.map((comp) => (
                      <span
                        key={comp}
                        className="inline-flex items-center rounded border-2 border-y2k-ink bg-white px-2 py-1 text-[10px] font-bold text-y2k-ink hover:bg-y2k-blue/30 transition-colors cursor-default"
                      >
                        <Code2 className="size-2.5 mr-1 text-y2k-ink/40" />
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu className="size-4 text-y2k-blue" strokeWidth={3} />
                    <h2 className="font-black text-sm text-y2k-ink uppercase tracking-wide">
                      Tech Stack
                    </h2>
                  </div>
                  <div className="rounded border-2 border-y2k-ink overflow-hidden">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-y2k-panel border-b-2 border-y2k-ink font-black text-y2k-ink">
                          <th className="p-2 border-r-2 border-y2k-ink">Tech</th>
                          <th className="p-2 border-r-2 border-y2k-ink">Version</th>
                          <th className="p-2">Role</th>
                        </tr>
                      </thead>
                      <tbody>
                        {techStack.map((tech, i) => (
                          <tr
                            key={tech.name}
                            className={i !== techStack.length - 1 ? "border-b border-y2k-ink" : ""}
                          >
                            <td className="p-2 border-r-2 border-y2k-ink font-bold text-y2k-ink">
                              {tech.name}
                            </td>
                            <td className="p-2 border-r-2 border-y2k-ink font-mono text-[11px] text-y2k-ink/70">
                              {tech.version}
                            </td>
                            <td className="p-2 text-y2k-ink/55">{tech.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Dependencies */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Layers className="size-4 text-y2k-mint" strokeWidth={3} />
                    <h2 className="font-black text-sm text-y2k-ink uppercase tracking-wide">
                      Key Dependencies
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {dependencies.map((dep) => (
                      <div
                        key={dep.name}
                        className="flex items-center justify-between px-2.5 py-2 rounded border-2 border-y2k-ink bg-white hover:bg-y2k-blue/10 transition-colors cursor-default"
                      >
                        <span className="font-bold text-[11px] text-y2k-ink">{dep.name}</span>
                        <span className="font-mono text-[10px] text-y2k-ink/45">{dep.version}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════ BOTTOM CTA WINDOW ═══════ */}
        <div className="text-center">
          <Link href="/templates">
            <Button variant="lemon" size="lg" className="text-sm font-black border-[2.5px] border-y2k-ink">
              <Sparkles className="size-4" />
              Browse More Templates
            </Button>
          </Link>
          <p className="mt-3 text-[11px] font-mono text-y2k-ink/30 font-bold">
            more templates coming soon. nya~ (◕‿◕)
          </p>
        </div>
      </div>
    </div>
  )
}
