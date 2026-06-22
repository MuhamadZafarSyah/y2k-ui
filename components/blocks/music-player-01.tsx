"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import {
  PlayIcon,
  PauseIcon,
  SkipBackIcon,
  SkipForwardIcon,
  RepeatIcon,
  ShuffleIcon,
  Volume2Icon,
  HeartIcon,
  ListMusicIcon,
} from "lucide-react"

export function MusicPlayerBlock() {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [progress, setProgress] = React.useState([35])
  const [volume, setVolume] = React.useState([70])

  return (
    <Card className="w-full max-w-sm bg-y2k-lilac/10">
      <CardContent className="pt-6">
        {/* Album Art */}
        <div className="relative mx-auto mb-4 flex h-48 w-48 items-center justify-center rounded border-2 border-y2k-ink bg-gradient-to-br from-y2k-pink via-y2k-lilac to-y2k-blue">
          <span className="text-6xl font-black text-white/80">♪</span>
          <div className="absolute bottom-2 right-2 flex gap-1">
            <Button size="sm" variant="ghost" className="size-7 rounded-full border-2 border-y2k-ink bg-white p-0">
              <HeartIcon className="size-3 text-y2k-pink" />
            </Button>
          </div>
        </div>

        {/* Track Info */}
        <div className="mb-4 text-center">
          <h3 className="text-base font-black text-y2k-ink">Pastel Dreams</h3>
          <p className="text-xs text-y2k-ink/60">Y2K Collective • Retro Vibes</p>
        </div>

        {/* Progress */}
        <div className="mb-4 space-y-1">
          <Slider
            value={progress}
            onValueChange={(v) => setProgress(v as number[])}
            max={100}
            step={1}
            variant="pink"
          />
          <div className="flex justify-between text-[10px] text-y2k-ink/60">
            <span>1:24</span>
            <span>3:45</span>
          </div>
        </div>

        {/* Controls */}
        <div className="mb-4 flex items-center justify-center gap-2">
          <Button size="sm" variant="ghost" className="size-8 p-0">
            <ShuffleIcon className="size-3.5" />
          </Button>
          <Button size="sm" variant="ghost" className="size-8 p-0">
            <SkipBackIcon className="size-4" />
          </Button>
          <Button
            size="sm"
            variant="pink"
            className="size-12 rounded-full border-2 border-y2k-ink"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <PauseIcon className="size-5" />
            ) : (
              <PlayIcon className="size-5" />
            )}
          </Button>
          <Button size="sm" variant="ghost" className="size-8 p-0">
            <SkipForwardIcon className="size-4" />
          </Button>
          <Button size="sm" variant="ghost" className="size-8 p-0">
            <RepeatIcon className="size-3.5" />
          </Button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2">
          <Volume2Icon className="size-3.5 text-y2k-ink/60" />
          <Slider
            value={volume}
            onValueChange={(v) => setVolume(v as number[])}
            max={100}
            step={1}
            className="flex-1"
          />
          <Button size="sm" variant="ghost" className="size-7 p-0">
            <ListMusicIcon className="size-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
