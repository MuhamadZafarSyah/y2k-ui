"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Copy, Check, ArrowUpRight, Sparkles, Palette, Package, Terminal, Layers, Disc3, Star, MousePointer2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { StructuredData } from "@/components/structured-data"
import { SectionReveal } from "@/components/animations/section-reveal"
import { TextReveal } from "@/components/animations/text-reveal"
import { HighlightReveal } from "@/components/animations/highlight-reveal"
import { useScrollReveal, useStaggerReveal } from "@/components/animations/use-gsap-reveal"

/* ─── Navigation ─── */

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-y2k-ink bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-black tracking-tight text-y2k-ink">
          <span className="flex size-5 items-center justify-center rounded border-2 border-y2k-ink bg-y2k-lemon text-[10px] font-bold">
            Y
          </span>
          <span className="text-sm">Y2K UI</span>
        </Link>
        <nav className="flex items-center gap-3">
          <Link href="/docs" className="text-xs font-semibold text-y2k-ink/70 hover:text-y2k-ink transition-colors">
            Docs
          </Link>
          <a
            href="https://github.com/MuhamadZafarSyah/y2k-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-y2k-ink/70 hover:text-y2k-ink transition-colors"
          >
            GitHub
          </a>
          <Link href="/docs/installation">
            <Button size="sm" variant="lemon">
              <Terminal className="size-3.5" />
              Install
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}

/* ─── Hero ─── */

