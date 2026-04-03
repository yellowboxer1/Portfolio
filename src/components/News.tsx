"use client";

import Link from "next/link";

const newsItems = [
  {
    id: 1,
    title: "Studio Tina partners with Seoul National University for AI content collaboration",
    date: "2026.03.26",
  },
  {
    id: 2,
    title: "CJ ENM and Studio Tina announce 'AI Drama' production partnership",
    date: "2026.03.26",
  },
  {
    id: 3,
    title: "Netflix Korea selects AI short film 'Eternal: Awakening'",
    date: "2025.12.09",
  },
  {
    id: 4,
    title: "Original IP AI adaptation... 'Shadow' and more in production",
    date: "2025.12.09",
  },
  {
    id: 5,
    title: "'Dark Forest', AI-generated film wins international award",
    date: "2025.11.20",
  },
];

export default function News() {
  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          {/* Section Header */}
          <div className="md:col-span-3">
            <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
              News
            </h2>
            <Link
              href="/news"
              className="inline-flex items-center gap-3 px-5 py-2.5 bg-white text-black rounded-full hover:bg-white/90 transition-all group"
            >
              <span className="text-sm font-medium">View More</span>
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
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

          {/* News List */}
          <div className="md:col-span-9">
            <div className="space-y-0">
              {newsItems.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.id}`}
                  className="news-item block py-6 border-b border-white/10 group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <h3 className="text-lg md:text-xl font-light text-white/90 group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-sm text-white/40 whitespace-nowrap">
                      {item.date}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
