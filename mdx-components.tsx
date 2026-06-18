import defaultMdxComponents from "fumadocs-ui/mdx";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { CodeBlock } from "@/components/docs/code-block";
import { DialogDefaultDemo, DialogHideControlsDemo } from "@/components/demos/dialog-demo";
import {
  CardDefaultDemo,
  BadgeColorsDemo,
  TooltipDemo,
  SwitchDemo,
  TabsDemo,
  AlertDemo,
  CheckboxDemo,
  AvatarDemo,
  ProgressDemo,
  SelectDemo,
} from "@/components/demos/all-demos";
import type { MDXComponents } from "mdx/types";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ComponentPreview,
    PropsTable,
    CodeBlock,
    DialogDefaultDemo,
    DialogHideControlsDemo,
    CardDefaultDemo,
    BadgeColorsDemo,
    TooltipDemo,
    SwitchDemo,
    TabsDemo,
    AlertDemo,
    CheckboxDemo,
    AvatarDemo,
    ProgressDemo,
    SelectDemo,
    ...components,
  };
}
