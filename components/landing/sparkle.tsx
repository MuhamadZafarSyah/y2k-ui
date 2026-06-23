"use client";

export function SparkleSprinkle({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className={`size-4 text-y2k-lemon ${className ?? ""}`}
      style={style}
      aria-hidden
    >
      <path d="M10 0l1.5 6.5L18 8l-6.5 1.5L10 16l-1.5-6.5L2 8l6.5-1.5L10 0z" />
    </svg>
  );
}
