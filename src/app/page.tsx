import type { Metadata } from "next";
import Header from "@/src/components/Header";
import Hero from "@/src/components/Hero";
import Portfolio from "@/src/components/Portfolio";
import About from "@/src/components/About";
import Strengths from "../components/Strengths";

const previewImage = {
  url: "https://gunho-park.vercel.app/og/home-hero-20261016.png",
  width: 1440,
  height: 810,
  alt: "PLANNING USER EXPERIENCES FROM A TO Z · 박건호 포트폴리오",
};

export const metadata: Metadata = {
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://gunho-park.vercel.app/",
    siteName: "박건호 포트폴리오",
    title: "박건호 | Gun Ho Park`s Portfolio",
    description: "기획에서 끝내지 않고, 직접 실행하고 결과로 증명합니다.",
    images: [previewImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "박건호 | Gun Ho Park`s Portfolio",
    description: "기획에서 끝내지 않고, 직접 실행하고 결과로 증명합니다.",
    images: [previewImage],
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <Hero />
      <About />
      <Strengths />
      <Portfolio />
    </main>
  );
}
