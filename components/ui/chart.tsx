"use client"

import * as React from "react"
import {
  BarChart as RechartsBarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { cn } from "@/lib/utils"

/* ─── Y2K Color Palette ─── */

const Y2K_COLORS = {
  blue: "#8ed1fc",
  pink: "#ff8fcf",
  lilac: "#b69cff",
  mint: "#8ff0d0",
  lemon: "#ffe45e",
  ink: "#1b1b3a",
  panel: "#d7dde8",
}

const CHART_PALETTE = [
  Y2K_COLORS.blue,
  Y2K_COLORS.pink,
  Y2K_COLORS.lilac,
  Y2K_COLORS.mint,
  Y2K_COLORS.lemon,
]

/* ─── Custom Tooltip ─── */

function Y2KTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-md border-2 border-y2k-ink bg-card px-3 py-2 shadow-[3px_3px_0_var(--y2k-ink)]">
      {label && (
        <p className="mb-1 text-xs font-bold text-y2k-ink">{label}</p>
      )}
      {payload.map((entry: any, i: number) => (
        <div key={i} className="flex items-center gap-2 text-xs">
          <span
            className="h-2.5 w-2.5 rounded-sm border border-y2k-ink"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-y2k-ink/70">{entry.name}:</span>
          <span className="font-bold text-y2k-ink">{entry.value}</span>
        </div>
      ))}
    </div>
  )
}

/* ─── Shared Window Wrapper ─── */

function ChartWindow({
  title,
  children,
  className,
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn("y2k-window overflow-hidden", className)}
      data-slot="chart"
    >
      <div className="y2k-window-title">
        <span className="y2k-title-dots" aria-hidden>
          <span /><span /><span />
        </span>
        <span className="ml-2 text-xs font-bold">{title}</span>
      </div>
      <div className="bg-card p-4">{children}</div>
    </div>
  )
}

/* ─── Bar Chart ─── */

export type BarChartProps = {
  data: { label: string; value: number; color?: string }[]
  className?: string
  height?: number
  showGrid?: boolean
  showTooltip?: boolean
}

function BarChart({
  data,
  className,
  height = 280,
  showGrid = true,
  showTooltip = true,
}: BarChartProps) {
  return (
    <ChartWindow title="Bar Chart" className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={Y2K_COLORS.ink}
              strokeOpacity={0.15}
            />
          )}
          <XAxis
            dataKey="label"
            tick={{ fill: Y2K_COLORS.ink, fontSize: 11, fontWeight: 600 }}
            axisLine={{ stroke: Y2K_COLORS.ink, strokeWidth: 2 }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: Y2K_COLORS.ink, fontSize: 11, fontWeight: 600 }}
            axisLine={{ stroke: Y2K_COLORS.ink, strokeWidth: 2 }}
            tickLine={false}
          />
          {showTooltip && <Tooltip content={<Y2KTooltip />} />}
          <Bar
            dataKey="value"
            radius={[4, 4, 0, 0]}
            stroke={Y2K_COLORS.ink}
            strokeWidth={2}
          >
            {data.map((entry, i) => (
              <Cell
                key={i}
                fill={entry.color || CHART_PALETTE[i % CHART_PALETTE.length]}
              />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </ChartWindow>
  )
}

/* ─── Line Chart ─── */

export type LineChartProps = {
  data: { label: string; value: number; value2?: number }[]
  className?: string
  height?: number
  color?: string
  showArea?: boolean
  showGrid?: boolean
  showTooltip?: boolean
}

function LineChart({
  data,
  className,
  height = 280,
  color = Y2K_COLORS.pink,
  showArea = true,
  showGrid = true,
  showTooltip = true,
}: LineChartProps) {
  return (
    <ChartWindow title="Line Chart" className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={Y2K_COLORS.ink}
              strokeOpacity={0.15}
            />
          )}
          <XAxis
            dataKey="label"
            tick={{ fill: Y2K_COLORS.ink, fontSize: 11, fontWeight: 600 }}
            axisLine={{ stroke: Y2K_COLORS.ink, strokeWidth: 2 }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: Y2K_COLORS.ink, fontSize: 11, fontWeight: 600 }}
            axisLine={{ stroke: Y2K_COLORS.ink, strokeWidth: 2 }}
            tickLine={false}
          />
          {showTooltip && <Tooltip content={<Y2KTooltip />} />}
          <Line
            type="monotone"
            dataKey="value"
            stroke={Y2K_COLORS.ink}
            strokeWidth={3}
            dot={{
              r: 5,
              fill: Y2K_COLORS.lemon,
              stroke: Y2K_COLORS.ink,
              strokeWidth: 2,
            }}
            activeDot={{
              r: 7,
              fill: Y2K_COLORS.pink,
              stroke: Y2K_COLORS.ink,
              strokeWidth: 2,
            }}
          />
          {showArea && (
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={false}
              activeDot={false}
            />
          )}
        </RechartsLineChart>
      </ResponsiveContainer>
    </ChartWindow>
  )
}

/* ─── Donut Chart ─── */

export type DonutChartProps = {
  data: { label: string; value: number; color?: string }[]
  className?: string
  size?: number
  showTooltip?: boolean
}

function DonutChart({
  data,
  className,
  size = 280,
  showTooltip = true,
}: DonutChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0)

  return (
    <ChartWindow title="Donut Chart" className={className}>
      <div className="flex items-center gap-6">
        <ResponsiveContainer width={size} height={size}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="50%"
              outerRadius="80%"
              paddingAngle={3}
              dataKey="value"
              stroke={Y2K_COLORS.ink}
              strokeWidth={2}
            >
              {data.map((entry, i) => (
                <Cell
                  key={i}
                  fill={entry.color || CHART_PALETTE[i % CHART_PALETTE.length]}
                />
              ))}
            </Pie>
            {showTooltip && <Tooltip content={<Y2KTooltip />} />}
          </PieChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="flex flex-col gap-2">
          {data.map((item, i) => {
            const color = item.color || CHART_PALETTE[i % CHART_PALETTE.length]
            const pct = ((item.value / total) * 100).toFixed(0)
            return (
              <div key={i} className="flex items-center gap-2.5">
                <span
                  className="h-4 w-4 rounded-sm border-2 border-y2k-ink"
                  style={{ backgroundColor: color }}
                />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-y2k-ink">
                    {item.label}
                  </span>
                  <span className="font-mono text-[10px] text-y2k-ink/60">
                    {item.value} ({pct}%)
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </ChartWindow>
  )
}

export { BarChart, DonutChart, LineChart }
