"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Slide = {
  bgDesktop: string;
  videoWebm?: string;
  videoMp4?: string;
};

const SLIDES: Slide[] = [
  {
    bgDesktop:
      "https://cache.wemade.com/wemade/assets/opt_video/aboutus/history/wemade-pc-poster.webp",
    videoWebm:
      "https://cache.wemade.com/wemade/assets/opt_video/aboutus/history/wemade-pc.webm",
    videoMp4:
      "https://cache.wemade.com/wemade/assets/opt_video/aboutus/history/wemade-pc.mp4",
  },
  {
    bgDesktop:
      "https://cache.wemade.com/wemade/assets/opt_video/aboutus/history/mir2-pc-poster.webp",
  },
  {
    bgDesktop:
      "https://cache.wemade.com/wemade/assets/opt_video/aboutus/history/mir3-pc-poster.webp",
  },
  {
    bgDesktop:
      "https://cache.wemade.com/wemade/assets/opt_video/aboutus/history/kosdaq-pc-poster.webp",
  },
  {
    bgDesktop:
      "https://cache.wemade.com/wemade/assets/opt_video/aboutus/history/chuanqi-pc-poster.webp",
  },
  {
    bgDesktop:
      "https://cache.wemade.com/wemade/assets/opt_video/aboutus/history/wemix-pc-poster.webp",
  },
  {
    bgDesktop:
      "https://cache.wemade.com/wemade/assets/opt_video/aboutus/history/mir4-pc-poster.webp",
  },
  {
    bgDesktop:
      "https://cache.wemade.com/wemade/assets/opt_video/aboutus/history/wemix-pc-poster.webp",
  },
  {
    bgDesktop:
      "https://cache.wemade.com/wemade/assets/opt_video/aboutus/history/playon-pc-poster.webp",
  },
  {
    bgDesktop:
      "https://cache.wemade.com/wemade/assets/opt_video/aboutus/history/wepublic-pc-poster.webp",
  },
  {
    bgDesktop:
      "https://cache.wemade.com/wemade/assets/opt_video/aboutus/history/nightcrows-pc-poster.webp",
  },
  {
    bgDesktop:
      "https://cache.wemade.com/wemade/assets/opt_video/aboutus/history/wemixpay-pc-poster.webp",
  },
  {
    bgDesktop:
      "https://cache.wemade.com/wemade/assets/opt_video/aboutus/history/thor-pc-poster.webp",
  },
];

