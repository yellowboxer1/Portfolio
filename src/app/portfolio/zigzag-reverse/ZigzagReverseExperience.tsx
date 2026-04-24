'use client';

import dynamic from 'next/dynamic';
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
  const handleBack = () => {
    window.location.href = '/#selected-works';
  };

  const handleAbout = () => {
    window.location.href = '/#about';
  };

  return (
    <article className={styles.pageScope} data-project="zigzag-reverse">
      <Header aboutHref="/#about" onAboutClick={handleAbout} />

      <button type="button" className={styles.projectBackButton} onClick={handleBack}>
        <span className={styles.projectBackArrow} aria-hidden="true">
          ←
        </span>
        <span className={styles.projectBackLabel}>Back</span>
      </button>

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
