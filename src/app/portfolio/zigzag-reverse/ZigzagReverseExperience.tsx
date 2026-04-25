'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import './zigzag-reverse.tokens.css';
import styles from './zigzag-reverse.module.css';
import Header from '../../../components/Header';

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
  const handleAbout = () => {
    window.location.href = '/#about';
  };

  return (
    <article className={styles.pageScope} data-project="zigzag-reverse">
      <Header aboutHref="/#about" onAboutClick={handleAbout} />

      <Link
        href="/#selected-works"
        className="group fixed left-6 top-[72px] z-[60] inline-flex h-[42px] min-w-[42px] items-center justify-center rounded-full border border-white/15 bg-black/55 px-[13px] text-sm font-medium tracking-[0.04em] text-white/88 shadow-[0_14px_32px_rgba(0,0,0,0.28)] backdrop-blur-md transition-[border-color,background-color,box-shadow,color,transform] duration-300 hover:-translate-x-[2px] hover:border-white/28 hover:bg-black/78 hover:text-white md:left-12 md:top-[72px]"
      >
        <span aria-hidden="true" className="inline-flex h-4 w-4 flex-none items-center justify-center text-white">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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
