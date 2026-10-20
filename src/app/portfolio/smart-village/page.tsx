import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/src/components/Header";
import ProjectBackButton from "@/src/components/ProjectBackButton";
import ProjectIntroSection from "@/src/components/ProjectIntroSection";
import { projectIntro } from "./case-study";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Smart village",
  description:
    "라이프로그·ADL 연구를 바탕으로 다중 IoT 센서와 빅데이터를 1인가구 돌봄 현장에 적용한 스마트빌리지 실증 사업입니다.",
};

const asset = (name: string) => `/portfolio/smart-village/${name}.webp`;
const chapters = [
  ["context", "프로젝트 배경"],
  ["planning", "기획 방향"],
  ["dashboard", "통합 관제"],
  ["apps", "돌봄 앱"],
  ["results", "역할과 성과"],
];
const careChallenges = [
  {
    problem: "늦게 드러나는 위험",
    description:
      "방문과 안부 전화 사이에 생긴 생활 변화나 응급 상황을 바로 알아차리기 어렵습니다.",
    solution: "24시간·365일 관제",
    response:
      "센서 신호와 응급 호출을 상시 확인하고, 확인이 필요한 대상자를 찾습니다.",
  },
  {
    problem: "흩어진 생활 정보",
    description:
      "개별 센서의 신호만으로는 하루를 어떻게 보냈는지, 평소와 무엇이 다른지 알기 어렵습니다.",
    solution: "라이프로그·ADL 분석",
    response:
      "활동·수면·출입 기록을 모아 생활 흐름을 살피고 이상징후를 구분합니다.",
  },
  {
    problem: "깊어지는 고립감",
    description:
      "대화와 외출의 기회가 줄어도 외부에서는 정서 변화와 고립을 파악하기 어렵습니다.",
    solution: "대화와 일상 활동 지원",
    response:
      "정기 안부 전화와 말벗, 운동 코스와 리워드로 대화와 활동의 계기를 만듭니다.",
  },
  {
    problem: "확인 이후의 대응 공백",
    description:
      "이상신호를 발견해도 실제 상태 확인과 보호자 연락, 현장 조치가 이어져야 합니다.",
    solution: "안전 확인과 현장 대응",
    response:
      "전화로 상태를 확인하고, 상황에 따라 보호자 연락·출동·119 연계로 대응합니다.",
  },
];

