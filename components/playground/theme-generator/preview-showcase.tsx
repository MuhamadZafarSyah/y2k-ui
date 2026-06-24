"use client"

import * as React from "react"
import { useThemeGenerator } from "./store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { WindowControls } from "@/components/ui/window-controls"
import {
  SparklesIcon,
  UserIcon,
  Terminal,
  ActivityIcon,
  FolderOpenIcon,
  MailIcon,
  MonitorIcon,
  FormInputIcon,
  LayoutDashboardIcon,
} from "lucide-react"

export function PreviewShowcase() {
  const { config } = useThemeGenerator()
  const [activeView, setActiveView] = React.useState<"components" | "form" | "dashboard">("components")
  const { colors, shape, typography, motion } = config

  // Map font settings
  const fontDisplay = typography.display === "Space Grotesk"
    ? "'Space Grotesk', sans-serif"
    : typography.display === "Outfit"
      ? "'Outfit', sans-serif"
      : "var(--font-geist-sans), sans-serif"

  const fontBody = typography.body === "Plus Jakarta Sans"
    ? "'Plus Jakarta Sans', sans-serif"
    : typography.body === "Inter"
      ? "'Inter', sans-serif"
      : "var(--font-geist-sans), sans-serif"

  const fontMono = typography.mono === "JetBrains Mono"
    ? "'JetBrains Mono', monospace"
    : "var(--font-geist-mono), monospace"

  // Scoped style overrides mapping Tailwind utility classes with hex colors to CSS custom properties
  const cssStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400..700&family=Plus+Jakarta+Sans:wght@400..800&family=Outfit:wght@400..900&family=JetBrains+Mono:wght@400..800&family=Inter:wght@400..700&display=swap');

    .preview-container {
      --y2k-ink: ${colors.ink};
      --y2k-ink-muted: ${colors.ink}c0; /* 75% opacity of ink */
      --y2k-blue: ${colors.blue};
      --y2k-pink: ${colors.pink};
      --y2k-lilac: ${colors.lilac};
      --y2k-mint: ${colors.mint};
      --y2k-lemon: ${colors.lemon};
      --y2k-panel: ${colors.panel};
      
      --background: ${colors.background ?? "#f7f8fc"};
      --foreground: var(--y2k-ink);
      --border: var(--y2k-ink);
      --primary: var(--y2k-blue);
      --secondary: var(--y2k-panel);
      --accent: var(--y2k-pink);
      --radius: ${shape.radius}px;

      font-family: ${fontBody};
      font-size: ${typography.baseSize ?? 14}px;
      color: var(--y2k-ink);
    }

    .preview-container h1,
    .preview-container h2,
    .preview-container h3,
    .preview-container .font-heading,
    .preview-container .y2k-window-title {
      font-family: ${fontDisplay};
    }

    .preview-container code,
    .preview-container pre,
    .preview-container kbd,
    .preview-container .font-mono {
      font-family: ${fontMono};
    }

    /* Override transitions based on config */
    .preview-container *,
    .preview-container *::before,
    .preview-container *::after {
      ${!motion.enabled || motion.speed === "off" ? "transition: none !important; animation: none !important;" : ""}
      ${motion.speed === "snappy" ? "transition-duration: 75ms !important; animation-duration: 75ms !important;" : ""}
      ${motion.speed === "smooth" ? "transition-duration: 200ms !important; animation-duration: 200ms !important;" : ""}
    }

    /* Scoped classes with border overrides */
    .preview-container .y2k-window {
      border-width: ${shape.windowBorder}px !important;
      border-color: var(--y2k-ink) !important;
      border-radius: ${shape.radius}px !important;
    }
    
    .preview-container .y2k-window-title {
      border-bottom-width: ${shape.windowBorder}px !important;
      border-color: var(--y2k-ink) !important;
      border-top-left-radius: ${Math.max(0, shape.radius - 2)}px !important;
      border-top-right-radius: ${Math.max(0, shape.radius - 2)}px !important;
    }

    .preview-container .border-2,
    .preview-container .border-b-2,
    .preview-container .border-t-2,
    .preview-container .border-l-2,
    .preview-container .border-r-2 {
      border-width: ${shape.controlBorder}px !important;
      border-color: var(--y2k-ink) !important;
    }

    /* Intercept and override specific tailwind utility classes with hex strings */
    /* Ink Color overrides */
    .preview-container .text-\\[\\#1b1b3a\\] { color: var(--y2k-ink) !important; }
    .preview-container .border-\\[\\#1b1b3a\\] { border-color: var(--y2k-ink) !important; }
    .preview-container .bg-\\[\\#1b1b3a\\] { background-color: var(--y2k-ink) !important; }
    .preview-container .hover\\:bg-\\[\\#1b1b3a\\]:hover { background-color: var(--y2k-ink) !important; }
    .preview-container .hover\\:text-\\[\\#1b1b3a\\]:hover { color: var(--y2k-ink) !important; }

    /* Blue Color overrides */
    .preview-container .bg-\\[\\#8ed1fc\\] { background-color: var(--y2k-blue) !important; }
    .preview-container .text-\\[\\#8ed1fc\\] { color: var(--y2k-blue) !important; }
    .preview-container .border-\\[\\#8ed1fc\\] { border-color: var(--y2k-blue) !important; }
    .preview-container .hover\\:bg-\\[\\#8ed1fc\\]:hover { background-color: var(--y2k-pink) !important; } /* mapped variant defaults */
    .preview-container .hover\\:bg-\\[\\#b69cff\\]:hover { background-color: var(--y2k-lilac) !important; }

    /* Pink Color overrides */
    .preview-container .bg-\\[\\#ff8fcf\\] { background-color: var(--y2k-pink) !important; }
    .preview-container .text-\\[\\#ff8fcf\\] { color: var(--y2k-pink) !important; }
    .preview-container .border-\\[\\#ff8fcf\\] { border-color: var(--y2k-pink) !important; }
    .preview-container .hover\\:bg-\\[\\#ffe45e\\]:hover { background-color: var(--y2k-lemon) !important; }
    .preview-container .focus-visible\\:ring-\\[\\#ff8fcf\\]:focus-visible { --tw-ring-color: var(--y2k-pink) !important; }

    /* Lilac Color overrides */
    .preview-container .bg-\\[\\#b69cff\\] { background-color: var(--y2k-lilac) !important; }
    .preview-container .text-\\[\\#b69cff\\] { color: var(--y2k-lilac) !important; }
    .preview-container .border-\\[\\#b69cff\\] { border-color: var(--y2k-lilac) !important; }

    /* Mint Color overrides */
    .preview-container .bg-\\[\\#8ff0d0\\] { background-color: var(--y2k-mint) !important; }
    .preview-container .text-\\[\\#8ff0d0\\] { color: var(--y2k-mint) !important; }
    .preview-container .border-\\[\\#8ff0d0\\] { border-color: var(--y2k-mint) !important; }
    .preview-container .hover\\:bg-\\[\\#8ff0d0\\]:hover { background-color: var(--y2k-mint) !important; }

    /* Lemon Color overrides */
    .preview-container .bg-\\[\\#ffe45e\\] { background-color: var(--y2k-lemon) !important; }
    .preview-container .text-\\[\\#ffe45e\\] { color: var(--y2k-lemon) !important; }
    .preview-container .border-\\[\\#ffe45e\\] { border-color: var(--y2k-lemon) !important; }
    .preview-container .hover\\:bg-\\[\\#ffe45e\\]:hover { background-color: var(--y2k-lemon) !important; }
    .preview-container .hover\\:bg-\\[\\#8ff0d0\\]:hover { background-color: var(--y2k-mint) !important; }
    .preview-container .hover\\:bg-\\[\\#ff8fcf\\]:hover { background-color: var(--y2k-pink) !important; }
    
    /* Panel Color overrides */
    .preview-container .bg-\\[\\#d7dde8\\] { background-color: var(--y2k-panel) !important; }
    .preview-container .text-\\[\\#d7dde8\\] { color: var(--y2k-panel) !important; }
    .preview-container .border-\\[\\#d7dde8\\] { border-color: var(--y2k-panel) !important; }
    .preview-container .hover\\:bg-\\[\\#d7dde8\\]:hover { background-color: var(--y2k-panel) !important; }

    /* Dotted background matching existing previews */
    .dotted-canvas {
      background-color: var(--background);
      background-image: radial-gradient(var(--y2k-ink) 1px, transparent 1px);
      background-size: 16px 16px;
      background-opacity: 0.15;
    }
  `

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Dynamic Scoped Style Override */}
      <style dangerouslySetInnerHTML={{ __html: cssStyles }} />

      {/* View Switcher Top Bar */}
      <div className="flex items-center justify-between border-b-2 border-[#1b1b3a] bg-white px-4 py-2 shrink-0">
        {/* <div className="flex items-center gap-1.5">
          <span className="flex size-4 items-center justify-center rounded border border-[#1b1b3a] bg-[#ffe45e] text-[8px] font-bold">
            P
          </span>
          <span className="font-mono text-xs font-bold text-[#1b1b3a]">preview-canvas.log</span>
        </div> */}

        <div className="flex items-center gap-1">
          <Button
            size="xs"
            variant={activeView === "components" ? "lemon" : "outline"}
            onClick={() => setActiveView("components")}
            leadingIcon={<MonitorIcon className="size-3" />}
          >
            Components
          </Button>
          <Button
            size="xs"
            variant={activeView === "form" ? "lemon" : "outline"}
            onClick={() => setActiveView("form")}
            leadingIcon={<FormInputIcon className="size-3" />}
          >
            Sample Form
          </Button>
          <Button
            size="xs"
            variant={activeView === "dashboard" ? "lemon" : "outline"}
            onClick={() => setActiveView("dashboard")}
            leadingIcon={<LayoutDashboardIcon className="size-3" />}
          >
            Dashboard
          </Button>
        </div>
      </div>

      {/* Preview Workspace Canvas */}
      <div className="flex-1 overflow-auto p-6 dotted-canvas relative">
        <div className="preview-container mx-auto max-w-4xl min-h-full">
          {activeView === "components" && (
            <div className="grid gap-6 md:grid-cols-2">
              {/* Buttons Box */}
              <div className="y2k-window flex flex-col p-4 bg-white">
                <div className="y2k-window-title -mx-4 -mt-4 mb-4 flex items-center justify-between">
                  <span>Buttons Showcase</span>
                  <WindowControls hideMaximize hideClose />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="default">Default (Lemon)</Button>
                  <Button variant="pink">Pink Accent</Button>
                  <Button variant="blue">Blue primary</Button>
                  <Button variant="mint">Mint Success</Button>
                  <Button variant="lilac">Lilac secondary</Button>
                  <Button variant="outline">Outline Button</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="secondary">Secondary (Panel)</Button>
                  <Button variant="ghost">Ghost Button</Button>
                  <Button variant="link">Link Style</Button>
                </div>
              </div>

              {/* Badges Box */}
              <div className="y2k-window flex flex-col p-4 bg-white">
                <div className="y2k-window-title -mx-4 -mt-4 mb-4 flex items-center justify-between">
                  <span>Badges & Statuses</span>
                  <WindowControls hideMaximize hideClose />
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  <Badge>Default</Badge>
                  <Badge variant="blue">Blue</Badge>
                  <Badge variant="pink">Pink</Badge>
                  <Badge variant="lilac">Lilac</Badge>
                  <Badge variant="mint">Mint</Badge>
                  <Badge variant="lemon">Lemon</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
                <div className="mt-4 pt-4 border-t border-dashed border-[#1b1b3a]/25">
                  <Progress value={65} className="h-4 border-2 border-[#1b1b3a]" />
                  <span className="text-[10px] font-mono mt-1 block text-right">SYSTEM STABILITY: 65%</span>
                </div>
              </div>

              {/* Form Input Box */}
              <div className="y2k-window flex flex-col p-4 bg-white">
                <div className="y2k-window-title -mx-4 -mt-4 mb-4 flex items-center justify-between">
                  <span>Form Controls</span>
                  <WindowControls hideMaximize hideClose />
                </div>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold block">Retro Username</label>
                    <Input placeholder="Type something..." defaultValue="kawaii_coder" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold block">Message</label>
                    <Textarea placeholder="Write details here..." defaultValue="Y2K UI is awesome!" className="min-h-16" />
                  </div>
                  <div className="flex flex-wrap gap-4 pt-1">
                    <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                      <Checkbox defaultChecked />
                      <span>Check me out</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                      <Switch defaultChecked />
                      <span>Toggle Mode</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Misc Items Box */}
              <div className="y2k-window flex flex-col p-4 bg-white">
                <div className="y2k-window-title -mx-4 -mt-4 mb-4 flex items-center justify-between">
                  <span>Interactive Elements</span>
                  <WindowControls hideMaximize hideClose />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10 border-2 border-[#1b1b3a]">
                      <AvatarImage src="https://github.com/nutlope.png" alt="Avatar Preview" />
                      <AvatarFallback>Y2K</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-xs font-bold">Muhamad Zafar Syah</div>
                      <div className="text-[10px] text-y2k-ink-muted font-mono">Lead Pixel Artist</div>
                    </div>
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-xs font-bold py-1">How customizable is it?</AccordionTrigger>
                      <AccordionContent className="text-xs text-y2k-ink-muted">
                        Absolutely everything is reactive. Changing tokens updates this preview in real time!
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Alert variant="warning" className="p-3">
                    <SparklesIcon className="size-4 text-[#1b1b3a] inline mr-1" />
                    <AlertTitle className="text-xs font-bold inline">Design Alert</AlertTitle>
                    <AlertDescription className="text-[11px] mt-1 block">
                      Always align outlines to Navy #1b1b3a for maximum Y2K vibe!
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </div>
          )}

          {activeView === "form" && (
            <div className="y2k-window bg-white max-w-md mx-auto p-6">
              <div className="y2k-window-title -mx-6 -mt-6 mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FormInputIcon className="size-4" />
                  <span>REGISTRATION_FORM.EXE</span>
                </div>
                <WindowControls hideMaximize />
              </div>

              <div className="text-center mb-5">
                <h3 className="text-lg font-black tracking-tight text-[#1b1b3a]">Create Retro Account</h3>
                <p className="text-xs text-y2k-ink-muted">Join the decentralized pixel club today.</p>
              </div>

              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold block">Email Address</label>
                  <Input type="email" placeholder="you@neon.club" defaultValue="coder@y2k.net" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold block">Password</label>
                  <Input type="password" placeholder="••••••••" defaultValue="password123" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold block">Access Level (Radius / Speed)</label>
                  <Slider defaultValue={[75]} max={100} className="py-2" />
                </div>
                <label className="flex items-start gap-2 cursor-pointer pt-1">
                  <Checkbox defaultChecked />
                  <span className="text-[11px] leading-tight font-semibold">
                    I agree to run code in light-only mode and maintain high contrast borders.
                  </span>
                </label>

                <div className="pt-2">
                  <Button variant="default" className="w-full h-10 text-sm font-bold">
                    LAUNCH DECK 🚀
                  </Button>
                </div>
              </form>
            </div>
          )}

          {activeView === "dashboard" && (
            <div className="y2k-window bg-white p-4">
              <div className="y2k-window-title -mx-4 -mt-4 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LayoutDashboardIcon className="size-4" />
                  <span>Y2K_SYS_MONITOR.BAT</span>
                </div>
                <WindowControls />
              </div>

              {/* Stats Bar */}
              <div className="grid gap-3 grid-cols-1 sm:grid-cols-3 mb-4">
                {[
                  { label: "Core Temp", value: "32°C", color: "bg-[#8ff0d0]" },
                  { label: "Network Latency", value: "14ms", color: "bg-[#8ed1fc]" },
                  { label: "Memory Dump", value: "88%", color: "bg-[#ff8fcf]" },
                ].map((stat, idx) => (
                  <div key={idx} className="border-2 border-[#1b1b3a] rounded p-2 flex flex-col items-center justify-center">
                    <span className="text-[9px] font-mono text-y2k-ink-muted uppercase">{stat.label}</span>
                    <span className="text-sm font-black mt-0.5">{stat.value}</span>
                    <div className="w-full h-1 bg-[#d7dde8] border border-[#1b1b3a] rounded-sm mt-1.5 overflow-hidden">
                      <div className={`h-full ${stat.color}`} style={{ width: stat.value.replace(/\D/g, "") + "%" }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Table section */}
              <div className="border-2 border-[#1b1b3a] rounded overflow-hidden mb-4">
                <div className="bg-[#d7dde8] px-3 py-1 text-[11px] font-bold border-b-2 border-[#1b1b3a] flex items-center justify-between">
                  <span>active_processes.cfg</span>
                  <span className="text-[9px] font-mono opacity-60">Items: 3</span>
                </div>
                <Table>
                  <TableHeader className="bg-white border-b border-[#1b1b3a]/30">
                    <TableRow>
                      <TableHead className="h-7 text-[10px] font-bold text-[#1b1b3a]">PID</TableHead>
                      <TableHead className="h-7 text-[10px] font-bold text-[#1b1b3a]">PROCESS</TableHead>
                      <TableHead className="h-7 text-[10px] font-bold text-[#1b1b3a] text-right">STATUS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { pid: "0x1A2", name: "theme_generator.exe", status: "RUNNING", variant: "mint" as const },
                      { pid: "0x4F9", name: "custom_palette.sys", status: "IDLE", variant: "blue" as const },
                      { pid: "0x7E1", name: "contrast_guard.dll", status: "ACTIVE", variant: "lemon" as const },
                    ].map((row, idx) => (
                      <TableRow key={idx} className="border-b border-[#1b1b3a]/20 hover:bg-[#d7dde8]/30">
                        <TableCell className="py-1.5 font-mono text-[10px]">{row.pid}</TableCell>
                        <TableCell className="py-1.5 font-semibold text-xs">{row.name}</TableCell>
                        <TableCell className="py-1.5 text-right">
                          <Badge variant={row.variant} size="sm">{row.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Controls footer */}
              <div className="flex justify-end gap-2">
                <Button size="xs" variant="outline">DUMP LOGS</Button>
                <Button size="xs" variant="pink">FORCE REBOOT</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
