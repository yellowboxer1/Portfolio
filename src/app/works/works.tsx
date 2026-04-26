"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/src/components/Header";

type FilterKey = "ALL" | "R&D" | "B2G" | "B2B" | "개인 프로젝트";

type PortfolioItem = {
  id: number;
  slug: string;
  title: string;
  image: string;
  category: string;
  role: string;
  meta: string;
  filter: FilterKey;
  isReady?: boolean;
};

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    slug: "partnerit",
    title: "AI 기반 지원사업 매칭 서비스 파트너잇",
    image: "/partnerit.png",
    category: "AI B2B SaaS",
    role: "PM · Service Planner",
    meta: "2026.04ㅣ누적 투자 10억 원",
    filter: "B2B",
    isReady: false,
  },
  {
    id: 2,
    slug: "gachigagae",
    title: "AI 기반 시각장애인 보행보조 서비스 가치가개",
    image: "/gati1.png",
    category: "AI Mobility",
    role: "Founder · Lead Planner",
    meta: "2026.01ㅣ2천만 원",
    filter: "개인 프로젝트",
    isReady: false,
  },
  {
    id: 3,
    slug: "zigzag-reverse",
    title: "커머스 플랫폼 지그재그(ZigZag) 서비스 리뉴얼",
    image: "/zigzag.png",
    category: "Product Strategy",
    role: "UX Strategy · Analysis",
    meta: "2025.04",
    filter: "개인 프로젝트",
    isReady: true,
  },
  {
    id: 4,
    slug: "smart-village",
    title: "2023 스마트 빌리지 지원사업",
    image: "/bell1.png",
    category: "R&D Strategy",
    role: "PM",
    meta: "2023.10ㅣ15억 원",
    filter: "R&D",
    isReady: false,
  },
  {
    id: 5,
    slug: "rnd-commercialization",
    title: "공공조달 연계 실증·사업화 R&D 지원 사업",
    image: "/msit1.png",
    category: "R&D Strategy",
    role: "PM",
    meta: "2023.09ㅣ9억 6천만 원",
    filter: "R&D",
    isReady: false,
  },
  {
    id: 6,
    slug: "smart-city-challenge",
    title: "2021 스마트시티 챌린지 사업",
    image: "/sc11.png",
    category: "Smart Mobility",
    role: "Service Planner",
    meta: "2023.07ㅣ29억 5,410만 원(총 사업비:300억)",
    filter: "B2G",
    isReady: false,
  },
  {
    id: 7,
    slug: "la-premiere",
    title: "프리미어리그 승부 예측 서비스 앱 La Premiere",
    image: "/la1.png",
    category: "Service App",
    role: "Service Planner",
    meta: "2024.03",
    filter: "개인 프로젝트",
    isReady: false,
  },
  {
    id: 8,
    slug: "public-regional-planning",
    title: "국책 과제 수행 및 지역 개발·도시 재생 프로젝트",
    image: "https://ext.same-assets.com/334974529/2583647890.jpeg",
    category: "Regional Strategy",
    role: "Strategy Planner",
    meta: "2022.01ㅣ4억 2천만 원(총 사업비 172억)",
    filter: "B2G",
    isReady: false,
  },
];

const FILTERS: FilterKey[] = ["ALL", "R&D", "B2G", "B2B", "개인 프로젝트"];
const PAGE_SIZE = 6;

const filterColor: Record<FilterKey, string> = {
  ALL:          "",
  "R&D":        "border-emerald-400/40 text-emerald-300",
  B2G:          "border-blue-400/40 text-blue-300",
  B2B:          "border-violet-400/40 text-violet-300",
  "개인 프로젝트": "border-amber-400/40 text-amber-300",
};
 
function FilterBadge({ filter }: { filter: FilterKey }) {
  return (
    <span className={`inline-flex w-fit items-center rounded-md border bg-white/[0.04] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] ${filterColor[filter]}`}>
      {filter}
    </span>
  );
}

