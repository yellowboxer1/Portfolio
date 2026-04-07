'use client';

import styles from './styles/Persona.module.css';
import { withBasePath } from '../lib/asset';

const g39 = withBasePath('/portfolio/zigzag-reverse/assets/image/Group 39.png');
const p1 = withBasePath('/portfolio/zigzag-reverse/assets/image/p1@4x.png');
const p2 = withBasePath('/portfolio/zigzag-reverse/assets/image/p2@4x.png');
const p3 = withBasePath('/portfolio/zigzag-reverse/assets/image/p3@4x.png');

const Persona = () => {
  return (
    // 상단에 116px 마진 추가
    <div className={styles.div} style={{ marginTop: '116px' }}>
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
      <div className={styles.vectorParent}>
        <img className={styles.groupChild} alt="" src={g39} />
        <b className={styles.needs}>Needs</b>
      </div>
      <img className={styles.groupIcon} alt="" src={p1} />
      <img className={styles.maskGroupIcon} alt="" src={p2} />
      <img className={styles.maskGroupIcon1} alt="" src={p3} />
    </div>
  );
};

export default Persona;
