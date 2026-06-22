"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  CloudIcon,
  SunIcon,
  CloudRainIcon,
  WindIcon,
  DropletsIcon,
  EyeIcon,
  ThermometerIcon,
} from "lucide-react"

const forecast = [
  { day: "Mon", temp: "24°", icon: <SunIcon className="size-5" />, color: "bg-y2k-lemon" },
  { day: "Tue", temp: "22°", icon: <CloudIcon className="size-5" />, color: "bg-y2k-blue" },
  { day: "Wed", temp: "19°", icon: <CloudRainIcon className="size-5" />, color: "bg-y2k-lilac" },
  { day: "Thu", temp: "21°", icon: <SunIcon className="size-5" />, color: "bg-y2k-lemon" },
  { day: "Fri", temp: "23°", icon: <CloudIcon className="size-5" />, color: "bg-y2k-mint" },
]

export function WeatherWidgetBlock() {
  return (
    <Card className="w-full max-w-sm bg-y2k-blue/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Tokyo, Japan</CardTitle>
          <Badge variant="mint">Live</Badge>
        </div>
        <p className="text-xs text-y2k-ink/60">Monday, March 15, 2025</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Weather */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-black text-y2k-ink">24°</span>
              <span className="text-sm text-y2k-ink/60">C</span>
            </div>
            <p className="text-sm font-semibold text-y2k-ink">Partly Cloudy</p>
            <p className="text-xs text-y2k-ink/60">Feels like 26°</p>
          </div>
          <div className="flex size-20 items-center justify-center rounded border-2 border-y2k-ink bg-y2k-lemon text-y2k-ink">
            <SunIcon className="size-10" />
          </div>
        </div>

        <Separator />

        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 rounded border-2 border-y2k-ink bg-card px-2.5 py-2">
            <WindIcon className="size-4 text-y2k-ink/70" />
            <div>
              <p className="text-[10px] text-y2k-ink/60">Wind</p>
              <p className="text-xs font-bold text-y2k-ink">12 km/h</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded border-2 border-y2k-ink bg-card px-2.5 py-2">
            <DropletsIcon className="size-4 text-y2k-ink/70" />
            <div>
              <p className="text-[10px] text-y2k-ink/60">Humidity</p>
              <p className="text-xs font-bold text-y2k-ink">65%</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded border-2 border-y2k-ink bg-card px-2.5 py-2">
            <EyeIcon className="size-4 text-y2k-ink/70" />
            <div>
              <p className="text-[10px] text-y2k-ink/60">Visibility</p>
              <p className="text-xs font-bold text-y2k-ink">10 km</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded border-2 border-y2k-ink bg-card px-2.5 py-2">
            <ThermometerIcon className="size-4 text-y2k-ink/70" />
            <div>
              <p className="text-[10px] text-y2k-ink/60">Pressure</p>
              <p className="text-xs font-bold text-y2k-ink">1013 hPa</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* 5-Day Forecast */}
        <div>
          <p className="mb-2 text-xs font-bold text-y2k-ink">5-Day Forecast</p>
          <div className="flex justify-between">
            {forecast.map((day) => (
              <div
                key={day.day}
                className="flex flex-col items-center gap-1 rounded border-2 border-y2k-ink bg-card px-2 py-1.5"
              >
                <span className="text-[10px] font-semibold text-y2k-ink/60">
                  {day.day}
                </span>
                <div
                  className={`flex size-7 items-center justify-center rounded border border-y2k-ink ${day.color} text-y2k-ink`}
                >
                  {day.icon}
                </div>
                <span className="text-xs font-bold text-y2k-ink">
                  {day.temp}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
