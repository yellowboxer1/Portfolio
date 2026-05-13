import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import Header from "@/src/components/Header";
import ProjectIntroSection from "@/src/components/ProjectIntroSection";
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
    "부산 도시철도 이용자를 위한 배리어프리 실내·외 내비게이션 앱입니다. 예비사업의 제한적인 실내 안내 기능을 확장해 도시철도 1~4호선과 주요 실외 목적지까지 연결하고, 교통약자와 비교통약자 모두가 사용할 수 있도록 사용자 유형, 경로 안내, 주변 정보, 장애물 안내 흐름을 기획했습니다.",
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
            <section
              className={`${styles.slide} ${styles[slide.type]} ${
                slide.type === "preview" && slide.variant
                  ? styles[`preview-${slide.variant}`]
                  : ""
              }`}
              aria-label={`포트폴리오 ${index + 2}페이지`}
            >
            {slide.type === "cover" && (
              <>
                <div className={styles.coverCopy}>
                  <img
                    className={styles.coverLogo}
                    src={slide.images.logo}
                    alt=""
                    aria-hidden="true"
                  />
                  <h1>{slide.title}</h1>
                  <img
                    className={styles.toolIcons}
                    src={slide.images.toolIcons}
                    alt="Figma, Photoshop, Illustrator"
                  />
                  <p className={styles.description}>{slide.description}</p>
                  <dl className={styles.metaList}>
                    {slide.meta.map((item) => (
                      <div key={item.label}>
                        <dt>{item.label}</dt>
                        <dd>{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className={styles.coverVisuals} aria-hidden="true">
                  <figure className={styles.visualCard}>
                    <figcaption>튜토리얼 안내 유형 선택</figcaption>
                    <img src={slide.images.tutorial} alt="" />
                  </figure>
                  <figure className={styles.visualCard}>
                    <figcaption>장애물 지도</figcaption>
                    <img src={slide.images.obstacle} alt="" />
                  </figure>
                  <figure className={styles.visualCardSmall}>
                    <img src={slide.images.userType} alt="" />
                  </figure>
                  <figure className={styles.visualCardSmall}>
                    <figcaption>사용자 유형 선택</figcaption>
                    <img src={slide.images.routeType} alt="" />
                  </figure>
                  <figure className={styles.signPlayer}>
                    <figcaption>수어 플레이어</figcaption>
                    <img src={slide.images.signPlayer} alt="" />
                  </figure>
                </div>
              </>
            )}

            {slide.type === "overview" && (
              <>
                <img
                  className={styles.overviewBackground}
                  src={slide.background}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  aria-hidden="true"
                />
                <img
                  className={styles.slideLogo}
                  src={slide.logo}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  aria-hidden="true"
                />
                <div className={styles.overviewHeader}>
                  <p className={styles.kicker}>{slide.kicker}</p>
                  <h2>{slide.title}</h2>
                </div>
                <h3 className={styles.goalHeading}>목적</h3>
                <div className={styles.goalList}>
                  {slide.goals.map((goal) => (
                    <section key={goal.title}>
                      <h3>{goal.title}</h3>
                      <p>{goal.body}</p>
                    </section>
                  ))}
                </div>
                <div className={styles.comparison}>
                  <img
                    className={styles.comparisonMarker}
                    src={slide.comparison.marker}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    aria-hidden="true"
                  />
                  <div className={styles.comparisonRow}>
                    <div className={styles.comparisonCopy}>
                      <h3>AS IS (예비사업)</h3>
                      {slide.comparison.asisBody.map((item) => (
                        <p key={item}>{item}</p>
                      ))}
                    </div>
                    <ul>
                      {slide.comparison.asis.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.comparisonRow}>
                    <div className={styles.comparisonCopy}>
                      <h3>TO BE (본사업)</h3>
                      {slide.comparison.tobeBody.map((item) => (
                        <p key={item}>{item}</p>
                      ))}
                    </div>
                    <ul>
                      {slide.comparison.tobe.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )}

            {slide.type === "preview" && (
              <>
                {slide.background && (
                  <img
                    className={styles.previewBackground}
                    src={slide.background}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    aria-hidden="true"
                  />
                )}
                {slide.logo && (
                  <img
                    className={`${styles.slideLogo} ${styles.previewLogo}`}
                    src={slide.logo}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    aria-hidden="true"
                  />
                )}
                {slide.tabs && (
                  <div className={styles.previewTabs} aria-hidden="true">
                    {slide.tabs.map((tab) => (
                      <span key={tab}>{tab}</span>
                    ))}
                  </div>
                )}
                <div className={styles.previewCopy}>
                  <p className={styles.kicker}>{slide.kicker}</p>
                  <p className={styles.sectionTitle}>{slide.title}</p>
                  {slide.mascot && (
                    <img
                      className={styles.previewMascot}
                      src={slide.mascot}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      aria-hidden="true"
                    />
                  )}
                  <h2>{slide.headline}</h2>
                  <p className={styles.description}>{slide.body}</p>
                </div>
                <div className={styles.previewImages} aria-hidden="true">
                  {slide.images.map((image, imageIndex) => (
                    <img
                      key={image}
                      className={imageIndex === 0 ? styles.previewMainImage : ""}
                      src={image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  ))}
                </div>
                <div className={styles.noteGrid}>
                  {slide.notes.map((note) => (
                    <section key={note.title}>
                      <h3>{note.title}</h3>
                      <p>{note.body}</p>
                    </section>
                  ))}
                </div>
              </>
            )}

            {slide.type === "service" && (
              <>
                <div className={styles.serviceHeader}>
                  <p className={styles.kicker}>{slide.kicker}</p>
                  <h2>{slide.title}</h2>
                </div>
                <div className={styles.serviceImages} aria-hidden="true">
                  {slide.images.map((image) => (
                    <img
                      key={image}
                      src={image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  ))}
                </div>
                <div className={styles.serviceItems}>
                  {slide.items.map((item) => (
                    <section key={item.title}>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </section>
                  ))}
                </div>
              </>
            )}
            </section>
            {index === 0 && <ProjectIntroSection {...smartCityIntro} />}
          </Fragment>
        ))}
      </article>
    </main>
  );
}
