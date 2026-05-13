type CoverSlide = {
  type: "cover";
  title: string;
  description: string;
  meta: { label: string; value: string }[];
  images: {
    logo: string;
    toolIcons: string;
    tutorial: string;
    obstacle: string;
    userType: string;
    routeType: string;
    signPlayer: string;
  };
};

type OverviewSlide = {
  type: "overview";
  kicker: string;
  title: string;
  background: string;
  logo: string;
  goals: { title: string; body: string }[];
  comparison: {
    marker: string;
    asisBody: string[];
    asis: string[];
    tobeBody: string[];
    tobe: string[];
  };
};

type PreviewSlide = {
  type: "preview";
  variant?: "main";
  kicker: string;
  title: string;
  headline: string;
  body: string;
  background?: string;
  logo?: string;
  mascot?: string;
  tabs?: string[];
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

export type SmartCityGridSlide =
  | CoverSlide
  | OverviewSlide
  | PreviewSlide
  | ServiceSlide;

const media = (file: string) => `/portfolio/smart-city-challenge/media/${file}`;

export const smartCityGridSlides: SmartCityGridSlide[] = [
  {
    type: "cover",
    title: "다가치나란히\n실내 내비게이션 앱",
    description:
      "부산시 도시철도를 중심으로 실내·외 길안내 내비게이션 서비스를 제공하며, 교통약자뿐만 아니라 비교통약자까지 모두를 배려한 배리어프리 플랫폼입니다.",
    meta: [
      { label: "작업기간", value: "2022.04 - 2023.07" },
      { label: "기여도", value: "50%" },
    ],
    images: {
      logo: media("image1.png"),
      toolIcons: media("image10.png"),
      tutorial: media("image5.png"),
      obstacle: media("image6.png"),
      userType: media("image7.png"),
      routeType: media("image8.png"),
      signPlayer: media("image4.png"),
    },
  },
  {
    type: "overview",
    kicker: "개요",
    title: "배리어프리 내비게이션 앱",
    background: media("image11.png"),
    logo: media("image12.png"),
    goals: [
      {
        title: "서비스 대상 확대",
        body: "예비사업 당시 한정적인 의미에서의 교통약자를 대상으로 서비스를 제공 하였으나, 본사업에서는 외국인, 고령자로 교통약자의 범위를 넓혔고 비교통약자까지 포괄한 범용적인 서비스를 개발했습니다.",
      },
      {
        title: "서비스 지역 확대",
        body: "부산역에 한정되었던 서비스를 부산도시철도 1~4호선 전 역사로 단계적으로 확장하여, 시민이 직접 체험하고 활용할 수 있는 내비게이션 앱으로 고도화했습니다.",
      },
      {
        title: "서비스 영역 확대",
        body: "실내 목적지에 실외 주요 목적지를 추가하여 앱 이탈 없이 실내에서 실외까지 상세 경로를 안내할 수 있도록 서비스 영역을 확장했습니다.",
      },
    ],
    comparison: {
      marker: media("image0.png"),
      asisBody: [
        "예비사업을 위해 하나의 역사를 대상으로 만들어진 단순한 기능과 디자인으로 구성된 내비게이션 앱",
        "도시철도 역사 내부가 아니면 작동되지 않아 실용성이 떨어지고 교통약자 배려요소가 부족함",
      ],
      asis: ["실내 한정", "배려요소 부족", "낮은 실용성"],
      tobeBody: [
        "이용자가 역사 내부에서 최종목적지(외부)까지 앱을 이탈하지 않고 서비스 이용 가능",
        "모든 서비스 이용자가 도시철도와 주변교통을 편리하게 이용할 수 있도록 제작",
        "교통약자를 배려한 UI/UX 디자인과 목적지 설정을 위한 다양한 경로 제공",
      ],
      tobe: ["실내 + 실외", "배려요소 보완", "활용률 증대"],
    },
  },
  {
    type: "preview",
    variant: "main",
    kicker: "Preview",
    title: "주요기능 - 메인",
    headline: "이용자 모두가 편리한\n배리어프리 APP",
    body: "교통약자를 배려한 내비게이션 앱으로 사용자가 직접 선택한 유형에 따라 유형별 서비스 이용 튜토리얼을 보여주며, 3D로 구현된 메인 페이지에서는 편의시설을 확인하여 목적지 설정으로 바로가기 기능과 상단메뉴를 통한 사용자 유형 선택·변경 및 주변 교통 정보 파악하는 기능을 제공함. 각 기능 간의 높은 연계성 확보를 위해 다양한 기능을 손쉽게 접근할 수 있도록 배치",
    background: media("image13.png"),
    logo: media("image12.png"),
    mascot: media("image1.png"),
    tabs: ["수어 안내", "편의시설", "상단메뉴"],
    images: [
      media("image14.png"),
      media("image15.png"),
      media("image16.png"),
      media("image17.png"),
    ],
    notes: [
      {
        title: "편의시설",
        body: "메인에서 지하철 역사 내 편의시설을 한눈에 볼 수 있고, 마커 선택만으로 길안내 서비스를 이용할 수 있습니다.",
      },
      {
        title: "상단메뉴",
        body: "이용자별 유형에 맞는 설정과 주변 교통 정보를 제공해 대중교통 이용을 돕습니다.",
      },
    ],
  },
  {
    type: "preview",
    kicker: "Preview",
    title: "주요기능 - 길안내",
    headline: "차별화된 맞춤 서비스\n배리어프리 APP",
    body: "사용자 유형에 따라 계단·엘리베이터 경로를 나누고 실시간 실내·외 내비게이션을 제공합니다. 음성 안내, 안내 종료, 장애물 정보 팝업 등 교통약자 맞춤 기능을 화면 곳곳에 배치했습니다.",
    images: [
      media("image18.png"),
      media("image19.png"),
      media("image20.png"),
      media("image15.png"),
    ],
    notes: [
      {
        title: "유형 선택",
        body: "유형별 경로와 안내 방식을 다르게 제공하여 이용자의 상황에 맞는 길안내를 지원합니다.",
      },
      {
        title: "장애물 지도",
        body: "실외 경로에 있는 마커 클릭 시 장애물 유형, 장애물명, 주의사항을 팝업으로 제공합니다.",
      },
    ],
  },
  {
    type: "service",
    kicker: "서비스 내용",
    title: "지하철 내비게이션\n튜토리얼",
    images: [media("image21.jpg"), media("image22.png"), media("image23.jpg")],
    items: [
      {
        title: "랜딩페이지",
        body: "애플리케이션 클릭 시 지하철 역 모양에서 모티브를 얻은 로고가 중앙에 뜨면서 랜딩페이지가 노출됩니다.",
      },
      {
        title: "이용자 유형 선택",
        body: "튜토리얼 안내 전 이용자 유형에 따른 안내 방법을 선택할 수 있는 팝업창이 노출됩니다.",
      },
      {
        title: "수어 안내",
        body: "수어 안내 클릭 시 튜토리얼의 전체 내용을 수어로 안내하고, 재생·일시정지를 지원합니다.",
      },
    ],
  },
  {
    type: "service",
    kicker: "서비스 내용",
    title: "지하철 내비게이션\n실내 메인",
    images: [media("image24.jpg"), media("image25.jpg"), media("image26.jpg")],
    items: [
      {
        title: "실내 메인",
        body: "역사 내 설치된 비콘 신호를 잡아 현 위치를 확인할 수 있는 3D 맵 화면을 제공합니다.",
      },
      {
        title: "음성검색",
        body: "목적지 키워드를 음성으로 검색하고, 입력된 텍스트에 따라 일치하는 목적지를 필터링합니다.",
      },
      {
        title: "목적지 검색",
        body: "목적지를 입력하지 않은 경우 최근 검색 히스토리를 노출하고, 검색된 목적지별 개별 삭제를 지원합니다.",
      },
    ],
  },
  {
    type: "service",
    kicker: "서비스 내용",
    title: "지하철 내비게이션\n실내 길안내",
    images: [media("image27.jpg"), media("image28.png"), media("image29.jpg")],
    items: [
      {
        title: "엘리베이터 경로 안내",
        body: "목적지까지 이동하는 경로 미리보기를 노출하고, 이용자 유형에 맞는 경로 설정으로 길안내를 진행합니다.",
      },
      {
        title: "상세 유형 선택",
        body: "장애인 선택 시 상세 유형 선택 팝업창에서 유형을 선택한 뒤 길안내를 시작합니다.",
      },
      {
        title: "음량조절",
        body: "서비스 이용 중에도 음성 안내 음량과 안내 종료 기능을 편리하게 사용할 수 있습니다.",
      },
    ],
  },
  {
    type: "service",
    kicker: "서비스 내용",
    title: "지하철 내비게이션\n발생 이슈",
    images: [media("image30.png"), media("image31.png"), media("image32.png")],
    items: [
      {
        title: "새로운 경로 안내",
        body: "길안내 중 경로 이탈 시 가까운 비콘 신호를 수신하여 현재 위치에서 목적지까지 경로를 재설정합니다.",
      },
      {
        title: "신호 재탐색",
        body: "신호 수신이 안 될 경우 안내 메시지를 제공하고, 수신과 동시에 현재 위치에서 길안내를 재실행합니다.",
      },
      {
        title: "서비스 불가 안내",
        body: "실내 신호가 유실되거나 현재 위치가 지하철이 아닌 경우 실내 제공 서비스가 실행되지 않음을 안내합니다.",
      },
    ],
  },
  {
    type: "service",
    kicker: "서비스 내용",
    title: "지하철 내비게이션\n하단메뉴",
    images: [
      media("image33.png"),
      media("image34.png"),
      media("image35.png"),
      media("image36.png"),
    ],
    items: [
      {
        title: "주변",
        body: "역사 반경 500m 이내 랜드마크 및 관광지 정보를 노출하여 최종 목적지로 설정하는 바로가기를 제공합니다.",
      },
      {
        title: "역내시설",
        body: "역사 내 편의시설을 핀으로 표시하고, 정보 확인 및 최종 목적지 설정을 지원합니다.",
      },
      {
        title: "주변교통",
        body: "현 위치 기준의 주변 교통 안내 페이지를 통해 버스정류장 등 부가 정보를 제공합니다.",
      },
    ],
  },
  {
    type: "service",
    kicker: "서비스 내용",
    title: "지하철 내비게이션\n상단메뉴",
    images: [media("image37.jpg"), media("image38.jpg"), media("image39.png")],
    items: [
      {
        title: "상단메뉴",
        body: "검색창의 메뉴 아이콘 클릭으로 설정과 주변 교통 정보 등 부가서비스에 접근할 수 있습니다.",
      },
      {
        title: "설정",
        body: "교통약자와 외국인을 배려한 주요 기능으로 개인이 원하는 방식의 내비게이션 설정을 제공합니다.",
      },
      {
        title: "대피경로",
        body: "역사별 전체 맵을 제공하고, 에스컬레이터와 엘리베이터를 제외한 계단 출구 중심의 대피경로를 안내합니다.",
      },
    ],
  },
  {
    type: "service",
    kicker: "서비스 내용",
    title: "지하철 내비게이션\n실외 길안내",
    images: [media("image40.png"), media("image41.jpg"), media("image42.png")],
    items: [
      {
        title: "실외 메인",
        body: "3D 맵에 GPS 신호를 받아 현 위치를 표시합니다.",
      },
      {
        title: "실외 길안내",
        body: "실외 이동 후 전환되는 3D 길안내 화면에서 출발지와 도착지를 핀으로 표시하고, GPS 신호에 따라 현 위치를 반영합니다.",
      },
      {
        title: "장애물 안내",
        body: "실외 목적지까지의 경로에 있는 장애물 정보를 하단 팝업 형태로 제공합니다.",
      },
    ],
  },
  {
    type: "service",
    kicker: "서비스 내용",
    title: "지하철 내비게이션\n역 간 이동(환승)",
    images: [media("image43.png"), media("image44.png"), media("image45.png")],
    items: [
      {
        title: "역 간 이동(환승) 상세경로",
        body: "연관된 역사가 다른 출발지와 목적지 검색 시 역사부터 최종 목적지까지의 약도를 제공하고 상세 경로를 안내합니다.",
      },
      {
        title: "환승 정보 제공",
        body: "출발역부터 도착역까지 환승 정보, 환승 횟수, 소요 시간을 제공하여 효율적인 도시철도 이용을 돕습니다.",
      },
    ],
  },
];
