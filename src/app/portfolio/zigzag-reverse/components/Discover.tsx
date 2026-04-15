'use client';

import styles from './styles/Discover.module.css';
import { withBasePath } from '../lib/asset';
import AutoPlayVideo from './AutoPlayVideo';

const epick = withBasePath('/portfolio/zigzag-reverse/assets/image/epick@3x.png');
const talkLounge = withBasePath('/portfolio/zigzag-reverse/assets/image/talk lounge@3x.png');
const detail = withBasePath('/portfolio/zigzag-reverse/assets/image/detail.png');
const image1 = withBasePath('/portfolio/zigzag-reverse/assets/image/image_fx_ (10) 1.png');
const discoverall = withBasePath('/portfolio/zigzag-reverse/assets/image/Discover All@3x.png');
const category = withBasePath('/portfolio/zigzag-reverse/assets/image/category@3x.png');
const frame = withBasePath('/portfolio/zigzag-reverse/assets/image/image 49@3x.png');
const vec01 = withBasePath('/portfolio/zigzag-reverse/assets/image/Vector 01.svg');
const vec02 = withBasePath('/portfolio/zigzag-reverse/assets/image/Vector 02.svg');
const v03 = withBasePath('/portfolio/zigzag-reverse/assets/image/Vector 03.svg');
const g35 = withBasePath('/portfolio/zigzag-reverse/assets/image/Group 1000003935.svg');
const video1 = withBasePath('/portfolio/zigzag-reverse/assets/video/detail.mp4');
const video2 = withBasePath('/portfolio/zigzag-reverse/assets/video/size.mp4');

const Discover = () => {
  	return (
    		<div className={styles.discover}>
      			<div className={styles.discoverChild} />
      			<img className={styles.epick3x1Icon} src={epick} />
      			<img className={styles.detail1Icon} src={detail} />
      			<img className={styles.talkLounge3x1} src={talkLounge} />
      			<img className={styles.imageFx101} src={image1} />
      			<div className={styles.discoverItem} />
      			<div className={styles.parent}>
        				<div className={styles.div}>
          					<p className={styles.p}>{`다양한 상품 카테고리부터 개성 넘치는 스타일링 샷, 활발한 커뮤니티까지 한눈에 만나보세요. `}</p>
          					<p className={styles.p}>카테고리, 에픽, 톡라운지를 통해 패션의 모든 영역을 탐색할 수 있는 공간입니다.</p>
        				</div>
        				<div className={styles.div1}>04</div>
      			</div>
      			<img className={styles.discoverAll3x1} src={discoverall} />
      			<div className={styles.imageParent}>
        				<img className={styles.imageIcon} src={category} />
        				<div className={styles.image50} />
        				<img className={styles.icon} src={frame} />
      			</div>
      			<div className={styles.imageGroup}>
        				<AutoPlayVideo className={styles.imageIcon1} src={video1} />
        				<img className={styles.icon} src={frame} />
        				<div className={styles.image50} />
      			</div>
      			<img className={styles.discoverInner} src={vec01} />
      			<img className={styles.vectorIcon} src={vec02} />
      			<img className={styles.discoverChild1} src={v03} />
      			<img className={styles.groupIcon} src={g35} />
      			<img className={styles.discoverChild2} src={g35}  />
      			<img className={styles.discoverChild3} src={g35}  />
      			<div className={styles.epickMain}>
        				<span className={styles.epick}>{`EPICK `}</span>
        				<span>MAIN</span>
      			</div>
      			<div className={styles.div2}>
        				<p className={styles.p2}>{`나만을 위한 맞춤 코디와 스타일링 영감을 만나보세요.  `}</p>
        				<p className={styles.p}>트렌디한 해시태그별 스타일링 제안으로</p>
        				<p className={styles.p}>당신의 패션 감각을 한 층 업그레이드 합니다.</p>
      			</div>
      			<div className={styles.talkLounge}>
        				<span className={styles.epick}>{`tALK `}</span>
        				<span>LOUNGE</span>
      			</div>
      			<div className={styles.div3}>
        				<p className={styles.p}>취향이 통하는 사람들과 자유롭게 소통하는 커뮤니티, 톡 라운지.</p>
        				<p className={styles.p}> 관심 있는 주제로 이야기 나누며 트렌드를 함께 만들어보세요.</p>
      			</div>
				  <div className={styles.sizeRecommendation}>
					<p className={styles.p}>
						<span className={styles.size}>{`Size `}</span>
						<span>recommendation</span>
					</p>
				</div>
      			<div className={styles.aiContainer}>
        				<p className={styles.p}>리뷰 찾아 다니느라 힘드셨죠?</p>
          					<p className={styles.p}> AI 분석 기반 추천으로, 나에게 꼭 맞는 사이즈와</p>
          					<p className={styles.p}> 완벽한 핏을 바로 추천해드려요</p>
          					</div>
          					<div className={styles.imageContainer}>
            						<AutoPlayVideo className={styles.imageIcon1} src={video2} />
            						<img className={styles.icon} src={frame} />
            						<div className={styles.image50} />
          					</div>
          					</div>);
        				};
        				
        				export default Discover;
