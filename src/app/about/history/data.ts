export type HistoryEntry = {
  year: string;
  title: string;
  description: string;
  mPoster: string;
  pcPoster: string;
  videoWebm?: string;
  videoMp4?: string;
  videoClassName?: string;
};

function createHistoryMedia(name: string) {
  const base = `https://cache.wemade.com/wemade/assets/opt_video/aboutus/history/${name}`;

  return {
    mPoster: `${base}-m-poster.webp`,
    pcPoster: `${base}-pc-poster.webp`,
    videoWebm: `${base}-pc.webm`,
    videoMp4: `${base}-pc.mp4`,
  };
}

export const HISTORY_ENTRIES: HistoryEntry[] = [
  {
    year: "2020",
    title: "커리어의 시작",
    description:
      "라온코메스에서 지역 특화 산업 고도화와 국책과제를 수행하며 커리어를 시작했습니다. <br/>기본계획 수립, 전략 기획, BC 분석 등 공공 프로젝트의 기반 역량을 만들었습니다.",
    mPoster: "",
    pcPoster: "",
    videoWebm: undefined,
    videoMp4: "/screen/seed2.mp4",
    videoClassName: "h-full w-full object-contain md:h-[85%] md:w-[85%]",
  },
  {
    year: "2021",
    title: "국비 62억 규모 사업 수주",
    description:
      "농어촌 지역개발 프로젝트를 총괄하며 사업 제안과 전략 설계를 수행했습니다. <br/>사업 선정으로 국비 62억 원 규모 프로젝트를 수주하며 첫 대형 성과를 만들었습니다.",
    ...createHistoryMedia("kosdaq"),
    videoClassName:
      "relative z-[1] h-full w-full object-cover md:h-[88%] md:w-[88%] md:-translate-y-[6%]",
  },
  {
    year: "2022",
    title: "IT 서비스 기획 직무 전환",
    description:
      "제로웹에 합류해 공공·IoT 데이터 기반 서비스 기획을 맡았습니다. <br/>앱, 대시보드, B2G 사업기획까지 영역을 넓히며 IT 서비스 기획자로 전환했습니다.",
    mPoster: "",
    pcPoster: "",
    videoWebm: undefined,
    videoMp4: "/screen/main_object_video02.mp4",
    videoClassName: "h-full w-full object-contain md:h-[53%] md:w-[53%]",
  },
  {
    year: "2023",
    title: "스마트빌리지 사업 수주 · 장관상 수상",
    description:
      "스마트빌리지 보급 및 확산 사업 제안과 PM을 맡았습니다. <br/>주관기관 기준 연 15억 규모 사업비를 확보했고, 우수사례로 선정되어 장관상을 수상했습니다.",
    mPoster: "",
    pcPoster: "",
    videoWebm: undefined,
    videoMp4: "/screen/award.mp4",
    videoClassName: "h-full w-full object-contain md:h-[75%] md:w-[75%]",
  },
  {
    year: "2023",
    title: "30억 규모 사업 수주 · 매출 150% 성장 · 흑자 전환",
    description:
      "재직 중 5건 이상의 프로젝트를 수주하며 연간 30억 규모 사업 성과를 만들었고, 근무 기간 내 매출 150% 성장과 영업이익 최초 흑자 전환을 견인했습니다.",
    mPoster: "",
    pcPoster: "",
    videoWebm: undefined,
    videoMp4: "/screen/rise1.mp4",
    videoClassName: "h-full w-full object-contain md:h-[70%] md:w-[70%]",
  },
  {
    year: "2024",
    title: "미래교육 플랫폼 PM · 혁신융합대학 운영",
    description:
      "엔에스데블에서 바이오헬스 COSS와 HUSS 프로젝트를 운영했습니다. <br/>미래교육 플랫폼 사업 관리와 운영, 신규 제안까지 맡으며 교육·공공 도메인 PM 경험을 확장했습니다.",
    ...createHistoryMedia("wepublic"),
  },
  {
    year: "2025",
    title: "가치가개 런칭 · 부산광역시장상 수상",
    description:
      "AI 및 빅데이터 기반 시각장애인 보행보조 서비스 가치가개를 런칭했습니다. <br/>예비창업패키지로 서비스 방향을 구체화했고, 부산광역시장상을 수상했습니다.",
      mPoster: "",
      pcPoster: "",
      videoWebm: undefined,
      videoMp4: "/screen/award.mp4",
      videoClassName: "h-full w-full object-contain md:h-[75%] md:w-[75%]",
    },
  {
    year: "2026",
    title: "파트너잇 TPM · 기획/개발/알고리즘/운영",
    description:
      "AI 기반 정부지원사업 매칭 서비스 파트너잇에서 TPM으로 기획, 개발, 알고리즘 설계, 특허, 운영까지 전 과정을 맡고 있습니다. <br/>청년창업사관학교와 디딤돌 R&D를 수주하며 서비스와 사업 양쪽을 함께 리드하고 있습니다.",
    ...createHistoryMedia("nightcrows"),
  },
];

export const TIMELINE_YEARS = ["2020", "2021", "2022", "2023", "2024", "2025", "2026"];

export const YEAR_DEGREE: Record<string, number> = {
  "2020": 0,
  "2021": 15,
  "2022": 30,
  "2023": 45,
  "2024": 60,
  "2025": 75,
  "2026": 90,
};

export const YEAR_ROTATIONS: Record<string, string> = {
  "2020": "md:translate-y-[-50%]",
  "2021": "md:-translate-y-5 md:rotate-[15deg]",
  "2022": "md:-translate-y-5 md:rotate-[30deg]",
  "2023": "md:-translate-y-5 md:rotate-[45deg]",
  "2024": "md:-translate-y-5 md:rotate-[60deg]",
  "2025": "md:-translate-y-5 md:rotate-[75deg]",
  "2026": "md:-translate-y-5 md:rotate-[90deg]",
};
