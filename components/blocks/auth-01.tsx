"use client"

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
        <div className="mx-auto mb-2 flex size-10 items-center justify-center rounded border-2 border-y2k-ink bg-y2k-pink text-sm font-bold">
          ✦
        </div>
        <CardTitle className="text-xl">Get started</CardTitle>
        <CardDescription>
          Create an account or sign in to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login">
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="login" className="flex-1">
              Login
            </TabsTrigger>
            <TabsTrigger value="register" className="flex-1">
              Register
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="auth-login-email">Email</Label>
              <Input
                id="auth-login-email"
                type="email"
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="auth-login-password">Password</Label>
              <Input
                id="auth-login-password"
                type="password"
                placeholder="Your password"
              />
            </div>
            <Button className="w-full" variant="blue">
              Sign in
            </Button>
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="auth-first-name">First name</Label>
                <Input
                  id="auth-first-name"
                  placeholder="First name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="auth-last-name">Last name</Label>
                <Input
                  id="auth-last-name"
                  placeholder="Last name"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="auth-reg-email">Email</Label>
              <Input
                id="auth-reg-email"
                type="email"
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="auth-reg-password">Password</Label>
              <Input
                id="auth-reg-password"
                type="password"
                placeholder="Create a password"
              />
            </div>
            <Button className="w-full" variant="pink">
              Create account
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex-col gap-3">
        <Separator />
        <div className="flex w-full gap-2">
          <Button variant="outline" className="flex-1" size="sm">
            Google
          </Button>
          <Button variant="outline" className="flex-1" size="sm">
            GitHub
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
