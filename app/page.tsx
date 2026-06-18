import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-[60vh] flex-1 items-center justify-center p-8">
      <div className="y2k-window w-full max-w-xl">
        <div className="y2k-window-title">
          <span className="y2k-title-dots" aria-hidden>
            <span />
            <span />
            <span />
          </span>
          <span>Y2K UI — welcome.app</span>
        </div>
        <div className="space-y-4 p-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Modern Y2K / kawaii-retro components.
          </h1>
          <p className="text-y2k-ink/80">
            Flat windows, thick navy outlines, pastel fills. Built on top of
            shadcn primitives + Radix UI. Browse the docs to see what we have
            so far.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/docs"
              className="inline-flex h-9 items-center rounded border-2 border-y2k-ink bg-y2k-lemon px-4 text-sm font-semibold text-y2k-ink transition-colors hover:bg-y2k-pink"
            >
              Read the docs →
            </Link>
            <Link
              href="/docs/button"
              className="inline-flex h-9 items-center rounded border-2 border-y2k-ink bg-card px-4 text-sm font-semibold text-y2k-ink transition-colors hover:bg-y2k-mint"
            >
              Button example
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
