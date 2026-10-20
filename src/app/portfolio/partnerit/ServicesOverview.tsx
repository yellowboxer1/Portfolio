import Image from "next/image";
import styles from "./page.module.css";
import imageAssets from "./image-assets.json";

export default function ServicesOverview() {
  return (
    <section id="services" className={`${styles.section} ${styles.servicesOverview}`} aria-labelledby="services-title">
      <div className={styles.inner}>
        <header className={styles.centerHeading}>
          <p className={styles.kicker}>Service Overview</p>
          <h2 id="services-title">Services Details</h2>
          <p>우리 기업에 맞는 사업을 찾고, 필요한 역량을 확인하고.<br /> 함께할 파트너를 구해 실제 프로젝트를 시작하는 과정까지 기획했습니다.</p>
        </header>
        <div className={styles.servicesStage}>
          <Image className={styles.servicesGlow} src={imageAssets["imgImgAiPc011.webp"].src} width={960} height={373} alt="" unoptimized fetchPriority="low" />
          <div className={styles.serviceCards}>
            <article className={styles.serviceCard}>
              <h3>AI로 시간 절약,<br /> 맞는 기회만 빠르게</h3>
              <p>#AI정밀분석<br />#자동매칭<br />#파트너연결</p>
              <div className={`${styles.cardArt} ${styles.sourceArt}`} aria-hidden="true"><Image className={styles.sourceCardArtwork} loading="eager" src={imageAssets["service-matching-artwork.svg"].src} width={330} height={190} alt="" /></div>
            </article>
            <article className={styles.serviceCard}>
              <h3>회사와 공고를 연결,<br /> 기회를 놓치지 않도록</h3>
              <p>#데이터연결<br />#정보통합<br />#기회도출</p>
              <div className={`${styles.cardArt} ${styles.sourceArt}`} aria-hidden="true"><Image className={styles.sourceCardArtwork} loading="eager" src={imageAssets["service-data-artwork.svg"].src} width={330} height={190} alt="" /></div>
            </article>
            <article className={styles.serviceCard}>
              <h3>반복 업무는 줄이고,<br /> 핵심 전략에 집중</h3>
              <p>#업무자동화<br />#시간절약<br />#생산성향상</p>
              <div className={`${styles.cardArt} ${styles.sourceArt} ${styles.meetingArt}`} aria-hidden="true"><Image className={styles.sourceCardArtwork} loading="eager" src={imageAssets["service-meeting-artwork.svg"].src} width={330} height={190} alt="" /></div>
            </article>
            <article className={styles.serviceCard}>
              <h3>사업 이후의 기회까지,<br /> 더 큰 성장으로 연결</h3>
              <p>#VC/AC 매칭<br />#수요기관 연결<br />#기업전주기</p>
              <div className={`${styles.cardArt} ${styles.sourceArt} ${styles.calendarArt}`} aria-hidden="true"><Image className={styles.sourceCardArtwork} loading="eager" src={imageAssets["service-collaboration-optimized.svg"].src} width={330} height={229} alt="" /></div>
            </article>
          </div>
          <Image className={styles.floatingAI} src={imageAssets["imgImgAiPc0121.webp"].src} width={400} height={400} alt="" unoptimized fetchPriority="low" />
          <Image className={styles.floatingStar} src={imageAssets["imgImgAiPc0111.webp"].src} width={240} height={240} alt="" unoptimized fetchPriority="low" />
        </div>
      </div>
    </section>
  );
}
