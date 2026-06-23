"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Copy, Check, ArrowUpRight, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/components/animations/use-gsap-reveal";
import { SparkleSprinkle } from "@/components/landing/sparkle";

export function CTA() {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const cmd = "npx y2k-ui-lib@latest init";

  const handleCopy = () => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const headingRef = useScrollReveal({ y: 20, delay: 0.1 });
  const cmdRef = useScrollReveal({ y: 12, delay: 0.25 });
  const btnRef = useScrollReveal({ y: 12, delay: 0.35 });

  return (
    <section className="relative overflow-hidden border-b-2 border-y2k-ink py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 flex">
        <div className="h-full w-full bg-[radial-gradient(var(--y2k-ink)_1px,transparent_1px)] bg-size-[20px_20px] opacity-[0.03]" />
      </div>

      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          <SparkleSprinkle className="absolute left-[10%] top-[30%] size-6 animate-wiggle text-y2k-lemon" style={{ animationDelay: '0.3s' }} />
          <SparkleSprinkle className="absolute right-[15%] bottom-[35%] size-5 animate-wiggle text-y2k-pink" style={{ animationDelay: '1.2s' }} />
        </div>
      )}

      <div className="relative mx-auto max-w-6xl px-4 text-center">
        <div className="mx-auto max-w-xl">
          {mounted && (
            <div className="mb-4 flex justify-center gap-3">
              <img src="/assets/images/7.svg" alt="" width={40} height={40} className="size-10 object-contain opacity-30" aria-hidden />
            </div>
          )}

          <div ref={headingRef} style={{ visibility: "hidden" }}>
            <h2 className="text-xl font-black tracking-tight text-y2k-ink md:text-2xl">Ready to Build?</h2>
            <p className="mt-2 text-sm text-y2k-ink-muted">Start with one command - no config needed.</p>
          </div>

          <div ref={cmdRef} className="mt-6 flex items-center justify-between gap-2 rounded border-2 border-y2k-ink bg-y2k-panel/50 px-3 py-2.5 text-left font-mono text-sm text-y2k-ink" style={{ visibility: "hidden" }}>
            <span className="truncate">{cmd}</span>
            <button onClick={handleCopy} className="shrink-0 rounded border-2 border-y2k-ink bg-white p-1.5 text-y2k-ink hover:bg-y2k-mint transition-colors" aria-label={copied ? "Copied" : "Copy command"}>
              {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            </button>
          </div>

          <div ref={btnRef} className="mt-6" style={{ visibility: "hidden" }}>
            <Link href="/docs/installation">
              <Button variant="lemon">
                <Terminal className="size-4" />
                Get Started
                <ArrowUpRight className="size-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
