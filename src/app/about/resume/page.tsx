"use client";

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
  duration: string;
  children: React.ReactNode;
};

type ProjectItemProps = {
  title: string;
  role?: string;
  contribution?: string;
  host?: string;
  details?: string;
};

const Section = ({ title, subtitle, children }: SectionProps) => (
  <section className={`${styles.section} mb-12 flex border-t-[2px] border-black pt-8 max-md:flex-col max-md:gap-5`}>
    <div className="w-[150px] shrink-0 max-md:w-full">
      <h2 className="text-[16px] font-bold leading-tight">{title}</h2>
      {subtitle && <div className="mt-2 text-[13px] text-gray-500">{subtitle}</div>}
    </div>
    <div className="flex-1">{children}</div>
  </section>
);

const ExperienceItem = ({
  company,
  role,
  period,
  duration,
  children,
}: ExperienceItemProps) => (
  <div className={`${styles.experienceItem} mb-12 last:mb-0`}>
    <div className="mb-1 flex items-start justify-between gap-5 max-md:flex-col max-md:gap-1">
      <h3 className="text-[16px] font-bold">{company}</h3>
      <div className="text-right text-[14px] text-gray-800 max-md:text-left">
        <span>{period}</span>
        <span className="inline-block w-[60px] max-md:ml-2 max-md:w-auto">{duration}</span>
      </div>
    </div>
    <div className="mb-4 text-[14px] text-gray-600">{role}</div>
    <div className="text-gray-900">{children}</div>
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
    <h4 className="mb-2 text-[14px] font-bold">{title}</h4>
    <div className="space-y-1 text-[13px]">
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
  const handleBack = () => {
    window.location.href = "/#about";
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className={styles.pageScope}>
      <Header variant="light" />

      <button type="button" className={styles.projectBackButton} onClick={handleBack}>
        <span className={styles.projectBackArrow} aria-hidden="true">
          ←
        </span>
        <span className={styles.projectBackLabel}>Back</span>
      </button>

      <div className={styles.page}>
        <div className={styles.contentColumn}>
          <button type="button" className={styles.downloadButton} onClick={handleDownload}>
            이력서 다운로드
          </button>

          <div>
            <div className={styles.sheet}>
              <header className="mb-12 flex items-start max-md:flex-col max-md:gap-6">
                <div className="mr-8 flex h-[150px] w-[115px] shrink-0 items-center justify-center border border-gray-300 bg-gray-50 max-md:mr-0">
                  <span className="text-xs text-gray-400">[Image 1]</span>
                </div>

                <div className="flex-1 pt-1">
                  <h1 className="mb-5 text-[28px] font-extrabold tracking-wide">박건호</h1>

                  <table className="border-collapse text-left text-[14px]">
                    <tbody>
                      <tr>
                        <td className="w-24 pb-1.5 font-medium text-gray-500">인적사항</td>
                        <td className="pb-1.5">남성 (1995년생)</td>
                      </tr>
                      <tr>
                        <td className="w-24 pb-1.5 font-medium text-gray-500">전화번호</td>
                        <td className="pb-1.5">01054756150</td>
                      </tr>
                      <tr>
                        <td className="w-24 pb-1.5 font-medium text-gray-500">이메일</td>
                        <td className="pb-1.5">yellowboxer1@naver.com</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </header>

          <div className="mb-14 text-[14px] leading-7">
            <p>6년 차 기획자로 스타트업에서 웹과 앱 서비스를 기획/운영 하였습니다.</p>
            <p>
              R&amp;D 사업 운영/기획을 주로 담당했으며, 필요에 따라 PO(Product Owner) 및 서비스
              기획 역할을 겸했습니다.
            </p>
            <p>입사 후 30억 사업을 수주하고, 근무 기간 내 매출 150% 성장, 영업 이익 최초 흑자 전환을 견인했습니다.</p>
          </div>

          <Section title="경력" subtitle="총 6년">
            <ExperienceItem
              company="(주)파트너잇"
              role="수석연구원/연구개발전담부서"
              period="2025.04 ~ 재직 중"
              duration="1년"
            >
              <p className="mb-1 font-semibold">AI 기반 정부지원사업 매칭서비스 파트너잇 TPM 및 서비스 기획</p>
              <p className="mb-2 text-[13px] font-semibold text-gray-700">가중적합도 기반 알고리즘 개발</p>
              <ol className="ml-1 list-inside list-decimal space-y-1 text-[13px]">
                <li>애자일 프로세스 기반 프로젝트 매니징 (스크럼 단위 : 2주)</li>
                <li>서비스 기획 (웹 대시보드 기획, 시스템 플로우, IA, 표준 프로토타입 제작, 어드민페이지등 서비스기획 전반)</li>
                <li>사업 기획 (IR, 사업제안서, 고객분석, 사업개발 - 디딤돌 R&amp;D, 청년창업사관학교 수주)</li>
                <li>특허출원 (람다-다중 적합도 기반 알고리즘 개발 및 계산식 관련 특허 출원)</li>
              </ol>
            </ExperienceItem>

            <ExperienceItem
              company="같이가치(GATI)"
              role="대표"
              period="2025.06 ~ 재직 중"
              duration="10개월"
            >
              <p className="mb-1 font-semibold">
                AI 및 빅데이터기반 시각장애인 보행보조서비스 &quot;가치가개&quot; 총괄 기획, 런칭, 개발
              </p>
              <p className="mb-2 text-[13px] font-semibold text-gray-700">예비창업 패키지운영</p>
              <ol className="ml-1 list-inside list-decimal space-y-1 text-[13px]">
                <li>실시간 장애물 감지 기능 개발 (Yolo8vn 기반 학습 및 개발)</li>
                <li>Voice-All-In-One 기능 개발 (Expo-Av 엔진 기반 음성 STT, 텍스트 전처리, 클라이언트 앱 API 연동)</li>
                <li>프로토 타입 앱 기획 및 개발</li>
              </ol>
              <p className="mt-2 text-[13px] font-medium text-black">※ 부산광역시 공공 빅데이터활용 창업경진대회 우수상 수상</p>
            </ExperienceItem>

            <ExperienceItem
              company="엔에스데블"
              role="팀원/대리 / 미래교육 플랫폼 사업팀"
              period="2024.07 ~ 2024.12"
              duration="6개월"
            >
              <p className="mb-1 font-semibold">혁신융합대학 프로젝트 관리 및 서비스기획</p>
              <div className="ml-1 space-y-1 text-[13px]">
                <p>- 바이오헬스 혁신융합대학 (coss), 사회구조 선도 혁신융합대학 (Huss) 사업 관리 및 운영</p>
                <p>- 그린바이오 혁신융합대학 추가 제안</p>
              </div>
            </ExperienceItem>

            <ExperienceItem
              company="(주)제로웹"
              role="선임/사업전략부"
              period="2022.03 ~ 2023.10"
              duration="1년 8개월"
            >
              <div className="mb-4 space-y-1 text-[13px]">
                <p>IoT 융합 기술로 얻은 입출입, 체류시간 등 다양한 오프라인 데이터를 통해 디지털 사회 안전망 구축</p>
                <p>B2B, B2G 사업계획서 작성</p>
                <div className="ml-1 mt-1">
                  <p>- Waterfall model 기반 프로젝트 기획 및 운영</p>
                  <p>- 앱/대시보드 기획 등</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="mb-3 font-bold">* 수행 프로젝트</p>
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
              period="2020.10 ~ 2022.01"
              duration="1년 4개월"
            >
              <div className="mb-4 space-y-1 text-[13px]">
                <p>지역자산과 민간조직을 활용하여 지역 특화 산업을 고도화하고, 사회적 일자리를 창출하여 자립적 거점도모</p>
                <div className="ml-1 mt-1">
                  <p>- 지역 발전 계획 수립</p>
                  <p>- 국책과제 수행 및 운영</p>
                  <p>- 도시 재생 및 농촌 계획수립</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="mb-3 font-bold">* 수행 프로젝트</p>
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
            <div className="flex flex-wrap gap-2 leading-none">
              {["PM 사업기획", "사업관리", "서비스기획", "프로젝트관리", "PMO", "Agile", "웹기획"].map((skill) => (
                <span key={skill} className="border border-gray-300 bg-gray-100 px-3 py-1.5 text-[13px] text-gray-800">
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
              <li>• 중등학교2급정교사(역사)</li>
              <li>• 한국사능력검정시험 1급</li>
              <li>• 컴퓨터활용능력 3급</li>
              <li>• 워드프로세서 2급</li>
              <li>• SQLD</li>
            </ul>
          </Section>

          <Section title="포트폴리오">
            <div className="flex flex-col space-y-2 text-[14px]">
              <div className="flex max-md:flex-col max-md:gap-1">
                <span className="w-24 font-semibold text-gray-800">웹사이트</span>
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
                <span className="w-24 font-semibold text-gray-800">깃허브</span>
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
