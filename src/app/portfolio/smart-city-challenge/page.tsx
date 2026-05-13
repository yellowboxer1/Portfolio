import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import Header from "@/src/components/Header";
import ProjectIntroSection from "@/src/components/ProjectIntroSection";
import { SmartCitySlide } from "./SmartCitySlide";
import { smartCityGridSlides } from "./grid-slides";
import styles from "./smart-city-challenge.module.css";

export const metadata: Metadata = {
  title: "Smart City Challenge | Portfolio",
  description:
    "부산 도시철도 배리어프리 실내·외 내비게이션 앱 다가치나란히 서비스 기획 포트폴리오",
};

const smartCityIntro = {
  badge: "B2G",
  title: "2021 스마트시티 챌린지 사업",
  meta: [
    { label: "발주처", value: "국토교통부, 부산교통공사" },
    { label: "프로젝트유형", value: "Service Planning · Smart Mobility" },
    { label: "사업비", value: "29억 5,410만 원 (총 사업비 300억)" },
  ],
  techStack: ["Figma", "Photoshop", "Illustrator", "Service Planning", "IA", "User Flow"],
  features: [
    "교통약자 유형별 튜토리얼",
    "실내·외 통합 길안내",
    "엘리베이터 중심 경로 안내",
    "무장애 키오스크 연계",
    "장애물 지도 및 팝업 안내",
    "실내 비콘 기반 위치 안내",
    "수어 플레이어",
    "주변 교통·역내시설 정보 제공",
  ],
  overview:
    "2021 스마트시티 챌린지 사업의 최종 목적은 교통약자가 끊김 없이 이동할 수 있는 배리어프리 교통환경을 구현하는 것이었습니다. 버스는 배리어프리 스테이션으로 연결하고, 이후 두리발과 같은 장애인 보조 택시로 연계하며, 지하철 구간은 내비게이션으로 이어지는 구조였습니다. 저는 이 컨소시엄 구조 안에서 지하철 실내·외 이동을 담당하는 배리어프리 내비게이션 서비스 기획을 맡았습니다.",
  narrative: [
    {
      label: "01 Problem",
      title: "배리어프리 이동의 마지막 구간, 지하철 안에서 길이 끊겼습니다",
      body: "전체 사업은 버스, 보조 택시, 지하철을 하나의 배리어프리 교통환경으로 연결하는 것이 목표였습니다. 하지만 지하철 역사 내부로 들어오면 GPS가 제대로 동작하지 않아 사용자의 현재 위치를 잡기 어려웠고, 깊은 역사와 긴 환승·출구 동선 때문에 엘리베이터와 목적지를 찾는 과정이 끊겼습니다. 우리가 해결해야 할 문제는 이 지하철 구간의 실내 길안내 공백이었습니다.",
    },
    {
      label: "02 Strategy",
      title: "비콘 기반 실내 위치 인식으로 지하철 구간을 연결했습니다",
      body: "지하철 구간에서는 GPS를 대신할 위치 기준점이 필요했습니다. 그래서 역사 천장에 BLE 비콘을 설치하고, 여러 비콘의 신호 세기를 기반으로 상대 거리와 현재 위치를 추정하는 방식을 검토했습니다. 다만 역사마다 층고, 벽체, 기둥, 철제 구조물 등 매질 특성이 달라 신호가 튀었기 때문에, 설치 위치와 간격을 조정하고 현장에서 신호 세기와 도달 범위를 반복 테스트하며 길안내에 쓸 수 있는 기준점을 잡았습니다.",
    },
    {
      label: "03 Result",
      title: "지하철까지 이어지는 배리어프리 내비게이션 흐름을 만들었습니다",
      body: "현장 신호 검증으로 실내 위치 인식 기준을 만들고, 그 위에 현재 위치 확인, 목적지 검색, 엘리베이터 중심 경로, 출구·편의시설 안내, 장애물 팝업, 수어 튜토리얼을 연결했습니다. 이를 통해 버스와 보조 택시 연계 이후 지하철 안에서도 이동이 이어질 수 있는 배리어프리 내비게이션 흐름을 구체화했습니다.",
    },
  ],
};

export default function SmartCityChallengePage() {
  return (
    <main className={styles.page}>
      <Header aboutHref="/#about" />

      <Link
        href="/#selected-works"
        className={styles.backButton}
        aria-label="Back to selected works"
      >
        <svg
          className={styles.backIcon}
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M13 8H3.5M7.5 4L3.5 8L7.5 12"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Back</span>
      </Link>

      <article
        className={styles.deck}
        aria-label="다가치나란히 실내 내비게이션 앱 포트폴리오"
      >
        {smartCityGridSlides.map((slide, index) => (
          <Fragment key={`${slide.type}-${index}`}>
            <SmartCitySlide slide={slide} index={index} />
            {index === 0 && <ProjectIntroSection {...smartCityIntro} />}
          </Fragment>
        ))}
      </article>
    </main>
  );
}
