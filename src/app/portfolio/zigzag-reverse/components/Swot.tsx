'use client';

import styles from './styles/Swot.module.css';
import { useState, useEffect, useRef } from 'react';
import { withBasePath } from '../lib/asset';

const statusIcon = withBasePath('/portfolio/zigzag-reverse/assets/image/status.svg');
const lightIcon = withBasePath('/portfolio/zigzag-reverse/assets/image/light.svg');
const group8 = withBasePath('/portfolio/zigzag-reverse/assets/image/Group 8.svg');
const zigzag = withBasePath('/portfolio/zigzag-reverse/assets/image/gray_icon/zigzag@3x.png');
const musinsa = withBasePath('/portfolio/zigzag-reverse/assets/image/gray_icon/musinsa@3x.png');
const ably = withBasePath('/portfolio/zigzag-reverse/assets/image/gray_icon/ably@3x.png');
const brandy = withBasePath('/portfolio/zigzag-reverse/assets/image/gray_icon/brandy@3x.png');
const kream = withBasePath('/portfolio/zigzag-reverse/assets/image/gray_icon/kream@3x.png');
const wc = withBasePath('/portfolio/zigzag-reverse/assets/image/gray_icon/w@3x.png');
const a29 = withBasePath('/portfolio/zigzag-reverse/assets/image/gray_icon/29@3x.png');

