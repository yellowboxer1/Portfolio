import type { Metadata } from "next";
import Header from "@/src/components/Header";
import styles from "./page.module.css";

const contactLinks = [
  {
    label: "EMAIL",
    value: "yellowboxer1@naver.com",
    href: "mailto:yellowboxer1@naver.com",
  },
  {
    label: "GITHUB",
    value: "github.com/yellowboxer1",
    href: "https://github.com/yellowboxer1/",
  },
  {
    label: "RESUME",
    value: "About / Resume",
    href: "/about/resume",
  },
];

export const metadata: Metadata = {
  title: "Contact | Gun Ho Park",
  description: "박건호 포트폴리오 연락 페이지",
};

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <Header />

      <section className={styles.stage} aria-labelledby="contact-title">
        <p className={styles.index}>CONTACT</p>
        <h1 id="contact-title" className={styles.title}>
          Contact With Me
        </h1>
        <p className={styles.question}>
          <span aria-hidden="true">H</span>
          <span className={styles.dot} aria-hidden="true" />
          ave a Project?
        </p>
        <p className={styles.copy}>
          프로젝트 제안, 협업, 채용 관련 문의는 아래 채널로 편하게 연락 주세요.<br/>
          확인 후 빠르게 답변드리겠습니다.
        </p>

        <nav className={styles.contactList} aria-label="Contact links">
          {contactLinks.map((item) => (
            <a
              key={item.label}
              className={styles.row}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
            >
              <span className={styles.rowLabel}>{item.label}</span>
              <span className={styles.rowValue}>{item.value}</span>
              <span className={styles.rowArrow} aria-hidden="true">
                →
              </span>
            </a>
          ))}
        </nav>

        <p className={styles.footerNote}>GUNHO PARK / PORTFOLIO</p>
      </section>
    </main>
  );
}
