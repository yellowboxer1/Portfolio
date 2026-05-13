import type { SmartCityGridSlide } from "./grid-slides";
import styles from "./smart-city-challenge.module.css";

type SmartCitySlideProps = {
  slide: SmartCityGridSlide;
  index: number;
};

export function SmartCitySlide({ slide, index }: SmartCitySlideProps) {
  return (
    <section
      className={`${styles.slide} ${styles[slide.type]} ${
        slide.type === "preview" && slide.variant
          ? styles[`preview-${slide.variant}`]
          : ""
      }`}
      aria-label={`포트폴리오 ${index + 1}페이지`}
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
            loading="lazy"
            decoding="async"
            aria-hidden="true"
          />
          <img
            className={styles.slideLogo}
            src={slide.logo}
            alt=""
            loading="lazy"
            decoding="async"
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
              loading="lazy"
              decoding="async"
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
          {slide.background && (
            <img
              className={styles.previewBackground}
              src={slide.background}
              alt=""
              loading="lazy"
              decoding="async"
              aria-hidden="true"
            />
          )}
          {slide.logo && (
            <img
              className={`${styles.slideLogo} ${styles.previewLogo}`}
              src={slide.logo}
              alt=""
              loading="lazy"
              decoding="async"
              aria-hidden="true"
            />
          )}
          {slide.tabs && (
            <div className={styles.previewTabs} aria-hidden="true">
              {slide.tabs.map((tab) => (
                <span key={tab}>{tab}</span>
              ))}
            </div>
          )}
          <div className={styles.previewCopy}>
            <p className={styles.kicker}>{slide.kicker}</p>
            <p className={styles.sectionTitle}>{slide.title}</p>
            {slide.mascot && (
              <img
                className={styles.previewMascot}
                src={slide.mascot}
                alt=""
                loading="lazy"
                decoding="async"
                aria-hidden="true"
              />
            )}
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
                loading="lazy"
                decoding="async"
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
              <img
                key={image}
                src={image}
                alt=""
                loading="lazy"
                decoding="async"
              />
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
  );
}
