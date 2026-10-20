import Link from "next/link";
import styles from "./ProjectBackButton.module.css";

export default function ProjectBackButton({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className={styles.button}
      aria-label="프로젝트 목록으로 돌아가기"
    >
      <svg
        className={styles.icon}
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
      <span className={styles.label}>Back</span>
    </Link>
  );
}
