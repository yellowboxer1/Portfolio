import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/src/components/Header";
import ProjectIntroSection from "@/src/components/ProjectIntroSection";
import { SmartCitySlide } from "./SmartCitySlide";
import { smartCityGridSlides } from "./grid-slides";
import { planningDecisions, projectIntro, solutions } from "./case-study";
import styles from "./case-study.module.css";

export const metadata: Metadata = {
  title: "스마트시티 챌린지 · 다가치나란히 | 박건호 포트폴리오",
  description:
    "부산 도시철도 배리어프리 내비게이션 기획. 사용자별 이동 경로, 역사별 비콘 신호 확인, 실내·외 길안내를 정리했습니다.",
};
const media = (file: string) => `/portfolio/smart-city-challenge/media/${file}`;
const chapters = [
  { href: "#context", label: "프로젝트 배경" },
  { href: "#planning", label: "문제와 판단" },
  { href: "#fieldwork", label: "현장 검증" },
  { href: "#onboarding", label: "서비스 설계" },
  { href: "#reflection", label: "결과와 회고" },
];
export default function SmartCityChallengePage() {
  return (
    <main className={styles.page}>
      <Header aboutHref="/#about" />
      <Link
        href="/#selected-works"
        className={styles.backButton}
        aria-label="선택한 프로젝트로 돌아가기"
      >
        <span aria-hidden="true">←</span>
        <span>Back</span>
      </Link>
      <article aria-label="다가치나란히 배리어프리 내비게이션 기획 사례">
        <SmartCitySlide slide={smartCityGridSlides[0]} index={0} />
        <ProjectIntroSection {...projectIntro} />
        <nav className={styles.chapterNav} aria-label="프로젝트 목차">
          <div className={styles.inner}>
            {chapters.map((chapter, index) => (
              <a key={chapter.href} href={chapter.href}>
                <span>0{index + 1}</span>
                {chapter.label}
              </a>
            ))}
          </div>
        </nav>
        <section
          id="context"
          className={styles.section}
          aria-labelledby="context-title"
        >
          <div className={styles.inner}>
            <p className={styles.sectionLabel}>Overview</p>
            <div className={styles.editorialGrid}>
              <h2 id="context-title">지하철 실내·외 길안내 기획</h2>
              <div className={styles.bodyCopy}>
                <p>
                  사업 목표는 누구나 편리하고 소외됨 없이 이용할 수 있는{" "}
                  <strong>
                    무장애(Barrier-free) 교통환경 및 포용형 도시 서비스 구현
                  </strong>
                  입니다.
                </p>
                <p>
                  버스와 장애인 보조 택시, 지하철을 연결하는 부산 스마트시티
                  챌린지 사업에서{" "}
                  <strong>지하철 역사 내부와 외부를 잇는 내비게이션</strong>을
                  맡았습니다.
                </p>
                <p>
                  역사 안에서는 GPS가 제대로 동작하지 않았고, 층과 환승 동선이
                  복잡해 현재 위치와 엘리베이터를 찾기 어려웠습니다. 장애물이
                  있거나 배리어프리 시설이 부족한 구간은 교통약자가 이동하기
                  어려워 사용자 유형별 경로가 필요했습니다.
                </p>
                <p>
                  GPS를 사용할 수 없는 역사 안에서 위치를 파악하기 위해, 팀의
                  강점이었던 <strong>Wi-Fi·BLE 기반 측위 기술</strong>을
                  선택했습니다. 역사에 설치한 비콘의 신호로 사용자 위치를
                  추정하고, 이를 바탕으로 실내 길안내를 제공하고자 했습니다.
                </p>
              </div>
            </div>
            <ol
              className={styles.journey}
              aria-label="전체 사업의 이동 연결 구조"
            >
              <li>
                <span>01</span>
                <strong>버스</strong>
                <p>배리어프리 스테이션</p>
              </li>
              <li>
                <span>02</span>
                <strong>보조 택시</strong>
                <p>두리발 등 이동 연계</p>
              </li>
              <li className={styles.myScope}>
                <span>MY SCOPE</span>
                <strong>지하철 실내·외</strong>
                <p>현재 위치 → 맞춤 경로 → 목적지</p>
              </li>
            </ol>
            <div className={styles.scopeNote}>
              <span>담당 범위</span>
              <p>
                실내 위치 확인, 사용자 유형별 경로 설정, 실외 목적지까지의
                길안내를 기획했습니다.
              </p>
            </div>
          </div>
        </section>
        <section
          id="planning"
          className={`${styles.section} ${styles.alternate}`}
          aria-labelledby="planning-title"
        >
          <div className={styles.inner}>
            <p className={styles.sectionLabel}>Problem &amp; Strategy</p>
            <h2 id="planning-title">경로 설정과 위치 확인에서 고려한 점</h2>
            <p className={styles.lead}>
              사용자가 실제로 이동할 수 있는 경로인지, 역사 안에서 위치를 확인할
              수 있는지를 기준으로 기획했습니다.
            </p>
            <div className={styles.decisionList}>
              {planningDecisions.map((item) => (
                <div key={item.number} className={styles.decisionRow}>
                  <span className={styles.number}>{item.number}</span>
                  <div>
                    <p className={styles.smallLabel}>문제</p>
                    <h3>{item.problem}</h3>
                    <p>{item.context}</p>
                  </div>
                  <div className={styles.decisionAnswer}>
                    <p className={styles.smallLabel}>기획에 반영한 내용</p>
                    <h3>{item.decision}</h3>
                    <p>{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section
          id="fieldwork"
          className={styles.section}
          aria-labelledby="fieldwork-title"
        >
          <div className={styles.inner}>
            <p className={styles.sectionLabel}>Field Validation</p>
            <section
              id="positioning"
              className={styles.positioning}
              aria-labelledby="positioning-title"
            >
              <div className={styles.positioningHeader}>
                <h2 id="positioning-title">
                  BLE 비콘으로 실내 위치를 찾는 방식
                </h2>
                <p>
                  역사에 고정된 비콘과 이동하는 스마트폰 사이의 신호를 이용해
                  위치를 추정합니다.
                </p>
              </div>
              <ol className={styles.positioningSteps}>
                <li>
                  <span>01 · 신호 수집</span>
                  <h3>BLE · RSSI</h3>
                  <p>
                    스마트폰에서 비콘의 Advertising 신호를 수신하고, 식별정보와
                    수신 신호 세기(RSSI)를 수집합니다. 비콘 식별자는 설치 좌표와
                    연결합니다.
                  </p>
                </li>
                <li>
                  <span>02 · 거리 추정</span>
                  <h3>Path Loss Model</h3>
                  <p>
                    1m 거리의 기준 RSSI와 환경별 경로손실지수를 사용하는
                    Log-Distance Path Loss Model로 비콘과 스마트폰 사이의 거리를
                    추정합니다.
                  </p>
                </li>
                <li>
                  <span>03 · 위치 계산</span>
                  <h3>Trilateration</h3>
                  <p>
                    3개 이상 비콘의 설치 좌표와 추정 거리를 삼변측량에 사용해
                    실내 좌표(X, Y)를 구합니다. 스마트폰 이동에 따른 RSSI 변화로
                    위치를 갱신합니다.
                  </p>
                </li>
              </ol>
            </section>
            <div className={styles.fieldApplication}>
              <div className={styles.editorialGrid}>
                <div>
                  <h2 id="fieldwork-title">
                    현장 테스트로
                    <br />
                    역사별 설치 조건을 조정했습니다.
                  </h2>
                </div>
                <div className={styles.bodyCopy}>
                  <p>
                    이 방식은 RSSI로 거리를 추정하기 때문에 신호가 달라지면 위치
                    추정 결과도 달라집니다. 비콘 설치 간격은{" "}
                    <strong>15m를 표준</strong>으로 정했지만, 역사 높이와
                    구조물의 재질, 매질에 따라 같은 간격에서도 신호 세기가
                    달랐습니다.
                  </p>
                  <p>
                    그래서 매질 테스트와 RSSI 측정, 역사별 현장 테스트를 직접
                    진행했습니다. 측정한 신호 세기와 도달 범위에 맞춰 설치
                    위치와 간격을 조정한 뒤,{" "}
                    <strong>실제 이동 동선에서 위치가 잡히는지</strong>{" "}
                    확인했습니다.
                  </p>
                </div>
              </div>
              <div className={styles.fieldBoard}>
                <div className={styles.standard}>
                  <span>비콘 표준 설치 간격</span>
                  <strong>
                    15<span>m</span>
                  </strong>
                  <p>역사별 신호 확인 후 설치 위치·간격 조정</p>
                </div>
                <div className={styles.fieldSteps}>
                  <div>
                    <span>01 · 환경 확인</span>
                    <h3>높이 · 재질 · 매질</h3>
                    <p>역사별 구조와 설치 환경을 확인했습니다.</p>
                  </div>
                  <div>
                    <span>02 · 현장 측정</span>
                    <h3>신호 세기 · 도달 범위</h3>
                    <p>
                      매질·RSSI·역사별 현장 테스트를 모두 직접 진행했습니다.
                    </p>
                  </div>
                  <div>
                    <span>03 · 기획에 반영</span>
                    <h3>설치 조정 · 이동 동선 확인</h3>
                    <p>
                      비콘 위치와 간격을 조정하고 실제 동선에서 위치 인식을
                      확인했습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className={styles.designDivider}>
          <div className={styles.inner}>
            <p>Service Design</p>
            <h2>주요 화면과 기획 내용</h2>
            <span>
              안내 방식 선택 → 이동 가능한 경로 → 예외 상황 대응 → 실외 연결
            </span>
          </div>
        </div>
        {solutions.map((solution) => (
          <section
            key={solution.id}
            id={solution.id}
            className={`${styles.section} ${styles.solution}`}
            aria-labelledby={`${solution.id}-title`}
          >
            <div className={styles.inner}>
              <p className={styles.sectionLabel}>
                {solution.number} · {solution.label}
              </p>
              <div className={styles.editorialGrid}>
                <h2 id={`${solution.id}-title`}>{solution.title}</h2>
                <div className={styles.bodyCopy}>
                  <p className={styles.question}>{solution.question}</p>
                  <p>{solution.rationale}</p>
                </div>
              </div>
              <div className={styles.screenStage}>
                {solution.screens.map((screen, index) => (
                  <figure key={screen.file}>
                    <div className={styles.screenFrame}>
                      <Image
                        src={media(screen.file)}
                        width={375}
                        height={812}
                        sizes="(max-width: 600px) 70vw, (max-width: 900px) 27vw, 280px"
                        alt={screen.alt}
                      />
                    </div>
                    <figcaption>
                      <span>0{index + 1}</span>
                      {screen.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
              <div className={styles.designNotes}>
                {solution.decisions.map((decision) => (
                  <div key={decision.title}>
                    <h3>{decision.title}</h3>
                    <p>{decision.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
        <section
          id="reflection"
          className={`${styles.section} ${styles.alternate}`}
          aria-labelledby="reflection-title"
        >
          <div className={styles.inner}>
            <p className={styles.sectionLabel}>Outcome &amp; Reflection</p>
            <h2 id="reflection-title">기획 결과와 현장에서 배운 점</h2>
            <div className={styles.reflectionGrid}>
              <div>
                <span>기획 결과</span>
                <h3>실내·외 길안내 구성</h3>
                <p>
                  현재 위치 확인, 유형별 경로 설정, 수어·음성 안내, 신호 유실
                  대응과 실외 목적지 안내를 이용 순서에 맞춰 구성했습니다.
                </p>
              </div>
              <div>
                <span>경로 설정</span>
                <h3>사용자별 이동 조건 반영</h3>
                <p>
                  장애물과 배리어프리 시설이 부족한 구간은 교통약자가 이용하기
                  어려웠습니다. 최단거리보다 실제 이동 가능한 경로를 우선하고,
                  사용자 유형별로 경로를 나눴습니다.
                </p>
              </div>
              <div>
                <span>현장 검증</span>
                <h3>표준 간격과 실제 신호의 차이</h3>
                <p>
                  15m라는 설치 기준이 있어도 역사마다 신호 세기가 달랐습니다.
                  매질 테스트, RSSI 테스트, 역사별 현장 테스트를 직접 진행하고,
                  측정 결과를 비콘 설치와 길안내에 반영했습니다.
                </p>
              </div>
            </div>
            <Link href="/works" className={styles.nextProject}>
              다른 프로젝트 보기 <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
