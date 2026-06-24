export interface ThemeConfig {
  id: string                 // slug preset/custom
  name: string
  colors: {
    ink: string              // --y2k-ink
    blue: string
    pink: string
    lilac: string
    mint: string
    lemon: string
    panel: string
    background?: string
    foreground?: string
    primary?: string
    border?: string
  }
  shape: {
    radius: number           // px
    windowBorder: number     // px
    controlBorder: number    // px
  }
  typography: {
    display: string          // font family name/stack
    body: string
    mono: string
    baseSize?: number
  }
  motion: {
    enabled: boolean
    speed: "snappy" | "smooth" | "off"
  }
}

export const PRESETS: ThemeConfig[] = [
  {
    id: "default",
    name: "Default Y2K",
    colors: {
      ink: "#1b1b3a",
      blue: "#8ed1fc",
      pink: "#ff8fcf",
      lilac: "#b69cff",
      mint: "#8ff0d0",
      lemon: "#ffe45e",
      panel: "#d7dde8",
      background: "#f7f8fc",
      foreground: "#1b1b3a",
      primary: "#8ed1fc",
      border: "#1b1b3a",
    },
    shape: {
      radius: 8,
      windowBorder: 2,
      controlBorder: 2,
    },
    typography: {
      display: "Geist Sans",
      body: "Geist Sans",
      mono: "Geist Mono",
      baseSize: 14,
    },
    motion: {
      enabled: true,
      speed: "smooth",
    },
  },
  {
    id: "minty-fresh",
    name: "Minty Fresh",
    colors: {
      ink: "#122b22",
      blue: "#a7f3d0",
      pink: "#f472b6",
      lilac: "#c084fc",
      mint: "#34d399",
      lemon: "#fef08a",
      panel: "#ecfdf5",
      background: "#f4fcf9",
      foreground: "#122b22",
      primary: "#34d399",
      border: "#122b22",
    },
    shape: {
      radius: 6,
      windowBorder: 3,
      controlBorder: 2,
    },
    typography: {
      display: "Space Grotesk",
      body: "Plus Jakarta Sans",
      mono: "JetBrains Mono",
      baseSize: 14,
    },
    motion: {
      enabled: true,
      speed: "smooth",
    },
  },
  {
    id: "vaporwave",
    name: "Vaporwave",
    colors: {
      ink: "#2d004d",
      blue: "#00f0ff",
      pink: "#ff007f",
      lilac: "#bd00ff",
      mint: "#00ffcc",
      lemon: "#fffb00",
      panel: "#ffe6f2",
      background: "#fff0f8",
      foreground: "#2d004d",
      primary: "#ff007f",
      border: "#2d004d",
    },
    shape: {
      radius: 4,
      windowBorder: 2,
      controlBorder: 2,
    },
    typography: {
      display: "Outfit",
      body: "Inter",
      mono: "Courier New",
      baseSize: 14,
    },
    motion: {
      enabled: true,
      speed: "snappy",
    },
  },
  {
    id: "cyber-pink",
    name: "Cyber Pink",
    colors: {
      ink: "#1a0f1a",
      blue: "#38bdf8",
      pink: "#ec4899",
      lilac: "#a855f7",
      mint: "#10b981",
      lemon: "#facc15",
      panel: "#fdf2f8",
      background: "#fff5f9",
      foreground: "#1a0f1a",
      primary: "#ec4899",
      border: "#1a0f1a",
    },
    shape: {
      radius: 10,
      windowBorder: 2,
      controlBorder: 2,
    },
    typography: {
      display: "Outfit",
      body: "Inter",
      mono: "Geist Mono",
      baseSize: 14,
    },
    motion: {
      enabled: true,
      speed: "smooth",
    },
  },
  {
    id: "monochrome",
    name: "Mono Ink",
    colors: {
      ink: "#09090b",
      blue: "#e4e4e7",
      pink: "#a1a1aa",
      lilac: "#d4d4d8",
      mint: "#71717a",
      lemon: "#f4f4f5",
      panel: "#f4f4f5",
      background: "#fafafa",
      foreground: "#09090b",
      primary: "#09090b",
      border: "#09090b",
    },
    shape: {
      radius: 0,
      windowBorder: 2,
      controlBorder: 2,
    },
    typography: {
      display: "Geist Sans",
      body: "Geist Sans",
      mono: "Geist Mono",
      baseSize: 14,
    },
    motion: {
      enabled: false,
      speed: "off",
    },
  },
]
