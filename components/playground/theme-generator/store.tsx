"use client"

import * as React from "react"
import { type ThemeConfig, PRESETS } from "./theme-presets"
import { serializeThemeToUrl, deserializeThemeFromUrl } from "./url-serializer"

type Action =
  | { type: "SET_PRESET"; presetId: string }
  | { type: "SET_COLOR"; key: keyof ThemeConfig["colors"]; value: string }
  | { type: "SET_SHAPE"; key: keyof ThemeConfig["shape"]; value: number }
  | { type: "SET_TYPOGRAPHY"; key: keyof ThemeConfig["typography"]; value: string }
  | { type: "SET_MOTION"; key: keyof ThemeConfig["motion"]; value: any }
  | { type: "LOAD_THEME"; config: ThemeConfig }
  | { type: "RESET" }

interface ThemeContextProps {
  config: ThemeConfig
  dispatch: React.Dispatch<Action>
  shareUrl: string
}

const ThemeContext = React.createContext<ThemeContextProps | undefined>(undefined)

function themeReducer(state: ThemeConfig, action: Action): ThemeConfig {
  let newState = state

  switch (action.type) {
    case "SET_PRESET": {
      const preset = PRESETS.find((p) => p.id === action.presetId)
      if (preset) {
        newState = {
          ...preset,
          id: preset.id,
        }
      }
      break
    }
    case "SET_COLOR": {
      newState = {
        ...state,
        id: "custom",
        colors: {
          ...state.colors,
          [action.key]: action.value,
          // If setting ink, update foreground and border derived semantically
          ...(action.key === "ink"
            ? { foreground: action.value, border: action.value }
            : {}),
          // If setting pink, update primary/accent derived semantically
          ...(action.key === "pink" ? { primary: action.value } : {}),
        },
      }
      break
    }
    case "SET_SHAPE": {
      newState = {
        ...state,
        id: "custom",
        shape: {
          ...state.shape,
          [action.key]: action.value,
        },
      }
      break
    }
    case "SET_TYPOGRAPHY": {
      newState = {
        ...state,
        id: "custom",
        typography: {
          ...state.typography,
          [action.key]: action.value,
        },
      }
      break
    }
    case "SET_MOTION": {
      newState = {
        ...state,
        id: "custom",
        motion: {
          ...state.motion,
          [action.key]: action.value,
        },
      }
      break
    }
    case "LOAD_THEME": {
      newState = action.config
      break
    }
    case "RESET": {
      newState = { ...PRESETS[0] }
      break
    }
    default:
      return state
  }

  // Update hash dynamically
  if (typeof window !== "undefined") {
    serializeThemeToUrl(newState)
  }

  return newState
}

export function ThemeGeneratorProvider({
  children,
  initialConfig,
}: {
  children: React.ReactNode
  initialConfig?: ThemeConfig
}) {
  const [config, dispatch] = React.useReducer(
    themeReducer,
    initialConfig || PRESETS[0]
  )

  const [shareUrl, setShareUrl] = React.useState("")

  // Keep shareUrl in sync with the config state
  React.useEffect(() => {
    const url = serializeThemeToUrl(config)
    setShareUrl(url)
  }, [config])

  return (
    <ThemeContext.Provider value={{ config, dispatch, shareUrl }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeGenerator() {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error("useThemeGenerator must be used within a ThemeGeneratorProvider")
  }
  return context
}
