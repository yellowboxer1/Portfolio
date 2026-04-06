"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type PortfolioItem = {
  id: number;
  slug: string;
  title: string;
  image: string;
  category: string;
  role: string;
  meta: string;
  summary: string;
};

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    slug: "partnerit",
    title: "[B2B] AI 기반 정부지원사업 매칭 서비스 및 기업 전주기 관리 통합 솔루션 파트너잇",
    image: "/partnerit.png",
    category: "AI B2B SaaS",
    role: "PM · Service Planner",
    meta: "2026.04ㅣ누적 투자 10억 원",
    summary: "가중 적합도 알고리즘 기반 매칭 엔진 총괄 및 특허 출원, 디딤돌 R&D 및 청년창업사관학교 수주",
  },
  {
    id: 2,
    slug: "gachigagae",
    title: "[B2C] AI 및 빅데이터 기반 시각장애인 보행보조 서비스 가치가개",
    image: "/gati.png",
    category: "AI Mobility",
    role: "Founder · Lead Planner",
    meta: "2026.01ㅣ2천만 원",
    summary: "YOLOv8 실시간 객체 인식 및 Voice-All-In-One 기능 개발 총괄, 부산 공공빅데이터 활용 창업경진대회 우수상",
  },
  {
    id: 3,
    slug: "zigzag-reverse",
    title: "[개인 프로젝트] 커머스 플랫폼 지그재그(ZigZag) 서비스 리뉴얼 및 역기획",
    image: "/zigzag.png",
    category: "Product Strategy",
    role: "UX Strategy · Analysis",
    meta: "2025.04",
    summary: "커머스 플랫폼 인터페이스 구조 분석 및 사용자 경험 최적화를 위한 시스템 역기획 수행",
  },
  {
    id: 4,
    slug: "smart-village",
    title: "[과기부] 2023 스마트 빌리지 지원사업",
    image: "bell.png",
    category: "R&D Strategy",
    meta: "2023.10ㅣ15억 원",
    role: "PM",
    summary: "빅데이터 기반 1인가구 돌봄 서비스 기획 및 운영, 스마트빌리지 보급 및 확산 사업 우수사례 선정 '장관상 수상",
  },
  {
    id: 5,
    slug: "rnd-commercialization",
    title: "[과기부] 공공조달 연계 실증·사업화 R&D 지원 사업",
    image: "/msit.png",
    category: "R&D Strategy",
    role: "PM",
    meta: "2023.09ㅣ9억 6천만 원",
    summary: "홀몸 노인 라이프로그 ADL 추출 및 행동 분석 기획, 특허 출원 등 R&D 과제 전주기 운영 관리, 과기부 우수과제 선정",
  },
  {
    id: 6,
    slug: "smart-city-challenge",
    title: "[국토부] 2021 스마트시티 챌린지 사업",
    image: "/sc.png",
    category: "Smart Mobility",
    role: "Service Planner",
    meta: "2023.07ㅣ29억 5,410만 원(총 사업비:300억)",
    summary: "부산 도시철도 내 교통약자 배리어 프리 실내 내비게이션 구축 실무 및 교통약자 데이터 분석",
  },
  {
    id: 7,
    slug: "la-premiere",
    title: "[개인 프로젝트] 프리미어리그 승부 예측 서비스 앱 La Premiere",
    image: "la.png",
    category: "Service App",
    role: "Service Planner",
    meta: "2024.03",
    summary: "스포츠 빅데이터를 활용한 승부 예측 로직 설계 및 사용자 서비스 인터페이스 기획",
  },
  {
    id: 8,
    slug: "public-regional-planning",
    title: "[기타 프로젝트] 국책 과제 수행 및 지역 개발·도시 재생 프로젝트",
    image: "https://ext.same-assets.com/334974529/2583647890.jpeg",
    category: "Regional Strategy",
    role: "Strategy Planner",
    meta: "2022.01ㅣ4억 2천만 원(총 사업비 172억)",
    summary: "지역 자산 및 민간조직을 활용한 지역 특화 산업 고도화 및 발전 전략 수립 총괄",
  }
];

