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
const TIMELINE_MARKER_RADIUS =
  (OUTER_TIMELINE_SIZE / 2 + INNER_TIMELINE_SIZE / 2) / 2;

type TimelineMarker = {
  angle: number;
  height: number;
  width: number;
  className: string;
  hideFromIndex?: number;
};

const TIMELINE_MARKERS: TimelineMarker[] = [
  { angle: 0, height: 7, width: 36, className: "bg-[#5327FA]" },
  {
    angle: 15,
    height: 3,
    width: 36,
    className: "bg-neutral-400",
    hideFromIndex: 6,
  },
  {
    angle: 30,
    height: 3,
    width: 36,
    className: "bg-neutral-400",
    hideFromIndex: 5,
  },
];

export const HistoryTimeline = ({ activeYear, onYearClick }: Props) => {
  const ulRef = useRef<HTMLUListElement>(null);
  const activeYearIndex = TIMELINE_YEARS.indexOf(activeYear);
  const safeActiveYearIndex = Math.max(0, activeYearIndex);
  const nextYear =
    TIMELINE_YEARS[(safeActiveYearIndex + 1) % TIMELINE_YEARS.length];

  useEffect(() => {
    const ul = ulRef.current;
    if (!ul) return;

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;

    const activeDeg = YEAR_DEGREE[activeYear] ?? 0;
    ul.style.transform = `rotate(${-activeDeg}deg)`;
  }, [activeYear]);

  return (
    <>
      <div className="history-mobile-year pointer-events-auto relative z-[4] mt-auto mb-1.5 flex h-[200px] select-none items-center pl-[7px] lg:hidden md:absolute md:bottom-1/2 md:left-6 md:mb-0 md:mt-0 md:translate-y-[calc(50%-28px)] md:pl-0">
        <button
          type="button"
          onClick={() => onYearClick(nextYear)}
          className="history-mobile-year-next relative z-[3] h-8 w-8 shrink-0"
          aria-label="Next Year"
        >
          <span className="sr-only">Next Year</span>
        </button>

        <div className="relative z-[5] ml-[15px] h-[86px] w-12 overflow-hidden">
          <ul
            className="flex h-[86px] w-12 list-none flex-col items-center justify-start p-0 pt-[29px] transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{
              transform: `translate3d(0, ${-safeActiveYearIndex * 29}px, 2px)`,
            }}
          >
            {TIMELINE_YEARS.map((year) => {
              const isActive = activeYear === year;

              return (
                <li
                  key={year}
                  className="flex h-[29px] w-full items-center justify-center"
                >
                  <button
                    type="button"
                    onClick={() => onYearClick(year)}
                    aria-current={isActive ? "true" : undefined}
                    className={`h-[29px] w-full text-[13px] font-medium leading-[13px] tracking-[-0.01em] transition-colors ${
                      isActive
                        ? "text-white"
                        : "text-[#8c8c8c]"
                    }`}
                  >
                    {year}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="history-mobile-year-box pointer-events-none absolute z-[2]" />
      </div>

      <div className="history-timeline-ring hidden h-[1592px] w-[1592px] isolate z-[2] rounded-full border border-solid border-white/40 lg:absolute lg:inset-y-2/4 lg:left-0 lg:my-0 lg:flex lg:min-h-0 lg:min-w-0 lg:items-center">
        <div className="pointer-events-auto relative z-[5] ml-[15px] w-auto lg:absolute lg:left-1/2 lg:top-1/2 lg:ml-0 lg:flex lg:h-[1364px] lg:w-[1364px] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:justify-end lg:overflow-visible lg:rounded-full lg:border lg:border-solid lg:border-white/30 lg:p-[97px]">
          <ul
            ref={ulRef}
            className="relative z-[2] flex h-full w-6/12 origin-[0%_50%] list-none items-center justify-center p-0"
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

        <div className="pointer-events-none absolute inset-0 z-0">
          {TIMELINE_MARKERS.map((marker) => (
            <div
              key={`${marker.angle}-${marker.height}`}
              className={`absolute transition-opacity duration-300 ${
                marker.className
              } ${
                marker.hideFromIndex !== undefined &&
                safeActiveYearIndex >= marker.hideFromIndex
                  ? "opacity-0"
                  : "opacity-100"
              }`}
              style={{
                width: `${marker.width}px`,
                height: `${marker.height}px`,
                left: `${
                  TIMELINE_CENTER +
                  Math.cos((marker.angle * Math.PI) / 180) *
                    TIMELINE_MARKER_RADIUS -
                  marker.width / 2
                }px`,
                top: `${
                  TIMELINE_CENTER +
                  Math.sin((marker.angle * Math.PI) / 180) *
                    TIMELINE_MARKER_RADIUS -
                  marker.height / 2
                }px`,
                transform: `rotate(${marker.angle}deg)`,
                transformOrigin: "center center",
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};
