"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const videos = [
  "/screen/main_object_video.mp4",
  "/screen/main_object_video03.mp4",
];

const introTitles = [
  "서비스 기획자",
  "프로젝트 매니저",
  "연구원",
  "프로덕트 오너",
  "데이터 분석가",
  "박 건 호",
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const tickingRef = useRef(false);

  const [progress, setProgress] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [introWordIndex, setIntroWordIndex] = useState(0);
  const [isIntroFinal, setIsIntroFinal] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const milliseconds = String(
        Math.floor(now.getMilliseconds() / 10)
      ).padStart(2, "0");

      setTime(`${hours}:${minutes}:${seconds}:${milliseconds}`);

      const months = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ];

      const month = months[now.getMonth()];
      const day = now.getDate();
      const year = now.getFullYear();

      const suffix =
        day === 1 || day === 21 || day === 31
          ? "st"
          : day === 2 || day === 22
          ? "nd"
          : day === 3 || day === 23
          ? "rd"
          : "th";

      setDate(`${month} ${day}${suffix} ${year}`);
    };

    const updateScrollProgress = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const raw = -rect.top / viewportHeight;

      setProgress(clamp(raw, 0, 1));
      tickingRef.current = false;
    };

    const handleScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        rafRef.current = requestAnimationFrame(updateScrollProgress);
      }
    };

    updateTime();
    updateScrollProgress();

    const timeInterval = setInterval(updateTime, 30);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      clearInterval(timeInterval);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    let cycleCount = 0;

    const fastInterval = setInterval(() => {
      currentIndex += 1;

      if (currentIndex >= introTitles.length - 1) {
        currentIndex = 0;
        cycleCount += 1;
      }

      setIntroWordIndex(currentIndex);

      if (cycleCount >= 5) {
        clearInterval(fastInterval);

        setTimeout(() => {
          setIntroWordIndex(introTitles.length - 1);
          setIsIntroFinal(true);
        }, 120);
      }
    }, 160);

    return () => clearInterval(fastInterval);
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === videoIndex) {
        // 활성 비디오만 재생
        if (video.currentTime > 0.05 && !video.paused) return;

        video.currentTime = 0;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      } else {
        // 비활성 비디오는 멈춤
        video.pause();
      }
    });
  }, [videoIndex]);

  const handleVideoEnded = () => {
    setVideoIndex((prev) => (prev + 1) % videos.length);
  };

  const eased = useMemo(() => {
    return 1 - Math.pow(1 - progress, 3);
  }, [progress]);

  const introOpacity = 1 - clamp(progress * 1.55, 0, 1);
  const headlineOpacity = clamp((progress - 0.1) / 0.38, 0, 1);

  const videoStyle = useMemo(() => {
    const startLeft = 50;
    const startTop = 81.5;
    const startScale = 0.25;

    const endLeft = 76;
    const endTop = 50;
    const endScale = 1;

    return {
      left: `${lerp(startLeft, endLeft, eased)}%`,
      top: `${lerp(startTop, endTop, eased)}%`,
      transform: `translate3d(-50%, -50%, 0) scale(${lerp(
        startScale,
        endScale,
        eased
      )})`,
      opacity: lerp(0.72, 1, eased),
    };
  }, [eased]);

  const headlineWrapStyle = useMemo(() => {
    const y = lerp(48, 0, headlineOpacity);
    const scale = lerp(0.965, 1, headlineOpacity);

    return {
      opacity: headlineOpacity,
      transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
    };
  }, [headlineOpacity]);

  const headlineInnerStyle = useMemo(() => {
    const pushProgress = clamp((progress - 0.18) / 0.5, 0, 1);
    const pushY = lerp(18, -10, pushProgress);
    const pushScale = lerp(1, 1.018, pushProgress);

    return {
      transform: `translate3d(0, ${pushY}px, 0) scale(${pushScale})`,
    };
  }, [progress]);

  const paragraphStyle = useMemo(() => {
    const p = clamp((progress - 0.16) / 0.42, 0, 1);

    return {
      opacity: p,
      transform: `translate3d(0, ${lerp(30, 0, p)}px, 0)`,
    };
  }, [progress]);

  return (
    <section ref={sectionRef} className="relative h-[200vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        {/* 인트로 가이드 라인 */}
        <div
          className="pointer-events-none absolute inset-0 z-10 grid [grid-template-rows:repeat(11,minmax(0,0fr))]"
          style={{ opacity: introOpacity * 0.45 }}
        >
          {Array.from({ length: 11 }).map((_, index) => (
            <div
              key={index}
              className={
                index === 0 || index === 10 ? "" : "border-b border-white/12"
              }
            />
          ))}
        </div>

        {/* 1페이지 인트로 */}
        <div
          className="absolute inset-0 z-30 grid [grid-template-rows:repeat(11,minmax(0,1fr))] px-6 md:px-12"
          style={{ opacity: introOpacity }}
        >
          <div className="row-start-5 row-end-6 mx-5 flex items-center justify-between gap-4 md:mx-20 lg:mx-30 xl:mx-40">
            <div className="font-mono text-sm font-medium tracking-wider text-white/80 md:text-base">
              {time}
            </div>

            <div className="relative flex h-[48px] w-[220px] items-center justify-center overflow-hidden text-center sm:h-[56px] sm:w-[280px] md:h-[72px] md:w-[420px]">
              <div
                key={introTitles[introWordIndex]}
                className={`absolute inset-0 flex items-center justify-center whitespace-nowrap text-white animate-intro-word ${
                  isIntroFinal
                    ? "text-[28px] font-semibold tracking-[0.28em] sm:text-[34px] md:text-[56px]"
                    : "text-[18px] font-medium tracking-[0.02em] sm:text-[22px] md:text-[40px]"
                }`}
              >
                {introTitles[introWordIndex]}
              </div>
            </div>

            <div className="font-mono text-sm tracking-wider text-white/80 md:text-base">
              {date}
            </div>
          </div>

          <div className="row-start-11 row-end-12 flex flex-col items-center justify-center pb-4">
            <span className="mb-3 text-xs uppercase tracking-[0.24em] text-white/70">
              Scroll
            </span>
            <div className="flex h-10 items-start overflow-hidden">
              <div className="animate-scroll-line w-px bg-white/60" />
            </div>
          </div>
        </div>

        {/* 2페이지 메인 타이포 */}
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
          style={headlineWrapStyle}
        >
          <div style={headlineInnerStyle}>
            <p
              className="font-semibold leading-[1.05] text-white
              text-[48px] sm:text-[60px] md:text-[72px] lg:text-[84px] xl:text-[110px]"
            >
              PLANNING
              <br />
              USER EXPERIENCES
              <br />
              FROM A TO Z
            </p>
          </div>

          <p
            className="mt-8 max-w-[600px] text-sm leading-relaxed text-white/70 md:text-base lg:text-[18px]"
            style={paragraphStyle}
          >
            서비스 기획부터 R&amp;D 사업기획까지 전 과정을 책임지는 PM 박건호입니다.
            <br />
            기획에서 끝내지 않고, 직접 실행하고 결과로 증명합니다.
          </p>
        </div>

        {/* VIDEO OBJECT */}
        <div
          className="absolute z-0 h-[320px] w-[260px] bg-transparent will-change-transform
                     sm:h-[380px] sm:w-[300px]
                     md:h-[440px] md:w-[380px]
                     lg:h-[520px] lg:w-[460px]"
          style={videoStyle}
        >
          {videos.map((src, index) => (
            <video
              key={src}
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              muted
              playsInline
              preload="metadata"
              onEnded={index === videoIndex ? handleVideoEnded : undefined}
              className={`absolute inset-0 h-full w-full object-cover bg-transparent transition-opacity duration-700 ${
                videoIndex === index ? "opacity-90 md:opacity-100" : "opacity-0"
              }`}
            >
              <source src={src} type="video/mp4" />
            </video>
          ))}
        </div>
      </div>
    </section>
  );
}