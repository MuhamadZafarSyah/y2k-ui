"use client";

import { Sidebar as FumadocsSidebar } from "fumadocs-ui/layouts/docs/slots/sidebar";
import type { SidebarProps } from "fumadocs-ui/layouts/docs/slots/sidebar";

/**
 * Render the Fumadocs Sidebar directly.
 */
export function Sidebar(props: SidebarProps) {
  return <FumadocsSidebar {...props} />;
}
