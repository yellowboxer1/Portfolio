"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 화면 진입/이탈 시마다 상태 교체 (반복형 유지)
        setIsVisible(entry.isIntersecting);
      },
      { 
        threshold: 0.1, // 섹션의 10%가 보이면 작동
        // rootMargin을 상하 -10% 정도로 설정해 화면 중앙에 가까워질 때 실행
        rootMargin: "-10% 0px" 
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative pb-24 md:pt-56 md:pb-40 px-6 md:px-12 bg-black overflow-hidden"
    >
      {/* subtle background glow - Apple 스타일 조명 효과 추가 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-white/[0.02] blur-3xl md:h-[400px] md:w-[400px]" />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        <div className="grid md:grid-cols-12 gap-12 md:gap-20">

          {/* LEFT : About 타이틀 - 미세하게 옆에서 부드럽게 등장 */}
          <div className={`md:col-span-1 transition-all duration-[1200ms] ${
            // Apple 스타일 cubic-bezier 적용: cubic-bezier(0.25, 0.1, 0.25, 1)
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
          }`} style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)" }}>
            <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6">
              About
            </h2>
          </div>

          {/* RIGHT : 콘텐츠 */}
          <div
            className={`md:col-span-11 md:col-start-4 lg:col-start-5 xl:col-start-7 2xl:col-start-9 transition-all duration-[1500ms] ${
              // 이동 거리 조정: translate-y-8 (약 32px)
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`} style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }}
          >
            {/* Headline */}
            <h3 className={`text-white/95 text-2xl md:text-3xl lg:text-[35px] font-semibold leading-tight mb-12 break-keep tracking-[-0.02em] md:tracking-normal transition-all duration-[1200ms] delay-150 ${
              // 미세한 스케일 효과 추가로 입체감 부여
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-[0.99]"
            }`} style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)" }}>
              <span className="block">데이터와 핵심가치를 기반으로</span>
              <span className="block">
                서비스의 방향과 가능성을 설계합니다
              </span>
            </h3>

            {/* Body */}
            <div className="space-y-6 text-white/70 text-base md:text-lg lg:text-xl leading-snug mb-10 break-keep tracking-[-0.01em] md:tracking-normal">
              {[
                <>아이디어를 실현하는 과정은&nbsp;&nbsp;시간, 비용, 수많은 선택의 결과입니다.<br />하지만 시장의 선택을 받는 것은 전혀 다른 문제입니다.</>,
                <>그렇기에 저는 ‘우리끼리 그럴 것이다’는 상상을 지양합니다. <br/>‘우리끼리 되지 않을까’는 망상을 배제합니다. <br /></>,
                <>기업의 리소스와 우리의 시간이 담긴 제품이&nbsp;&nbsp;사용자에게 외면받지 않도록, <br />모든 의사결정은&nbsp;&nbsp;데이터와 사용자 관점에서 시작되어야 한다고 믿습니다.</>,
                <>데이터를 통해 사용자를 이해하고,&nbsp;&nbsp;그 위에서 서비스의 방향과 가능성을 판단합니다. <br /></>,
                <>기획에서 끝나는 것이 아니라,&nbsp;&nbsp;판단을 실행으로 연결하고,&nbsp;&nbsp;그 결과로 증명합니다.</>
              ].map((text, i) => (
                <p 
                  key={i}
                  className={`transition-all duration-[1000ms] ${
                    // 문단별 이동 거리: translate-y-6 (약 24px)로 더 은은하게
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{ 
                    // 진입 시에만 자연스러운 딜레이 적용: 100ms 간격
                    transitionDelay: isVisible ? `${(i + 2) * 100}ms` : "0ms",
                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)"
                  }}
                >
                  {text}
                </p>
              ))}
            </div>

            {/* CTA */}
            <div className={`transition-all duration-[1200ms] delay-[1100ms] ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`} style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)" }}>
              <Link
                href="/about"
                className="inline-flex items-center gap-3 px-6 py-3 border border-white/20 hover:border-white/40 hover:bg-white/5 rounded-full transition-all group"
              >
                <span className="text-sm font-medium">About Me</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}