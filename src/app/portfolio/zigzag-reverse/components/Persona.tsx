'use client';

import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';
import styles from './styles/Persona.module.css';
import { withBasePath } from '../lib/asset';

const g39 = withBasePath('/portfolio/zigzag-reverse/assets/image/Group 39.png');
const p1 = withBasePath('/portfolio/zigzag-reverse/assets/image/p1@4x.png');
const p2 = withBasePath('/portfolio/zigzag-reverse/assets/image/p2@4x.png');
const p3 = withBasePath('/portfolio/zigzag-reverse/assets/image/p3@4x.png');
const PERSONA_STAGE_WIDTH = 1724;
const PERSONA_STAGE_HEIGHT = 1450;
const PERSONA_STAGE_OFFSET_TOP = 432;

type LayoutMode = 'desktop' | 'tablet' | 'mobile';

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

function useViewportScale(baseWidth: number) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      setScale(Math.min(1, window.innerWidth / baseWidth));
    };

    updateScale();
    window.addEventListener('resize', updateScale);

    return () => {
      window.removeEventListener('resize', updateScale);
    };
  }, [baseWidth]);

  return scale;
}

function PersonaVisualStage({ scale }: { scale: number }) {
  const viewportStyle = {
    width: `${PERSONA_STAGE_WIDTH * scale}px`,
    height: `${PERSONA_STAGE_HEIGHT * scale}px`,
  } as CSSProperties;
  const canvasStyle = {
    transform: `scale(${scale})`,
  } as CSSProperties;

  return (
    <section className={styles.personaStageSection}>
      <div className={styles.personaStageViewport} style={viewportStyle}>
        <div className={styles.personaStageCanvas} style={canvasStyle}>
          <div className={styles.personaStageLayer}>
            <div className={styles.vectorParent}>
              <img className={styles.groupChild} src={g39} alt="" aria-hidden="true" />
              <b className={styles.needs}>Needs</b>
            </div>
            <img className={styles.groupIcon} src={p1} alt="페르소나 1" />
            <img className={styles.maskGroupIcon} src={p2} alt="페르소나 2" />
            <img className={styles.maskGroupIcon1} src={p3} alt="페르소나 3" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ResponsivePersona({ mobile }: { mobile?: boolean }) {
  const scale = useViewportScale(1920);

  return (
    <div className={mobile ? styles.mobileShell : styles.tabletShell}>
      <div className={styles.responsiveInner}>
        <header className={styles.sectionHeader}>
          <div className={styles.sectionLabelRow}>
            <span className={styles.sectionDot} />
            <span className={styles.sectionLabel}>Persona</span>
          </div>

          <h2 className={styles.sectionTitle}>
            <span className={`${styles.sectionTitleWord} ${styles.sectionTitleAccent}`}>지그재그</span>
            <span className={styles.sectionTitleWord}>사용자들에 대한</span>
            <span className={styles.sectionTitleWord}>이해와 공감</span>
          </h2>

          <div className={styles.sectionDescription}>
            <p>사용자의 니즈를 분명히 파악하고자 유저 리서치 결과를 통해 가상의 페르소나를 설정하여 서비스 사용자들을 구체화 하였습니다.</p>
            <p>또한 지그재그를 이용하면서 겪는 불편한 점을 담고, 사용자들의 행동 분석을 키워드로 도출하였습니다.</p>
          </div>
        </header>
      </div>

      <PersonaVisualStage scale={scale} />
    </div>
  );
}

function DesktopPersona() {
  const scale = useViewportScale(1920);
  const desktopStyle = {
    marginTop: '116px',
    height: `${PERSONA_STAGE_OFFSET_TOP + PERSONA_STAGE_HEIGHT * scale}px`,
  } as CSSProperties;

  return (
    <div className={styles.div} style={desktopStyle}>
      <div className={styles.child} />
      <div className={styles.persona}>Persona</div>
      <b className={styles.b}>
        <span>지그재그</span>
        <span className={styles.span}> 사용자들에 대한 이해와 공감</span>
      </b>
      <div className={styles.div1}>
        <p className={styles.p}>사용자의 니즈를 분명히 파악하고자 유저 리서치 결과를 통해 가상의 페르소나를 설정하여 서비스 사용자들을 구체화 하였습니다.</p>
        <p className={styles.p}>또한 지그재그를 이용하면서 겪는 불편한 점을 담고, 사용자들의 행동 분석을 키워드로 도출하였습니다.</p>
      </div>
      <div className={styles.desktopStageOffset}>
        <PersonaVisualStage scale={scale} />
      </div>
    </div>
  );
}

const Persona = () => {
  const mode = useLayoutMode();

  if (mode === 'desktop') {
    return <DesktopPersona />;
  }

  return <ResponsivePersona mobile={mode === 'mobile'} />;
};

export default Persona;
