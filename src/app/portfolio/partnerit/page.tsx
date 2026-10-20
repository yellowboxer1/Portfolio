import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/src/components/Header";
import ProjectBackButton from "@/src/components/ProjectBackButton";
import ProjectIntroSection from "@/src/components/ProjectIntroSection";
import ServicesOverview from "./ServicesOverview";
import WorkImage from "./WorkImage";
import BackgroundSection from "./BackgroundSection";
import GlassLogo from "./GlassLogo";
import { BusinessPlanSection, CollaborationSection, DataCollectionSection, ValidationSection } from "./CaseStudySections";
import { chapters, partnerItIntro, reportNotes, specificationRules } from "./case-study";
import styles from "./page.module.css";
import imageAssets from "./image-assets.json";

export const metadata: Metadata = {
  title: "Partnerit",
  description: "AI 기반 공고·컨소시엄 매칭 서비스 파트너잇. PM으로 수행한 알고리즘 연구와 개발 명세, 특허 출원, 서비스 기획과 IR을 소개합니다.",
};

export default function PartnerItPortfolioPage() {
  return (
    <main className={styles.page}>
      <Header aboutHref="/#about" />
      <ProjectBackButton href="/#selected-works" />
      <article aria-label="파트너잇 PM 포트폴리오">
        <section className={styles.cover} aria-labelledby="partnerit-title">
          <GlassLogo />
          <div className={styles.coverCopy}>
            <h1 id="partnerit-title">기업의 기회를 발견하고,<br /> 함께 <span>성장</span>할 수 있도록</h1>
          </div>
          <div className={styles.coverBottom}>
            <Image src={imageAssets["wordmark.webp"].src} width={509} height={130} alt="PARTNER IT" priority unoptimized />
            <p>2025.04 – 진행 중<span>알고리즘 연구 · 특허 출원 · 서비스 기획 · IR</span></p>
          </div>
        </section>

        <ProjectIntroSection {...partnerItIntro} />
        <nav className={styles.chapters} aria-label="파트너잇 프로젝트 목차">
          {chapters.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}
        </nav>

        <ServicesOverview />

        <BackgroundSection />

        <DataCollectionSection />

        <section id="research" className={`${styles.section} ${styles.lavender}`} aria-labelledby="research-title">
          <div className={styles.inner}>
            <header className={styles.splitHeading}>
              <div><p className={styles.kicker}>Algorithm Research</p><h2 id="research-title">추천하기 전에,<br /> <em>지원할 수 있는지부터</em></h2></div>
              <div className={styles.bodyCopy}><p>기술이 잘 맞는 공고라도 소재지나 기업 유형이 조건과 다르면 지원할 수 없습니다. 이런 공고에 높은 점수를 보여주면 기업이 지원 가능성을 잘못 판단할 수 있다고 보았습니다. 그래서 지원 자격과 역량 적합도를 분리하고, 필수 조건을 통과한 공고에 대해서만 점수를 계산하는 순서로 설계했습니다.</p></div>
            </header>
            <ol className={styles.algorithmFlow}>
              <li><span>INPUT</span><h3>서로 다른 정보를<br /> 비교 가능한 항목으로</h3><p>OCR·NLP로 공고의 자격요건·제외 조건·가점을 추출하고, 기업의 기술·실적·인증·재무정보를 구조화합니다.</p></li>
              <li><span>GATE</span><h3>필수 조건을<br /> 먼저 판정</h3><p>지원에 필요한 조건 중 하나라도 충족하지 못하면 적합도 계산 대상에서 제외합니다.</p></li>
              <li><span>SCORING</span><h3>역량별로 비교해<br /> 적합도 산출</h3><p>기술·수행·인증·재무·조직·사업역량을 점수로 환산하고, 항목별 가중치를 적용합니다.</p></li>
            </ol>
            <div className={styles.specification}>
              <div className={styles.specTitle}><p className={styles.kicker}>Development Specification</p><h3>계산식뿐 아니라,<br /> 실제 구현에서 생길<br /> 예외까지 정리했습니다</h3><p>추천 결과를 설명하려면 점수가 어떤 기준으로 나왔는지 확인할 수 있어야 했습니다. 같은 입력에 같은 결과가 나오도록 계산 규칙을 정하고, LLM은 산출된 결과를 해석하고 설명하는 역할로 구분했습니다. 개발 과정에서도 이 기준을 공유할 수 있게 계산 순서와 입력값, 점수 범위와 예외 처리를 명세로 작성했습니다.</p></div>
              <div className={styles.rules}>{specificationRules.map((rule) => <article key={rule.title}><h4>{rule.title}</h4><p>{rule.body}</p></article>)}</div>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.patent}`} aria-labelledby="patent-title">
          <div className={styles.inner}>
            <div className={styles.patentLayout}>
              <header><p className={styles.kicker}>Intellectual Property</p><h2 id="patent-title">연구한 매칭 구조를<br /> 특허로 정리했습니다</h2><p className={styles.patentDescription}>공고의 조건과 기업의 역량을 비교해 적합도를 산출하고, 부족한 역할을 가진 기업을 추천하는 구조를 서비스 제공 방법과 함께 정리했습니다.</p></header>
              <div className={styles.patentRecord}>
                <span className={styles.recordLabel}>PATENT APPLICATION</span>
                <h3>가중 적합도 기반 공고·컨소시엄 자동 매칭 알고리즘 및 이를 이용한 서비스 제공 방법</h3>
                <dl><div><dt>출원번호</dt><dd>10-2025-0193491</dd></div><div><dt>출원일</dt><dd>2025.12.09</dd></div><div><dt>발명자</dt><dd>박건호</dd></div><div><dt>출원인</dt><dd>주식회사 파트너잇</dd></div></dl>
              </div>
            </div>
          </div>
        </section>

        <section id="product" className={`${styles.section} ${styles.product}`} aria-labelledby="product-title">
          <div className={styles.inner}>
            <header className={styles.sectionHeading}><p className={styles.kicker}>Service Planning</p><h2 id="product-title">기업 정보가 추천의 기준이 되고,<br /> 분석 결과가 <em>다음 판단으로</em></h2><p>기업 프로필을 입력하는 과정부터 공고를 비교하고, 리포트를 읽고, 파트너를 찾는 과정까지 하나의 흐름으로 기획했습니다.</p></header>
            <article className={styles.feature}>
              <div className={styles.featureHeading}><div><p className={styles.featureLabel}>01 / COMPANY PROFILE</p><h3>한 번 입력한 기업 정보로<br /> 공고와 파트너를 비교</h3></div><p>기업 정보를 공고마다 다시 대조하는 부담을 줄이고자 했습니다. 업력·소재지처럼 지원 자격을 판단하는 정보와 기술·수행 이력·인증처럼 역량을 비교하는 정보를 나눠 프로필을 구성했습니다. 한 번 정리한 기업 정보를 공고 추천과 리포트, 파트너 탐색에서 함께 활용하는 기준으로 삼았습니다.</p></div>
              <WorkImage file="profile-current.webp" width={1920} height={1203} alt="기업 기본정보와 역량별 정보를 구성하는 파트너잇 기업 프로필 화면" caption="Company Profile · 기업 정보 및 역량 관리" />
            </article>
            <article className={styles.feature}>
              <div className={styles.featureHeading}><div><p className={styles.featureLabel}>02 / NOTICE MATCHING</p><h3>목록에서 비교하고,<br /> 선택한 공고를 바로 확인</h3></div><p>여러 공고를 비교할 때마다 상세 페이지를 오가면 앞서 본 조건을 기억해야 합니다. 탐색 중인 목록을 유지한 채 선택한 공고의 요약·신청 대상·지원 규모를 옆에서 확인하게 했습니다. 공고를 읽는 중에도 다른 후보와 비교할 수 있도록 화면을 구성했습니다.</p></div>
              <WorkImage file="notices-current.webp" width={1920} height={1396} alt="추천 목록과 선택한 공고의 상세 내용을 함께 보여주는 파트너잇 맞춤 공고 화면" caption="Notice Matching · 맞춤 공고 및 상세 정보" />
            </article>
          </div>
        </section>

        <section id="report" className={`${styles.section} ${styles.reportSection}`} aria-labelledby="report-title">
          <div className={styles.inner}>
            <header className={styles.sectionHeading}><p className={styles.kicker}>AI Analysis Report</p><h2 id="report-title">왜 추천하는지,<br /> <em>무엇을 준비해야 하는지</em></h2><p>점수 하나로 지원 여부를 결정하기는 어렵습니다. 종합 판단에서 시작해 기업의 강점과 부족한 역량, 공고의 세부 조건까지 차례로 확인하도록 리포트를 구성했습니다.</p></header>
            <div className={styles.reportLayout}>
              <WorkImage file="report-current.webp" width={1275} height={1791} alt="종합진단, 역량분석, 공고분석으로 구성된 파트너잇 최신 AI 분석 리포트 전체 화면" caption="AI Report · 종합진단 → 역량분석 → 공고분석" sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1100px) calc(58.33vw - 79px), 684px" />
              <div className={styles.reportNotes}>{reportNotes.map((note) => <article key={note.part}><p>{note.part}</p><h3>{note.title}</h3><p>{note.body}</p></article>)}<div className={styles.reportPrinciple}><p className={styles.kicker}>기획 의도</p><h3>추천을 받은 뒤에도 판단할 근거가 필요했습니다</h3><p>높은 점수만 보여주면 부족한 요건이나 준비할 내용을 놓칠 수 있습니다. 먼저 요약으로 검토할 공고를 좁히고, 역량 분석과 세부 조건을 읽으며 지원 여부를 판단하는 순서로 구성했습니다. 확인이 필요한 요건은 따로 구분하고, 부족한 역할은 파트너 탐색으로 연결했습니다.</p></div></div>
            </div>
          </div>
        </section>

        <BusinessPlanSection />

        <section className={styles.section} aria-labelledby="consortium-title">
          <div className={styles.inner}>
            <div className={styles.featureHeading}><div><p className={styles.kicker}>Consortium Matching</p><h2 id="consortium-title">부족한 역할을 채울<br /> 파트너와 함께</h2></div><div className={styles.bodyCopy}><p>기술이 비슷한 기업을 찾는 것만으로는 컨소시엄이 완성되지 않습니다. 해당 사업에 어떤 역할이 부족한지 먼저 파악하고, 그 역할을 맡을 수 있는 기업을 연결하는 데 초점을 맞췄습니다. 호스트는 필요한 역할을 모집하고, 참여 기업은 자신의 기술과 수행 이력에 맞는 사업을 찾는 양방향 구조로 설계했습니다.</p><p>연결된 뒤에도 서로의 역할과 참여 조건을 다시 확인해야 합니다. 매칭룸에 호스트 정보, 모집 역할, 참여 현황을 모아두고, 같은 사업 정보를 보면서 초대·참여 신청·채팅으로 이어지게 했습니다.</p></div></div>
            <WorkImage file="consortium-current.webp" width={1920} height={1080} alt="호스트 기업의 역량과 모집 역할, 참여 현황을 보여주는 파트너잇 컨소시엄 매칭룸" caption="Consortium Matching · 호스트 정보 및 참여 현황" />
          </div>
        </section>

        <CollaborationSection />

        <section id="business" className={styles.section} aria-labelledby="business-title">
          <div className={styles.inner}>
            <header className={styles.splitHeading}><div><p className={styles.kicker}>IR & Business Planning</p><h2 id="business-title">기술 설명에서<br /> <em>사업의 가치까지</em></h2></div><div className={styles.bodyCopy}><p>IR과 서비스 소개서에서는 기업이 공고를 찾고 판단하는 데 겪는 문제부터 설명했습니다. 공고 탐색, 파트너 구성, 협업의 각 단계에서 서비스가 어떤 시간을 줄여주는지 정리하고, 이를 매칭 기술과 구독 모델로 설명했습니다.</p><p>기술개발계획서에는 연구할 내용과 검증 목표를, 개발 명세에는 실제 구현 기준을 담았습니다. PM으로서 연구·기획·개발의 우선순위를 조율하면서 사업제안서와 R&D 과제 기획도 함께 수행했습니다.</p></div></header>
            <div className={styles.businessOutputs}>
              <article><p className={styles.featureLabel}>CUSTOMER & VALUE</p><h3>문제와 고객</h3><p>분산된 공고를 찾고 자격을 확인하는 과정, 기존 네트워크에 의존하던 파트너 탐색을 고객의 문제로 정리했습니다.</p></article>
              <article><p className={styles.featureLabel}>TECHNOLOGY & PRODUCT</p><h3>기술과 서비스</h3><p>공고 수집·정규화, 지원 자격 확인과 적합도 계산이 기업의 판단을 어떻게 돕는지 서비스 흐름으로 설명했습니다.</p></article>
              <article><p className={styles.featureLabel}>BUSINESS & VALIDATION</p><h3>사업모델과 검증</h3><p>기업 성장 단계에 따른 구독 플랜을 구성하고, 프로토타입 사용 의견과 업무 전후의 변화로 서비스의 효용을 설명했습니다.</p></article>
            </div>
            <div className={styles.pmSummary}><p className={styles.kicker}>My Contribution</p><p>매칭 기준 연구와 개발 명세 작성 → 서비스 구조·화면 기획 → 개발 우선순위 조율 → 특허 출원 및 IR·사업 기획</p></div>
          </div>
        </section>

        <ValidationSection />
      </article>
    </main>
  );
}
