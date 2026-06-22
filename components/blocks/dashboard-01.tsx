"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  ArrowUpRightIcon,
  ArrowDownRightIcon,
  UsersIcon,
  DollarSignIcon,
  ShoppingCartIcon,
  ActivityIcon,
} from "lucide-react"

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231",
    change: "+20.1%",
    trend: "up" as const,
    icon: <DollarSignIcon className="size-4" />,
    color: "bg-y2k-mint",
  },
  {
    title: "Active Users",
    value: "2,350",
    change: "+15.3%",
    trend: "up" as const,
    icon: <UsersIcon className="size-4" />,
    color: "bg-y2k-blue",
  },
  {
    title: "Sales",
    value: "12,234",
    change: "-3.2%",
    trend: "down" as const,
    icon: <ShoppingCartIcon className="size-4" />,
    color: "bg-y2k-pink",
  },
  {
    title: "Active Now",
    value: "573",
    change: "+12.5%",
    trend: "up" as const,
    icon: <ActivityIcon className="size-4" />,
    color: "bg-y2k-lemon",
  },
]

const recentUsers = [
  { name: "Olivia Martin", email: "olivia@email.com", amount: "+$1,999" },
  { name: "Jackson Lee", email: "jackson@email.com", amount: "+$39" },
  { name: "Isabella Nguyen", email: "isabella@email.com", amount: "+$299" },
  { name: "William Kim", email: "will@email.com", amount: "+$99" },
  { name: "Sofia Davis", email: "sofia@email.com", amount: "+$39" },
]

export function DashboardStatsBlock() {
  return (
    <div className="w-full max-w-4xl space-y-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-1">
              <CardTitle className="text-xs font-semibold text-y2k-ink/70">
                {stat.title}
              </CardTitle>
              <div
                className={`flex size-7 items-center justify-center rounded border-2 border-y2k-ink ${stat.color} text-y2k-ink`}
              >
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-black text-y2k-ink">
                {stat.value}
              </div>
              <div className="mt-1 flex items-center gap-1">
                {stat.trend === "up" ? (
                  <ArrowUpRightIcon className="size-3 text-green-600" />
                ) : (
                  <ArrowDownRightIcon className="size-3 text-red-500" />
                )}
                <span
                  className={`text-xs font-bold ${
                    stat.trend === "up"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-xs text-y2k-ink/50">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom Row */}
      <div className="grid gap-3 lg:grid-cols-7">
        {/* Recent Sales */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="text-sm">Recent Sales</CardTitle>
            <p className="text-xs text-y2k-ink/60">
              You made 265 sales this month.
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentUsers.map((user) => (
              <div key={user.email} className="flex items-center gap-3">
                <Avatar size="sm">
                  <AvatarFallback className="bg-y2k-lilac text-[10px]">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-0.5">
                  <p className="text-sm font-semibold text-y2k-ink">
                    {user.name}
                  </p>
                  <p className="text-xs text-y2k-ink/60">{user.email}</p>
                </div>
                <span className="text-sm font-bold text-y2k-ink">
                  {user.amount}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Overview */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Overview</CardTitle>
              <Badge variant="mint">This week</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-y2k-ink">Desktop</span>
                <span className="text-y2k-ink/60">68%</span>
              </div>
              <Progress value={68} indicatorClassName="bg-y2k-blue" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-y2k-ink">Mobile</span>
                <span className="text-y2k-ink/60">24%</span>
              </div>
              <Progress value={24} indicatorClassName="bg-y2k-pink" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-y2k-ink">Tablet</span>
                <span className="text-y2k-ink/60">8%</span>
              </div>
              <Progress value={8} indicatorClassName="bg-y2k-mint" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
