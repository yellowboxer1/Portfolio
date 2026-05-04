import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/src/components/Header";
import styles from "./smart-city-challenge.module.css";

export const metadata: Metadata = {
  title: "Smart City Challenge | Portfolio",
  description:
    "부산 도시철도 배리어프리 실내·외 내비게이션 앱 다가치나란히 서비스 기획 포트폴리오",
};

type TextBlock = {
  title: string;
  body: string;
  note?: string;
};

type Slide = {
  page: number;
  background?: string;
  elements?: Array<{
    image: string;
    className: string;
  }>;
  variant: "cover" | "overview" | "feature";
  eyebrow?: string;
  title?: string;
  description?: string;
  blocks?: TextBlock[];
};

const assetPath = (type: "bg" | "em", index: number) =>
  `/portfolio/smart-city-challenge/${type}-${index}.png`;

const fallbackPage = (page: number) =>
  `/portfolio/smart-city-challenge/page-${String(page).padStart(2, "0")}.png`;

const slides: Slide[] = [
  {
    page: 2,
    elements: [
      { image: assetPath("em", 1), className: styles.coverLogo },
      { image: assetPath("em", 2), className: styles.coverObstacle },
      { image: assetPath("em", 3), className: styles.coverTutorial },
      { image: assetPath("em", 4), className: styles.coverRoute },
    ],
    variant: "cover",
    eyebrow: "프로젝트1",
    title: "다가치나란히\n실내 내비게이션 앱",
    description:
      "부산시 도시철도를 중심으로 실내·외 길안내 내비게이션 서비스를 제공하며, 교통약자뿐만 아니라 비교통약자까지 모두를 배려한 배리어프리 플랫폼 입니다.",
  },
  {
    page: 3,
    background: assetPath("bg", 1),
    elements: [{ image: assetPath("em", 6), className: styles.brandLogo }],
    variant: "overview",
    eyebrow: "개요",
    title: "배리어프리 내비게이션 앱",
    blocks: [
      {
        title: "서비스 대상 확대",
        body: "예비사업 당시 한정적인 의미에서의 교통약자를 대상으로 서비스를 제공하였으나, 본사업에서는 외국인, 고령자로 교통약자의 범위를 넓혔고 교통약자뿐만 아니라 비교통약자까지 모두 포괄한 범용적인 서비스 개발",
      },
      {
        title: "서비스 지역 확대",
        body: "기존에 부산역을 대상으로 제공하던 서비스는 1차년도(2021년)에 부산 도시철도 1호선으로, 2차년도(2022년)에는 2, 3, 4호선으로 확대함으로써 부산 시민이 직접적으로 체험하고 활용하는 내비게이션 앱 개발",
      },
      {
        title: "서비스 영역 확대",
        body: "한정된 실내 목적지에 방문이 많은 실외 목적지를 추가하여 실외까지의 상세 경로를 안내하여 실내로만 제한되어 있던 서비스 영역을 확장하고 이를 통해 이용자의 앱 이탈 방지 및 고도화된 기능 제공",
      },
    ],
  },
  {
    page: 4,
    background: fallbackPage(4),
    elements: [{ image: assetPath("em", 5), className: styles.signGuide }],
    variant: "feature",
    eyebrow: "Preview",
    title: "주요기능 - 메인",
    description: "이용자 모두가 편리한\n배리어프리 APP",
    blocks: [
      {
        title: "수어 안내 · 편의시설 · 상단메뉴",
        body: "교통약자를 배려한 내비게이션 앱으로 사용자가 직접 선택한 유형에 따라 서비스 이용 튜토리얼을 보여주며, 3D 메인 페이지에서 편의시설 확인과 목적지 설정, 주변 교통 정보 파악 기능을 제공합니다.",
      },
    ],
  },
  {
    page: 5,
    background: fallbackPage(5),
    variant: "feature",
    eyebrow: "Preview",
    title: "주요기능 - 길안내",
    description: "차별화된 맞춤 서비스\n배리어프리 APP",
    blocks: [
      {
        title: "유형 선택 · 음량 조절 · 장애물 지도",
        body: "사용자가 선택한 유형에 따라 계단·엘리베이터 경로로 실시간 실내·외 내비게이션 서비스를 제공하며, 화면 곳곳에 편리한 서비스 이용을 위한 보조 장치를 마련했습니다.",
      },
    ],
  },
  {
    page: 6,
    background: fallbackPage(6),
    variant: "feature",
    eyebrow: "서비스 내용",
    title: "지하철 내비게이션\n튜토리얼",
    blocks: [
      {
        title: "랜딩페이지",
        body: "애플리케이션 클릭 시 지하철역 모양에서 모티브를 얻은 로고가 중앙에 뜨면서 랜딩페이지 노출",
      },
      {
        title: "이용자 유형 선택",
        body: "튜토리얼 안내 전 이용자 유형에 따른 안내 방법을 선택할 수 있는 팝업창이 노출",
      },
      {
        title: "수어 안내",
        body: "수어 안내 클릭 시, 튜토리얼의 전체 내용을 수어로 안내",
        note: "재생/일시정지가 가능하며, 수어 안내 종료 후 일반 안내 페이지로 전환",
      },
    ],
  },
  {
    page: 7,
    background: fallbackPage(7),
    variant: "feature",
    eyebrow: "서비스 내용",
    title: "지하철 내비게이션\n실내 메인",
    blocks: [
      {
        title: "실내 메인",
        body: "역사 내 설치되어있는 비콘의 신호를 잡아 현 위치를 확인 할 수 있는 3D맵 화면",
      },
      {
        title: "음성검색",
        body: "원하는 목적지의 키워드를 음성으로 검색하여 입력된 텍스트에 따라 일치하는 단어를 필터링하여 목적지 선택",
      },
      {
        title: "목적지 검색",
        body: "목적지를 입력하지 않을 경우 가장 최근 검색한 순으로 히스토리 노출 되고 검색된 목적지마다 개별 삭제 가능",
      },
    ],
  },
  {
    page: 8,
    background: fallbackPage(8),
    variant: "feature",
    eyebrow: "서비스 내용",
    title: "지하철 내비게이션\n실내 길안내",
    blocks: [
      {
        title: "엘리베이터 경로 안내",
        body: "선택된 목적지로 이동하는 경로의 미리보기가 노출되며, 엘리베이터 안내에서 이용자 유형에 맞는 경로 설정으로 길안내 진행",
        note: "유형 선택을 하지 않을 경우 계단 경로 안내",
      },
      {
        title: "상세 유형 선택",
        body: "장애인 선택 시 상세 유형 선택 팝업창에서 유형 선택 후 길안내 시작",
      },
      {
        title: "음량조절",
        body: "입체적인 3D 맵으로 현실감 넘치는 길안내와 서비스 이용 중에도 음성 안내 음량 및 안내 종료 기능을 편리하게 사용 가능",
      },
    ],
  },
  {
    page: 9,
    background: fallbackPage(9),
    variant: "feature",
    eyebrow: "서비스 내용",
    title: "지하철 내비게이션\n발생 이슈",
    blocks: [
      {
        title: "새로운 경로 안내",
        body: "길안내 중 경로 이탈 시, 현 위치와 가까운 비콘 신호를 수신하여 현 위치에서 입력한 목적지까지 경로 재설정 및 안내",
      },
      {
        title: "신호 재탐색",
        body: "길안내 중 신호 수신이 안 될 경우, 안내 메시지 제공과 함께 신호를 탐색하며 수신과 동시에 현재 위치에서 길안내 재실행",
      },
      {
        title: "서비스 불가 안내",
        body: "실내 신호 유실 시, 실내 제공 서비스가 실행되지 않음을 안내",
      },
    ],
  },
  {
    page: 10,
    background: fallbackPage(10),
    variant: "feature",
    eyebrow: "서비스 내용",
    title: "지하철 내비게이션\n하단메뉴",
    blocks: [
      {
        title: "주변",
        body: "역사 반경 500m 이내에 위치한 랜드마크 및 관광지 정보를 노출하여 최종 목적지로 설정하는 바로가기 제공",
      },
      {
        title: "역내시설",
        body: "역사 내 편의시설을 핀으로 표시하여 정보 및 최종 목적지로 설정하는 바로가기 제공",
        note: "역내시설 재 클릭 시 표시되어 있던 핀 사라짐",
      },
      {
        title: "주변교통",
        body: "현 위치 기준의 주변 교통 안내 페이지 제공",
      },
    ],
  },
  {
    page: 11,
    background: fallbackPage(11),
    variant: "feature",
    eyebrow: "서비스 내용",
    title: "지하철 내비게이션\n상단메뉴",
    blocks: [
      {
        title: "상단메뉴",
        body: "검색창의 메뉴 아이콘 클릭으로 사용자를 배려한 설정과 주변 교통정보 등 부가서비스 제공",
      },
      {
        title: "설정",
        body: "교통약자와 외국인을 배려한 주요 기능 탑재로 개인이 원하는 방식으로 내비게이션 설정 가능",
      },
      {
        title: "대피경로",
        body: "역사의 대피경로는 에스컬레이터와 엘리베이터를 제외한 계단 출구를 이용할 수 있도록 역사별 전체 맵 제공",
      },
    ],
  },
  {
    page: 12,
    background: fallbackPage(12),
    variant: "feature",
    eyebrow: "서비스 내용",
    title: "지하철 내비게이션\n실외 길안내",
    blocks: [
      {
        title: "실외 메인",
        body: "3D맵에 GPS신호를 받아 현 위치 표시",
      },
      {
        title: "실외 길안내",
        body: "실외로 이동 후 전환되는 외부 3D 길안내 화면에서 출발지와 도착지가 핀으로 표시되고 GPS신호에 따라 현 위치가 표시되며 움직임에 따라 이동",
        note: "도착지까지 장애물 정보가 마커로 표시됨",
      },
      {
        title: "장애물 안내",
        body: "실외 목적지까지의 경로에 있는 마커 클릭 시 해당 장애물에 대한 정보가 하단 팝업 형태로 표현",
      },
    ],
  },
  {
    page: 13,
    background: fallbackPage(13),
    variant: "feature",
    eyebrow: "서비스 내용",
    title: "지하철 내비게이션\n역 간 이동(환승)",
    blocks: [
      {
        title: "역 간 이동(환승) 상세경로",
        body: "연관된 역사가 전혀 다른 출발지와 목적지 검색 시 역부터 최종 목적지까지의 약도를 제공하며, 상세경로 버튼 클릭 시 상세한 역 간 이동 경로 안내",
      },
      {
        title: "효율적인 도시철도 이용",
        body: "출발역부터 도착역까지 환승 정보, 환승 횟수, 소요 시간을 나타내어 이용자의 효율적인 도시철도 이용을 도모함",
      },
    ],
  },
];

