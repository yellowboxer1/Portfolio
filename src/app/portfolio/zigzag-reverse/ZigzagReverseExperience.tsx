'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import './zigzag-reverse.tokens.css';
import styles from './zigzag-reverse.module.css';

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

const Deskresearch = dynamic(() => import('./components/Deskresearch'), {
  ssr: false,
  loading: () => <div className={styles.loading}>Loading research section...</div>,
});

export default function ZigzagReverseExperience() {
  const triggerRef = useRef<HTMLElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const [isVerticalDeskresearch, setIsVerticalDeskresearch] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mq = window.matchMedia('(max-width: 1330px)');

    const update = () => {
      setIsVerticalDeskresearch(mq.matches);
    };

    update();

    if (mq.addEventListener) {
      mq.addEventListener('change', update);
      return () => mq.removeEventListener('change', update);
    }

    mq.addListener(update);
    return () => mq.removeListener(update);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let ctx: any = null;
    let resizeObserver: ResizeObserver | null = null;
    let mounted = true;

    const cleanup = async () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver = null;
      }

      if (ctx) {
        ctx.revert();
        ctx = null;
      }

      try {
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        ScrollTrigger.getAll().forEach((trigger) => {
          if (
            triggerRef.current &&
            (trigger.trigger === triggerRef.current || trigger.pin === triggerRef.current)
          ) {
            trigger.kill();
          }
        });
      } catch {
        // noop
      }

      if (sectionRef.current) {
        sectionRef.current.style.transform = '';
        sectionRef.current.style.width = '';
      }
    };

    const initGSAP = async () => {
      if (isVerticalDeskresearch) {
        await cleanup();
        return;
      }

      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

      if (!mounted) return;

      gsap.registerPlugin(ScrollTrigger);

      const container = triggerRef.current;
      const sections = sectionRef.current;

      if (!container || !sections) return;

      const getDesktopTrack = () =>
        sections.querySelector('[class*="desktopTrack"]') as HTMLElement | null;

      const getScrollAmount = () => {
        const desktopTrack = getDesktopTrack();
        const contentWidth = Math.max(
          sections.scrollWidth,
          desktopTrack?.scrollWidth ?? 0,
          desktopTrack?.offsetWidth ?? 0
        );

        return Math.max(0, contentWidth - window.innerWidth);
      };

      const applyWidth = () => {
        const desktopTrack = getDesktopTrack();
        const contentWidth = Math.max(
          sections.scrollWidth,
          desktopTrack?.scrollWidth ?? 0,
          desktopTrack?.offsetWidth ?? 0,
          window.innerWidth
        );

        sections.style.width = `${contentWidth}px`;
      };

      const build = () => {
        applyWidth();

        ctx = gsap.context(() => {
          const scrollSpeedFactor = 1.8;

          gsap.set(sections, { x: 0 });

          gsap.to(sections, {
            x: () => -getScrollAmount(),
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top top',
              end: () => `+=${getScrollAmount() * scrollSpeedFactor}`,
              pin: true,
              scrub: 2,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });
        }, triggerRef);

        ScrollTrigger.refresh();
      };

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!mounted) return;
          build();

          resizeObserver = new ResizeObserver(() => {
            applyWidth();
            ScrollTrigger.refresh();
          });

          resizeObserver.observe(sections);

          const desktopTrack = getDesktopTrack();
          if (desktopTrack) {
            resizeObserver.observe(desktopTrack);
          }
        });
      });
    };

    initGSAP();

    return () => {
      mounted = false;
      cleanup();
    };
  }, [isVerticalDeskresearch]);

  return (
    <article className={styles.pageScope} data-project="zigzag-reverse">
      <Main />
      <Spacer />
      <Overview />
      <Spacer2 />

      <section ref={triggerRef} className={styles.horizontalTrigger}>
        <div ref={sectionRef} className={styles.horizontalContent}>
          <Deskresearch />
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