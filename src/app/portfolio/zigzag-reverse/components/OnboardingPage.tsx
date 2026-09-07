'use client';

import styles from './styles/OnboardingPage.module.css';
import { withBasePath } from '../lib/asset';
import AutoPlayVideo from './AutoPlayVideo';
import { CSSProperties, useEffect, useState } from 'react';

const g3927 = withBasePath('/portfolio/zigzag-reverse/assets/image/Group 1000003927 1@3x.webp');
const g3928 = withBasePath('/portfolio/zigzag-reverse/assets/image/Group 1000003928 1@3x.webp');
const g3921 = withBasePath('/portfolio/zigzag-reverse/assets/image/Group 1000003921@4x.png');
const i324 = withBasePath('/portfolio/zigzag-reverse/assets/image/image 324.webp');
const OnboardingPage1 = withBasePath('/portfolio/zigzag-reverse/assets/image/Onboarding Page@3x.png');
const i321 = withBasePath('/portfolio/zigzag-reverse/assets/image/image 321@3x.webp');
const i49 = withBasePath('/portfolio/zigzag-reverse/assets/image/image 49@3x.png');
const i336 = withBasePath('/portfolio/zigzag-reverse/assets/image/image 336@3x.webp');
const i01 = withBasePath('/portfolio/zigzag-reverse/assets/image/img 01@3x.webp');
const video = withBasePath('/portfolio/zigzag-reverse/assets/video/onboarding.mp4');
const all = withBasePath('/portfolio/zigzag-reverse/assets/video/all.mp4');

const OnboardingPage = () => {
	const [desktopScale, setDesktopScale] = useState(1);

	useEffect(() => {
		const updateScale = () => {
			const width = window.innerWidth;
			setDesktopScale(width < 1920 && width > 1331 ? width / 1920 : 1);
		};

		updateScale();
		window.addEventListener('resize', updateScale);
		return () => window.removeEventListener('resize', updateScale);
	}, []);

	const onboardingStyle = {
		'--onboarding-scale': desktopScale,
		'--onboarding-height': `${6397 * desktopScale}px`,
	} as CSSProperties;

	return (
	<div className={styles.onboardingPage} style={onboardingStyle}>
	<div className={styles.desktopOnboarding}>
	<div className={styles.onboardingPageChild} />
  <img loading="lazy" decoding="async" className={styles.group10000039271} src={g3927} />
  <img loading="lazy" decoding="async" className={styles.image324Icon} src={i324} />
	<div className={styles.aiParent}>
	<div className={styles.aiContainer}>
	<p className={styles.p}>{`사용자 경험의 첫 단계인 온보딩 페이지에서는 개인화 요소를 최우선으로 설계했습니다. `}</p>
	<p className={styles.p}>{`정확한 사이즈 입력과 AI 기반 퍼스널컬러 및 피부타입 측정을 통해, `}</p>
	<p className={styles.p}>쇼핑 여정의 시작부터 맞춤형 경험을 제공합니다.</p>
	</div>
	<div className={styles.div}>01</div>
	</div>
  <img loading="lazy" decoding="async" className={styles.onboardingPage1} src={OnboardingPage1} />
  <img loading="lazy" decoding="async" className={styles.image321Icon} src={i321} />
	<div className={styles.image323} />
	<div className={styles.image48Parent}>
	<AutoPlayVideo className={styles.image48Icon} src={all} loopEndSeconds={21} />
	<div className={styles.image50} />
  <img loading="lazy" decoding="async" className={styles.icon} src={i49} />
	</div>
	<div className={styles.image336Parent}>
  <img loading="lazy" decoding="async" className={styles.image336Icon} src={i336} />
	<div className={styles.image501} />
  <img loading="lazy" decoding="async" className={styles.icon} src={i49} />
	</div>
	<div className={styles.imageParent}>
  <img loading="lazy" decoding="async" className={styles.image48Icon} src={i01} />
	<AutoPlayVideo className={styles.onboardingVideo} src={video} />
  <img loading="lazy" decoding="async" className={styles.icon} src={i49} />
	<div className={styles.image502} />
	</div>
	<div className={styles.onboardingMain}>Onboarding, Main</div>
	<div className={styles.bodySize}>body size</div>
	<div className={styles.skinType}>skin type</div>
  <img loading="lazy" decoding="async" className={styles.group10000039281} src={g3928} />
  <img loading="lazy" decoding="async" className={styles.group10000039211} src={g3921} />
	</div>
	<div
	className={styles.responsiveOnboarding}
	style={{ '--responsive-intro-bg': `url("${i324}")` } as CSSProperties}
	>
	<section className={styles.responsiveHero}>
  <img loading="lazy" decoding="async" className={styles.responsiveHeroBg} src={i321} />
	<div className={styles.responsiveHeroDim} />
  <img loading="lazy" decoding="async" className={styles.responsiveHeroTitle} src={g3921} />
	<div className={`${styles.responsivePhone} ${styles.responsiveHeroPhone}`}>
	<AutoPlayVideo className={styles.responsivePhoneScreen} src={all} loopEndSeconds={21} />
	<div className={styles.responsivePhoneOverlay} />
  <img loading="lazy" decoding="async" className={styles.responsivePhoneFrame} src={i49} />
	</div>
	</section>
	<div className={styles.responsiveFeatureStage}>
	<section className={styles.responsiveIntro}>
	<div className={styles.responsiveIntroNumber}>01</div>
  <img loading="lazy" decoding="async" className={styles.responsiveIntroTitle} src={OnboardingPage1} />
	<div className={styles.responsiveIntroText}>
	<p className={styles.p}>{`사용자 경험의 첫 단계인 온보딩 페이지에서는 개인화 요소를 최우선으로 설계했습니다. `}</p>
	<p className={styles.p}>{`정확한 사이즈 입력과 AI 기반 퍼스널컬러 및 피부타입 측정을 통해, `}</p>
	<p className={styles.p}>쇼핑 여정의 시작부터 맞춤형 경험을 제공합니다.</p>
	</div>
	</section>
	<section className={styles.responsivePhones}>
	<div className={styles.responsiveSet}>
	<div className={styles.responsivePhone}>
  <img loading="lazy" decoding="async" className={styles.responsivePhoneScreenAlt} src={i336} />
	<div className={styles.responsivePhoneOverlay} />
  <img loading="lazy" decoding="async" className={styles.responsivePhoneFrame} src={i49} />
	<div className={styles.responsiveSideLabel}>Onboarding, Main</div>
	</div>
	<div className={styles.responsiveLongImageWrap}>
  <img loading="lazy" decoding="async" className={styles.responsiveLongImage} src={g3927} />
	</div>
	</div>
	<div className={styles.responsiveSet}>
	<div className={styles.responsivePhone}>
  <img loading="lazy" decoding="async" className={styles.responsivePhoneScreen} src={i01} />
	<AutoPlayVideo className={styles.responsiveOnboardingVideo} src={video} />
	<div className={styles.responsivePhoneOverlayLight} />
  <img loading="lazy" decoding="async" className={styles.responsivePhoneFrame} src={i49} />
	<div className={styles.responsiveSideLabel}>body size</div>
	</div>
	<div className={styles.responsiveLongImageWrap}>
	<div className={styles.responsiveSideLabel}>skin type</div>
  <img loading="lazy" decoding="async" className={styles.responsiveLongImage} src={g3928} />
	</div>
	</div>
	</section>
	</div>
	</div>
	</div>);
	};
	export default OnboardingPage;
