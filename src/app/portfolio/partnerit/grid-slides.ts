type CoverSlide = {
  type: "cover";
  title: string;
  description: string;
  meta: { label: string; value: string }[];
  images: {
    logo: string;
    dashboard: string;
    report: string;
    matching: string;
  };
};

type OverviewSlide = {
  type: "overview";
  kicker: string;
  title: string;
  background: string;
  goals: { title: string; body: string }[];
  comparison: {
    asisBody: string[];
    asis: string[];
    tobeBody: string[];
    tobe: string[];
  };
};

type PreviewSlide = {
  type: "preview";
  kicker: string;
  title: string;
  headline: string;
  body: string;
  images: string[];
  notes: { title: string; body: string }[];
};

type ServiceSlide = {
  type: "service";
  kicker: string;
  title: string;
  images: string[];
  items: { title: string; body: string }[];
};

export type PartnerItGridSlide =
  | CoverSlide
  | OverviewSlide
  | PreviewSlide
  | ServiceSlide;

const asset = (file: string) => `/portfolio/partnerit/landing/${file}`;

export const partnerItGridSlides: PartnerItGridSlide[] = [
  {
    type: "cover",
    title: "AI 기반 지원사업\n매칭 서비스 파트너잇",
    description:
      "기업 데이터와 공고 조건을 AI로 대조해 실제 지원 가능한 사업을 선별하고, 부족한 역량은 컨소시엄 파트너 매칭으로 연결하는 GovTech SaaS 플랫폼입니다.",
    meta: [
      { label: "작업기간", value: "2026.04 - 진행 중" },
      { label: "기여도", value: "PM · Service Planning · AI Matching Logic" },
      { label: "성과", value: "누적 투자 10억 원 · R&D 과제 수주" },
    ],
    images: {
      logo: "/partnerit.png",
      dashboard: asset("hero-dashboard.png"),
      report: asset("ai-report.png"),
      matching: asset("matching-card.png"),
    },
  },
  {
    type: "overview",
    kicker: "Overview",
    title: "지원사업 탐색부터\n컨소시엄 구성까지",
    background: asset("customer-bg.png"),
    goals: [
      {
        title: "공고 탐색 시간 절감",
        body: "연간 7만 건 이상의 공고를 기관별로 직접 확인하던 업무를 자동 수집·분석 구조로 전환해 탐색 시간을 줄입니다.",
      },
      {
        title: "설명 가능한 AI 추천",
        body: "단순 키워드 검색이 아니라 업종, 재무, 수행이력, 가점 조건을 함께 비교해 추천 이유를 리포트로 제공합니다.",
      },
      {
        title: "컨소시엄 네트워크 확장",
        body: "부족한 역할군과 기술 역량을 기준으로 협업 가능한 기업을 추천해 인맥 중심의 파트너 탐색 한계를 줄입니다.",
      },
    ],
    comparison: {
      asisBody: [
        "공고가 부처, 기관, 지자체별로 분산되어 있고 형식도 제각각이라 실제 지원 가능한 사업을 판단하기 어렵습니다.",
        "컨소시엄 파트너 탐색은 기존 인맥에 의존해 지방 기업이나 초기 기업의 참여 기회가 제한됩니다.",
      ],
      asis: ["분산된 공고", "수동 분석", "폐쇄적 네트워크"],
      tobeBody: [
        "기업 프로필과 공고 조건을 AI가 대조해 지원 가능 공고만 선별하고, 자격요건과 가점 근거를 함께 보여줍니다.",
        "기술·역할·수행이력 기반으로 파트너를 추천해 공고 탐색 이후 협업 준비까지 하나의 흐름으로 이어집니다.",
      ],
      tobe: ["AI 선별", "근거 리포트", "파트너 매칭"],
    },
  },
  {
    type: "preview",
    kicker: "Core Feature",
    title: "AI 분석 리포트",
    headline: "하나로 끝내는\n공고 적합도 판단",
    body: "복잡한 공고문에서 자격요건, 가점사항, 경쟁률, 컨소시엄 필요 여부를 추출해 기업 담당자가 바로 판단할 수 있는 리포트로 재구성했습니다.",
    images: [asset("ai-report.png"), asset("hero-dashboard.png")],
    notes: [
      {
        title: "지원 가능성 분석",
        body: "업종 일치도, 기술역량 유사도, 재무 적합성, 수행이력, 가점 충족도를 λ-가중 모델로 계산합니다.",
      },
      {
        title: "추천 근거 제공",
        body: "점수만 보여주지 않고 왜 추천되었는지, 어떤 조건을 보완해야 하는지 리포트 안에서 설명합니다.",
      },
    ],
  },
  {
    type: "preview",
    kicker: "Core Feature",
    title: "컨소시엄 자동 매칭",
    headline: "부족한 역량을\n데이터로 연결",
    body: "기업이 보유한 기술 강점과 부족한 역할군을 분석한 뒤, 사업기획·실증·개발·운영 등 필요한 역량을 가진 파트너를 추천합니다.",
    images: [asset("consortium.png"), asset("matching-card.png")],
    notes: [
      {
        title: "부족 역할군 분석",
        body: "공고 수행 요건과 기업 프로필을 비교해 단독 지원이 어려운 영역을 먼저 식별합니다.",
      },
      {
        title: "양방향 매칭",
        body: "추천 기업의 수행이력과 신뢰도를 함께 확인해 컨소시엄 구성 가능성을 높입니다.",
      },
    ],
  },
  {
    type: "service",
    kicker: "Product Structure",
    title: "기업 프로필 기반\n맞춤 추천 구조",
    images: [asset("hero-dashboard.png"), asset("ai-report.png"), asset("consortium.png")],
    items: [
      {
        title: "기업 데이터 수집",
        body: "기업 개요, 재무정보, 수행이력, 인증·수상, 논문·저서, 지식재산권을 입력받아 분석 기준으로 사용합니다.",
      },
      {
        title: "Gate 조건 필터링",
        body: "업종, 소재지, 기업분류, 재무 조건처럼 반드시 충족해야 하는 공고 조건을 먼저 제거합니다.",
      },
      {
        title: "RAG 기반 리포트 생성",
        body: "공고 문단을 Chunking하고 Embedding한 뒤 기업 데이터와 비교해 근거 중심 리포트를 생성합니다.",
      },
    ],
  },
  {
    type: "service",
    kicker: "Business Model",
    title: "공고 매칭에서\n협업툴까지 확장",
    images: [asset("consortium.png"), asset("hero-dashboard.png"), asset("matching-card.png")],
    items: [
      {
        title: "Starter",
        body: "월 89,000원. 공고 매칭과 AI 리포트를 중심으로 지원사업 탐색과 초기 판단을 돕습니다.",
      },
      {
        title: "Growth",
        body: "월 159,000원. 컨소시엄 매칭과 매칭룸 기능으로 사업 참여 준비 과정을 연결합니다.",
      },
      {
        title: "Pro",
        body: "월 290,000원. 협업툴, 고급 분석, 관리자 기능으로 전주기 SaaS 구조로 확장합니다.",
      },
    ],
  },
];
