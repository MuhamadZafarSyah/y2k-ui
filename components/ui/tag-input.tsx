"use client"

import * as React from "react"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type TagInputProps = {
  value?: string[]
  defaultValue?: string[]
  onChange?: (tags: string[]) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  maxTags?: number
  /** Custom validator for new tag values */
  validate?: (value: string) => string | true
}

function TagInput({
  value: controlledValue,
  defaultValue = [],
  onChange,
  placeholder = "Type and press Enter...",
  disabled = false,
  className,
  maxTags,
  validate,
  ...props
}: TagInputProps) {
  const [internalTags, setInternalTags] = React.useState<string[]>(defaultValue)
  const [inputValue, setInputValue] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const isControlled = controlledValue !== undefined
  const tags = isControlled ? controlledValue : internalTags

  const setTags = React.useCallback(
    (newTags: string[] | ((prev: string[]) => string[])) => {
      const next = typeof newTags === "function" ? newTags(tags) : newTags
      if (!isControlled) setInternalTags(next)
      onChange?.(next)
    },
    [isControlled, onChange, tags]
  )

  const addTag = React.useCallback(
    (tag: string) => {
      const trimmed = tag.trim()
      if (!trimmed) return

      if (validate) {
        const result = validate(trimmed)
        if (result !== true) {
          setError(result)
          return
        }
      }

      if (tags.includes(trimmed)) {
        setError("Tag already exists")
        return
      }

      if (maxTags !== undefined && tags.length >= maxTags) {
        setError(`Maximum ${maxTags} tags allowed`)
        return
      }

      setError(null)
      setTags((prev) => [...prev, trimmed])
      setInputValue("")
    },
    [tags, maxTags, validate, setTags]
  )

  const removeTag = React.useCallback(
    (index: number) => {
      setTags((prev) => prev.filter((_, i) => i !== index))
      setError(null)
    },
    [setTags]
  )

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag(inputValue)
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1)
    } else if (e.key === "Escape") {
      setInputValue("")
      inputRef.current?.blur()
    }
  }

  const handleContainerClick = () => {
    inputRef.current?.focus()
  }

  const id = React.useId()

  return (
    <div className={cn("w-full", className)} {...props}>
      <div
        ref={containerRef}
        data-slot="tag-input"
        role="listbox"
        aria-label="Tag input"
        tabIndex={-1}
        onClick={handleContainerClick}
        className={cn(
          "flex min-h-8 w-full flex-wrap items-center gap-1 rounded border-2 border-[#1b1b3a] bg-white px-1.5 py-1 transition-colors focus-within:ring-2 focus-within:ring-[#ff8fcf]",
          disabled && "cursor-not-allowed opacity-50",
          error && "border-[#ff8fcf] focus-within:ring-[#ff8fcf]"
        )}
      >
        {tags.map((tag, index) => (
          <span
            key={`${tag}-${index}`}
            data-slot="tag"
            role="option"
            aria-selected={false}
            className="inline-flex h-6 items-center gap-1 rounded border-2 border-[#1b1b3a] bg-[#8ed1fc] px-1.5 text-xs font-semibold text-[#1b1b3a]"
          >
            <span className="max-w-32 truncate">{tag}</span>
            {!disabled && (
              <button
                type="button"
                aria-label={`Remove ${tag}`}
                onClick={(e) => {
                  e.stopPropagation()
                  removeTag(index)
                }}
                className="flex size-3.5 shrink-0 items-center justify-center rounded-sm hover:bg-[#ff8fcf] transition-colors"
              >
                <XIcon className="size-2.5" />
              </button>
            )}
          </span>
        ))}
        {(!maxTags || tags.length < maxTags) && (
          <input
            ref={inputRef}
            id={id}
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value)
              setError(null)
            }}
            onKeyDown={handleKeyDown}
            placeholder={tags.length === 0 ? placeholder : ""}
            disabled={disabled}
            aria-invalid={!!error}
            className="h-6 min-w-20 flex-1 bg-transparent px-0.5 text-sm text-[#1b1b3a] outline-none placeholder:text-[#1b1b3a]/45 disabled:cursor-not-allowed"
          />
        )}
      </div>
      {error && (
        <p
          data-slot="tag-input-error"
          role="alert"
          className="mt-1 text-xs font-semibold text-[#ff8fcf]"
        >
          {error}
        </p>
      )}
    </div>
  )
}

export { TagInput, type TagInputProps }