function WorkCard({ item, offsetDown }: { item: PortfolioItem; offsetDown: boolean }) {
  const tags = item.role.split("·").map((t) => t.trim()).filter(Boolean);

  const inner = (
    <div className="group flex flex-col gap-4">
      <div className="relative overflow-hidden rounded-[40px] bg-black/[0.04]" style={{ aspectRatio: "1/0.8" }}>
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 580px"
        />
        {!item.isReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
            <span className="rounded-full border border-white/20 px-4 py-1.5 text-sm font-medium text-white/55">
              준비 중
            </span>
          </div>
        )}
      </div>

      {/* 카드 정보 */}
      <div className="flex flex-col gap-2.5 px-0.5">
        <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1">
          <FilterBadge filter={item.filter} />
          <p className="text-[14px] lg:text-[16px] xl:text-[17px] text-white/70">
            {tags.map((tag, i) => (
              <span key={tag}>
                {i > 0 && <span className="mx-2 text-white/70">·</span>}
                {tag}
              </span>
           ))}
          </p>
        </div>

        {/* 타이틀 */}
        <h3 className="break-keep text-[20px] font-semibold leading-snug tracking-[-0.03em] text-white md:text-[21px] lg:text-[22px] xl:text-[24px]">
          {item.title}
        </h3>

        {/* 메타 */}
        <p className="text-[14px] md:text-[15px] lg:text-[16px] text-white/80">{item.meta}</p>
      </div>
    </div>
  );

  const offset = offsetDown ? "md:translate-y-[60px]" : "";

  if (!item.isReady) {
    return <div className={`cursor-default ${offset}`}>{inner}</div>;
  }

  return (
    <Link href={`/portfolio/${item.slug}`} className={`block ${offset}`}>
      {inner}
    </Link>
  );
}

export default function WorksPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("ALL");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered =
    activeFilter === "ALL"
      ? portfolioItems
      : portfolioItems.filter((w) => w.filter === activeFilter);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleFilter = (f: FilterKey) => {
    setActiveFilter(f);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <main className="relative min-h-screen bg-transparent px-6 pb-32 pt-[160px] text-white md:px-[5%] md:pt-[200px]">
      <Header />

      <Link
        href="/#selected-works"
        className="group fixed left-6 top-[72px] z-[60] inline-flex h-[42px] min-w-[42px] items-center justify-center rounded-full border border-white/15 bg-black/55 px-[13px] text-sm font-medium tracking-[0.04em] text-white/88 shadow-[0_14px_32px_rgba(0,0,0,0.28)] backdrop-blur-md transition-[border-color,background-color,box-shadow,color,transform] duration-300 hover:-translate-x-[2px] hover:border-white/28 hover:bg-black/78 hover:text-white md:left-12 md:top-[72px]"
      >
        <span aria-hidden="true" className="inline-flex h-4 w-4 flex-none items-center justify-center text-white">
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

      {/* 배경 레이어: 음수 z-index 없이(=사라짐 방지) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="portfolio-bg-wrap">
          <div className="portfolio-bg-image" />
          <div className="portfolio-bg-glow" />
          <div className="portfolio-bg-vignette" />
        </div>
      </div>

      <div className="relative z-10 mx-auto" style={{ maxWidth: "1840px" }}>

        {/* 헤더 */}
        <div className="relative mb-[60px] flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>

            <span className="mb-4 block text-sm uppercase tracking-widest text-white/50">
              Portfolio
            </span>
            <h2 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
              Selected Works
            </h2>
          </div>


          <div className="flex flex-wrap gap-[5px]">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => handleFilter(f)}
                className={`h-[42px] rounded-full border px-5 text-[15px] font-medium tracking-wide transition-colors duration-200 ${
                  activeFilter === f
                    ? "border-white bg-white text-black"
                    : "border-white/25 bg-transparent text-white/55 hover:border-white/50 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-3 lg:gap-x-10 xl:gap-x-[60px] md:gap-y-[60px]">
          {visible.map((item, i) => (
            <WorkCard
              key={item.id}
              item={item}
              offsetDown={i % 3 === 1}
            />
          ))}
        </div>

        {/* 더보기 — More 텍스트 + 바운스 chevron */}
        {hasMore && (
          <div className="mt-24 flex justify-center">
            <button
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              className="group flex flex-col items-center gap-3 opacity-40 transition-opacity hover:opacity-100"
            >
              <span className="text-xs uppercase tracking-[0.2em] text-white">
                More
              </span>
              <svg
                className="h-8 w-8 animate-bounce text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </main>
  );
}