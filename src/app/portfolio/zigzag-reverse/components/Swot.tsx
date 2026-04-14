'use client';

import { useEffect, useMemo, useState } from 'react';
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

type CardItem = {
  text: string;
  active?: boolean;
};

type SwotCard = {
  title: string;
  titleClass: 'strength' | 'weakness' | 'opportunity' | 'threat';
  bodyClass: 'aiContainer1' | 'mauContainer' | 'aiContainer2';
  items: CardItem[];
};

const swotCards: SwotCard[] = [
  {
    title: 'Strength',
    titleClass: 'strength',
    bodyClass: 'aiContainer1',
    items: [
      { text: 'AI 기반 개인화 추천 서비스', active: true },
      { text: '지그재그 Z페이 간편 결제 시스템' },
      { text: '카카오스타일 지원' },
      { text: '9,000개 이상 다양한 쇼핑몰 통합' },
    ],
  },
  {
    title: 'Weakness',
    titleClass: 'weakness',
    bodyClass: 'mauContainer',
    items: [
      { text: '서비스 성숙기에 따른 성장 정체', active: true },
      { text: '사용자 트래픽 감소 (MAU)' },
      { text: '중소형 쇼핑몰 의존성' },
      { text: '무료배송 혜택 부족' },
    ],
  },
  {
    title: 'Opportunity',
    titleClass: 'opportunity',
    bodyClass: 'aiContainer2',
    items: [
      { text: 'AI 서비스 강화', active: true },
      { text: 'K-패션 글로벌 시장 진출' },
      { text: '지속 가능한 소비 트렌드' },
      { text: '온라인 쇼핑 시장 성장' },
    ],
  },
  {
    title: 'Threat',
    titleClass: 'threat',
    bodyClass: 'mauContainer',
    items: [
      { text: '차별화 된 경쟁력 요구', active: true },
      { text: '경쟁 플랫폼의 시장 점유율 확대' },
      { text: '소비자 기대치 상승' },
      { text: '환경에 대한 부정적 인식' },
    ],
  },
];

function useViewportWidth() {
  const [width, setWidth] = useState<number>(1920);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();

    window.addEventListener('resize', update, { passive: true });
    return () => window.removeEventListener('resize', update);
  }, []);

  return width;
}

