"use client";

import { useState } from "react";
import Header from "@/src/components/Header";

const METRIC_GROUPS = [
  {
    label: "Game Development & Publishing",
    eyebrow: "OUR STATUS",
    metrics: [
      {
        value: "$2.92B",
        title: "총 게임 매출",
        body: "2009년부터 2025년까지 축적된 게임 사업 성과를 압축해 보여주는 수치입니다.",
      },
      {
        value: "100+",
        title: "출시 게임 수",
        body: "PC와 모바일을 아우르며 다양한 장르와 서비스 경험을 시장에 선보였습니다.",
      },
      {
        value: "1.4M",
        title: "최고 동시접속자",
        body: "미르4 글로벌 서비스 이후 기록한 대규모 트래픽은 글로벌 확장성을 증명합니다.",
      },
      {
        value: "2000+",
        title: "함께 만드는 팀",
        body: "다양한 직군의 인재들이 게임과 플랫폼, 기술 혁신을 함께 만들어가고 있습니다.",
      },
    ],
  },
  {
    label: "IP Licensing",
    eyebrow: "IP VALUE",
    metrics: [
      {
        value: "$20B",
        title: "전기 라이선스 게임 매출",
        body: "중국 시장에서 축적된 대규모 라이선스 성과는 미르 IP의 장기적인 경쟁력을 보여줍니다.",
      },
      {
        value: "$500M",
        title: "라이선스 로열티 매출",
        body: "글로벌 파트너십과 IP 운영 역량이 실질적인 수익성과 연결된 결과입니다.",
      },
      {
        value: "80+",
        title: "미르 IP 프랜차이즈",
        body: "해외 출시작, 리메이크, 스핀오프까지 포함한 확장형 IP 생태계를 구축했습니다.",
      },
    ],
  },
  {
    label: "Blockchain Platforms",
    eyebrow: "PLATFORM SCALE",
    metrics: [
      {
        value: "$11B+",
        title: "누적 거래 금액",
        body: "WEMIX 3.0 메인넷 위에서 실제 사용과 거래가 지속적으로 발생하고 있습니다.",
      },
      {
        value: "2.27x",
        title: "TVL 대비 시장가치 비율",
        body: "실사용성 중심 블록체인으로서의 강도를 보여주는 지표를 유지하고 있습니다.",
      },
      {
        value: "#1",
        title: "GameFi 보안 리더보드",
        body: "보안 신뢰도와 운영 안정성 측면에서도 플랫폼 경쟁력을 강화하고 있습니다.",
      },
    ],
  },
];

export default function AboutCompanyExperience() {
  const [activeMetricGroup, setActiveMetricGroup] = useState(0);
  const currentMetricGroup = METRIC_GROUPS[activeMetricGroup];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header aboutHref="/about" />

      <main className="px-6 pb-24 pt-32 md:px-12 md:pb-32 md:pt-40">
        <section className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-12 md:gap-20">
            <div className="md:col-span-2">
              <p className="font-mono text-xs tracking-[0.4em] text-white/38">
                ABOUT COMPANY
              </p>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white md:text-6xl">
                Company
              </h1>
            </div>

            <div className="md:col-span-10 md:col-start-4">
              <div className="max-w-4xl">
                <h2 className="mb-10 text-2xl leading-tight font-semibold tracking-[-0.02em] text-white/95 md:text-4xl">
                  데이터와 핵심가치를 기반으로 서비스의 방향과 가능성을
                  설계합니다
                </h2>
                <div className="space-y-6 text-base leading-snug text-white/70 md:text-lg lg:text-xl">
                  <p>
                    아이디어를 실현하는 과정은 시간, 비용, 수많은 선택의
                    결과입니다. 하지만 시장의 선택을 받는 것은 전혀 다른
                    문제입니다.
                  </p>
                  <p>
                    그렇기에 저는 ‘우리끼리 그럴 것이다’는 상상을 지양합니다.
                    ‘우리끼리 되지 않을까’는 망상을 배제합니다.
                  </p>
                  <p>
                    기업의 리소스와 우리의 시간이 담긴 제품이 사용자에게
                    외면받지 않도록, 모든 의사결정은 데이터와 사용자 관점에서
                    시작되어야 한다고 믿습니다.
                  </p>
                </div>
              </div>

              <div className="mt-16">
                <div className="mb-5 flex flex-wrap gap-3">
                  {METRIC_GROUPS.map((group, index) => (
                    <button
                      key={group.label}
                      type="button"
                      onClick={() => setActiveMetricGroup(index)}
                      className={`rounded-full border px-4 py-2 text-left text-[11px] tracking-[0.18em] uppercase transition-all md:text-xs ${
                        index === activeMetricGroup
                          ? "border-lime-300 bg-lime-300 text-black"
                          : "border-white/15 bg-white/5 text-white/68 hover:border-white/35 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {group.label}
                    </button>
                  ))}
                </div>

                <div className="mb-6 border-t border-white/10 pt-5">
                  <p className="mb-2 font-mono text-[11px] tracking-[0.34em] text-white/38">
                    {currentMetricGroup.eyebrow}
                  </p>
                  <p className="text-lg font-medium tracking-tight text-white md:text-2xl">
                    {currentMetricGroup.label}
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {currentMetricGroup.metrics.map((metric) => (
                    <article
                      key={`${currentMetricGroup.label}-${metric.title}`}
                      className="min-h-[210px] rounded-[26px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/[0.07]"
                    >
                      <p className="mb-8 font-mono text-[11px] tracking-[0.34em] text-white/35">
                        STATUS
                      </p>
                      <p className="mb-3 text-4xl font-semibold tracking-tight text-white">
                        {metric.value}
                      </p>
                      <h3 className="mb-3 text-lg font-medium text-white">
                        {metric.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-white/58">
                        {metric.body}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
