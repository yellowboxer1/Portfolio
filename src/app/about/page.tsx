import type { Metadata } from "next";
import AboutCompanyExperience from "./AboutCompanyExperience";

export const metadata: Metadata = {
  title: "About | Gun Ho Park",
  description: "상세 소개 페이지",
};

export default function AboutPage() {
  return <AboutCompanyExperience />;
}
