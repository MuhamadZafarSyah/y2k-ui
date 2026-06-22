"use client"

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
          Don&apos;t have an account?{" "}
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
}
