import type { Metadata } from "next";
import {
  Bacasime_Antique,
  Inter,
  Noto_Sans,
  Noto_Sans_Display,
  Noto_Sans_KR,
} from "next/font/google";
import "./globals.css";
import { ClientBody } from "./ClientBody";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-family-noto-sans",
  display: "swap",
});

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-family-noto-sans-kr",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-family-inter",
  display: "swap",
});

const bacasimeAntique = Bacasime_Antique({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-family-bacasime-antique",
  display: "swap",
});

const notoSansDisplay = Noto_Sans_Display({
  subsets: ["latin"],
  variable: "--font-family-noto-sans-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "박건호 | Gun Ho Park`s Portfolio",
  description: "말로 끝나는 기획이 아니라 직접 실행하고 결과로 증명합니다.",
  icons: {
    icon: "favicon.svg",
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
      className={`dark ${notoSans.variable} ${notoSansKr.variable} ${inter.variable} ${bacasimeAntique.variable} ${notoSansDisplay.variable}`}
    >
      <ClientBody>{children}</ClientBody>
    </html>
  );
}
