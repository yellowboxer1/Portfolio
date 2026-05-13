import styles from "./ProjectIntroSection.module.css";

type ProjectMetaItem = {
  label: string;
  value: string;
};

type ProjectIntroAction = {
  label: string;
  href: string;
  download?: boolean;
};

type ProjectNarrativeItem = {
  label: string;
  title: string;
  body: string;
};

type ProjectIntroSectionProps = {
  badge: string;
  title: string;
  meta: ProjectMetaItem[];
  techStack: string[];
  features: string[];
  overview: string;
  narrative?: ProjectNarrativeItem[];
  resultBadge?: string;
  actions?: ProjectIntroAction[];
};

export default function ProjectIntroSection({
  badge,
  title,
  meta,
  techStack,
  features,
  overview,
  narrative = [],
  resultBadge,
  actions = [],
}: ProjectIntroSectionProps) {
  return (
    <section className={styles.section} aria-labelledby="project-intro-title">
      <div className={styles.inner}>
        <div className={styles.topRow}>
          <div>
            <span className={styles.badge}>{badge}</span>
            <h2 id="project-intro-title" className={styles.title}>
              {title}
            </h2>
          </div>

          {actions.length > 0 && (
            <div className={styles.actions}>
              {actions.map((action) => (
                <a
                  key={action.label}
                  className={styles.action}
                  href={action.href}
                  download={action.download}
                  target={action.href.startsWith("http") ? "_blank" : undefined}
                  rel={action.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  {action.label}
                </a>
              ))}
            </div>
          )}
        </div>

        <div className={styles.metaGrid}>
          {meta.map((item) => (
            <div key={item.label} className={styles.metaItem}>
              <span className={styles.metaLabel}>{item.label}</span>
              <span className={styles.metaValue}>{item.value}</span>
            </div>
          ))}
          {resultBadge && <span className={styles.resultBadge}>{resultBadge}</span>}
        </div>

        <div className={styles.stackRow}>
          <span className={styles.stackLabel}>기술스택</span>
          <div className={styles.stackList}>
            {techStack.map((item) => (
              <span key={item} className={styles.stackItem}>
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.divider} />

        <section className={styles.sectionBlock} aria-labelledby="project-features-title">
          <h3 id="project-features-title" className={styles.sectionTitle}>
            주요 기능
          </h3>
          <ul className={styles.featureList}>
            {features.map((feature) => (
              <li key={feature} className={styles.featureItem}>
                {feature}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.sectionBlock} aria-labelledby="project-overview-title">
          <h3 id="project-overview-title" className={styles.sectionTitle}>
            프로젝트 개요
          </h3>
          <p className={styles.overview}>{overview}</p>
        </section>

        {narrative.length > 0 && (
          <section
            className={styles.sectionBlock}
            aria-labelledby="project-narrative-title"
          >
            <h3 id="project-narrative-title" className={styles.sectionTitle}>
              문제 해결 과정
            </h3>
            <div className={styles.narrativeGrid}>
              {narrative.map((item) => (
                <article key={item.label} className={styles.narrativeItem}>
                  <span>{item.label}</span>
                  <h4>{item.title}</h4>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </section>
  );
}
