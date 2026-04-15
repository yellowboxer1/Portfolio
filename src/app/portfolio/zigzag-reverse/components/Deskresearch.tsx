'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './styles/Deskresearch.module.css';
import { withBasePath } from '../lib/asset';

const imageFx81 = withBasePath('/portfolio/zigzag-reverse/assets/image/image_fx_ (8) 1.png');
const zigzag = withBasePath('/portfolio/zigzag-reverse/assets/image/roundicon/zigzag@3x.png');
const musinsa = withBasePath('/portfolio/zigzag-reverse/assets/image/roundicon/musinsa@3x.png');
const ably = withBasePath('/portfolio/zigzag-reverse/assets/image/roundicon/ably@3x.png');
const kream = withBasePath('/portfolio/zigzag-reverse/assets/image/roundicon/kream@3x.png');
const a4910 = withBasePath('/portfolio/zigzag-reverse/assets/image/roundicon/4910@3x.png');
const posty = withBasePath('/portfolio/zigzag-reverse/assets/image/roundicon/posty@3x.png');
const a29 = withBasePath('/portfolio/zigzag-reverse/assets/image/roundicon/29@3x.png');
const shein = withBasePath('/portfolio/zigzag-reverse/assets/image/roundicon/shein@3x.png');
const uniqlo = withBasePath('/portfolio/zigzag-reverse/assets/image/roundicon/uniqlo@3x.png');
const wconcept = withBasePath('/portfolio/zigzag-reverse/assets/image/roundicon/w concept@3x.png');

const group7 = withBasePath('/portfolio/zigzag-reverse/assets/image/Group 7@3x.png');
const group8 = withBasePath('/portfolio/zigzag-reverse/assets/image/Group 8.svg');
const musinsa1 = withBasePath('/portfolio/zigzag-reverse/assets/image/icon/musinsa@3x.png');
const ably1 = withBasePath('/portfolio/zigzag-reverse/assets/image/icon/ably@3x.png');
const kream1 = withBasePath('/portfolio/zigzag-reverse/assets/image/icon/kream@3x.png');
const a291 = withBasePath('/portfolio/zigzag-reverse/assets/image/icon/29@3x.png');
const brendy = withBasePath('/portfolio/zigzag-reverse/assets/image/icon/brandy@3x.png');
const queen = withBasePath('/portfolio/zigzag-reverse/assets/image/icon/queen@3x.png');
const wconcept1 = withBasePath('/portfolio/zigzag-reverse/assets/image/icon/w@3x.png');

const chartItems = [
  { name: '지그재그', value: '270k', height: 270, icon: zigzag, active: true },
  { name: '무신사', value: '260k', height: 260, icon: musinsa },
  { name: '에이블리', value: '230k', height: 230, icon: ably },
  { name: 'KREAM', value: '200k', height: 200, icon: kream },
  { name: '4910', value: '200k', height: 200, icon: a4910 },
  { name: '포스티', value: '170k', height: 170, icon: posty },
  { name: '29cm', value: '140k', height: 140, icon: a29 },
  { name: '쉬인', value: '130k', height: 130, icon: shein },
  { name: '유니클로', value: '90k', height: 90, icon: uniqlo },
  { name: 'w컨셉', value: '80k', height: 80, icon: wconcept },
];

const reasons = [
  { text: '브랜드 기획 상품이 많아요', accentClassName: styles.researchReasonPrimary },
  { text: '뷰티 상품도 한번에 볼 수 있어요', accentClassName: styles.researchReasonSecondary },
  { text: '가격대비 성능이 좋아요', accentClassName: styles.researchReasonTertiary },
  { text: '빠른 배송에 강점이 있어요', accentClassName: styles.researchReasonQuaternary },
  { text: '스타일 추천 기능이 좋아요', accentClassName: styles.researchReasonQuinary },
];

