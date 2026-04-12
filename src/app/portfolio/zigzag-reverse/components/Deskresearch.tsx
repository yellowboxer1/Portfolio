'use client';

import React, { useEffect, useMemo, useState } from 'react';
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

type LayoutMode = 'desktop' | 'quad' | 'mobile';

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
  '브랜드 기획 상품이 많아요',
  '뷰티 상품도 한번에 볼 수 있어요',
  '가격대비 성능이 좋아요',
  '빠른 배송에 강점이 있어요',
  '스타일 추천 기능이 좋아요',
];

const churnList = [
  { rank: '1위', name: '에이블리', count: '317,396명', rate: '39.94%', icon: ably1 },
  { rank: '2위', name: '무신사', count: '186,850명', rate: '23.51%', icon: musinsa1 },
  { rank: '3위', name: '29CM', count: '56,934명', rate: '7.16%', icon: a291 },
  { rank: '4위', name: '퀸잇', count: '55,991명', rate: '7.05%', icon: queen },
  { rank: '5위', name: '브랜디', count: '38,106명', rate: '4.80%', icon: brendy },
  { rank: '6위', name: 'KREAM', count: '35,985명', rate: '4.53%', icon: kream1 },
  { rank: '7위', name: 'W컨셉', count: '33,246명', rate: '4.18%', icon: wconcept1 },
];

function useLayoutMode(): LayoutMode {
  const [mode, setMode] = useState<LayoutMode>('desktop');

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w <= 767) {
        setMode('mobile');
      } else if (w <= 1000) {
        setMode('quad');
      } else {
        setMode('desktop');
      }
    };

    update();
    window.addEventListener('resize', update, { passive: true });
    return () => window.removeEventListener('resize', update);
  }, []);

  return mode;
}

function ChartSection() {
  return (
    <div className={styles.chartSection}>
      <div className={styles.chartTitleRow}>
        <div className={styles.rectangleGroup}>
          <div className={styles.groupChild} />
          <div className={styles.groupItem} />
          <div className={styles.groupInner} />
          <div className={styles.groupChild1} />
        </div>
        <b className={styles.b}>올해의 패션/의류 신규 설치 순위 (2025)</b>
      </div>

      <div className={styles.chartBlock}>
        <div className={styles.chartBars}>
          {chartItems.map((item) => (
            <div key={item.name} className={styles.chartItem}>
              <div
                className={`${styles.chartValue} ${item.active ? styles.chartValueActive : ''}`}
                style={{ bottom: `${item.height + 102}px` }}
              >
                {item.value}
              </div>

              <div className={styles.chartBarWrap}>
                <div
                  className={`${styles.chartBar} ${item.active ? styles.chartBarActive : ''}`}
                  style={{ height: `${item.height}px` }}
                />
              </div>

              <div className={styles.chartIconWrap}>
                <img src={item.icon} alt={item.name} className={styles.chartIcon} />
              </div>

              <div className={`${styles.chartLabel} ${item.active ? styles.chartLabelActive : ''}`}>
                {item.name}
              </div>
            </div>
          ))}

          <div className={styles.chartBaseline} />
        </div>
      </div>
    </div>
  );
}

function ReasonSection() {
  return (
    <div className={styles.reasonSection}>
      <div className={styles.page1RightHeader}>
        <div className={styles.inner} />
        <b className={styles.b6}>왜 지그재그를 사용하나요?</b>
      </div>

      <div className={styles.group}>
        <b className={styles.b1}>브랜드 기획 상품이 많아요</b>
        <b className={styles.b2}>뷰티 상품도 한번에 볼 수 있어요</b>
        <b className={styles.b3}>가격대비 성능이 좋아요</b>
        <b className={styles.b4}>빠른 배송에 강점이 있어요</b>
        <b className={styles.b5}>스타일 추천 기능이 좋아요</b>
      </div>
    </div>
  );
}

