'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import './zigzag-reverse.tokens.css';
import styles from './zigzag-reverse.module.css';
import { withBasePath } from './lib/asset';

// 컴포넌트 임포트
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

// 가로 스크롤 섹션인 Deskresearch는 클라이언트 사이드에서 로드
const Deskresearch = dynamic(() => import('./components/Deskresearch'), {
  ssr: false,
  loading: () => <div className={styles.loading}>Loading research section...</div>,
});

export default function ZigzagReverseExperience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [vw, setVw] = useState(0);

  // 1. 브라우저 너비 감지 (가로 스크롤 계산용)
  useEffect(() => {
    const updateWidth = () => {
      setVw(window.innerWidth);
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // 1200px 미만일 때는 가로 스크롤 애니메이션을 끄고 세로로 보여주는 것이 일반적입니다.
  const isSmallViewport = vw > 0 && vw < 1200;

  // 2. GSAP 가로 스크롤 로직
  useEffect(() => {
    // 윈도우가 없거나 작은 화면일 경우 가로 스크롤을 적용하지 않음
    if (typeof window === 'undefined' || isSmallViewport || vw === 0) return;

    let ctx: gsap.Context;

    const initGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const sections = sectionRef.current;
        const container = triggerRef.current;

        if (!sections || !container) return;

        // 실제 가로로 움직여야 할 거리 계산
        const getScrollAmount = () => {
          return sections.offsetWidth - window.innerWidth;
        };
        
        // 스크롤 속도 배수 (높을수록 천천히)
        const scrollSpeedFactor = 1.8; 
        
        gsap.to(sections, {
          x: () => -getScrollAmount(),
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: () => `+=${getScrollAmount() * scrollSpeedFactor}`, 
            pin: true,
            scrub: 2, // 휠을 멈춰도 부드럽게 따라오도록 설정
            invalidateOnRefresh: true, // 리사이즈 시 재계산
            anticipatePin: 1,
          },
        });
      }, triggerRef);
    };

    initGSAP();

    return () => {
      if (ctx) ctx.revert();
    };
  }, [isSmallViewport, vw]); // vw가 변경될 때 GSAP 트리거 갱신

  return (
    <article className={styles.pageScope} data-project="zigzag-reverse">
      <Main />
      <Spacer />
      <Overview />
      <Spacer2 />

      {/* 가로 스크롤 (데스크탑 전용) */}
      <section ref={triggerRef} className={styles.horizontalTrigger}>
        <div ref={sectionRef} className={styles.horizontalContent}>
          <Deskresearch vector22={withBasePath('/portfolio/zigzag-reverse/assets/image/Vector 22.svg')} />
        </div>
      </section>

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