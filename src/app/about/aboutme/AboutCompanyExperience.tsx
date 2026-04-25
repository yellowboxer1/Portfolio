"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Header from "@/src/components/Header";
import MetricCard, { type MetricItem } from "./component/MetricCard";
import { MetricsTabs } from "./component/MetricTabs";

type MetricGroup = {
  tabLabel: string;
  eyebrow: string;
  title: string;
  videoSrc: string;
  items: MetricItem[];
};

type Capability = {
  title: string;
  summary: string;
  details: Array<{
    title: string;
    description: string;
  }>;
};


const aboutParagraphs = [
  "아이디어를 실현하는 과정은 시간, 비용, 수많은 선택의 결과입니다.\n하지만 시장의 선택을 받는 것은 전혀 다른 문제입니다.",
  "그렇기에 저는 '우리끼리 그럴 것이다'는 상상을 지양합니다.\n'우리끼리 되지 않을까'는 망상을 배제합니다.",
  "기업의 리소스와 우리의 시간이 담긴 제품이 사용자에게 외면받지 않도록,\n모든 의사결정은 데이터와 사용자 관점에서 시작되어야 한다고 믿습니다.",
  "데이터를 통해 사용자를 이해하고, 서비스의 방향과 가능성을 판단합니다.",
  "기획에서 끝내지 않고, 판단을 실행으로 연결하고, 그 결과로 증명합니다.",
];

const metricGroups: MetricGroup[] = [
  {
    tabLabel: "B2G Business Impact",
    eyebrow: "B2G Business Impact",
    title: "B2G Business\nImpact",
    videoSrc: "/screen/bg-3.webm",
    items: [
      {
        value: "447억+",
        label: "Total Project Value",
        description: "공공 사업비 총합\n스마트시티 챌린지 300억·함양 신활력 70억 등",
      },
      {
        value: "58억",
        label: "Allocated Budget",
        description: "기업 배정 사업비 규모\n연 평균 14억 B2G 직접 기획·운영",
      },
      {
        value: "50+",
        label: "Partner Networks",
        description: "협력 기관 수\n과기부·국토부·해수부·지자체 등 전 주기 리딩",
      },
    ],
  },
  {
    tabLabel: "R&D PROJECT EXECUTION",
    eyebrow: "R&D PROJECT EXECUTION",
    title: "R&D PROJECT\nEXECUTION",
    videoSrc: "/screen/bg-1.mp4",
    items: [
      {
        value: "31억+",
        label: "R&D Budget Secured",
        description: "기업배정 연구비 규모\n과기정통부·중기부·국토부 과제 직접 수행",
      },
      {
        value: "2건",
        label: "IP Portfolio",
        description: "특허 출원\n라이프로그 분석을 통한 1인 가구 원격 케어서비스 등",
      },
      {
        value: "40%",
        label: "Excellence Recognition Rate",
        description: "우수 과제 선정률\n과기부, 스마트빌리지 우수과제 선정",
      },
    ],
  },
  {
    tabLabel: "BUSINESS STRATEGY & GROWTH",
    eyebrow: "BUSINESS STRATEGY & GROWTH",
    title: "BUSINESS STRATEGY\n& GROWTH",
    videoSrc: "/screen/bg-4.mp4",
    items: [
      {
        value: "150%+",
        label: "Revenue Growth",
        description: "매출 성장률\n전략적 사업 제안 및 운영을 통한 기업 매출 150% 성장",
      },
      {
        value: "14건",
        label: "Projects Delivered",
        description: "수행 프로젝트 수\n공공·R&D·스타트업 전 영역 기획·운영 직접 수행",
      },
      {
        value: "3건",
        label: "Award & Selection",
        description: "수상 이력\n장관상·지자체장상·기관장상 등 비즈니스 임팩트 검증",
      },
    ],
  },
];

