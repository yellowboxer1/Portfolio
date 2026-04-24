"use client";

import { useEffect, useRef } from "react";
import { TIMELINE_YEARS, YEAR_DEGREE, YEAR_ROTATIONS } from "../data";
import { TimelineYearItem } from "./TimelineYearItem";

type Props = {
  activeYear: string;
  onYearClick: (year: string) => void;
};

const OUTER_TIMELINE_SIZE = 1592;
const INNER_TIMELINE_SIZE = 1364;
const TIMELINE_CENTER = OUTER_TIMELINE_SIZE / 2;
const TIMELINE_MARKER_RADIUS = (OUTER_TIMELINE_SIZE / 2 + INNER_TIMELINE_SIZE / 2) / 2;

const TIMELINE_MARKERS = [
  { angle: 0, height: 7, width: 36, className: "bg-[#5327FA]" },
  { angle: 15, height: 3, width: 36, className: "bg-neutral-400" },
  { angle: 30, height: 3, width: 36, className: "bg-neutral-400" },
] as const;

export const HistoryTimeline = ({ activeYear, onYearClick }: Props) => {
  const ulRef = useRef<HTMLUListElement>(null);

  // Rotate the dial on desktop so the active year sits at the top (0°)
  useEffect(() => {
    const ul = ulRef.current;
    if (!ul) return;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (!isDesktop) return;
    const activeDeg = YEAR_DEGREE[activeYear] ?? 0;
    ul.style.transform = `rotate(${-activeDeg}deg)`;
  }, [activeYear]);

  return (
    <div className="relative flex h-[200px] w-auto items-center isolate z-[2] md:absolute md:inset-y-2/4 md:left-0 md:my-0 md:h-[1592px] md:w-[1592px] md:min-h-0 md:min-w-0 md:-translate-y-1/2 md:translate-x-[-1068px] md:rounded-full md:border md:border-solid md:border-white/40">
      <div className="relative z-[5] ml-[15px] w-auto pointer-events-none md:absolute md:left-1/2 md:top-1/2 md:ml-0 md:flex md:h-[1364px] md:w-[1364px] md:-translate-x-1/2 md:-translate-y-1/2 md:justify-end md:overflow-visible md:rounded-full md:border md:border-solid md:border-white/30 md:p-[97px] md:pointer-events-auto">
        <ul
          ref={ulRef}
          className="relative z-[2] flex h-[86px] w-12 list-none flex-col items-center justify-start pl-0 pt-[29px] md:h-full md:w-6/12 md:min-h-[auto] md:min-w-[auto] md:origin-[0%_50%] md:justify-center md:pt-0"
          style={{
            transition: "transform 0.75s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {TIMELINE_YEARS.map((year) => (
            <TimelineYearItem
              key={year}
              year={year}
              isActive={activeYear === year}
              itemClassName={YEAR_ROTATIONS[year] ?? ""}
              onClick={onYearClick}
            />
          ))}
        </ul>
      </div>
      <div className="absolute left-14 top-2/4 z-[1] h-6 w-[42px] -translate-y-1/2 rounded border border-solid border-white/50 bg-white/10 backdrop-blur-[2.5px] md:hidden md:left-[50px]"></div>
      <div className="pointer-events-none md:absolute md:inset-0 md:z-0">
        {TIMELINE_MARKERS.map((marker) => (
          <div
            key={`${marker.angle}-${marker.height}`}
            className={`hidden md:block md:absolute ${marker.className}`}
            style={{
              width: `${marker.width}px`,
              height: `${marker.height}px`,
              left: `${TIMELINE_CENTER + Math.cos((marker.angle * Math.PI) / 180) * TIMELINE_MARKER_RADIUS - marker.width / 2}px`,
              top: `${TIMELINE_CENTER + Math.sin((marker.angle * Math.PI) / 180) * TIMELINE_MARKER_RADIUS - marker.height / 2}px`,
              transform: `rotate(${marker.angle}deg)`,
              transformOrigin: "center center",
            }}
          />
        ))}
      </div>
    </div>
  );
};