function MauGraphSection() {
  return (
    <div className={styles.mauGraphSection}>
      <div className={styles.bParent}>
        <div className={styles.b7}>4.5B</div>
        <div className={styles.b7}>4.0B</div>
        <div className={styles.b7}>3.5B</div>
        <div className={styles.b7}>3.0B</div>
        <div className={styles.b7}>2.5B</div>
        <div className={styles.b7}>2.0B</div>
        <div className={styles.b7}>1.5B</div>
      </div>

      <div className={styles.frameParent}>
        <img className={styles.vectorParent} src={group7} alt="" />
      </div>

      <b className={styles.b11}>지그재그 월간 사용자 수(MAU) 추이</b>

      <div className={styles.rectangleParent}>
        <div className={styles.groupChild} />
        <div className={styles.groupItem} />
        <div className={styles.groupInner} />
        <div className={styles.groupChild1} />
      </div>

      <div className={styles.div11}>2024년 2월</div>
      <div className={styles.child1} />
    </div>
  );
}

function ChurnSection() {
  return (
    <div className={styles.churnSection}>
      <b className={styles.b15}>
        <p className={styles.p2}>지그재그 월간 이탈 사용자</p>
        <p className={styles.p4}>
          <span>{`794,664 `}</span>
          <span className={styles.span2}>명</span>
        </p>
      </b>

      <img className={styles.groupIcon} src={group8} alt="" />

      <div className={styles.groupParent}>
        {churnList.map((item, index) => (
          <div
            key={item.rank + item.name}
            className={index === churnList.length - 1 ? styles.parent5 : styles.container}
          >
            <div className={styles.div12}>{item.rank}</div>
            <div className={styles.div13}>{item.name}</div>
            <div className={styles.div21}>{item.count}</div>
            <img className={styles.imageIcon10} src={item.icon} alt={item.name} />
            <div className={styles.groupChild8} />
            <div className={styles.div19}>{item.rate}</div>
            {index === churnList.length - 1 && (
              <div className={styles.div36}>참고 : 경쟁앱 간 중복 이탈자가 발생할 수 있습니다.</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Page1Desktop() {
  return (
    <div className={styles.div1}>
      <img className={styles.imageFx81} src={imageFx81} alt="" />
      <div className={styles.imageFx82} />
      <div className={styles.child} />
      <div className={styles.background}>Background</div>

      <b className={styles.zNo1Container}>
        <span>Z세대가 선택한 No.1 패션 플랫폼, </span>
        <span className={styles.span}>지그재그</span>
      </b>

      <div className={styles.mauContainer}>
        <p className={styles.p}>2025년 2월 기준, 패션 플랫폼 경쟁이 여전히 치열한 가운데,</p>
        <p className={styles.p}>
          지그재그는 여전히 강력한 신규 유입을 유지하며 신규 앱 설치 수 1위를 차지하고 있음
        </p>
      </div>

      <div className={styles.page1Main}>
        <div className={styles.page1Left}>
          <ChartSection />
        </div>

        <div className={styles.page1Right}>
          <ReasonSection />
        </div>
      </div>
    </div>
  );
}

function Page2Desktop() {
  return (
    <div className={styles.div10}>
      <img className={styles.imageFx81} src={imageFx81} alt="" />
      <div className={styles.imageFx821} />
      <div className={styles.child} />
      <div className={styles.background}>Background</div>

      <div className={styles.mauContainer}>
        <p className={styles.p}>여전히 높은 신규 유입을 기록하고 있지만,</p>
        <p className={styles.p}>월간 활성 사용자(MAU) 감소세가 두드러지며 이탈률이 급증하는 모습을 보이고 있음</p>
      </div>

      <b className={styles.zNo1Container}>
        <span>신규 유입 1위, 하지만.. </span>
        <span className={styles.span}>유지율은?</span>
      </b>

      <MauGraphSection />
      <ChurnSection />
    </div>
  );
}

type QuadPanelProps = {
  variant: 'page1-left' | 'page1-right' | 'page2-left' | 'page2-right';
};

function QuadPanel({ variant }: QuadPanelProps) {
  const isPage1 = variant.startsWith('page1');
  const panelClass = [
    styles.quadPanel,
    variant === 'page1-left' ? styles.quadPanelPage1Left : '',
    variant === 'page1-right' ? styles.quadPanelPage1Right : '',
    variant === 'page2-left' ? styles.quadPanelPage2Left : '',
    variant === 'page2-right' ? styles.quadPanelPage2Right : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={panelClass}
      style={{ ['--quad-bg' as any]: `url("${imageFx81}")` }}
    >
      <div className={styles.quadOverlay} />
      <div className={styles.child} />
      <div className={styles.background}>Background</div>

      <b className={styles.zNo1Container}>
        {isPage1 ? (
          <>
            <span>Z세대가 선택한 No.1 패션 플랫폼, </span>
            <span className={styles.span}>지그재그</span>
          </>
        ) : (
          <>
            <span>신규 유입 1위, 하지만.. </span>
            <span className={styles.span}>유지율은?</span>
          </>
        )}
      </b>

      <div className={styles.mauContainer}>
        {isPage1 ? (
          <>
            <p className={styles.p}>2025년 2월 기준, 패션 플랫폼 경쟁이 여전히 치열한 가운데,</p>
            <p className={styles.p}>지그재그는 여전히 강력한 신규 유입을 유지하며 신규 앱 설치 수 1위를 차지하고 있음</p>
          </>
        ) : (
          <>
            <p className={styles.p}>여전히 높은 신규 유입을 기록하고 있지만,</p>
            <p className={styles.p}>월간 활성 사용자(MAU) 감소세가 두드러지며 이탈률이 급증하는 모습을 보이고 있음</p>
          </>
        )}
      </div>

      <div className={styles.quadContentBox}>
        {variant === 'page1-left' && <ChartSection />}
        {variant === 'page1-right' && <div className={styles.quadRightBox}><ReasonSection /></div>}
        {variant === 'page2-left' && <MauGraphSection />}
        {variant === 'page2-right' && <div className={styles.quadRightBox}><ChurnSection /></div>}
      </div>
    </div>
  );
}

function MobileLayout() {
  return (
    <div className={styles.mobileLayout}>
      <div className={styles.mobileBg}>
        <img src={imageFx81} alt="" className={styles.mobileBgImage} />
        <div className={styles.mobileOverlay} />
      </div>

      <div className={styles.mobileInner}>
        <div className={styles.mobileLabelRow}>
          <span className={styles.mobileDot} />
          <span className={styles.mobileLabel}>Background</span>
        </div>

        <h2 className={styles.mobileTitle}>
          Z세대가 선택한 No.1 패션 플랫폼, <span>지그재그</span>
        </h2>

        <p className={styles.mobileDesc}>
          2025년 2월 기준, 패션 플랫폼 경쟁이 치열한 가운데 지그재그는 강력한 신규 유입을 유지하며
          신규 앱 설치 수 1위를 차지하고 있음
        </p>

        <div className={styles.mobileCard}>
          <h3 className={styles.mobileCardTitle}>올해의 패션/의류 신규 설치 순위 (2025)</h3>

          <div className={styles.mobileBars}>
            {chartItems.map((item) => (
              <div key={item.name} className={styles.mobileBarItem}>
                <div className={styles.mobileBarValue}>{item.value}</div>
                <div
                  className={`${styles.mobileBar} ${item.active ? styles.mobileBarActive : ''}`}
                  style={{ height: `${Math.max(48, item.height * 0.62)}px` }}
                />
                <img src={item.icon} alt={item.name} className={styles.mobileBarIcon} />
                <div className={styles.mobileBarLabel}>{item.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.mobileCard}>
          <h3 className={styles.mobileCardTitle}>왜 지그재그를 사용하나요?</h3>
          <div className={styles.mobileReasonList}>
            {reasons.map((reason, index) => (
              <div key={reason} className={styles.mobileReasonItem}>
                <span className={styles.mobileReasonNumber}>0{index + 1}</span>
                <span>{reason}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const Deskresearch = () => {
  const mode = useLayoutMode();

  const desktopView = useMemo(
    () => (
      <div className={styles.desktopViewport}>
        <div className={styles.desktopTrack}>
          <div className={styles.desktopPage}>
            <Page1Desktop />
          </div>
          <div className={styles.desktopPage}>
            <Page2Desktop />
          </div>
        </div>
      </div>
    ),
    []
  );

  const quadView = useMemo(
    () => (
      <div className={styles.quadLayout}>
        <QuadPanel variant="page1-left" />
        <QuadPanel variant="page1-right" />
        <QuadPanel variant="page2-left" />
        <QuadPanel variant="page2-right" />
      </div>
    ),
    []
  );

  const mobileView = useMemo(() => <MobileLayout />, []);

  return (
    <section className={styles.deskresearch}>
      <section className={styles.page}>
        {mode === 'desktop' && desktopView}
        {mode === 'quad' && quadView}
        {mode === 'mobile' && mobileView}
      </section>
    </section>
  );
};

export default Deskresearch;