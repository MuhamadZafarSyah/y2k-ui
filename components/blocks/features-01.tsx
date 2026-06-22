"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  ZapIcon,
  ShieldIcon,
  PaletteIcon,
  CodeIcon,
  SmartphoneIcon,
  GlobeIcon,
} from "lucide-react"

const features = [
  {
    icon: <ZapIcon className="size-5" />,
    title: "Lightning Fast",
    description: "Optimized for performance with minimal bundle size and fast rendering.",
    color: "bg-y2k-lemon",
  },
  {
    icon: <ShieldIcon className="size-5" />,
    title: "Accessible by Default",
    description: "Built on Radix UI primitives with full keyboard navigation and ARIA support.",
    color: "bg-y2k-mint",
  },
  {
    icon: <PaletteIcon className="size-5" />,
    title: "Customizable",
    description: "CSS custom properties make theming and customization a breeze.",
    color: "bg-y2k-pink",
  },
  {
    icon: <CodeIcon className="size-5" />,
    title: "TypeScript First",
    description: "Full type definitions for every component with excellent IDE support.",
    color: "bg-y2k-blue",
  },
  {
    icon: <SmartphoneIcon className="size-5" />,
    title: "Responsive Design",
    description: "Every component is mobile-first and works beautifully on all screen sizes.",
    color: "bg-y2k-lilac",
  },
  {
    icon: <GlobeIcon className="size-5" />,
    title: "Open Source",
    description: "Free and open-source under the MIT license. Use it anywhere.",
    color: "bg-y2k-lemon",
  },
]

export function FeatureGridBlock() {
  return (
    <div className="w-full max-w-4xl">
      <div className="mb-8 text-center">
        <Badge variant="blue" className="mb-2">
          Features
        </Badge>
        <h2 className="text-2xl font-black text-y2k-ink">
          Everything you need to build amazing interfaces
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-y2k-ink/60">
          Y2K UI provides a comprehensive set of components designed for modern
          web development with a unique retro-future aesthetic.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="transition-all hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_#1b1b3a]"
          >
            <CardContent className="pt-6">
              <div
                className={`mb-3 flex size-10 items-center justify-center rounded border-2 border-y2k-ink ${feature.color} text-y2k-ink`}
              >
                {feature.icon}
              </div>
              <h3 className="mb-1 text-sm font-bold text-y2k-ink">
                {feature.title}
              </h3>
              <p className="text-xs leading-relaxed text-y2k-ink/70">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
