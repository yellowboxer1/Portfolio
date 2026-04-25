import type { Metadata } from "next";
import { MetricsSection } from "./AboutCompanyExperience";

export const metadata: Metadata = {
  title: "About Me | Gun Ho Park",
  description: "상세 소개 페이지",
};

export default function AboutMePage() {
  return <MetricsSection />;
}
