import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/src/components/Header";
import HistorySection from "./index";

export const metadata: Metadata = {
  title: "My Journey | Gun Ho Park",
  description: "Scroll-based career journey for Gun Ho Park",
};

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header aboutHref="/about" />

      <Link
        href="/#about"
        className="group fixed left-6 top-[72px] z-[60] inline-flex h-[34px] min-w-[34px] items-center justify-center rounded-full border border-white/15 bg-black/55 px-[10px] text-xs font-medium tracking-[0.04em] text-white/88 shadow-[0_14px_32px_rgba(0,0,0,0.28)] backdrop-blur-md transition-[border-color,background-color,box-shadow,color,transform] duration-300 hover:-translate-x-[2px] hover:border-white/28 hover:bg-black/78 hover:text-white md:left-12 md:top-[72px] md:h-[38px] md:min-w-[38px] md:px-3 md:text-[13px] lg:h-[42px] lg:min-w-[42px] lg:px-[13px] lg:text-sm"
      >
        <span
          aria-hidden="true"
          className="inline-flex h-3.5 w-3.5 flex-none items-center justify-center text-white md:h-[15px] md:w-[15px] lg:h-4 lg:w-4"
        >
          <svg className="h-full w-full" viewBox="0 0 16 16" fill="none">
            <path
              d="M13 8H3.5M7.5 4L3.5 8L7.5 12"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-[max-width,opacity,margin-left] duration-300 group-hover:ml-2 group-hover:max-w-[120px] group-hover:opacity-100">
          Back
        </span>
      </Link>

      <HistorySection />
    </div>
  );
}
