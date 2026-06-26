"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { WindowControls } from "@/components/ui/window-controls"
import { Badge } from "@/components/ui/badge"
import { Monitor, Layout, Sparkles, ArrowRight, Star, Zap, Terminal, Download, Smile, Cpu } from "lucide-react"

type TemplateCard = {
  title: string
  description: string
  icon: React.ReactNode
  href?: string
  status: "live" | "coming-soon"
  tag?: string
  accentColor: string
  titleBarColor: string
}

const templates: TemplateCard[] = [
  {
    title: "Personal Portfolio Y2K",
    description:
      "A retro desktop-OS styled personal portfolio template. Built using y2k-ui-lib, GSAP scroll animations, and pre-packaged with an AI hallmark design context.",
    icon: <Monitor className="size-5" />,
    href: "/templates/portfolio",
    status: "live",
    tag: "POPULAR",
    accentColor: "var(--y2k-blue)",
    titleBarColor: "#8ed1fc",
  },
  {
    title: "SaaS Landing Page",
    description:
      "A high-converting SaaS landing page with retro-future accents, interactive pricing grid, and retro product mockups.",
    icon: <Layout className="size-5" />,
    href: "/templates/saas-landing",
    status: "live",
    tag: "NEW",
    accentColor: "var(--y2k-pink)",
    titleBarColor: "#ff8fcf",
  },
  {
    title: "Link-in-bio Console",
    description:
      "A retro handheld-console style link aggregator for creators. Lightweight, ultra-fast, and customisable.",
    icon: <Sparkles className="size-5" />,
    status: "coming-soon",
    accentColor: "var(--y2k-mint)",
    titleBarColor: "#8ff0d0",
  },
]

const statusConfig = {
  live: { label: "Live Preview", variant: "mint" as const },
  "coming-soon": { label: "Coming Soon", variant: "pink" as const },
}

function SparkleDeco({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={cn("animate-[twinkle_2s_ease-in-out_infinite]", className)}
    >
      <path d="M12 0l2.5 9.5L24 12l-9.5 2.5L12 24l-2.5-9.5L0 12l9.5-2.5z" />
    </svg>
  )
}

function CheckerPattern() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage:
          "linear-gradient(45deg, #1b1b3a 25%, transparent 25%), linear-gradient(-45deg, #1b1b3a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1b1b3a 75%), linear-gradient(-45deg, transparent 75%, #1b1b3a 75%)",
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
      }}
    />
  )
}

