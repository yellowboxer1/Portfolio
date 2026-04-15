'use client';

import styles from './styles/Closet.module.css';
import { withBasePath } from '../lib/asset';
import AutoPlayVideo from './AutoPlayVideo';

const wish = withBasePath('/portfolio/zigzag-reverse/assets/image/WISH & STYLING@3x.png');
const i49 = withBasePath('/portfolio/zigzag-reverse/assets/image/image 49@3x.png');
const wish1 = withBasePath('/portfolio/zigzag-reverse/assets/image/wish@3x.png');
const pricedrop = withBasePath('/portfolio/zigzag-reverse/assets/image/pricedrop@3x.png');
const fit = withBasePath('/portfolio/zigzag-reverse/assets/image/fit@3x.png');
const v40 = withBasePath('/portfolio/zigzag-reverse/assets/image/Vector 40.svg');
const v41 = withBasePath('/portfolio/zigzag-reverse/assets/image/Vector 41.svg');
const v87 = withBasePath('/portfolio/zigzag-reverse/assets/image/Vector 87.svg');
const g35 = withBasePath('/portfolio/zigzag-reverse/assets/image/Group 1000003935.svg');
const price = withBasePath('/portfolio/zigzag-reverse/assets/image/price.png');
const closing = withBasePath('/portfolio/zigzag-reverse/assets/image/closing@3x.png');
const i338 = withBasePath('/portfolio/zigzag-reverse/assets/image/image 338@3x.png');
const fitting = withBasePath('/portfolio/zigzag-reverse/assets/video/fitting.mp4');

const Closet = () => {
    return (
    <div className={styles.closet}>
    <div className={styles.closetChild} />
    <div className={styles.parent}>
    <div className={styles.div}>
    <p className={styles.p}>{`찜한 상품들을 한 눈에 파악하고, 간편하게 구매까지 연결할 수 있습니다. `}</p>
    <p className={styles.p}>나만의 가상 피팅룸에서 다양한 아이템을 조합하여 개성있는 스타일을 코디해 보세요.</p>
    </div>
    <img className={styles.wishStyling3x1} src={wish} />
    <div className={styles.div1}>05</div>
    </div>
    <div className={styles.imageParent}>
    <img className={styles.imageIcon} src={wish1} />
    <img className={styles.icon} src={i49} />
    <div className={styles.image50} />
    </div>
    <div className={styles.imageGroup}>
    <img className={styles.imageIcon} src={pricedrop} />
    <img className={styles.icon} src={i49} />
    <div className={styles.image50} />
    </div>
    <img className={styles.fit3x1Icon} src={fit} />
    <div className={styles.fittingRoomBannerContainer}>
    <span className={styles.fittingRoom}>{`fitting room `}</span>
    <span>BANNER</span>
    </div>
    <div className={styles.div2}>
    <p className={styles.p}>피팅룸 이동 버튼을 배너의 형태로 상단에 크게 배치하여</p>
    <p className={styles.p}>사용자들의 참여도를 높이고 누구나 접근하기 쉽게하였습니다.</p>
    </div>
    <img className={styles.closetItem} src={v40} />
    <img className={styles.closetInner} src={g35} />
    <div className={styles.priceDropAlertContainer}>
    <span className={styles.fittingRoom}>{`price drop `}</span>
    <span>alert</span>
    </div>
    <div className={styles.div3}>
    <p className={styles.p}>{`찜한 상품의 가격이 내려가면 즉시 알림을 제공하고, `}</p>
    <p className={styles.p}>실시간 가격 하락 정보를 직관적으로 확인할 수 있게 구성하였습니다.</p>
    </div>
    <img className={styles.vectorIcon} src={v87} />
    <img className={styles.groupIcon} src={g35} />
    <img className={styles.price1Icon} src={price} />
    <img className={styles.closetChild1} src={v41} />
    <img className={styles.closetChild2} src={g35} />
    <div className={styles.myFittingRoomContainer}>
    <span className={styles.fittingRoom}>{`my `}</span>
    <span>fitting room</span>
    </div>
    <div className={styles.div4}>
    <p className={styles.p}>나만의 옷장에서 스타일을 시뮬레이션하며</p>
    <p className={styles.p}>코디한 옷의 정보도 보고, 원하는 옷을 바로 구매도 할 수 있어요</p>
    </div>
    <div className={styles.imageContainer}>
    <AutoPlayVideo className={styles.imageIcon} src={fitting} />
    <img className={styles.icon} src={i49} />
    <div className={styles.image50} />
    </div>
    <img className={styles.image338Icon} src={i338}/>
    <div className={styles.image339} />
    <img className={styles.closing3x1Icon} src={closing} />
    <div className={styles.mobilePortfoloZigzagRePlanContainer}>
    <p className={styles.p}>MOBILE PORTFOLO</p>
    <p className={styles.p}>ZIGZAG-RE PLANNIG PROJECT</p>
    </div>
    <div className={styles.gunhoDaeun202504}>
    <p className={styles.p}>GUNHO PARK</p>
    <p className={styles.p}>2025.04</p>
    </div>
    </div>);
    };
    export default Closet;
