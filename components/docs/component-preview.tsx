"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./code-block";

export type ComponentPreviewProps = {
  name: string;
  align?: "start" | "center" | "end";
  className?: string;
  preview?: React.ReactNode;
  source?: string;
};

function PreviewFrame({
  children,
  align,
}: {
  children: React.ReactNode;
  align: NonNullable<ComponentPreviewProps["align"]>;
}) {
  const alignClass =
    align === "start"
      ? "items-start justify-start text-left"
      : align === "end"
        ? "items-end justify-end text-right"
        : "items-center justify-center text-center";

  return (
    <div
      className={cn(
        "y2k-window relative min-h-32 overflow-hidden",
      )}
      data-slot="preview-frame"
    >
      <div className="y2k-window-title">
        <span className="y2k-title-dots" aria-hidden>
          <span />
          <span />
          <span />
        </span>
        <span>preview.app</span>
      </div>
      <div
        className={cn(
          "flex min-h-32 w-full bg-y2k-panel p-8",
          alignClass,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function ComponentPreview({
  name,
  align = "center",
  className,
  preview,
  source,
}: ComponentPreviewProps) {
  const [active, setActive] = React.useState<"preview" | "code">("preview");

  return (
    <div
      className={cn("not-prose my-6 w-full", className)}
      data-slot="component-preview"
      data-name={name}
    >
      <div className="y2k-window overflow-hidden">
        <div
          role="tablist"
          aria-label="Component preview tabs"
          className="y2k-window-title !border-b-2"
        >
          <span className="y2k-title-dots" aria-hidden>
            <span />
            <span />
            <span />
          </span>
          <button
            type="button"
            role="tab"
            aria-selected={active === "preview"}
            onClick={() => setActive("preview")}
            className={cn(
              "ml-2 inline-flex h-6 items-center rounded border-2 border-y2k-ink px-2 text-xs font-semibold transition-colors",
              active === "preview"
                ? "bg-y2k-lemon text-y2k-ink"
                : "bg-card text-y2k-ink hover:bg-y2k-pink",
            )}
          >
            Preview
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={active === "code"}
            onClick={() => setActive("code")}
            className={cn(
              "ml-1 inline-flex h-6 items-center rounded border-2 border-y2k-ink px-2 text-xs font-semibold transition-colors",
              active === "code"
                ? "bg-y2k-lemon text-y2k-ink"
                : "bg-card text-y2k-ink hover:bg-y2k-pink",
            )}
          >
            Code
          </button>
          <span className="ml-auto font-mono text-xs opacity-70">{name}</span>
        </div>
        <div className="bg-card">
          {active === "preview" ? (
            <PreviewFrame align={align}>
              {preview ?? (
                <span className="font-mono text-xs text-y2k-ink/70">
                  No preview slot for &ldquo;{name}&rdquo;
                </span>
              )}
            </PreviewFrame>
          ) : (
            <CodeBlock
              code={source || "// source not available"}
              language="tsx"
              filename={`${name}.tsx`}
              className="!my-0 rounded-none border-0"
            />
          )}
        </div>
      </div>
    </div>
  );
}
