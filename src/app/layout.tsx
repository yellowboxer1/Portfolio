import type { Metadata } from "next";
import "./globals.css";
import { ClientBody } from "./ClientBody";

export const metadata: Metadata = {
  title: "박건호 | Gun Ho Park`s Portfolio",
  description: "Studio Tina is an AI creative studio that plans and produces video content such as dramas, movies, and short-form content using AI technology.",
  icons: {
    icon: "https://ext.same-assets.com/334974529/3954258983.png",
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