const EVENTS = [
  {
    title: "위메이드 엔터테인먼트 설립",
    description:
      "온라인 게임을 새롭게 정의하겠다는 대담한 비전으로 설립된 이 스튜디오는 이후 한국을 대표하는 엔터테인먼트 및 기술 기업으로 성장하게 됩니다.",
  },
  {
    title: "'미르의 전설2' 출시",
    description:
      "수천만 명의 플레이어를 확보하며 막대한 성과를 거둔 1세대 MMORPG '미르의 전설2'는 위메이드를 온라인 게임 업계의 대표 주자로 성장시킨 대표작입니다.",
  },
  {
    title: "'미르의 전설3' 출시",
    description:
      "미르의 전설2의 정통성을 계승한 후속작 미르의 전설3은 확장된 세계관과 진화된 전투 시스템으로 무협 MMORPG 장르의 깊이를 더하며, 위메이드 핵심 IP의 가치를 강화합니다.",
  },
  {
    title: "코스닥 상장",
    description:
      "위메이드는 코스닥에 공식 상장되며, 게임 산업 내 리더십과 지속 가능한 가치 창출, 투명경영에 대한 의지를 입증합니다.",
  },
  {
    title: "전기(ChuanQi) IP 설립",
    description:
      "미르의 전설 IP의 관리와 확장을 위해 설립된 조직으로, 지식재산권 보호와 게임·미디어·머천다이징 전반의 글로벌 파트너십을 강화합니다.",
  },
  {
    title: "블록체인 플랫폼 '위믹스(WEMIX)' 출시",
    description:
      "디지털 게임 경제의 토큰화와 자산 소유권을 구현하는 탈중앙화 서비스 기반의 블록체인 플랫폼, WEMIX가 처음 공개됩니다.",
  },
  {
    title: "'미르4' 출시",
    description:
      "동양 판타지 세계관과 문파 전쟁, 자유로운 무공 시스템을 갖춘 MMORPG '미르4'는 출시와 함께 국내 시장에서 흥행 성과를 거두며, 글로벌 블록버스터로 도약하는 기반을 마련합니다.",
  },
  {
    title: "WEMIX 3.0 메인넷 출시",
    description:
      "고성능 EVM 호환을 갖춘 자체 메인넷 출시를 통해 확장성과 보안, 서비스 중심 구조의 새로운 블록체인 인프라 시대를 엽니다.",
  },
  {
    title: "WEMIX PLAY 출시",
    description:
      "전세계 수많은 게임 유저를 토큰 기반 경제로 온보딩시키며, 블록체인 게임의 진화를 이끄는 새로운 경험의 플랫폼이 시작됩니다.",
  },
  {
    title: "WEPUBLIC 플랫폼 출시",
    description:
      "블록체인 기술을 기반으로 설계된 탈중앙화 커뮤니티 플랫폼 Wepublic은 열린 소통과 투명한 운영, 누구나 참여할 수 있는 새로운 커뮤니티의 시작을 엽니다.",
  },
  {
    title: "'나이트 크로우' 출시",
    description:
      "다크 판타지 MMORPG '나이트크로우'는 차세대 비주얼, 역동적인 공중 전투, 끊김 없는 크로스 플랫폼 경험을 전 세계 유저들에게 선사합니다.",
  },
  {
    title: "WEMIX PAY 출시",
    description:
      "블록체인 기반 결제 서비스 WEMIX PAY는 WEMIX 토큰을 활용해 전 세계 Web3 게임의 콘텐츠를 간편하고 안전하게 거래할 수 있도록 지원합니다.",
  },
  {
    title: "'레전드 오브 이미르' 출시",
    description:
      "북유럽 신화를 바탕으로 한 MMORPG Legend of Ymir는 생생한 세계관과 지속 가능한 경제 시스템으로 정통 MMORPG의 가치를 확장합니다.",
  },
];

const YEARS = [
  { label: "2000", idx: 0 },
  { label: "2001", idx: 1 },
  { label: "2002", idx: 2 },
  { label: "2009", idx: 3 },
  { label: "2017", idx: 4 },
  { label: "2020", idx: 5 },
  { label: "2022", idx: 6 },
  { label: "2023", idx: 8 },
  { label: "2024", idx: 10 },
  { label: "2025", idx: 12 },
];

const SLIDE_COUNT = SLIDES.length;

function HistorySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const activeYearBucket = useMemo(() => {
    let closest = 0;
    for (let i = 0; i < YEARS.length; i += 1) {
      if (activeIndex >= YEARS[i].idx) {
        closest = i;
      }
    }
    return closest;
  }, [activeIndex]);

  const handleScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const sectionTop = section.offsetTop;
    const sectionHeight = section.scrollHeight;
    const viewHeight = window.innerHeight;

    const scrolled = window.scrollY - sectionTop;
    const trackHeight = sectionHeight - viewHeight;

    if (scrolled < 0) {
      setActiveIndex(0);
      return;
    }

    const progress = Math.min(1, scrolled / trackHeight);
    const idx = Math.min(SLIDE_COUNT - 1, Math.floor(progress * SLIDE_COUNT));
    setActiveIndex(idx);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-black text-white"
      style={{ height: `${SLIDE_COUNT * 80}vh` }}
    >
      <div className="sticky top-0 left-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {SLIDES.map((slide, i) => (
            <div
              key={slide.bgDesktop}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                i === activeIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              {slide.videoWebm || slide.videoMp4 ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={slide.bgDesktop}
                  className="h-full w-full object-cover"
                >
                  <source src={slide.videoWebm} type="video/webm" />
                  <source src={slide.videoMp4} type="video/mp4" />
                </video>
              ) : (
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.bgDesktop})` }}
                />
              )}
              <div className="absolute inset-0 bg-black/40" />
            </div>
          ))}
        </div>

        <div className="pointer-events-none relative z-10 flex w-full max-w-7xl flex-col items-center justify-between px-8 md:flex-row md:px-16">
          <div className="mt-20 w-full md:mt-0 md:w-1/2">
            {EVENTS.map((event, i) => (
              <div
                key={event.title}
                className={`transform transition-all duration-700 ${
                  i === activeIndex
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none absolute translate-y-10 opacity-0"
                }`}
              >
                <h2 className="mb-6 text-4xl leading-tight font-bold tracking-tight md:text-6xl">
                  {event.title}
                </h2>
                <p className="max-w-lg text-lg leading-relaxed font-light text-gray-200 md:text-xl">
                  {event.description}
                </p>
              </div>
            ))}
          </div>

          <div className="absolute top-1/2 right-[-200px] hidden h-[800px] w-[800px] -translate-y-1/2 md:block">
            <div
              className="relative flex h-full w-full items-center justify-center rounded-full border border-white/10 transition-transform duration-1000 ease-out"
              style={{ transform: `rotate(${activeYearBucket * 18}deg)` }}
            >
              {YEARS.map((year, i) => {
                const angle = -i * 18;
                return (
                  <div
                    key={year.label}
                    className="absolute top-1/2 right-0 origin-[-400px_50%] -translate-y-1/2 transition-opacity duration-500"
                    style={{
                      transform: `rotate(${angle}deg)`,
                      opacity: i === activeYearBucket ? 1 : 0.3,
                    }}
                  >
                    <div className="flex items-center">
                      <div
                        className={`mr-6 h-3 w-3 rounded-full transition-all duration-500 ${
                          i === activeYearBucket
                            ? "scale-125 bg-green-400"
                            : "bg-white"
                        }`}
                      />
                      <span
                        className={`font-mono text-6xl font-bold tracking-tighter ${
                          i === activeYearBucket ? "text-white" : "text-gray-500"
                        }`}
                      >
                        {year.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-8 z-20 flex items-center gap-4 md:left-16">
          <div className="font-mono text-xs opacity-50">HISTORY</div>
          <div className="relative h-[1px] w-48 overflow-hidden bg-white/20">
            <div
              className="absolute h-full bg-white transition-all duration-300 ease-out"
              style={{ width: `${((activeIndex + 1) / SLIDE_COUNT) * 100}%` }}
            />
          </div>
          <div className="font-mono text-xs">
            {String(activeIndex + 1).padStart(2, "0")} / {String(SLIDE_COUNT).padStart(2, "0")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-black">
      <section className="flex h-[60vh] flex-col items-center justify-center px-6 text-white">
        <h1 className="mb-4 text-5xl font-bold">WEMADE HISTORY</h1>
        <p className="max-w-2xl text-center text-gray-400">
          위메이드는 온라인 게임의 경계를 넘어 블록체인과 기술의 융합으로 새로운 미래를 만들어가고 있습니다.
          <br />
          아래로 스크롤하여 우리의 여정을 확인해 보세요.
        </p>
      </section>

      <HistorySection />

      <section className="flex h-screen items-center justify-center text-white">
        <div className="text-center">
          <h2 className="mb-4 text-4xl font-bold italic opacity-80">
            And the story continues...
          </h2>
          <button
            type="button"
            className="mt-6 rounded-full border border-white/20 px-8 py-3 transition-colors hover:bg-white hover:text-black"
          >
            Learn More
          </button>
        </div>
      </section>
    </div>
  );
}
