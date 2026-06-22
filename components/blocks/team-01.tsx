"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  ExternalLinkIcon,
  GlobeIcon,
  LinkIcon,
  MailIcon,
} from "lucide-react"

const team = [
  {
    name: "Sarah Chen",
    role: "CEO & Founder",
    bio: "Design systems enthusiast with 10+ years in product design.",
    avatar: "SC",
    color: "bg-y2k-pink",
    social: { twitter: "#", github: "#", linkedin: "#" },
  },
  {
    name: "Alex Rivera",
    role: "Lead Developer",
    bio: "Full-stack engineer passionate about accessible web components.",
    avatar: "AR",
    color: "bg-y2k-blue",
    social: { twitter: "#", github: "#", linkedin: "#" },
  },
  {
    name: "Jordan Park",
    role: "Product Designer",
    bio: "Creating delightful user experiences through thoughtful design.",
    avatar: "JP",
    color: "bg-y2k-mint",
    social: { twitter: "#", github: "#", linkedin: "#" },
  },
  {
    name: "Maya Johnson",
    role: "Marketing Lead",
    bio: "Storyteller and community builder with a love for retro aesthetics.",
    avatar: "MJ",
    color: "bg-y2k-lemon",
    social: { twitter: "#", github: "#", linkedin: "#" },
  },
  {
    name: "Chris Lee",
    role: "DevOps Engineer",
    bio: "Infrastructure wizard keeping our systems fast and reliable.",
    avatar: "CL",
    color: "bg-y2k-lilac",
    social: { twitter: "#", github: "#", linkedin: "#" },
  },
  {
    name: "Emma Wilson",
    role: "UX Researcher",
    bio: "Data-driven researcher focused on user behavior and insights.",
    avatar: "EW",
    color: "bg-y2k-pink",
    social: { twitter: "#", github: "#", linkedin: "#" },
  },
]

export function TeamMembersBlock() {
  return (
    <div className="w-full max-w-4xl">
      <div className="mb-8 text-center">
        <Badge variant="lilac" className="mb-2">
          Our Team
        </Badge>
        <h2 className="text-2xl font-black text-y2k-ink">
          Meet the people behind Y2K UI
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-y2k-ink/60">
          A passionate team of designers, developers, and creators building the
          future of retro-modern interfaces.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((member) => (
          <Card
            key={member.name}
            className="transition-all hover:-translate-y-0.5"
          >
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar size="xl">
                  <AvatarImage
                    src={`https://github.com/${member.avatar.toLowerCase()}.png`}
                    alt={member.name}
                  />
                  <AvatarFallback
                    className={`${member.color} text-lg font-bold`}
                  >
                    {member.avatar}
                  </AvatarFallback>
                </Avatar>
                <h3 className="mt-3 text-sm font-bold text-y2k-ink">
                  {member.name}
                </h3>
                <p className="text-xs font-semibold text-y2k-ink/60">
                  {member.role}
                </p>
                <Separator className="my-3" />
                <p className="text-xs leading-relaxed text-y2k-ink/70">
                  {member.bio}
                </p>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="ghost" className="size-7 p-0">
                    <GlobeIcon className="size-3.5" />
                  </Button>
                  <Button size="sm" variant="ghost" className="size-7 p-0">
                    <ExternalLinkIcon className="size-3.5" />
                  </Button>
                  <Button size="sm" variant="ghost" className="size-7 p-0">
                    <LinkIcon className="size-3.5" />
                  </Button>
                  <Button size="sm" variant="ghost" className="size-7 p-0">
                    <MailIcon className="size-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
