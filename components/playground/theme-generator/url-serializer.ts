import { type ThemeConfig, PRESETS } from "./theme-presets"

// Helper to check if running in browser
const isBrowser = typeof window !== "undefined"

export function serializeThemeToUrl(config: ThemeConfig): string {
  if (!isBrowser) return ""

  const shortConfig = {
    i: config.colors.ink,
    bl: config.colors.blue,
    pk: config.colors.pink,
    ll: config.colors.lilac,
    mn: config.colors.mint,
    lm: config.colors.lemon,
    pn: config.colors.panel,
    r: config.shape.radius,
    wb: config.shape.windowBorder,
    cb: config.shape.controlBorder,
    td: config.typography.display,
    tb: config.typography.body,
    tm: config.typography.mono,
    me: config.motion.enabled ? 1 : 0,
    ms: config.motion.speed,
  }

  try {
    const jsonString = JSON.stringify(shortConfig)
    const base64 = btoa(encodeURIComponent(jsonString))
    const url = new URL(window.location.href)
    url.hash = `theme=${base64}`
    return url.toString()
  } catch (err) {
    console.error("Failed to serialize theme config:", err)
    return window.location.href
  }
}

export function deserializeThemeFromUrl(): ThemeConfig | null {
  if (!isBrowser) return null

  try {
    const hash = window.location.hash
    if (!hash.startsWith("#theme=")) return null

    const base64 = hash.replace("#theme=", "")
    if (!base64) return null

    const jsonString = decodeURIComponent(atob(base64))
    const shortConfig = JSON.parse(jsonString)

    // Map back to ThemeConfig
    const defaultPreset = PRESETS[0]
    return {
      id: "custom",
      name: "Custom Vibe",
      colors: {
        ink: shortConfig.i ?? defaultPreset.colors.ink,
        blue: shortConfig.bl ?? defaultPreset.colors.blue,
        pink: shortConfig.pk ?? defaultPreset.colors.pink,
        lilac: shortConfig.ll ?? defaultPreset.colors.lilac,
        mint: shortConfig.mn ?? defaultPreset.colors.mint,
        lemon: shortConfig.lm ?? defaultPreset.colors.lemon,
        panel: shortConfig.pn ?? defaultPreset.colors.panel,
        background: shortConfig.bg ?? "#f7f8fc",
        foreground: shortConfig.i ?? defaultPreset.colors.ink,
        primary: shortConfig.pk ?? defaultPreset.colors.pink,
        border: shortConfig.i ?? defaultPreset.colors.ink,
      },
      shape: {
        radius: typeof shortConfig.r === "number" ? shortConfig.r : defaultPreset.shape.radius,
        windowBorder: typeof shortConfig.wb === "number" ? shortConfig.wb : defaultPreset.shape.windowBorder,
        controlBorder: typeof shortConfig.cb === "number" ? shortConfig.cb : defaultPreset.shape.controlBorder,
      },
      typography: {
        display: shortConfig.td ?? defaultPreset.typography.display,
        body: shortConfig.tb ?? defaultPreset.typography.body,
        mono: shortConfig.tm ?? defaultPreset.typography.mono,
        baseSize: 14,
      },
      motion: {
        enabled: shortConfig.me === 1,
        speed: shortConfig.ms ?? defaultPreset.motion.speed,
      },
    }
  } catch (err) {
    console.error("Failed to deserialize theme config:", err)
    return null
  }
}
