import type { Metadata } from "next";
import "./globals.css";
import { ClientBody } from "./ClientBody";

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
    <html lang="ko" className="dark">
      <ClientBody>{children}</ClientBody>
    </html>
  );
}