function Hero() {
  const badgeRef = useScrollReveal({ y: 20, delay: 0.1 })
  const headingRef = useScrollReveal({ y: 30, delay: 0.2 })
  const subtitleRef = useScrollReveal({ y: 20, delay: 0.4 })
  const ctaRef = useScrollReveal({ y: 20, delay: 0.5 })
  const codeRef = useScrollReveal({ y: 15, delay: 0.6 })

  return (
    <section className="relative overflow-hidden border-b-2 border-y2k-ink">
      {/* Decorative stripes */}
      <div className="absolute inset-0 flex pointer-events-none">
        <div className="h-full w-1/5 bg-y2k-blue/10" />
        <div className="h-full w-1/5 bg-y2k-pink/10" />
        <div className="h-full w-1/5 bg-y2k-lilac/10" />
        <div className="h-full w-1/5 bg-y2k-mint/10" />
        <div className="h-full w-1/5 bg-y2k-lemon/10" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow badge */}
          <div ref={badgeRef} className="mb-6 flex justify-center" style={{ visibility: "hidden" }}>
            <Badge variant="blue" size="sm" className="gap-1.5">
              <Sparkles className="size-3" />
              v0.1 — 30+ components
            </Badge>
          </div>

          <h1 ref={headingRef} className="text-4xl font-black tracking-tight text-y2k-ink md:text-6xl leading-[1.1]" style={{ visibility: "hidden" }}>
            Build{" "}
            <HighlightReveal delay={0.8} duration={0.7}>
              <span className="px-2  border-y-2 border-y2k-ink">Retro-Future</span>
            </HighlightReveal>{" "}
            Interfaces
          </h1>

          <p ref={subtitleRef} className="mt-4 text-lg text-y2k-ink/70 md:text-xl max-w-2xl mx-auto leading-relaxed" style={{ visibility: "hidden" }}>
            Modern Y2K / kawaii-retro components built on{" "}
            <span className="font-semibold text-y2k-ink">shadcn</span> +{" "}
            <span className="font-semibold text-y2k-ink">Radix UI</span>.
            <br />
            Flat windows, thick navy outlines, pastel fills — zero nostalgia, all personality.
          </p>

          <div ref={ctaRef} className="mt-8 flex flex-wrap items-center justify-center gap-3" style={{ visibility: "hidden" }}>
            <Link href="/docs/installation">
              <Button size="lg" variant="lemon">
                <Terminal className="size-4" />
                Get Started
                <ArrowUpRight className="size-3.5" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button size="lg" variant="outline">
                Browse Components
              </Button>
            </Link>
          </div>

          {/* Floating Y2K window decoration */}
          <div ref={codeRef} className="mt-10 inline-flex items-center gap-2 rounded border-2 border-y2k-ink bg-white px-4 py-2" style={{ visibility: "hidden" }}>

            <code className="font-mono text-[10px] font-black uppercase tracking-wider text-y2k-ink">
              npx y2kui@latest init &nbsp;—&nbsp; ready in seconds
            </code>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Showcase Preview Wrapper ─── */

function PreviewCard({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded border-2 border-y2k-ink bg-white">
      <div className={`flex items-center gap-2 border-b-2 border-y2k-ink ${accent} px-3 py-1.5`}>
        <span className="flex items-center gap-1" aria-hidden>
          <span className="size-2 rounded-[2px] border-[1.5px] border-y2k-ink bg-white" />
          <span className="size-2 rounded-[2px] border-[1.5px] border-y2k-ink bg-white" />
          <span className="size-2 rounded-[2px] border-[1.5px] border-y2k-ink bg-white" />
        </span>
        <span className="font-mono text-[10px] font-black uppercase tracking-tight text-y2k-ink">
          {title}
        </span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}

/* ─── Showcase Section ─── */

function Showcase() {
  const headingRef = useScrollReveal({ y: 30, delay: 0.1 })
  const row1Ref = useStaggerReveal({ y: 25, stagger: 0.12 })
  const row2Ref = useStaggerReveal({ y: 25, stagger: 0.12, delay: 0.1 })
  const row3Ref = useStaggerReveal({ y: 25, stagger: 0.12, delay: 0.2 })
  const ctaRef = useScrollReveal({ y: 20, delay: 0.3 })

  return (
    <section className="relative overflow-hidden border-b-2 border-y2k-ink bg-y2k-panel/20 py-16 md:py-24">
      {/* Decorative SVG background - floating Y2K art */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float absolute -right-20 -top-20 opacity-15 md:opacity-20">
          <img
            src="/assets/images/7.svg"
            alt=""
            className="h-60 w-60 object-contain md:h-80 md:w-80"
            aria-hidden
          />
        </div>
        <div className="animate-glow-pulse absolute -bottom-16 -left-16 opacity-10 md:opacity-15" style={{ animationDelay: '2s' }}>
          <img
            src="/assets/images/1.svg"
            alt=""
            className="h-48 w-48 object-contain md:h-64 md:w-64"
            aria-hidden
          />
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-4">
        <div ref={headingRef} className="mb-10 text-center" style={{ visibility: "hidden" }}>
          <div className="mb-3 flex items-center justify-center gap-2">
            <Star className="size-4 fill-y2k-lemon text-y2k-lemon animate-wiggle" />
            <h2 className="text-2xl font-black tracking-tight text-y2k-ink md:text-3xl">
              Component Showcase
            </h2>
            <Star className="size-4 fill-y2k-lemon text-y2k-lemon animate-wiggle" style={{ animationDelay: '0.5s' }} />
          </div>
          <p className="mt-1.5 text-sm text-y2k-ink/60">
            Live previews — every component is fully interactive.
          </p>
        </div>

        {/* Row 1 — Core UI */}
        <div ref={row1Ref} className="mb-8" style={{ visibility: "hidden" }}>
          <div className="mb-4 inline-flex items-center gap-2 border-2 border-y2k-ink bg-y2k-blue px-3 py-1">
            <MousePointer2 className="size-3.5" />
            <span className="font-mono text-[11px] font-black uppercase tracking-wider text-y2k-ink">
              Core UI
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <PreviewCard title="buttons.ui" accent="bg-y2k-lemon">
              <div className="flex flex-wrap gap-2">
                <Button variant="default" size="sm">Default</Button>
                <Button variant="pink" size="sm">Pink</Button>
                <Button variant="blue" size="sm">Blue</Button>
                <Button variant="mint" size="sm">Mint</Button>
                <Button variant="lilac" size="sm">Lilac</Button>
                <Button variant="destructive" size="sm">Destructive</Button>
                <Button variant="outline" size="sm">Outline</Button>
                <Button variant="secondary" size="sm">Secondary</Button>
              </div>
            </PreviewCard>

            <PreviewCard title="badges.sys" accent="bg-y2k-blue">
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="blue">Blue</Badge>
                <Badge variant="pink">Pink</Badge>
                <Badge variant="lilac">Lilac</Badge>
                <Badge variant="mint">Mint</Badge>
                <Badge variant="lemon">Lemon</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </PreviewCard>

            <PreviewCard title="controls.app" accent="bg-y2k-mint">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-y2k-ink">Airplane Mode</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-y2k-ink">Dark Mode</span>
                  <Switch />
                </div>
                <Progress value={72} label="Storage" showValue className="w-full" />
                <Progress value={45} label="Bandwidth" showValue indicatorClassName="bg-y2k-pink" />
              </div>
            </PreviewCard>
          </div>
        </div>

        {/* Row 2 — Input & Navigation */}
        <div ref={row2Ref} className="mb-8" style={{ visibility: "hidden" }}>
          <div className="mb-4 inline-flex items-center gap-2 border-2 border-y2k-ink bg-y2k-pink px-3 py-1">
            <MousePointer2 className="size-3.5" />
            <span className="font-mono text-[11px] font-black uppercase tracking-wider text-y2k-ink">
              Input &amp; Navigation
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <PreviewCard title="input.exe" accent="bg-y2k-lilac">
              <div className="space-y-3">
                <Input placeholder="Type something..." />
                <Input
                  leadingIcon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
                      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                    </svg>
                  }
                  placeholder="Search..."
                />
                <Input
                  trailingIcon={
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" x2="3" y1="12" y2="12" />
                    </svg>
                  }
                  placeholder="y2k@retro.dev"
                />
              </div>
            </PreviewCard>

            <PreviewCard title="tabs.ui" accent="bg-y2k-pink">
              <Tabs defaultValue="code" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="code" className="flex-1">Code</TabsTrigger>
                  <TabsTrigger value="preview" className="flex-1">Preview</TabsTrigger>
                  <TabsTrigger value="log" className="flex-1">Log</TabsTrigger>
                </TabsList>
                <div className="mt-2 rounded border-2 border-y2k-ink bg-white p-2">
                  <TabsContent value="code" className="m-0 text-xs font-mono text-y2k-ink/80">
                    {`npm install y2k-ui`}
                  </TabsContent>
                  <TabsContent value="preview" className="m-0 flex gap-2">
                    <Badge variant="lemon" size="sm">Active</Badge>
                    <Badge variant="blue" size="sm">Ready</Badge>
                  </TabsContent>
                  <TabsContent value="log" className="m-0 text-xs font-mono text-y2k-ink/60">
                    {`> Build completed in 2.4s`}
                  </TabsContent>
                </div>
              </Tabs>
            </PreviewCard>

            <PreviewCard title="menubar.app" accent="bg-y2k-blue">
              <div className="space-y-3">
                <Menubar>
                  <MenubarMenu>
                    <MenubarTrigger>File</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>New <MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
                      <MenubarItem>Open <MenubarShortcut>⌘O</MenubarShortcut></MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem>Save <MenubarShortcut>⌘S</MenubarShortcut></MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                  <MenubarMenu>
                    <MenubarTrigger>Edit</MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem>Undo <MenubarShortcut>⌘Z</MenubarShortcut></MenubarItem>
                      <MenubarItem>Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut></MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
                <p className="text-xs text-y2k-ink/60">Horizontal menu with dropdowns</p>
              </div>
            </PreviewCard>
          </div>
        </div>

        {/* Row 3 — Widgets & Utilities */}
        <div ref={row3Ref}>
          <div className="mb-4 inline-flex items-center gap-2 border-2 border-y2k-ink bg-y2k-mint px-3 py-1">
            <MousePointer2 className="size-3.5" />
            <span className="font-mono text-[11px] font-black uppercase tracking-wider text-y2k-ink">
              Widgets &amp; Utilities
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <PreviewCard title="widgets.exe" accent="bg-y2k-lemon">
              <div className="space-y-3">
                <Alert>
                  <AlertTitle>Update available</AlertTitle>
                  <AlertDescription>Y2K UI v0.3 is ready to install.</AlertDescription>
                </Alert>
                <Alert variant="pink">
                  <AlertTitle>Connection lost</AlertTitle>
                  <AlertDescription>Check your network and try again.</AlertDescription>
                </Alert>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-y2k-ink">Team:</span>
                  <Avatar>
                    <AvatarFallback>YZ</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback className="bg-y2k-mint">AK</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback className="bg-y2k-pink">ML</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </PreviewCard>

            <PreviewCard title="sheet.ui" accent="bg-y2k-lilac">
              <div className="space-y-3">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="blue" size="sm">Open Settings Panel</Button>
                  </SheetTrigger>
                  <SheetContent side="right" title="settings.sys">
                    <SheetHeader>
                      <SheetTitle>Preferences</SheetTitle>
                      <SheetDescription>Adjust your Y2K interface settings.</SheetDescription>
                    </SheetHeader>
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center justify-between rounded border-2 border-y2k-ink px-3 py-2 text-xs font-semibold">
                        <span>Sound Effects</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between rounded border-2 border-y2k-ink px-3 py-2 text-xs font-semibold">
                        <span>Retro Cursor</span>
                        <Switch />
                      </div>
                      <Progress value={68} label="Theme Sync" showValue />
                    </div>
                  </SheetContent>
                </Sheet>
                <p className="text-xs text-y2k-ink/60">Slide-in panel with Y2K window chrome</p>
              </div>
            </PreviewCard>

            <PreviewCard title="misc-controls" accent="bg-y2k-pink">
              <div className="space-y-4">
                <div>
                  <p className="mb-2 text-xs font-semibold text-y2k-ink">Toggle Group</p>
                  <ToggleGroup type="single" defaultValue="bold">
                    <ToggleGroupItem value="bold" size="sm">B</ToggleGroupItem>
                    <ToggleGroupItem value="italic" size="sm"><span className="italic">I</span></ToggleGroupItem>
                    <ToggleGroupItem value="underline" size="sm"><span className="underline">U</span></ToggleGroupItem>
                    <ToggleGroupItem value="strike" size="sm"><span className="line-through">S</span></ToggleGroupItem>
                  </ToggleGroup>
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold text-y2k-ink">Collapsible</p>
                  <Collapsible>
                    <CollapsibleTrigger>Show Details</CollapsibleTrigger>
                    <CollapsibleContent>
                      <p className="text-xs text-y2k-ink/70">
                        Y2K UI is a collection of retro-future components built on Radix primitives.
                      </p>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </div>
            </PreviewCard>
          </div>
        </div>

        <div ref={ctaRef} className="mt-10 text-center" style={{ visibility: "hidden" }}>
          <Link href="/docs">
            <Button variant="outline">
              <Layers className="size-4" />
              View All 30+ Components
              <ArrowUpRight className="size-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ─── SVG Sprinkles ─── */
/* Decorative Y2K shapes that float around the Features section */

function SparkleSprinkle({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className={`size-4 text-y2k-lemon ${className ?? ""}`}
      style={style}
      aria-hidden
    >
      <path d="M10 0l1.5 6.5L18 8l-6.5 1.5L10 16l-1.5-6.5L2 8l6.5-1.5L10 0z" />
    </svg>
  )
}

/* ─── Features Section ─── */

function Features() {
  const features = [
    {
      icon: Palette,
      title: "Y2K Design System",
      desc: "Thick navy outlines, pastel fills, flat windows. Consistent tokens across every component.",
      color: "bg-y2k-blue",
    },
    {
      icon: Package,
      title: "shadcn Compatible",
      desc: "Built on shadcn primitives. Drop-in replacement — use the same CLI workflow you already know.",
      color: "bg-y2k-mint",
    },
    {
      icon: Layers,
      title: "Radix-Powered",
      desc: "Accessible, headless Radix UI under the hood. Keyboard nav, ARIA, focus management.",
      color: "bg-y2k-lilac",
    },
    {
      icon: Terminal,
      title: "CLI Install",
      desc: "npx y2kui@latest add &lt;component&gt;. Zero config, tree-shakeable, works with any Next.js app.",
      color: "bg-y2k-pink",
    },
  ]

  const headingRef = useScrollReveal({ y: 30, delay: 0.1 })
  const vinylRef = useScrollReveal({ y: 40, delay: 0.2 })
  const cardsRef = useStaggerReveal({ y: 30, stagger: 0.15 })

  return (
    <section className="relative overflow-hidden border-b-2 border-y2k-ink bg-white py-16 md:py-24">
      {/* Decorative background sparkles */}
      <SparkleSprinkle className="absolute left-[15%] top-12 size-5 animate-wiggle text-y2k-lemon" />
      <SparkleSprinkle className="absolute right-[20%] top-20 size-4 animate-wiggle text-y2k-pink" style={{ animationDelay: '1s' }} />
      <SparkleSprinkle className="absolute bottom-20 left-[10%] size-3.5 animate-wiggle text-y2k-blue" style={{ animationDelay: '0.5s' }} />
      <SparkleSprinkle className="absolute bottom-16 right-[12%] size-5 animate-wiggle text-y2k-mint" style={{ animationDelay: '1.5s' }} />

      <div className="mx-auto max-w-6xl px-4">
        <div ref={headingRef} className="mb-12 text-center" style={{ visibility: "hidden" }}>
          <h2 className="text-2xl font-black tracking-tight text-y2k-ink md:text-3xl">
            Everything You Need
          </h2>
          <p className="mt-1.5 text-sm text-y2k-ink/60">
            Production-ready components that don&apos;t compromise on personality.
          </p>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-5">
          {/* Left — Rotating Vinyl Record in Y2K window */}
          <div ref={vinylRef} className="lg:col-span-2" style={{ visibility: "hidden" }}>
            <div className="overflow-hidden rounded border-2 border-y2k-ink bg-white">
              {/* Window title bar */}
              <div className="flex items-center gap-2 border-b-2 border-y2k-ink bg-y2k-mint px-3 py-1.5">
                <span className="flex items-center gap-1" aria-hidden>
                  <span className="size-2 rounded-[2px] border-[1.5px] border-y2k-ink bg-white" />
                  <span className="size-2 rounded-[2px] border-[1.5px] border-y2k-ink bg-white" />
                  <span className="size-2 rounded-[2px] border-[1.5px] border-y2k-ink bg-white" />
                </span>
                <span className="font-mono text-[10px] font-black uppercase tracking-tight text-y2k-ink">
                  now_playing.exe
                </span>
                <span className="ml-auto flex items-center gap-1.5 text-[10px] font-semibold text-y2k-ink/60">
                  <span className="inline-block size-1.5 rounded-full bg-y2k-pink animate-glow-pulse" />
                  LIVE
                </span>
              </div>

              {/* Turntable area */}
              <div className="relative flex items-center justify-center p-6 md:p-8">
                {/* Record label */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="size-16 rounded-full border-2 border-y2k-ink bg-y2k-pink flex items-center justify-center">
                    <span className="font-mono text-[8px] font-black text-center leading-tight text-y2k-ink">
                      Y2K<br />UI
                    </span>
                  </div>
                </div>

                {/* Rotating vinyl record */}
                <img
                  src="/assets/images/10.svg"
                  alt="Y2K vinyl record spinning"
                  className="animate-spin-slow size-56 object-contain md:size-64"
                  style={{ animationDuration: '10s' }}
                />

                {/* Tone arm decoration */}
                <div className="absolute right-4 top-4 text-[10px] font-mono font-black text-y2k-ink/30 rotate-12 select-none">
                  ~
                </div>
              </div>

              {/* Track info bar */}
              <div className="border-t-2 border-y2k-ink bg-y2k-panel/50 px-3 py-2">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-semibold text-y2k-ink/60">
                    <span className="font-black text-y2k-ink">Now Playing:</span> y2k-retro-vibes.mp3
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="inline-block size-1.5 rounded-full bg-y2k-pink" />
                    <span className="inline-block size-1.5 rounded-full bg-y2k-blue" />
                    <span className="inline-block size-1.5 rounded-full bg-y2k-mint animate-glow-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Feature cards */}
          <div ref={cardsRef} className="grid gap-4 md:grid-cols-2 lg:col-span-3" style={{ visibility: "hidden" }}>
            {features.map((f, i) => (
              <div
                key={f.title}
                className="group rounded border-2 border-y2k-ink bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-y2k-ink"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className={`mb-3 inline-flex size-9 items-center justify-center rounded border-2 border-y2k-ink ${f.color} group-hover:scale-105 transition-transform`}>
                  <f.icon className="size-4 text-y2k-ink" />
                </div>
                <h3 className="text-sm font-black text-y2k-ink">{f.title}</h3>
                <p className="mt-1 text-xs text-y2k-ink/60 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── CTA ─── */

function CTA() {
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const cmd = "npx y2kui@latest init"

  const handleCopy = () => {
    navigator.clipboard.writeText(cmd)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const headingRef = useScrollReveal({ y: 25, delay: 0.1 })
  const cmdRef = useScrollReveal({ y: 15, delay: 0.3 })
  const btnRef = useScrollReveal({ y: 15, delay: 0.4 })

  return (
    <section className="relative overflow-hidden border-b-2 border-y2k-ink py-16 md:py-24">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 flex">
        <div className="h-full w-full bg-[radial-gradient(var(--y2k-ink)_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.03]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 text-center">
        <div className="mx-auto max-w-xl">
          {/* Decorative element */}
          {mounted && (
            <div className="mb-4 flex justify-center gap-3">
              <img
                src="/assets/images/7.svg"
                alt=""
                className="size-10 object-contain opacity-30"
                aria-hidden
              />
            </div>
          )}

          <div ref={headingRef} style={{ visibility: "hidden" }}>
            <h2 className="text-xl font-black tracking-tight text-y2k-ink md:text-2xl">
              Ready to Build?
            </h2>
            <p className="mt-2 text-sm text-y2k-ink/60">
              Start with one command — no config needed.
            </p>
          </div>

          <div ref={cmdRef} className="mt-6 flex items-center justify-between gap-2 rounded border-2 border-y2k-ink bg-y2k-panel/50 px-3 py-2.5 text-left font-mono text-sm text-y2k-ink" style={{ visibility: "hidden" }}>
            <span className="truncate">{cmd}</span>
            <button
              onClick={handleCopy}
              className="shrink-0 rounded border-2 border-y2k-ink bg-white p-1.5 text-y2k-ink hover:bg-y2k-mint transition-colors"
              aria-label={copied ? "Copied" : "Copy command"}
            >
              {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            </button>
          </div>

          <div ref={btnRef} className="mt-6 flex flex-wrap justify-center gap-3" style={{ visibility: "hidden" }}>
            <Link href="/docs/installation">
              <Button variant="lemon">
                <Terminal className="size-4" />
                Installation Guide
                <ArrowUpRight className="size-3.5" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button variant="outline">
                Full Documentation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Footer ─── */

function Footer() {
  return (
    <footer className="border-t-2 border-y2k-ink bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
        <div className="flex flex-col items-center gap-1 md:items-start">
          <span className="text-sm font-bold text-y2k-ink">Y2K UI</span>
          <span className="text-xs text-y2k-ink/50">MIT License</span>
        </div>
        <div className="flex items-center gap-6 text-xs text-y2k-ink/50">
          <Link href="/docs" className="hover:text-y2k-ink transition-colors">Docs</Link>
          <a href="https://github.com/MuhamadZafarSyah/y2k-ui" target="_blank" rel="noopener noreferrer" className="hover:text-y2k-ink transition-colors">GitHub</a>
          <span>&copy; 2026</span>
        </div>
      </div>
    </footer>
  )
}

/* ─── Page ─── */

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-y2k-ink">
      <StructuredData type="website" />
      <StructuredData type="software" />
      <StructuredData type="faq" />
      <Nav />
      <main>
        <Hero />
        <Showcase />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
