"use client";

import * as React from "react";
import { Sidebar as DefaultSidebar } from "fumadocs-ui/layouts/docs/slots/sidebar";
import type { SidebarProps } from "fumadocs-ui/layouts/docs/slots/sidebar";

/**
 * Workaround for a missing-key warning in fumadocs-ui v16.10.4.
 *
 * The default Sidebar returns `<Fragment>{[<SidebarContent/>, <SidebarDrawer/>]}</Fragment>`
 * where the two top-level children have no `key`. React 19 flags this every render.
 *
 * This wrapper re-emits the same tree but spreads the Fragment's children through
 * `React.cloneElement`, which assigns auto keys (`.0`, `.1`, ...) and silences the warning.
 */
export function Sidebar(props: SidebarProps) {
  const result = DefaultSidebar(props);
  if (!React.isValidElement<{ children?: React.ReactNode }>(result))
    return result;

  const children = React.Children.toArray(result.props.children);
  if (children.length === 0) return result;

  return React.cloneElement(result, undefined, ...children);
}
