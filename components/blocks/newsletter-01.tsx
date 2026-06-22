"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MailIcon, SparklesIcon } from "lucide-react"

export function NewsletterBlock() {
  return (
    <Card className="w-full max-w-md bg-y2k-blue/10">
      <CardHeader className="text-center">
        <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded border-2 border-y2k-ink bg-y2k-pink text-y2k-ink">
          <MailIcon className="size-6" />
        </div>
        <CardTitle className="text-xl">Stay in the loop</CardTitle>
        <CardDescription>
          Get the latest updates, tips, and exclusive offers delivered to your
          inbox.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            type="email"
            placeholder="you@example.com"
            className="flex-1"
            leadingIcon={<MailIcon />}
          />
          <Button variant="pink">Subscribe</Button>
        </div>
        <div className="flex items-center justify-center gap-2 text-xs text-y2k-ink/60">
          <SparklesIcon className="size-3" />
          <span>Join 2,500+ subscribers. No spam, ever.</span>
        </div>
        <div className="flex justify-center gap-1.5">
          <Badge variant="mint">Weekly digest</Badge>
          <Badge variant="lemon">Free resources</Badge>
          <Badge variant="lilac">Early access</Badge>
        </div>
      </CardContent>
    </Card>
  )
}
