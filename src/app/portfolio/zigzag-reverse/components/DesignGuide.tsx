'use client';

import styles from './styles/DesignGuide.module.css';
import { withBasePath } from '../lib/asset';

const guide = withBasePath('/portfolio/zigzag-reverse/assets/image/Guide@3x.webp');
const icons = withBasePath('/portfolio/zigzag-reverse/assets/image/icons@3x.png');

const DesignGuide = () => {
    return (
          <div className={styles.designGuide}>
                <header className={styles.guideHeader}>
                    <span className={styles.guideDot} />
                    <span className={styles.guideTitle}>Design Guide</span>
                </header>
                <img loading="lazy" decoding="async" className={styles.guideIcon} src={guide} alt="지그재그 리뉴얼 색상 및 타이포그래피 가이드" />
                <img loading="lazy" decoding="async" className={styles.iconsIcon} src={icons} alt="지그재그 리뉴얼 아이콘 디자인" />
          </div>);
};

export default DesignGuide;
