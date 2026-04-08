'use client';

import styles from './styles/DesignGuide.module.css';
import { withBasePath } from '../lib/asset';

const DesignGuide1 = withBasePath('/portfolio/zigzag-reverse/assets/image/Design Guide@3x.png');

const DesignGuide = () => {
    return (
          <div className={styles.designGuide}>
                <img className={styles.designGuideIcon} src={DesignGuide1} />
          </div>);
};

export default DesignGuide;
