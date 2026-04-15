'use client';

import { useEffect, useRef, useState } from 'react';
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
  accentClassName: string;
  items: CardItem[];
};

const swotCards: SwotCard[] = [
  {
    title: 'Strength',
    accentClassName: styles.swotAccentStrength,
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
    items: [
      { text: '차별화 된 경쟁력 요구', active: true },
      { text: '경쟁 플랫폼의 시장 점유율 확대' },
      { text: '소비자 기대치 상승' },
      { text: '환경에 대한 부정적 인식' },
    ],
  },
];

export default function Swot() {
  const mapStageRef = useRef<HTMLDivElement | null>(null);
  const [mapScale, setMapScale] = useState(1);

  useEffect(() => {
    const stage = mapStageRef.current;
    if (!stage) {
      return;
    }

    const updateScale = () => {
      const nextScale = Math.min(1, stage.clientWidth / 1920);
      setMapScale(nextScale);
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(stage);
    window.addEventListener('resize', updateScale);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateScale);
    };
  }, []);

  return (
    <section className={styles.swotSection}>
      <div className={styles.swotShell}>
        <header className={styles.swotHeader}>
          <div className={styles.swotLabelRow}>
            <span className={styles.swotDot} />
            <span className={styles.swotLabel}>SWOT &amp; Positioning Map</span>
          </div>

          <h2 className={styles.swotTitle}>
            <span>AI 기반 개인화</span>
            <span className={styles.swotTitleAccent}>로 차별화 된 경쟁력 확보</span>
          </h2>

          <div className={styles.swotDesc}>
            <p>
              지그재그는 개인화 요소가 강한 플랫폼이면서도, 대중적인 접근성을 갖춘 플랫폼임
            </p>
            <p>
              이 점을 강조하여 개인화 요소 기능을 더욱 정교하게 발전시키고, 사용자 맞춤형 경험을 극대화할 계획임
            </p>
          </div>
        </header>

        <div className={styles.swotCardsGrid}>
          {swotCards.map((card) => (
            <article key={card.title} className={styles.swotCard}>
              <h3 className={`${styles.swotCardTitle} ${card.accentClassName}`}>{card.title}</h3>

              <ul className={styles.swotCardList}>
                {card.items.map((item) => (
                  <li
                    key={item.text}
                    className={item.active ? styles.swotCardItemActive : styles.swotCardItem}
                  >
                    {item.text}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <section className={styles.swotMapSection}>
          <div
            ref={mapStageRef}
            className={styles.desktopScaleStage}
            style={{ height: `${1290 * mapScale}px` }}
          >
            <div
              className={styles.desktopScaleCanvas}
              style={{ transform: `scale(${mapScale})` }}
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
        </section>

        <section className={styles.swotInsightSection}>
          <div className={styles.swotInsightBox}>
            <div className={styles.swotInsightGlow} />

            <h3 className={styles.swotInsightTitle}>
              <span>취향 및 체형</span>
              <span className={styles.swotInsightTitleLight}>
                을 반영한 디테일한 스타일 추천으로
              </span>
              <span> 개인화 서비스 강화</span>
            </h3>

            <p className={styles.swotInsightDesc}>
              마이페이지에서 내 체형을 쉽게 편집하고, 내 체형 및 취향을 기반으로 더욱 정교한 추천과
              일간 Log로 매일 변하는 스타일링 팁을 확인
            </p>
          </div>
        </section>
      </div>
    </section>
  );
}
