import imageAssets from "./image-assets.json";
import Image from "next/image";
import Link from "next/link";
import WorkImage from "./WorkImage";
import { collectionSteps, collaborationFeatures, pilotComparisons, pilotFeedback, planReportNotes } from "./case-study";
import styles from "./page.module.css";

export function DataCollectionSection() {
  return (
    <section id="collection" className={`${styles.section} ${styles.collectionSection}`} aria-labelledby="collection-title">
      <div className={styles.inner}>
        <header className={styles.sectionHeading}><p className={styles.kicker}>Data Collection & Normalization</p><h2 id="collection-title">흩어진 공고를 모으고,<br /> <em>비교할 수 있는 데이터로</em></h2><p>기관마다 문서 형식도, 같은 조건을 표현하는 방식도 달랐습니다. 공고 본문과 첨부파일에서 필요한 조건을 추출하고, 기업 정보와 비교할 수 있도록 공통 항목으로 정리했습니다.</p></header>
        <div className={styles.collectionLayout}>
          <div className={styles.collectionScope}>
            <p className={styles.featureLabel}>공고 수집 범위</p>
            <dl><div><dt>정부·공공기관 등 수집 채널</dt><dd>400<span>여 개</span></dd></div><div><dt>연간 사업 공고 규모</dt><dd>35,000<span>건 이상</span></dd></div></dl>
            <div className={styles.channelList}><span>기업마당</span><span>K-Startup</span><span>NTIS</span><span>IRIS</span><span>부처·지자체·공공기관</span></div>
            <p>공고를 모은 뒤에도 기업이 원문을 다시 읽고 조건을 해석해야 한다면 탐색 부담은 그대로라고 보았습니다. 자격요건·가점·지원제외조건을 각각 비교할 수 있는 항목으로 나누고, 같은 공고가 여러 채널에서 수집돼도 중복 추천되지 않도록 저장 기준을 정했습니다.</p>
          </div>
          <ol className={styles.collectionSteps}>{collectionSteps.map((step, index) => <li key={step.title}><span className={styles.stepNumber}>0{index + 1}</span><div><p className={styles.stepTech}>{step.tech}</p><h3>{step.title}</h3><p>{step.body}</p></div></li>)}</ol>
        </div>
        <div className={styles.normalizedData}><div><p className={styles.featureLabel}>NORMALIZED DATA</p><h3>공고 한 건을 구성하는 8개 항목</h3></div><ul>{["기본정보", "지원분야", "자격요건", "가점사항", "지원제외조건", "평가 기준", "평가 방법", "평가 일정"].map(field => <li key={field}>{field}</li>)}</ul><p>정규화된 공고와 기업 프로필을 비교해 지원 자격을 먼저 확인하고, 기술의 의미적 유사도와 역량별 가중치를 반영해 적합도를 계산합니다.</p></div>
      </div>
    </section>
  );
}

