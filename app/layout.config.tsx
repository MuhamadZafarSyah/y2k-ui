import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared"
import { SearchTriggerSm, SearchTriggerFull } from "@/components/search-trigger"

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="inline-flex items-center gap-2 font-heading text-base font-semibold">
          <span
            aria-hidden
            className="inline-block h-3.5 w-3.5 rounded-sm border-2 border-y2k-ink bg-y2k-pink"
          />
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