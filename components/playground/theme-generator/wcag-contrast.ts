// WCAG 2.0 Contrast Utility

export interface ContrastResult {
  ratio: number
  aaNormal: boolean
  aaLarge: boolean
  aaaNormal: boolean
  aaaLarge: boolean
  rating: "Fail" | "AA" | "AAA"
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  const fullHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b)

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

function getRelativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r / 255, g / 255, b / 255].map((c) => {
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

export function getContrastRatio(color1: string, color2: string): ContrastResult {
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)

  if (!rgb1 || !rgb2) {
    return {
      ratio: 1,
      aaNormal: false,
      aaLarge: false,
      aaaNormal: false,
      aaaLarge: false,
      rating: "Fail",
    }
  }

  const l1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b)
  const l2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b)

  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
  const roundedRatio = Math.round(ratio * 100) / 100

  const aaNormal = roundedRatio >= 4.5
  const aaLarge = roundedRatio >= 3.0
  const aaaNormal = roundedRatio >= 7.0
  const aaaLarge = roundedRatio >= 4.5

  let rating: "Fail" | "AA" | "AAA" = "Fail"
  if (aaaNormal) {
    rating = "AAA"
  } else if (aaNormal) {
    rating = "AA"
  }

  return {
    ratio: roundedRatio,
    aaNormal,
    aaLarge,
    aaaNormal,
    aaaLarge,
    rating,
  }
}

// Gives a simple tip to improve contrast
export function getContrastSuggestion(
  bgHex: string,
  fgHex: string,
  fgLabel: string
): string | null {
  const result = getContrastRatio(bgHex, fgHex)
  if (result.aaNormal) return null

  // Check if bg is dark or light
  const rgbBg = hexToRgb(bgHex)
  if (!rgbBg) return null
  const bgL = getRelativeLuminance(rgbBg.r, rgbBg.g, rgbBg.b)

  if (bgL > 0.5) {
    return `Try making the ${fgLabel} color darker to contrast against the light background.`
  } else {
    return `Try making the ${fgLabel} color lighter to contrast against the dark background.`
  }
}