export function BusinessPlanSection() {
  return (
    <section id="business-plan" className={`${styles.section} ${styles.product}`} aria-labelledby="business-plan-title">
      <div className={styles.inner}>
        <header className={styles.sectionHeading}><p className={styles.kicker}>Business Plan Diagnosis</p><h2 id="business-plan-title">사업계획서를 읽고,<br /> <em>먼저 보완할 부분을 찾도록</em></h2><p>지원할 사업을 정한 다음에는 제출할 계획서를 준비해야 합니다. 막연한 총평 대신, 평가 항목별로 현재 수준과 부족한 근거를 짚고 수정할 내용까지 확인할 수 있는 진단 리포트를 기획했습니다.</p></header>
        <div className={styles.planReportLayout}>
          <WorkImage file="plan-diagnosis.webp" width={1920} height={1357} alt="종합 평가, 주요 지표, 핵심 보완 항목을 보여주는 사업계획서 AI 진단 리포트 기획 화면" caption="사업계획서 진단 · 종합 평가 및 주요 지표" sizes="(max-width: 767px) calc(100vw - 40px), 760px" />
          <div className={styles.planReportNotes}>{planReportNotes.map(note => <article key={note.title}><p className={styles.featureLabel}>{note.label}</p><h3>{note.title}</h3><p>{note.body}</p></article>)}</div>
        </div>
        <div className={styles.planComparison}>
          <header><p className={styles.featureLabel}>BENCHMARK COMPARISON</p><h3>고득점 계획서와 비교해,<br /> 보완의 기준을 구체적으로</h3><p>‘시장 근거가 부족하다’는 진단만으로는 무엇을 고쳐야 할지 알기 어렵습니다. 내 계획서와 고득점 계획서의 기준을 항목별로 나란히 배치해, 어떤 근거가 빠졌고 어느 수준까지 보완해야 하는지 확인하게 했습니다. 수정할 내용의 우선순위와 예상 질문도 함께 제공해 계획서를 고치고 발표를 준비하는 데 활용하도록 기획했습니다.</p></header>
          <WorkImage file="plan-comparison.webp" width={1920} height={1357} alt="내 사업계획서와 고득점 사업계획서를 문제인식·실현가능성·성장 전략·추진역량별로 비교하고 수익모델과 단위 경제성 보완을 안내하는 진단 리포트" caption="사업계획서 진단 · 고득점 계획서와의 상세 비교" />
        </div>
        <div className={styles.planDetailGrid}>
          <article><h3>평가 기준과 비교해 보완할 내용 확인</h3><p>문제인식·실현가능성·성장 전략·추진역량을 비교하고, 근거가 부족한 항목부터 고칠 수 있도록 구성했습니다.</p><dl className={styles.planChecklist}>{[
            ["문제인식", "고객 문제와 수요의 근거", "대상 고객이 겪는 문제와 실제 수요를 보여주는 자료가 있는지 확인"],
            ["실현가능성", "구현 범위와 검증 계획", "현재 구현한 범위, 검증 지표, PoC 일정과 대상을 구체화"],
            ["성장 전략", "고객 확보와 매출 산출 논리", "단가·판매량의 근거와 초기 고객 확보 방식, 반복 매출 구조를 보완"],
            ["추진역량", "인력과 협력사의 역할", "현재 인력으로 수행할 범위와 충원 계획, 협력사의 역할을 구분"],
          ].map(([label, title, body]) => <div key={label}><dt>{label}</dt><dd><strong>{title}</strong><p>{body}</p></dd></div>)}</dl></article>
          <article><h3>예상 질문으로 발표 준비까지</h3><p>진단에서 드러난 약점을 예상 질문과 함께 보여주고, 수요 검증·매출 근거·실행계획의 답변을 준비하도록 했습니다.</p><div className={styles.planQuestions}>{[
            ["수익모델", "고객이 비용을 지불할 만큼 수요가 검증되었나요?"],
            ["차별성", "핵심 차별성이 고객 관점에서도 명확하게 입증되었나요?"],
            ["시장수요", "초기 고객은 어떤 방식과 경로로 확보할 계획인가요?"],
            ["실행계획", "현재 인력과 일정으로 제시한 계획을 실행할 수 있나요?"],
          ].map(([label, question]) => <article key={label}><p>{label}</p><h4>{question}</h4></article>)}</div></article>
        </div>
      </div>
    </section>
  );
}

export function CollaborationSection() {
  return (
    <section id="collaboration" className={`${styles.section} ${styles.lavender}`} aria-labelledby="collaboration-title">
      <div className={styles.inner}>
        <header className={styles.sectionHeading}><p className={styles.kicker}>Integrated Collaboration</p><h2 id="collaboration-title">파트너를 찾은 다음에는,<br /> <em>함께 일할 공간까지</em></h2><p>컨소시엄을 구성해도 기업마다 쓰는 협업툴이 다르면 자료와 대화, 일정이 다시 흩어집니다. 매칭 이후에도 같은 프로젝트 안에서 소통하고 산출물을 관리할 수 있도록 통합 협업툴을 기획했습니다.</p></header>
        <div className={styles.collaborationLayout}>
          <div className={styles.collaborationScreen}><WorkImage file="collaboration-chat.webp" width={713} height={1065} alt="컨소시엄 참여 기업이 협의를 이어가는 파트너잇 그룹 채팅 기획 화면" caption="통합 협업툴 · 그룹 채팅 기획" sizes="(max-width: 767px) 280px, 340px" /></div>
          <div className={styles.collaborationFeatures}>{collaborationFeatures.map(feature => <article key={feature.title}><p className={styles.featureLabel}>{feature.label}</p><h3>{feature.title}</h3><p>{feature.body}</p><span>{feature.detail}</span></article>)}</div>
        </div>
        <div className={styles.planningNote}><div><p className={styles.kicker}>기획 의도</p><h3>매칭할 때 정한 역할이<br /> 실제 업무로 이어지도록</h3></div><p>참여 기업이 정해진 뒤 다른 도구에서 팀과 역할을 다시 구성해야 한다면 협업 준비가 반복됩니다. 매칭룸의 참여 기업과 역할 정보를 채팅·문서·일정 관리에서도 이어서 활용하고, 사업별 협의 내용과 산출물을 같은 프로젝트 안에서 관리하는 구조를 기획했습니다.</p></div>
      </div>
    </section>
  );
}

