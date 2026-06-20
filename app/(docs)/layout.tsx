import type { ReactNode } from "react";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import Link from "fumadocs-core/link";
import { source } from "@/lib/source";
import { baseOptions } from "@/app/layout.config";
import {
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "fumadocs-ui/layouts/docs/slots/sidebar";
import { Sidebar } from "@/components/docs/sidebar";

const GitHubIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className="size-4"
  >
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.1c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.07.78 2.16v3.2c0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
  </svg>
);

const GitHubLink = (
  <Link
    href="https://github.com/MuhamadZafarSyah/y2k-ui"
    external
    className="inline-flex items-center gap-2 rounded border-2 border-y2k-ink bg-white px-3 py-2 text-xs font-bold text-y2k-ink transition-all hover:bg-y2k-mint hover:-translate-y-px"
  >
    <GitHubIcon />
    <span>GitHub</span>
  </Link>
);

export default function DocsGroupLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions()}
      sidebar={{ footer: GitHubLink }}
      slots={{
        sidebar: {
          root: Sidebar,
          provider: SidebarProvider,
          trigger: SidebarTrigger,
          useSidebar,
        },
      }}
    >
      {children}
    </DocsLayout>
  );
}
