"use client"

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
        <CardDescription>
          Manage your account preferences and notifications.
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="pt-4">
        <Tabs defaultValue="general">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="display-name">Display name</Label>
                <Input
                  id="display-name"
                  defaultValue="Kawaii Dev"
                  placeholder="Your display name"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  defaultValue="@kawaii_dev"
                  placeholder="@username"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself..."
                rows={3}
                defaultValue="Building pastel-flavoured components since 2025."
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="language">Language</Label>
              <Select defaultValue="en">
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="id">Bahasa Indonesia</SelectItem>
                  <SelectItem value="ja">Japanese</SelectItem>
                  <SelectItem value="ko">Korean</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-y2k-ink">
                Email Notifications
              </h4>
              <div className="space-y-2">
                {[
                  {
                    label: "Marketing emails",
                    desc: "Receive emails about new features and updates.",
                  },
                  {
                    label: "Security alerts",
                    desc: "Get notified about security-related events.",
                  },
                  {
                    label: "Product updates",
                    desc: "Weekly digest of product changes.",
                  },
                ].map((item) => (
                  <label
                    key={item.label}
                    className="flex items-center justify-between rounded border-2 border-y2k-ink bg-card px-3 py-2.5"
                  >
                    <div>
                      <p className="text-sm font-semibold text-y2k-ink">
                        {item.label}
                      </p>
                      <p className="text-xs text-y2k-ink/60">{item.desc}</p>
                    </div>
                    <Switch defaultChecked />
                  </label>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-y2k-ink">Theme</h4>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: "Light", color: "bg-white", active: true },
                  { name: "Blue", color: "bg-y2k-blue", active: false },
                  { name: "Pink", color: "bg-y2k-pink", active: false },
                ].map((theme) => (
                  <button
                    key={theme.name}
                    type="button"
                    className={`flex flex-col items-center gap-1.5 rounded border-2 p-2 transition-all ${
                      theme.active
                        ? "border-y2k-ink bg-y2k-panel"
                        : "border-y2k-ink/30 hover:border-y2k-ink"
                    }`}
                  >
                    <div
                      className={`h-10 w-full rounded border-2 border-y2k-ink ${theme.color}`}
                    />
                    <span className="text-xs font-semibold text-y2k-ink">
                      {theme.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <Separator />
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-y2k-ink">Font Size</h4>
              <div className="flex gap-2">
                {["Small", "Medium", "Large"].map((size, i) => (
                  <Button
                    key={size}
                    size="sm"
                    variant={i === 1 ? "blue" : "outline"}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <Separator />
      <CardFooter className="flex justify-end gap-2 pt-4">
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button variant="blue" size="sm">
          Save changes
        </Button>
      </CardFooter>
    </Card>
  )
}
