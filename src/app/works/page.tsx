import type { Metadata } from "next";
import Works from "./works";

export const metadata: Metadata = {
  title: "Works | Gun Ho Park",
  description: "포트폴리오 모음",
};

export default function WorksRoutePage() {
  return <Works />;
}
