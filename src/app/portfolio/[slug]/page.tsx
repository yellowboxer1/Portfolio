import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Header from "@/src/components/Header";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Preparing Project | Portfolio",
  description: "This portfolio project detail page is currently being prepared.",
};

type PreparingPortfolioPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const HABIT_DOWNLOAD_URL = "https://gati00.web.app/invite/";

export default async function PreparingPortfolioPage({
  params,
}: PreparingPortfolioPageProps) {
  const { slug } = await params;
  const isHabit = slug === "habit";

  return (
    <main className={styles.page}>
      <Header aboutHref="/#about" />

      <Link href="/works#project-cards" className={styles.backButton} aria-label="Back to project cards">
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

      <section
        className={`${styles.notice} ${isHabit ? styles.noticeWithQr : ""}`}
        aria-labelledby="preparing-title"
      >
        <div className={styles.noticeCopy}>
          <p className={styles.eyebrow}>Portfolio Detail</p>
          <h1 id="preparing-title" className={styles.title}>
            준비중입니다
          </h1>
          <p className={styles.description}>
            해당 프로젝트 상세 페이지는 현재 준비 중입니다.
            <br />
            곧 더 완성도 있는 내용으로 업데이트하겠습니다.
          </p>
          <div className={styles.ctaRow}>
            <Link href="/works#project-cards" className={styles.cta}>
              프로젝트 목록으로 돌아가기
            </Link>
            <Link href="/portfolio/zigzag-reverse" className={styles.secondaryCta}>
              완성된 프로젝트 구경하기
            </Link>
          </div>
        </div>

        {isHabit && (
          <aside className={styles.qrPanel} aria-label="해빗 앱 다운로드 QR 코드">
            <p className={styles.qrEyebrow}>Now Available</p>
            <h2 className={styles.qrTitle}>해빗 앱 바로가기</h2>
            <div className={styles.qrCodeWrap}>
              <Image
                src="/habit-download-qr.svg"
                alt="해빗 앱 다운로드 QR 코드"
                width={220}
                height={220}
                priority
              />
            </div>
            <p className={styles.qrDescription}>
              QR을 스캔하면 기기에 맞는 스토어로 이동합니다.
            </p>
          </aside>
        )}
      </section>
    </main>
  );
}
