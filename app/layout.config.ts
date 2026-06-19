import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: "Y2K UI",
    },
    themeSwitch: { enabled: false },
  };
}