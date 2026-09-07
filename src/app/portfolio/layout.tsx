import { Bacasime_Antique, Inter, Noto_Sans, Noto_Sans_Display } from "next/font/google";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-family-noto-sans",
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

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${notoSans.variable} ${inter.variable} ${bacasimeAntique.variable} ${notoSansDisplay.variable}`} style={{ display: "contents" }}>
      {children}
    </div>
  );
}
