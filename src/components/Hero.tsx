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
  const [finalReveal, setFinalReveal] = useState(false);

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

    const wordInterval = setInterval(() => {
      currentIndex += 1;

      if (currentIndex >= introTitles.length - 1) {
        currentIndex = 0;
        cycleCount += 1;
      }

      setIntroWordIndex(currentIndex);

      // 2번만 순환 후 마지막 이름 노출
      if (cycleCount >= 2) {
        clearInterval(wordInterval);

        setTimeout(() => {
          setIntroWordIndex(introTitles.length - 1);

          setTimeout(() => {
            setIsIntroFinal(true);

            setTimeout(() => {
              setFinalReveal(true);
            }, 520);
          }, 520);
        }, 520);
      }
    }, 700);

    return () => clearInterval(wordInterval);
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === videoIndex) {
        if (video.currentTime > 0.05 && !video.paused) return;

        video.currentTime = 0;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      } else {
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
    // 시작부터 중앙 기준
    const startLeft = 50;
    const startTop = 80;
    const startScale = 0.24;

    // 전개 후에도 중앙축 기준에서 우측으로 자연스럽게 이동
    const endLeft = 74;
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
      transform: `translate3d(0%, ${y}px, 0) scale(${scale})`,
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

  const finalChars = "박 건 호".split("");

  return (
    <section ref={sectionRef} className="relative h-[200vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        {/* Intro guide lines */}
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

        {/* Intro page */}
        <div
          className="absolute inset-0 z-30 grid w-full [grid-template-rows:repeat(11,minmax(0,1fr))]"
          style={{ opacity: introOpacity }}
        >
          <div className="row-start-5 row-end-6 flex items-center">
            <div className="mx-auto grid w-full max-w-[1440px] grid-cols-[85px_minmax(0,1fr)_85px] items-center gap-4 px-4 md:px-12 lg:px-20 xl:px-24">
              <div className="text-left font-mono text-[12px] font-medium tracking-wider whitespace-nowrap text-white/80 md:text-sm lg:text-base">
                {time}
              </div>

              <div className="relative flex h-[48px] min-w-0 items-center justify-center overflow-hidden text-center sm:h-[56px] md:h-[64px] lg:h-[72px]">
                {!isIntroFinal &&
                  introTitles.map((word, index) => {
                    const isActive = index === introWordIndex;

                    return (
                      <div
                        key={word}
                        className={`absolute inset-0 flex items-center justify-center whitespace-nowrap text-white transition-all duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[transform,opacity,filter] ${
                          isActive
                            ? "opacity-100 translate-y-0 scale-100 blur-0"
                            : "opacity-0 -translate-y-[8px] scale-[0.992] blur-[6px]"
                        } text-[18px] font-medium tracking-[0.02em] sm:text-[20px] md:text-[26px] lg:text-[34px] xl:text-[39px]`}
                      >
                        {word}
                      </div>
                    );
                  })}

                {isIntroFinal && (
                  <div className="absolute inset-0 flex items-center justify-center whitespace-nowrap text-white">
                    {finalChars.map((char, index) => (
                      <span
                        key={`${char}-${index}`}
                        className={`inline-block text-[18px] font-semibold transition-all duration-[1400ms] ease-[cubic-bezier(0.19,1,0.22,1)] will-change-[transform,opacity,filter] sm:text-[20px] md:text-[26px] lg:text-[34px] xl:text-[39px] ${
                          finalReveal
                            ? "opacity-100 translate-y-0 scale-100 blur-0"
                            : "opacity-0 translate-y-[8px] scale-100 blur-[6px]"
                        } ${char === " " ? "w-[0.28em]" : ""}`}
                        style={{
                          transitionDelay: `${index * 220}ms`,
                          letterSpacing: "0.02em",
                        }}
                      >
                        {char === " " ? "\u00A0" : char}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="text-right font-mono font-medium text-[12px] tracking-wider whitespace-nowrap text-white/80 md:text-sm lg:text-base">
                {date}
              </div>
            </div>
          </div>

          {/* Scroll indicator - 하단 row 안에서 중앙정렬 */}
          <div className="row-start-11 row-end-12 flex items-end justify-center">
            <div className="flex flex-col items-center justify-center pb-4 md:pb-5">
              <span className="mb-3 text-xs uppercase tracking-[0.24em] text-white/70">
                Scroll
              </span>
              <div className="flex h-10 items-start justify-center overflow-hidden">
                <div className="animate-scroll-line w-px bg-white/60" />
              </div>
            </div>
          </div>
        </div>

        {/* Main headline page */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center px-6"
          style={headlineWrapStyle}
        >
          <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center text-center">
            <div style={headlineInnerStyle}>
              <p
                className="font-semibold leading-[1.05] text-white
                text-[40px] sm:text-[52px] md:text-[64px] lg:text-[84px] xl:text-[110px]"
              >
                PLANNING
                <br />
                USER EXPERIENCES
                <br />
                FROM A TO Z
              </p>
            </div>

            <p
              className="mt-8 max-w-[800px] text-base leading-relaxed text-white/70 md:text-lg lg:text-xl break-keep"
              style={paragraphStyle}
            >
              서비스 기획부터 R&D 사업기획까지 전 과정을 책임지는 PM 박건호입니다.
              <br /> 
              기획에서 끝내지 않고, 직접 실행하고 결과로 증명합니다.
            </p>
          </div>
        </div>

        {/* Video object */}
        <div
          className="absolute z-0 h-[320px] w-[260px] bg-transparent will-change-transform
                     sm:h-[380px] sm:w-[300px]
                     md:h-[420px] md:w-[340px]
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
              className={`absolute inset-0 h-full w-full object-cover bg-transparent transition-all duration-[1200ms] ease-in-out ${
                videoIndex === index
                  ? "opacity-60 md:opacity-80 scale-100"
                  : "opacity-0 scale-[1.03]"
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