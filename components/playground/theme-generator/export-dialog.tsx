"use client"

import * as React from "react"
import { useThemeGenerator } from "./store"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Highlight, type PrismTheme } from "prism-react-renderer"
import {
  CopyIcon,
  CheckIcon,
  DownloadIcon,
  Code2Icon,
  FileCodeIcon,
  SparklesIcon,
  Command,
} from "lucide-react"

const y2kCodeTheme: PrismTheme = {
  plain: { color: "#1b1b3a", backgroundColor: "transparent" },
  styles: [
    { types: ["comment", "prolog", "doctype", "cdata"], style: { color: "#1b1b3a80", fontStyle: "italic" } },
    { types: ["punctuation"], style: { color: "#b69cff" } },
    { types: ["property", "tag", "boolean", "number", "constant", "symbol", "deleted"], style: { color: "#1b1b8a" } },
    { types: ["selector", "attr-name", "string", "char", "builtin", "inserted"], style: { color: "#d97706" } },
    { types: ["operator", "entity", "url", "variable"], style: { color: "#b69cff" } },
    { types: ["atrule", "attr-value", "keyword"], style: { color: "#8b5cf6", fontWeight: "bold" } },
    { types: ["function", "class-name"], style: { color: "#2563eb", fontWeight: "bold" } },
  ],
}

