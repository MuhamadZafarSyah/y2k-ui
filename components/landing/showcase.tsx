"use client";

import Image from "next/image"
import { MousePointer2, Gamepad2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useScrollReveal, useStaggerReveal } from "@/components/animations/use-gsap-reveal";

function PreviewCard({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded border-2 border-y2k-ink bg-white">
      <div className={`flex items-center gap-2 border-b-2 border-y2k-ink ${accent} px-3 py-1.5`}>
        <span className="flex items-center gap-1" aria-hidden>
          <span className="size-2 rounded-xs border-[1.5px] border-y2k-ink bg-white" />
          <span className="size-2 rounded-xs border-[1.5px] border-y2k-ink bg-white" />
          <span className="size-2 rounded-xs border-[1.5px] border-y2k-ink bg-white" />
        </span>
        <span className="font-mono text-[11px] font-black uppercase tracking-tight text-y2k-ink">
          {title}
        </span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

export function Showcase() {
  const headingRef = useScrollReveal({ y: 20, delay: 0.1 });
  const row1Ref = useStaggerReveal({ y: 20, stagger: 0.1 });
  const row2Ref = useStaggerReveal({ y: 20, stagger: 0.1, delay: 0.1 });

  return (
    <section className="relative overflow-hidden border-b-2 border-y2k-ink bg-white py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float absolute -right-16 -top-16 opacity-10 md:opacity-15">
          <Image src="/assets/images/7.svg" alt="Y2K decorative star shape" width={192} height={192} className="h-48 w-48 object-contain md:h-64 md:w-64" aria-hidden />
        </div>
        <div className="animate-glow-pulse absolute -bottom-12 -left-12 opacity-10" style={{ animationDelay: '2s' }}>
          <Image src="/assets/images/1.svg" alt="Y2K retro sparkle decoration" width={160} height={160} className="h-40 w-40 object-contain md:h-52 md:w-52" aria-hidden />
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-4">
        <div ref={headingRef} className="mb-10 text-center" style={{ visibility: "hidden" }}>
          <div className="mb-3 flex items-center justify-center gap-2">
            <Star className="size-4 fill-y2k-lemon text-y2k-lemon animate-wiggle" />
            <h2 className="text-2xl font-black tracking-tight text-y2k-ink md:text-3xl">Live Showcase</h2>
            <Star className="size-4 fill-y2k-lemon text-y2k-lemon animate-wiggle" style={{ animationDelay: '0.5s' }} />
          </div>
          <p className="mt-1.5 text-sm text-y2k-ink-muted">Every component is fully interactive. Click around.</p>
        </div>

        <div ref={row1Ref} className="mb-8" style={{ visibility: "hidden" }}>
          <div className="mb-4 inline-flex items-center gap-2 border-2 border-y2k-ink bg-y2k-blue px-3 py-1">
            <MousePointer2 className="size-3.5" />
            <span className="font-mono text-[11px] font-black uppercase tracking-wider text-y2k-ink">Core UI</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <PreviewCard title="buttons.ui" accent="bg-y2k-lemon">
              <div className="flex flex-wrap gap-2">
                <Button variant="default" size="sm">Default</Button>
                <Button variant="pink" size="sm">Pink</Button>
                <Button variant="blue" size="sm">Blue</Button>
                <Button variant="mint" size="sm">Mint</Button>
                <Button variant="lilac" size="sm">Lilac</Button>
                <Button variant="destructive" size="sm">Destructive</Button>
                <Button variant="outline" size="sm">Outline</Button>
                <Button variant="secondary" size="sm">Secondary</Button>
              </div>
            </PreviewCard>
            <PreviewCard title="badges.sys" accent="bg-y2k-blue">
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="blue">Blue</Badge>
                <Badge variant="pink">Pink</Badge>
                <Badge variant="lilac">Lilac</Badge>
                <Badge variant="mint">Mint</Badge>
                <Badge variant="lemon">Lemon</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </PreviewCard>
            <PreviewCard title="controls.app" accent="bg-y2k-mint">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-y2k-ink">Airplane Mode</span>
                  <Switch defaultChecked aria-label="Airplane Mode" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-y2k-ink">Dark Mode</span>
                  <Switch aria-label="Dark Mode" />
                </div>
                <Progress value={72} label="Storage" showValue className="w-full" />
                <Progress value={45} label="Bandwidth" showValue indicatorClassName="bg-y2k-pink" />
              </div>
            </PreviewCard>
          </div>
        </div>

        <div ref={row2Ref} style={{ visibility: "hidden" }}>
          <div className="mb-4 inline-flex items-center gap-2 border-2 border-y2k-ink bg-y2k-pink px-3 py-1">
            <Gamepad2 className="size-3.5" />
            <span className="font-mono text-[11px] font-black uppercase tracking-wider text-y2k-ink">Widgets &amp; Panels</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <PreviewCard title="input.exe" accent="bg-y2k-lilac">
              <div className="space-y-3">
                <Input placeholder="Type something..." />
                <Input leadingIcon={<SearchIcon />} placeholder="Search..." />
                <Input trailingIcon={<LoginIcon />} placeholder="y2k@retro.web.id" />
              </div>
            </PreviewCard>
            <PreviewCard title="panels.ui" accent="bg-y2k-pink">
              <div className="space-y-3">
                <Alert><AlertTitle>Update available</AlertTitle><AlertDescription>Y2K UI v0.3 is ready to install.</AlertDescription></Alert>
                <Alert variant="pink"><AlertTitle>Connection lost</AlertTitle><AlertDescription>Check your network and try again.</AlertDescription></Alert>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-y2k-ink">Team:</span>
                  <Avatar><AvatarFallback>YZ</AvatarFallback></Avatar>
                  <Avatar><AvatarFallback className="bg-y2k-mint">AK</AvatarFallback></Avatar>
                  <Avatar><AvatarFallback className="bg-y2k-pink">ML</AvatarFallback></Avatar>
                </div>
              </div>
            </PreviewCard>
            <PreviewCard title="misc-controls" accent="bg-y2k-lemon">
              <div className="space-y-4">
                <div>
                  <p className="mb-2 text-xs font-semibold text-y2k-ink">Toggle Group</p>
                  <ToggleGroup type="single" defaultValue="bold">
                    <ToggleGroupItem value="bold" size="sm">B</ToggleGroupItem>
                    <ToggleGroupItem value="italic" size="sm"><span className="italic">I</span></ToggleGroupItem>
                    <ToggleGroupItem value="underline" size="sm"><span className="underline">U</span></ToggleGroupItem>
                    <ToggleGroupItem value="strike" size="sm"><span className="line-through">S</span></ToggleGroupItem>
                  </ToggleGroup>
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold text-y2k-ink">Collapsible</p>
                  <Collapsible>
                    <CollapsibleTrigger>Show Details</CollapsibleTrigger>
                    <CollapsibleContent>
                      <p className="text-xs text-y2k-ink/70">Y2K UI is a collection of retro-future components built on Radix primitives.</p>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </div>
            </PreviewCard>
          </div>
        </div>
      </div>
    </section>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function LoginIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" x2="3" y1="12" y2="12" />
    </svg>
  );
}