export function ValidationSection() {
  return (
    <section id="results" className={`${styles.section} ${styles.validation}`} aria-labelledby="results-title">
      <div className={styles.inner}>
        <header className={styles.sectionHeading}><p className={styles.kicker}>PoC & Service Validation</p><h2 id="results-title">탐색부터 협업까지,<br /> <em>기업의 업무가 얼마나 줄었는지</em></h2><p>프로토타입 사용 전후의 공고 탐색 시간, 파트너 구성 시도, 협업 자료 취합 시간을 비교했습니다. 기업이 반복하던 작업이 줄었는지 확인하고, 지속 이용 의향과 사용 의견도 함께 살폈습니다.</p></header>
        <div className={styles.planningNote}><div><p className={styles.kicker}>검증 의도</p><h3>실무에서 줄어든 시간과 시도</h3></div><p>공고를 찾고, 협력기업을 구하고, 자료를 모으는 과정의 부담을 줄이는 것이 서비스의 출발점이었습니다. PoC 결과도 이 세 단계의 전후 변화로 살펴봤습니다. 업무에 드는 시간과 시도가 얼마나 줄었는지, 사용한 기업이 이후에도 이용할 의향이 있는지를 함께 확인했습니다.</p></div>
        <div className={styles.comparisonMetrics}>{pilotComparisons.map(metric => <article key={metric.title}>
          <h3>{metric.title}</h3><p className={styles.impactNumber}>{metric.change}<span>%</span></p><p className={styles.impactDescription}>{metric.description}</p>
          <dl className={styles.metricComparison}>
            <div><dt>기존</dt><dd>{metric.before}<span className={styles.metricUnit}>{metric.unit}</span><span className={styles.metricTrack} aria-hidden="true"><span className={styles.beforeBar} /></span></dd></div>
            <div><dt>파트너잇</dt><dd>{metric.after}<span className={styles.metricUnit}>{metric.unit}</span><span className={styles.metricTrack} aria-hidden="true"><span className={styles.afterBar} style={{ width: `${Number(metric.after.replaceAll(",", "")) / Number(metric.before.replaceAll(",", "")) * 100}%` }} /></span></dd></div>
          </dl>
          <p className={styles.impactDetail}>{metric.detail}</p>
        </article>)}</div>
        <p className={styles.surveyNote}>프로토타입 서비스 만족도 조사 · 2026.05.30 · N=78 · 기존 방식과 사용 후 비교</p>
        <div className={styles.validationSummary}><div><p>유료 전환 시 지속 이용 의향</p><strong>92.4<span>%</span></strong><p>프로토타입 테스트 73개 기업 대상<br /> 만족도 조사 · 2026.05</p></div><div><h3>“우리에게 맞는 공고를 찾기 쉬워졌다”</h3><p>반복하던 공고 조회가 간편해졌다는 점, 자격요건에 맞는 사업을 한 번에 볼 수 있다는 점에 대한 의견이 있었습니다. 공고 탐색부터 AI 리포트 확인까지 걸리는 시간이 줄었다는 반응도 확인했습니다.</p></div></div>
        <div className={styles.feedbackHeading}><p className={styles.kicker}>User Feedback</p><h3>프로토타입을 사용한 기업의 의견</h3></div>
        <div className={styles.feedbackGrid}>{pilotFeedback.map(feedback => <figure key={feedback.company}><blockquote>{feedback.quote}</blockquote><figcaption><strong>{feedback.company}</strong><span>{feedback.type} · {feedback.date}</span></figcaption></figure>)}</div>
        <div className={styles.closing}><Image src={imageAssets["wordmark.webp"].src} width={509} height={130} alt="PARTNER IT" unoptimized /><Link href="/works">다른 프로젝트 보기 <span aria-hidden="true">↗</span></Link></div>
      </div>
    </section>
  );
}
