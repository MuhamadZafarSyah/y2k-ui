"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MailIcon, PhoneIcon, MapPinIcon, SendIcon } from "lucide-react"

export function ContactFormBlock() {
  return (
    <div className="w-full max-w-4xl">
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Contact Info */}
        <Card className="lg:col-span-2 bg-y2k-blue/10">
          <CardHeader>
            <CardTitle className="text-base">Get in touch</CardTitle>
            <CardDescription>
              We&apos;d love to hear from you. Fill out the form or reach out
              directly.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded border-2 border-y2k-ink bg-y2k-pink text-y2k-ink">
                <MailIcon className="size-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-y2k-ink">Email</p>
                <p className="text-xs text-y2k-ink/70">hello@y2kui.web.id</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded border-2 border-y2k-ink bg-y2k-mint text-y2k-ink">
                <PhoneIcon className="size-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-y2k-ink">Phone</p>
                <p className="text-xs text-y2k-ink/70">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded border-2 border-y2k-ink bg-y2k-lemon text-y2k-ink">
                <MapPinIcon className="size-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-y2k-ink">Office</p>
                <p className="text-xs text-y2k-ink/70">
                  123 Retro Street
                  <br />
                  Tokyo, Japan 100-0001
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-base">Send us a message</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="contact-first">First name</Label>
                <Input id="contact-first" placeholder="John" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="contact-last">Last name</Label>
                <Input id="contact-last" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                type="email"
                placeholder="john@example.com"
                leadingIcon={<MailIcon />}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="contact-subject">Subject</Label>
              <Select>
                <SelectTrigger id="contact-subject">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General inquiry</SelectItem>
                  <SelectItem value="support">Technical support</SelectItem>
                  <SelectItem value="sales">Sales question</SelectItem>
                  <SelectItem value="feedback">Feedback</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="contact-message">Message</Label>
              <Textarea
                id="contact-message"
                placeholder="Tell us what's on your mind..."
                rows={5}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="blue" className="w-full" trailingIcon={<SendIcon />}>
              Send message
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
