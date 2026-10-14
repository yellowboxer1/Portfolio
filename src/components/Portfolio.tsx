"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

function GalleryPlaceholder() {
  return <div className="min-h-[920px] bg-black min-[769px]:min-h-[1590px] min-[1025px]:min-h-[2166px]" aria-hidden="true" />;
}

const DynamicSpiral = dynamic(() => import("./PortfolioGallery"), {
  ssr: false,
  loading: GalleryPlaceholder,
});

export default function Portfolio() {
  const galleryContainerRef = useRef<HTMLDivElement>(null);
  const [shouldLoadGallery, setShouldLoadGallery] = useState(false);

  useEffect(() => {
    const container = galleryContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setShouldLoadGallery(true);
      observer.disconnect();
    }, { rootMargin: "600px 0px" });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="selected-works"
      className="relative overflow-hidden bg-black px-6 pt-24 pb-24 md:px-12 md:pt-32 md:pb-0 scroll-mt-28 md:scroll-mt-32"
    >
      {/* Background Layers */}
      <div className="portfolio-bg-wrap" aria-hidden="true">
        <div className="portfolio-bg-image" />
        <div className="portfolio-bg-glow" />
        <div className="portfolio-bg-vignette" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10">
        <div className="mx-auto mb-16 flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="mb-4 block text-sm uppercase tracking-widest text-white/50">
              Portfolio
            </span>
            <h2 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
              Selected Works
            </h2>
          </div>

          <Link
            href="/works"
            className="group inline-flex w-fit items-center gap-3 rounded-full border border-white/20 px-6 py-3 transition-all hover:border-white/40 hover:bg-white/5"
          >
            <span className="text-sm font-medium text-white">View More</span>
            <svg
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>

        <div ref={galleryContainerRef}>
          {shouldLoadGallery ? <DynamicSpiral /> : <GalleryPlaceholder />}
        </div>
      </div>
    </section>
  );
}
