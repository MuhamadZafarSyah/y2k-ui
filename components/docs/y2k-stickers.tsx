"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

class LCG {
  private state: number;
  constructor(seed: number) {
    this.state = seed || 1;
  }
  next() {
    this.state = (this.state * 1664525 + 1013904223) % 4294967296;
    return this.state / 4294967296;
  }
  nextRange(min: number, max: number) {
    return min + this.next() * (max - min);
  }
  nextElement<T>(arr: T[]): T {
    const idx = Math.floor(this.next() * arr.length);
    return arr[idx];
  }
}

function hashString(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

interface Sticker {
  id: string;
  src: string;
  top: number; // in pixels
  side: "left" | "right" | "bg";
  offset: string;
  size: number;
  rotate: number;
  opacity: number;
}

export function Y2kStickers() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [pageHeight, setPageHeight] = useState(1200);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
          // Use documentElement scrollHeight or entry content rect
          setPageHeight(document.documentElement.scrollHeight || entry.target.scrollHeight);
        }
      });
      observer.observe(document.body);
      return () => observer.disconnect();
    }
  }, []);

  const stickers = useMemo(() => {
    if (!pathname) return [];

    const seed = hashString(pathname);
    const lcg = new LCG(seed);
    const generated: Sticker[] = [];

    const svgList = Array.from({ length: 15 }, (_, i) => `/assets/images/${i + 1}.svg`);

    // Vertical coordinates (pixels) for left/right margins (Total 10)
    const verticalSteps = [
      120, 320, 550, 780, 1020,
      1250, 1480, 1720, 1950, 2200
    ];

    verticalSteps.forEach((baseTop, index) => {
      const svg = lcg.nextElement(svgList);
      const top = baseTop + lcg.nextRange(-45, 45);
      const isLeft = index % 2 === 0;
      const offset = lcg.nextRange(-130, -45); // px from edges
      const size = lcg.nextRange(95, 155); // px
      const rotate = lcg.nextRange(-25, 25);
      const opacity = lcg.nextRange(0.6, 0.85); // Increased by 20%

      generated.push({
        id: `margin-${index}-${seed}`,
        src: svg,
        top,
        side: isLeft ? "left" : "right",
        offset: `${offset}px`,
        size,
        rotate,
        opacity,
      });
    });

    // Vertical coordinates (pixels) for background (Total 5)
    const bgSteps = [220, 680, 1150, 1620, 2080];
    bgSteps.forEach((baseTop, index) => {
      const svg = lcg.nextElement(svgList);
      const top = baseTop + lcg.nextRange(-60, 60);
      const offset = lcg.nextRange(15, 80); // percentage width
      const size = lcg.nextRange(160, 250);
      const rotate = lcg.nextRange(-15, 15);
      const opacity = lcg.nextRange(0.18, 0.32); // Increased by 20%

      generated.push({
        id: `bg-${index}-${seed}`,
        src: svg,
        top,
        side: "bg",
        offset: `${offset}%`,
        size,
        rotate,
        opacity,
      });
    });

    return generated;
  }, [pathname]);

  if (!mounted) return null;

  // Filter stickers so we only render ones that actually fit within the current body height
  const visibleStickers = stickers.filter(s => s.top < pageHeight - 120);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible select-none z-0">
      {visibleStickers.map((sticker) => {
        const isBg = sticker.side === "bg";

        return (
          <div
            key={sticker.id}
            className={cn(
              "absolute transition-all duration-300 ease-out",
              isBg
                ? "-z-10 opacity-80 md:opacity-100"
                : "hidden lg:block z-10 pointer-events-auto cursor-pointer hover:scale-115 hover:rotate-12 active:scale-95 active:-rotate-6"
            )}
            style={{
              top: `${sticker.top}px`,
              left: sticker.side === "left" ? sticker.offset : sticker.side === "bg" ? sticker.offset : undefined,
              right: sticker.side === "right" ? sticker.offset : undefined,
              width: `${sticker.size}px`,
              transform: `rotate(${sticker.rotate}deg)`,
              opacity: sticker.opacity,
            }}
          >
            <Image
              src={sticker.src}
              alt="Y2K Sticker decoration"
              width={sticker.size}
              height={sticker.size}
              className="w-full h-auto drop-shadow-[0_2px_4px_rgba(27,27,58,0.15)] filter"
              draggable={false}
              priority={isBg}
            />
          </div>
        );
      })}
    </div>
  );
}
