export type TriggerType = "autoplay" | "hover" | "tap" | "scroll"
export type TargetType = "button" | "badge" | "card" | "dialog" | "text" | "image" | "box"

export interface MotionConfig {
  preset?: string            // e.g. "wiggle" | "fade-up" | "custom"
  name: string               // animation name for @theme/@keyframes
  duration: number           // ms
  delay: number              // ms
  iterationCount: number | "infinite"
  direction: "normal" | "reverse" | "alternate" | "alternate-reverse"
  fillMode: "none" | "forwards" | "backwards" | "both"
  easing: {
    type: "preset" | "bezier"
    value: string            // "ease-in-out" | "cubic-bezier(0.34,1.56,0.64,1)"
  }
  keyframes?: Record<string, Record<string, string>> // for custom/edit
  target: TargetType
  trigger: TriggerType
  respectReducedMotion: boolean
}

export interface MotionPreset {
  id: string
  name: string
  description: string
  duration: number
  delay: number
  iterationCount: number | "infinite"
  direction: "normal" | "reverse" | "alternate" | "alternate-reverse"
  fillMode: "none" | "forwards" | "backwards" | "both"
  easing: {
    type: "preset" | "bezier"
    value: string
  }
  keyframes: Record<string, Record<string, string>>
}

export const PRESET_EASINGS = [
  { label: "Linear", value: "linear" },
  { label: "Ease", value: "ease" },
  { label: "Ease In", value: "ease-in" },
  { label: "Ease Out", value: "ease-out" },
  { label: "Ease In Out", value: "ease-in-out" },
  { label: "Y2K Spring (Overshoot)", value: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
  { label: "Retro Bounce", value: "cubic-bezier(0.175, 0.885, 0.32, 1.275)" },
  { label: "Kawaii Swift", value: "cubic-bezier(0.4, 0, 0.2, 1)" },
  { label: "Lilac Smooth", value: "cubic-bezier(0.25, 1, 0.5, 1)" },
]

export const PRESETS: MotionPreset[] = [
  {
    id: "wiggle",
    name: "Wiggle",
    description: "Playful tilt animation ideal for hover effects.",
    duration: 500,
    delay: 0,
    iterationCount: "infinite",
    direction: "normal",
    fillMode: "none",
    easing: { type: "bezier", value: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
    keyframes: {
      "0%, 100%": { transform: "rotate(-3deg)" },
      "50%": { transform: "rotate(3deg)" },
    },
  },
  {
    id: "float",
    name: "Float",
    description: "Gentle hovering motion to feel lightweight.",
    duration: 3000,
    delay: 0,
    iterationCount: "infinite",
    direction: "normal",
    fillMode: "none",
    easing: { type: "preset", value: "ease-in-out" },
    keyframes: {
      "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
      "50%": { transform: "translateY(-12px) rotate(2deg)" },
    },
  },
  {
    id: "spin-slow",
    name: "Spin Slow",
    description: "Relaxed 360 rotation for vinyl or circular elements.",
    duration: 8000,
    delay: 0,
    iterationCount: "infinite",
    direction: "normal",
    fillMode: "none",
    easing: { type: "preset", value: "linear" },
    keyframes: {
      "from": { transform: "rotate(0deg)" },
      "to": { transform: "rotate(360deg)" },
    },
  },
  {
    id: "bounce-slow",
    name: "Bounce Slow",
    description: "Classic vertical bouncing animation.",
    duration: 2000,
    delay: 0,
    iterationCount: "infinite",
    direction: "normal",
    fillMode: "none",
    easing: { type: "preset", value: "ease-in-out" },
    keyframes: {
      "0%, 100%": { transform: "translateY(0)" },
      "50%": { transform: "translateY(-10px)" },
    },
  },
  {
    id: "shimmer",
    name: "Shimmer",
    description: "Retro sheen overlay animation.",
    duration: 2500,
    delay: 0,
    iterationCount: "infinite",
    direction: "normal",
    fillMode: "none",
    easing: { type: "preset", value: "linear" },
    keyframes: {
      "0%": { "background-position": "-200% 0" },
      "100%": { "background-position": "200% 0" },
    },
  },
  {
    id: "y2k-lift",
    name: "Y2K Lift",
    description: "Lifts up and projects a flat offset border shadow.",
    duration: 300,
    delay: 0,
    iterationCount: 1,
    direction: "normal",
    fillMode: "forwards",
    easing: { type: "bezier", value: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
    keyframes: {
      "0%": { transform: "translate(0, 0)", "box-shadow": "0px 0px 0px #1b1b3a" },
      "100%": { transform: "translate(-4px, -4px)", "box-shadow": "4px 4px 0px #1b1b3a" },
    },
  },
  {
    id: "glow-pulse",
    name: "Glow Pulse",
    description: "Modulates opacity and scale for a retro neon glow.",
    duration: 2000,
    delay: 0,
    iterationCount: "infinite",
    direction: "normal",
    fillMode: "none",
    easing: { type: "preset", value: "ease-in-out" },
    keyframes: {
      "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
      "50%": { opacity: "0.9", transform: "scale(1.03)" },
    },
  },
  {
    id: "draw",
    name: "Draw Stroke",
    description: "Draws SVGs using stroke dashoffset offsets.",
    duration: 1500,
    delay: 0,
    iterationCount: 1,
    direction: "normal",
    fillMode: "forwards",
    easing: { type: "preset", value: "ease-in-out" },
    keyframes: {
      "from": { "stroke-dashoffset": "100" },
      "to": { "stroke-dashoffset": "0" },
    },
  },
  {
    id: "fade-up",
    name: "Fade Up",
    description: "Fades in and slides up from below.",
    duration: 600,
    delay: 0,
    iterationCount: 1,
    direction: "normal",
    fillMode: "both",
    easing: { type: "bezier", value: "cubic-bezier(0.25, 1, 0.5, 1)" },
    keyframes: {
      "from": { opacity: "0", transform: "translateY(20px)" },
      "to": { opacity: "1", transform: "translateY(0)" },
    },
  },
  {
    id: "jump",
    name: "Jump",
    description: "Squashes and jumps with squishy elasticity.",
    duration: 1000,
    delay: 0,
    iterationCount: 1,
    direction: "normal",
    fillMode: "none",
    easing: { type: "preset", value: "ease-in-out" },
    keyframes: {
      "0%, 100%": { transform: "scale(1, 1) translateY(0)" },
      "10%": { transform: "scale(1.1, 0.9) translateY(0)" },
      "30%": { transform: "scale(0.9, 1.15) translateY(-14px)" },
      "50%": { transform: "scale(1.05, 0.95) translateY(0)" },
      "57%": { transform: "scale(1, 1) translateY(-3px)" },
      "64%": { transform: "scale(1, 1) translateY(0)" },
    },
  },
  {
    id: "shake",
    name: "Shake",
    description: "Vibrates back and forth to grab attention.",
    duration: 600,
    delay: 0,
    iterationCount: 1,
    direction: "normal",
    fillMode: "none",
    easing: { type: "preset", value: "ease-in-out" },
    keyframes: {
      "0%, 100%": { transform: "translateX(0)" },
      "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-5px)" },
      "20%, 40%, 60%, 80%": { transform: "translateX(5px)" },
    },
  },
  {
    id: "ping",
    name: "Ping",
    description: "Expands outward rapidly while fading out.",
    duration: 1000,
    delay: 0,
    iterationCount: "infinite",
    direction: "normal",
    fillMode: "none",
    easing: { type: "preset", value: "ease-out" },
    keyframes: {
      "0%": { transform: "scale(1)", opacity: "1" },
      "75%, 100%": { transform: "scale(1.8)", opacity: "0" },
    },
  },
  {
    id: "flip-up",
    name: "Flip Up",
    description: "3D flip from flat horizontal axis facing upwards.",
    duration: 800,
    delay: 0,
    iterationCount: 1,
    direction: "normal",
    fillMode: "both",
    easing: { type: "bezier", value: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
    keyframes: {
      "from": { transform: "perspective(400px) rotateX(90deg)", opacity: "0" },
      "to": { transform: "perspective(400px) rotateX(0deg)", opacity: "1" },
    },
  },
]

export const DEFAULT_CONFIG: MotionConfig = {
  preset: "wiggle",
  name: "wiggle",
  duration: 500,
  delay: 0,
  iterationCount: "infinite",
  direction: "normal",
  fillMode: "none",
  easing: { type: "bezier", value: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
  target: "button",
  trigger: "autoplay",
  respectReducedMotion: true,
  keyframes: PRESETS[0].keyframes,
}
