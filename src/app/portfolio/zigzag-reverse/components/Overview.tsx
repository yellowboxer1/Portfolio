'use client';

import styles from './styles/Overview.module.css';
import React from 'react';
import { withBasePath } from '../lib/asset';

const vector6 = withBasePath('/portfolio/zigzag-reverse/assets/image/Vector 6.svg');
const image50 = withBasePath('/portfolio/zigzag-reverse/assets/image/image 50@3x.png');
const image49 = withBasePath('/portfolio/zigzag-reverse/assets/image/image 49@3x.png');
const image48 = withBasePath('/portfolio/zigzag-reverse/assets/image/image 48@3x.png');

const Overview = () => {
  return (
    <div className={styles.div}>
    <div className={styles.image48Parent}>
    <img className={styles.image48Icon} src={image48} />
    <div className={styles.image50} />
    <img className={styles.icon} src={image49} />
    </div>
    <div className={styles.imageParent}>
    <img className={styles.image48Icon} src={image50} />
    <div className={styles.image50} />
    <img className={styles.icon} src={image49} />
    </div>
    <div className={styles.child} />
    <div className={styles.overview}>Overview</div>
    <b className={styles.b}>{`내 취향 및 체형에 맞는 스타일을 받아볼 수는 없을까? `}</b>
    <div className={styles.strategy}>STRATEGY</div>
    <div className={styles.aiContainer}>
    <span className={styles.aiContainer1}>
    <p className={styles.p}>나를 위한 맞춤형 서비스를 제공하기 위해 다양한 혁신적인 작업을 진행하였습니다.</p>
    <p className={styles.p1}>{`퍼스널 컬러 진단과 체형 분석 기능을 추가해 개인 맞춤형 스타일링을 지원하고, `}</p>
    <p className={styles.p}>AI 기반 알고리즘을 활용해 추천 정확도를 높이고, 사용자 편의성을 강화하였습니다</p>
    </span>
    </div>
    <div className={styles.aiContainer2}>
    <p className={styles.p}>01. AI 기반 퍼스널 컬러 진단</p>
    <p className={styles.p}>02. 나만의 옷장 기능</p>
    <p className={styles.p}>03. 체형별 스타일링 팁 제공</p>
    </div>
    <div className={styles.item} />
    <div className={styles.inner} />
    <div className={styles.ellipseDiv} />
    <img className={styles.vectorIcon} src={vector6} />
    <div className={styles.contents}>Contents</div>
    <div className={styles.service}>Service</div>
    <div className={styles.product}>Product</div>
    </div>);
    };
    

export default Overview;
