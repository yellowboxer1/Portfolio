'use client';

import styles from './styles/Problem.module.css';
import { withBasePath } from '../lib/asset';

const adobe = withBasePath('/portfolio/zigzag-reverse/assets/image/Adobe Express - file (5) 1@3x.png');
const g44 = withBasePath('/portfolio/zigzag-reverse/assets/image/Group 44@4x.png');
const g43 = withBasePath('/portfolio/zigzag-reverse/assets/image/Group 43@3x.png');
const g45 = withBasePath('/portfolio/zigzag-reverse/assets/image/Group 45@4x.png');

const Problem = () => {
  return (
    <div className={styles.problemSolution}>
      <div className={styles.problemSolutionChild} />
      <div className={styles.problemSolution1}>{`Problem & Solution`}</div>
      <div className={styles.div}>표본의 불만사항을 찾은 뒤 그에 따른 해결방안을 정리했습니다.</div>
      <div className={styles.adobeExpressFile51Parent}>
        <img className={styles.adobeExpressFile51} alt="" src={adobe} />
        <img className={styles.ellipseParent} alt="" src={g44} />
      </div>
                 
      <img className={styles.ellipseGroup} alt="" src={g45} />
      <img className={styles.problemSolutionItem} alt="" src={g43} />
    </div>
  );
};

export default Problem;