type SpiralConfig = {
  radius: number;
  itemShift: number;
  sliceCount: number;
  scale: number;
  baseZ: number;
  itemLeftOffset: number;
  containerMinHeight: number;
  topOffset: number;
};

function getSpiralConfig(width: number): SpiralConfig {
  if (width <= 768) {
    return {
      radius: 620,
      itemShift: 24,
      sliceCount: 12,
      scale: 0.96,
      baseZ: -340,
      itemLeftOffset: -96,
      containerMinHeight: 920,
      topOffset: 86,
    };
  }
  if (width <= 1024) {
    return {
      radius: 640,
      itemShift: 50,
      sliceCount: 11,
      scale: 0.94,
      baseZ: -350,
      itemLeftOffset: -128,
      containerMinHeight: 700,
      topOffset: 60,
    };
  }
  return {
    radius: 800,
    itemShift: 80,
    sliceCount: 10,
    scale: 0.92,
    baseZ: -420,
    itemLeftOffset: -200,
    containerMinHeight: 860,
    topOffset: 150,
  };
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function MobileCarousel() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalCount = portfolioItems.length;

  const scrollByCard = useCallback((direction: "prev" | "next") => {
    const el = scrollerRef.current;
    if (!el) return;

    const cardWidth = el.clientWidth * 0.86 + 16; // min-w-[86%] + gap-4
    const nextIndex =
      direction === "next"
        ? Math.min(currentIndex + 1, totalCount - 1)
        : Math.max(currentIndex - 1, 0);

    el.scrollTo({
      left: nextIndex * cardWidth,
      behavior: "smooth",
    });

    setCurrentIndex(nextIndex);
  }, [currentIndex, totalCount]);

  const handleScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const cardWidth = el.clientWidth * 0.86 + 16;
    const index = Math.round(el.scrollLeft / cardWidth);
    const safeIndex = Math.max(0, Math.min(index, totalCount - 1));

    if (safeIndex !== currentIndex) {
      setCurrentIndex(safeIndex);
    }
  }, [currentIndex, totalCount]);

  return (
    <div className="relative -mx-6 px-6 pb-24 md:hidden">
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Portfolio mobile carousel"
      >
        {portfolioItems.map((item) => (
          <Link
            key={item.id}
            href={`/portfolio/${item.slug}`}
            className="group relative min-w-[86%] snap-center overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04]"
          >
            <div
              className="relative aspect-[4/5.6] bg-cover bg-center"
              style={{ backgroundImage: `url('${item.image}')` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/5" />

              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="text-[11px] uppercase tracking-[0.22em] text-white/60">
                  {item.category}
                </span>

                <h3 className="mt-2 text-[20px] font-semibold leading-[1.35] text-white">
                  {item.title}
                </h3>

                <div className="mt-3 flex flex-col gap-1">
                  <p className="text-sm text-white/78">{item.role}</p>
                  <p className="text-sm text-white/58">{item.meta}</p>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {item.summary}
                </p>

                <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white">
                  <span>Selected Works</span>
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {currentIndex > 0 && (
        <button
          type="button"
          aria-label="Previous portfolio"
          onClick={() => scrollByCard("prev")}
          className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-md transition active:scale-[0.96]"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      {currentIndex < totalCount - 1 && (
        <button
          type="button"
          aria-label="Next portfolio"
          onClick={() => scrollByCard("next")}
          className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-md transition active:scale-[0.96]"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

const SpiralContent = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const resizeTimerRef = useRef<number | null>(null);
  const dragRef = useRef({
    isDragging: false,
    startX: 0,
    lastX: 0,
    moved: false,
  });
  const motionRef = useRef({
    currentAngle: 200,
    velocity: 0,
    isVisible: false,
    introPlayed: false,
    autoRotateEnabled: false,
    hoveredIndex: null as number | null,
  });

  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );

  const [config, setConfig] = useState<SpiralConfig>(() =>
    getSpiralConfig(typeof window !== "undefined" ? window.innerWidth : 1440)
  );

  const isMobile = viewportWidth <= 640;
  const duplicatedItems = useMemo(() => [...portfolioItems, ...portfolioItems], []);
  const angleUnit = 360 / config.sliceCount;

  const containerHeight = useMemo(() => {
    return Math.max(
      duplicatedItems.length * config.itemShift + 720 + config.topOffset,
      config.containerMinHeight
    );
  }, [duplicatedItems.length, config.itemShift, config.containerMinHeight, config.topOffset]);

  const applyGalleryTransform = useCallback(() => {
    const gallery = galleryRef.current;
    if (!gallery || isMobile) return;

    gallery.style.transform = `translateZ(${config.baseZ}px) translateY(${config.topOffset}px) rotateY(${motionRef.current.currentAngle}deg) scale(${config.scale})`;
  }, [config.baseZ, config.topOffset, config.scale, isMobile]);

  const stopDragging = useCallback(() => {
    dragRef.current.isDragging = false;
    dragRef.current.startX = 0;
    dragRef.current.lastX = 0;
  }, []);

  const startLoop = useCallback(() => {
    if (isMobile) return;

    const tick = () => {
      const motion = motionRef.current;
      const drag = dragRef.current;
      const isFrontHovered = motion.hoveredIndex !== null;

      if (!drag.isDragging) {
        if (Math.abs(motion.velocity) > 0.003) {
          motion.currentAngle += motion.velocity;
          motion.velocity *= 0.95;
        } else if (motion.autoRotateEnabled && motion.isVisible) {
          motion.currentAngle -= isFrontHovered ? 0.008 : 0.024;
        }
      }

      applyGalleryTransform();
      frameRef.current = requestAnimationFrame(tick);
    };

    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(tick);
  }, [applyGalleryTransform, isMobile]);

  const playIntroAnimation = useCallback(() => {
    if (isMobile || motionRef.current.introPlayed) return;

    motionRef.current.introPlayed = true;
    const startAngle = 200;
    const endAngle = -34;
    const duration = 1800;
    const startTime = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = easeOutCubic(progress);

      motionRef.current.currentAngle = startAngle + (endAngle - startAngle) * eased;
      applyGalleryTransform();

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        motionRef.current.autoRotateEnabled = true;
        startLoop();
      }
    };

    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(animate);
  }, [applyGalleryTransform, startLoop, isMobile]);

  const handlePointerDown = useCallback(
    (clientX: number) => {
      if (isMobile) return;

      dragRef.current.isDragging = true;
      dragRef.current.startX = clientX;
      dragRef.current.lastX = clientX;
      dragRef.current.moved = false;
      motionRef.current.hoveredIndex = null;
    },
    [isMobile]
  );

  const handlePointerMove = useCallback(
    (clientX: number) => {
      if (isMobile || !dragRef.current.isDragging) return;

      const deltaX = clientX - dragRef.current.lastX;
      const deltaAngle = deltaX * 0.42;

      if (Math.abs(clientX - dragRef.current.startX) > 6) {
        dragRef.current.moved = true;
      }

      motionRef.current.currentAngle += deltaAngle;
      motionRef.current.velocity = deltaAngle * 0.28;
      dragRef.current.lastX = clientX;

      applyGalleryTransform();
    },
    [applyGalleryTransform, isMobile]
  );

  useEffect(() => {
    const handleResize = () => {
      if (resizeTimerRef.current) window.clearTimeout(resizeTimerRef.current);

      resizeTimerRef.current = window.setTimeout(() => {
        const width = window.innerWidth;
        setViewportWidth(width);
        setConfig(getSpiralConfig(width));
      }, 160);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        motionRef.current.isVisible = entry.isIntersecting;

        if (entry.isIntersecting && !motionRef.current.introPlayed && !isMobile) {
          playIntroAnimation();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [playIntroAnimation, isMobile]);

  useEffect(() => {
    if (isMobile) {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      return;
    }

    applyGalleryTransform();

    if (motionRef.current.introPlayed) {
      startLoop();
    }

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [applyGalleryTransform, startLoop, isMobile]);

  useEffect(() => {
    if (isMobile) return;

    const onMouseMove = (e: MouseEvent) => handlePointerMove(e.clientX);
    const onMouseUp = () => stopDragging();
    const onTouchMove = (e: TouchEvent) => {
      if (!dragRef.current.isDragging) return;
      handlePointerMove(e.touches[0].clientX);
    };
    const onTouchEnd = () => stopDragging();
    const onTouchCancel = () => stopDragging();
    const onWindowBlur = () => stopDragging();
    const onMouseLeaveWindow = () => stopDragging();

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchcancel", onTouchCancel);
    window.addEventListener("blur", onWindowBlur);
    document.addEventListener("mouseleave", onMouseLeaveWindow);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchCancel);
      window.removeEventListener("blur", onWindowBlur);
      document.removeEventListener("mouseleave", onMouseLeaveWindow);
    };
  }, [handlePointerMove, stopDragging, isMobile]);

  if (isMobile) {
    return <MobileCarousel />;
  }

  return (
    <div
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      className="container spiral-gallery-container hidden md:block"
      style={{ height: `${containerHeight}px` }}
      onMouseDown={(e) => handlePointerDown(e.clientX)}
      onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
      onTouchEnd={stopDragging}
    >
      <div ref={galleryRef} className="spiral-gallery">
        {duplicatedItems.map((item, index) => {
          const itemAngle = angleUnit * (index % config.sliceCount);
          const itemAngleRad = (itemAngle * Math.PI) / 180;
          const x = Math.sin(itemAngleRad) * config.radius;
          const z = Math.cos(itemAngleRad) * config.radius;
          const y = index * config.itemShift;

          return (
            <div
              key={`${item.id}-${index}`}
              className="spiral-gallery-item"
              style={{
                left: `${config.itemLeftOffset}px`,
                transform: `translateX(${x}px) translateZ(${z}px) translateY(${y}px)`,
                zIndex: Math.round(z + 1000),
              } as CSSProperties}
            >
              <div
                className="spiral-gallery-card"
                style={{ transform: `rotateY(${itemAngle}deg)` }}
              >
                <div
                  className="spiral-gallery-front"
                  style={{
                    backgroundImage: `url('${item.image}')`,
                  }}
                  onMouseEnter={() => {
                    motionRef.current.hoveredIndex = index;
                  }}
                  onMouseLeave={() => {
                    if (motionRef.current.hoveredIndex === index) {
                      motionRef.current.hoveredIndex = null;
                    }
                  }}
                >
                  <Link
                    href={`/portfolio/${item.slug}`}
                    className="gallery-link"
                    onClick={(e) => {
                      if (dragRef.current.moved) e.preventDefault();
                    }}
                  >
                    <div className="spiral-gallery-item-txt">
                      <span className="spiral-gallery-category">{item.category}</span>
                      <h3>{item.title}</h3>

                      <div className="spiral-gallery-info">
                        <p className="spiral-gallery-role">{item.role}</p>
                        <p className="spiral-gallery-meta">{item.meta}</p>
                      </div>

                      <p className="spiral-gallery-summary">{item.summary}</p>
                    </div>

                    <div className="spiral-gallery-cta">
                      <span>Selected Works</span>
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </Link>
                </div>

                <div className="spiral-gallery-back" aria-hidden="true">
                  <div className="back-content" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const DynamicSpiral = dynamic(() => Promise.resolve(SpiralContent), {
  ssr: false,
  loading: () => <div className="min-h-[920px] bg-black md:min-h-[1240px]" />,
});

export default function Portfolio() {
  return (
      <section className="relative overflow-hidden bg-black px-6 pt-24 pb-24 md:px-12 md:pt-32 md:pb-0">      <div className="mx-auto mb-16 flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <span className="mb-4 block text-sm uppercase tracking-widest text-white/50">
            Portfolio
          </span>
          <h2 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
            Selected Works
          </h2>
        </div>

        <Link
          href="/works"
          className="group inline-flex w-fit items-center gap-3 rounded-full border border-white/20 px-6 py-3 transition-all hover:border-white/40 hover:bg-white/5"
        >
          <span className="text-sm font-medium text-white">View More</span>
          <svg
            className="h-5 w-5 transition-transform group-hover:translate-x-1"
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

      <DynamicSpiral />
    </section>
  );
}