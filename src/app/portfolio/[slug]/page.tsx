import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/src/components/Header";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Preparing Project | Portfolio",
  description: "This portfolio project detail page is currently being prepared.",
};

export default function PreparingPortfolioPage() {
  return (
    <main className={styles.page}>
      <Header aboutHref="/#about" />

      <Link href="/#selected-works" className={styles.backButton} aria-label="Back to selected works">
        <svg className={styles.backIcon} viewBox="0 0 16 16" fill="none" aria-hidden="true">
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

      <section className={styles.notice} aria-labelledby="preparing-title">
        <p className={styles.eyebrow}>Portfolio Detail</p>
        <h1 id="preparing-title" className={styles.title}>
          준비중입니다
        </h1>
        <p className={styles.description}>
          해당 프로젝트 상세 페이지는 현재 준비 중입니다.
          <br />
          곧 더 완성도 있는 내용으로 업데이트하겠습니다.
        </p>
        <Link href="/#selected-works" className={styles.cta}>
          프로젝트 목록으로 돌아가기
        </Link>
      </section>
    </main>
  );
}
