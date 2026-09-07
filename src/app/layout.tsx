import type { Metadata } from "next";
import {
  Manrope,
  Noto_Sans_KR,
} from "next/font/google";
import "./globals.css";
import { ClientBody } from "./ClientBody";
import { GoogleAnalytics } from "./GoogleAnalytics";
import { MicrosoftClarity } from "./MicrosoftClarity";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-family-noto-sans-kr",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-family-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "박건호 | Gun Ho Park`s Portfolio",
  description: "말로 끝나는 기획이 아니라 직접 실행하고 결과로 증명합니다.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`dark ${notoSansKr.variable} ${manrope.variable}`}
    >
      <ClientBody>
        <GoogleAnalytics />
        <MicrosoftClarity />
        {children}
      </ClientBody>
    </html>
  );
}
