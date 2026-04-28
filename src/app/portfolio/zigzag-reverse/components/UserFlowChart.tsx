'use client';

import styles from './styles/UserFlowChart.module.css';
import { withBasePath } from '../lib/asset';

const ufbg = withBasePath('/portfolio/zigzag-reverse/assets/image/ufbg@3x.png');
const wireframe = withBasePath('/portfolio/zigzag-reverse/assets/image/wireframe.png');
const flow = withBasePath('/portfolio/zigzag-reverse/assets/image/flow@3x.png');

const UserFlowChart = () => {
  	return (
    		<div className={styles.userFlowchart}>
          <img className={styles.userFlowBg} src={ufbg} />
          <div className={styles.userFlowchartChild} />
          <div className={styles.userFlowchart1}>{`User Flowchart & Wire Frame`}</div>
          <b className={styles.b}>
            <span>프로세스 효율성</span>
            <span className={styles.span}>을 높인 유저 플로우차트</span>
          </b>
          <div className={styles.div}>
            <p className={styles.p}>온보딩 화면을 시작으로 사용자가 쉽고 빠르게 원하는 정보에 도달할 수 있도록 사용자들의 편의성을 고려한 유저 플로우 차트를 구성했습니다.</p>
            <p className={styles.p}>자주 쓰고 중요한 기능을 홈에 배치하여 불필요한 화면 전환을 줄였으며, 구체적인 화면 구성으로 서로간의 유기적인 소통이 될 수 있도록 설계하였습니다.</p>
          </div>
          <img className={styles.flowIcon} src={flow} />
      			<img className={styles.wireframeIcon} src={wireframe} />
    		</div>);
};

export default UserFlowChart;
