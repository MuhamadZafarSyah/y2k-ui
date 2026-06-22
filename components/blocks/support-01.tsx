"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  MailIcon,
  MessageCircleIcon,
  HelpCircleIcon,
} from "lucide-react"

export function SupportCenterBlock() {
  return (
    <div className="w-full max-w-3xl space-y-4">
      {/* Header */}
      <Card className="bg-y2k-blue/20">
        <CardContent className="flex flex-col items-center gap-4 py-8 text-center sm:flex-row sm:text-left">
          <div className="flex size-14 shrink-0 items-center justify-center rounded border-2 border-y2k-ink bg-y2k-blue text-y2k-ink">
            <HelpCircleIcon className="size-7" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-black text-y2k-ink">
              How can we help?
            </h2>
            <p className="mt-1 text-sm text-y2k-ink/70">
              Search our knowledge base or browse categories below.
            </p>
          </div>
          <div className="w-full sm:w-64">
            <Input placeholder="Search for help..." leadingIcon={<MailIcon />} />
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          {
            icon: <MessageCircleIcon className="size-4" />,
            title: "Live Chat",
            desc: "Chat with our support team",
            color: "bg-y2k-mint",
          },
          {
            icon: <MailIcon className="size-4" />,
            title: "Email Us",
            desc: "Get a response within 24h",
            color: "bg-y2k-pink",
          },
          {
            icon: <HelpCircleIcon className="size-4" />,
            title: "FAQ",
            desc: "Browse common questions",
            color: "bg-y2k-lemon",
          },
        ].map((item) => (
          <Card
            key={item.title}
            className="cursor-pointer transition-all hover:-translate-y-0.5"
          >
            <CardContent className="flex items-center gap-3 py-4">
              <div
                className={`flex size-9 shrink-0 items-center justify-center rounded border-2 border-y2k-ink ${item.color} text-y2k-ink`}
              >
                {item.icon}
              </div>
              <div>
                <p className="text-sm font-bold text-y2k-ink">{item.title}</p>
                <p className="text-xs text-y2k-ink/60">{item.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Frequently Asked Questions</CardTitle>
            <Badge variant="lilac">12 articles</Badge>
          </div>
          <CardDescription>
            Quick answers to common questions about Y2K UI.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <Accordion type="single" collapsible defaultValue="q1">
            <AccordionItem value="q1">
              <AccordionTrigger>How do I install Y2K UI?</AccordionTrigger>
              <AccordionContent>
                Run <code className="rounded bg-y2k-panel px-1 text-xs">npx y2kui@latest init</code> to
                initialize your project, then add components with{" "}
                <code className="rounded bg-y2k-panel px-1 text-xs">npx y2kui@latest add &lt;name&gt;</code>.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger>Is Y2K UI free to use?</AccordionTrigger>
              <AccordionContent>
                Yes! Y2K UI is completely free and open-source under the MIT
                license. Use it in personal and commercial projects.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger>Can I customize the colors?</AccordionTrigger>
              <AccordionContent>
                Absolutely. Y2K UI uses CSS custom properties for all colors.
                Override the <code className="rounded bg-y2k-panel px-1 text-xs">--y2k-*</code> variables
                in your stylesheet to create your own palette.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q4">
              <AccordionTrigger>Does it support dark mode?</AccordionTrigger>
              <AccordionContent>
                Y2K UI ships light-only by default. The design language is
                optimized for light pastel themes, but you can extend the CSS
                variables to create a dark variant.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
