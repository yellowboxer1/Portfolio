"use client";

import Image from "next/image";
import React from "react";
import Header from "../../../components/Header";
import styles from "./resume.module.css";

type SectionProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

type ExperienceItemProps = {
  company: string;
  role: string;
  period: string;
  children: React.ReactNode;
};

type ProjectItemProps = {
  title: string;
  role?: string;
  contribution?: string;
  host?: string;
  details?: string;
};

const formatDuration = (totalMonths: number) => {
  if (totalMonths <= 0) {
    return "1개월";
  }

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years > 0 && months > 0) {
    return `${years}년 ${months}개월`;
  }

  if (years > 0) {
    return `${years}년`;
  }

  return `${months}개월`;
};

const experiencePeriodMap = {
  partnerit: "2025.04 ~ 재직 중",
  gati: "2025.06 ~ 재직 중",
  nsdevil: "2024.07 ~ 2024.12",
  zeroweb: "2022.03 ~ 2023.10",
  laoncomes: "2020.10 ~ 2022.01",
} as const;

const experiencePeriods = Object.values(experiencePeriodMap);

const getPeriodRange = (period: string) => {
  const [startText, endText] = period.split("~").map((value) => value.trim());
  const startMatch = startText.match(/^(\d{4})\.(\d{2})$/);

  if (!startMatch || !endText) {
    return null;
  }

  const startYear = Number(startMatch[1]);
  const startMonth = Number(startMatch[2]);
  const startIndex = startYear * 12 + startMonth - 1;
  const isCurrent = endText.includes("재직");

  if (isCurrent) {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const endExclusive = currentYear * 12 + currentMonth;

    return { startIndex, endExclusive };
  }

  const endMatch = endText.match(/^(\d{4})\.(\d{2})$/);

  if (!endMatch) {
    return null;
  }

  const endYear = Number(endMatch[1]);
  const endMonth = Number(endMatch[2]);
  const endExclusive = endYear * 12 + endMonth;

  return { startIndex, endExclusive };
};

const calculateDurationMonths = (period: string) => {
  const range = getPeriodRange(period);

  if (!range) {
    return 0;
  }

  return Math.max(range.endExclusive - range.startIndex, 0);
};

const calculateDuration = (period: string) =>
  formatDuration(calculateDurationMonths(period));

const calculateTotalExperienceMonths = () => {
  const ranges = experiencePeriods
    .map(getPeriodRange)
    .filter((range): range is NonNullable<typeof range> => Boolean(range))
    .sort((a, b) => a.startIndex - b.startIndex);

  const mergedRanges = ranges.reduce<typeof ranges>((merged, range) => {
    const previous = merged[merged.length - 1];

    if (!previous || range.startIndex > previous.endExclusive) {
      merged.push({ ...range });
      return merged;
    }

    previous.endExclusive = Math.max(previous.endExclusive, range.endExclusive);
    return merged;
  }, []);

  return mergedRanges.reduce(
    (total, range) => total + range.endExclusive - range.startIndex,
    0,
  );
};

const calculateTotalExperience = () =>
  formatDuration(calculateTotalExperienceMonths());

const calculateCareerYear = () => {
  const totalMonths = calculateTotalExperienceMonths();

  return Math.max(Math.floor(totalMonths / 12) + 1, 1);
};

const Section = ({ title, subtitle, children }: SectionProps) => (
  <section
    className={`${styles.section} mb-12 flex border-t-[1.5px] border-[#333] pt-12 max-md:flex-col max-md:gap-5`}
  >
    <div className={`${styles.sectionLabel} w-[150px] shrink-0 max-md:w-full`}>
      <h2 className="text-[20px] font-bold leading-tight">{title}</h2>
      {subtitle && (
        <div className="mt-2 text-[14px] font-medium text-gray-500">
          {subtitle}
        </div>
      )}
    </div>
    <div className={`${styles.sectionContent} flex-1`}>{children}</div>
  </section>
);

const ExperienceItem = ({
  company,
  role,
  period,
  children,
}: ExperienceItemProps) => (
  <div className={`${styles.experienceItem} mb-8 last:mb-0`}>
    <div className={styles.experienceHeader}>
      <div
        className={`${styles.experienceTitleRow} mb-1 flex items-start justify-between gap-5 max-md:flex-col max-md:gap-1`}
      >
        <h3 className="text-[20px] font-bold">{company}</h3>
        <div className={styles.experiencePeriod}>{period}</div>
      </div>
      <div className={styles.experienceRoleRow}>
        <div className="font-medium">{role}</div>
        <div>{calculateDuration(period)}</div>
      </div>
    </div>
    <div className={styles.experienceBody}>{children}</div>
  </div>
);

