"use client";

import { useEffect, useRef, useState, type Ref } from "react";
import type { HistoryEntry } from "../data";

const TRANSITION_MS = 720;
const MOTION_OFFSET_PERCENT = 16;

type Props = {
  activeIndex: number;
  entries: HistoryEntry[];
  onNext: () => void;
};

export const HistoryMediaGallery = ({ activeIndex, entries, onNext }: Props) => {
  const [slotA, setSlotA] = useState(activeIndex);
  const [slotB, setSlotB] = useState<number | null>(null);
  const [showB, setShowB] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);

  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const isAnimating = useRef(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const currentVideo = videoARef.current;
    if (!currentVideo || !entries[slotA]?.videoMp4) return;

    currentVideo.load();
    currentVideo.play().catch(() => {});
  }, [entries, slotA]);

  useEffect(() => {
    if (activeIndex === slotA || isAnimating.current) return;

    isAnimating.current = true;
    const nextDirection = activeIndex > slotA ? 1 : -1;
    setDirection(nextDirection);

    setSlotB(activeIndex);
    setShowB(false);

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (videoBRef.current && entries[activeIndex].videoMp4) {
          videoBRef.current.load();
          videoBRef.current.play().catch(() => {});
        }

        setShowB(true);

        timeoutRef.current = window.setTimeout(() => {
          setSlotA(activeIndex);
          setSlotB(null);
          setShowB(false);
          isAnimating.current = false;
        }, TRANSITION_MS);
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [activeIndex, entries, slotA]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const entryA = entries[slotA];
  const entryB = slotB !== null ? entries[slotB] : null;
  const exitOffset = direction === 1 ? -MOTION_OFFSET_PERCENT : MOTION_OFFSET_PERCENT;
  const enterOffset = direction === 1 ? MOTION_OFFSET_PERCENT : -MOTION_OFFSET_PERCENT;

  const baseMediaWrapperClassName =
    "absolute left-1/2 top-0 h-[82%] w-full -translate-x-1/2 md:top-1/2 md:h-[90%] md:-translate-y-1/2";

  const renderMedia = (
    entry: HistoryEntry,
    videoRef: Ref<HTMLVideoElement>,
    key: string,
  ) => {
    const defaultVideoClassName = entry.videoMp4?.startsWith("/")
      ? "relative z-[1] h-full w-full object-cover"
      : "relative z-[1] hidden h-full w-full object-cover md:block";
    const videoClassName = entry.videoClassName
      ? `relative z-[1] ${entry.videoClassName}`
      : defaultVideoClassName;

    return (
      <>
        <div
          className="absolute left-0 top-0 h-full w-full bg-center bg-cover bg-no-repeat pointer-events-none"
          style={entry.pcPoster ? { backgroundImage: `url('${entry.pcPoster}')` } : undefined}
        />
        {entry.videoMp4 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <video
              ref={videoRef}
              key={key}
              autoPlay
              playsInline
              loop
              muted
              className={videoClassName}
            >
              {entry.videoWebm && <source type="video/webm" src={entry.videoWebm} />}
              <source type="video/mp4" src={entry.videoMp4} />
            </video>
          </div>
        )}
      </>
    );
  };

  return (
    <div
      role="button"
      aria-label="Next History"
      onClick={onNext}
      className="relative bg-black box-border caret-transparent flex flex-col justify-start max-w-none outline-[3px] w-full z-0 mx-auto cursor-pointer md:max-w-[1920px]"
    >
      <div className="relative bg-black box-border caret-transparent shrink-0 h-[1000px] min-h-[auto] min-w-[auto] outline-[3px] w-full overflow-hidden">

        {/* ── SLOT A (current layer) ── */}
        <div className={baseMediaWrapperClassName}>
          <div
            className="absolute inset-0 will-change-transform"
            style={{
              opacity: showB ? 0.28 : 1,
              transform: showB ? `translateY(${exitOffset}%)` : "translateY(0%)",
              transition: `transform ${TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${TRANSITION_MS}ms ease`,
            }}
          >
            {renderMedia(entryA, videoARef, `a-${slotA}`)}
          </div>
        </div>

        {/* ── SLOT B (incoming layer) ── */}
        {entryB && (
          <div
            className={`${baseMediaWrapperClassName} z-[2]`}
          >
            <div
              className="absolute inset-0 will-change-transform"
              style={{
                opacity: showB ? 1 : 0.18,
                transform: showB ? "translateY(0%)" : `translateY(${enterOffset}%)`,
                transition: `transform ${TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${TRANSITION_MS}ms ease`,
              }}
            >
              {renderMedia(entryB, videoBRef, `b-${slotB}`)}
            </div>
          </div>
        )}

        {/* ── Gradient overlay ── */}
        <div className="absolute inset-0 z-[3] pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/30" />

        {/* ── Year watermark ── */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[4] pointer-events-none select-none"
          style={{
            opacity: showB ? 0 : 0.12,
            transition: "opacity 0.4s ease",
          }}
        >
          <span className="text-white font-pretendard text-[80px] md:text-[160px] leading-none font-bold tracking-tight">
            {entryA.year}
          </span>
        </div>
        {entryB && (
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[4] pointer-events-none select-none"
            style={{
              opacity: showB ? 0.12 : 0,
              transition: "opacity 0.4s ease",
            }}
          >
            <span className="text-white font-pretendard text-[80px] md:text-[160px] leading-none font-bold tracking-tight">
              {entryB.year}
            </span>
          </div>
        )}

        {/* ── Click hint ── */}
        <div className="absolute bottom-6 right-6 z-[5] flex items-center gap-2 text-white/40 text-sm pointer-events-none select-none md:bottom-10 md:right-10">
          <span className="font-suit text-xs tracking-wider uppercase">다음</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
};
