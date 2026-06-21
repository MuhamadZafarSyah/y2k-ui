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
  topPct: number;
  side: "left" | "right" | "bg";
  offset: string;
  size: number;
  rotate: number;
  opacity: number;
}

export function Y2kStickers() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [pageHeight, setPageHeight] = useState(0);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const updateHeight = () => {
        setPageHeight(document.documentElement.scrollHeight || document.body.scrollHeight);
      };
      updateHeight();
      const observer = new ResizeObserver(updateHeight);
      observer.observe(document.documentElement);
      return () => observer.disconnect();
    }
  }, []);

  const stickers = useMemo(() => {
    if (!pathname) return [];

    const seed = hashString(pathname);
    const lcg = new LCG(seed);
    const generated: Sticker[] = [];

    const svgList = Array.from({ length: 15 }, (_, i) => `/assets/images/${i + 1}.svg`);

    const shuffleArray = <T,>(arr: T[]): T[] => {
      const shuffled = [...arr];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(lcg.next() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    const shuffledSvgs = shuffleArray(svgList);

    const marginStickers = 7;
    const bgStickers = 3;
    const minGapPct = 11;

    for (let i = 0; i < marginStickers; i++) {
      const svg = shuffledSvgs[i % shuffledSvgs.length];
      const topPct = lcg.nextRange(5 + i * minGapPct, 10 + i * minGapPct);
      const isLeft = i % 2 === 0;
      const offset = lcg.nextRange(-130, -45);
      const size = lcg.nextRange(95, 155);
      const rotate = lcg.nextRange(-25, 25);
      const opacity = lcg.nextRange(0.6, 0.85);

      generated.push({
        id: `margin-${i}-${seed}`,
        src: svg,
        topPct: Math.min(topPct, 88),
        side: isLeft ? "left" : "right",
        offset: `${offset}px`,
        size,
        rotate,
        opacity,
      });
    }

    for (let i = 0; i < bgStickers; i++) {
      const svg = shuffledSvgs[(marginStickers + i) % shuffledSvgs.length];
      const topPct = lcg.nextRange(12 + i * minGapPct, 17 + i * minGapPct);
      const offset = lcg.nextRange(15, 80);
      const size = lcg.nextRange(160, 250);
      const rotate = lcg.nextRange(-15, 15);
      const opacity = lcg.nextRange(0.18, 0.32);

      generated.push({
        id: `bg-${i}-${seed}`,
        src: svg,
        topPct: Math.min(topPct, 85),
        side: "bg",
        offset: `${offset}%`,
        size,
        rotate,
        opacity,
      });
    }

    return generated;
  }, [pathname]);

  if (!mounted || pageHeight === 0) return null;

  return (
    <div
      className="pointer-events-none overflow-clip select-none z-0"
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: pageHeight }}
    >
      {stickers.map((sticker) => {
        const isBg = sticker.side === "bg";
        const topPx = ((sticker.topPct) / 100) * pageHeight;

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
              top: `${topPx}px`,
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
