import * as React from "react";

import { cn } from "@/lib/utils";

export type PropDef = {
  prop: string;
  type: string;
  default?: string;
  description: string;
};

export type PropsTableProps = {
  data: PropDef[];
  className?: string;
};

export function PropsTable({ data, className }: PropsTableProps) {
  return (
    <div
      className={cn(
        "y2k-window my-6 overflow-hidden text-sm",
        className,
      )}
      data-slot="props-table"
    >
      <div className="y2k-window-title">
        <span className="y2k-title-dots" aria-hidden>
          <span />
          <span />
          <span />
        </span>
        <span>props.txt</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-y2k-panel">
              <th className="border-b-2 border-y2k-ink px-3 py-2 font-semibold">
                Prop
              </th>
              <th className="border-b-2 border-y2k-ink px-3 py-2 font-semibold">
                Type
              </th>
              <th className="border-b-2 border-y2k-ink px-3 py-2 font-semibold">
                Default
              </th>
              <th className="border-b-2 border-y2k-ink px-3 py-2 font-semibold">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                key={row.prop}
                className="align-top even:bg-y2k-panel/40"
              >
                <td className="border-b border-y2k-ink/30 px-3 py-2">
                  <code className="rounded bg-y2k-ink px-1.5 py-0.5 font-mono text-xs text-y2k-lemon">
                    {row.prop}
                  </code>
                </td>
                <td className="border-b border-y2k-ink/30 px-3 py-2 font-mono text-xs">
                  {row.type}
                </td>
                <td className="border-b border-y2k-ink/30 px-3 py-2 font-mono text-xs">
                  {row.default ? (
                    <code className="rounded bg-y2k-panel px-1.5 py-0.5 text-y2k-ink">
                      {row.default}
                    </code>
                  ) : (
                    <span className="text-y2k-ink/50">—</span>
                  )}
                </td>
                <td className="border-b border-y2k-ink/30 px-3 py-2">
                  {row.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
