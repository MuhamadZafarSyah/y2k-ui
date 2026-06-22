export const blockSources: Record<string, string> = {
  "login-01": `"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function LoginFormBlock() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <div className="mx-auto mb-2 flex size-10 items-center justify-center rounded border-2 border-y2k-ink bg-y2k-lemon text-sm font-bold">
          Y
        </div>
        <CardTitle className="text-xl">Welcome back</CardTitle>
        <CardDescription>
          Sign in to your Y2K account to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="login-email">Email</Label>
          <Input
            id="login-email"
            type="email"
            placeholder="you@example.com"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="login-password">Password</Label>
            <button
              type="button"
              className="text-xs font-semibold text-y2k-ink/60 hover:text-y2k-ink transition-colors"
            >
              Forgot password?
            </button>
          </div>
          <Input
            id="login-password"
            type="password"
            placeholder="Enter your password"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-y2k-ink">
          <Checkbox defaultChecked />
          Remember me for 30 days
        </label>
      </CardContent>
      <CardFooter className="flex-col gap-3">
        <Button className="w-full" variant="blue">
          Sign in
        </Button>
        <Separator />
        <p className="text-center text-xs text-y2k-ink/60">
          Don't have an account?{" "}
          <button
            type="button"
            className="font-bold text-y2k-ink underline underline-offset-2 hover:text-y2k-ink/80"
          >
            Sign up
          </button>
        </p>
      </CardFooter>
    </Card>
  )
}`,

  "dashboard-01": `"use client"

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
    trend: "up",
    icon: <DollarSignIcon className="size-4" />,
    color: "bg-y2k-mint",
  },
  {
    title: "Active Users",
    value: "2,350",
    change: "+15.3%",
    trend: "up",
    icon: <UsersIcon className="size-4" />,
    color: "bg-y2k-blue",
  },
  {
    title: "Sales",
    value: "12,234",
    change: "-3.2%",
    trend: "down",
    icon: <ShoppingCartIcon className="size-4" />,
    color: "bg-y2k-pink",
  },
  {
    title: "Active Now",
    value: "573",
    change: "+12.5%",
    trend: "up",
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
              <div className={\`flex size-7 items-center justify-center rounded border-2 border-y2k-ink \${stat.color} text-y2k-ink\`}>
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-black text-y2k-ink">{stat.value}</div>
              <div className="mt-1 flex items-center gap-1">
                <span className={\`text-xs font-bold \${stat.trend === "up" ? "text-green-600" : "text-red-500"}\`}>
                  {stat.change}
                </span>
                <span className="text-xs text-y2k-ink/50">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Recent Sales + Overview */}
      <div className="grid gap-3 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="text-sm">Recent Sales</CardTitle>
            <p className="text-xs text-y2k-ink/60">You made 265 sales this month.</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentUsers.map((user) => (
              <div key={user.email} className="flex items-center gap-3">
                <Avatar size="sm">
                  <AvatarFallback className="bg-y2k-lilac text-[10px]">
                    {user.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-0.5">
                  <p className="text-sm font-semibold text-y2k-ink">{user.name}</p>
                  <p className="text-xs text-y2k-ink/60">{user.email}</p>
                </div>
                <span className="text-sm font-bold text-y2k-ink">{user.amount}</span>
              </div>
            ))}
          </CardContent>
        </Card>
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
}`,

  "pricing-01": `"use client"

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
import { Separator } from "@/components/ui/separator"
import { CheckIcon } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: "$9",
    description: "Perfect for side projects and personal use.",
    color: "bg-y2k-panel",
    features: ["5 projects", "Basic analytics", "Community support", "1 GB storage"],
    cta: "Get Started",
    variant: "outline",
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    description: "For professionals and growing teams.",
    color: "bg-y2k-blue",
    features: ["Unlimited projects", "Advanced analytics", "Priority support", "50 GB storage", "Custom domains", "Team collaboration"],
    cta: "Upgrade to Pro",
    variant: "blue",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    description: "For large organizations with custom needs.",
    color: "bg-y2k-lilac",
    features: ["Everything in Pro", "Dedicated support", "SLA guarantee", "Unlimited storage", "SSO & SAML", "Custom integrations"],
    cta: "Contact Sales",
    variant: "lilac",
    popular: false,
  },
]

export function PricingCardsBlock() {
  return (
    <div className="w-full max-w-4xl">
      <div className="mb-6 text-center">
        <Badge variant="pink" className="mb-2">Pricing</Badge>
        <h2 className="text-2xl font-black text-y2k-ink">Simple, transparent pricing</h2>
        <p className="mt-1 text-sm text-y2k-ink/60">Choose the plan that fits your needs. No hidden fees.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className={\`relative flex flex-col \${plan.popular ? "border-y2k-ink border-[3px]" : ""}\`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge variant="lemon">Most Popular</Badge>
              </div>
            )}
            <CardHeader>
              <div className={\`mb-2 inline-flex size-8 items-center justify-center rounded border-2 border-y2k-ink \${plan.color} text-xs font-bold text-y2k-ink\`}>
                {plan.name[0]}
              </div>
              <CardTitle className="text-base">{plan.name}</CardTitle>
              <CardDescription className="text-xs">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="mb-4">
                <span className="text-3xl font-black text-y2k-ink">{plan.price}</span>
                <span className="text-xs text-y2k-ink/60">/month</span>
              </div>
              <Separator className="mb-4" />
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-xs text-y2k-ink">
                    <span className="flex size-4 items-center justify-center rounded border border-y2k-ink bg-y2k-mint text-y2k-ink">
                      <CheckIcon className="size-2.5 stroke-[3px]" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={plan.variant}>{plan.cta}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}`,

  "hero-01": `"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRightIcon, SparklesIcon } from "lucide-react"

export function HeroSectionBlock() {
  return (
    <div className="w-full max-w-3xl text-center">
      <div className="mb-4 flex items-center justify-center gap-2">
        <Badge variant="blue"><SparklesIcon className="size-3" /> New Release</Badge>
        <Badge variant="pink">v0.3.0</Badge>
      </div>
      <h1 className="text-4xl font-black tracking-tight text-y2k-ink md:text-5xl">
        Build retro-future
        <br />
        <span className="inline-flex items-center gap-2">
          interfaces with{" "}
          <span className="rounded border-2 border-y2k-ink bg-y2k-lemon px-2">Y2K UI</span>
        </span>
      </h1>
      <p className="mx-auto mt-4 max-w-lg text-sm text-y2k-ink/70">
        A modern Y2K / kawaii-retro component library for React. Flat windows,
        thick navy outlines, pastel fills. Built on shadcn and Radix UI.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Button variant="blue" trailingIcon={<ArrowRightIcon />}>Get Started</Button>
        <Button variant="outline">View on GitHub</Button>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        <div className="flex items-center gap-1.5">
          <span className="flex size-5 items-center justify-center rounded border-2 border-y2k-ink bg-y2k-mint text-[10px] font-bold text-y2k-ink">✓</span>
          <span className="text-xs font-semibold text-y2k-ink/70">Accessible</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="flex size-5 items-center justify-center rounded border-2 border-y2k-ink bg-y2k-pink text-[10px] font-bold text-y2k-ink">✓</span>
          <span className="text-xs font-semibold text-y2k-ink/70">Customizable</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="flex size-5 items-center justify-center rounded border-2 border-y2k-ink bg-y2k-lilac text-[10px] font-bold text-y2k-ink">✓</span>
          <span className="text-xs font-semibold text-y2k-ink/70">Open Source</span>
        </div>
      </div>
    </div>
  )
}`,

  "profile-01": `"use client"

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
import { MapPinIcon, MailIcon, ExternalLinkIcon } from "lucide-react"

export function ProfileCardBlock() {
  return (
    <Card className="w-full max-w-xs">
      <CardHeader className="items-center text-center">
        <Avatar size="xl">
          <AvatarImage src="https://github.com/shadcn.png" alt="Profile avatar" />
          <AvatarFallback className="bg-y2k-pink text-lg font-bold">YK</AvatarFallback>
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
          Building pastel-flavoured components since 2025. Y2K UI designer & pixel art enthusiast.
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-y2k-ink/70">
            <MapPinIcon className="size-3.5" /> Tokyo, Japan
          </div>
          <div className="flex items-center gap-2 text-xs text-y2k-ink/70">
            <MailIcon className="size-3.5" /> hello@y2kui.web.id
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
        <Button size="sm" variant="blue" className="flex-1">Follow</Button>
        <Button size="sm" variant="outline" className="flex-1">
          <ExternalLinkIcon className="size-3.5" /> Portfolio
        </Button>
      </CardFooter>
    </Card>
  )
}`,

  "settings-01": `"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SettingsPanelBlock() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-base">Settings</CardTitle>
        <CardDescription>Manage your account preferences and notifications.</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="pt-4">
        <Tabs defaultValue="general">
          <TabsList className="mb-4 w-full overflow-x-auto">
            <TabsTrigger value="general" className="flex-1">General</TabsTrigger>
            <TabsTrigger value="notifications" className="flex-1">Notifications</TabsTrigger>
            <TabsTrigger value="appearance" className="flex-1">Appearance</TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="display-name">Display name</Label>
                <Input id="display-name" defaultValue="Kawaii Dev" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="@kawaii_dev" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" rows={3} defaultValue="Building pastel-flavoured components since 2025." />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="language">Language</Label>
              <Select defaultValue="en">
                <SelectTrigger id="language"><SelectValue placeholder="Select language" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="id">Bahasa Indonesia</SelectItem>
                  <SelectItem value="ja">Japanese</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
          <TabsContent value="notifications" className="space-y-4">
            {/* Notification switches */}
          </TabsContent>
          <TabsContent value="appearance" className="space-y-4">
            {/* Theme picker */}
          </TabsContent>
        </Tabs>
      </CardContent>
      <Separator />
      <CardFooter className="flex justify-end gap-2 pt-4">
        <Button variant="outline" size="sm">Cancel</Button>
        <Button variant="blue" size="sm">Save changes</Button>
      </CardFooter>
    </Card>
  )
}`,

  "table-01": `"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SearchIcon,
  MoreHorizontalIcon,
  DownloadIcon,
  PlusIcon,
  FilterIcon,
} from "lucide-react"

const invoices = [
  { id: "INV-001", status: "Paid", method: "Credit Card", amount: "$250.00", date: "2025-02-15" },
  { id: "INV-002", status: "Pending", method: "PayPal", amount: "$150.00", date: "2025-02-14" },
  { id: "INV-003", status: "Paid", method: "Bank Transfer", amount: "$350.00", date: "2025-02-13" },
  { id: "INV-004", status: "Unpaid", method: "Credit Card", amount: "$450.00", date: "2025-02-12" },
  { id: "INV-005", status: "Paid", method: "PayPal", amount: "$550.00", date: "2025-02-11" },
  { id: "INV-006", status: "Pending", method: "Bank Transfer", amount: "$200.00", date: "2025-02-10" },
]

export function DataTableBlock() {
  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-base">Invoices</CardTitle>
            <CardDescription>Manage your recent invoices and payments.</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline"><DownloadIcon className="size-3.5" /> Export</Button>
            <Button size="sm" variant="blue"><PlusIcon className="size-3.5" /> New Invoice</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Input placeholder="Search invoices..." leadingIcon={<SearchIcon />} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline"><FilterIcon className="size-3.5" /> Filter</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>All</DropdownMenuItem>
              <DropdownMenuItem>Paid</DropdownMenuItem>
              <DropdownMenuItem>Pending</DropdownMenuItem>
              <DropdownMenuItem>Unpaid</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden sm:table-cell">Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((inv) => (
              <TableRow key={inv.id}>
                <TableCell className="font-semibold">{inv.id}</TableCell>
                <TableCell><Badge variant={inv.status === "Paid" ? "mint" : inv.status === "Pending" ? "lemon" : "pink"}>{inv.status}</Badge></TableCell>
                <TableCell className="hidden text-y2k-ink/70 sm:table-cell">{inv.method}</TableCell>
                <TableCell className="text-right font-semibold">{inv.amount}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="ghost" className="size-7 p-0">
                        <MoreHorizontalIcon className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Download PDF</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="overflow-x-auto">
          <Pagination>
            <PaginationContent>
              <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
              <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
              <PaginationItem><PaginationEllipsis /></PaginationItem>
              <PaginationItem><PaginationLink href="#">8</PaginationLink></PaginationItem>
              <PaginationItem><PaginationNext href="#" /></PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>
    </Card>
  )
}`,

  "auth-01": `"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AuthTabsBlock() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <div className="mx-auto mb-2 flex size-10 items-center justify-center rounded border-2 border-y2k-ink bg-y2k-pink text-sm font-bold">✦</div>
        <CardTitle className="text-xl">Get started</CardTitle>
        <CardDescription>Create an account or sign in to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login">
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="login" className="flex-1">Login</TabsTrigger>
            <TabsTrigger value="register" className="flex-1">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="auth-login-email">Email</Label>
              <Input id="auth-login-email" type="email" placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="auth-login-password">Password</Label>
              <Input id="auth-login-password" type="password" placeholder="Your password" />
            </div>
            <Button className="w-full" variant="blue">Sign in</Button>
          </TabsContent>
          <TabsContent value="register" className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="auth-first-name">First name</Label>
                <Input id="auth-first-name" placeholder="First name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="auth-last-name">Last name</Label>
                <Input id="auth-last-name" placeholder="Last name" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="auth-reg-email">Email</Label>
              <Input id="auth-reg-email" type="email" placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="auth-reg-password">Password</Label>
              <Input id="auth-reg-password" type="password" placeholder="Create a password" />
            </div>
            <Button className="w-full" variant="pink">Create account</Button>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex-col gap-3">
        <Separator />
        <div className="flex w-full gap-2">
          <Button variant="outline" className="flex-1" size="sm">Google</Button>
          <Button variant="outline" className="flex-1" size="sm">GitHub</Button>
        </div>
      </CardFooter>
    </Card>
  )
}`,

  "testimonials-01": `"use client"

import * as React from "react"
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
import { StarIcon, MessageSquareIcon, ThumbsUpIcon, Share2Icon } from "lucide-react"

const reviews = [
  {
    name: "Sarah Chen",
    initials: "SC",
    rating: 5,
    date: "2 days ago",
    comment: "Absolutely love the Y2K aesthetic! The components are clean, well-documented, and the pastel palette is gorgeous.",
    helpful: 24,
    color: "bg-y2k-blue",
  },
  {
    name: "Alex Rivera",
    initials: "AR",
    rating: 5,
    date: "1 week ago",
    comment: "Best retro component library I've used. The accessibility features are top-notch and the thick borders give everything a crisp look.",
    helpful: 18,
    color: "bg-y2k-pink",
  },
  {
    name: "Jordan Park",
    initials: "JP",
    rating: 4,
    date: "2 weeks ago",
    comment: "Great library with a unique style. The CLI makes installation super easy. Would love to see more chart components!",
    helpful: 12,
    color: "bg-y2k-mint",
  },
]

export function TestimonialsBlock() {
  return (
    <div className="w-full max-w-4xl">
      <div className="mb-6 text-center">
        <Badge variant="mint" className="mb-2"><MessageSquareIcon className="size-3" /> Testimonials</Badge>
        <h2 className="text-2xl font-black text-y2k-ink">Loved by developers</h2>
        <p className="mt-1 text-sm text-y2k-ink/60">See what the community is saying about Y2K UI.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {reviews.map((review) => (
          <Card key={review.name} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Avatar size="sm">
                  <AvatarFallback className={\`\${review.color} text-[10px] font-bold\`}>{review.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-bold text-y2k-ink">{review.name}</p>
                  <p className="text-[10px] text-y2k-ink/50">{review.date}</p>
                </div>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className={\`size-3.5 \${i < review.rating ? "fill-y2k-lemon text-y2k-lemon" : "text-y2k-ink/20"}\`} />
                ))}
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-xs leading-relaxed text-y2k-ink/70">&ldquo;{review.comment}&rdquo;</p>
            </CardContent>
            <Separator />
            <div className="flex items-center justify-between px-4 py-2.5">
              <button className="flex items-center gap-1.5 text-xs font-semibold text-y2k-ink/60 hover:text-y2k-ink">
                <ThumbsUpIcon className="size-3" /> Helpful ({review.helpful})
              </button>
              <button className="flex items-center gap-1.5 text-xs font-semibold text-y2k-ink/60 hover:text-y2k-ink">
                <Share2Icon className="size-3" /> Share
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}`,

  "support-01": `"use client"

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
import { MailIcon, MessageCircleIcon, HelpCircleIcon } from "lucide-react"

export function SupportCenterBlock() {
  return (
    <div className="w-full max-w-3xl space-y-4">
      <Card className="bg-y2k-blue/20">
        <CardContent className="flex flex-col items-center gap-4 py-8 text-center sm:flex-row sm:text-left">
          <div className="flex size-14 shrink-0 items-center justify-center rounded border-2 border-y2k-ink bg-y2k-blue text-y2k-ink">
            <HelpCircleIcon className="size-7" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-black text-y2k-ink">How can we help?</h2>
            <p className="mt-1 text-sm text-y2k-ink/70">Search our knowledge base or browse categories below.</p>
          </div>
          <div className="w-full sm:w-64">
            <Input placeholder="Search for help..." leadingIcon={<MailIcon />} />
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { icon: <MessageCircleIcon className="size-4" />, title: "Live Chat", desc: "Chat with our support team", color: "bg-y2k-mint" },
          { icon: <MailIcon className="size-4" />, title: "Email Us", desc: "Get a response within 24h", color: "bg-y2k-pink" },
          { icon: <HelpCircleIcon className="size-4" />, title: "FAQ", desc: "Browse common questions", color: "bg-y2k-lemon" },
        ].map((item) => (
          <Card key={item.title} className="cursor-pointer transition-all hover:-translate-y-0.5">
            <CardContent className="flex items-center gap-3 py-4">
              <div className={\`flex size-9 shrink-0 items-center justify-center rounded border-2 border-y2k-ink \${item.color} text-y2k-ink\`}>
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
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Frequently Asked Questions</CardTitle>
            <Badge variant="lilac">12 articles</Badge>
          </div>
          <CardDescription>Quick answers to common questions about Y2K UI.</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <Accordion type="single" collapsible defaultValue="q1">
            <AccordionItem value="q1">
              <AccordionTrigger>How do I install Y2K UI?</AccordionTrigger>
              <AccordionContent>
                Run \`npx y2k-ui-lib@latest init\` to initialize your project, then add components with \`npx y2kui add <name>\`.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger>Is Y2K UI free to use?</AccordionTrigger>
              <AccordionContent>
                Yes! Y2K UI is completely free and open-source under the MIT license.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger>Can I customize the colors?</AccordionTrigger>
              <AccordionContent>
                Absolutely. Y2K UI uses CSS custom properties for all colors. Override the --y2k-* variables in your stylesheet.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}`,

  "newsletter-01": `"use client"

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
          Get the latest updates, tips, and exclusive offers delivered to your inbox.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input type="email" placeholder="you@example.com" className="flex-1" leadingIcon={<MailIcon />} />
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
}`,

  "features-01": `"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ZapIcon, ShieldIcon, PaletteIcon, CodeIcon, SmartphoneIcon, GlobeIcon } from "lucide-react"

const features = [
  { icon: <ZapIcon className="size-5" />, title: "Lightning Fast", description: "Optimized for performance with minimal bundle size and fast rendering.", color: "bg-y2k-lemon" },
  { icon: <ShieldIcon className="size-5" />, title: "Accessible by Default", description: "Built on Radix UI primitives with full keyboard navigation and ARIA support.", color: "bg-y2k-mint" },
  { icon: <PaletteIcon className="size-5" />, title: "Customizable", description: "CSS custom properties make theming and customization a breeze.", color: "bg-y2k-pink" },
  { icon: <CodeIcon className="size-5" />, title: "TypeScript First", description: "Full type definitions for every component with excellent IDE support.", color: "bg-y2k-blue" },
  { icon: <SmartphoneIcon className="size-5" />, title: "Responsive Design", description: "Every component is mobile-first and works beautifully on all screen sizes.", color: "bg-y2k-lilac" },
  { icon: <GlobeIcon className="size-5" />, title: "Open Source", description: "Free and open-source under the MIT license. Use it anywhere.", color: "bg-y2k-lemon" },
]

export function FeatureGridBlock() {
  return (
    <div className="w-full max-w-4xl">
      <div className="mb-8 text-center">
        <Badge variant="blue" className="mb-2">Features</Badge>
        <h2 className="text-2xl font-black text-y2k-ink">Everything you need to build amazing interfaces</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-y2k-ink/60">
          Y2K UI provides a comprehensive set of components designed for modern web development with a unique retro-future aesthetic.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="transition-all hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_#1b1b3a]">
            <CardContent className="pt-6">
              <div className={\`mb-3 flex size-10 items-center justify-center rounded border-2 border-y2k-ink \${feature.color} text-y2k-ink\`}>
                {feature.icon}
              </div>
              <h3 className="mb-1 text-sm font-bold text-y2k-ink">{feature.title}</h3>
              <p className="text-xs leading-relaxed text-y2k-ink/70">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}`,

  "contact-01": `"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MailIcon, PhoneIcon, MapPinIcon, SendIcon } from "lucide-react"

export function ContactFormBlock() {
  return (
    <div className="w-full max-w-4xl">
      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-2 bg-y2k-blue/10">
          <CardHeader>
            <CardTitle className="text-base">Get in touch</CardTitle>
            <CardDescription>We'd love to hear from you. Fill out the form or reach out directly.</CardDescription>
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
                <p className="text-xs text-y2k-ink/70">123 Retro Street, Tokyo, Japan</p>
              </div>
            </div>
          </CardContent>
        </Card>
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
              <Input id="contact-email" type="email" placeholder="john@example.com" leadingIcon={<MailIcon />} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="contact-subject">Subject</Label>
              <Select>
                <SelectTrigger id="contact-subject"><SelectValue placeholder="Select a subject" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General inquiry</SelectItem>
                  <SelectItem value="support">Technical support</SelectItem>
                  <SelectItem value="sales">Sales question</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="contact-message">Message</Label>
              <Textarea id="contact-message" placeholder="Tell us what's on your mind..." rows={5} />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="blue" className="w-full" trailingIcon={<SendIcon />}>Send message</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}`,

  "notifications-01": `"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { BellIcon, MessageSquareIcon, UserPlusIcon, CheckCircleIcon, AlertCircleIcon, ClockIcon } from "lucide-react"

const notifications = [
  { id: 1, type: "message", icon: <MessageSquareIcon className="size-4" />, title: "New message from Sarah", description: "Hey! I just reviewed the latest design updates...", time: "2 min ago", unread: true, color: "bg-y2k-blue" },
  { id: 2, type: "follow", icon: <UserPlusIcon className="size-4" />, title: "Alex started following you", description: "You now have 1,247 followers", time: "1 hour ago", unread: true, color: "bg-y2k-pink" },
  { id: 3, type: "success", icon: <CheckCircleIcon className="size-4" />, title: "Deployment successful", description: "Your app has been deployed to production", time: "3 hours ago", unread: false, color: "bg-y2k-mint" },
  { id: 4, type: "alert", icon: <AlertCircleIcon className="size-4" />, title: "Storage limit warning", description: "You've used 85% of your storage quota", time: "5 hours ago", unread: false, color: "bg-y2k-lemon" },
]

export function NotificationCenterBlock() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <BellIcon className="size-4" /> Notifications
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="pink">3 new</Badge>
            <Button size="sm" variant="ghost" className="h-7 text-xs">Mark all read</Button>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="p-0">
        <div className="divide-y-2 divide-y2k-ink">
          {notifications.map((notif) => (
            <div key={notif.id} className={\`flex items-start gap-3 px-4 py-3 transition-colors hover:bg-y2k-panel/30 \${notif.unread ? "bg-y2k-blue/5" : ""}\`}>
              <div className={\`flex size-9 shrink-0 items-center justify-center rounded border-2 border-y2k-ink \${notif.color} text-y2k-ink\`}>
                {notif.icon}
              </div>
              <div className="flex-1 space-y-0.5">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-y2k-ink">{notif.title}</p>
                  {notif.unread && <span className="mt-1 size-2 shrink-0 rounded-full bg-y2k-pink" />}
                </div>
                <p className="text-xs text-y2k-ink/70">{notif.description}</p>
                <div className="flex items-center gap-1 pt-0.5 text-[10px] text-y2k-ink/50">
                  <ClockIcon className="size-2.5" /> {notif.time}
                </div>
              </div>
            </div>
          ))}
        </div>
        <Separator />
        <div className="p-3 text-center">
          <Button size="sm" variant="outline" className="w-full">View all notifications</Button>
        </div>
      </CardContent>
    </Card>
  )
}`,

  "onboarding-01": `"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckIcon, UserIcon, CreditCardIcon, SettingsIcon, RocketIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  { number: 1, title: "Create Account", description: "Set up your profile and preferences", icon: <UserIcon className="size-4" />, status: "completed" },
  { number: 2, title: "Add Payment", description: "Connect your payment method", icon: <CreditCardIcon className="size-4" />, status: "current" },
  { number: 3, title: "Configure", description: "Customize your workspace settings", icon: <SettingsIcon className="size-4" />, status: "upcoming" },
  { number: 4, title: "Launch", description: "You're ready to go!", icon: <RocketIcon className="size-4" />, status: "upcoming" },
]

export function OnboardingStepsBlock() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-base">Complete your setup</CardTitle>
        <CardDescription>Follow these steps to get started with Y2K UI. You're almost there!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-y2k-ink">Progress</span>
          <span className="text-xs font-bold text-y2k-ink">25% complete</span>
        </div>
        <div className="h-2 w-full rounded border-2 border-y2k-ink bg-y2k-panel">
          <div className="h-full rounded bg-y2k-mint transition-all" style={{ width: "25%" }} />
        </div>
        <div className="space-y-3">
          {steps.map((step) => (
            <div key={step.number} className={cn("flex items-start gap-3 rounded border-2 p-3 transition-all",
              step.status === "current" ? "border-y2k-ink bg-y2k-blue/20" : step.status === "completed" ? "border-y2k-ink/40 bg-y2k-mint/20" : "border-y2k-ink/20 bg-card"
            )}>
              <div className={cn("flex size-9 shrink-0 items-center justify-center rounded border-2 border-y2k-ink text-y2k-ink",
                step.status === "completed" ? "bg-y2k-mint" : step.status === "current" ? "bg-y2k-blue" : "bg-y2k-panel"
              )}>
                {step.status === "completed" ? <CheckIcon className="size-4 stroke-[3px]" /> : step.icon}
              </div>
              <div className="flex-1 space-y-0.5">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-y2k-ink">Step {step.number}: {step.title}</p>
                  {step.status === "current" && <Badge variant="blue" className="text-[10px]">In progress</Badge>}
                </div>
                <p className="text-xs text-y2k-ink/70">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">Back</Button>
        <Button variant="blue" size="sm">Continue</Button>
      </CardFooter>
    </Card>
  )
}`,

  "team-01": `"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { TwitterIcon, GithubIcon, LinkedinIcon, MailIcon } from "lucide-react"

const team = [
  { name: "Sarah Chen", role: "CEO & Founder", bio: "Design systems enthusiast with 10+ years in product design.", avatar: "SC", color: "bg-y2k-pink" },
  { name: "Alex Rivera", role: "Lead Developer", bio: "Full-stack engineer passionate about accessible web components.", avatar: "AR", color: "bg-y2k-blue" },
  { name: "Jordan Park", role: "Product Designer", bio: "Creating delightful user experiences through thoughtful design.", avatar: "JP", color: "bg-y2k-mint" },
  { name: "Maya Johnson", role: "Marketing Lead", bio: "Storyteller and community builder with a love for retro aesthetics.", avatar: "MJ", color: "bg-y2k-lemon" },
  { name: "Chris Lee", role: "DevOps Engineer", bio: "Infrastructure wizard keeping our systems fast and reliable.", avatar: "CL", color: "bg-y2k-lilac" },
  { name: "Emma Wilson", role: "UX Researcher", bio: "Data-driven researcher focused on user behavior and insights.", avatar: "EW", color: "bg-y2k-pink" },
]

export function TeamMembersBlock() {
  return (
    <div className="w-full max-w-4xl">
      <div className="mb-8 text-center">
        <Badge variant="lilac" className="mb-2">Our Team</Badge>
        <h2 className="text-2xl font-black text-y2k-ink">Meet the people behind Y2K UI</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-y2k-ink/60">A passionate team of designers, developers, and creators building the future of retro-modern interfaces.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((member) => (
          <Card key={member.name} className="transition-all hover:-translate-y-0.5">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar size="xl">
                  <AvatarFallback className={\`\${member.color} text-lg font-bold\`}>{member.avatar}</AvatarFallback>
                </Avatar>
                <h3 className="mt-3 text-sm font-bold text-y2k-ink">{member.name}</h3>
                <p className="text-xs font-semibold text-y2k-ink/60">{member.role}</p>
                <Separator className="my-3" />
                <p className="text-xs leading-relaxed text-y2k-ink/70">{member.bio}</p>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="ghost" className="size-7 p-0"><TwitterIcon className="size-3.5" /></Button>
                  <Button size="sm" variant="ghost" className="size-7 p-0"><GithubIcon className="size-3.5" /></Button>
                  <Button size="sm" variant="ghost" className="size-7 p-0"><LinkedinIcon className="size-3.5" /></Button>
                  <Button size="sm" variant="ghost" className="size-7 p-0"><MailIcon className="size-3.5" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}`,

  "blog-01": `"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ClockIcon, ArrowRightIcon, MessageSquareIcon, HeartIcon } from "lucide-react"

const posts = [
  { title: "Getting Started with Y2K UI Components", excerpt: "Learn how to install and customize Y2K UI components in your React project.", category: "Tutorial", categoryColor: "bg-y2k-blue", author: "Sarah Chen", authorInitials: "SC", authorColor: "bg-y2k-pink", readTime: "5 min read", comments: 12, likes: 48 },
  { title: "The Rise of Retro-Futuristic Design in 2025", excerpt: "Explore why Y2K aesthetics are making a comeback and how modern developers are reimagining retro interfaces.", category: "Design", categoryColor: "bg-y2k-pink", author: "Jordan Park", authorInitials: "JP", authorColor: "bg-y2k-mint", readTime: "8 min read", comments: 24, likes: 96 },
  { title: "Building Accessible Components with Radix UI", excerpt: "A deep dive into how Y2K UI leverages Radix primitives to create fully accessible components.", category: "Engineering", categoryColor: "bg-y2k-mint", author: "Alex Rivera", authorInitials: "AR", authorColor: "bg-y2k-blue", readTime: "12 min read", comments: 18, likes: 72 },
]

export function BlogCardsBlock() {
  return (
    <div className="w-full max-w-4xl">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Badge variant="lemon" className="mb-2">Blog</Badge>
          <h2 className="text-xl font-black text-y2k-ink">Latest articles</h2>
        </div>
        <Button variant="outline" size="sm" trailingIcon={<ArrowRightIcon />}>View all</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.title} className="flex flex-col transition-all hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_#1b1b3a]">
            <CardHeader className="pb-3">
              <div className="mb-2 flex h-32 items-center justify-center rounded border-2 border-y2k-ink bg-y2k-panel">
                <span className="text-4xl font-black text-y2k-ink/20">{post.category[0]}</span>
              </div>
              <Badge variant="default" className={\`self-start \${post.categoryColor}\`}>{post.category}</Badge>
            </CardHeader>
            <CardContent className="flex-1 space-y-2">
              <h3 className="text-sm font-bold leading-tight text-y2k-ink">{post.title}</h3>
              <p className="text-xs leading-relaxed text-y2k-ink/70">{post.excerpt}</p>
            </CardContent>
            <Separator />
            <CardFooter className="flex items-center justify-between pt-3">
              <div className="flex items-center gap-2">
                <Avatar size="xs">
                  <AvatarFallback className={\`\${post.authorColor} text-[8px] font-bold\`}>{post.authorInitials}</AvatarFallback>
                </Avatar>
                <div className="space-y-0">
                  <p className="text-[10px] font-semibold text-y2k-ink">{post.author}</p>
                  <div className="flex items-center gap-1 text-[10px] text-y2k-ink/50">
                    <ClockIcon className="size-2" /> {post.readTime}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-y2k-ink/60">
                <span className="flex items-center gap-0.5"><HeartIcon className="size-2.5" /> {post.likes}</span>
                <span className="flex items-center gap-0.5"><MessageSquareIcon className="size-2.5" /> {post.comments}</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}`,

  "music-player-01": `"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { PlayIcon, PauseIcon, SkipBackIcon, SkipForwardIcon, RepeatIcon, ShuffleIcon, Volume2Icon, HeartIcon, ListMusicIcon } from "lucide-react"

export function MusicPlayerBlock() {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [progress, setProgress] = React.useState([35])
  const [volume, setVolume] = React.useState([70])

  return (
    <Card className="w-full max-w-sm bg-y2k-lilac/10">
      <CardContent className="pt-6">
        <div className="relative mx-auto mb-4 flex h-48 w-48 items-center justify-center rounded border-2 border-y2k-ink bg-linear-to-br from-y2k-pink via-y2k-lilac to-y2k-blue">
          <span className="text-6xl font-black text-white/80">♪</span>
          <div className="absolute bottom-2 right-2 flex gap-1">
            <Button size="sm" variant="ghost" className="size-7 rounded-full border-2 border-y2k-ink bg-white p-0">
              <HeartIcon className="size-3 text-y2k-pink" />
            </Button>
          </div>
        </div>
        <div className="mb-4 text-center">
          <h3 className="text-base font-black text-y2k-ink">Pastel Dreams</h3>
          <p className="text-xs text-y2k-ink/60">Y2K Collective • Retro Vibes</p>
        </div>
        <div className="mb-4 space-y-1">
          <Slider value={progress} onValueChange={(v) => setProgress(v as number[])} max={100} step={1} variant="pink" />
          <div className="flex justify-between text-[10px] text-y2k-ink/60">
            <span>1:24</span>
            <span>3:45</span>
          </div>
        </div>
        <div className="mb-4 flex items-center justify-center gap-2">
          <Button size="sm" variant="ghost" className="size-8 p-0"><ShuffleIcon className="size-3.5" /></Button>
          <Button size="sm" variant="ghost" className="size-8 p-0"><SkipBackIcon className="size-4" /></Button>
          <Button size="sm" variant="pink" className="size-12 rounded-full border-2 border-y2k-ink" onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <PauseIcon className="size-5" /> : <PlayIcon className="size-5" />}
          </Button>
          <Button size="sm" variant="ghost" className="size-8 p-0"><SkipForwardIcon className="size-4" /></Button>
          <Button size="sm" variant="ghost" className="size-8 p-0"><RepeatIcon className="size-3.5" /></Button>
        </div>
        <div className="flex items-center gap-2">
          <Volume2Icon className="size-3.5 text-y2k-ink/60" />
          <Slider value={volume} onValueChange={(v) => setVolume(v as number[])} max={100} step={1} className="flex-1" />
          <Button size="sm" variant="ghost" className="size-7 p-0"><ListMusicIcon className="size-3.5" /></Button>
        </div>
      </CardContent>
    </Card>
  )
}`,

  "weather-01": `"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CloudIcon, SunIcon, CloudRainIcon, WindIcon, DropletsIcon, EyeIcon, ThermometerIcon } from "lucide-react"

const forecast = [
  { day: "Mon", temp: "24°", icon: <SunIcon className="size-5" />, color: "bg-y2k-lemon" },
  { day: "Tue", temp: "22°", icon: <CloudIcon className="size-5" />, color: "bg-y2k-blue" },
  { day: "Wed", temp: "19°", icon: <CloudRainIcon className="size-5" />, color: "bg-y2k-lilac" },
  { day: "Thu", temp: "21°", icon: <SunIcon className="size-5" />, color: "bg-y2k-lemon" },
  { day: "Fri", temp: "23°", icon: <CloudIcon className="size-5" />, color: "bg-y2k-mint" },
]

export function WeatherWidgetBlock() {
  return (
    <Card className="w-full max-w-sm bg-y2k-blue/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Tokyo, Japan</CardTitle>
          <Badge variant="mint">Live</Badge>
        </div>
        <p className="text-xs text-y2k-ink/60">Monday, March 15, 2025</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-black text-y2k-ink">24°</span>
              <span className="text-sm text-y2k-ink/60">C</span>
            </div>
            <p className="text-sm font-semibold text-y2k-ink">Partly Cloudy</p>
            <p className="text-xs text-y2k-ink/60">Feels like 26°</p>
          </div>
          <div className="flex size-20 items-center justify-center rounded border-2 border-y2k-ink bg-y2k-lemon text-y2k-ink">
            <SunIcon className="size-10" />
          </div>
        </div>
        <Separator />
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 rounded border-2 border-y2k-ink bg-card px-2.5 py-2">
            <WindIcon className="size-4 text-y2k-ink/70" />
            <div>
              <p className="text-[10px] text-y2k-ink/60">Wind</p>
              <p className="text-xs font-bold text-y2k-ink">12 km/h</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded border-2 border-y2k-ink bg-card px-2.5 py-2">
            <DropletsIcon className="size-4 text-y2k-ink/70" />
            <div>
              <p className="text-[10px] text-y2k-ink/60">Humidity</p>
              <p className="text-xs font-bold text-y2k-ink">65%</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded border-2 border-y2k-ink bg-card px-2.5 py-2">
            <EyeIcon className="size-4 text-y2k-ink/70" />
            <div>
              <p className="text-[10px] text-y2k-ink/60">Visibility</p>
              <p className="text-xs font-bold text-y2k-ink">10 km</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded border-2 border-y2k-ink bg-card px-2.5 py-2">
            <ThermometerIcon className="size-4 text-y2k-ink/70" />
            <div>
              <p className="text-[10px] text-y2k-ink/60">Pressure</p>
              <p className="text-xs font-bold text-y2k-ink">1013 hPa</p>
            </div>
          </div>
        </div>
        <Separator />
        <div>
          <p className="mb-2 text-xs font-bold text-y2k-ink">5-Day Forecast</p>
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
            {forecast.map((day) => (
              <div key={day.day} className="flex flex-col items-center gap-1 rounded border-2 border-y2k-ink bg-card px-1 py-1.5 sm:px-2">
                <span className="text-[10px] font-semibold text-y2k-ink/60">{day.day}</span>
                <div className={\`flex size-6 items-center justify-center rounded border border-y2k-ink \${day.color} text-y2k-ink sm:size-7\`}>
                  {day.icon}
                </div>
                <span className="text-[10px] font-bold text-y2k-ink sm:text-xs">{day.temp}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}`,
};
