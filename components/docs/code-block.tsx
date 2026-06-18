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
      className={cn(
        "y2k-window overflow-hidden text-sm",
        className,
      )}
      data-slot="code-block"
    >
      <div className="y2k-window-title">
        <span className="y2k-title-dots" aria-hidden>
          <span />
          <span />
          <span />
        </span>
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
      <pre
        dir="ltr"
        className="overflow-x-auto bg-card px-4 py-3 font-mono text-[13px] leading-relaxed text-y2k-ink"
      >
        <code>{code}</code>
      </pre>
    </div>
  )
}

export default CodeBlock