function EvidenceBars({
  items,
  max,
  unit,
}: { items: { label: string; value: number }[]; max: number; unit: string }) {
  return (
    <div className={styles.evidenceBars}>
      {items.map(({ label, value }, index) => (
        <div className={styles.evidenceBarRow} key={label}>
          <div>
            <span>{label}</span>
            <strong>
              {value}
              {unit}
            </strong>
          </div>
          <div className={styles.evidenceTrack}>
            <span
              data-comparison={index === 1}
              style={{ width: `${(value / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
      <div className={styles.evidenceAxis} aria-hidden="true">
        <span>0</span>
        <span>{max / 2}</span>
        <span>
          {max}
          {unit}
        </span>
      </div>
    </div>
  );
}

const depressionTrend = [
  { year: 2016, patients: 226716 },
  { year: 2017, patients: 237544 },
  { year: 2018, patients: 248712 },
  { year: 2019, patients: 249234 },
  { year: 2020, patients: 250035 },
];

function DepressionTrend() {
  return (
    <div
      className={styles.trendChart}
      role="img"
      aria-label="노인 우울증 환자: 2016년 226,716명, 2017년 237,544명, 2018년 248,712명, 2019년 249,234명, 2020년 250,035명"
    >
      <div className={styles.trendAxis} aria-hidden="true">
        <span>30만</span>
        <span>20만</span>
        <span>10만</span>
        <span>0</span>
      </div>
      <div className={styles.trendColumns}>
        {depressionTrend.map(({ year, patients }, index) => (
          <div className={styles.trendColumn} key={year}>
            <div
              className={styles.trendBar}
              data-latest={index === depressionTrend.length - 1}
              style={{ height: `${(patients / 300000) * 100}%` }}
            >
              <strong>{patients.toLocaleString("ko-KR")}</strong>
            </div>
            <span>{year}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

type Screen = {
  file: string;
  title: string;
  description: string;
  width: number;
  height: number;
};
const guardianScreens: Screen[] = [
  {
    file: "care-home",
    title: "현재 상태와 위치",
    description:
      "실내·외 활동 상태와 위치를 확인하고, 전화로 안부를 물을 수 있습니다.",
    width: 752,
    height: 1790,
  },
  {
    file: "notifications",
    title: "응급 상황 알림",
    description:
      "응급 호출과 주요 생활 알림을 받아 대상자의 상황을 확인합니다.",
    width: 900,
    height: 1831,
  },
  {
    file: "weekly-report",
    title: "주간 AI 리포트",
    description: "활동량과 수면 등 일주일의 생활 변화를 살펴볼 수 있습니다.",
    width: 750,
    height: 1754,
  },
];
const subjectScreens: Screen[] = [
  {
    file: "ai-chat",
    title: "대화로 안부 확인",
    description:
      "챗봇과 일상 대화를 나누고, 복약 등 생활에 필요한 안내를 받습니다.",
    width: 750,
    height: 1624,
  },
  {
    file: "walking-route",
    title: "맞춤 운동 코스",
    description: "활동을 시작할 수 있도록 운동 코스와 목표를 제안합니다.",
    width: 376,
    height: 813,
  },
  {
    file: "rewards",
    title: "활동 참여 리워드",
    description:
      "목표를 달성한 경험이 다음 활동으로 이어지도록 보상을 제공합니다.",
    width: 375,
    height: 812,
  },
];

function Screens({ items, label }: { items: Screen[]; label: string }) {
  return (
    <div
      className={styles.screenStage}
      role="region"
      aria-label={label}
      tabIndex={0}
    >
      {items.map((screen, index) => (
        <figure key={screen.file}>
          <div
            className={`${styles.screenFrame} ${screen.file === "notifications" ? styles.deviceImage : ""}`}
          >
            <Image
              src={asset(screen.file)}
              alt={`${screen.title} 앱 화면`}
              width={screen.width}
              height={screen.height}
              unoptimized
              loading="eager"
              fetchPriority="low"
            />
          </div>
          <figcaption>
            <span>0{index + 1}</span>
            <h3>{screen.title}</h3>
            <p>{screen.description}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function SmartVillagePage() {
  return (
    <main className={styles.page}>
      <Header aboutHref="/#about" />
      <ProjectBackButton href="/#selected-works" />
      <article aria-label="2023 스마트 빌리지 지원사업 기획 사례">
        <section className={styles.cover} aria-labelledby="project-title">
          <div className={styles.coverInner}>
            <div className={styles.coverCopy}>
              <p className={styles.eyebrow}>2023 SMART VILLAGE</p>
              <Image
                className={styles.coverLogo}
                src={asset("bell-logo")}
                alt="bell"
                width={834}
                height={264}
                unoptimized
                priority
              />
              <h1 id="project-title" className={styles.coverTitle}>
                빅데이터 기반 1인가구 돌봄 서비스
              </h1>
              <p className={styles.coverDescription}>
                도플러 신호와 IoT 기기로 수집한 라이프로그를 바탕으로, 1인가구의
                일상을 살피고 이상징후를 발견해 대응하는 돌봄 서비스입니다.
              </p>
              <dl className={styles.coverMeta}>
                <div>
                  <dt>프로젝트</dt>
                  <dd>2023 스마트 빌리지 지원사업</dd>
                </div>
                <div>
                  <dt>담당 역할</dt>
                  <dd>연구 · 현장 실증 · PM · 서비스 기획</dd>
                </div>
              </dl>
            </div>
            <div
              className={styles.coverVisual}
              aria-label="돌봄 서비스 앱 화면 모음"
            >
              <div className={styles.coverArtwork}>
                {[
                  ["notifications", "돌봄 알림", 900, 1831],
                  ["cover-route", "맞춤 운동 코스", 750, 1624],
                  ["cover-activity", "활동 현황", 750, 1624],
                  ["cover-reward", "활동 리워드", 750, 1624],
                  ["cover-history", "리워드 내역", 750, 1624],
                ].map(([file, alt, width, height], index) => (
                  <div
                    key={file}
                    className={styles.coverScreen}
                    data-screen={file}
                  >
                    <Image
                      src={asset(String(file))}
                      alt={String(alt)}
                      width={Number(width)}
                      height={Number(height)}
                      unoptimized
                      priority={index < 2}
                      loading="eager"
                      fetchPriority={index < 2 ? "high" : "low"}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ProjectIntroSection {...projectIntro} />
        <nav className={styles.chapterNav} aria-label="프로젝트 목차">
          <div className={styles.inner}>
            {chapters.map(([id, title], i) => (
              <a href={`#${id}`} key={id}>
                <span>0{i + 1}</span>
                {title}
              </a>
            ))}
          </div>
        </nav>

        <section
          id="context"
          className={`${styles.section} ${styles.skySection} ${styles.contextSection}`}
          aria-labelledby="context-title"
        >
          <div className={styles.inner}>
            <div className={styles.contextHero}>
              <div>
                <p className={styles.sectionLabel}>Background</p>
                <h2 id="context-title">
                  고독·우울·은둔·사회적 고립, 혼자 지내는 시니어의 돌봄 공백
                </h2>
                <div className={styles.contextLead}>
                  <p>
                    혼자 사는 어르신이 늘면서 돌봄의 빈틈도 커지고 있습니다.
                    방문 돌봄이 있어도 방문과 방문 사이의 며칠은 비어 있습니다.
                    그 사이 밥은 드셨는지, 하루 종일 말 한마디 나눈 사람이
                    있었는지 아무도 알 수 없습니다.
                  </p>
                  <p>
                    더 안타까운 건, 우울과 은둔은 겉으로 드러나지 않아 문제가
                    커진 뒤에야 발견되는 경우가 많다는 점입니다. 그래서 어르신이
                    &ldquo;괜찮다&rdquo;고 말하기 전에, 일상의 작은 변화로 먼저
                    알아차릴 수 있는 돌봄이 필요하다고 판단했습니다.
                  </p>
                  <p>
                    레이더 센서의 도플러 신호로 수면·재실·활동 같은
                    일상생활활동(ADL)을 측정해 <strong>활동 로그</strong>를
                    만들고, 대화 서비스에서 감정을 분류해{" "}
                    <strong>감정 로그</strong>를 더했습니다. 두 로그를 하나로
                    묶은 <strong>라이프로그</strong>로 몸의 변화와 마음의 변화를
                    함께 살피고, 이상징후에 먼저 대응하고자 했습니다.
                  </p>
                </div>
              </div>
              <figure className={styles.contextImage}>
                <Image
                  src="/portfolio/smart-village/senior-original-illustration.svg"
                  alt="제로웹 사업소개서의 고민하는 시니어 일러스트"
                  width={690}
                  height={570}
                  unoptimized
                  loading="eager"
                  fetchPriority="low"
                />
              </figure>
            </div>
            <div
              className={styles.evidencePanel}
              aria-label="시니어 돌봄의 필요성을 보여주는 참고 통계"
            >
              <div className={styles.evidenceGrid}>
                <article>
                  <span className={styles.evidenceNumber}>01</span>
                  <h3>늘어나는 노년기 우울증</h3>
                  <p className={styles.evidenceSubtitle}>
                    노인 우울증 환자 추이 · 2016~2020년 · 단위: 명
                  </p>
                  <DepressionTrend />
                  <p className={styles.evidenceFinding}>
                    2016년 <strong>226,716명</strong>에서 2020년{" "}
                    <strong>250,035명</strong>으로, 우울증 환자가{" "}
                    <strong>약 10.3%</strong> 증가했습니다.
                  </p>
                </article>
                <article>
                  <span className={styles.evidenceNumber}>02</span>
                  <h3>OECD 평균보다 높은 노인 자살률</h3>
                  <p className={styles.evidenceSubtitle}>
                    2020년 · 65세 이상 · 인구 10만 명당
                  </p>
                  <EvidenceBars
                    items={[
                      { label: "한국", value: 41.7 },
                      { label: "OECD 평균", value: 16.3 },
                    ]}
                    max={50}
                    unit="명"
                  />
                  <p className={styles.evidenceFinding}>
                    한국 <strong>41.7명</strong>, OECD 평균{" "}
                    <strong>16.3명</strong>
                    으로, 한국의 노인 자살률은 평균의 <strong>약 2.6배</strong>
                    였습니다.
                  </p>
                </article>
              </div>
              <p className={styles.evidenceSource}>
                출처: 건강보험심사평가원 · 통계청 「한국의 사회동향 2023」
              </p>
            </div>
            <div className={styles.supportingCopy}>
              <p>
                방문과 안부 확인 사이의 돌봄 공백을 줄이면서, 대상자가 익숙한
                집에서 생활할 수 있도록 지원하고자 했습니다. 생활 데이터를 통한
                안전 확인에 정서 케어, 운동과 지역 커뮤니티 활동을 더해
                가족·지역사회와의 연결을 이어가는 것을 사업 목표로 삼았습니다.
              </p>
            </div>
          </div>
        </section>

        <section
          id="research-pilot"
          className={styles.section}
          aria-labelledby="research-title"
        >
          <div className={styles.inner}>
            <p className={styles.sectionLabel}>Research &amp; Pilot</p>
            <div className={styles.editorialGrid}>
              <h2 id="research-title">
                라이프로그·ADL 연구를 실제 돌봄 현장으로
              </h2>
              <div className={styles.bodyCopy}>
                <p>
                  과기부 공공조달 연계 실증·사업화 R&D 지원 사업을 통해 다중 IoT
                  센서로 라이프로그와 일상생활활동(ADL)을 추출하고, 생활 패턴을
                  분석하는 연구를 진행했습니다.
                </p>
                <p>
                  스마트빌리지 사업에서는 이 연구에서 마련한 라이프로그·ADL 추출
                  방식과 생활 패턴 분석 결과를 실제 1인가구 돌봄 현장에
                  적용했습니다. 부산 4개 구·군 250가구의 센서에서 수집한
                  데이터로 생활 변화와 이상징후를 확인하고, 관제센터의 안전
                  확인과 현장 대응으로 이어지는 과정을 실증했습니다.
                </p>
              </div>
            </div>
            <div className={styles.pilotScope}>
              <dl>
                <div>
                  <dt>실증 규모</dt>
                  <dd>
                    1인가구 <strong>250가구</strong>
                  </dd>
                </div>
                <div>
                  <dt>참여 지역 · 부산 4개 구·군</dt>
                  <dd>남구 · 영도구 · 금정구 · 기장군</dd>
                </div>
              </dl>
            </div>
            <div
              className={styles.researchBridge}
              aria-label="R&D 연구와 스마트빌리지 실증의 연결"
            >
              <div>
                <span>기반 연구 · R&D</span>
                <h3>과기부 공공조달 연계 실증·사업화 R&D 지원 사업</h3>
                <p>
                  다중 IoT 센서 기반 라이프로그·ADL 추출 및 생활 패턴 분석 연구
                </p>
              </div>
              <span className={styles.bridgeArrow} aria-hidden="true">
                →
              </span>
              <div>
                <span>현장 적용 · 실증</span>
                <h3>2023 스마트 빌리지 지원사업 1인가구 돌봄서비스</h3>
                <p>
                  연구에서 마련한 라이프로그·ADL 추출 방식과 생활 패턴 분석을
                  250가구의 실제 돌봄 환경에 적용·검증
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="sensor-installation"
          className={`${styles.section} ${styles.skySection} ${styles.fieldSection}`}
          aria-labelledby="installation-title"
        >
          <div className={styles.inner}>
            <p className={styles.sectionLabel}>Field Application</p>
            <div className={styles.fieldApplication}>
              <h2 id="installation-title">주거 환경에 맞춘 센서 설치</h2>
              <div>
                <p>
                  센서를 설치하기 전에 각 가정을 방문해 집의 구조와 어르신의
                  생활 방식을 확인했습니다. 사전 실사와 인터뷰로 주로 머무는
                  공간과 집 안에서 오가는 동선을 파악하고, 그에 맞춰 센서 설치
                  위치를 정했습니다.
                </p>
                <p>
                  생활 데이터를 수집하는 중심 장치는 레이더 센서였습니다.{" "}
                  <strong>레이더 센서의 도플러 신호</strong>를 측정해 어르신의
                  활동량과 움직임을 파악하고, 이를 수면·재실·활동 기록으로
                  정리했습니다.
                </p>
                <p>
                  추가적으로 현관문 열림으로 외출·귀가를, 스마트플러그로 가전
                  사용을 확인하는 등 여러 기기의 정보를 함께 활용했습니다.
                </p>
              </div>
            </div>
            <div id="research-data" className={styles.researchDetails}>
              <div>
                <h3>활동·수면 기록 측정</h3>
                <p>
                  레이더 센서로 측정한 활동량과 움직임의 변화를 바탕으로 하루의
                  생활 흐름을 활동 로그로 구성했습니다.
                </p>
                <dl className={styles.dataItems}>
                  <div>
                    <dt>수면</dt>
                    <dd>취침·기상 시각, 수면 시간</dd>
                  </div>
                  <div>
                    <dt>재실</dt>
                    <dd>집에 머무는 시간</dd>
                  </div>
                  <div>
                    <dt>활동</dt>
                    <dd>활동량, 활동 시간과 이동 거리</dd>
                  </div>
                </dl>
                <p className={styles.dataPurpose}>
                  움직임이 감지됐는지만 보는 데 그치지 않고,{" "}
                  <strong>
                    하루를 어떻게 보냈는지, 평소와 무엇이 달라졌는지
                  </strong>
                  를 확인하고자 했습니다.
                </p>
              </div>
              <div>
                <h3>대화·정서 기록 측정</h3>
                <p>
                  대화 서비스에서 나눈 내용을 긍정·부정·중립으로 분류해 감정
                  로그로 정리했습니다.
                </p>
                <dl className={styles.dataItems}>
                  <div>
                    <dt>수집 정보</dt>
                    <dd>대상자와 나눈 대화 내용</dd>
                  </div>
                  <div>
                    <dt>감정 분류</dt>
                    <dd>긍정·부정·중립</dd>
                  </div>
                  <div>
                    <dt>함께 확인</dt>
                    <dd>활동량과 생활 패턴의 변화</dd>
                  </div>
                </dl>
                <p className={styles.dataPurpose}>
                  활동량의 변화만으로는 그 이유를 알기 어려워,{" "}
                  <strong>활동 로그와 감정 로그를 함께 살펴</strong> 어떤 돌봄이
                  필요한지 판단하고자 했습니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="planning"
          className={`${styles.section} ${styles.planningSection}`}
          aria-labelledby="direction-title"
        >
          <div className={styles.inner}>
            <p className={styles.sectionLabel}>Planning Direction</p>
            <div className={styles.editorialGrid}>
              <h2 id="direction-title">기획 방향</h2>
              <div className={styles.bodyCopy}>
                <p>
                  수집한 생활 정보를 담당자와 보호자가 이해하고, 이상징후가
                  있으면 현장에서 대응할 수 있어야 했습니다. 이를 위해 통합
                  관제와 안부 확인 기능을 구성하고, 대상자에게는 대화와 운동 등
                  일상에서 직접 이용할 수 있는 서비스를 함께 기획했습니다.
                </p>
              </div>
            </div>
            <div className={styles.planningMap}>
              <p className={styles.planningMapLabel}>As Is – To Be</p>
              <div className={styles.planningColumns}>
                <div className={styles.planningTree} aria-hidden="true">
                  <span />
                </div>
                {careChallenges.map((challenge, index) => (
                  <article
                    className={styles.planningPair}
                    key={challenge.problem}
                    style={{ "--column": index + 1 } as CSSProperties}
                  >
                    <div className={styles.problemCard}>
                      <span>Problem 0{index + 1}</span>
                      <h3>{challenge.problem}</h3>
                      <p>{challenge.description}</p>
                    </div>
                    <div className={styles.solutionCard}>
                      <span>Solution 0{index + 1}</span>
                      <h3>{challenge.solution}</h3>
                      <p>{challenge.response}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="service-structure"
          className={styles.section}
          aria-labelledby="planning-title"
        >
          <div className={styles.inner}>
            <p className={styles.sectionLabel}>Service Structure</p>
            <div className={styles.editorialGrid}>
              <h2 id="planning-title">
                담당자·보호자·대상자를 연결하는 돌봄 서비스
              </h2>
              <div className={styles.bodyCopy}>
                <p>
                  담당자는 여러 대상자 중 확인이 필요한 사람을 찾고, 보호자는
                  떨어져 지내는 가족의 안부를 살펴야 합니다. 대상자에게는 매일
                  사용할 수 있는 생활 기능이 필요했습니다. 같은 생활 정보라도
                  확인하는 목적과 이후 행동이 달랐습니다.
                </p>
              </div>
            </div>
            <div className={styles.serviceSource}>
              <span>도플러 센서 · IoT 디바이스</span>
              <span aria-hidden="true">→</span>
              <strong>라이프로그 수집·분석</strong>
              <span>실내·외 활동 · 수면 · 생활 패턴</span>
            </div>
            <div className={styles.roleGrid}>
              <div>
                <span>담당자</span>
                <h3>관제 대시보드</h3>
                <p>
                  대상자 현황과 이상징후를 모아 보고, 고위험군을 집중적으로
                  살피는 관제 대시보드
                </p>
              </div>
              <div>
                <span>보호자</span>
                <h3>보호자 앱</h3>
                <p>
                  현재 위치와 생활 상태, 응급 알림과 주간 리포트를 확인하는
                  보호자 앱
                </p>
              </div>
              <div>
                <span>대상자</span>
                <h3>대상자 앱</h3>
                <p>
                  대화와 복약 안내, 운동 코스와 리워드로 일상 활동을 돕는 대상자
                  앱
                </p>
              </div>
            </div>
            <div className={styles.supportingCopy}>
              <p>
                담당자에게는 전체 현황과 이상징후를 함께 보는 관제 화면을,
                보호자에게는 현재 상태와 생활 변화를 확인하는 앱을 제공했습니다.
                대상자 앱에는 대화·복약 안내·운동을 넣어, 돌봄 서비스가 실제
                일상 활동으로 이어지도록 구성했습니다.
              </p>
            </div>
          </div>
        </section>

        <section
          id="dashboard"
          className={`${styles.section} ${styles.skySection}`}
          aria-labelledby="dashboard-title"
        >
          <div className={styles.inner}>
            <p className={styles.sectionLabel}>Monitoring</p>
            <div className={styles.editorialGrid}>
              <h2 id="dashboard-title">
                이상징후를 확인하고 현장 대응으로 연결
              </h2>
              <div className={styles.bodyCopy}>
                <p>
                  여러 IoT 센서의 데이터를 결합해 라이프로그와
                  일상생활활동(ADL)을 측정했습니다. 생활 패턴 데이터에서 이상을
                  확인하고, 대상자의 상태를 <strong>긴급·주의·안전</strong>으로
                  나눠 관제 화면에 표시했습니다. 지도와 상태별 현황을 통해
                  담당자가 확인할 대상과 위치를 함께 살펴볼 수 있도록 했습니다.
                </p>
              </div>
            </div>
            <figure className={styles.dashboardFigure}>
              <Image
                src={asset("dashboard")}
                alt="지도, 대상자 현황, 응급 알림과 생활 정보를 함께 보여주는 통합 관제 대시보드"
                width={3000}
                height={2250}
                unoptimized
                loading="eager"
                fetchPriority="low"
              />
              <figcaption>통합 관제시스템 · 원본 기획 화면</figcaption>
            </figure>
            <div
              className={styles.monitoringFlow}
              aria-label="이상징후 확인과 대응 흐름"
            >
              <div>
                <span>01 · 측정</span>
                <strong>다중 IoT 센서 결합</strong>
                <p>
                  움직임·재실·수면과 출입, 가전 사용 정보를 모아 대상자의 생활
                  패턴을 확인
                </p>
              </div>
              <div>
                <span>02 · 확인</span>
                <strong>생활 패턴의 이상 확인</strong>
                <p className={styles.statuses}>
                  <span>긴급</span>
                  <span>주의</span>
                  <span>안전</span>
                </p>
                <p>
                  응급 호출과 화재 신호, 장시간 움직임 미감지 등 신호의 종류와
                  상황에 따라 확인 순서를 구분
                </p>
              </div>
              <div>
                <span>03 · 대응</span>
                <strong>안전 확인과 현장 대응</strong>
                <p>
                  전화로 상태를 확인하고 보호자 연락, 현장 출동 또는 119 연계 후
                  조치 이력을 기록
                </p>
              </div>
            </div>
            <div className={styles.supportingCopy}>
              <p>
                알림을 띄우는 것만으로는 대상자의 안전을 확인할 수 없었습니다.
                관제센터에서는 신호를 받은 뒤 전화로 실제 상태를 확인하고,
                안전이 확인되지 않거나 긴급한 상황이면 현장 출동으로 이어지도록
                했습니다. 주의 단계도 연락 결과에 따라 긴급 단계로 전환하고,
                상황이 끝난 뒤에는 조치 내용을 남기는 절차로 구성했습니다.
              </p>
            </div>
          </div>
        </section>

        <section
          id="apps"
          className={styles.section}
          aria-labelledby="guardian-title"
        >
          <div className={styles.inner}>
            <p className={styles.sectionLabel}>Care App</p>
            <div className={styles.editorialGrid}>
              <h2 id="guardian-title">멀리서도 확인할 수 있는 가족의 안부</h2>
              <div className={styles.bodyCopy}>
                <p>
                  보호자가 멀리서도 가족의 안부를 확인할 수 있도록 현재 위치와
                  실내·외 활동 상태를 제공했습니다. 화면에서 상태를 살핀 뒤
                  전화로 안부를 물을 수 있도록 연결하고, 응급 상황과 주요 생활
                  알림은 푸시로 전달하도록 구성했습니다.
                </p>
              </div>
            </div>
            <Screens
              items={guardianScreens}
              label="보호자 앱 화면 3개. 좁은 화면에서는 가로로 스크롤할 수 있습니다."
            />
            <div className={styles.supportingCopy}>
              <p>
                즉시 확인해야 하는 상황과 시간을 두고 살펴볼 생활 변화를
                구분했습니다. 응급 신호는 알림으로 확인하고, 활동량과 수면 등
                일주일의 변화는 주간 AI 리포트에서 볼 수 있도록 했습니다.
              </p>
              <p>
                관제센터의 정기적인 안부 전화와 말벗 서비스도 돌봄에
                포함했습니다. 상담자는 라이프로그와 ADL, 사전 인터뷰를 참고해
                대상자와 대화를 나누고, 정서 상태와 상담 내용을 보호자에게
                전달했습니다. 앱으로 확인하는 생활 정보에 사람의 안부 확인을
                더해 신체 활동과 정서 변화를 함께 살필 수 있도록 했습니다.
              </p>
            </div>
          </div>
        </section>
        <section
          className={`${styles.section} ${styles.skySection}`}
          aria-labelledby="subject-title"
        >
          <div className={styles.inner}>
            <p className={styles.sectionLabel}>Daily Care</p>
            <div className={styles.editorialGrid}>
              <h2 id="subject-title">대화와 운동으로 함께하는 일상</h2>
              <div className={styles.bodyCopy}>
                <p>
                  상태를 확인하는 기능만으로는 대상자가 앱을 계속 사용할 이유가
                  부족했습니다. 일상 대화와 복약 안내, 맞춤 운동 코스를 넣어
                  생활 속에서 이용할 수 있도록 기획했습니다. 챗봇과 대화를
                  나누고, 복약 알림을 확인하며 일상적인 안부 확인이 이어지도록
                  구성했습니다.
                </p>
              </div>
            </div>
            <Screens
              items={subjectScreens}
              label="대상자 앱 화면 3개. 좁은 화면에서는 가로로 스크롤할 수 있습니다."
            />
            <p className={styles.screenNote}>
              화면은 원본 기획 자료이며, 표시된 수치와 문구는 예시입니다.
            </p>
            <div className={styles.supportingCopy}>
              <p>
                운동 코스와 활동 목표는 외출과 신체 활동에 참여할 계기로
                마련했습니다. 목표를 달성하면 리워드를 제공하고, 활동 내역과
                보상 기록을 확인할 수 있게 해 다음 활동으로 이어지도록 했습니다.
              </p>
            </div>
          </div>
        </section>

        <section
          id="results"
          className={styles.section}
          aria-labelledby="results-title"
        >
          <div className={styles.inner}>
            <p className={styles.sectionLabel}>Result</p>
            <div className={styles.editorialGrid}>
              <h2 id="results-title">현장 실증과 서비스 운영</h2>
              <div className={styles.bodyCopy}>
                <p>
                  스마트빌리지에서는 이 연구를 실제 돌봄 현장에 적용했습니다.
                  사업 제안과 PM, 관제 대시보드 및 대상자 앱 기획을 맡아 생활
                  패턴의 이상 확인부터 현장 대응까지 실증했습니다.
                </p>
              </div>
            </div>
            <div className={styles.resultsGrid}>
              <div>
                <span>사업 제안</span>
                <strong>연 15억 원</strong>
                <p>주관기관 기준 사업비 확보</p>
              </div>
              <div>
                <span>사업 성과</span>
                <strong>장관상 수상</strong>
                <p>스마트빌리지 보급 및 확산 사업 우수사례 선정</p>
              </div>
              <div>
                <span>담당 범위</span>
                <strong>연구 · 실증 · PM</strong>
                <p>연구 및 현장 실증 · 사업 운영 · 대시보드 / 앱 기획</p>
              </div>
            </div>
            <Link className={styles.nextProject} href="/works">
              다른 프로젝트 보기 <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
