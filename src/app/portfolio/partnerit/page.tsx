import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import Header from "@/src/components/Header";
import ProjectIntroSection from "@/src/components/ProjectIntroSection";
import { partnerItGridSlides } from "./grid-slides";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "PartnerIT | Portfolio",
  description:
    "AI·빅데이터 기반 지원사업 공고 추천과 컨소시엄 파트너 매칭을 제공하는 GovTech SaaS 플랫폼 파트너잇 포트폴리오.",
};

const partnerItIntro = {
  badge: "AI B2B SaaS",
  title: "AI 기반 지원사업 공고 추천과 컨소시엄 파트너 자동 매칭 플랫폼",
  meta: [
    { label: "서비스명", value: "파트너잇(PartnerIT)" },
    { label: "역할", value: "PM · Service Planner" },
    { label: "진행기간", value: "2026.04 - 진행 중" },
    { label: "성과", value: "누적 투자 10억 원 · R&D 과제 수주" },
  ],
  resultBadge: "탐색 → 판단 → 매칭 전주기 SaaS",
  techStack: [
    "Next.js",
    "React",
    "TypeScript",
    "Supabase",
    "Prisma",
    "RAG",
    "OCR",
    "NLP",
  ],
  features: [
    "기업 프로필 생성",
    "AI 공고 자동 매칭",
    "AI 분석 리포트",
    "컨소시엄 자동 매칭",
    "지원 가능성 판단",
    "가점·자격요건 분석",
    "협업툴 확장",
  ],
  overview:
    "파트너잇은 단순 공고 검색 서비스가 아니라 기업의 사업 기회 탐색, 참여 가능성 판단, 컨소시엄 연결, 프로젝트 수행까지 지원하는 AI 기반 사업 기회 의사결정 플랫폼입니다. 기업 데이터와 공고 조건을 비교해 실제 지원 가능한 사업만 선별하고, 추천 이유를 설명 가능한 리포트로 제공하며, 부족한 역량은 데이터 기반 파트너 추천으로 연결합니다.",
};

export default function PartnerItPortfolioPage() {
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

      <article className={styles.deck} aria-label="파트너잇 포트폴리오">
        {partnerItGridSlides.map((slide, index) => (
          <Fragment key={`${slide.type}-${index}`}>
            <section
              className={`${styles.slide} ${styles[slide.type]}`}
              aria-label={`파트너잇 포트폴리오 ${index + 1}페이지`}
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
                    <figure className={styles.browserMockup}>
                      <img src={slide.images.dashboard} alt="" />
                    </figure>
                    <figure className={styles.reportMockup}>
                      <img src={slide.images.report} alt="" />
                    </figure>
                    <figure className={styles.matchingMockup}>
                      <img src={slide.images.matching} alt="" />
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
                    aria-hidden="true"
                  />
                  <div className={styles.overviewHeader}>
                    <p className={styles.kicker}>{slide.kicker}</p>
                    <h2>{slide.title}</h2>
                  </div>
                  <h3 className={styles.goalHeading}>목표</h3>
                  <div className={styles.goalList}>
                    {slide.goals.map((goal) => (
                      <section key={goal.title}>
                        <h3>{goal.title}</h3>
                        <p>{goal.body}</p>
                      </section>
                    ))}
                  </div>
                  <div className={styles.comparison}>
                    <div className={styles.comparisonRow}>
                      <div className={styles.comparisonCopy}>
                        <h3>AS IS</h3>
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
                        <h3>TO BE</h3>
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
                  <div className={styles.previewCopy}>
                    <p className={styles.kicker}>{slide.kicker}</p>
                    <p className={styles.sectionTitle}>{slide.title}</p>
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
                      <img key={image} src={image} alt="" />
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
            {index === 0 && <ProjectIntroSection {...partnerItIntro} />}
          </Fragment>
        ))}
      </article>
    </main>
  );
}
