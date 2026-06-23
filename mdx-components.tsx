import defaultMdxComponents from "fumadocs-ui/mdx";
import dynamic from "next/dynamic";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { CodeBlock } from "@/components/docs/code-block";
import { ComponentsTable } from "@/components/docs/components-table";
import { DialogDefaultDemo, DialogHideControlsDemo } from "@/components/demos/dialog-demo";
import {
  ScrollArea,
  ScrollAreaViewport,
  Scrollbar,
  ScrollThumb,
  ScrollCorner,
} from "@/components/ui/scroll-area";
// ── Lightweight demos — static imports (no heavy transitive deps) ──
import {
  CardDefaultDemo,
  BadgeColorsDemo,
  TooltipDemo,
  SwitchDemo,
  TabsDemo,
  InputBasicDemo,
  InputIconsDemo,
  InputPrefixSuffixDemo,
  ButtonBasicDemo,
  ButtonIconsDemo,
  ButtonLoaderDemo,
  AlertDemo,
  CheckboxDemo,
  AvatarDemo,
  AvatarGroupDemo,
  ProgressDemo,
  SelectDemo,
  AccordionDemo,
  PopoverDemo,
  RadioGroupDemo,
  SliderDemo,
  SliderWithLabelDemo,
  TextareaDemo,
  SeparatorDemo,
  AccordionPastelDemo,
  RadioGroupColorsDemo,
  SliderPinkDemo,
  SliderRangeDemo,
  TextareaPastelDemo,
  TextareaDisabledDemo,
  SeparatorVerticalDemo,
  SeparatorColorsDemo,
  SkeletonDemo,
  TableDemo,
  BreadcrumbDemo,
  ToggleDemo,
  DropdownMenuDemo,
  HoverCardDemo,
  ScrollAreaDemo,
  PaginationDemo,
  PaginationEllipsisDemo,
  SonnerDemo,
  SheetDemo,
  MenubarDemo,
  ContextMenuDemo,
  ToggleGroupDemo,
  CollapsibleDemo,
  LabelDemo,
  SpinnerDemo,
  KbdDemo,
  NativeSelectDemo,
  InputGroupDemo,
  EmptyDemo,
  ButtonGroupDemo,
  AlertDialogDemo,
  CommandDemo,
  NavigationMenuDemo,
  DrawerDemo,
  InputOTPDemo,
  ResizableDemo,
  FieldDemo,
  FormDemo,
  ComboboxDemo,
  AspectRatioDemo,
  DirectionDemo,
  ItemDemo,
  SidebarDemo,
} from "@/components/demos/all-demos";

// ── Heavyweight demos — dynamic imports to avoid bloating shared chunks ──
// recharts (~50KB), react-day-picker (~20KB), embla-carousel (~15KB)
const BarChartDemo = dynamic(() =>
  import("@/components/demos/all-demos").then((m) => ({ default: m.BarChartDemo })),
);
const LineChartDemo = dynamic(() =>
  import("@/components/demos/all-demos").then((m) => ({ default: m.LineChartDemo })),
);
const DonutChartDemo = dynamic(() =>
  import("@/components/demos/all-demos").then((m) => ({ default: m.DonutChartDemo })),
);
const CalendarDemo = dynamic(() =>
  import("@/components/demos/all-demos").then((m) => ({ default: m.CalendarDemo })),
);
const CarouselDemo = dynamic(() =>
  import("@/components/demos/all-demos").then((m) => ({ default: m.CarouselDemo })),
);
const DatePickerDemo = dynamic(() =>
  import("@/components/demos/all-demos").then((m) => ({ default: m.DatePickerDemo })),
);
const DatePickerWithRangeDemo = dynamic(() =>
  import("@/components/demos/all-demos").then((m) => ({ default: m.DatePickerWithRangeDemo })),
);
const DatePickerDisabledDemo = dynamic(() =>
  import("@/components/demos/all-demos").then((m) => ({ default: m.DatePickerDisabledDemo })),
);

import type { MDXComponents } from "mdx/types";

const heavyDemos = {
  BarChartDemo,
  LineChartDemo,
  DonutChartDemo,
  CalendarDemo,
  CarouselDemo,
  DatePickerDemo,
  DatePickerWithRangeDemo,
  DatePickerDisabledDemo,
} as Record<string, React.ComponentType<unknown>>;

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ComponentPreview,
    PropsTable,
    CodeBlock,
    ComponentsTable,
    DialogDefaultDemo,
    DialogHideControlsDemo,
    // Lightweight
    CardDefaultDemo,
    BadgeColorsDemo,
    TooltipDemo,
    SwitchDemo,
    TabsDemo,
    InputBasicDemo,
    InputIconsDemo,
    InputPrefixSuffixDemo,
    ButtonBasicDemo,
    ButtonIconsDemo,
    ButtonLoaderDemo,
    AlertDemo,
    CheckboxDemo,
    AvatarDemo,
    AvatarGroupDemo,
    ProgressDemo,
    SelectDemo,
    AccordionDemo,
    PopoverDemo,
    RadioGroupDemo,
    SliderDemo,
    SliderWithLabelDemo,
    TextareaDemo,
    SeparatorDemo,
    AccordionPastelDemo,
    RadioGroupColorsDemo,
    SliderPinkDemo,
    SliderRangeDemo,
    TextareaPastelDemo,
    TextareaDisabledDemo,
    SeparatorVerticalDemo,
    SeparatorColorsDemo,
    SkeletonDemo,
    TableDemo,
    BreadcrumbDemo,
    ToggleDemo,
    DropdownMenuDemo,
    HoverCardDemo,
    ScrollAreaDemo,
    PaginationDemo,
    PaginationEllipsisDemo,
    SonnerDemo,
    SheetDemo,
    MenubarDemo,
    ContextMenuDemo,
    ToggleGroupDemo,
    CollapsibleDemo,
    LabelDemo,
    SpinnerDemo,
    KbdDemo,
    NativeSelectDemo,
    InputGroupDemo,
    EmptyDemo,
    ButtonGroupDemo,
    AlertDialogDemo,
    CommandDemo,
    NavigationMenuDemo,
    DrawerDemo,
    InputOTPDemo,
    ResizableDemo,
    FieldDemo,
    FormDemo,
    ComboboxDemo,
    AspectRatioDemo,
    DirectionDemo,
    ItemDemo,
    SidebarDemo,
    // Heavyweight — lazy-loaded on demand
    ...heavyDemos,
    ScrollArea,
    ScrollAreaViewport,
    Scrollbar,
    ScrollThumb,
    ScrollCorner,
    ...components,
  } as MDXComponents;
}