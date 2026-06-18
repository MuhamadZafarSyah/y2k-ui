"use client"

import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function CardDefaultDemo() {
  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Pick up where you left off</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-[#1b1b3a]/80">
          You have 3 unread messages from the Y2K support crew.
        </p>
        <div className="flex gap-1.5">
          <Badge variant="blue">new</Badge>
          <Badge variant="pink">v0.2</Badge>
          <Badge variant="mint">beta</Badge>
        </div>
      </CardContent>
      <CardFooter>
        <span className="text-xs text-[#1b1b3a]/70">Last seen 2h ago</span>
        <button className="inline-flex h-7 items-center rounded border-2 border-[#1b1b3a] bg-[#ffe45e] px-3 text-xs font-semibold text-[#1b1b3a] hover:bg-[#ff8fcf]">
          Open
        </button>
      </CardFooter>
    </Card>
  )
}

export function BadgeColorsDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">default</Badge>
      <Badge variant="blue">blue</Badge>
      <Badge variant="pink">pink</Badge>
      <Badge variant="lilac">lilac</Badge>
      <Badge variant="mint">mint</Badge>
      <Badge variant="lemon">lemon</Badge>
      <Badge variant="outline">outline</Badge>
    </div>
  )
}

export function TooltipDemo() {
  return (
    <TooltipProvider>
      <div className="flex gap-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="inline-flex h-9 items-center rounded border-2 border-[#1b1b3a] bg-[#8ed1fc] px-4 text-sm font-semibold text-[#1b1b3a] hover:bg-[#b69cff]">
              Hover me
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>kawaii tip ✨</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="inline-flex h-9 items-center rounded border-2 border-[#1b1b3a] bg-[#8ff0d0] px-4 text-sm font-semibold text-[#1b1b3a] hover:bg-[#ffe45e]">
              Save 💾
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Save your work (Ctrl+S)</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}

export function SwitchDemo() {
  const [a, setA] = React.useState(true)
  const [b, setB] = React.useState(false)
  return (
    <div className="flex flex-col gap-3">
      <label className="flex items-center justify-between gap-4 text-sm text-[#1b1b3a]">
        <span>Wi-Fi</span>
        <Switch checked={a} onCheckedChange={setA} />
      </label>
      <label className="flex items-center justify-between gap-4 text-sm text-[#1b1b3a]">
        <span>Notifications</span>
        <Switch checked={b} onCheckedChange={setB} />
      </label>
    </div>
  )
}

export function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="w-80">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="space-y-2">
        <label className="text-xs font-semibold text-[#1b1b3a]">Username</label>
        <Input defaultValue="kawaii_user" />
      </TabsContent>
      <TabsContent value="password" className="space-y-2">
        <label className="text-xs font-semibold text-[#1b1b3a]">New password</label>
        <Input type="password" placeholder="••••••••" />
      </TabsContent>
      <TabsContent value="settings" className="text-[#1b1b3a]/80">
        <p>Settings panel placeholder.</p>
      </TabsContent>
    </Tabs>
  )
}

export function AlertDemo() {
  return (
    <div className="flex w-80 flex-col gap-2">
      <Alert variant="info">
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can use this alert to share a quick info message.
        </AlertDescription>
      </Alert>
      <Alert variant="success">
        <AlertTitle>Saved</AlertTitle>
        <AlertDescription>Your changes were saved successfully.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTitle>Careful</AlertTitle>
        <AlertDescription>You have unsaved changes.</AlertDescription>
      </Alert>
    </div>
  )
}

export function CheckboxDemo() {
  const [a, setA] = React.useState(true)
  const [b, setB] = React.useState(false)
  const [c, setC] = React.useState(true)
  return (
    <div className="flex flex-col gap-3 text-sm text-[#1b1b3a]">
      <label className="flex items-center gap-2">
        <Checkbox checked={a} onCheckedChange={(v) => setA(!!v)} />
        Accept terms & conditions
      </label>
      <label className="flex items-center gap-2">
        <Checkbox checked={b} onCheckedChange={(v) => setB(!!v)} />
        Subscribe to newsletter
      </label>
      <label className="flex items-center gap-2 opacity-50">
        <Checkbox checked={c} disabled />
        Disabled option
      </label>
    </div>
  )
}

export function AvatarDemo() {
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>YL</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-[#ff8fcf]">KA</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-[#8ff0d0]">MI</AvatarFallback>
      </Avatar>
    </div>
  )
}

export function ProgressDemo() {
  const [value, setValue] = React.useState(33)
  React.useEffect(() => {
    const t = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 1))
    }, 80)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="w-80 space-y-2">
      <Progress value={value} />
      <p className="font-mono text-xs text-[#1b1b3a]/70">{value}%</p>
    </div>
  )
}

export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-60">
        <SelectValue placeholder="Pick a flavor" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="strawberry">Strawberry</SelectItem>
        <SelectItem value="lemon">Lemon</SelectItem>
        <SelectItem value="mint">Mint</SelectItem>
        <SelectItem value="lychee">Lychee</SelectItem>
      </SelectContent>
    </Select>
  )
}