const renderTitle = (title?: string) =>
  title?.split("\n").map((line) => (
    <span key={line}>
      {line}
      <br />
    </span>
  ));

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
        {slides.map((slide) => (
          <section
            key={slide.page}
            className={`${styles.slide} ${styles[slide.variant]}`}
            style={
              {
                "--bg-image": slide.background
                  ? `url("${slide.background}")`
                  : "none",
              } as CSSProperties
            }
            aria-label={`포트폴리오 ${slide.page}페이지`}
          >
            {slide.elements?.map((element) => (
              <span
                key={`${slide.page}-${element.image}`}
                className={`${styles.element} ${element.className}`}
                style={
                  {
                    "--element-image": `url("${element.image}")`,
                  } as CSSProperties
                }
                aria-hidden="true"
              />
            ))}
            <div className={styles.textLayer}>
              {slide.eyebrow && (
                <p className={styles.eyebrow}>{slide.eyebrow}</p>
              )}
              {slide.title && <h1>{renderTitle(slide.title)}</h1>}
              {slide.description && (
                <p className={styles.description}>
                  {renderTitle(slide.description)}
                </p>
              )}
              {slide.page === 2 && (
                <div className={styles.coverMeta}>
                  <div className={styles.toolRow}>
                    <span>Figma</span>
                    <span>Ps</span>
                    <span>Ai</span>
                  </div>
                  <dl className={styles.metaList}>
                    <div>
                      <dt>작업기간</dt>
                      <dd>2022.03 - 2022.09</dd>
                    </div>
                    <div>
                      <dt>기여도</dt>
                      <dd>50%</dd>
                    </div>
                  </dl>
                </div>
              )}
              {slide.page === 3 && (
                <div className={styles.stateGrid}>
                  <div>
                    <h2>AS IS (예비사업)</h2>
                    <p>
                      하나의 역사를 대상으로 만들어진 단순한 기능과 디자인으로
                      구성된 내비게이션 앱
                    </p>
                    <p>
                      도시철도 역사 내부가 아니면 작동되지 않아 실용성이
                      떨어지고 교통약자 배려요소가 부족함
                    </p>
                    <div className={styles.circleRow}>
                      <span>실내 한정</span>
                      <span>배려요소 부족</span>
                      <span>낮은 실용성</span>
                    </div>
                  </div>
                  <div>
                    <h2>TO BE (본사업)</h2>
                    <p>
                      이용자가 역사 내부에서 최종목적지(외부)까지 앱을 이탈하지
                      않고 서비스 이용 가능
                    </p>
                    <p>
                      모든 서비스 이용자가 도시철도와 주변 교통을 편리하게
                      이용할 수 있도록 제작
                    </p>
                    <p>
                      교통약자를 배려한 UI/UX 디자인과 목적지 설정을 위한 다양한
                      경로 제공
                    </p>
                    <div
                      className={`${styles.circleRow} ${styles.blueCircles}`}
                    >
                      <span>실내 + 실외</span>
                      <span>배려요소 보완</span>
                      <span>활용률 증대</span>
                    </div>
                  </div>
                </div>
              )}
              {slide.blocks && (
                <div className={styles.blockList}>
                  {slide.blocks.map((block) => (
                    <section key={block.title}>
                      <h2>{block.title}</h2>
                      <p>{block.body}</p>
                      {block.note && <small>{block.note}</small>}
                    </section>
                  ))}
                </div>
              )}
            </div>
          </section>
        ))}
      </article>
    </main>
  );
}