export default function TemplatesHub() {
  const liveTemplates = templates.filter((t) => t.status === "live")
  const comingSoon = templates.filter((t) => t.status === "coming-soon")

  return (
    <div className="relative overflow-hidden min-h-screen" style={{ background: "var(--y2k-panel)" }}>
      <CheckerPattern />

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:py-16">
        {/* ═══════ HERO ═══════ */}
        <section className="relative mb-14 sm:mb-20 text-center">
          {/* Floating sparkles */}
          <SparkleDeco className="absolute -top-2 left-[15%] size-4 text-y2k-lemon opacity-80" />
          <SparkleDeco className="absolute top-4 right-[12%] size-3 text-y2k-pink opacity-70 [animation-delay:0.7s]" />
          <SparkleDeco className="absolute bottom-0 left-[25%] size-3.5 text-y2k-blue opacity-60 [animation-delay:1.4s]" />

          <div className="inline-flex items-center gap-2 mb-4 rounded border-2 border-y2k-ink bg-white px-3 py-1">
            <Zap className="size-3.5 text-y2k-lemon" fill="currentColor" />
            <span className="font-mono text-[10px] font-black text-y2k-ink uppercase tracking-widest">
              Ready-to-deploy templates
            </span>
          </div>

          <h1 className="font-black text-4xl tracking-tight text-y2k-ink sm:text-5xl lg:text-6xl leading-[1.1]">
            templates/
            <span className="relative inline-block">
              <span className="relative z-10 px-1" style={{ color: "var(--y2k-pink)" }}>
                gallery
              </span>
              <span className="absolute inset-x-0 bottom-0.5 h-[6px] rounded-sm bg-y2k-lemon -z-0" />
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-sm sm:text-base text-y2k-ink/65 leading-relaxed font-medium">
            Pre-built, production-ready websites styled with our Y2K Design System.
            <br className="hidden sm:block" />
            Pick one, clone it, and ship in minutes.
          </p>
        </section>

        {/* ═══════ LIVE TEMPLATES ═══════ */}
        <section className="mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-5">
            <Star className="size-4 text-y2k-lemon" fill="currentColor" />
            <h2 className="font-black text-xs text-y2k-ink uppercase tracking-[0.2em]">
              Available Templates
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {liveTemplates.map((tpl) => (
              <Link
                key={tpl.title}
                href={tpl.href ?? "#"}
                className="group block"
                tabIndex={0}
              >
                <div className="relative h-full rounded-lg border-[3px] border-y2k-ink bg-white transition-all duration-200 hover:-translate-y-0.5 flex flex-col overflow-hidden">
                  {/* Title bar */}
                  <div
                    className="flex items-center justify-between border-b-[3px] border-y2k-ink px-4 py-2.5"
                    style={{ background: tpl.accentColor }}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="y2k-title-dots" aria-hidden>
                        <span className="rounded-full size-2.5 bg-y2k-ink" />
                        <span className="rounded-full size-2.5 bg-y2k-ink" />
                        <span className="rounded-full size-2.5 bg-y2k-ink" />
                      </span>
                      <span className="font-mono text-[11px] font-black text-y2k-ink uppercase tracking-wider">
                        {tpl.title.toLowerCase().replace(/\s+/g, "-")}.app
                      </span>
                    </div>
                    <WindowControls hideClose hideMaximize />
                  </div>

                  {/* Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap mb-3">
                        <span
                          className="inline-flex size-10 shrink-0 items-center justify-center rounded border-[2.5px] border-y2k-ink text-y2k-ink"
                          style={{ background: tpl.accentColor }}
                        >
                          {tpl.icon}
                        </span>
                        <div>
                          <h3 className="font-black text-lg text-y2k-ink tracking-tight leading-tight">
                            {tpl.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="mint" size="sm" className="font-black uppercase text-[10px] tracking-wide">
                              Live Preview
                            </Badge>
                            {tpl.tag && (
                              <span className="inline-flex rounded border-2 border-y2k-ink bg-y2k-pink px-1.5 py-px text-[9px] font-black text-y2k-ink">
                                {tpl.tag}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-y2k-ink/65 leading-relaxed">
                        {tpl.description}
                      </p>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-1.5 rounded border-2 border-y2k-ink px-3 py-1.5 text-xs font-bold text-y2k-ink bg-y2k-lemon group-hover:bg-y2k-pink transition-colors">
                        <Download className="size-3.5" />
                        Explore Template
                        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                      <span className="text-[10px] font-mono text-y2k-ink/40">
                        {tpl.title.includes("Portfolio") ? "npx y2kui add portfolio" : "npx y2kui add saas-landing"}
                      </span>
                    </div>
                  </div>

                  {/* Corner sparkle accent */}
                  {tpl.tag === "POPULAR" && (
                    <div className="absolute -top-2.5 -right-2.5 size-6 rounded border-2 border-y2k-ink bg-y2k-lemon flex items-center justify-center rotate-12">
                      <Star className="size-3 text-y2k-ink" fill="currentColor" />
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ═══════ COMING SOON ═══════ */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <Cpu className="size-4 text-y2k-lilac" />
            <h2 className="font-black text-xs text-y2k-ink uppercase tracking-[0.2em]">
              In Development
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {comingSoon.map((tpl) => (
              <div
                key={tpl.title}
                className="group relative rounded-lg border-2 border-y2k-ink bg-white overflow-hidden cursor-default"
              >
                {/* Title bar */}
                <div
                  className="flex items-center gap-2 px-3 py-1.5 border-b-2 border-y2k-ink"
                  style={{ background: tpl.titleBarColor }}
                >
                  <span className="y2k-title-dots" aria-hidden>
                    <span className="rounded-full size-2 bg-[#1b1b3a]" />
                    <span className="rounded-full size-2 bg-[#1b1b3a]" />
                    <span className="rounded-full size-2 bg-[#1b1b3a]" />
                  </span>
                  <span className="font-mono text-[10px] font-black text-y2k-ink uppercase tracking-wider">
                    {tpl.title.toLowerCase().replace(/\s+/g, "-")}.tpl
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <span
                      className="flex size-9 shrink-0 items-center justify-center rounded border-2 border-y2k-ink text-y2k-ink"
                      style={{ background: tpl.accentColor }}
                    >
                      {tpl.icon}
                    </span>
                    <div>
                      <h3 className="font-black text-sm text-y2k-ink tracking-tight">
                        {tpl.title}
                      </h3>
                      <p className="mt-1.5 text-xs text-y2k-ink/55 leading-relaxed">
                        {tpl.description}
                      </p>
                    </div>
                  </div>

                  {/* Construction bar */}
                  <div className="mt-4 pt-3 border-t-2 border-dashed border-y2k-ink/10">
                    <Badge variant="pink" size="sm" className="font-black uppercase text-[10px] tracking-wide">
                      Coming Soon
                    </Badge>
                    <div className="mt-2.5 h-1.5 w-full rounded-full border-[1.5px] border-y2k-ink bg-y2k-panel overflow-hidden">
                      <div
                        className="h-full rounded-full animate-pulse"
                        style={{ width: "35%", background: `linear-gradient(90deg, ${tpl.titleBarColor}, color-mix(in oklch, ${tpl.titleBarColor} 60%, white))` }}
                      />
                    </div>
                    <p className="mt-1.5 font-mono text-[9px] text-y2k-ink/30 font-bold">
                      building... 35%
                    </p>
                  </div>
                </div>

                {/* Decorative lock */}
                <div className="absolute top-2 right-2.5">
                  <div className="flex items-center gap-1 rounded border border-y2k-ink/15 bg-white/80 px-1.5 py-0.5">
                    <span className="size-1.5 rounded-full bg-y2k-pink" />
                    <span className="font-mono text-[8px] text-y2k-ink/30 font-bold">WIP</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════ FOOTER CTA ═══════ */}
        <section className="mt-16 sm:mt-20 text-center">
          <div className="inline-flex flex-col items-center gap-4 rounded-lg border-[3px] border-y2k-ink bg-white px-8 py-6">
            <Smile className="size-6 text-y2k-lemon" />
            <p className="font-black text-sm text-y2k-ink">
              Got a template idea?
            </p>
            <p className="text-xs text-y2k-ink/55 max-w-xs">
              We&apos;re building more templates. Suggest one on GitHub and we might ship it next.
            </p>
            <a
              href="https://github.com/MuhamadZafarSyah/y2k-ui/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded border-2 border-y2k-ink bg-y2k-lemon px-4 py-1.5 text-xs font-bold text-y2k-ink hover:bg-y2k-pink transition-colors"
            >
              <Terminal className="size-3.5" />
              Request a Template
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
