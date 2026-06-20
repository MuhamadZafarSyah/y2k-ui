"use client"

import { Toaster as SonnerToaster } from "sonner"
import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

type ToasterProps = ComponentProps<typeof SonnerToaster>

function Toaster({ toastOptions, className, ...props }: ToasterProps) {
  return (
    <SonnerToaster
      closeButton
      className={cn("toaster group", className)}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "border-2 border-[#1b1b3a] rounded-[6px] bg-white " +
            "p-0 overflow-hidden relative max-w-sm w-full " +
            "shadow-[3px_3px_0px_0px_#1b1b3a] " +
            "transition-none transform-none " +
            "active:scale-100 active:bg-white active:opacity-100 " +
            "hover:scale-100 hover:bg-white hover:opacity-100 " +
            "before:content-[''] before:absolute before:inset-x-0 before:top-0 " +
            "before:h-[22px] before:z-10 before:border-b-2 before:border-[#1b1b3a]",
          title:
            "relative z-20 flex items-center h-[22px] w-full " +
            "pl-2 pr-2 text-[10px] font-black uppercase tracking-wider " +
            "text-[#1b1b3a]",
          description:
            "px-3 py-2 text-xs text-[#1b1b3a]/80 leading-relaxed",
          closeButton:
            "absolute right-[5px] top-[3px] z-30 flex items-center justify-center " +
            "bg-transparent border-0 size-[14px] text-[#1b1b3a] cursor-pointer " +
            "hover:text-[#ff8fcf]",
          icon: "hidden",
          content: "flex flex-col gap-0",
          success: "before:bg-[#ffe45e]",
          error: "before:bg-[#ff8fcf]",
          info: "before:bg-[#8ed1fc]",
          warning: "before:bg-[#b69cff]",
          actionButton:
            "bg-[#ffe45e] text-[#1b1b3a] border-2 border-[#1b1b3a] " +
            "rounded-[4px] px-2.5 py-1 text-xs font-bold mx-3 mb-3 " +
            "hover:bg-[#ff8fcf] hover:text-white active:scale-95",
          cancelButton:
            "bg-white text-[#1b1b3a] border-2 border-[#1b1b3a] " +
            "rounded-[4px] px-2.5 py-1 text-xs mx-3 mb-3 " +
            "hover:bg-[#d7dde8] active:scale-95",
        },
        ...toastOptions,
      }}
      {...props}
    />
  )
}

export { Toaster }
