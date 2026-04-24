'use client';

import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import styles from './styles/Swot.module.css';
import { withBasePath } from '../lib/asset';

const statusIcon = withBasePath('/portfolio/zigzag-reverse/assets/image/status.svg');
const lightIcon = withBasePath('/portfolio/zigzag-reverse/assets/image/light.svg');
const group8 = withBasePath('/portfolio/zigzag-reverse/assets/image/Group 8.svg');
const zigzag = withBasePath('/portfolio/zigzag-reverse/assets/image/gray_icon/zigzag@3x.png');
const musinsa = withBasePath('/portfolio/zigzag-reverse/assets/image/gray_icon/musinsa@3x.png');
const ably = withBasePath('/portfolio/zigzag-reverse/assets/image/gray_icon/ably@3x.png');
const brandy = withBasePath('/portfolio/zigzag-reverse/assets/image/gray_icon/brandy@3x.png');
const kream = withBasePath('/portfolio/zigzag-reverse/assets/image/gray_icon/kream@3x.png');
const wc = withBasePath('/portfolio/zigzag-reverse/assets/image/gray_icon/w@3x.png');
const a29 = withBasePath('/portfolio/zigzag-reverse/assets/image/gray_icon/29@3x.png');

type LayoutMode = 'desktop' | 'tablet' | 'mobile';

const SWOT_CARDS = [
  {
    title: 'Strength',
    accentClassName: styles.swotAccentStrength,
    desktopTitleClassName: styles.strength,
    desktopBodyClassName: styles.aiContainer1,
    items: [
      { text: 'AI 기반 개인화 추천 서비스', active: true },
      { text: '지그재그 Z페이 간편 결제 시스템' },
      { text: '카카오스타일 지원' },
      { text: '9,000개 이상 다양한 쇼핑몰 통합' },
    ],
  },
  {
    title: 'Weakness',
    accentClassName: styles.swotAccentWeakness,
    desktopTitleClassName: styles.weakness,
    desktopBodyClassName: styles.mauContainer,
    items: [
      { text: '서비스 성숙기에 따른 성장 정체', active: true },
      { text: '사용자 트래픽 감소 (MAU)' },
      { text: '중소형 쇼핑몰 의존성' },
      { text: '무료배송 혜택 부족' },
    ],
  },
  {
    title: 'Opportunity',
    accentClassName: styles.swotAccentOpportunity,
    desktopTitleClassName: styles.opportunity,
    desktopBodyClassName: styles.aiContainer2,
    items: [
      { text: 'AI 서비스 강화', active: true },
      { text: 'K-패션 글로벌 시장 진출' },
      { text: '지속 가능한 소비 트렌드' },
      { text: '온라인 쇼핑 시장 성장' },
    ],
  },
  {
    title: 'Threat',
    accentClassName: styles.swotAccentThreat,
    desktopTitleClassName: styles.threat,
    desktopBodyClassName: styles.mauContainer,
    items: [
      { text: '차별화 된 경쟁력 요구', active: true },
      { text: '경쟁 플랫폼의 시장 점유율 확대' },
      { text: '소비자 기대치 상승' },
      { text: '환경에 대한 부정적 인식' },
    ],
  },
];

const PLATFORM_MARKERS = [
  { src: zigzag, alt: '지그재그', className: styles.markerZigzag, desktopClassName: styles.desktopMarkerZigzag },
  { src: musinsa, alt: '무신사', className: styles.markerMusinsa, desktopClassName: styles.desktopMarkerMusinsa },
  { src: ably, alt: '에이블리', className: styles.markerAbly, desktopClassName: styles.desktopMarkerAbly },
  { src: a29, alt: '29CM', className: styles.marker29, desktopClassName: styles.desktopMarker29 },
  { src: brandy, alt: '브랜디', className: styles.markerBrandy, desktopClassName: styles.desktopMarkerBrandy },
  { src: wc, alt: 'W컨셉', className: styles.markerWconcept, desktopClassName: styles.desktopMarkerWconcept },
  { src: kream, alt: 'KREAM', className: styles.markerKream, desktopClassName: styles.desktopMarkerKream },
];

