"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative pt-40 pb-24 md:pt-56 md:pb-40 px-6 md:px-12 bg-black"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 md:gap-20">

          {/* LEFT : About 타이틀 */}
          <div className="md:col-span-1">
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6">
          About
            </h2>
          </div>

          {/* RIGHT : 콘텐츠 */}
          <div
            className={`md:col-span-11 md:col-start-4 lg:col-start-5 xl:col-start-7 2xl:col-start-9 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Headline */}
            <h3 className="text-white/95 text-2xl md:text-3xl lg:text-[35px] font-semibold leading-tight mb-12">
              <span className="block">데이터와 핵심가치를 기반으로</span>
              <span className="block ">
                서비스의 방향과 가능성을 설계합니다
              </span>
            </h3>

            {/* Body */}
            <div className="space-y-6 text-white/80 text-base md:text-lg lg:text-xl leading-sung mb-10">
              <p>
                아이디어를 실현하는 과정은  
                시간, 비용, 수많은 선택의 결과입니다.<br />
                하지만 시장의 선택을 받는 것은 전혀 다른 문제입니다.
              </p>

              <p>
                그렇기에 저는 ‘우리끼리 그럴 것이다’는 상상을 지양합니다. <br/>   ‘우리끼리 되지 않을까’는 망상을 배제합니다. <br />
              </p>

              <p>
                기업의 리소스와 우리의 시간이 담긴 제품이  
                사용자에게 외면받지 않도록, <br />
                모든 의사결정은  
                데이터와 사용자 관점에서 시작되어야 한다고 믿습니다.
              </p>

              <p>
                데이터를 통해 사용자를 이해하고,  
                그 위에서 서비스의 방향과 가능성을 판단합니다. <br />
              </p>

              <p className="text-white/90">
                기획에서 끝나는 것이 아니라,  
                판단을 실행으로 연결하고,  
                그 결과로 증명합니다.
              </p>
            </div>

            {/* CTA */}
            <Link
              href="/about"
              className="inline-flex items-center gap-3 px-6 py-3 border border-white/20 hover:border-white/40 hover:bg-white/5 rounded-full transition-all group"
            >
              <span className="text-sm font-medium">About Me</span>
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}