'use client';

import styles from './styles/DesignGuide.module.css';
import { withBasePath } from '../lib/asset';

const guide = withBasePath('/portfolio/zigzag-reverse/assets/image/Guide@3x.png');
const icons = withBasePath('/portfolio/zigzag-reverse/assets/image/icons@3x.png');

const DesignGuide = () => {
    return (
          <div className={styles.designGuide}>
                <header className={styles.guideHeader}>
                    <span className={styles.guideDot} />
                    <span className={styles.guideTitle}>Design Guide</span>
                </header>
                <img className={styles.guideIcon} src={guide} />
                <img className={styles.iconsIcon} src={icons} />
          </div>);
};

export default DesignGuide;
