import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: "Y2K UI",
    },
    githubUrl: "https://github.com/y2k-ui",
    themeSwitch: { enabled: false },
  };
}
