"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./code-block";
import { Minus, Square } from "lucide-react";

export type ComponentPreviewProps = {
  name: string;
  align?: "start" | "center" | "end";
  className?: string;
  preview?: React.ReactNode;
  source?: string;
};

/* Retro Grid + Soft Gradient background */
const gridStyle: React.CSSProperties = {
  backgroundImage: "radial-gradient(#1b1b3a26 1.5px, transparent 1.5px), linear-gradient(135deg, rgba(182, 156, 255, 0.15) 0%, rgba(142, 209, 252, 0.15) 100%)",
  backgroundSize: "16px 16px, 100% 100%",
  backgroundPosition: "-1px -1px, 0 0",
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
    <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-[6px] border-2 border-y2k-ink bg-card p-1 shadow-[2px_2px_0px_#1b1b3a] md:flex">
      {opts.map((o) => (
        <button
          key={o.key}
          type="button"
          aria-label={o.label}
          aria-pressed={value === o.key}
          onClick={() => onChange(o.key)}
          className={cn(
            "flex h-6 px-2 items-center justify-center rounded-lg border border-transparent font-mono text-[10px] font-bold text-y2k-ink transition-all active:scale-95",
            value === o.key
              ? "bg-y2k-lemon border-y2k-ink shadow-[1px_1px_0px_#1b1b3a]"
              : "hover:bg-y2k-panel hover:border-y2k-ink/40",
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
  maximized,
}: {
  children: React.ReactNode;
  align: NonNullable<ComponentPreviewProps["align"]>;
  maximized: boolean;
}) {
  const alignClass =
    align === "start"
      ? "items-center justify-start text-left"
      : align === "end"
        ? "items-center justify-end text-right"
        : "items-center justify-center text-center";

  return (
    <div className="relative overflow-hidden" data-slot="preview-frame">
      <div
        className={cn(
          "flex w-full transition-all duration-300 ease-in-out border-b-2 border-y2k-ink bg-y2k-panel",
          maximized ? "min-h-95 p-16" : "min-h-56 p-10"
        )}
        style={gridStyle}
      >
        {/* Y2K decorative star elements */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-3 top-3 select-none text-base text-y2k-ink/60 animate-pulse"
        >
          ✦
        </span>
        <span
          aria-hidden
          className="pointer-events-none absolute right-3 bottom-3 select-none text-xs text-y2k-ink/50"
        >
          ★
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

  // Interactive window controls
  const [minimized, setMinimized] = React.useState(false);
  const [maximized, setMaximized] = React.useState(false);
  const [closed, setClosed] = React.useState(false);

  const tabClass = (selected: boolean) =>
    cn(
      "inline-flex h-7 items-center rounded-t-[6px] border-2 border-b-0 border-y2k-ink px-4 text-xs font-bold transition-all relative top-[2px] ",
      selected
        ? "bg-card text-y2k-ink border-b-card shadow-[0_2px_0px_#fff]"
        : "bg-y2k-panel/85 text-y2k-ink hover:bg-y2k-pink/80 hover:translate-y-[-1px]",
    );

  if (closed) {
    return (
      <div className={cn("not-prose my-6 w-full", className)}>
        <div className="y2k-window p-6 bg-y2k-panel border-2 border-y2k-ink shadow-none flex flex-col items-center justify-center text-center gap-3">
          <div className="w-12 h-12 rounded-full border-2 border-y2k-ink bg-y2k-pink flex items-center justify-center text-lg font-bold text-y2k-ink animate-bounce">
            ✕
          </div>
          <div>
            <h4 className="font-bold text-y2k-ink text-sm">Preview Window Closed</h4>
            <p className="text-xs text-y2k-ink-muted mt-1">You closed the preview for &ldquo;{name}&rdquo;</p>
          </div>
          <button
            type="button"
            onClick={() => setClosed(false)}
            className="inline-flex h-8 items-center rounded border-2 border-y2k-ink bg-y2k-lemon px-4 text-xs font-bold text-y2k-ink transition-all hover:bg-y2k-mint hover:-translate-y-px active:scale-95 shadow-[2px_2px_0px_#1b1b3a]"
          >
            Restore Preview ↺
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn("not-prose my-6 w-full select-none", className)}
      data-slot="component-preview"
      data-name={name}
    >
      <div className="y2k-window overflow-hidden border-2 border-y2k-ink bg-card shadow-none">

        {/* ===== Retro Window Title Bar ===== */}
        <div className="flex items-center justify-between border-bottom-2 border-y2k-ink bg-y2k-blue px-3 py-1.5 border-b-2">

          {/* Left: Window Dots + Title */}
          <div className="flex items-center gap-2">
            <span className="y2k-title-dots" aria-hidden>
              <span className="rounded-full w-2 h-2" />
              <span className="rounded-full w-2 h-2" />
              <span className="rounded-full w-2 h-2" />
            </span>
            <span className="font-mono text-xs font-black text-y2k-ink select-none tracking-tight">
              {name}.app
            </span>
          </div>

          {/* Right: Retro Window Control Buttons [_ ▢ ✕] */}
          <div className="flex items-center gap-1">

            {/* Maximize button */}
            <button
              type="button"
              onClick={() => setMaximized(!maximized)}
              aria-label="Maximize"
              className={cn(
                "w-5 h-5 rounded border border-y2k-ink bg-card text-y2k-ink flex items-center justify-center font-mono hover:bg-y2k-mint hover:scale-105 active:scale-95 transition-all shadow-[1px_1px_0px_rgba(27,27,58,0.7)]"
              )}
            >
              <Square className="w-2 h-2 stroke-[3px]" />
            </button>
            {/* Minimize button */}
            <button
              type="button"
              onClick={() => setMinimized(!minimized)}
              aria-label="Minimize"
              className={cn(
                "w-5 h-5 rounded border border-y2k-ink bg-y2k-pink text-y2k-ink flex items-center justify-center font-mono text-[10px] font-extrabold hover:bg-red-400 hover:scale-105 active:scale-95 transition-all shadow-[1px_1px_0px_rgba(27,27,58,0.7)]"
              )}
            >
              <Minus className="w-2.5 h-2.5 stroke-[3px]" />
            </button>
            {/* Close button */}
            {/* <button
              type="button"
              onClick={() => setClosed(true)}
              aria-label="Close"
              className={cn(
                "w-5 h-5 rounded border border-y2k-ink bg-y2k-pink text-y2k-ink flex items-center justify-center font-mono text-[10px] font-extrabold hover:bg-red-400 hover:scale-105 active:scale-95 transition-all shadow-[1px_1px_0px_rgba(27,27,58,0.7)]"
              )}
            >
              ✕
            </button> */}
          </div>
        </div>

        {/* ===== Tab selectors (Preview & Code) nested right below title bar ===== */}
        <div className="flex items-end border-b-2 border-y2k-ink bg-y2k-panel px-3 pt-1 gap-1">
          <button
            type="button"
            role="tab"
            aria-selected={active === "preview"}
            onClick={() => {
              setActive("preview");
              if (minimized) setMinimized(false); // restore if minimized when switching
            }}
            className={tabClass(active === "preview")}
          >
            Preview
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={active === "code"}
            onClick={() => {
              setActive("code");
              if (minimized) setMinimized(false); // restore if minimized when switching
            }}
            className={tabClass(active === "code")}
          >
            Code
          </button>
        </div>

        {/* ===== Window Body ===== */}
        <div
          className={cn(
            "relative transition-all duration-500 ease-in-out bg-card overflow-hidden",
            minimized
              ? "max-h-0 "
              : "max-h-300 "
          )}
        >
          {active === "preview" ? (
            <>
              <AlignToggle value={currentAlign} onChange={setCurrentAlign} />
              <PreviewFrame align={currentAlign} maximized={maximized}>
                {preview ?? (
                  <span className="inline-flex items-center gap-2 rounded-[6px] border-2 border-dashed border-y2k-ink/55 bg-card px-4 py-2 font-mono text-xs text-y2k-ink-muted">
                    No preview slot for &ldquo;{name}&rdquo;
                  </span>
                )}
              </PreviewFrame>
            </>
          ) : (
            <div className="[&_pre]:select-text [&_code]:select-text [&_*]:!select-text">
              <CodeBlock
                code={source || "// source not available"}
                language="tsx"
                filename={`${name}.tsx`}
                className="my-0! rounded-none border-0"
                showLineNumbers
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
