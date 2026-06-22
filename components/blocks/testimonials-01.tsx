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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  StarIcon,
  MessageSquareIcon,
  ThumbsUpIcon,
  Share2Icon,
} from "lucide-react"

const reviews = [
  {
    name: "Sarah Chen",
    initials: "SC",
    rating: 5,
    date: "2 days ago",
    comment:
      "Absolutely love the Y2K aesthetic! The components are clean, well-documented, and the pastel palette is gorgeous. Saved me hours of design work.",
    helpful: 24,
    color: "bg-y2k-blue",
  },
  {
    name: "Alex Rivera",
    initials: "AR",
    rating: 5,
    date: "1 week ago",
    comment:
      "Best retro component library I've used. The accessibility features are top-notch and the thick borders give everything such a crisp, polished look.",
    helpful: 18,
    color: "bg-y2k-pink",
  },
  {
    name: "Jordan Park",
    initials: "JP",
    rating: 4,
    date: "2 weeks ago",
    comment:
      "Great library with a unique style. The CLI makes installation super easy. Would love to see more chart components in the future!",
    helpful: 12,
    color: "bg-y2k-mint",
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={i}
          className={`size-3.5 ${
            i < rating
              ? "fill-y2k-lemon text-y2k-lemon"
              : "text-y2k-ink/20"
          }`}
        />
      ))}
    </div>
  )
}

export function TestimonialsBlock() {
  return (
    <div className="w-full max-w-4xl">
      <div className="mb-6 text-center">
        <Badge variant="mint" className="mb-2">
          <MessageSquareIcon className="size-3" />
          Testimonials
        </Badge>
        <h2 className="text-2xl font-black text-y2k-ink">
          Loved by developers
        </h2>
        <p className="mt-1 text-sm text-y2k-ink/60">
          See what the community is saying about Y2K UI.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {reviews.map((review) => (
          <Card key={review.name} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Avatar size="sm">
                  <AvatarFallback
                    className={`${review.color} text-[10px] font-bold`}
                  >
                    {review.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-bold text-y2k-ink">
                    {review.name}
                  </p>
                  <p className="text-[10px] text-y2k-ink/50">{review.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <StarRating rating={review.rating} />
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-xs leading-relaxed text-y2k-ink/70">
                &ldquo;{review.comment}&rdquo;
              </p>
            </CardContent>
            <Separator />
            <div className="flex items-center justify-between px-4 py-2.5">
              <button
                type="button"
                className="flex items-center gap-1.5 text-xs font-semibold text-y2k-ink/60 hover:text-y2k-ink transition-colors"
              >
                <ThumbsUpIcon className="size-3" />
                Helpful ({review.helpful})
              </button>
              <button
                type="button"
                className="flex items-center gap-1.5 text-xs font-semibold text-y2k-ink/60 hover:text-y2k-ink transition-colors"
              >
                <Share2Icon className="size-3" />
                Share
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
