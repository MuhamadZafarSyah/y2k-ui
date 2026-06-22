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
import {
  CheckIcon,
  UserIcon,
  CreditCardIcon,
  SettingsIcon,
  RocketIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  {
    number: 1,
    title: "Create Account",
    description: "Set up your profile and preferences",
    icon: <UserIcon className="size-4" />,
    status: "completed" as const,
  },
  {
    number: 2,
    title: "Add Payment",
    description: "Connect your payment method",
    icon: <CreditCardIcon className="size-4" />,
    status: "current" as const,
  },
  {
    number: 3,
    title: "Configure",
    description: "Customize your workspace settings",
    icon: <SettingsIcon className="size-4" />,
    status: "upcoming" as const,
  },
  {
    number: 4,
    title: "Launch",
    description: "You're ready to go!",
    icon: <RocketIcon className="size-4" />,
    status: "upcoming" as const,
  },
]

export function OnboardingStepsBlock() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-base">Complete your setup</CardTitle>
        <CardDescription>
          Follow these steps to get started with Y2K UI. You&apos;re almost there!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress bar */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-y2k-ink">Progress</span>
          <span className="text-xs font-bold text-y2k-ink">25% complete</span>
        </div>
        <div className="h-2 w-full rounded border-2 border-y2k-ink bg-y2k-panel">
          <div
            className="h-full rounded bg-y2k-mint transition-all"
            style={{ width: "25%" }}
          />
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className={cn(
                "flex items-start gap-3 rounded border-2 p-3 transition-all",
                step.status === "current"
                  ? "border-y2k-ink bg-y2k-blue/20"
                  : step.status === "completed"
                    ? "border-y2k-ink/40 bg-y2k-mint/20"
                    : "border-y2k-ink/20 bg-card",
              )}
            >
              <div
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded border-2 border-y2k-ink text-y2k-ink",
                  step.status === "completed"
                    ? "bg-y2k-mint"
                    : step.status === "current"
                      ? "bg-y2k-blue"
                      : "bg-y2k-panel",
                )}
              >
                {step.status === "completed" ? (
                  <CheckIcon className="size-4 stroke-[3px]" />
                ) : (
                  step.icon
                )}
              </div>
              <div className="flex-1 space-y-0.5">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-y2k-ink">
                    Step {step.number}: {step.title}
                  </p>
                  {step.status === "current" && (
                    <Badge variant="blue" className="text-[10px]">
                      In progress
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-y2k-ink/70">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          Back
        </Button>
        <Button variant="blue" size="sm">
          Continue
        </Button>
      </CardFooter>
    </Card>
  )
}
