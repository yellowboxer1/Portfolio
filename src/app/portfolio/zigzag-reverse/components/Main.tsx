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
    <section className={styles.main4Responsive}>
      <div className={styles.main4}>
        {/* --- 배경 영역 (1920 기준 중앙 정렬) --- */}
        <img className={styles.imageFx141} src={imageFx141} />
        <div className={styles.main4Child} />
        <img className={styles.main4Inner} src={vector4} />

        {/* --- 콘텐츠 영역 (1920 기준 중앙 고정 프레임) --- */}
        <div className={styles.main4InnerFrame}>
          <div className={styles.zigzagMobileApp}>
            <span className={styles.zigzagMobileAppTxtContainer}>
              <p className={styles.zigzag}>ZIGZAG</p>
              <p className={styles.zigzag}>MOBILE APP</p>
            </span>
          </div>

          <div className={styles.rightContentArea}>
            <div className={styles.moblieAppDesign}>Moblie App Design</div>

            <div className={styles.zigzagContainer}>
              <span className={styles.zigzagMobileAppTxtContainer}>
                <p className={styles.zigzag}>복잡도를 줄이고 콘텐츠의 집중도를 높여</p>
                <p className={styles.zigzag}>모바일 디바이스에 최적화된 체계를 구축하였습니다.</p>
                <p className={styles.zigzag}>ZigZag의 트렌디한 이미지를 확대하여</p>
                <p className={styles.zigzag}>이전보다 더 강화된 브랜드 경험을 선사합니다.</p>
              </span>
            </div>
            <img className={styles.image57Icon} src={image57} />
          </div>

          <div className={styles.contents}>Contents</div>
          <img className={styles.main4Item} src={vector3} />
          <img className={styles.groupIcon} src={group1} />
          <img className={styles.bi1Icon} src={bi1} alt="Zigzag BI" />
        </div>
      </div>
    </section>
  );
};

export default Main;