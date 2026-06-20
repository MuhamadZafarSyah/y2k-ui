# Y2K Redesign Implementation Plan - Phase 3 (Adjustments)

This plan outlines the implementation of a beautiful Y2K-styled sub-components table renderer, fixes to the sidebar styling, next/prev page buttons redesign, a blocky Switch component, and smooth height collapse transitions for the minimized preview frames.

> **Note (clarification):** The earlier draft described a "Floppy Disk Components Grid" used as an overview of all components. That was a misunderstanding. The actual goal is a **custom `<ComponentsTable />` MDX component** that replaces the plain markdown sub-component tables (e.g. in `skeleton.mdx`, `breadcrumb.mdx`, `table.mdx`) with a richer, more visual Y2K-styled render. Each row becomes a card with a colored badge, name, and description.

## Proposed Changes

### Component: Sub-Components Table Renderer
#### [NEW] [components-table.tsx](file:///d:/Personal/y2k-ui/components/docs/components-table.tsx)
- Create a `ComponentsTable` MDX component that renders a list of sub-component rows (name + description) with rich Y2K styling:
  - Each row is a card with thick navy 2px border, rounded corners, and a flat pastel color tag (blue / pink / lilac / mint / lemon) cycling per row.
  - Sub-component name rendered as a monospace pill (e.g. `SkeletonCard`).
  - Description text below the name with smaller font.
  - Optional `icon` slot per row (defaults to a small `*` glyph).
  - Optional `header` prop to add a custom title (defaults to "Components").
- Register `ComponentsTable` inside [mdx-components.tsx](file:///d:/Personal/y2k-ui/mdx-components.tsx).

#### [MODIFY] [skeleton.mdx](file:///d:/Personal/y2k-ui/content/docs/skeleton.mdx)
- Replace the markdown table under `## Components` with `<ComponentsTable data={[...]} />`.

#### [MODIFY] [breadcrumb.mdx](file:///d:/Personal/y2k-ui/content/docs/breadcrumb.mdx)
- Replace the markdown table under `## Parts` with `<ComponentsTable header="Parts" data={[...]} />`.

#### [MODIFY] [table.mdx](file:///d:/Personal/y2k-ui/content/docs/table.mdx)
- Replace the markdown table under `## Parts` with `<ComponentsTable header="Parts" data={[...]} />`.

---

### Component: Sidebar Selector Fix & Styling Overhaul

#### [MODIFY] [globals.css](file:///d:/Personal/y2k-ui/app/globals.css)
- Target `aside[data-sidebar="true"]` directly for borders and background grid patterns (avoiding the intermediate `[data-radix-scroll-area-viewport]` which failed to match).
- Style sidebar folder nodes and items as tactile capsule buttons with thick navy outlines and flat shadows:
  - **Closed Folders**: prefixed with `📁`.
  - **Open Folders**: prefixed with `📂`.
  - **Doc Pages**: prefixed with `📄`.
  - **Active Doc Page**: highlighted with yellow fill and prefixed with a neon lightning bolt `⚡`.
- Style group headings as rotated folder tags and ensure the search button uses a flat shadow border.

---

### Component: Blocky Switch Redesign

#### [MODIFY] [switch.tsx](file:///d:/Personal/y2k-ui/components/ui/switch.tsx)
- Redesign the `Switch` component to be blocky (rectangular) instead of round:
  - Change Switch container to `rounded-[6px]`.
  - Change Switch thumb to `rounded-[4px]`.
  - This matches the tactile retro game console / soundboard style.

---

### Component: Next/Previous Page Buttons Redesign

#### [MODIFY] [globals.css](file:///d:/Personal/y2k-ui/app/globals.css)
- Target bottom next/previous footer links inside documentation page templates.
- Redesign them to use thick solid borders, retro card shadows, pink hover states, and style the pagination description text as custom uppercase monospace labels.

---

### Component: Smooth Minimize Transition

#### [MODIFY] [component-preview.tsx](file:///d:/Personal/y2k-ui/components/docs/component-preview.tsx)
- Transition the minimized height smoothly by replacing `h-0` vs `h-auto` with `max-h-0` vs `max-h-[1200px]` and `opacity-0` vs `opacity-100`.
- Add an ease-in-out transition curve for a satisfying drawer slide collapse animation.

---

## Verification Plan

### Manual Verification
1. Navigate to the `/docs/skeleton` page and confirm the plain markdown table under `## Components` is replaced with the new `<ComponentsTable />` (colored cards, monospace name pills, descriptions).
2. Navigate to `/docs/breadcrumb` and `/docs/table` and confirm the `## Parts` markdown tables are replaced with the styled `<ComponentsTable header="Parts" />`.
3. Confirm the sidebar is fully styled (grid background, bordered buttons, emojis, search input) and looks like the Y2K design.
4. Open a page and verify the Next/Previous buttons at the bottom are styled as solid Y2K cards.
5. Verify the Switch component is rectangular/blocky.
6. Click the minimize button on the Component Preview and verify the smooth collapse animation.
7. Verify a clean production build compiles successfully.