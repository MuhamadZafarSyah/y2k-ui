"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type CodeBlockProps = {
  code: string
  language?: string
  filename?: string
  className?: string
}

export function CodeBlock({
  code,
  language = "tsx",
  filename,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)
  const [highlightedHtml, setHighlightedHtml] = React.useState<string>("")

  React.useEffect(() => {
    let cancelled = false

    async function highlight() {
      try {
        const { codeToHtml } = await import("shiki")
        const html = await codeToHtml(code, {
          lang: language,
          theme: "github-light",
          transformers: [
            {
              pre(node) {
                node.properties.style =
                  "background: transparent; margin: 0; padding: 0;"
              },
              code(node) {
                node.properties.style = "background: transparent;"
              },
            },
          ],
        })
        if (!cancelled) setHighlightedHtml(html)
      } catch {
        // Fallback to plain code
        if (!cancelled) {
          const escaped = code
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
          setHighlightedHtml(`<pre><code>${escaped}</code></pre>`)
        }
      }
    }

    highlight()
    return () => {
      cancelled = true
    }
  }, [code, language])

  const onCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* ignore */
    }
  }, [code])

  return (
    <div
      className={cn("y2k-window overflow-hidden text-sm", className)}
      data-slot="code-block"
    >
      <div className="y2k-window-title rounded-none! bg-y2k-lilac/20 px-3 py-1.5 font-mono text-xs text-y2k-ink">
        <span className="flex-1 truncate">
          {filename ?? `${language}.${language === "bash" ? "sh" : "txt"}`}
        </span>
        <button
          type="button"
          onClick={onCopy}
          aria-label={copied ? "Copied" : "Copy code"}
          className="ml-auto inline-flex h-6 w-6 items-center justify-center rounded border-2 border-y2k-ink bg-card text-y2k-ink transition-colors hover:bg-y2k-lemon"
        >
          {copied ? (
            <CheckIcon className="h-3.5 w-3.5" />
          ) : (
            <CopyIcon className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
      <div
        dir="ltr"
        className="overflow-x-auto bg-card px-4 py-3 font-mono text-[13px] leading-relaxed [&_pre]:!bg-transparent [&_code]:!bg-transparent"
      >
        {highlightedHtml ? (
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        ) : (
          <pre className="m-0 p-0">
            <code>{code}</code>
          </pre>
        )}
      </div>
    </div>
  )
}

export default CodeBlock