export function ExportDialog({ trigger }: { trigger: React.ReactNode }) {
  const { config, shareUrl } = useThemeGenerator()
  const { colors, shape, typography } = config
  const [copied, setCopied] = React.useState<string | null>(null)

  const radiusRem = shape.radius / 16

  const globalsCssCode = `@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --font-heading: var(--font-geist-sans);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);

  --color-y2k-ink: var(--y2k-ink);
  --color-y2k-ink-muted: var(--y2k-ink-muted);
  --color-y2k-blue: var(--y2k-blue);
  --color-y2k-pink: var(--y2k-pink);
  --color-y2k-lilac: var(--y2k-lilac);
  --color-y2k-mint: var(--y2k-mint);
  --color-y2k-lemon: var(--y2k-lemon);
  --color-y2k-panel: var(--y2k-panel);
}

:root {
  --background: ${colors.background ?? "#f7f8fc"};
  --foreground: var(--y2k-ink);
  --card: #ffffff;
  --card-foreground: var(--y2k-ink);
  --popover: #ffffff;
  --popover-foreground: var(--y2k-ink);
  --primary: var(--y2k-blue);
  --primary-foreground: var(--y2k-ink);
  --secondary: var(--y2k-panel);
  --secondary-foreground: var(--y2k-ink);
  --muted: var(--y2k-panel);
  --muted-foreground: ${colors.ink}b0;
  --accent: var(--y2k-pink);
  --accent-foreground: var(--y2k-ink);
  --destructive: #ff3b30;
  --border: var(--y2k-ink);
  --input: var(--y2k-ink);
  --ring: var(--y2k-pink);
  --radius: ${radiusRem}rem;

  --y2k-ink: ${colors.ink};
  --y2k-ink-muted: ${colors.ink}c0;
  --y2k-blue: ${colors.blue};
  --y2k-pink: ${colors.pink};
  --y2k-lilac: ${colors.lilac};
  --y2k-mint: ${colors.mint};
  --y2k-lemon: ${colors.lemon};
  --y2k-panel: ${colors.panel};
}`

  const themeBlockCode = `@theme inline {
  --y2k-ink: ${colors.ink};
  --y2k-blue: ${colors.blue};
  --y2k-pink: ${colors.pink};
  --y2k-lilac: ${colors.lilac};
  --y2k-mint: ${colors.mint};
  --y2k-lemon: ${colors.lemon};
  --y2k-panel: ${colors.panel};
  --radius: ${shape.radius}px;
  --y2k-window-border: ${shape.windowBorder}px;
  --y2k-control-border: ${shape.controlBorder}px;
}`

  const jsonConfig = JSON.stringify(
    {
      colors: {
        ink: colors.ink,
        blue: colors.blue,
        pink: colors.pink,
        lilac: colors.lilac,
        mint: colors.mint,
        lemon: colors.lemon,
        panel: colors.panel,
      },
      shape: {
        radius: shape.radius,
        windowBorder: shape.windowBorder,
        controlBorder: shape.controlBorder,
      },
      typography: {
        display: typography.display,
        body: typography.body,
        mono: typography.mono,
      },
    },
    null,
    2
  )

  const hashParam = shareUrl.split("#")[1] || ""
  const cliCommand = `npx y2kui init --theme="${hashParam}"`

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  const handleDownload = () => {
    const blob = new Blob([globalsCssCode], { type: "text/css" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "globals.css"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-xl max-h-[85vh] flex flex-col" title="EXPORT_THEME.BAT">
        <DialogDescription className="sr-only">
          Export your customized Y2K UI design token theme to Tailwind CSS files, standalone block, or JSON.
        </DialogDescription>
        
        <Tabs defaultValue="globals" className="flex flex-1 flex-col overflow-hidden">
          <TabsList className="shrink-0 gap-0 pt-0.5 px-2 bg-[#d7dde8]">
            <TabsTrigger value="globals" className="gap-1 text-xs">
              <FileCodeIcon className="size-3" />
              globals.css
            </TabsTrigger>
            <TabsTrigger value="theme" className="gap-1 text-xs">
              <Code2Icon className="size-3" />
              @theme
            </TabsTrigger>
            <TabsTrigger value="json" className="gap-1 text-xs">
              <SparklesIcon className="size-3" />
              JSON
            </TabsTrigger>
            <TabsTrigger value="cli" className="gap-1 text-xs">
              <Command className="size-3" />
              CLI
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-hidden p-3 bg-white border-t-2 border-[#1b1b3a] flex flex-col min-h-0">
            {/* Tab: globals.css */}
            <TabsContent value="globals" className="flex-1 flex flex-col min-h-0 overflow-hidden m-0 border-0 p-0">
              <div className="flex items-center justify-between pb-2">
                <span className="text-[10px] font-mono text-[#1b1b3a]/60">Full Tailwind CSS configuration file</span>
                <div className="flex gap-1.5">
                  <Button
                    size="xs"
                    variant="outline"
                    onClick={() => handleCopy("globals", globalsCssCode)}
                    leadingIcon={copied === "globals" ? <CheckIcon className="size-3" /> : <CopyIcon className="size-3" />}
                  >
                    {copied === "globals" ? "Copied" : "Copy"}
                  </Button>
                  <Button
                    size="xs"
                    variant="lemon"
                    onClick={handleDownload}
                    leadingIcon={<DownloadIcon className="size-3" />}
                  >
                    Download
                  </Button>
                </div>
              </div>
              <div className="flex-1 overflow-auto rounded border-2 border-[#1b1b3a] bg-[#f7f8fc] p-2 relative">
                <Highlight code={globalsCssCode} language="css" theme={y2kCodeTheme}>
                  {({ tokens, getLineProps, getTokenProps }) => (
                    <pre className="text-[10px] font-mono whitespace-pre leading-normal">
                      {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line })}>
                          {line.map((token, key) => (
                            <span key={key} {...getTokenProps({ token })} />
                          ))}
                        </div>
                      ))}
                    </pre>
                  )}
                </Highlight>
              </div>
            </TabsContent>

            {/* Tab: @theme block */}
            <TabsContent value="theme" className="flex-1 flex flex-col min-h-0 overflow-hidden m-0 border-0 p-0">
              <div className="flex items-center justify-between pb-2">
                <span className="text-[10px] font-mono text-[#1b1b3a]/60">Only @theme inline code declarations</span>
                <Button
                  size="xs"
                  variant="outline"
                  onClick={() => handleCopy("theme", themeBlockCode)}
                  leadingIcon={copied === "theme" ? <CheckIcon className="size-3" /> : <CopyIcon className="size-3" />}
                >
                  {copied === "theme" ? "Copied" : "Copy"}
                </Button>
              </div>
              <div className="flex-1 overflow-auto rounded border-2 border-[#1b1b3a] bg-[#f7f8fc] p-2">
                <Highlight code={themeBlockCode} language="css" theme={y2kCodeTheme}>
                  {({ tokens, getLineProps, getTokenProps }) => (
                    <pre className="text-[11px] font-mono whitespace-pre leading-normal">
                      {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line })}>
                          {line.map((token, key) => (
                            <span key={key} {...getTokenProps({ token })} />
                          ))}
                        </div>
                      ))}
                    </pre>
                  )}
                </Highlight>
              </div>
            </TabsContent>

            {/* Tab: JSON */}
            <TabsContent value="json" className="flex-1 flex flex-col min-h-0 overflow-hidden m-0 border-0 p-0">
              <div className="flex items-center justify-between pb-2">
                <span className="text-[10px] font-mono text-[#1b1b3a]/60">Serialized Theme Config metadata</span>
                <Button
                  size="xs"
                  variant="outline"
                  onClick={() => handleCopy("json", jsonConfig)}
                  leadingIcon={copied === "json" ? <CheckIcon className="size-3" /> : <CopyIcon className="size-3" />}
                >
                  {copied === "json" ? "Copied" : "Copy"}
                </Button>
              </div>
              <div className="flex-1 overflow-auto rounded border-2 border-[#1b1b3a] bg-[#f7f8fc] p-2">
                <Highlight code={jsonConfig} language="json" theme={y2kCodeTheme}>
                  {({ tokens, getLineProps, getTokenProps }) => (
                    <pre className="text-[11px] font-mono whitespace-pre leading-normal">
                      {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line })}>
                          {line.map((token, key) => (
                            <span key={key} {...getTokenProps({ token })} />
                          ))}
                        </div>
                      ))}
                    </pre>
                  )}
                </Highlight>
              </div>
            </TabsContent>

            {/* Tab: CLI */}
            <TabsContent value="cli" className="flex-1 flex flex-col min-h-0 overflow-hidden m-0 border-0 p-0">
              <div className="flex items-center justify-between pb-2">
                <span className="text-[10px] font-mono text-[#1b1b3a]/60">Auto initialize this theme in your repository</span>
                <Button
                  size="xs"
                  variant="outline"
                  onClick={() => handleCopy("cli", cliCommand)}
                  leadingIcon={copied === "cli" ? <CheckIcon className="size-3" /> : <CopyIcon className="size-3" />}
                >
                  {copied === "cli" ? "Copied" : "Copy Command"}
                </Button>
              </div>
              <div className="rounded border-2 border-[#1b1b3a] bg-[#1b1b3a] p-3 text-xs font-mono text-[#8ff0d0] whitespace-pre-wrap break-all select-all">
                {cliCommand}
              </div>
              <div className="mt-4 text-xs space-y-2 text-y2k-ink-muted">
                <p className="font-bold text-[#1b1b3a]">How it works:</p>
                <ol className="list-decimal pl-4 space-y-1">
                  <li>Run the copied command in your local project terminal.</li>
                  <li>The registry CLI will fetch your configuration directly from the serialized base64 theme key.</li>
                  <li>It will automatically set up the customized CSS variables inside your <code className="bg-[#f7f8fc] border border-[#1b1b3a]/30 px-1 rounded">globals.css</code>.</li>
                </ol>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
