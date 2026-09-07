'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import './zigzag-reverse.tokens.css';
import styles from './zigzag-reverse.module.css';
import Header from '../../../components/Header';
import ProjectIntroSection from '../../../components/ProjectIntroSection';

import Main from './components/Main';
import Spacer from './components/Spacer';
import Overview from './components/Overview';
import Spacer2 from './components/Spacer2';
import Spacer3 from './components/Spacer3';
import Swot from './components/Swot';
import Persona from './components/Persona';
import Problem from './components/Problem';
import JourneyMap from './components/JourneyMap';
import UserFlowChart from './components/UserFlowChart';
import DesignGuide from './components/DesignGuide';
import Spacer4 from './components/Spacer4';
import OnboardingPage from './components/OnboardingPage';
import Home from './components/Home';
import Store from './components/Store';
import Discover from './components/Discover';
import Closet from './components/Closet';

const zigzagIntro = {
  badge: '개인 프로젝트',
  title: '커머스 플랫폼 지그재그(ZigZag) 서비스 리뉴얼',
  meta: [
    { label: '발주처', value: '개인 프로젝트' },
    { label: '프로젝트유형', value: 'UX Strategy · Reverse Planning' },
    { label: '사업비', value: '해당 없음' },
  ],
  techStack: ['React', 'Framer', 'Figma', 'Photoshop', 'Illustrator', 'UX Research', 'Service Flow'],
  features: [
    'AI 기반 퍼스널 컬러 진단',
    '체형별 스타일링 팁 제공',
    '나만의 옷장 기능',
    '개인 맞춤 스타일 추천',
    '모바일 탐색 구조 개선',
    '관심 상품 중심 구매 흐름 재설계',
  ],
  overview:
    '지그재그 모바일 앱의 탐색 흐름과 개인화 경험을 분석하고, 퍼스널 컬러·체형·옷장 데이터를 기반으로 맞춤 스타일링을 제안하는 리뉴얼 방향을 설계한 개인 프로젝트입니다. 복잡한 커머스 탐색 구조를 줄이고, 사용자가 자신의 취향과 조건에 맞는 상품을 더 빠르게 발견할 수 있도록 서비스 구조와 주요 화면을 재구성했습니다.',
};

const Deskresearch = dynamic(() => import('./components/Deskresearch'), {
  ssr: false,
  loading: () => <div className={styles.loading}>Loading research section...</div>,
});

export default function ZigzagReverseExperience() {
  const handleAbout = () => {
    window.location.href = '/#about';
  };

  return (
    <article className={styles.pageScope} data-project="zigzag-reverse">
      <Header aboutHref="/#about" onAboutClick={handleAbout} />

      <Link
        href="/#selected-works"
        className="group fixed left-6 top-[72px] z-[60] inline-flex h-[34px] min-w-[34px] items-center justify-center rounded-full border border-white/15 bg-black/55 px-[10px] text-xs font-medium tracking-[0.04em] text-white/88 shadow-[0_14px_32px_rgba(0,0,0,0.28)] backdrop-blur-md transition-[border-color,background-color,box-shadow,color,transform] duration-300 hover:-translate-x-[2px] hover:border-white/28 hover:bg-black/78 hover:text-white md:left-12 md:top-[72px] md:h-[38px] md:min-w-[38px] md:px-3 md:text-[13px] lg:h-[42px] lg:min-w-[42px] lg:px-[13px] lg:text-sm"
      >
        <span aria-hidden="true" className="inline-flex h-3.5 w-3.5 flex-none items-center justify-center text-white md:h-[15px] md:w-[15px] lg:h-4 lg:w-4">
          <svg className="h-full w-full" viewBox="0 0 16 16" fill="none">
            <path
              d="M13 8H3.5M7.5 4L3.5 8L7.5 12"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-[max-width,opacity,margin-left] duration-300 group-hover:ml-2 group-hover:max-w-[120px] group-hover:opacity-100">
          Back
        </span>
      </Link>

      <Main />
      <Spacer />
      <ProjectIntroSection {...zigzagIntro} />
      <Overview />
      <Spacer2 />

      <Deskresearch />

      <Spacer3 />
      <Swot />
      <Persona />
      <JourneyMap />
      <Problem />
      <UserFlowChart />
      <DesignGuide />
      <Spacer4 />
      <OnboardingPage />
      <Home />
      <Store />
      <Discover />
      <Closet />
    </article>
  );
}
