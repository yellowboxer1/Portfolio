import type { Metadata } from "next";
import HistorySection from "./index";

export const metadata: Metadata = {
  title: "History | Gun Ho Park",
  description: "스크롤 기반 인터랙션으로 살펴보는 건호의 타임라인",
};

export default function HistoryPage() {
  return <HistorySection />;
}
