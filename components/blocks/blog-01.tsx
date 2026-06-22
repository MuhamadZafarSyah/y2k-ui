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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  ClockIcon,
  ArrowRightIcon,
  MessageSquareIcon,
  HeartIcon,
} from "lucide-react"

const posts = [
  {
    title: "Getting Started with Y2K UI Components",
    excerpt:
      "Learn how to install and customize Y2K UI components in your React project. A step-by-step guide for beginners.",
    category: "Tutorial",
    categoryColor: "bg-y2k-blue",
    author: "Sarah Chen",
    authorInitials: "SC",
    authorColor: "bg-y2k-pink",
    date: "Mar 15, 2025",
    readTime: "5 min read",
    comments: 12,
    likes: 48,
  },
  {
    title: "The Rise of Retro-Futuristic Design in 2025",
    excerpt:
      "Explore why Y2K aesthetics are making a comeback and how modern developers are reimagining retro interfaces.",
    category: "Design",
    categoryColor: "bg-y2k-pink",
    author: "Jordan Park",
    authorInitials: "JP",
    authorColor: "bg-y2k-mint",
    date: "Mar 12, 2025",
    readTime: "8 min read",
    comments: 24,
    likes: 96,
  },
  {
    title: "Building Accessible Components with Radix UI",
    excerpt:
      "A deep dive into how Y2K UI leverages Radix primitives to create fully accessible, keyboard-navigable components.",
    category: "Engineering",
    categoryColor: "bg-y2k-mint",
    author: "Alex Rivera",
    authorInitials: "AR",
    authorColor: "bg-y2k-blue",
    date: "Mar 10, 2025",
    readTime: "12 min read",
    comments: 18,
    likes: 72,
  },
]

export function BlogCardsBlock() {
  return (
    <div className="w-full max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Badge variant="lemon" className="mb-2">
            Blog
          </Badge>
          <h2 className="text-xl font-black text-y2k-ink">Latest articles</h2>
        </div>
        <Button variant="outline" size="sm" trailingIcon={<ArrowRightIcon />}>
          View all
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <Card
            key={post.title}
            className="flex flex-col transition-all hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_#1b1b3a]"
          >
            <CardHeader className="pb-3">
              <div className="mb-2 flex h-32 items-center justify-center rounded border-2 border-y2k-ink bg-y2k-panel">
                <span className="text-4xl font-black text-y2k-ink/20">
                  {post.category[0]}
                </span>
              </div>
              <Badge
                variant="default"
                className={`self-start ${post.categoryColor}`}
              >
                {post.category}
              </Badge>
            </CardHeader>
            <CardContent className="flex-1 space-y-2">
              <h3 className="text-sm font-bold leading-tight text-y2k-ink">
                {post.title}
              </h3>
              <p className="text-xs leading-relaxed text-y2k-ink/70">
                {post.excerpt}
              </p>
            </CardContent>
            <Separator />
            <CardFooter className="flex items-center justify-between pt-3">
              <div className="flex items-center gap-2">
                <Avatar size="xs">
                  <AvatarFallback
                    className={`${post.authorColor} text-[8px] font-bold`}
                  >
                    {post.authorInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-0">
                  <p className="text-[10px] font-semibold text-y2k-ink">
                    {post.author}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-y2k-ink/50">
                    <ClockIcon className="size-2" />
                    {post.readTime}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-y2k-ink/60">
                <span className="flex items-center gap-0.5">
                  <HeartIcon className="size-2.5" />
                  {post.likes}
                </span>
                <span className="flex items-center gap-0.5">
                  <MessageSquareIcon className="size-2.5" />
                  {post.comments}
                </span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
