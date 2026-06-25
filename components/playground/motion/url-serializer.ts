import { type MotionConfig, DEFAULT_CONFIG } from "./motion-presets"

const isBrowser = typeof window !== "undefined"

export function serializeMotionToUrl(config: MotionConfig): string {
  if (!isBrowser) return ""

  const shortConfig = {
    p: config.preset ?? "custom",
    n: config.name,
    d: config.duration,
    y: config.delay,
    i: config.iterationCount === "infinite" ? "inf" : config.iterationCount,
    di: config.direction,
    f: config.fillMode,
    et: config.easing.type,
    ev: config.easing.value,
    tg: config.target,
    tr: config.trigger,
    rm: config.respectReducedMotion ? 1 : 0,
  }

  try {
    const jsonString = JSON.stringify(shortConfig)
    const base64 = btoa(encodeURIComponent(jsonString))
    const url = new URL(window.location.href)
    url.hash = `motion=${base64}`
    return url.toString()
  } catch (err) {
    console.error("Failed to serialize motion config:", err)
    return window.location.href
  }
}

export function deserializeMotionFromUrl(): MotionConfig | null {
  if (!isBrowser) return null

  try {
    const hash = window.location.hash
    if (!hash.startsWith("#motion=")) return null

    const base64 = hash.replace("#motion=", "")
    if (!base64) return null

    const jsonString = decodeURIComponent(atob(base64))
    const shortConfig = JSON.parse(jsonString)

    return {
      preset: shortConfig.p ?? DEFAULT_CONFIG.preset,
      name: shortConfig.n ?? DEFAULT_CONFIG.name,
      duration: shortConfig.d ?? DEFAULT_CONFIG.duration,
      delay: shortConfig.y ?? DEFAULT_CONFIG.delay,
      iterationCount: shortConfig.i === "inf" ? "infinite" : (shortConfig.i ?? DEFAULT_CONFIG.iterationCount),
      direction: shortConfig.di ?? DEFAULT_CONFIG.direction,
      fillMode: shortConfig.f ?? DEFAULT_CONFIG.fillMode,
      easing: {
        type: shortConfig.et ?? DEFAULT_CONFIG.easing.type,
        value: shortConfig.ev ?? DEFAULT_CONFIG.easing.value,
      },
      target: shortConfig.tg ?? DEFAULT_CONFIG.target,
      trigger: shortConfig.tr ?? DEFAULT_CONFIG.trigger,
      respectReducedMotion: shortConfig.rm === 1,
      // Keyframes will fall back to preset or default in page if custom
    }
  } catch (err) {
    console.error("Failed to deserialize motion config:", err)
    return null
  }
}
