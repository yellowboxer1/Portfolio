"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: "-10% 0px",
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-black px-6 pb-24 scroll-mt-28 md:px-12 md:pt-56 md:pb-40 md:scroll-mt-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-white/[0.02] blur-3xl md:h-[400px] md:w-[400px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-12 md:gap-20">
          <div
            className={`md:col-span-1 transition-all duration-[1200ms] ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-4 opacity-0"
            }`}
            style={{
              transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
            }}
          >
            <h2 className="mb-6 text-4xl font-semibold text-white md:text-5xl">
              About
            </h2>
          </div>

          <div
            className={`md:col-span-11 md:col-start-4 lg:col-start-5 xl:col-start-7 2xl:col-start-9 transition-all duration-[1500ms] ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
            style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }}
          >
            <h3
              className={`mb-12 text-2xl leading-tight font-semibold tracking-[-0.02em] text-white/95 transition-all duration-[1200ms] md:text-3xl md:tracking-normal lg:text-[35px] ${
                isVisible ? "scale-100 opacity-100" : "scale-[0.99] opacity-0"
              }`}
              style={{
                transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
              }}
            >
              <span className="block">데이터와 핵심가치를 기반으로</span>
              <span className="block">서비스의 방향과 가능성을 설계합니다</span>
            </h3>

            <div className="mb-10 space-y-6 text-base leading-snug tracking-[-0.01em] text-white/70 md:text-lg md:tracking-normal lg:text-xl">
              {[
                <>
                  아이디어를 실현하는 과정은&nbsp;&nbsp;시간, 비용, 수많은
                  선택의 결과입니다.
                  <br />
                  하지만 시장의 선택을 받는 것은 전혀 다른 문제입니다.
                </>,
                <>
                  그렇기에 저는 ‘우리끼리 그럴 것이다’는 상상을 지양합니다.
                  <br />
                  ‘우리끼리 되지 않을까’는 망상을 배제합니다.
                  <br />
                </>,
                <>
                  기업의 리소스와 우리의 시간이 담긴
                  제품이&nbsp;&nbsp;사용자에게 외면받지 않도록,
                  <br />
                  모든 의사결정은&nbsp;&nbsp;데이터와 사용자 관점에서 시작되어야
                  한다고 믿습니다.
                </>,
                <>
                  데이터를 통해 사용자를 이해하고,&nbsp;&nbsp;그 위에서 서비스의
                  방향과 가능성을 판단합니다.
                  <br />
                </>,
                <>
                  기획에서 끝나는 것이 아니라,&nbsp;&nbsp;판단을 실행으로
                  연결하고,&nbsp;&nbsp;그 결과로 증명합니다.
                </>,
              ].map((text, index) => (
                <p
                  key={index}
                  className={`transition-all duration-[1000ms] ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-6 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isVisible
                      ? `${(index + 2) * 100}ms`
                      : "0ms",
                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  {text}
                </p>
              ))}
            </div>

            <div
              className={`transition-all duration-[1200ms] delay-[1100ms] ${
                isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
              style={{
                transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
              }}
            >
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-3 transition-all hover:border-white/40 hover:bg-white/5"
              >
                <span className="text-sm font-medium">About Me</span>
                <svg
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