const capabilities: Capability[] = [
  {
    title: "Service Planning",
    summary: "사용자 문제를 기능, IA, 정책, 운영 흐름으로 구체화합니다.",
    details: [
      {
        title: "User Flow",
        description: "사용자의 진입부터 목적 달성까지 흐름을 설계하고 병목을 줄입니다.",
      },
      {
        title: "IA / Feature Spec",
        description: "정보 구조와 기능 정의를 문서화해 개발 가능한 형태로 정리합니다.",
      },
      {
        title: "Operation Policy",
        description: "서비스가 출시 이후에도 운영될 수 있도록 정책과 예외 케이스를 설계합니다.",
      },
    ],
  },
  {
    title: "B2G Execution",
    summary: "공공 과제와 R&D 사업을 제안부터 수행, 보고까지 연결합니다.",
    details: [
      {
        title: "Proposal",
        description: "사업 목적, 예산, 수행 범위를 제안서와 과업 구조로 구체화합니다.",
      },
      {
        title: "Stakeholder",
        description: "기관, 기업, 수행 조직 사이의 요구사항을 조율하고 실행 기준을 맞춥니다.",
      },
      {
        title: "Deliverable",
        description: "중간 산출물과 최종 결과물이 평가 기준에 맞게 완성되도록 관리합니다.",
      },
    ],
  },
  {
    title: "Data-based Decision",
    summary: "정성적 감각보다 데이터와 사용자의 반응을 기준으로 판단합니다.",
    details: [
      {
        title: "Metric Design",
        description: "서비스 목표를 측정 가능한 지표로 바꾸고 의사결정 기준을 만듭니다.",
      },
      {
        title: "Insight",
        description: "사용자 행동과 사업 데이터를 읽어 우선순위와 개선 방향을 도출합니다.",
      },
      {
        title: "Validation",
        description: "가설을 실행 가능한 실험으로 만들고 결과로 다음 판단을 검증합니다.",
      },
    ],
  },
  {
    title: "AI Product Design",
    summary: "AI 기술을 실제 서비스 경험과 운영 가능한 제품 구조로 변환합니다.",
    details: [
      {
        title: "AI UX",
        description: "AI가 개입하는 순간을 사용자 경험 안에서 자연스럽고 명확하게 설계합니다.",
      },
      {
        title: "Automation",
        description: "반복 업무와 판단 흐름을 자동화해 서비스 효율을 높이는 구조를 만듭니다.",
      },
      {
        title: "Prototype",
        description: "아이디어를 빠르게 검증할 수 있는 프로토타입과 데모 흐름을 구현합니다.",
      },
    ],
  },
];

