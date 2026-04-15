'use client';

import styles from './styles/OnboardingPage.module.css';
import { withBasePath } from '../lib/asset';
import AutoPlayVideo from './AutoPlayVideo';

const g3927 = withBasePath('/portfolio/zigzag-reverse/assets/image/Group 1000003927 1@3x.png');
const g3928 = withBasePath('/portfolio/zigzag-reverse/assets/image/Group 1000003928 1@3x.png');
const g3921 = withBasePath('/portfolio/zigzag-reverse/assets/image/Group 1000003921@4x.png');
const i324 = withBasePath('/portfolio/zigzag-reverse/assets/image/image 324.png');
const OnboardingPage1 = withBasePath('/portfolio/zigzag-reverse/assets/image/Onboarding Page@3x.png');
const i321 = withBasePath('/portfolio/zigzag-reverse/assets/image/image 321@3x.png');
const i49 = withBasePath('/portfolio/zigzag-reverse/assets/image/image 49@3x.png');
const i336 = withBasePath('/portfolio/zigzag-reverse/assets/image/image 336@3x.png');
const i01 = withBasePath('/portfolio/zigzag-reverse/assets/image/img 01@3x.png');
const video = withBasePath('/portfolio/zigzag-reverse/assets/video/onboarding.mp4');
const all = withBasePath('/portfolio/zigzag-reverse/assets/video/all.mp4');

const OnboardingPage = () => {
	return (
	<div className={styles.onboardingPage}>
	<div className={styles.onboardingPageChild} />
	<img className={styles.group10000039271} src={g3927} />
	<img className={styles.image324Icon} src={i324} />
	<div className={styles.aiParent}>
	<div className={styles.aiContainer}>
	<p className={styles.p}>{`사용자 경험의 첫 단계인 온보딩 페이지에서는 개인화 요소를 최우선으로 설계했습니다. `}</p>
	<p className={styles.p}>{`정확한 사이즈 입력과 AI 기반 퍼스널컬러 및 피부타입 측정을 통해, `}</p>
	<p className={styles.p}>쇼핑 여정의 시작부터 맞춤형 경험을 제공합니다.</p>
	</div>
	<div className={styles.div}>01</div>
	</div>
	<img className={styles.onboardingPage1} src={OnboardingPage1} />
	<img className={styles.image321Icon} src={i321} />
	<div className={styles.image323} />
	<div className={styles.image48Parent}>
	<AutoPlayVideo className={styles.image48Icon} src={all} />
	<div className={styles.image50} />
	<img className={styles.icon} src={i49} />
	</div>
	<div className={styles.image336Parent}>
	<img className={styles.image336Icon} src={i336} />
	<div className={styles.image501} />
	<img className={styles.icon} src={i49} />
	</div>
	<div className={styles.imageParent}>
	<img className={styles.image48Icon} src={i01} />
	<AutoPlayVideo className={styles.onboardingVideo} src={video} />
	<img className={styles.icon} src={i49} />
	<div className={styles.image502} />
	</div>
	<div className={styles.onboardingMain}>Onboarding, Main</div>
	<div className={styles.bodySize}>body size</div>
	<div className={styles.skinType}>skin type</div>
	<img className={styles.group10000039281} src={g3928} />
	<img className={styles.group10000039211} src={g3921} />
	</div>);
	};
	export default OnboardingPage;
