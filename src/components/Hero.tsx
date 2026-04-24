"use client";

import { useEffect, useRef, useState } from "react";

const heroVideo = "/screen/main_object_video.mp4";

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
  const scrollRafRef = useRef<number | null>(null);
  const currentProgressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const guideLinesRef = useRef<HTMLDivElement | null>(null);
  const introPageRef = useRef<HTMLDivElement | null>(null);
  const headlinePageRef = useRef<HTMLDivElement | null>(null);
  const headlineInnerRef = useRef<HTMLDivElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const videoObjectRef = useRef<HTMLDivElement | null>(null);

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

    const readScrollProgress = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const raw = -rect.top / viewportHeight;

      targetProgressRef.current = clamp(raw, 0, 1);
    };

    const applyScrollStyles = (progressValue: number) => {
      const eased =
        progressValue *
        progressValue *
        progressValue *
        (progressValue * (progressValue * 6 - 15) + 10);
      const introOpacity = 1 - clamp(progressValue * 1.55, 0, 1);
      const headlineOpacity = clamp((progressValue - 0.1) / 0.38, 0, 1);
      const pushProgress = clamp((progressValue - 0.18) / 0.5, 0, 1);
      const paragraphOpacity = clamp((progressValue - 0.16) / 0.42, 0, 1);

      const videoX = lerp(0, 24, eased);
      const videoY = lerp(30, 0, eased);
      const videoScale = lerp(0.24, 1, eased);
      const headlineY = lerp(48, 0, headlineOpacity);
      const headlineScale = lerp(0.965, 1, headlineOpacity);
      const headlinePushY = lerp(18, -10, pushProgress);
      const headlinePushScale = lerp(1, 1.018, pushProgress);
      const paragraphY = lerp(30, 0, paragraphOpacity);

      if (guideLinesRef.current) {
        guideLinesRef.current.style.opacity = `${introOpacity * 0.45}`;
      }

      if (introPageRef.current) {
        introPageRef.current.style.opacity = `${introOpacity}`;
      }

      if (headlinePageRef.current) {
        headlinePageRef.current.style.opacity = `${headlineOpacity}`;
        headlinePageRef.current.style.transform = `translate3d(0%, ${headlineY}px, 0) scale(${headlineScale})`;
      }

      if (headlineInnerRef.current) {
        headlineInnerRef.current.style.transform = `translate3d(0, ${headlinePushY}px, 0) scale(${headlinePushScale})`;
      }

      if (paragraphRef.current) {
        paragraphRef.current.style.opacity = `${paragraphOpacity}`;
        paragraphRef.current.style.transform = `translate3d(0, ${paragraphY}px, 0)`;
      }

      if (videoObjectRef.current) {
        videoObjectRef.current.style.opacity = `${lerp(0.72, 1, eased)}`;
        videoObjectRef.current.style.transform = `translate3d(calc(-50% + ${videoX}vw), calc(-50% + ${videoY}vh), 0) scale(${videoScale})`;
      }
    };

    const animateScrollProgress = () => {
      const current = currentProgressRef.current;
      const target = targetProgressRef.current;
      const next = current + (target - current) * 0.18;

      if (Math.abs(target - next) < 0.001) {
        currentProgressRef.current = target;
        applyScrollStyles(target);
        scrollRafRef.current = null;
        return;
      }

      currentProgressRef.current = next;
      applyScrollStyles(next);
      scrollRafRef.current = requestAnimationFrame(animateScrollProgress);
    };

    const handleScroll = () => {
      readScrollProgress();

      if (scrollRafRef.current === null) {
        scrollRafRef.current = requestAnimationFrame(animateScrollProgress);
      }
    };

    updateTime();
    readScrollProgress();
    currentProgressRef.current = targetProgressRef.current;
    applyScrollStyles(targetProgressRef.current);

    const timeInterval = setInterval(updateTime, 250);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      clearInterval(timeInterval);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
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

  const finalChars = "박 건 호".split("");

  return (
    <section ref={sectionRef} className="relative h-[200vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        {/* Intro guide lines */}
        <div
          ref={guideLinesRef}
          className="pointer-events-none absolute inset-0 z-10 grid [grid-template-rows:repeat(11,minmax(0,0fr))]"
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
          ref={introPageRef}
          className="absolute inset-0 z-30 grid w-full [grid-template-rows:repeat(11,minmax(0,1fr))]"
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
          ref={headlinePageRef}
          className="absolute inset-0 z-20 flex items-center justify-center px-6"
        >
          <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center text-center">
            <div ref={headlineInnerRef}>
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
              ref={paragraphRef}
              className="mt-8 max-w-[800px] text-base leading-relaxed text-white/70 md:text-lg lg:text-xl break-keep"
            >
              서비스 기획부터 R&D 사업기획까지 전 과정을 책임지는 PM 박건호입니다.
              <br /> 
              기획에서 끝내지 않고, 직접 실행하고 결과로 증명합니다.
            </p>
          </div>
        </div>

        {/* Video object */}
        <div
          ref={videoObjectRef}
          className="absolute z-0 h-[320px] w-[260px] overflow-hidden bg-transparent will-change-transform transform-gpu
                     sm:h-[380px] sm:w-[300px]
                     md:h-[420px] md:w-[340px]
                     lg:h-[520px] lg:w-[460px]"
          style={{ left: "50%", top: "50%" }}
        >
          <video
            muted
            playsInline
            autoPlay
            loop
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover bg-transparent opacity-60 transition-none md:opacity-80"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}