function useLayoutMode(): LayoutMode {
  const [mode, setMode] = useState<LayoutMode>('desktop');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mobileMq = window.matchMedia('(max-width: 767px)');
    const tabletMq = window.matchMedia('(max-width: 1330px)');

    const update = () => {
      if (mobileMq.matches) {
        setMode('mobile');
      } else if (tabletMq.matches) {
        setMode('tablet');
      } else {
        setMode('desktop');
      }
    };

    update();

    const add = (mq: MediaQueryList, handler: () => void) => {
      if (mq.addEventListener) {
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
      }

      mq.addListener(handler);
      return () => mq.removeListener(handler);
    };

    const removeMobile = add(mobileMq, update);
    const removeTablet = add(tabletMq, update);

    return () => {
      removeMobile();
      removeTablet();
    };
  }, []);

  return mode;
}

function useDesktopViewport() {
  const [width, setWidth] = useState(1920);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const update = () => {
      setWidth(Math.min(window.innerWidth, 1920));
    };

    update();
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('resize', update);
    };
  }, []);

  return width;
}

function SectionHeader() {
  return (
    <header className={styles.sectionHeader}>
      <div className={styles.sectionLabelRow}>
        <span className={styles.sectionDot} />
        <span className={styles.sectionLabel}>SWOT &amp; Positioning Map</span>
      </div>

      <h2 className={styles.sectionTitle}>
        <span className={`${styles.sectionTitleWord} ${styles.sectionTitleAccent}`}>AI 기반 개인화</span>
        <span className={styles.sectionTitleWord}>로 차별화 된</span>
        <span className={styles.sectionTitleWord}>경쟁력 확보</span>
      </h2>

      <div className={styles.sectionDescription}>
        <p>지그재그는 개인화 요소가 강한 플랫폼이면서도, 대중적인 접근성을 갖춘 플랫폼임</p>
        <p>이 점을 강조하여 개인화 요소 기능을 더욱 정교하게 발전시키고, 사용자 맞춤형 경험을 극대화할 계획임</p>
      </div>
    </header>
  );
}

