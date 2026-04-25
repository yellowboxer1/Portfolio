"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HistoryMediaGallery } from "./components/HistoryMediaGallery";
import { HistoryTimeline } from "./components/HistoryTimeline";
import { HISTORY_ENTRIES, TIMELINE_YEARS } from "./data";

// How many px of scroll per card transition
const PX_PER_STEP = 125;
const TOTAL_STEPS = HISTORY_ENTRIES.length;
const SCROLL_HEIGHT = PX_PER_STEP * TOTAL_STEPS;

export default function HistorySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const outerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const scrollToIndex = useCallback((index: number) => {
    const el = outerRef.current;
    if (!el) return;

    const targetIndex = Math.min(Math.max(index, 0), TOTAL_STEPS - 1);
    const absoluteTop = window.scrollY + el.getBoundingClientRect().top;

    window.scrollTo({
      top: absoluteTop + targetIndex * PX_PER_STEP,
      behavior: "smooth",
    });
  }, []);

  // ── Scroll-driven index update ─────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const el = outerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // How far we've scrolled into the sticky scroll space
        const scrolled = -rect.top;
        if (scrolled < 0) {
          setActiveIndex((prev) => (prev === 0 ? prev : 0));
          return;
        }
        const rawProgress = scrolled / PX_PER_STEP;
        const nextIndex = Math.min(
          Math.max(Math.round(rawProgress), 0),
          TOTAL_STEPS - 1,
        );

        setActiveIndex((prev) => (prev === nextIndex ? prev : nextIndex));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ── Click / dot / year handlers ────────────────────────────────────────────
  const handleYearClick = useCallback((year: string) => {
    const idx = HISTORY_ENTRIES.findIndex((e) => e.year === year);
    if (idx !== -1) scrollToIndex(idx);
  }, [scrollToIndex]);

  const handleNext = useCallback(() => {
    scrollToIndex((activeIndex + 1) % HISTORY_ENTRIES.length);
  }, [activeIndex, scrollToIndex]);

  useEffect(() => {
    const handler = (e: Event) => {
      const idx = (e as CustomEvent<number>).detail;
      if (typeof idx === "number") scrollToIndex(idx);
    };
    window.addEventListener("history-set-index", handler);
    return () => window.removeEventListener("history-set-index", handler);
  }, [scrollToIndex]);

  const activeEntry = HISTORY_ENTRIES[activeIndex];

  return (
    /*
     * Outer wrapper: tall enough to give scroll room.
     * Inner sticky container stays in viewport while user scrolls.
     */
    <div
      ref={outerRef}
      style={{ height: `calc(100vh + ${SCROLL_HEIGHT}px)` }}
      className="relative w-full"
    >
      {/* ── Sticky viewport ─────────────────────────────────────────────────── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">

        {/* Background media — fills the sticky viewport */}
        <div className="absolute inset-0 z-0">
          <HistoryMediaGallery
            activeIndex={activeIndex}
            entries={HISTORY_ENTRIES}
            onNext={handleNext}
          />
        </div>

        {/* UI overlay */}
        <div className="absolute inset-0 left-1/2 z-10 flex w-full -translate-x-1/2 transform-gpu flex-col pointer-events-none 
                        md:max-w-[1920px] md:items-start md:justify-between md:overflow-hidden 
                        md:px-12 md:pb-[4.5rem] md:pt-34 
                        xl:px-12 xl:pb-20 xl:pt-34
                        2xl:px-[120px] 2xl:pb-[6.375rem] 2xl:pt-[8.75rem]">

          {/* Title */}
          <h3 className="z-[3] px-6 pt-[4.625rem] text-[32px] font-semibold uppercase leading-[30px] tracking-[-0.05em] text-white md:px-0 md:pt-0 md:text-[64px] md:leading-[58px] md:tracking-[-0.03em]">
            MY
            <br />
            JOURNEY
          </h3>

          {/* Timeline */}
          <HistoryTimeline
            activeYear={activeEntry.year}
            onYearClick={handleYearClick}
          />

          {/* Info Cards */}
          <HistoryInfoList
            activeIndex={activeIndex}
            entries={HISTORY_ENTRIES}
            timelineYears={TIMELINE_YEARS}
            onYearClick={handleYearClick}
          />
        </div>
      </div>
    </div>
  );
}

