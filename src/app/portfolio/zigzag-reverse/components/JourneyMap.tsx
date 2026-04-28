'use client';

import styles from './styles/JourneyMap.module.css';
import { useEffect, useState } from 'react';
import { withBasePath } from '../lib/asset';

const svgg = withBasePath('/portfolio/zigzag-reverse/assets/image/Group 1000003918.svg');

type LayoutMode = 'desktop' | 'tablet' | 'mobile';
type JourneyCell = Array<string | { text: string; accent: true; suffix?: string; prefix?: string}>;

const JOURNEY_COLUMNS = ['제품 탐색 및 관심', '상품 상세 조회', '장바구니 및 찜하기', '구매 및 배송', '구매 후 재방문'];
const JOURNEY_ROWS: Array<{ label: string; accent?: boolean; cells: JourneyCell[] }> = [
  {
    label: 'Action',
    cells: [
      ['앱 실행 후 홈 피드/검색을', '이용해 원하는 상품 탐색'],
      ['관심 있는 상품을 클릭해', '상품 상세페이지 확인'],
      ['장바구니 담기 후', '결제 고민'],
      ['결제 완료 후', '상품 배송 대기'],
      ['구매 후 앱 재방문,', '추가 구매 고려'],
    ],
  },
  {
    label: 'Pain Point',
    accent: true,
    cells: [
      ['원하는 상품을 찾으려 검색과', '카테고리 ', { text: '탐색에 시간을 낭비', accent: true }],
      ['실제 사이즈가 애매하고,', '모델 착용샷만 있어서', { text: '실제 핏 예측 어려움', accent: true }],
      [{ text: '실시간 가격 변동 정보가 부족', accent: true }, '하고, 찜한 상품과 장바구니', '상품을 한 눈에 파악하기 어려움'],
      ['배송 상태 업데이트가 느려', '불안감 증가'],
      ['재방문 유도 요소 부족,', '개인화 요소가 부족하여', '앱을 자주 찾지 않게 됨'],
    ],
  },
  {
    label: 'Solution',
    accent: true,
    cells: [
      [{ text: '추천 알고리즘 개선', accent: true }, '으로', '개인화된 상품을 첫 화면에서', '바로 확인'],
      ['비슷한 체형 유저 리뷰 및', { text: '추천 사이즈 정보를 제공', accent: true }, '하며', '개인 옷장기능을 활용하여', '상품 핏을 미리 확인 가능'],
      ['실시간 가격 변동 정보를 제공하며', '찜한 상품과 장바구니 상품을', '한 화면에서 비교 가능하도록', 'UI /UX개선'],
      ['배송 상태가 변경될 때 즉각적인', '알림 제공, 배송 위치·단계', '표시 강화'],
      [{ text: 'AI가 구매 이력을 반영', accent: true }, '해', '"너에게 딱 맞는 스타일" 푸시 알림,', '개인 맞춤형 스타일링 콘텐츠 제공'],
    ],
  },
];
const DESKTOP_JOURNEY_ROWS: Array<{ label: string; accent?: boolean; cells: JourneyCell[] }> = [
  JOURNEY_ROWS[0],
  {
    label: 'Pain Point',
    accent: true,
    cells: [
      ['원하는 상품을 찾으려 검색과', { prefix: '카테고리 ', text: '탐색에 시간을 낭비', accent: true }],
      ['실제 사이즈가 애매하고,', '모델 착용샷만 있어서', { text: '실제 핏 예측 어려움', accent: true }],
      [{ text: '실시간 가격 변동 정보가 부족', accent: true }, '하고, 찜한 상품과 장바구니 ', '상품을 한 눈에 파악하기 어려움'],
      ['배송 상태 업데이트가 느려', '불안감 증가'],
      ['재방문 유도 요소 부족,', '개인화 요소가 부족하여', '앱을 자주 찾지 않게 됨'],
    ],
  },
  {
    label: 'Solution',
    accent: true,
    cells: [
      [{ text: '추천 알고리즘 개선', accent: true, suffix: '으로' }, '개인화된 상품을 첫 화면에서', '바로 확인'],
      ['비슷한 체형 유저 리뷰 및 ', { text: '추천 사이즈 정보를 제공', accent: true, suffix: '하며'}, '개인 옷장기능을 활용하여', '상품 핏을 미리 확인 가능'],
      ['실시간 가격 변동 정보를 제공하며', '찜한 상품과 장바구니 상품을', '한 화면에서 비교 가능하도록', 'UI /UX개선'],
      ['배송 상태가 변경될 때 즉각적인', '알림 제공, 배송 위치·단계', '표시 강화'],
      [{ text: 'AI가 구매 이력을 반영', accent: true, suffix: '해'}, '"너에게 딱 맞는 스타일" 푸시 알림, ', '개인 맞춤형 스타일링 콘텐츠 제공'],
    ],
  },
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

function JourneyContent({ className }: { className?: string }) {
  	return (
    		<div className={`${styles.journeyMap}${className ? ` ${className}` : ''}`}>
      			<div className={styles.journeyMapChild} />
      			<div className={styles.journeyMapItem} />
      			<div className={styles.customerJourneyMap}>Customer Journey Map</div>
      			<b className={styles.b}>
        				<span>{`고객의 `}</span>
        				<span className={styles.span}>불편함</span>
        				<span>을 적극적으로 이해하기</span>
      			</b>
      			<div className={styles.neechJourney}>유저들이 어플을 사용하는 과정에서 느끼는 불편함과 Neech를 중점으로 Journey Map을 작성했습니다</div>
            <div className={styles.desktopCardScroll}>
              <div className={styles.desktopCardCanvas}>
                <div className={styles.journeyMapInner} />
                <div className={styles.div}>
                      <p className={styles.p}>
                        <span className={styles.span}>추천 알고리즘 개선</span>
                        <span>으로</span>
                      </p>
                      <p className={styles.p}>개인화된 상품을 첫 화면에서</p>
                      <p className={styles.p}>바로 확인</p>
                </div>
                <div className={styles.uiUx}>
                      <p className={styles.p}>실시간 가격 변동 정보를 제공하며</p>
                      <p className={styles.p}>찜한 상품과 장바구니 상품을</p>
                      <p className={styles.p}>한 화면에서 비교 가능하도록</p>
                      <p className={styles.p}>UI /UX개선</p>
                </div>
                <div className={styles.div1}>
                      <p className={styles.p}>{`비슷한 체형 유저 리뷰 및 `}</p>
                      <p className={styles.p}>
                        <span className={styles.span}>추천 사이즈 정보를 제공</span>
                        <span>{`하며 `}</span>
                      </p>
                      <p className={styles.p}>개인 옷장기능을 활용하여</p>
                      <p className={styles.p}>상품 핏을 미리 확인 가능</p>
                </div>
                <div className={styles.parent}>
                      <div className={styles.div2}>제품 탐색 및 관심</div>
                      <div className={styles.div3}>상품 상세 조회</div>
                      <div className={styles.div4}>장바구니 및 찜하기</div>
                      <div className={styles.div5}>구매 및 배송</div>
                      <div className={styles.div6}>구매 후 재방문</div>
                      <div className={styles.groupChild} />
                      <div className={styles.groupItem} />
                      <div className={styles.groupInner} />
                      <div className={styles.rectangleDiv} />
                      <div className={styles.groupChild1} />
                      <div className={styles.groupChild2} />
                      <div className={styles.rectangleParent}>
                        <div className={styles.frameChild} />
                        <div className={styles.frameItem} />
                        <div className={styles.frameInner} />
                        <div className={styles.frameChild1} />
                        <div className={styles.frameChild2} />
                        <div className={styles.frameChild3} />
                        <div className={styles.div7}>
                            <p className={styles.p}>앱 실행 후 홈 피드/검색을</p>
                            <p className={styles.p}>이용해 원하는 상품 탐색</p>
                        </div>
                        <div className={styles.div8}>
                            <p className={styles.p}>관심 있는 상품을 클릭해</p>
                            <p className={styles.p}>상품 상세페이지 확인</p>
                        </div>
                        <div className={styles.div9}>
                            <p className={styles.p}>장바구니 담기 후</p>
                            <p className={styles.p}>결제 고민</p>
                        </div>
                        <div className={styles.div10}>
                            <p className={styles.p}>결제 완료 후</p>
                            <p className={styles.p}>상품 배송 대기</p>
                        </div>
                        <div className={styles.div11}>
                            <p className={styles.p}>구매 후 앱 재방문,</p>
                            <p className={styles.p}>추가 구매 고려</p>
                        </div>
                      </div>
                      <div className={styles.rectangleGroup}>
                        <div className={styles.frameChild4} />
                        <div className={styles.frameChild5} />
                        <div className={styles.frameChild6} />
                        <div className={styles.frameChild7} />
                        <div className={styles.frameChild8} />
                        <div className={styles.frameChild9} />
                        <div className={styles.div12}>
                            <p className={styles.p}>배송 상태가 변경될 때 즉각적인</p>
                            <p className={styles.p}>알림 제공, 배송 위치·단계</p>
                            <p className={styles.p}>표시 강화</p>
                        </div>
                        <div className={styles.aiContainer}>
                            <p className={styles.p}>
                              <span className={styles.span}>AI가 구매 이력을 반영</span>
                              <span>{`해 `}</span>
                            </p>
                            <p className={styles.p}>{`"너에게 딱 맞는 스타일" 푸시 알림, `}</p>
                            <p className={styles.p}>개인 맞춤형 스타일링 콘텐츠 제공</p>
                        </div>
                      </div>
                      <div className={styles.rectangleContainer}>
                        <div className={styles.frameChild} />
                        <div className={styles.frameChild11} />
                        <div className={styles.frameItem} />
                        <div className={styles.frameInner} />
                        <div className={styles.frameChild1} />
                        <div className={styles.frameChild2} />
                        <div className={styles.frameChild3} />
                        <div className={styles.frameChild17} />
                        <div className={styles.frameChild18} />
                        <div className={styles.frameChild19} />
                      </div>
                      <div className={styles.frameDiv}>
                        <div className={styles.frameChild} />
                        <div className={styles.frameChild11} />
                        <div className={styles.frameItem} />
                        <div className={styles.frameInner} />
                        <div className={styles.frameChild1} />
                        <div className={styles.frameChild2} />
                        <div className={styles.frameChild3} />
                        <div className={styles.frameChild17} />
                        <div className={styles.frameChild18} />
                        <div className={styles.frameChild19} />
                        <div className={styles.div13}>
                            <p className={styles.p}>실제 사이즈가 애매하고,</p>
                            <p className={styles.p}>모델 착용샷만 있어서</p>
                            <p className={styles.p27}>실제 핏 예측 어려움</p>
                        </div>
                        <div className={styles.div14}>
                            <p className={styles.p27}>실시간 가격 변동 정보가 부족</p>
                            <p className={styles.p}>{`하고, 찜한 상품과 장바구니 `}</p>
                            <p className={styles.p}>상품을 한 눈에 파악하기 어려움</p>
                        </div>
                      </div>
                      <div className={styles.div15}>
                        <p className={styles.p}>원하는 상품을 찾으려 검색과</p>
                        <p className={styles.p}>
                            <span>{`카테고리 `}</span>
                            <span className={styles.span}>탐색에 시간을 낭비</span>
                        </p>
                      </div>
                      <div className={styles.div16}>
                        <p className={styles.p}>배송 상태 업데이트가 느려</p>
                        <p className={styles.p}>불안감 증가</p>
                      </div>
                      <div className={styles.div17}>
                        <p className={styles.p}>재방문 유도 요소 부족,</p>
                        <p className={styles.p}>개인화 요소가 부족하여</p>
                        <p className={styles.p}>앱을 자주 찾지 않게 됨</p>
                      </div>
                      <div className={styles.journey}>Journey</div>
                      <div className={styles.action}>Action</div>
                      <div className={styles.emotion}>Emotion</div>
                      <div className={styles.solution}>Solution</div>
                      <div className={styles.painPoint}>{`Pain Point `}</div>
                </div>
                <img className={styles.groupIcon} alt="" src={svgg} />
                <div className={styles.group}>
                      <div className={styles.div18}>만족</div>
                      <div className={styles.div19}>😍</div>
                </div>
                <div className={styles.container}>
                      <div className={styles.div18}>보통</div>
                      <div className={styles.div19}>😮</div>
                </div>
                <div className={styles.groupDiv}>
                      <div className={styles.div18}>불만</div>
                      <div className={styles.div19}>😱</div>
                </div>
              </div>
            </div>
    		</div>);
}

function JourneyCellText({ lines }: { lines: JourneyCell }) {
  return (
    <>
      {lines.map((line, index) => {
        const key = `${typeof line === 'string' ? line : line.text}-${index}`;
        const prefix = index > 0 ? ' ' : '';

        if (typeof line === 'string') {
          return <span key={key}>{prefix}{line}</span>;
        }

        return (
          <span key={key} className={styles.cellAccent}>
            {prefix}{line.text}
          </span>
        );
      })}
    </>
  );
}

function DesktopJourneyCellText({ lines }: { lines: JourneyCell }) {
  return (
    <>
      {lines.map((line, index) => {
        const key = `${typeof line === 'string' ? line : line.text}-${index}`;

        if (typeof line === 'string') {
          return <p key={key} className={styles.p}>{line}</p>;
        }
        
        return (
          <p key={key} className={styles.p}>
            {line.prefix && <span>{line.prefix}</span>}
            <span className={styles.cellAccent}>{line.text}</span>
            {line.suffix && <span>{line.suffix}</span>}
          </p>
        );
      })}
    </>
  );
}

function DesktopStageCells({ cells }: { cells: JourneyCell[] }) {
  return (
    <div className={styles.desktopStageGrid}>
      {cells.map((cell, index) => (
        <div key={JOURNEY_COLUMNS[index]} className={styles.desktopGridCell}>
          <DesktopJourneyCellText lines={cell} />
        </div>
      ))}
    </div>
  );
}

function DesktopJourneyGrid() {
  const [actionRow, painPointRow, solutionRow] = DESKTOP_JOURNEY_ROWS;

  return (
    <div className={styles.desktopGridTable}>
      <div className={`${styles.desktopGridTitle} ${styles.desktopGridCell}`}>Journey</div>
      <div className={styles.desktopGridEmotionSpace} />
      <div className={styles.desktopStageGrid}>
        {JOURNEY_COLUMNS.map((column) => (
          <div key={column} className={`${styles.desktopGridCell} ${styles.desktopGridHeader}`}>
            {column}
          </div>
        ))}
      </div>

      <div className={`${styles.desktopGridTitle} ${styles.desktopGridCell}`}>{actionRow.label}</div>
      <div className={styles.desktopGridEmotionSpace} />
      <DesktopStageCells cells={actionRow.cells} />

      <div className={`${styles.desktopGridTitle} ${styles.desktopGridTitleAccent} ${styles.desktopGridCell}`}>{painPointRow.label}</div>
      <div className={styles.desktopGridEmotionSpace} />
      <DesktopStageCells cells={painPointRow.cells} />

      <div className={`${styles.desktopGridTitle} ${styles.desktopGridCell} ${styles.desktopEmotionTitle}`}>Emotion</div>
      <div className={styles.desktopEmotionLabels}>
        <div>
          <span className={styles.desktopEmotionEmoji}>😍</span>
          <span>만족</span>
        </div>
        <div>
          <span className={styles.desktopEmotionEmoji}>😮</span>
          <span>보통</span>
        </div>
        <div>
          <span className={styles.desktopEmotionEmoji}>😱</span>
          <span>불만</span>
        </div>
      </div>
      <div className={styles.desktopEmotionGraphArea}>
        <span className={styles.desktopEmotionLine} />
        <span className={styles.desktopEmotionLine} />
        <span className={styles.desktopEmotionLine} />
        <img className={styles.desktopEmotionGraph} alt="" src={svgg} />
      </div>

      <div className={`${styles.desktopGridTitle} ${styles.desktopGridTitleAccent} ${styles.desktopGridCell}`}>{solutionRow.label}</div>
      <div className={styles.desktopGridEmotionSpace} />
      <DesktopStageCells cells={solutionRow.cells} />
    </div>
  );
}

function DesktopJourney() {
  return (
    <div className={styles.journeyMap}>
      <div className={styles.journeyMapItem} />
      <div className={styles.customerJourneyMap}>Customer Journey Map</div>
      <b className={styles.b}>
        <span>{`고객의 `}</span>
        <span className={styles.span}>불편함</span>
        <span>을 적극적으로 이해하기</span>
      </b>
      <div className={styles.neechJourney}>유저들이 어플을 사용하는 과정에서 느끼는 불편함과 Neech를 중점으로 Journey Map을 작성했습니다</div>
      <section className={styles.desktopGridShell}>
        <DesktopJourneyGrid />
      </section>
    </div>
  );
}

function ResponsiveJourneyTable() {
  const [actionRow, painPointRow, solutionRow] = JOURNEY_ROWS;

  return (
    <div className={styles.journeyTableScroll}>
      <table className={styles.journeyTable}>
        <colgroup>
          <col className={styles.labelCol} />
          <col className={styles.emotionLabelCol} />
          {JOURNEY_COLUMNS.map((column) => (
            <col key={column} className={styles.stageCol} />
          ))}
        </colgroup>
        <thead>
          <tr>
            <th scope="col" colSpan={2} className={styles.rowHeading}>
              Journey
            </th>
            {JOURNEY_COLUMNS.map((column) => (
              <th key={column} scope="col">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" colSpan={2} className={styles.rowHeading}>
              {actionRow.label}
            </th>
            {actionRow.cells.map((cell, index) => (
              <td key={`${actionRow.label}-${JOURNEY_COLUMNS[index]}`}>
                <JourneyCellText lines={cell} />
              </td>
            ))}
          </tr>
          <tr>
            <th scope="row" colSpan={2} className={styles.rowHeadingAccent}>
              {painPointRow.label}
            </th>
            {painPointRow.cells.map((cell, index) => (
              <td key={`${painPointRow.label}-${JOURNEY_COLUMNS[index]}`}>
                <JourneyCellText lines={cell} />
              </td>
            ))}
          </tr>
          <tr className={styles.emotionBandRow}>
            <th scope="row" rowSpan={3} className={styles.rowHeading}>
              Emotion
            </th>
            <td className={styles.emotionLabel}>
              <span>😍</span>
              <span>만족</span>
            </td>
            <td colSpan={5} className={styles.emotionGraphBand}>
              <img className={styles.emotionGraph} src={svgg} alt="감정 변화 그래프" />
            </td>
          </tr>
          <tr className={styles.emotionBandRow}>
            <td className={styles.emotionLabel}>
              <span>😮</span>
              <span>보통</span>
            </td>
            <td colSpan={5} className={styles.emotionGraphBand} />
          </tr>
          <tr className={styles.emotionBandRow}>
            <td className={styles.emotionLabel}>
              <span>😱</span>
              <span>불만</span>
            </td>
            <td colSpan={5} className={styles.emotionGraphBand} />
          </tr>
          <tr>
            <th scope="row" colSpan={2} className={styles.rowHeadingAccent}>
              {solutionRow.label}
            </th>
            {solutionRow.cells.map((cell, index) => (
              <td key={`${solutionRow.label}-${JOURNEY_COLUMNS[index]}`}>
                <JourneyCellText lines={cell} />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function JourneyHeader() {
  return (
    <header className={styles.sectionHeader}>
      <div className={styles.sectionLabelRow}>
        <span className={styles.sectionDot} />
        <span className={styles.sectionLabel}>Customer Journey Map</span>
      </div>

      <h2 className={styles.sectionTitle}>
        <span>고객의 </span>
        <span className={styles.sectionTitleAccent}>불편함</span>
        <span>을 적극적으로 이해하기</span>
      </h2>

      <p className={styles.sectionDescription}>
        유저들이 어플을 사용하는 과정에서 느끼는 불편함과 Neech를 중점으로 Journey Map을 작성했습니다
      </p>
    </header>
  );
}

function ResponsiveJourney({ mobile }: { mobile?: boolean }) {
  return (
    <div className={mobile ? styles.mobileShell : styles.tabletShell}>
      <div className={styles.responsiveInner}>
        <JourneyHeader />
        <section className={styles.journeyTableShell}>
          <ResponsiveJourneyTable />
        </section>
      </div>
    </div>
  );
}

const JourneyMap = () => {
  const mode = useLayoutMode();

  if (mode === 'desktop') {
    return <DesktopJourney />;
  }

  return <ResponsiveJourney mobile={mode === 'mobile'} />;
};

export default JourneyMap;
