"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  BellIcon,
  MessageSquareIcon,
  UserPlusIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  ClockIcon,
} from "lucide-react"

const notifications = [
  {
    id: 1,
    type: "message",
    icon: <MessageSquareIcon className="size-4" />,
    title: "New message from Sarah",
    description: "Hey! I just reviewed the latest design updates...",
    time: "2 min ago",
    unread: true,
    color: "bg-y2k-blue",
  },
  {
    id: 2,
    type: "follow",
    icon: <UserPlusIcon className="size-4" />,
    title: "Alex started following you",
    description: "You now have 1,247 followers",
    time: "1 hour ago",
    unread: true,
    color: "bg-y2k-pink",
  },
  {
    id: 3,
    type: "success",
    icon: <CheckCircleIcon className="size-4" />,
    title: "Deployment successful",
    description: "Your app has been deployed to production",
    time: "3 hours ago",
    unread: false,
    color: "bg-y2k-mint",
  },
  {
    id: 4,
    type: "alert",
    icon: <AlertCircleIcon className="size-4" />,
    title: "Storage limit warning",
    description: "You've used 85% of your storage quota",
    time: "5 hours ago",
    unread: false,
    color: "bg-y2k-lemon",
  },
  {
    id: 5,
    type: "message",
    icon: <MessageSquareIcon className="size-4" />,
    title: "Comment on your post",
    description: "Jordan commented: This looks amazing!",
    time: "1 day ago",
    unread: false,
    color: "bg-y2k-lilac",
  },
]

export function NotificationCenterBlock() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <BellIcon className="size-4" />
            Notifications
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="pink">3 new</Badge>
            <Button size="sm" variant="ghost" className="h-7 text-xs">
              Mark all read
            </Button>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="p-0">
        <div className="divide-y-2 divide-y2k-ink">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`flex items-start gap-3 px-4 py-3 transition-colors hover:bg-y2k-panel/30 ${
                notif.unread ? "bg-y2k-blue/5" : ""
              }`}
            >
              <div
                className={`flex size-9 shrink-0 items-center justify-center rounded border-2 border-y2k-ink ${notif.color} text-y2k-ink`}
              >
                {notif.icon}
              </div>
              <div className="flex-1 space-y-0.5">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-y2k-ink">
                    {notif.title}
                  </p>
                  {notif.unread && (
                    <span className="mt-1 size-2 shrink-0 rounded-full bg-y2k-pink" />
                  )}
                </div>
                <p className="text-xs text-y2k-ink/70">{notif.description}</p>
                <div className="flex items-center gap-1 pt-0.5 text-[10px] text-y2k-ink/50">
                  <ClockIcon className="size-2.5" />
                  {notif.time}
                </div>
              </div>
            </div>
          ))}
        </div>
        <Separator />
        <div className="p-3 text-center">
          <Button size="sm" variant="outline" className="w-full">
            View all notifications
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