const ProjectItem = ({
  title,
  role,
  contribution,
  host,
  details,
}: ProjectItemProps) => (
  <div className="mb-6 last:mb-0">
    <h4 className="mb-2 text-[15px] font-semibold">{title}</h4>
    <div className="space-y-1 text-[13.5px]">
      {role && (
        <div>
          <span className="mr-2 text-gray-600">주요 역할 :</span>
          {role}
        </div>
      )}
      {contribution && (
        <div>
          <span className="mr-2 text-gray-600">기여도 :</span>
          {contribution}
        </div>
      )}
      {host && (
        <div>
          <span className="mr-2 text-gray-600">주관 :</span>
          {host}
        </div>
      )}
      {details && (
        <div className="mt-1.5 flex max-md:flex-col">
          <span className="mr-2 shrink-0 text-gray-600">업무 상세 :</span>
          <span className="whitespace-pre-wrap">{details}</span>
        </div>
      )}
    </div>
  </div>
);

const Resume = () => {
  const careerYear = calculateCareerYear();

  const handleBack = () => {
    window.location.href = "/#about";
  };

  const handleDownload = () => {
    const previousTitle = document.title;
    const today = new Date();
    const dateText = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0"),
    ].join("");

    document.title = `resume_박건호_${dateText}`;
    window.print();
    window.setTimeout(() => {
      document.title = previousTitle;
    }, 500);
  };

  return (
    <div className={styles.pageScope}>
      <Header variant="light" />

      <button
        type="button"
        className={styles.projectBackButton}
        onClick={handleBack}
      >
        <span className={styles.projectBackArrow} aria-hidden="true">
          ←
        </span>
        <span className={styles.projectBackLabel}>Back</span>
      </button>

      <div className={styles.page}>
        <div className={styles.contentColumn}>
          <button
            type="button"
            className={styles.downloadButton}
            onClick={handleDownload}
          >
            이력서 다운로드
          </button>

          <div>
            <div className={styles.sheet}>
              <header className={styles.resumeHeader}>
                <div className={styles.profileText}>
                  <h1 className="mb-5 text-[32px] font-extrabold tracking-wide">
                    박건호
                  </h1>

                  <table className={styles.profileInfoTable}>
                    <tbody>
                      <tr>
                        <td className={styles.profileInfoLabel}>
                          인적사항
                        </td>
                        <td className={styles.profileInfoValue}>
                          남성 (1995년생)
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.profileInfoLabel}>
                          전화번호
                        </td>
                        <td className={styles.profileInfoValue}>
                          01054756150
                        </td>
                      </tr>
                      <tr>
                        <td className={styles.profileInfoLabel}>
                          이메일
                        </td>
                        <td className={styles.profileInfoValue}>
                          yellowboxer1@naver.com
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <Image
                  src="/증명사진.png"
                  alt="박건호 증명사진"
                  width={115}
                  height={150}
                  className={styles.profilePhoto}
                />
              </header>

              <div className="mb-12 text-[15px] leading-6.5 tracking-[-0.01em]">
                <p>
                  {careerYear}년 차 기획자로 스타트업에서 웹과 앱 서비스를
                  기획/운영 하였습니다.
                </p>
                <p>
                  R&amp;D 사업 운영/기획을 주로 담당했으며, 필요에 따라
                  PO(Product Owner) 및 서비스 기획 역할을 겸했습니다.
                </p>
                <p>
                  입사 후 30억 사업을 수주하고, 근무 기간 내 매출 150% 성장,
                  영업 이익 최초 흑자 전환을 견인했습니다.
                </p>
              </div>

              <Section
                title="경력"
                subtitle={`총 ${calculateTotalExperience()}`}
              >
                <ExperienceItem
                  company="(주)파트너잇"
                  role="수석연구원 / 연구개발전담부서"
                  period={experiencePeriodMap.partnerit}
                >
                  <p className="mb-2 text-[15px] font-semibold">
                    AI 기반 정부지원사업 매칭서비스 파트너잇 TPM 및 서비스 기획
                  </p>
                  <ol className="ml-1 list-inside list-decimal space-y-1 text-[13.5px]">
                    <li>
                      애자일 프로세스 기반 프로젝트 매니징 (스크럼 단위 : 2주)
                    </li>
                    <li>
                      서비스 기획 (웹 대시보드 기획, 시스템 플로우, IA, 표준
                      프로토타입 제작, 어드민페이지등 서비스기획 전반)
                    </li>
                    <li>
                      사업 기획 (IR, 사업제안서, 고객분석, 사업개발 - 디딤돌
                      R&amp;D, 청년창업사관학교 수주)
                    </li>
                    <li>
                      특허출원 (람다-다중 적합도 기반 알고리즘 개발 및 계산식
                      관련 특허 출원)
                    </li>
                  </ol>
                </ExperienceItem>

                <ExperienceItem
                  company="같이가치(GATI)"
                  role="대표"
                  period={experiencePeriodMap.gati}
                >
                  <p className="mb-2 text-[15px] font-semibold">
                    AI 및 빅데이터기반 시각장애인 보행보조서비스
                    &quot;가치가개&quot; 총괄 기획, 런칭, 개발
                  </p>
                  <ol className="ml-1 list-inside list-decimal space-y-1 text-[13.5px]">
                    <li>
                      실시간 장애물 감지 기능 개발 (Yolo8vn 기반 학습 및 개발)
                    </li>
                    <li>
                      Voice-All-In-One 기능 개발 (Expo-Av 엔진 기반 음성 STT,
                      텍스트 전처리, 클라이언트 앱 API 연동)
                    </li>
                    <li>프로토 타입 앱 기획 및 개발</li>
                  </ol>
                  <p className="mt-2 text-[13.5px] font-medium">
                    ※ 부산광역시 공공 빅데이터활용 창업경진대회 우수상 수상
                  </p>
                </ExperienceItem>

                <ExperienceItem
                  company="엔에스데블"
                  role="팀원/대리 / 미래교육 플랫폼 사업팀"
                  period={experiencePeriodMap.nsdevil}
                >
                  <p className="mb-2 text-[15px] font-bold">
                    혁신융합대학 프로젝트 관리 및 서비스기획
                  </p>
                  <div className="ml-1 space-y-1 text-[13.5px]">
                    <p>
                      - 바이오헬스 혁신융합대학 (coss), 사회구조 선도
                      혁신융합대학 (Huss) 사업 관리 및 운영
                    </p>
                    <p>- 그린바이오 혁신융합대학 추가 제안</p>
                  </div>
                </ExperienceItem>

                <ExperienceItem
                  company="(주)제로웹"
                  role="선임/사업전략부"
                  period={experiencePeriodMap.zeroweb}
                >
                  <div className="mb-4 space-y-1 text-[13.5px]">
                    <p>
                      IoT 융합 기술로 얻은 입출입, 체류시간 등 다양한 오프라인
                      데이터를 통해 디지털 사회 안전망 구축
                    </p>
                    <div className="ml-1 mt-1">
                      <p>- B2B, B2G 사업계획서 작성</p>
                      <p>- Waterfall model 기반 프로젝트 기획 및 운영</p>
                      <p>- 앱/대시보드 기획 등</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="my-3 text-[16px] font-bold">* 주요 프로젝트</p>
                    <ProjectItem
                      title="2023 스마트 빌리지 지원사업 (2023.03~2023.10)"
                      role="IT Project manager, app-platform Planner"
                      contribution="70%"
                      host="MSIT, NIPA"
                      details={`빅데이터 기반 1인 가구 돌봄 서비스 사업 운영 및 프로젝트 매니징,
대시보드 기획 및 설계, 대상자 피보호자 앱 기획
사업 제안을 통한 연 15억원 사업비 확보`}
                    />
                    <ProjectItem
                      title="공공조달 연계 R&D 실증 사업화 지원 사업 (2022.05 ~ 2023.09)"
                      role="IT Project manager"
                      contribution="80%"
                      host="MSIT"
                      details={`1인 가구 홀몸 노인 대상 라이프로그 추출을 위한 행동 분석 및 기획
ADL 추출, 특허 출원 등 R&D 과제 운영`}
                    />
                    <ProjectItem
                      title="2021 스마트시티 챌린지 사업 (2022.04~2023.07)"
                      role="교통약자 네비게이션 앱 기획, 데이터 분석"
                      contribution="40%"
                      host="국토교통부, 부산교통공사"
                      details={`부산 도시철도 내 실내 배리어 프리 내비게이션 구축을 위한 실무 수행
교통 약자 내비게이션 앱 기획 및 데이터 분석`}
                    />
                  </div>
                </ExperienceItem>

                <ExperienceItem
                  company="라온코메스(주)"
                  role="대리/지역개발부"
                  period={experiencePeriodMap.laoncomes}
                >
                  <div className="mb-4 space-y-1 text-[13.5px]">
                    <p>
                      지역자산과 민간조직을 활용하여 지역 특화 산업을
                      고도화하고, 사회적 일자리를 창출하여 자립적 거점도모
                    </p>
                    <div className="ml-1 mt-1">
                      <p>- 지역 발전 계획 수립</p>
                      <p>- 국책과제 수행 및 운영</p>
                      <p>- 도시 재생 및 농촌 계획수립</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="mb-3 font-bold">* 주요 프로젝트</p>
                    <ProjectItem
                      title="사천시 어촌 뉴딜 300 예비 계획 (2021.06~2021.10)"
                      role="농촌 계획 및 전략 기획"
                      contribution="80%"
                      host="해양수산부"
                      details={`예비 계획 수립 총괄 및 설계
갯섬항, 안도항, 상촌항 3개항 전체 예비 계획 총괄 및 예비계획서 작성
사업 선정을 통한 국비 62억 원 수주`}
                    />
                    <ProjectItem
                      title="삼산면 기초생활거점 개발사업 (2020.12 ~ 2021.10)"
                      role="농촌 계획 및 국책 과제 수행"
                      contribution="100%"
                      host="농림축산식품부"
                      details="기본 계획 전체 총괄 및 설계, BC분석, 시군 발전 계획 총괄 설계"
                    />
                    <ProjectItem
                      title="함양군 신활력플러스 기본계획 (2020.10~2021.01)"
                      role="농촌 계획 및 전략 기획"
                      contribution="50%"
                      host="농림축산식품부"
                      details="기본 계획 설계, 함양 항노화 엑스포와 연계한 기본계획 수립 및 사업 변경을 통한 농림부 승인 유도"
                    />
                  </div>
                </ExperienceItem>
              </Section>

              <Section title="학력">
                <div className="flex items-start justify-between gap-5 max-md:flex-col max-md:gap-1">
                  <div>
                    <h3 className="mb-1 text-[15px] font-bold">동의대학교</h3>
                    <div className="text-[14px] text-gray-700">학사 / 사학</div>
                  </div>
                  <div className="text-[14px]">2014 - 2020</div>
                </div>
              </Section>

              <Section title="전문 분야 스킬">
                <div className={styles.skillList}>
                  {[
                    "PM 사업기획",
                    "사업관리",
                    "서비스기획",
                    "프로젝트관리",
                    "PMO",
                    "Agile",
                    "웹기획",
                  ].map((skill) => (
                    <span key={skill} className={styles.skillChip}>
                      {skill}
                    </span>
                  ))}
                </div>
              </Section>

              <Section title="수상 및 기타이력">
                <ul className="space-y-1.5 text-[14px]">
                  <li>• 부산관광공사 한복체험관 명칭 공모 대상</li>
                  <li>• 부산광역시 공공빅데이터 활용 창업경진대회 우수상</li>
                </ul>
              </Section>

              <Section title="자격증">
                <ul className="space-y-1.5 text-[14px]">
                  <li>• SQLD</li>
                  <li>• 중등학교2급정교사(역사)</li>
                  <li>• 한국사능력검정시험 1급</li>
                  <li>• 컴퓨터활용능력 3급</li>
                  <li>• 워드프로세서 2급</li>
                </ul>
              </Section>

              <Section title="포트폴리오">
                <div className="flex flex-col space-y-2 text-[14px]">
                  <div className="flex max-md:flex-col max-md:gap-1">
                    <span className="w-24 font-semibold">웹사이트</span>
                    <a
                      href="https://gunho-park.vercel.app/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-600 hover:underline"
                    >
                      • https://gunho-park.vercel.app/
                    </a>
                  </div>
                  <div className="flex max-md:flex-col max-md:gap-1">
                    <span className="w-24 font-semibold">깃허브</span>
                    <a
                      href="https://github.com/yellowboxer1/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-600 hover:underline"
                    >
                      • https://github.com/yellowboxer1/
                    </a>
                  </div>
                </div>
              </Section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
