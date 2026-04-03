"use client";

import Image from "next/image";

const partnersRow1 = [
  { src: "https://ext.same-assets.com/334974529/2808153448.png", alt: "Partner 1" },
  { src: "https://ext.same-assets.com/334974529/481301621.png", alt: "KT" },
  { src: "https://ext.same-assets.com/334974529/2905518078.png", alt: "K-WW 2025" },
  { src: "https://ext.same-assets.com/334974529/2580229702.png", alt: "Partner 4" },
];

const partnersRow2 = [
  { src: "https://ext.same-assets.com/334974529/1816903881.png", alt: "NUON" },
  { src: "https://ext.same-assets.com/334974529/3931481822.png", alt: "NAVER" },
  { src: "https://ext.same-assets.com/334974529/4065696341.png", alt: "tvN" },
  { src: "https://ext.same-assets.com/334974529/1816903881.png", alt: "SBS" },
];

export default function Partners() {
  return (
    <section className="relative py-24 md:py-32 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <span className="text-xs tracking-widest text-white/50 uppercase mb-4 block">
          Partners
        </span>
        <h2 className="text-4xl md:text-5xl font-light text-white">
          Creative Partners
        </h2>
      </div>

      {/* Marquee Row 1 */}
      <div className="relative mb-8">
        <div className="flex animate-marquee">
          {[...partnersRow1, ...partnersRow1, ...partnersRow1, ...partnersRow1, ...partnersRow1, ...partnersRow1].map((partner, index) => (
            <div
              key={`row1-${partner.alt}-${index}`}
              className="flex-shrink-0 mx-8 md:mx-12 partner-logo"
            >
              <Image
                src={partner.src}
                alt={partner.alt}
                width={120}
                height={48}
                className="h-10 md:h-12 w-auto object-contain grayscale brightness-200"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 */}
      <div className="relative">
        <div className="flex animate-marquee-reverse">
          {[...partnersRow2, ...partnersRow2, ...partnersRow2, ...partnersRow2, ...partnersRow2, ...partnersRow2].map((partner, index) => (
            <div
              key={`row2-${partner.alt}-${index}`}
              className="flex-shrink-0 mx-8 md:mx-12 partner-logo"
            >
              <Image
                src={partner.src}
                alt={partner.alt}
                width={120}
                height={48}
                className="h-10 md:h-12 w-auto object-contain grayscale brightness-200"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Gradient overlays for fade effect */}
      <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
    </section>
  );
}
