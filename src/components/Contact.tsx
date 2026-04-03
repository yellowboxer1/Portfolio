"use client";

import Link from "next/link";

export default function Contact() {
  return (
    <section className="relative py-32 md:py-48 px-6 md:px-12 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Gradient Sphere */}
          <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] mb-12 animate-sphere">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(139, 233, 253, 0.5), rgba(165, 180, 252, 0.4) 30%, rgba(244, 114, 182, 0.3) 60%, rgba(192, 132, 252, 0.2) 80%, transparent 100%)",
                filter: "blur(2px)",
              }}
            />
            <div
              className="absolute inset-4 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 40% 40%, rgba(167, 243, 208, 0.3), rgba(96, 165, 250, 0.3) 40%, rgba(192, 132, 252, 0.2) 70%, transparent 100%)",
                filter: "blur(10px)",
              }}
            />
            <div
              className="absolute inset-8 rounded-full opacity-60"
              style={{
                background:
                  "radial-gradient(circle at 60% 60%, rgba(244, 114, 182, 0.4), transparent 60%)",
                filter: "blur(15px)",
              }}
            />
            {/* Center content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all group border border-white/20"
              >
                <span className="text-base font-medium">Contact Us</span>
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
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
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight">
            <span className="block text-white/40">YOUR</span>
            <span className="block text-white">NEXT STORY</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
