import * as React from "react"
import { Direction as DirectionPrimitive } from "radix-ui"

type DirectionProviderProps = React.ComponentProps<typeof DirectionPrimitive.Provider>

function DirectionProvider({ ...props }: DirectionProviderProps) {
  return <DirectionPrimitive.Provider data-slot="direction-provider" {...props} />
}

export { DirectionProvider, type DirectionProviderProps }
