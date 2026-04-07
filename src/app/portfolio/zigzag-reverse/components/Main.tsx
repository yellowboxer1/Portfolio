'use client';

import styles from './styles/Main.module.css';
import React from 'react';
import { withBasePath } from '../lib/asset';

const imageFx141 = withBasePath('/portfolio/zigzag-reverse/assets/image/image_fx_ (14) 1.png');
const vector3 = withBasePath('/portfolio/zigzag-reverse/assets/image/Vector 3.svg');
const vector4 = withBasePath('/portfolio/zigzag-reverse/assets/image/Vector 4.svg');
const group1 = withBasePath('/portfolio/zigzag-reverse/assets/image/Group 1.svg');
const image57 = withBasePath('/portfolio/zigzag-reverse/assets/image/image 57.png');
const bi1 = withBasePath('/portfolio/zigzag-reverse/assets/image/지그재그_BI 1.svg');

const Main = () => {
  return (
    <div className={styles.main4}>
      <img className={styles.imageFx141} alt="" src={imageFx141} />
      <div className={styles.zigzagMobileApp}>
        <span className={styles.zigzagMobileAppTxtContainer}>
          <p className={styles.zigzag}>ZIGZAG</p>
          <p className={styles.zigzag}>MOBILE APP</p>
        </span>
      </div>
      <div className={styles.main4Child} />
      <div className={styles.zigzagContainer}>
        <span className={styles.zigzagMobileAppTxtContainer}>
          <p className={styles.zigzag}>복잡도를 줄이고 콘텐츠의 집중도를 높여</p>
          <p className={styles.zigzag}>모바일 디바이스에 최적화된 체계를 구축하였습니다.</p>
          <p className={styles.zigzag}>ZigZag의 트렌디한 이미지를 확대하여</p>
          <p className={styles.zigzag}>이전보다 더 강화된 브랜드 경험을 선사합니다.</p>
        </span>
      </div>
      <div className={styles.contents}>Contents</div>
      <img className={styles.main4Item} alt="" src={vector3} />
      <img className={styles.main4Inner} alt="" src={vector4} />
      <div className={styles.moblieAppDesign}>Moblie App Design</div>
      <img className={styles.groupIcon} alt="" src={group1} />
      <img className={styles.image57Icon} alt="" src={image57} />
      <img className={styles.bi1Icon} alt="" src={bi1} />
    </div>
  );
};

export default Main;
