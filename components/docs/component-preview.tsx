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

/* Dotted-grid "canvas" so the preview area never feels empty. */
const gridStyle: React.CSSProperties = {
  backgroundImage: "radial-gradient(#1b1b3a1f 1px, transparent 1px)",
  backgroundSize: "16px 16px",
  backgroundPosition: "-1px -1px",
};


function AlignToggle({
  value,
  onChange,
}: {
  value: NonNullable<ComponentPreviewProps["align"]>;
  onChange: (v: NonNullable<ComponentPreviewProps["align"]>) => void;
}) {
  const opts: Array<{
    key: NonNullable<ComponentPreviewProps["align"]>;
    glyph: string;
    label: string;
  }> = [
      { key: "start", glyph: "├", label: "Align left" },
      { key: "center", glyph: "│", label: "Align center" },
      { key: "end", glyph: "┤", label: "Align right" },
    ];
  return (
    <div className="absolute right-2 top-2 z-10 flex items-center gap-0.5 rounded-[6px] border-2 border-y2k-ink bg-card p-0.5">
      {opts.map((o) => (
        <button
          key={o.key}
          type="button"
          aria-label={o.label}
          aria-pressed={value === o.key}
          onClick={() => onChange(o.key)}
          className={cn(
            "flex h-5 w-5 items-center justify-center rounded-[3px] font-mono text-xs text-y2k-ink transition-colors",
            value === o.key ? "bg-y2k-lemon" : "hover:bg-y2k-panel",
          )}
        >
          {o.glyph}
        </button>
      ))}
    </div>
  );
}

function PreviewFrame({
  children,
  align,
}: {
  children: React.ReactNode;
  align: NonNullable<ComponentPreviewProps["align"]>;
}) {
  const alignClass =
    align === "start"
      ? "items-center justify-start text-left"
      : align === "end"
        ? "items-center justify-end text-right"
        : "items-center justify-center text-center";

  return (
    <div className="relative overflow-hidden" data-slot="preview-frame">
      {/* dotted-grid canvas */}
      <div
        className="flex min-h-52 w-full bg-y2k-panel p-10"
        style={gridStyle}
      >
        {/* sparkle accent (top-left) */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-3 top-3 select-none text-sm text-y2k-ink/40"
        >
          ✦
        </span>
        <div className={cn("flex w-full", alignClass)}>{children}</div>
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
  const [currentAlign, setCurrentAlign] =
    React.useState<NonNullable<ComponentPreviewProps["align"]>>(align);

  const tabClass = (selected: boolean) =>
    cn(
      "inline-flex h-6 items-center rounded-[5px] border-2 border-y2k-ink px-2.5 text-xs font-semibold transition-colors",
      selected
        ? "bg-y2k-lemon text-y2k-ink"
        : "bg-card text-y2k-ink hover:bg-y2k-pink",
    );

  return (
    <div
      className={cn("not-prose my-6 w-full", className)}
      data-slot="component-preview"
      data-name={name}
    >
      <div className="y2k-window overflow-hidden">
        {/* ===== Title bar / tabs ===== */}
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
            className={cn("ml-2", tabClass(active === "preview"))}
          >
            Preview
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={active === "code"}
            onClick={() => setActive("code")}
            className={cn("ml-1", tabClass(active === "code"))}
          >
            Code
          </button>
        </div>

        {/* ===== Body ===== */}
        <div className="relative bg-card">
          {active === "preview" ? (
            <>
              <AlignToggle value={currentAlign} onChange={setCurrentAlign} />
              <PreviewFrame align={currentAlign}>
                {preview ?? (
                  <span className="inline-flex items-center gap-2 rounded-[6px] border-2 border-dashed border-y2k-ink/40 bg-card px-3 py-2 font-mono text-xs text-y2k-ink/70">
                    No preview slot for &ldquo;{name}&rdquo;
                  </span>
                )}
              </PreviewFrame>
            </>
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
