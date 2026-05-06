import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/src/components/Header";
import { smartCityGridSlides } from "./grid-slides";
import styles from "./smart-city-challenge.module.css";

export const metadata: Metadata = {
  title: "Smart City Challenge | Portfolio",
  description:
    "부산 도시철도 배리어프리 실내·외 내비게이션 앱 다가치나란히 서비스 기획 포트폴리오",
};

export default function SmartCityChallengePage() {
  return (
    <main className={styles.page}>
      <Header aboutHref="/#about" />

      <Link
        href="/#selected-works"
        className={styles.backButton}
        aria-label="Back to selected works"
      >
        <svg
          className={styles.backIcon}
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M13 8H3.5M7.5 4L3.5 8L7.5 12"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Back</span>
      </Link>

      <article
        className={styles.deck}
        aria-label="다가치나란히 실내 내비게이션 앱 포트폴리오"
      >
        {smartCityGridSlides.map((slide, index) => (
          <section
            key={`${slide.type}-${index}`}
            className={`${styles.slide} ${styles[slide.type]}`}
            aria-label={`포트폴리오 ${index + 2}페이지`}
          >
            {slide.type === "cover" && (
              <>
                <div className={styles.coverCopy}>
                  <img
                    className={styles.coverLogo}
                    src={slide.images.logo}
                    alt=""
                    aria-hidden="true"
                  />
                  <h1>{slide.title}</h1>
                  <img
                    className={styles.toolIcons}
                    src={slide.images.toolIcons}
                    alt="Figma, Photoshop, Illustrator"
                  />
                  <p className={styles.description}>{slide.description}</p>
                  <dl className={styles.metaList}>
                    {slide.meta.map((item) => (
                      <div key={item.label}>
                        <dt>{item.label}</dt>
                        <dd>{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className={styles.coverVisuals} aria-hidden="true">
                  <figure className={styles.visualCard}>
                    <figcaption>튜토리얼 안내 유형 선택</figcaption>
                    <img src={slide.images.tutorial} alt="" />
                  </figure>
                  <figure className={styles.visualCard}>
                    <figcaption>장애물 지도</figcaption>
                    <img src={slide.images.obstacle} alt="" />
                  </figure>
                  <figure className={styles.visualCardSmall}>
                    <img src={slide.images.userType} alt="" />
                  </figure>
                  <figure className={styles.visualCardSmall}>
                    <figcaption>사용자 유형 선택</figcaption>
                    <img src={slide.images.routeType} alt="" />
                  </figure>
                  <figure className={styles.signPlayer}>
                    <figcaption>수어 플레이어</figcaption>
                    <img src={slide.images.signPlayer} alt="" />
                  </figure>
                </div>
              </>
            )}

            {slide.type === "overview" && (
              <>
                <img
                  className={styles.overviewBackground}
                  src={slide.background}
                  alt=""
                  aria-hidden="true"
                />
                <img
                  className={styles.slideLogo}
                  src={slide.logo}
                  alt=""
                  aria-hidden="true"
                />
                <div className={styles.overviewHeader}>
                  <p className={styles.kicker}>{slide.kicker}</p>
                  <h2>{slide.title}</h2>
                </div>
                <h3 className={styles.goalHeading}>목적</h3>
                <div className={styles.goalList}>
                  {slide.goals.map((goal) => (
                    <section key={goal.title}>
                      <h3>{goal.title}</h3>
                      <p>{goal.body}</p>
                    </section>
                  ))}
                </div>
                <div className={styles.comparison}>
                  <img
                    className={styles.comparisonMarker}
                    src={slide.comparison.marker}
                    alt=""
                    aria-hidden="true"
                  />
                  <div className={styles.comparisonRow}>
                    <div className={styles.comparisonCopy}>
                      <h3>AS IS (예비사업)</h3>
                      {slide.comparison.asisBody.map((item) => (
                        <p key={item}>{item}</p>
                      ))}
                    </div>
                    <ul>
                      {slide.comparison.asis.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.comparisonRow}>
                    <div className={styles.comparisonCopy}>
                      <h3>TO BE (본사업)</h3>
                      {slide.comparison.tobeBody.map((item) => (
                        <p key={item}>{item}</p>
                      ))}
                    </div>
                    <ul>
                      {slide.comparison.tobe.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )}

            {slide.type === "preview" && (
              <>
                <div className={styles.previewCopy}>
                  <p className={styles.kicker}>{slide.kicker}</p>
                  <p className={styles.sectionTitle}>{slide.title}</p>
                  <h2>{slide.headline}</h2>
                  <p className={styles.description}>{slide.body}</p>
                </div>
                <div className={styles.previewImages} aria-hidden="true">
                  {slide.images.map((image, imageIndex) => (
                    <img
                      key={image}
                      className={imageIndex === 0 ? styles.previewMainImage : ""}
                      src={image}
                      alt=""
                    />
                  ))}
                </div>
                <div className={styles.noteGrid}>
                  {slide.notes.map((note) => (
                    <section key={note.title}>
                      <h3>{note.title}</h3>
                      <p>{note.body}</p>
                    </section>
                  ))}
                </div>
              </>
            )}

            {slide.type === "service" && (
              <>
                <div className={styles.serviceHeader}>
                  <p className={styles.kicker}>{slide.kicker}</p>
                  <h2>{slide.title}</h2>
                </div>
                <div className={styles.serviceImages} aria-hidden="true">
                  {slide.images.map((image) => (
                    <img key={image} src={image} alt="" />
                  ))}
                </div>
                <div className={styles.serviceItems}>
                  {slide.items.map((item) => (
                    <section key={item.title}>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </section>
                  ))}
                </div>
              </>
            )}
          </section>
        ))}
      </article>
    </main>
  );
}
