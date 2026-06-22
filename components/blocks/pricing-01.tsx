"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckIcon } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: "$9",
    description: "Perfect for side projects and personal use.",
    color: "bg-y2k-panel",
    features: [
      "5 projects",
      "Basic analytics",
      "Community support",
      "1 GB storage",
    ],
    cta: "Get Started",
    variant: "outline" as const,
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    description: "For professionals and growing teams.",
    color: "bg-y2k-blue",
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "50 GB storage",
      "Custom domains",
      "Team collaboration",
    ],
    cta: "Upgrade to Pro",
    variant: "blue" as const,
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    description: "For large organizations with custom needs.",
    color: "bg-y2k-lilac",
    features: [
      "Everything in Pro",
      "Dedicated support",
      "SLA guarantee",
      "Unlimited storage",
      "SSO & SAML",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    variant: "lilac" as const,
    popular: false,
  },
]

export function PricingCardsBlock() {
  return (
    <div className="w-full max-w-4xl">
      <div className="mb-6 text-center">
        <Badge variant="pink" className="mb-2">
          Pricing
        </Badge>
        <h2 className="text-2xl font-black text-y2k-ink">
          Simple, transparent pricing
        </h2>
        <p className="mt-1 text-sm text-y2k-ink/60">
          Choose the plan that fits your needs. No hidden fees.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative flex flex-col ${
              plan.popular ? "border-y2k-ink border-[3px]" : ""
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge variant="lemon">Most Popular</Badge>
              </div>
            )}
            <CardHeader>
              <div
                className={`mb-2 inline-flex size-8 items-center justify-center rounded border-2 border-y2k-ink ${plan.color} text-xs font-bold text-y2k-ink`}
              >
                {plan.name[0]}
              </div>
              <CardTitle className="text-base">{plan.name}</CardTitle>
              <CardDescription className="text-xs">
                {plan.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="mb-4">
                <span className="text-3xl font-black text-y2k-ink">
                  {plan.price}
                </span>
                <span className="text-xs text-y2k-ink/60">/month</span>
              </div>
              <Separator className="mb-4" />
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-xs text-y2k-ink"
                  >
                    <span className="flex size-4 items-center justify-center rounded border border-y2k-ink bg-y2k-mint text-y2k-ink">
                      <CheckIcon className="size-2.5 stroke-[3px]" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={plan.variant}>
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
