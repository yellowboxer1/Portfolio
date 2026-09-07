'use client';

import styles from './styles/Home.module.css';
import { withBasePath } from '../lib/asset';
import AutoPlayVideo from './AutoPlayVideo';
import { CSSProperties, useEffect, useState } from 'react';

const v37 = withBasePath('/portfolio/zigzag-reverse/assets/image/Vector 37.svg');
const v38 = withBasePath('/portfolio/zigzag-reverse/assets/image/Vector 38.svg');
const g35 = withBasePath('/portfolio/zigzag-reverse/assets/image/Group 1000003935.svg');
const search = withBasePath('/portfolio/zigzag-reverse/assets/image/search@3x.webp');
const i324 = withBasePath('/portfolio/zigzag-reverse/assets/image/image 324.webp');
const main = withBasePath('/portfolio/zigzag-reverse/assets/video/main1.mp4');
const i49 = withBasePath('/portfolio/zigzag-reverse/assets/image/image 49@3x.png');
const beauty = withBasePath('/portfolio/zigzag-reverse/assets/image/beauty@3x.webp');
const favor = withBasePath('/portfolio/zigzag-reverse/assets/image/favor@3x.webp');
const homeForYou = withBasePath('/portfolio/zigzag-reverse/assets/image/Home, For You@3x.png');

const Home = () => {
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

    const homeStyle = {
        '--home-scale': desktopScale,
        '--home-height': `${2957 * desktopScale}px`,
        '--responsive-home-bg': `url("${i324}")`,
    } as CSSProperties;

    return (
    <div className={styles.home} style={homeStyle}>
    <div className={styles.desktopHome}>
    <div className={styles.homeChild} />
    <img loading="lazy" decoding="async" className={styles.homeItem} src={v38} />
    <img loading="lazy" decoding="async" className={styles.homeInner} src={g35} />
    <img loading="lazy" decoding="async" className={styles.searchIcon} src={search} />
    <img loading="lazy" decoding="async" className={styles.image325Icon} src={i324} />
    <div className={styles.main1Parent}>
    <AutoPlayVideo className={styles.main1Icon} src={main} />
    <div className={styles.image50} />
    <img loading="lazy" decoding="async" className={styles.icon} src={i49} />
    </div>
    <img loading="lazy" decoding="async" className={styles.beautyIcon} src={beauty} />
    <img loading="lazy" decoding="async" className={styles.vectorIcon} src={v37} />
    <div className={styles.styleForYouContainer}>
    <span className={styles.style}>{`STYLE `}</span>
    <span>FOR YOU</span>
    </div>
    <div className={styles.div}>
    <p className={styles.p}>스타일별로 추천 상품을 노출하여</p>
    <p className={styles.p}>조금 더 다양한 스타일을 볼 수 있게</p>
    <p className={styles.p}>메인 영역을 설정했습니다.</p>
    </div>
    <div className={styles.beautyMain}>
    <span className={styles.style}>{`bEAUTY `}</span>
    <span>MAIN</span>
    </div>
    <div className={styles.div1}>
    <p className={styles.p}>사용자들의 높은 관심도를 반영하여</p>
    <p className={styles.p}>뷰티 영역을 독립적인 메뉴로 분리하고,</p>
    <p className={styles.p}>더욱 직관적인 접근성과 풍부한 콘텐츠를 제공합니다.</p>
    </div>
    <img loading="lazy" decoding="async" className={styles.groupIcon} src={g35} />
    <img loading="lazy" decoding="async" className={styles.favorIcon} src={favor} />
    <div className={styles.parent}>
    <div className={styles.div2}>
    <p className={styles.p}>2030세대는 다른 세대에 비해 개인의 취향, 자기 만족을 중요하게 생각합니다.</p>
    <p className={styles.p}>이러한 소비자의 특성을 반영하여 홈(메인)을 제작하였으며, ‘개개인의 성향’에 맞는 제품을</p>
    <p className={styles.p}>추천받을 수 있습니다.</p>
    </div>
    <div className={styles.div3}>02</div>
    <img loading="lazy" decoding="async" className={styles.homeForYou} src={homeForYou} />
    </div>
    </div>
    <div className={styles.responsiveHome}>
    <section className={styles.responsiveHero}>
    <img loading="lazy" decoding="async" className={styles.responsiveHeroBg} src={i324} />
    <div className={styles.responsiveIntro}>
    <div className={styles.responsiveIntroNumber}>02</div>
    <img loading="lazy" decoding="async" className={styles.responsiveIntroTitle} src={homeForYou} />
    <div className={styles.responsiveIntroText}>
    <p className={styles.p}>2030세대는 다른 세대에 비해 개인의 취향, 자기 만족을 중요하게 생각합니다.</p>
    <p className={styles.p}>이러한 소비자의 특성을 반영하여 홈(메인)을 제작하였으며, ‘개개인의 성향’에 맞는 제품을</p>
    <p className={styles.p}>추천받을 수 있습니다.</p>
    </div>
    </div>
    </section>
    <section className={styles.responsiveFeatureStage}>
    <div className={styles.responsiveSet}>
    <div className={styles.responsiveMainVisual}>
    <div className={`${styles.responsivePhone} ${styles.responsiveMainPhone}`}>
    <AutoPlayVideo className={styles.responsivePhoneScreen} src={main} />
    <div className={styles.responsivePhoneOverlay} />
    <img loading="lazy" decoding="async" className={styles.responsivePhoneFrame} src={i49} />
    </div>
    <div className={styles.responsiveImageWrap}>
    <img loading="lazy" decoding="async" className={styles.responsiveScreenImage} src={search} />
    <img loading="lazy" decoding="async" className={`${styles.responsiveScreenImage} ${styles.responsiveOverlapImage}`} src={favor} />
    </div>
    </div>
    <div className={styles.responsiveStyleCopySet}>
    <img loading="lazy" decoding="async" className={styles.responsiveVectorIcon} src={v37} />
    <div className={styles.responsiveCopyBlock}>
    <img loading="lazy" decoding="async" className={styles.responsiveDot} src={g35} />
    <div className={styles.responsiveFeatureTitle}>
    <span className={styles.style}>STYLE </span>
    <span>FOR YOU</span>
    </div>
    <div className={styles.responsiveFeatureText}>
    <p className={styles.p}>스타일별로 추천 상품을 노출하여</p>
    <p className={styles.p}>조금 더 다양한 스타일을 볼 수 있게</p>
    <p className={styles.p}>메인 영역을 설정했습니다.</p>
    </div>
    </div>
    </div>
    </div>
    <div className={styles.responsiveSecondaryGrid}>
    <div className={styles.responsiveSet}>
    <div className={styles.responsiveImageWrap}>
    <img loading="lazy" decoding="async" className={styles.responsiveScreenImage} src={beauty} />
    </div>
    <div className={styles.responsiveCopyBlock}>
    <img loading="lazy" decoding="async" className={styles.responsiveDot} src={g35} />
    <div className={styles.responsiveFeatureTitle}>
    <span className={styles.style}>BEAUTY </span>
    <span>MAIN</span>
    </div>
    <div className={styles.responsiveFeatureText}>
    <p className={styles.p}>사용자들의 높은 관심도를 반영하여</p>
    <p className={styles.p}>뷰티 영역을 독립적인 메뉴로 분리하고,</p>
    <p className={styles.p}>더욱 직관적인 접근성과 풍부한 콘텐츠를 제공합니다.</p>
    </div>
    </div>
    </div>
    </div>
    </section>
    </div>
    </div>);
    };
    export default Home;
