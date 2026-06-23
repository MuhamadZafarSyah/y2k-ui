import * as React from "react";
import { cn } from "@/lib/utils";

export type ComponentsTableItem = {
  /** Sub-component name (e.g. `SkeletonCard`). Rendered as a monospace pill. */
  name: string;
  /** One-line description of what this sub-component does. */
  description: string;
  /** Optional monospace signature/code preview shown in the right column. */
  signature?: string;
};

type TagColor = "blue" | "pink" | "lilac" | "mint" | "lemon";

const TAG_CYCLE: TagColor[] = ["blue", "pink", "lilac", "mint", "lemon"];

const tagClass: Record<TagColor, string> = {
  blue: "bg-y2k-blue",
  pink: "bg-y2k-pink",
  lilac: "bg-y2k-lilac",
  mint: "bg-y2k-mint",
  lemon: "bg-y2k-lemon",
};

/**
 * Y2K-styled renderer for sub-component tables.
 *
 * Replaces plain markdown tables like:
 *
 * | Component | Description |
 * |-----------|-------------|
 * | `Skeleton` | Basic pulse skeleton block |
 *
 * with a richer HTML table — same row layout, but with thick navy borders,
 * pastel hover, monospace name pills, and color-tagged rows.
 */
export function ComponentsTable({
  data,
  header,
  firstColumnLabel = "Component",
  secondColumnLabel = "Description",
  showIndex = true,
  showSignature = true,
  className,
}: {
  data: ComponentsTableItem[];
  /** Optional header text shown above the table (e.g. "Components", "Parts"). */
  header?: string;
  /** Label for the first column. Default "Component". */
  firstColumnLabel?: string;
  /** Label for the second column. Default "Description". */
  secondColumnLabel?: string;
  /** Show a leading index column (01, 02, …). Default true. */
  showIndex?: boolean;
  /** When true and any item has `signature`, render a third column. Default true. */
  showSignature?: boolean;
  className?: string;
}) {
  const hasSignatures =
    showSignature && data.some((item) => !!item.signature);

  const colCount = (showIndex ? 1 : 0) + 2 + (hasSignatures ? 1 : 0);

  return (
    <div
      data-slot="components-table"
      className={cn("not-prose my-6", className)}
    >
      <div className="overflow-x-auto rounded-[8px] border-2 border-[#1b1b3a] bg-card shadow-[1px_1px_0px_#1b1b3a]">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-y2k-blue text-y2k-ink">

              <th className="border-b-2 border-[#1b1b3a] px-4 py-2 font-mono text-[11px] font-black uppercase tracking-wider">
                {firstColumnLabel}
              </th>
              <th className="border-b-2 border-[#1b1b3a] px-4 py-2 font-mono text-[11px] font-black uppercase tracking-wider">
                {secondColumnLabel}
              </th>
              {hasSignatures && (
                <th className="border-b-2 border-[#1b1b3a] px-4 py-2 font-mono text-[11px] font-black uppercase tracking-wider">
                  Signature
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              const color = TAG_CYCLE[index % TAG_CYCLE.length];
              return (
                <tr
                  key={`${item.name}-${index}`}
                  className={cn(
                    "group transition-colors",
                    index % 2 === 0
                      ? "bg-card"
                      : "bg-y2k-panel/40",
                    "hover:bg-y2k-lemon/40"
                  )}
                >

                  <td className="border-t-2 border-[#1b1b3a]/20 px-4 py-2 align-top">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-[5px] border border-[#1b1b3a] bg-y2k-panel px-2 py-0.5",
                        "font-mono text-[13px] font-bold leading-none text-y2k-ink",
                        "transition-colors group-hover:bg-card"
                      )}
                    >
                      {item.name}
                    </span>
                  </td>

                  <td className="border-t-2 border-[#1b1b3a]/20 px-4 py-2 align-top text-[13px] leading-relaxed text-y2k-ink/85">
                    {item.description}
                  </td>

                  {hasSignatures && (
                    <td className="border-t-2 border-[#1b1b3a]/20 px-4 py-2 align-top">
                      {item.signature ? (
                        <code className="block overflow-x-auto rounded border-2 border-[#1b1b3a] bg-y2k-panel px-2 py-1 font-mono text-[11px] text-y2k-ink/85">
                          {item.signature}
                        </code>
                      ) : (
                        <span className="font-mono text-[11px] text-y2k-ink/45">
                          —
                        </span>
                      )}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>

        {data.length === 0 && (
          <div className="px-4 py-6 text-center font-mono text-[12px] text-y2k-ink/50">
            no entries
          </div>
        )}
      </div>

    </div>
  );
}