"use client"

import * as React from "react"
import { Highlight, PrismTheme } from "prism-react-renderer"
import { CheckIcon, CopyIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type CodeBlockProps = {
  code: string
  language?: string
  filename?: string
  className?: string
  /**
   * Show line numbers in the gutter.
   * @default false
   */
  showLineNumbers?: boolean
}

/* ── Y2K-themed Prism theme ───────────────────────────────
   Soft, pastel-friendly token colors that harmonize with the
   Y2K palette. No background highlight on strings.
────────────────────────────────────────────────────────── */
const y2kTheme: PrismTheme = {
  plain: {
    color: "#1b1b3a",
    backgroundColor: "transparent",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: { color: "#1b1b3a80", fontStyle: "italic" },
    },
    {
      types: ["punctuation"],
      style: { color: "#b69cff" },
    },
    {
      types: [
        "property",
        "tag",
        "boolean",
        "number",
        "constant",
        "symbol",
        "deleted",
      ],
      style: { color: "#1b1b8a" },
    },
    {
      types: ["selector", "attr-name", "string", "char", "builtin", "inserted"],
      style: { color: "#d97706" },
    },
    {
      types: ["operator", "entity", "url", "variable"],
      style: { color: "#b69cff" },
    },
    {
      types: ["atrule", "attr-value", "keyword"],
      style: { color: "#ff8fcf", fontWeight: "bold" },
    },
    {
      types: ["function", "class-name"],
      style: { color: "#2563eb", fontWeight: "bold" },
    },
    {
      types: ["regex", "important"],
      style: { color: "#b45309" },
    },
  ],
}

export function CodeBlock({
  code,
  language = "tsx",
  filename,
  className,
  showLineNumbers = false,
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)

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

      <Highlight
        code={code.replace(/\n$/, "")}
        language={language}
        theme={y2kTheme}
      >
        {({ className: cn1, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            dir="ltr"
            className={cn(
              "m-0 overflow-x-auto bg-card p-0! font-mono text-[13px]",
              cn1,
            )}
            style={style}
          >
            <div
              className={cn(
                "flex",
                showLineNumbers ? "pl-0 " : "pl-4 py-3",
                "",
              )}
            >
              {showLineNumbers && (
                <div
                  aria-hidden
                  className="select-none shrink-0 border-r border-y2k-ink/20 bg-y2k-panel/40 px-2.5 text-right text-[11px] text-y2k-ink/40"
                >
                  {tokens.map((_, i) => (
                    <div key={i} className="leading-[1.625]">
                      {i + 1}
                    </div>
                  ))}
                </div>
              )}
              <div
                className={cn(
                  "min-w-0 flex-1",
                  showLineNumbers ? "pl-3 pr-4" : "pr-4",
                )}
              >
                {tokens.map((line, i) => {
                  const { key: _lk, ...lineProps } = getLineProps({
                    line,
                    key: i,
                  })
                  return (
                    <div
                      key={i}
                      {...lineProps}
                      className="leading-[1.625] whitespace-pre"
                    >
                      {line.map((token, j) => {
                        const { key: _tk, ...tokenProps } = getTokenProps({
                          token,
                          key: j,
                        })
                        return <span key={j} {...tokenProps} />
                      })}
                    </div>
                  )
                })}
              </div>
            </div>
          </pre>
        )}
      </Highlight>
    </div>
  )
}

export default CodeBlock