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

/* Notepad Warm ruled paper background */
const notepadStyle: React.CSSProperties = {
  backgroundImage: "linear-gradient(#1b1b3a08 1px, transparent 1px), linear-gradient(90deg, #1b1b3a08 1px, transparent 1px)",
  backgroundSize: "20px 20px",
  backgroundColor: "#fdfdfb", // retro warm paper
};

export function PropsTable({ data, className }: PropsTableProps) {
  return (
    <div
      className={cn(
        "my-8 relative select-none",
        className,
      )}
      data-slot="props-table"
    >
      {/* ===== Retro Spiral Binding (Loops) ===== */}
      <div className="flex justify-around px-8 -mb-3 relative z-10 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            {/* Metal binder ring */}
            <div className="w-3 h-7 rounded-full border-2 border-y2k-ink bg-[#c1c9d6] shadow-[1.5px_1.5px_0px_#1b1b3a]" />
            {/* Perforated punch hole */}
            <div className="w-1.5 h-1.5 rounded-full bg-y2k-ink/20 border border-y2k-ink/40 -mt-1" />
          </div>
        ))}
      </div>

      {/* ===== Notebook Page Container ===== */}
      <div
        className="relative overflow-hidden rounded-[8px] border-3 border-y2k-ink p-0! pl-10 pr-4 shadow-[3px_3px_0px_rgba(27,27,58,0.1)] transition-all"
        style={notepadStyle}
      >
        {/* Double red margins line */}
        <div className="absolute left-1 top-0 bottom-0 w-0.75 border-l border-r border-red-400 opacity-60 pointer-events-none" />



        <div className="overflow-x-auto ">
          <table className="my-0! w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b-2 border-y2k-ink">
                <th className="px-3 py-2 font-mono text-xs font-black uppercase text-y2k-ink tracking-wider pl-4">
                  Prop
                </th>
                <th className="px-3 py-2 font-mono text-xs font-black uppercase text-y2k-ink tracking-wider">
                  Type
                </th>
                <th className="px-3 py-2 font-mono text-xs font-black uppercase text-y2k-ink tracking-wider">
                  Default
                </th>
                <th className="px-3 py-2 font-mono text-xs font-black uppercase text-y2k-ink tracking-wider">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => {
                // Alternate pastel sticker labels for prop name
                const tagColors = ["bg-y2k-lemon", "bg-y2k-pink", "bg-y2k-mint", "bg-y2k-blue", "bg-y2k-lilac"];
                const tagColor = tagColors[idx % tagColors.length];

                return (
                  <tr
                    key={row.prop}
                    className="align-top border-b border-dashed border-y2k-ink/30 last:border-b-0 hover:bg-y2k-panel/20 transition-colors"
                  >
                    {/* Prop Name styled as a cute folder sticker label */}
                    <td className="px-3 py-3 pl-4">
                      <code className={cn(
                        "inline-block rounded-lg border-2 border-y2k-ink px-2.5 py-0.5 font-mono text-xs font-black text-y2k-ink shadow-[1.5px_1.5px_0px_#1b1b3a] transform -rotate-1 hover:rotate-0 hover:scale-105 transition-all select-all",
                        tagColor
                      )}>
                        {row.prop}
                      </code>
                    </td>

                    {/* Type code */}
                    <td className="px-3 py-3 font-mono text-xs text-y2k-ink font-semibold align-middle">
                      <span className="inline-block rounded-md border border-y2k-ink/20 bg-y2k-panel/30 px-1.5 py-0.5 text-y2k-ink/90">
                        {row.type}
                      </span>
                    </td>

                    {/* Default value */}
                    <td className="px-3 py-3 font-mono text-xs align-middle">
                      {row.default ? (
                        <code className="rounded-lg border border-y2k-ink bg-card px-2 py-0.5 text-y2k-ink font-bold shadow-[1px_1px_0px_#1b1b3a]">
                          {row.default}
                        </code>
                      ) : (
                        <span className="text-y2k-ink/40 font-mono">—</span>
                      )}
                    </td>

                    {/* Description text */}
                    <td className="px-3 py-3 text-y2k-ink/80 leading-relaxed font-medium align-middle">
                      {row.description}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
