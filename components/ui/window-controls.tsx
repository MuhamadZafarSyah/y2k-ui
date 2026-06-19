import * as React from "react"

type WindowControlsProps = {
  onMinimize?: () => void
  onMaximize?: () => void
  onClose?: () => void
  hideMinimize?: boolean
  hideMaximize?: boolean
  hideClose?: boolean
}

export function WindowControls({
  onMinimize,
  onMaximize,
  onClose,
  hideMinimize = false,
  hideMaximize = false,
  hideClose = false,
}: WindowControlsProps) {
  return (
    <div className="flex items-center gap-1">
      {!hideMinimize && (
        <button
          type="button"
          aria-label="Minimize"
          onClick={onMinimize}
          className="flex h-5 w-5 items-center justify-center rounded-[3px] border-2 border-[#1b1b3a] bg-[#ff8fcf] text-[#1b1b3a] text-xs leading-none active:translate-y-[1px] active:brightness-95"
        >
          _
        </button>
      )}

      {!hideMaximize && (
        <button
          type="button"
          aria-label="Maximize"
          onClick={onMaximize}
          className="flex h-5 w-5 items-center justify-center rounded-[3px] border-2 border-[#1b1b3a] bg-[#ff8fcf] text-[#1b1b3a] text-xs leading-none active:translate-y-[1px] active:brightness-95"
        >
          ▢
        </button>
      )}

      {!hideClose && (
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="flex h-5 w-5 items-center justify-center rounded-[3px] border-2 border-[#1b1b3a] bg-[#ff8fcf] text-[#1b1b3a] text-xs leading-none active:translate-y-[1px] active:brightness-95"
        >
          ✕
        </button>
      )}
    </div>
  )
}