const Swot = () => {
  return (
    <div className={styles.swot}>
      <div className={styles.swotChild} />
      <div className={styles.swotInner}>
        <div className={styles.frameParent}>
          <div className={styles.lineParent}>
            <div className={styles.frameChild} />
            <div className={styles.frameChild} />
            <div className={styles.frameChild} />
            <div className={styles.frameChild} />
            <div className={styles.frameChild} />
            <div className={styles.frameChild} />
            <div className={styles.frameChild} />
            <div className={styles.frameChild} />
            <div className={styles.frameChild} />
            <div className={styles.frameChild} />
            <div className={styles.frameChild} />
            <div className={styles.frameChild} />
            <div className={styles.frameChild} />
          </div>
          <div className={styles.lineGroup}>
            <div className={styles.frameChild10} />
            <div className={styles.frameChild10} />
            <div className={styles.frameChild10} />
            <div className={styles.frameChild10} />
            <div className={styles.frameChild10} />
            <div className={styles.frameChild10} />
            <div className={styles.frameChild10} />
          </div>
        </div>
      </div>
      <div className={styles.ellipseDiv} />
      <div className={styles.swotPositioning}>{`SWOT & Positioning Map`}</div>
      <b className={styles.aiContainer}>
        <span>AI 기반 개인화</span>
        <span className={styles.span}>로 차별화 된 경쟁력 확보</span>
      </b>
      <div className={styles.groupParent}>
        <div className={styles.rectangleParent}>
          <div className={styles.groupChild} />
          <div className={styles.strength}>Strength</div>
          <div className={styles.aiContainer1}>
            <ul className={styles.aiZ}>
              <li className={styles.ai}>
                <span>AI 기반 개인화 추천 서비스</span>
              </li>
              <li className={styles.ai}>
                <span className={styles.z1}>지그재그 Z페이 간편 결제 시스템</span>
              </li>
              <li className={styles.ai}>
                <span className={styles.z1}>카카오스타일 지원</span>
              </li>
              <li>
                <span className={styles.z1}> 9,000개 이상 다양한 쇼핑몰 통합</span>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.rectangleParent}>
          <div className={styles.groupChild} />
          <div className={styles.weakness}>Weakness</div>
          <div className={styles.mauContainer}>
            <ul className={styles.aiZ}>
              <li className={styles.ai}>
                <span>서비스 성숙기에 따른 성장 정체</span>
              </li>
              <li className={styles.ai}>
                <span className={styles.z1}>사용자 트래픽 감소 (MAU)</span>
              </li>
              <li className={styles.ai}>
                <span className={styles.z1}>중소형 쇼핑몰 의존성</span>
              </li>
              <li>
                <span className={styles.z1}>무료배송 혜택 부족</span>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.rectangleParent}>
          <div className={styles.groupChild} />
          <div className={styles.opportunity}>Opportunity</div>
          <div className={styles.aiContainer2}>
            <ul className={styles.aiZ}>
              <li className={styles.ai}>
                <span>AI 서비스 강화</span>
              </li>
              <li className={styles.ai}>
                <span className={styles.z1}>K-패션 글로벌 시장 진출</span>
              </li>
              <li className={styles.ai}>
                <span className={styles.z1}>지속 가능한 소비 트렌드</span>
              </li>
              <li>
                <span className={styles.z1}>온라인 쇼핑 시장 성장</span>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.rectangleParent}>
          <div className={styles.groupChild} />
          <div className={styles.threat}>Threat</div>
          <div className={styles.mauContainer}>
            <ul className={styles.aiZ}>
              <li className={styles.ai}>
                <span>차별화 된 경쟁력 요구</span>
              </li>
              <li className={styles.ai}>
                <span className={styles.z1}>경쟁 플랫폼의 시장 점유율 확대</span>
              </li>
              <li className={styles.ai}>
                <span className={styles.z1}>소비자 기대치 상승</span>
              </li>
              <li>
                <span className={styles.z1}>환경에 대한 부정적 인식</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.div1}>
        <p className={styles.p}>지그재그는 개인화 요소가 강한 플랫폼이면서도, 대중적인 접근성을 갖춘 플랫폼임</p>
        <p className={styles.p}>이 점을 강조하여 개인화 요소 기능을 더욱 정교하게 발전시키고, 사용자 맞춤형 경험을 극대화할 계획임</p>
      </div>
      <div className={styles.parent}>
        <div className={styles.div2}>시스템 주도</div>
        <div className={styles.systemDriven}>System Driven</div>
      </div>
      <div className={styles.group}>
        <div className={styles.div3}>사용자 주도</div>
        <div className={styles.systemDriven}>User Driven</div>
      </div>
      <div className={styles.container}>
        <div className={styles.div4}>대중성</div>
        <div className={styles.basic}>Basic</div>
      </div>
      <div className={styles.parent1}>
        <div className={styles.div3}>독창성</div>
        <div className={styles.systemDriven}>Unique</div>
      </div>
      
      {/* 상태 아이콘 컨테이너 */}
      <div className={styles.statusContainer}>
        {/* 메인 아이콘 (고정) */}
        <img className={styles.statusIcon} alt="" src={statusIcon} />
        
        {/* 빛 효과 (애니메이션) */}
        <img className={styles.lightEffect} alt="" src={lightIcon} />
      </div>
      
      <img className={styles.groupIcon} alt="" src={group8} />
      <div className={styles.swotChild1} />
      <div className={styles.swotChild2} />
      <div className={styles.div6}>
        <span className={styles.txt}>
          <span>취향 및 체형</span>
          <span className={styles.span10}>을 반영한 디테일한 스타일 추천으로</span>
          <span> 개인화 서비스 강화</span>
        </span>
      </div>
      <div className={styles.log}>마이페이지에서 내 체형을 쉽게 편집하고, 내 체형 및 취향을 기반으로 더욱 정교한 추천과 일간 Log로 매일 변하는 스타일링 팁을 확인</div>
      <img className={styles.img1Icon} alt="" src={zigzag} />
      <img className={styles.icon} alt="" src={musinsa} />
      <img className={styles.icon1} alt="" src={ably} />
      <img className={styles.icon2} alt="" src={a29} />
      <img className={styles.icon3} alt="" src={brandy} />
      <img className={styles.w1Icon} alt="" src={wc} />
      <img className={styles.icon4} alt="" src={kream} />
    </div>
  );
};

export default Swot;
