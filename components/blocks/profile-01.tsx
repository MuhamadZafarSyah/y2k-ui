"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  MapPinIcon,
  MailIcon,
  ExternalLinkIcon,
} from "lucide-react"

export function ProfileCardBlock() {
  return (
    <Card className="w-full max-w-xs">
      <CardHeader className="items-center text-center">
        <Avatar size="xl">
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="Profile avatar"
          />
          <AvatarFallback className="bg-y2k-pink text-lg font-bold">
            YK
          </AvatarFallback>
        </Avatar>
        <div className="mt-2">
          <h3 className="text-base font-black text-y2k-ink">Kawaii Dev</h3>
          <p className="text-xs text-y2k-ink/60">@kawaii_dev</p>
        </div>
        <div className="flex flex-wrap justify-center gap-1.5">
          <Badge variant="blue">Designer</Badge>
          <Badge variant="pink">React</Badge>
          <Badge variant="mint">Open Source</Badge>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-3 pt-3">
        <p className="text-xs text-y2k-ink/70">
          Building pastel-flavoured components since 2025. Y2K UI designer &
          pixel art enthusiast.
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-y2k-ink/70">
            <MapPinIcon className="size-3.5" />
            Tokyo, Japan
          </div>
          <div className="flex items-center gap-2 text-xs text-y2k-ink/70">
            <MailIcon className="size-3.5" />
            hello@y2kui.web.id
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-y2k-ink">Profile views</span>
            <span className="text-y2k-ink/60">1,247 / 2,000</span>
          </div>
          <Progress value={62} indicatorClassName="bg-y2k-lilac" />
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button size="sm" variant="blue" className="flex-1">
          Follow
        </Button>
        <Button size="sm" variant="outline" className="flex-1">
          <ExternalLinkIcon className="size-3.5" />
          Portfolio
        </Button>
      </CardFooter>
    </Card>
  )
}
