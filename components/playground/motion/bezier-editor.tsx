"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface BezierEditorProps {
  value: string // e.g. "cubic-bezier(0.34, 1.56, 0.64, 1)"
  onChange: (value: string) => void
  className?: string
}

export function BezierEditor({ value, onChange, className }: BezierEditorProps) {
  const svgRef = React.useRef<SVGSVGElement>(null)
  const [dragging, setDragging] = React.useState<1 | 2 | null>(null)
  const [focusedHandle, setFocusedHandle] = React.useState<1 | 2 | null>(null)

  // Parse cubic-bezier values
  // Expected: cubic-bezier(x1, y1, x2, y2)
  const parseBezier = (bezierStr: string): [number, number, number, number] => {
    const match = bezierStr.match(/cubic-bezier\(\s*([^,\s]+)\s*,\s*([^,\s]+)\s*,\s*([^,\s]+)\s*,\s*([^,\s]+)\s*\)/)
    if (match) {
      return [
        parseFloat(match[1]),
        parseFloat(match[2]),
        parseFloat(match[3]),
        parseFloat(match[4]),
      ]
    }
    return [0.25, 0.1, 0.25, 1] // default fallback (ease)
  }

  const [x1, y1, x2, y2] = parseBezier(value)

  // Coordinates mapping
  // SVG size is 200x200
  // X is [0, 1] -> [0, 200]
  // Y is [-0.5, 1.5] -> [200, 0]
  const toSvgCoords = (x: number, y: number): [number, number] => {
    const px = x * 200
    const py = 200 - (y + 0.5) * 100
    return [px, py]
  }

  const toValueCoords = (px: number, py: number): [number, number] => {
    const x = Math.max(0, Math.min(1, px / 200))
    const y = Math.max(-0.5, Math.min(1.5, (200 - py) / 100 - 0.5))
    // Round to 2 decimals
    return [Math.round(x * 100) / 100, Math.round(y * 100) / 100]
  }

  const [px1, py1] = toSvgCoords(x1, y1)
  const [px2, py2] = toSvgCoords(x2, y2)

  const handlePointerDown = (handle: 1 | 2, e: React.PointerEvent<SVGCircleElement>) => {
    e.preventDefault()
    e.currentTarget.setPointerCapture(e.pointerId)
    setDragging(handle)
    setFocusedHandle(handle)
  }

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (dragging === null) return
    e.preventDefault()
    const rect = svgRef.current?.getBoundingClientRect()
    if (!rect) return

    const px = e.clientX - rect.left
    const py = e.clientY - rect.top
    const [x, y] = toValueCoords(px, py)

    if (dragging === 1) {
      onChange(`cubic-bezier(${x}, ${y}, ${x2}, ${y2})`)
    } else {
      onChange(`cubic-bezier(${x1}, ${y1}, ${x}, ${y})`)
    }
  }

  const handlePointerUp = () => {
    if (dragging !== null) {
      setDragging(null)
    }
  }

  const handleKeyDown = (handle: 1 | 2, e: React.KeyboardEvent) => {
    let nx1 = x1
    let ny1 = y1
    let nx2 = x2
    let ny2 = y2
    const step = e.shiftKey ? 0.05 : 0.01

    switch (e.key) {
      case "ArrowLeft":
        if (handle === 1) nx1 = Math.max(0, x1 - step)
        else nx2 = Math.max(0, x2 - step)
        e.preventDefault()
        break
      case "ArrowRight":
        if (handle === 1) nx1 = Math.min(1, x1 + step)
        else nx2 = Math.min(1, x2 + step)
        e.preventDefault()
        break
      case "ArrowUp":
        if (handle === 1) ny1 = Math.min(1.5, y1 + step)
        else ny2 = Math.min(1.5, y2 + step)
        e.preventDefault()
        break
      case "ArrowDown":
        if (handle === 1) ny1 = Math.max(-0.5, y1 - step)
        else ny2 = Math.max(-0.5, y2 - step)
        e.preventDefault()
        break
      default:
        return
    }

    onChange(`cubic-bezier(${Math.round(nx1 * 100) / 100}, ${Math.round(ny1 * 100) / 100}, ${Math.round(nx2 * 100) / 100}, ${Math.round(ny2 * 100) / 100})`)
  }

  const presetEasings = [
    { label: "Ease In Out", value: "cubic-bezier(0.42, 0, 0.58, 1)" },
    { label: "Y2K Spring", value: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
    { label: "Kawaii Swift", value: "cubic-bezier(0.4, 0, 0.2, 1)" },
    { label: "Retro Bounce", value: "cubic-bezier(0.175, 0.885, 0.32, 1.275)" },
  ]

  return (
    <div className={cn("flex flex-col gap-4 p-4 border-2 border-y2k-ink rounded-lg bg-white", className)}>
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-xs text-y2k-ink uppercase tracking-wider">Timing Curve</h4>
        <span className="font-mono text-[10px] bg-y2k-panel border border-y2k-ink px-1.5 py-0.5 rounded text-y2k-ink">
          {value}
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* SVG Editor Grid */}
        <div className="relative border-2 border-y2k-ink rounded-md bg-[#f7f8fc] size-[204px]" style={{ touchAction: "none" }}>
          <svg
            ref={svgRef}
            width="200"
            height="200"
            className="overflow-visible select-none cursor-crosshair"
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            {/* Grid Helper Lines */}
            {/* Y = 1 line */}
            <line x1="0" y1="50" x2="200" y2="50" stroke="#1b1b3a" strokeWidth="1" strokeDasharray="3,3" opacity="0.3" />
            <text x="5" y="45" fill="#1b1b3a" fontSize="8" className="font-mono" opacity="0.5">y = 1.0 (Progression)</text>

            {/* Y = 0 line */}
            <line x1="0" y1="150" x2="200" y2="150" stroke="#1b1b3a" strokeWidth="1" strokeDasharray="3,3" opacity="0.3" />
            <text x="5" y="145" fill="#1b1b3a" fontSize="8" className="font-mono" opacity="0.5">y = 0.0 (Start)</text>

            {/* X = 0 and X = 1 lines */}
            <line x1="0" y1="0" x2="0" y2="200" stroke="#1b1b3a" strokeWidth="1" opacity="0.1" />
            <line x1="200" y1="0" x2="200" y2="200" stroke="#1b1b3a" strokeWidth="1" opacity="0.1" />

            {/* Curve path */}
            <path
              d={`M 0 150 C ${px1} ${py1} ${px2} ${py2} 200 50`}
              fill="none"
              stroke="#b69cff"
              strokeWidth="3.5"
            />

            {/* Connection Handles */}
            <line x1="0" y1="150" x2={px1} y2={py1} stroke="#1b1b3a" strokeWidth="1.5" strokeDasharray="2,2" />
            <line x1="200" y1="50" x2={px2} y2={py2} stroke="#1b1b3a" strokeWidth="1.5" strokeDasharray="2,2" />

            {/* Start and End Circles */}
            <circle cx="0" cy="150" r="4" fill="#1b1b3a" />
            <circle cx="200" cy="50" r="4" fill="#1b1b3a" />

            {/* Drag Handle P1 */}
            <circle
              cx={px1}
              cy={py1}
              r="7"
              fill="#ffe45e"
              stroke="#1b1b3a"
              strokeWidth="2"
              className={cn(
                "cursor-pointer focus:scale-125 focus:fill-y2k-pink transition-transform outline-none focus:stroke-3",
                dragging === 1 && "scale-125 fill-y2k-pink"
              )}
              tabIndex={0}
              onPointerDown={(e) => handlePointerDown(1, e)}
              onKeyDown={(e) => handleKeyDown(1, e)}
              onFocus={() => setFocusedHandle(1)}
              onBlur={() => setFocusedHandle(null)}
              aria-label="Bezier Control Point 1"
            />

            {/* Drag Handle P2 */}
            <circle
              cx={px2}
              cy={py2}
              r="7"
              fill="#ffe45e"
              stroke="#1b1b3a"
              strokeWidth="2"
              className={cn(
                "cursor-pointer focus:scale-125 focus:fill-y2k-pink transition-transform outline-none focus:stroke-3",
                dragging === 2 && "scale-125 fill-y2k-pink"
              )}
              tabIndex={0}
              onPointerDown={(e) => handlePointerDown(2, e)}
              onKeyDown={(e) => handleKeyDown(2, e)}
              onFocus={() => setFocusedHandle(2)}
              onBlur={() => setFocusedHandle(null)}
              aria-label="Bezier Control Point 2"
            />
          </svg>
        </div>

        {/* Easing Quick Presets */}
        <div className="flex flex-col gap-2 w-full">
          <div className="text-[10px] font-black text-y2k-ink/50 uppercase tracking-wider">Presets</div>
          <div className="grid grid-cols-2 gap-1.5">
            {presetEasings.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => onChange(p.value)}
                className={cn(
                  "px-2.5 py-1.5 text-left border-2 border-y2k-ink rounded text-xs font-mono font-bold leading-tight transition-all active:scale-95",
                  value === p.value
                    ? "bg-y2k-mint"
                    : "bg-white hover:bg-y2k-panel"
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="text-[9px] font-mono text-y2k-ink-muted leading-relaxed mt-1">
            * Tab to select handles, use arrow keys (Shift for larger steps) to edit precisely.
          </div>
        </div>
      </div>
    </div>
  )
}