function DesktopLayout() {
  const viewportWidth = useViewportWidth();

  const cardGap = useMemo(() => {
    if (viewportWidth >= 1920) return 108;
    if (viewportWidth <= 1746) return 50;
    const ratio = (viewportWidth - 1746) / (1920 - 1746);
    return 50 + (108 - 50) * ratio;
  }, [viewportWidth]);

  const cardScale = useMemo(() => {
    if (viewportWidth >= 1746) return 1;
    if (viewportWidth <= 1330) return 1;
    return (viewportWidth - 168) / 1510;
  }, [viewportWidth]);

  const cardStageHeight = 333 * cardScale;

  const bottomScale = useMemo(() => {
    if (viewportWidth >= 1920) return 1;
    if (viewportWidth <= 1330) return 1;
    return viewportWidth / 1920;
  }, [viewportWidth]);

  const bottomStageHeight = 1290 * bottomScale;

  return (
    <div className={styles.desktopLayout}>
      <div className={styles.desktopTopStatic}>
        <div className={styles.desktopTopCanvas}>
          <div className={styles.ellipseDiv} />
          <div className={styles.swotPositioning}>SWOT &amp; Positioning Map</div>

          <b className={styles.aiContainer}>
            <span>AI 기반 개인화</span>
            <span className={styles.span}>로 차별화 된 경쟁력 확보</span>
          </b>

          <div className={styles.div1}>
            <p className={styles.p}>
              지그재그는 개인화 요소가 강한 플랫폼이면서도, 대중적인 접근성을 갖춘 플랫폼임
            </p>
            <p className={styles.p}>
              이 점을 강조하여 개인화 요소 기능을 더욱 정교하게 발전시키고, 사용자 맞춤형 경험을 극대화할 계획임
            </p>
          </div>

          <div
            className={styles.desktopCardScaleStage}
            style={{ height: `${cardStageHeight}px` }}
          >
            <div
              className={styles.desktopCardScaleCanvas}
              style={{ transform: `scale(${cardScale})` }}
            >
              <div
                className={styles.groupParent}
                style={{ gap: `${cardGap}px` }}
              >
                {swotCards.map((card) => (
                  <div key={card.title} className={styles.rectangleParent}>
                    <div className={styles.groupChild} />
                    <div className={styles[card.titleClass]}>{card.title}</div>

                    <div className={styles[card.bodyClass]}>
                      <ul className={styles.aiZ}>
                        {card.items.map((item) => (
                          <li key={item.text} className={styles.ai}>
                            <span className={item.active ? undefined : styles.z1}>
                              {item.text}
                            </span>
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
      </div>

      <div
        className={styles.desktopScaleStage}
        style={{ height: `${bottomStageHeight}px` }}
      >
        <div
          className={styles.desktopScaleCanvas}
          style={{ transform: `scale(${bottomScale})` }}
        >
          <div className={styles.desktopBottomCanvas}>
            <div className={styles.swotChild} />

            <div className={styles.swotInner}>
              <div className={styles.frameParent}>
                <div className={styles.lineParent}>
                  <div className={styles.frameChild} />
                  <div className={styles.frameChild} />
                  <div className={styles.frameChild} />
                  <div className={styles.frameChild} />
                  <div className={styles.frameChild} />
                  <div className={styles.frameChild} />
                  <div className={styles.frameChild} />
                  <div className={styles.frameChild} />
                  <div className={styles.frameChild} />
                  <div className={styles.frameChild} />
                  <div className={styles.frameChild} />
                  <div className={styles.frameChild} />
                  <div className={styles.frameChild} />
                </div>

                <div className={styles.lineGroup}>
                  <div className={styles.frameChild10} />
                  <div className={styles.frameChild10} />
                  <div className={styles.frameChild10} />
                  <div className={styles.frameChild10} />
                  <div className={styles.frameChild10} />
                  <div className={styles.frameChild10} />
                  <div className={styles.frameChild10} />
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
              <img className={styles.statusIcon} src={statusIcon} alt="" />
              <img className={styles.lightEffect} src={lightIcon} alt="" />
            </div>

            <img className={styles.groupIcon} src={group8} alt="" />

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
              마이페이지에서 내 체형을 쉽게 편집하고, 내 체형 및 취향을 기반으로 더욱 정교한 추천과
              일간 Log로 매일 변하는 스타일링 팁을 확인
            </div>

            <img className={styles.img1Icon} src={zigzag} alt="Zigzag" />
            <img className={styles.icon} src={musinsa} alt="Musinsa" />
            <img className={styles.icon1} src={ably} alt="Ably" />
            <img className={styles.icon2} src={a29} alt="29CM" />
            <img className={styles.icon3} src={brandy} alt="Brandy" />
            <img className={styles.w1Icon} src={wc} alt="W Concept" />
            <img className={styles.icon4} src={kream} alt="Kream" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ mobile = false }: { mobile?: boolean }) {
  return (
    <>
      <div className={mobile ? styles.mobileLabelRow : styles.responsiveLabelRow}>
        <div className={mobile ? styles.mobileDot : styles.responsiveDot} />
        <div className={mobile ? styles.mobileLabel : styles.responsiveLabel}>
          SWOT &amp; Positioning Map
        </div>
      </div>

      <b className={mobile ? styles.mobileTitle : styles.responsiveTitle}>
        <span>AI 기반 개인화</span>
        <span className={styles.span}>로 차별화 된 경쟁력 확보</span>
      </b>

      <div className={mobile ? styles.mobileDesc : styles.responsiveDesc}>
        <p className={styles.p}>
          지그재그는 개인화 요소가 강한 플랫폼이면서도, 대중적인 접근성을 갖춘 플랫폼임
        </p>
        <p className={styles.p}>
          이 점을 강조하여 개인화 요소 기능을 더욱 정교하게 발전시키고, 사용자 맞춤형 경험을 극대화할 계획임
        </p>
      </div>
    </>
  );
}

function ResponsiveCards({ mobile = false }: { mobile?: boolean }) {
  return (
    <div className={mobile ? styles.mobileCards : styles.responsiveCards}>
      {swotCards.map((card) => (
        <article key={card.title} className={mobile ? styles.mobileCard : styles.responsiveCard}>
          <h3 className={mobile ? styles.mobileCardTitle : styles.responsiveCardTitle}>
            {card.title}
          </h3>

          <ul className={mobile ? styles.mobileCardList : styles.responsiveCardList}>
            {card.items.map((item) => (
              <li
                key={item.text}
                className={item.active ? styles.responsiveCardItemActive : styles.responsiveCardItem}
              >
                {item.text}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

function ResponsiveMap({ mobile = false }: { mobile?: boolean }) {
  return (
    <section className={mobile ? styles.mobileMapSection : styles.responsiveMapSection}>
      <div className={mobile ? styles.mobileMapCard : styles.responsiveMapCard}>
        <div className={mobile ? styles.mobileMapInner : styles.responsiveMapInner}>
          <div className={styles.axisHorizontalResponsive} />
          <div className={styles.axisVerticalResponsive} />

          <div className={mobile ? styles.mobileAxisTop : styles.axisTopResponsive}>
            <div className={styles.axisKrResponsive}>독창성</div>
            <div className={styles.axisEnResponsive}>Unique</div>
          </div>

          <div className={mobile ? styles.mobileAxisBottom : styles.axisBottomResponsive}>
            <div className={styles.axisKrResponsive}>대중성</div>
            <div className={styles.axisEnResponsive}>Basic</div>
          </div>

          <div className={mobile ? styles.mobileAxisLeft : styles.axisLeftResponsive}>
            <div className={styles.axisKrResponsive}>시스템 주도</div>
            <div className={styles.axisEnResponsive}>System Driven</div>
          </div>

          <div className={mobile ? styles.mobileAxisRight : styles.axisRightResponsive}>
            <div className={styles.axisKrResponsive}>사용자 주도</div>
            <div className={styles.axisEnResponsive}>User Driven</div>
          </div>

          <div className={mobile ? styles.mobileStatusContainer : styles.responsiveStatusContainer}>
            <img
              className={mobile ? styles.mobileStatusIcon : styles.responsiveStatusIcon}
              src={statusIcon}
              alt=""
            />
            <img
              className={mobile ? styles.mobileLightEffect : styles.responsiveLightEffect}
              src={lightIcon}
              alt=""
            />
          </div>

          <img
            className={mobile ? styles.mobileGroupIcon : styles.responsiveGroupIcon}
            src={group8}
            alt=""
          />

          <img
            className={`${mobile ? styles.mobileBrandIcon : styles.responsiveBrandIcon} ${
              mobile ? styles.mobileBrandZigzag : styles.responsiveBrandZigzag
            }`}
            src={zigzag}
            alt="Zigzag"
          />
          <img
            className={`${mobile ? styles.mobileBrandIcon : styles.responsiveBrandIcon} ${
              mobile ? styles.mobileBrandMusinsa : styles.responsiveBrandMusinsa
            }`}
            src={musinsa}
            alt="Musinsa"
          />
          <img
            className={`${mobile ? styles.mobileBrandIcon : styles.responsiveBrandIcon} ${
              mobile ? styles.mobileBrandAbly : styles.responsiveBrandAbly
            }`}
            src={ably}
            alt="Ably"
          />
          <img
            className={`${mobile ? styles.mobileBrandIcon : styles.responsiveBrandIcon} ${
              mobile ? styles.mobileBrand29 : styles.responsiveBrand29
            }`}
            src={a29}
            alt="29CM"
          />
          <img
            className={`${mobile ? styles.mobileBrandIcon : styles.responsiveBrandIcon} ${
              mobile ? styles.mobileBrandBrandy : styles.responsiveBrandBrandy
            }`}
            src={brandy}
            alt="Brandy"
          />
          <img
            className={`${mobile ? styles.mobileBrandIcon : styles.responsiveBrandIcon} ${
              mobile ? styles.mobileBrandWc : styles.responsiveBrandWc
            }`}
            src={wc}
            alt="W Concept"
          />
          <img
            className={`${mobile ? styles.mobileBrandIcon : styles.responsiveBrandIcon} ${
              mobile ? styles.mobileBrandKream : styles.responsiveBrandKream
            }`}
            src={kream}
            alt="Kream"
          />
        </div>
      </div>
    </section>
  );
}

function ResponsiveInsight({ mobile = false }: { mobile?: boolean }) {
  return (
    <section className={mobile ? styles.mobileInsightSection : styles.responsiveInsightSection}>
      <div className={mobile ? styles.mobileInsightBox : styles.responsiveInsightBox}>
        <div className={mobile ? styles.mobileInsightGlow : styles.responsiveInsightGlow} />

        <div className={mobile ? styles.mobileInsightTitle : styles.responsiveInsightTitle}>
          <span className={styles.txt}>
            <span>취향 및 체형</span>
            <span className={styles.span10}>을 반영한 디테일한 스타일 추천으로</span>
            <span> 개인화 서비스 강화</span>
          </span>
        </div>

        <div className={mobile ? styles.mobileInsightDesc : styles.responsiveInsightDesc}>
          마이페이지에서 내 체형을 쉽게 편집하고, 내 체형 및 취향을 기반으로 더욱 정교한 추천과
          일간 Log로 매일 변하는 스타일링 팁을 확인
        </div>
      </div>
    </section>
  );
}

function TabletLayout() {
  return (
    <div className={styles.tabletLayout}>
      <div className={styles.tabletInner}>
        <SectionHeader />
        <ResponsiveCards />
        <ResponsiveMap />
        <ResponsiveInsight />
      </div>
    </div>
  );
}

function MobileLayout() {
  return (
    <div className={styles.mobileLayout}>
      <div className={styles.mobileInner}>
        <SectionHeader mobile />
        <ResponsiveCards mobile />
        <ResponsiveMap mobile />
        <ResponsiveInsight mobile />
      </div>
    </div>
  );
}

const Swot = () => {
  return (
    <section className={styles.swotSection}>
      <DesktopLayout />
      <TabletLayout />
      <MobileLayout />
    </section>
  );
};

export default Swot;