function SwotCards() {
  return (
    <>
      {SWOT_CARDS.map((card) => (
        <article key={card.title} className={styles.swotCard}>
          <h3 className={`${styles.swotCardTitle} ${card.accentClassName}`}>{card.title}</h3>
          <ul className={styles.swotCardList}>
            {card.items.map((item) => (
              <li key={item.text} className={item.active ? styles.swotCardItem : styles.swotCardItemMuted}>
                {item.text}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </>
  );
}

function PositioningMap({ mobile }: { mobile?: boolean }) {
  return (
    <div className={mobile ? styles.positioningCardScroll : undefined}>
      <div className={styles.positioningCard}>
        <div className={styles.positioningResponsiveStage}>
          <div className={`${styles.responsiveAxis} ${styles.responsiveAxisTop}`}>
            <div className={styles.responsiveAxisLabelKo}>대중성</div>
            <div className={styles.responsiveAxisLabelEn}>Basic</div>
          </div>

          <div className={`${styles.responsiveAxis} ${styles.responsiveAxisLeft}`}>
            <div className={styles.responsiveAxisLabelKo}>시스템 주도</div>
            <div className={styles.responsiveAxisLabelEn}>System Driven</div>
          </div>

          <div className={`${styles.responsiveAxis} ${styles.responsiveAxisRight}`}>
            <div className={styles.responsiveAxisLabelKo}>사용자 주도</div>
            <div className={styles.responsiveAxisLabelEn}>User Driven</div>
          </div>

          <div className={`${styles.responsiveAxis} ${styles.responsiveAxisBottom}`}>
            <div className={styles.responsiveAxisLabelKo}>독창성</div>
            <div className={styles.responsiveAxisLabelEn}>Unique</div>
          </div>

          <div className={styles.positioningResponsiveFrame}>
            <div className={styles.responsiveSwotInner}>
              <div className={styles.responsiveFrameParent}>
                <div className={styles.responsiveLineParent}>
                  {Array.from({ length: 13 }).map((_, index) => (
                    <div key={`rv-${index}`} className={styles.responsiveFrameChild} />
                  ))}
                </div>

                <div className={styles.responsiveLineGroup}>
                  {Array.from({ length: 7 }).map((_, index) => (
                    <div key={`rh-${index}`} className={styles.responsiveFrameChild10} />
                  ))}
                </div>
              </div>

              <div className={styles.responsiveStatusContainer}>
                <img className={styles.statusIcon} src={statusIcon} alt="지그재그 포지셔닝" />
                <img className={styles.lightEffect} src={lightIcon} alt="" aria-hidden="true" />
              </div>

              {PLATFORM_MARKERS.map((marker) => (
                <img
                  key={marker.alt}
                  className={`${styles.platformMarker} ${marker.className}`}
                  src={marker.src}
                  alt={marker.alt}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BottomCallout() {
  return (
    <div className={styles.calloutWrap}>
      <img className={styles.calloutArrow} src={group8} alt="" aria-hidden="true" />

      <div className={styles.calloutCard}>
        <h3 className={styles.calloutTitle}>
          <span className={styles.calloutTitleWord}>취향 및 체형</span>
          <span className={`${styles.calloutTitleWord} ${styles.calloutTitleLight}`}>을 반영한</span>
          <span className={`${styles.calloutTitleWord} ${styles.calloutTitleLight}`}>디테일한 스타일 추천으로</span>
          <span className={styles.calloutTitleWord}>개인화 서비스 강화</span>
        </h3>

        <p className={styles.calloutBody}>
          마이페이지에서 내 체형을 쉽게 편집하고, 내 체형 및 취향을 기반으로 더욱 정교한 추천과 일간 Log로
          매일 변하는 스타일링 팁을 확인
        </p>
      </div>
    </div>
  );
}

function DesktopLayout() {
  const viewportWidth = useDesktopViewport();
  const contentWidth = Math.max(1095, Math.min(1684, viewportWidth - 236));
  const dynamicGap = Math.min(108, Math.max(50, (contentWidth - 1360) / 3));
  const cardsGap = viewportWidth >= 1746 ? dynamicGap : 50;
  const cardsScale = viewportWidth >= 1746 ? 1 : contentWidth / 1510;
  const cardsStageWidth = viewportWidth >= 1746 ? 1360 + cardsGap * 3 : 1510;
  const bottomScale = Math.min(1, contentWidth / 1684);
  const topCanvasHeight = 446 + 121 + 333 * cardsScale;
  const cardStageStyle = {
    ['--swot-card-gap' as string]: `${cardsGap}px`,
    ['--swot-card-scale' as string]: `${cardsScale}`,
    ['--swot-card-stage-width' as string]: `${cardsStageWidth}px`,
    ['--swot-card-stage-height' as string]: `${333 * cardsScale}px`,
  } as CSSProperties;
  const topCanvasStyle = {
    height: `${topCanvasHeight}px`,
  } as CSSProperties;
  const bottomStageStyle = {
    height: `${1290 * bottomScale}px`,
  } as CSSProperties;
  const bottomCanvasStyle = {
    transform: `scale(${bottomScale})`,
  } as CSSProperties;

  return (
    <div className={styles.desktopLayout}>
      <section className={styles.desktopTopStatic}>
        <div className={styles.desktopTopCanvas} style={topCanvasStyle}>
          <div className={styles.ellipseDiv} />
          <div className={styles.swotPositioning}>SWOT &amp; Positioning Map</div>
          <b className={styles.aiContainer}>
            <span>AI 기반 개인화</span>
            <span className={styles.span}>로 차별화 된 경쟁력 확보</span>
          </b>
          <div className={styles.div1}>
            <p className={styles.p}>지그재그는 개인화 요소가 강한 플랫폼이면서도, 대중적인 접근성을 갖춘 플랫폼임</p>
            <p className={styles.p}>이 점을 강조하여 개인화 요소 기능을 더욱 정교하게 발전시키고, 사용자 맞춤형 경험을 극대화할 계획임</p>
          </div>

          <div className={styles.desktopCardScaleStage} style={cardStageStyle}>
            <div className={styles.desktopCardScaleCanvas}>
              <div className={styles.groupParent}>
                {SWOT_CARDS.map((card) => (
                  <div key={card.title} className={styles.rectangleParent}>
                    <div className={styles.groupChild} />
                    <div className={card.desktopTitleClassName}>{card.title}</div>
                    <div className={card.desktopBodyClassName}>
                      <ul className={styles.aiZ}>
                        {card.items.map((item) => (
                          <li key={item.text} className={styles.ai}>
                            <span className={item.active ? undefined : styles.z1}>{item.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.desktopScaleStage} style={bottomStageStyle}>
        <div className={styles.desktopScaleCanvas} style={bottomCanvasStyle}>
          <div className={styles.desktopBottomCanvas}>
            <div className={styles.swotChild} />
            <div className={styles.positioningLayer}>
              <div className={styles.swotInner}>
                <div className={styles.frameParent}>
                  <div className={styles.lineParent}>
                    {Array.from({ length: 13 }).map((_, index) => (
                      <div key={`v-${index}`} className={styles.frameChild} />
                    ))}
                  </div>
                  <div className={styles.lineGroup}>
                    {Array.from({ length: 7 }).map((_, index) => (
                      <div key={`h-${index}`} className={styles.frameChild10} />
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.parent}>
                <div className={styles.div2}>시스템 주도</div>
                <div className={styles.systemDriven}>System Driven</div>
              </div>
              <div className={styles.group}>
                <div className={styles.div3}>사용자 주도</div>
                <div className={styles.systemDriven}>User Driven</div>
              </div>
              <div className={styles.container}>
                <div className={styles.div4}>대중성</div>
                <div className={styles.basic}>Basic</div>
              </div>
              <div className={styles.parent1}>
                <div className={styles.div3}>독창성</div>
                <div className={styles.systemDriven}>Unique</div>
              </div>

              <div className={styles.statusContainer}>
                <img className={styles.statusIcon} src={statusIcon} alt="지그재그 포지셔닝" />
                <img className={styles.lightEffect} src={lightIcon} alt="" aria-hidden="true" />
              </div>

              {PLATFORM_MARKERS.map((marker) => (
                <img
                  key={marker.alt}
                  className={`${styles.platformMarker} ${marker.desktopClassName}`}
                  src={marker.src}
                  alt={marker.alt}
                />
              ))}
            </div>

            <img className={styles.groupIcon} src={group8} alt="" aria-hidden="true" />
            <div className={styles.swotChild1} />
            <div className={styles.swotChild2} />

            <div className={styles.div6}>
              <span className={styles.txt}>
                <span>취향 및 체형</span>
                <span className={styles.span10}>을 반영한 디테일한 스타일 추천으로</span>
                <span> 개인화 서비스 강화</span>
              </span>
            </div>

            <div className={styles.log}>
              마이페이지에서 내 체형을 쉽게 편집하고, 내 체형 및 취향을 기반으로 더욱 정교한 추천과 일간 Log로
              매일 변하는 스타일링 팁을 확인
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function TabletLayout() {
  return (
    <div className={styles.tabletShell}>
      <div className={styles.responsiveInner}>
        <SectionHeader />

        <section className={styles.tabletCardsGrid}>
          <SwotCards />
        </section>

        <section className={styles.tabletPositioningSection}>
          <PositioningMap />
          <BottomCallout />
        </section>
      </div>
    </div>
  );
}

function MobileLayout() {
  return (
    <div className={styles.mobileShell}>
      <div className={styles.responsiveInner}>
        <SectionHeader />

        <section className={styles.mobileCardsGrid}>
          <SwotCards />
        </section>

        <section className={styles.mobilePositioningSection}>
          <PositioningMap mobile />
          <BottomCallout />
        </section>
      </div>
    </div>
  );
}

export default function Swot() {
  const mode = useLayoutMode();

  return (
    <section className={styles.swot}>
      {mode === 'desktop' && <DesktopLayout />}
      {mode === 'tablet' && <TabletLayout />}
      {mode === 'mobile' && <MobileLayout />}
    </section>
  );
}