// ── History Info List ──────────────────────────────────────────────────────────
type InfoListProps = {
  activeIndex: number;
  entries: typeof HISTORY_ENTRIES;
  timelineYears: string[];
  onYearClick: (year: string) => void;
};

function HistoryInfoList({ activeIndex, entries, timelineYears, onYearClick }: InfoListProps) {
  const [displayIndex, setDisplayIndex] = useState(activeIndex);
  const [leavingIndex, setLeavingIndex] = useState<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const activeEntry = entries[activeIndex];
  const currentYearIdx = timelineYears.indexOf(activeEntry.year);

  useEffect(() => {
    if (activeIndex === displayIndex) return;

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    setLeavingIndex(displayIndex);
    setDisplayIndex(activeIndex);

    timeoutRef.current = window.setTimeout(() => {
      setLeavingIndex(null);
      timeoutRef.current = null;
    }, 1200);
  }, [activeIndex, displayIndex]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="pointer-events-none self-auto md:w-[504px] xl:w-full xl:max-w-[420px] xl:self-end min-[1920px]:w-[504px] min-[1920px]:max-w-none">
      <div className="mb-3 flex items-center justify-between px-6 md:hidden">
        <button
          type="button"
          onClick={() => onYearClick(timelineYears[Math.max(0, currentYearIdx - 1)])}
          disabled={currentYearIdx === 0}
          className="px-2 text-2xl font-bold text-white/60 transition-opacity hover:text-white disabled:opacity-20"
        >
          ‹
        </button>
        <span className="text-[22px] tracking-[-0.5px] text-white">{activeEntry.year}</span>
        <button
          type="button"
          onClick={() => onYearClick(timelineYears[Math.min(timelineYears.length - 1, currentYearIdx + 1)])}
          disabled={currentYearIdx === timelineYears.length - 1}
          className="px-2 text-2xl font-bold text-white/60 transition-opacity hover:text-white disabled:opacity-20"
        >
          ›
        </button>
      </div>

      <div className="relative mx-auto w-[calc(100%-48px)] md:mx-0 md:w-full">
        <div className="relative min-h-[148px] md:min-h-0">
          <ul className="relative m-0 grid h-full list-none p-0 md:items-end">
            {entries.map((entry, index) => {
              const isActive = index === displayIndex;
              const isLeaving = index === leavingIndex;
              const shouldRender = isActive || isLeaving;

              if (!shouldRender) {
                return null;
              }

              return (
                <li
                  key={`${entry.year}-${index}`}
                  aria-hidden={!isActive}
                  className={`col-start-1 row-start-1 flex min-h-[148px] items-start ${
                    isActive
                      ? "visible history-page-fade-in"
                      : "pointer-events-none visible history-page-fade-out"
                  }`}
                >
                  <div className="w-full rounded-[21px] bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,0.93)_47%,rgba(255,255,255,0))] p-px md:rounded-[30px]">
                    <div className="flex min-h-[148px] w-full flex-col gap-3 rounded-[20px] bg-black px-4 py-4 text-white md:gap-4 md:rounded-[29px] md:px-12 md:py-6">
                      <p
                        className="break-keep text-center font-medium text-[16px] leading-6 tracking-[-0.02em] text-white md:text-left md:text-[28px] md:font-bold md:leading-8 md:tracking-normal"
                      dangerouslySetInnerHTML={{ __html: entry.title }}
                      />
                      <p
                        className="break-keep text-left text-[15px] leading-[22px] tracking-normal text-white md:text-[20px] md:leading-8"
                      dangerouslySetInnerHTML={{ __html: entry.description }}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {entries.filter((entry) => entry.year === activeEntry.year).length > 1 && (
          <div className="mt-4 flex justify-center gap-2 md:justify-start">
            {entries.map((entry, index) =>
              entry.year === activeEntry.year ? (
                <button
                  key={`${entry.year}-${index}-dot`}
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent("history-set-index", { detail: index }))}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    index === activeIndex ? "scale-110 bg-white" : "bg-white/25 hover:bg-white/55"
                  }`}
                  aria-label={`History item ${index + 1}`}
                />
              ) : null,
            )}
          </div>
        )}
      </div>
    </div>
  );
}
