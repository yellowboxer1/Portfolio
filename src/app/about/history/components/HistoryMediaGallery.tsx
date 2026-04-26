"use client";

import { useEffect, useRef, useState } from "react";
import type { HistoryEntry } from "../data";

const HISTORY_FADE_MS = 1200;

type Props = {
  activeIndex: number;
  entries: HistoryEntry[];
  onNext: () => void;
};

export const HistoryMediaGallery = ({ activeIndex, entries, onNext }: Props) => {
  const [displayIndex, setDisplayIndex] = useState(activeIndex);
  const [leavingIndex, setLeavingIndex] = useState<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

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
    }, HISTORY_FADE_MS);
  }, [activeIndex, displayIndex]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getVideoFrameStyle = (entry: HistoryEntry) => {
    const widthPercent = entry.videoWidthPercent ?? 100;
    const heightPercent = entry.videoHeightPercent ?? 100;
    const baseBoxWidth = 1280 * (widthPercent / 100);
    const baseBoxHeight = 900 * (heightPercent / 100);
    const aspectRatio = entry.videoAspectRatio ?? 16 / 9;
    const isCover = entry.videoFit === "cover";
    const containedWidth = Math.min(baseBoxWidth, baseBoxHeight * aspectRatio);
    const containedHeight = containedWidth / aspectRatio;
    const fluidWidth = isCover ? baseBoxWidth : containedWidth;
    const fluidHeight = isCover ? baseBoxHeight : containedHeight;
    const fixedBelowLgRatio = 1024 / 1280;

    return {
      "--history-video-width": `${widthPercent}%`,
      "--history-video-height": `${heightPercent}%`,
      "--history-video-fluid-width": `${(fluidWidth / 1280) * 100}vw`,
      "--history-video-fluid-height": `${(fluidHeight / 1280) * 100}vw`,
      "--history-video-fixed-width": `${fluidWidth * fixedBelowLgRatio}px`,
      "--history-video-fixed-height": `${fluidHeight * fixedBelowLgRatio}px`,
      "--history-video-offset-x": entry.videoOffsetX ?? "0px",
      "--history-video-offset-y": entry.videoOffsetY ?? "0px",
    } as React.CSSProperties;
  };

  return (
    <div
      role="button"
      aria-label="Next History"
      onClick={onNext}
      className="relative z-0 mx-auto flex w-full max-w-none cursor-pointer flex-col justify-start bg-transparent box-border caret-transparent outline-[3px] md:max-w-[1920px]"
    >
      <div className="relative h-[1000px] w-full shrink-0 overflow-hidden bg-transparent box-border caret-transparent outline-[3px]">
        {entries.map((entry, index) => {
          const isActive = index === displayIndex;
          const isLeaving = index === leavingIndex;
          const shouldRender = isActive || isLeaving;

          if (!shouldRender) {
            return null;
          }

          return (
            <div
              key={`${entry.year}-${index}`}
              aria-hidden={!isActive}
              className={`absolute left-1/2 top-0 h-[82%] w-full -translate-x-1/2 md:top-1/2 md:h-[90%] md:-translate-y-1/2 ${
                isActive ? "visible z-[2]" : "pointer-events-none visible z-[1]"
              }`}
            >
              <div
                className={`absolute inset-0 ${isActive ? "history-page-fade-in" : "history-page-fade-out"}`}
              >
                <div
                  className="pointer-events-none absolute left-0 top-0 h-full w-full bg-cover bg-center bg-no-repeat"
                  style={entry.pcPoster ? { backgroundImage: `url('${entry.pcPoster}')` } : undefined}
                />
                {entry.videoMp4 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="history-video-frame relative z-[1]"
                      style={getVideoFrameStyle(entry)}
                    >
                    <video
                      autoPlay
                      playsInline
                      loop
                      muted
                      preload="auto"
                      className={`h-full w-full ${
                        entry.videoFit === "cover" ? "object-cover" : "object-contain"
                      }`}
                    >
                      {entry.videoWebm && <source type="video/webm" src={entry.videoWebm} />}
                      <source type="video/mp4" src={entry.videoMp4} />
                    </video>
                    </div>
                  </div>
                )}
                <div className="pointer-events-none absolute bottom-8 left-1/2 z-[4] -translate-x-1/2 select-none hidden xl:block">
                  <span className="font-pretendard text-[80px] font-bold leading-none tracking-tight text-white/12 md:text-[160px]">
                    {entry.year}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-t from-black/60 via-transparent to-black/30" />

        <div className="pointer-events-none absolute bottom-6 right-6 z-[5] flex select-none items-center gap-2 text-sm text-white/40 md:bottom-10 md:right-10">
          <span className="font-suit text-xs uppercase tracking-wider">다음</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M4 10h12M12 6l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