export function MetricsSection() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const scrollLockRef = useRef(false);
  const scrollReleaseTimeoutRef = useRef<number | null>(null);
  const [activeScene, setActiveScene] = useState(0);
  const [activeCapabilityIndex, setActiveCapabilityIndex] = useState(0);
  const [displayedCapabilityIndex, setDisplayedCapabilityIndex] = useState(0);
  const [isCapabilityExiting, setIsCapabilityExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const coreScene = metricGroups.length + 1;
  const coreEndScene = coreScene + capabilities.length - 1;
  const projectsScene = coreEndScene + 1;
  const maxScene = projectsScene;
  const activeIndex = Math.min(
    metricGroups.length - 1,
    Math.max(0, activeScene - 1),
  );

  // Core Capability 씬 안에서 스크롤 시 자동으로 capability 전환
  useEffect(() => {
    if (activeScene >= coreScene && activeScene <= coreEndScene) {
      const nextIndex = activeScene - coreScene;
      if (nextIndex === activeCapabilityIndex) return;
      setIsCapabilityExiting(true);
      const t = window.setTimeout(() => {
        setActiveCapabilityIndex(nextIndex);
        setDisplayedCapabilityIndex(nextIndex);
        setIsCapabilityExiting(false);
      }, 220);
      return () => window.clearTimeout(t);
    }
  }, [activeScene, coreScene, coreEndScene]);

  const activeCapability = capabilities[displayedCapabilityIndex];
  const transitionDuration = 740;

  // 01 = About, 02 = Metrics, 03 = Core Capability, 04 = Works
  const navIndex =
    activeScene === 0
      ? 0
      : activeScene <= metricGroups.length
        ? 1
        : activeScene <= coreEndScene
          ? 2
          : 3;

  const navItems = [
    { label: "01", scene: 0 },
    { label: "02", scene: 1 },
    { label: "03", scene: coreScene },
    { label: "04", scene: projectsScene },
  ];
  const transitionEase = "cubic-bezier(.77,0,.175,1)";

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      if (scrollReleaseTimeoutRef.current !== null) {
        window.clearTimeout(scrollReleaseTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const target = ctaRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: "-10% 0px",
      },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const moveToScene = useCallback((nextScene: number) => {
    const clampedScene = Math.min(maxScene, Math.max(0, nextScene));

    if (clampedScene === activeScene || scrollLockRef.current) return;

    scrollLockRef.current = true;
    setActiveScene(clampedScene);

    if (scrollReleaseTimeoutRef.current !== null) {
      window.clearTimeout(scrollReleaseTimeoutRef.current);
    }

    scrollReleaseTimeoutRef.current = window.setTimeout(() => {
      scrollLockRef.current = false;
      scrollReleaseTimeoutRef.current = null;
    }, transitionDuration + 120);
  }, [activeScene, maxScene, transitionDuration]);

  const handleMetricTabChange = (index: number) => {
    moveToScene(index + 1);
  };

  const handleWheel = useCallback((event: WheelEvent) => {
    event.preventDefault();

    if (scrollLockRef.current || Math.abs(event.deltaY) < 8) return;

    const direction = event.deltaY > 0 ? 1 : -1;
    moveToScene(activeScene + direction);
  }, [activeScene, moveToScene]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    viewport.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      viewport.removeEventListener("wheel", handleWheel);
    };
  }, [handleWheel]);

  const viewportOffset =
    activeScene === 0
      ? 0
      : activeScene <= metricGroups.length
        ? 100
        : activeScene <= coreEndScene
          ? 200
          : 300;
  const viewportStyle = {
    transform: `translate3d(0, -${viewportOffset}%, 0)`,
    transition: `transform ${transitionDuration}ms ${transitionEase}`,
  };

  return (
    <div
      ref={viewportRef}
      className="h-[var(--viewport-height,100vh)] max-h-[100svh] overflow-hidden bg-black text-white"
    >
      <Header aboutHref="/about/aboutme" variant="default" />

      <Link
        href="/#about"
        className="group fixed left-6 top-[72px] z-[60] inline-flex h-[42px] min-w-[42px] items-center justify-center rounded-full border border-white/15 bg-black/55 px-[13px] text-sm font-medium tracking-[0.04em] text-white/88 shadow-[0_14px_32px_rgba(0,0,0,0.28)] backdrop-blur-md transition-[border-color,background-color,box-shadow,color,transform] duration-300 hover:-translate-x-[2px] hover:border-white/28 hover:bg-black/78 hover:text-white md:left-12 md:top-[72px]"
      >
        <span
          aria-hidden="true"
          className="inline-flex h-4 w-4 flex-none items-center justify-center text-white"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M13 8H3.5M7.5 4L3.5 8L7.5 12"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-[max-width,opacity,margin-left] duration-300 group-hover:ml-2 group-hover:max-w-[120px] group-hover:opacity-100">
          Back
        </span>
      </Link>

      {/* Fixed scroll nav indicator */}
      <nav className="fixed right-6 top-1/2 z-[60] hidden -translate-y-1/2 flex-col items-end gap-4 lg:flex">
        {navItems.map((item, i) => (
          <button
            key={item.label}
            onClick={() => moveToScene(item.scene)}
            className="group flex items-center gap-3"
            aria-label={`Go to section ${item.label}`}
          >
            <span
              className={`text-[11px] font-medium tracking-[0.14em] transition-all duration-300 ${
                navIndex === i
                  ? "text-white"
                  : "text-white/30 group-hover:text-white/70"
              }`}
            >
              {item.label}
            </span>
            <span
              className={`block h-px transition-all duration-500 ${
                navIndex === i
                  ? "w-8 bg-white"
                  : "w-3 bg-white/30 group-hover:w-5 group-hover:bg-white/60"
              }`}
            />
          </button>
        ))}
      </nav>

      <main className="h-full will-change-transform" style={viewportStyle}>
      <section
        className="relative flex h-full min-h-full items-center overflow-hidden bg-black px-6 md:px-12" // 상단 패딩 과다 제거
        aria-hidden={activeScene !== coreScene}
        >
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-85"
            src="/screen/bg-2.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(255,255,255,0.10),transparent_32%),linear-gradient(90deg,rgba(0,0,0,0.66),rgba(0,0,0,0.34)_48%,rgba(0,0,0,0.58))]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.36))]" />
            <div className="absolute right-[-10%] top-[12%] h-[520px] w-[520px] rounded-full bg-white/[0.035] blur-3xl" />
          </div>

          <div className="relative z-10 mx-auto grid w-full max-w-7xl content-center bottom-[35px] gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-3">
              <h1 className="z-[3] text-[32px] font-semibold uppercase leading-[30px] tracking-[-0.05em] text-white md:text-[64px] md:leading-[58px] md:tracking-[-0.03em]">
                ABOUT
                <br />
                ME
              </h1>
            </div>

            <div className="md:col-span-6 md:col-start-7">
              <h2 className="mb-8 max-w-2xl text-xl font-medium leading-snug tracking-[-0.03em] text-white/90 md:text-3xl lg:text-[35px] break-keep">
                데이터와 핵심가치를 기반으로 <br/> 서비스의 방향과 가능성을 설계합니다
              </h2>

              <div className="max-w-2xl space-y-5 text-sm leading-relaxed text-white/66 md:text-base lg:text-[19px] break-keep">
                {aboutParagraphs.map((paragraph) => (
                  <p key={paragraph} className="whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

          </div>
          <div className="absolute bottom-[10px] left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center justify-center md:flex">
            <span className="mb-3 text-xs uppercase tracking-[0.24em] text-white/70">
              Scroll
            </span>
            <div className="flex h-10 items-start justify-center overflow-hidden">
              <div className="animate-scroll-line w-px bg-white/60" />
            </div>
          </div>
        </section>

        <section
          className="relative h-full min-h-full overflow-hidden bg-black"
          aria-hidden={activeScene === 0 || activeScene > metricGroups.length}
        >
          <div className="flex h-full min-h-full items-center overflow-hidden px-6 py-16 md:px-12">
            <div className="mx-auto w-full max-w-7xl">
              <h2 className="sr-only">Our Metrics</h2>

              <div className="mb-8 md:mb-10">
                <MetricsTabs
                  tabs={metricGroups.map((group) => ({ label: group.tabLabel }))}
                  activeIndex={activeIndex}
                  onChange={handleMetricTabChange}
                />
              </div>

              <div className="relative mx-auto min-h-[570px] md:min-h-[690px]">
                {metricGroups.map((group, index) => (
                  <MetricCard
                    key={group.tabLabel}
                    title={group.title}
                    eyebrow={group.eyebrow}
                    videoSrc={group.videoSrc}
                    items={group.items}
                    index={index}
                    scrollStage={activeIndex}
                  />
                ))}
              </div>

            </div>
          </div>
        </section>

        <section
          className="relative flex h-full min-h-full items-center overflow-hidden bg-black px-6 pb-16 pt-32 md:px-12 md:pb-24 md:pt-40"
          aria-hidden={activeScene < coreScene || activeScene > coreEndScene}
        >
          <div className="pointer-events-none absolute inset-0">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src="/screen/bg-5.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.75),rgba(0,0,0,0.40)_46%,rgba(0,0,0,0.70)),radial-gradient(circle_at_78%_42%,rgba(120,140,255,0.14),transparent_26%),linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0.72))]" />
          </div>

          <div className="relative z-10 mx-auto grid h-full w-full max-w-7xl content-center gap-20 xl:grid-cols-[335px_minmax(0,1fr)] xl:items-center xl:gap-10 2xl:max-w-[1280px] 2xl:grid-cols-[423px_minmax(0,1fr)] 2xl:gap-14">
          <div className="xl:flex xl:min-h-[525px] xl:flex-col xl:justify-center xl:border-r xl:border-white/18 xl:pr-10 2xl:min-h-[620px] 2xl:pr-12">
            <h2 className="mb-10 text-[32px] font-semibold uppercase leading-tight tracking-tight md:text-[52px] xl:mb-16">
              CORE
              <br />
              CAPABILITY
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 xl:flex xl:flex-col xl:gap-6">
                {capabilities.map((capability, index) => (
                  <button
                    key={capability.title}
                    onClick={() => moveToScene(coreScene + index)}
                    className={`group flex items-center gap-6 text-left transition-all ${
                      index === displayedCapabilityIndex ? "text-white" : "text-white/40 hover:text-white/70"
                    }`}
                  >
                    <span className="w-8 shrink-0 text-base font-normal md:text-xl xl:text-xl 2xl:text-2xl xl:w-10">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="relative text-lg font-medium uppercase xl:text-2xl">
                      {capability.title}
                      <span className={`absolute -bottom-1 left-0 h-px bg-white transition-all duration-500 ${index === displayedCapabilityIndex ? "w-full" : "w-0 group-hover:w-full"}`} />
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="xl:flex xl:items-stretch ">
              <article
                className={`grid w-full gap-8 duration-300 xl:max-w-none xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] xl:items-stretch xl:gap-10 2xl:gap-14 transition-all ease-out ${
                  isCapabilityExiting
                    ? "opacity-0 translate-y-3"
                    : "opacity-100 translate-y-0"
                }`}
              >
                <div className="relative z-10 flex flex-col items-start gap-5 xl:justify-between xl:gap-8 xl:border-r xl:border-white/18 xl:pr-10 2xl:pr-14">
                  <strong className="flex items-center gap-3 text-[32px] font-semibold uppercase leading-[30px] tracking-[-0.05em] text-white md:text-[48px] md:leading-[52px] md:tracking-[-1.44px] xl:flex-col xl:items-start xl:gap-5 xl:text-[52px] xl:leading-[60px] 2xl:text-[56px] 2xl:leading-[72px]">
                    <span className="text-[32px] font-semibold uppercase leading-[30px] tracking-[-0.05em] text-white md:text-[48px] md:leading-[52px] md:tracking-[-1.44px] xl:text-[92px] xl:leading-none xl:text-white/10 2xl:text-[96px]">
                      {String(displayedCapabilityIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="whitespace-pre-wrap">
                      {activeCapability.title}
                    </span>
                  </strong>


                  <p className="max-w-[451px] text-sm leading-relaxed break-keep text-white/68 md:text-md md:leading-[26px] xl:max-w-[520px] xl:text-lg xl:leading-8">
                    {activeCapability.summary}
                  </p>
                </div>

                <div className="flex flex-col justify-start xl:max-w-none xl:justify-center">
                  <ul className="flex flex-col gap-6 xl:gap-8 2xl:gap-10">
                    {activeCapability.details.map((detail) => (
                      <li
                        key={detail.title}
                        className="flex flex-col gap-2 border-t border-white/50 pt-3 xl:border-white/22 xl:pt-5"
                      >
                        <strong className="block text-sm font-medium tracking-normal text-white md:text-base xl:text-lg 2xl:text-xl">
                          {detail.title}
                        </strong>
                        <span className="block text-sm leading-[22px] text-white/64 break-keep md:text-base xl:leading-7">
                          {detail.description}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section
          className="relative flex h-full min-h-full items-center justify-center overflow-hidden bg-black px-6 py-24 text-center md:px-12 md:py-28"
          aria-hidden={activeScene !== projectsScene}
        >
          <div className="pointer-events-none absolute inset-0">
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src="/screen/bg-2.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
            <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/[0.035] shadow-[0_0_120px_rgba(120,140,255,0.22)] blur-[1px] md:h-[720px] md:w-[720px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.08),transparent_32%),linear-gradient(90deg,rgba(0,0,0,0.86),rgba(0,0,0,0.34)_50%,rgba(0,0,0,0.86)),linear-gradient(180deg,rgba(0,0,0,0.28),#000)]" />
          </div>

          <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center">
            <h2 className="max-w-5xl text-[46px] font-semibold uppercase leading-[1.2] tracking-[-0.06em] text-white md:text-[68px] lg:text-[86px]">
              커리어의 흐름이
              <br />
              궁금하다면?
            </h2>
            <p className="my-10 max-w-2xl text-base font-medium leading-relaxed text-white/72 break-keep md:text-xl">
              어떤 선택을 했고, 무엇을 만들었는지.<br/>중요한 이정표를 HISTORY에서 한눈에 확인해보세요.
            </p>
            <div
              ref={ctaRef}
              className={`transition-all duration-[1200ms] delay-[1100ms] ${
                isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
              style={{
                transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
              }}
            >
              <Link
                href="/about/history"
                className="group inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-3 transition-all hover:border-white/40 hover:bg-white/5"
              >
                <span className="text-sm font-medium">View More</span>
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
        </section>
      </main>
    </div>
  );
}

export default MetricsSection;