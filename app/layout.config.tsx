import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared"
import { SearchTriggerSm, SearchTriggerFull } from "@/components/search-trigger"

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="inline-flex items-center gap-2 font-black tracking-tight text-y2k-ink">
          <span
            aria-hidden
            className="flex size-5 items-center justify-center rounded border-2 border-y2k-ink bg-y2k-lemon text-[10px] font-bold"
          >
            Y
          </span>
          Y2K UI
        </span>
      ),
    },
    themeSwitch: { enabled: false },
    searchToggle: {
      enabled: true,
      components: {
        sm: <SearchTriggerSm />,
        lg: <SearchTriggerFull />,
      },
    },
  };
}
