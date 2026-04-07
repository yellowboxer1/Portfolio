'use client';

import styles from './styles/UserFlowChart.module.css';
import { withBasePath } from '../lib/asset';

const image302 = withBasePath('/portfolio/zigzag-reverse/assets/image/image 302@3x.png');
const wireframe = withBasePath('/portfolio/zigzag-reverse/assets/image/wireframe.png');

const UserFlowChart = () => {
  	return (
    		<div className={styles.userFlowchart}>
      			<img className={styles.wireframeIcon} alt="" src={wireframe} />
      			<img className={styles.image302Icon} alt="" src={image302} />
    		</div>);
};

export default UserFlowChart;