const churnList = [
  { rank: '2위', name: '에이블리', count: '317,396명', rate: '39.94%', icon: ably1 },
  { rank: '3위', name: '무신사', count: '186,850명', rate: '23.51%', icon: musinsa1 },
  { rank: '4위', name: '29CM', count: '56,934명', rate: '7.16%', icon: a291 },
  { rank: '5위', name: '퀸잇', count: '55,991명', rate: '7.05%', icon: queen },
  { rank: '6위', name: '브랜디', count: '38,106명', rate: '4.80%', icon: brendy },
  { rank: '7위', name: 'KREAM', count: '35,985명', rate: '4.53%', icon: kream1 },
  { rank: '8위', name: 'W컨셉', count: '33,246명', rate: '4.18%', icon: wconcept1 },
];

const mauScale = ['4.5B', '4.0B', '3.5B', '3.0B', '2.5B', '2.0B', '1.5B'];

function SectionLabel({ label }: { label: string }) {
  return (
    <div className={styles.researchLabelRow}>
      <span className={styles.researchDot} />
      <span className={styles.researchLabel}>{label}</span>
    </div>
  );
}

function InstallChart() {
  return (
    <section className={styles.researchCard}>
      <div className={styles.researchCardTitleRow}>
        <div className={styles.researchTitleMark}>
          <span className={styles.researchTitleMarkBarShort} />
          <span className={styles.researchTitleMarkBarMedium} />
          <span className={styles.researchTitleMarkBarTall} />
          <span className={styles.researchTitleMarkOutlineLeft} />
          <span className={styles.researchTitleMarkOutlineRight} />
        </div>
        <h3 className={styles.researchCardTitle}>올해의 패션/의류 신규 설치 순위 (2025)</h3>
      </div>

      <div className={styles.researchChartScroll}>
        <div className={styles.researchChart}>
          {chartItems.map((item) => (
            <div key={item.name} className={styles.researchChartItem}>
              <div
                className={`${styles.researchChartValue} ${
                  item.active ? styles.researchChartValueActive : ''
                }`}
              >
                {item.value}
              </div>

              <div className={styles.researchChartBarWrap}>
                <div
                  className={`${styles.researchChartBar} ${
                    item.active ? styles.researchChartBarActive : ''
                  }`}
                  style={{ height: `${item.height}px` }}
                />
              </div>

              <div className={styles.researchChartIconWrap}>
                <img
                  src={item.icon}
                  alt={item.name}
                  className={styles.researchChartIcon}
                  decoding="async"
                  loading="lazy"
                />
              </div>

              <div
                className={`${styles.researchChartLabel} ${
                  item.active ? styles.researchChartLabelActive : ''
                }`}
              >
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReasonList() {
  return (
    <section className={`${styles.researchCard} ${styles.researchReasonCard}`}>
      <h3 className={styles.researchFeatureTitle}>왜 지그재그를 사용하나요?</h3>

      <div className={styles.researchReasonList}>
        {reasons.map((reason, index) => (
          <div key={reason.text} className={styles.researchReasonItem}>
            <span className={styles.researchReasonIndex}>0{index + 1}</span>
            <span className={`${styles.researchReasonText} ${reason.accentClassName}`}>{reason.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function MauGraph() {
  return (
    <section className={`${styles.researchCard} ${styles.researchGraphCard}`}>
      <h3 className={styles.researchCardTitle}>지그재그 월간 사용자 수(MAU) 추이</h3>

      <div className={styles.researchGraphWrap}>
        <div className={styles.researchGraphAxis}>
          {mauScale.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>

        <div className={styles.researchGraphPlot}>
          <img
            src={group7}
            alt="지그재그 월간 사용자 수 추이"
            className={styles.researchGraphImage}
            decoding="async"
            loading="lazy"
          />
          <span className={styles.researchGraphPoint} />
          <span className={styles.researchGraphDate}>2024년 2월</span>
        </div>
      </div>
    </section>
  );
}

function ChurnList() {
  return (
    <section className={`${styles.researchCard} ${styles.researchChurnCard}`}>
      <div className={styles.researchChurnHeader}>
        <div>
          <p className={styles.researchChurnLabel}>지그재그 월간 이탈 사용자</p>
          <p className={styles.researchChurnValue}>
            794,664 <span>명</span>
          </p>
        </div>

        <img
          src={group8}
          alt=""
          className={styles.researchChurnHeaderIcon}
          decoding="async"
          loading="lazy"
        />
      </div>

      <div className={styles.researchChurnList}>
        {churnList.map((item) => (
          <div key={item.rank + item.name} className={styles.researchChurnItem}>
            <div className={styles.researchChurnRank}>{item.rank}</div>
            <img
              src={item.icon}
              alt={item.name}
              className={styles.researchChurnIcon}
              decoding="async"
              loading="lazy"
            />
            <div className={styles.researchChurnName}>{item.name}</div>
            <div className={styles.researchChurnBadge}>{item.rate}</div>
            <div className={styles.researchChurnCount}>{item.count}</div>
          </div>
        ))}
      </div>

      <p className={styles.researchChurnNote}>참고 : 경쟁앱 간 중복 이탈자가 발생할 수 있습니다.</p>
    </section>
  );
}

export default function Deskresearch() {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const [offsetX, setOffsetX] = useState(0);
  const [scrollLength, setScrollLength] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const syncTrack = () => {
      const isDesktop = window.innerWidth > 1330;

      if (!isDesktop) {
        setScrollLength(0);
        setOffsetX(0);
        return;
      }

      const panelWidth = Math.min(window.innerWidth, 1920);
      setScrollLength(panelWidth);

      if (!shellRef.current) {
        return;
      }

      const rect = shellRef.current.getBoundingClientRect();
      const nextOffset = Math.min(Math.max(-rect.top, 0), panelWidth);

      cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(() => {
        setOffsetX(nextOffset);
      });
    };

    syncTrack();
    window.addEventListener('resize', syncTrack);
    window.addEventListener('scroll', syncTrack, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', syncTrack);
      window.removeEventListener('scroll', syncTrack);
    };
  }, []);

  return (
    <section className={styles.deskresearch}>
      <div
        ref={shellRef}
        className={styles.researchShell}
        style={{ ['--desktop-scroll-length' as string]: `${scrollLength}px` }}
      >
        <div className={styles.researchSticky}>
          <div
            className={styles.researchTrack}
            style={{ transform: `translate3d(-${offsetX}px, 0, 0)` }}
          >
            <article className={styles.researchPanel}>
              <img className={styles.researchBackgroundImage} src={imageFx81} alt="" />
              <div className={styles.researchBackgroundGlow} />

              <div className={styles.researchPanelInner}>
                <header className={styles.researchHeader}>
                  <SectionLabel label="Background 1" />

                  <h2 className={styles.researchTitle}>
                    Z세대가 선택한 No.1 패션 플랫폼,{' '}
                    <span className={styles.researchTitleAccent}>지그재그</span>
                  </h2>

                  <div className={styles.researchDesc}>
                    <p>2025년 2월 기준, 패션 플랫폼 경쟁이 여전히 치열한 가운데,</p>
                    <p>지그재그는 여전히 강력한 신규 유입을 유지하며 신규 앱 설치 수 1위를 차지하고 있음</p>
                  </div>
                </header>

                <div className={`${styles.researchContentGrid} ${styles.researchContentGridPrimary}`}>
                  <InstallChart />
                  <ReasonList />
                </div>
              </div>
            </article>

            <article className={`${styles.researchPanel} ${styles.researchPanelDark}`}>
              <img className={styles.researchBackgroundImage} src={imageFx81} alt="" />
              <div className={`${styles.researchBackgroundGlow} ${styles.researchBackgroundGlowReverse}`} />

              <div className={styles.researchPanelInner}>
                <header className={styles.researchHeader}>
                  <SectionLabel label="Background 2" />

                  <h2 className={styles.researchTitle}>
                    신규 유입 1위, 하지만..{' '}
                    <span className={styles.researchTitleAccent}>유지율은?</span>
                  </h2>

                  <div className={styles.researchDesc}>
                    <p>여전히 높은 신규 유입을 기록하고 있지만,</p>
                    <p>월간 활성 사용자(MAU) 감소세가 두드러지며 이탈률이 급증하는 모습을 보이고 있음</p>
                  </div>
                </header>

                <div className={`${styles.researchContentGrid} ${styles.researchContentGridSecondary}`}>
                  <MauGraph />
                  <ChurnList />
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
