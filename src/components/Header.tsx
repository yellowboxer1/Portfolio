"use client";

import { useState } from "react";
import Link from "next/link";

type HeaderProps = {
  aboutHref?: string;
  worksHref?: string;
  contactHref?: string;
  onAboutClick?: () => void;
  variant?: "default" | "light";
};

export default function Header({
  aboutHref = "/about",
  worksHref = "/works",
  contactHref = "/contact",
  onAboutClick,
  variant = "default",
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const isLight = variant === "light";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[80] header-blur ${
        isLight
          ? "bg-white/88 border-b border-black/8 shadow-[0_12px_34px_rgba(15,23,42,0.01)]"
          : "bg-black/50"
      }`}
    >
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className={`text-2xl font-medium tracking-wider ${isLight ? "text-black" : "text-white"}`}>
            <span className="font-medium">Gunho</span>
            <span className={`text-xs align-super ml-0.5 ${isLight ? "text-black/45" : "text-white/60"}`}>park</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-15">
          <div
            className="relative group"
            onMouseEnter={() => setIsAboutOpen(true)}
            onMouseLeave={() => setIsAboutOpen(false)}
          >
            <Link
              href={aboutHref}
              onClick={onAboutClick}
              className={`text-sm font-medium transition-colors tracking-wider ${
                isLight ? "text-black/65 hover:text-black" : "text-white/80 hover:text-white"
              }`}
            >
              ABOUT
            </Link>
            {isAboutOpen && (
              <div className="absolute top-full left-0 pt-2">
                <div
                  className={`backdrop-blur-md rounded-lg py-2 min-w-[140px] ${
                    isLight
                      ? "bg-white/96 border border-black/8 shadow-[0_18px_40px_rgba(15,23,42,0.12)]"
                      : "bg-black/90 border border-white/10"
                  }`}
                >
                  <Link
                    href="/about/"
                    className={`block px-4 py-2 text-sm transition-colors ${
                      isLight
                        ? "text-black/62 hover:text-black hover:bg-black/4"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    ABOUT ME
                  </Link>
                  <Link
                    href="/about/history"
                    className={`block px-4 py-2 text-sm transition-colors ${
                      isLight
                        ? "text-black/62 hover:text-black hover:bg-black/4"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    HISTORY
                  </Link>
                  <Link
                    href="/about/resume"
                    className={`block px-4 py-2 text-sm transition-colors ${
                      isLight
                        ? "text-black/62 hover:text-black hover:bg-black/4"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    RESUME
                  </Link>
                </div>
              </div>
            )}
          </div>
          <Link
            href={worksHref}
            className={`text-sm font-medium transition-colors tracking-wider ${
              isLight ? "text-black/65 hover:text-black" : "text-white/80 hover:text-white"
            }`}
          >
            WORKS
          </Link>
          <Link
            href={contactHref}
            className={`text-sm font-medium transition-colors tracking-wider ${
              isLight ? "text-black/65 hover:text-black" : "text-white/80 hover:text-white"
            }`}
          >
            CONTACT
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden flex flex-col space-y-1.5 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className={`w-6 h-0.5 transition-transform ${isLight ? "bg-black" : "bg-white"} ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 transition-opacity ${isLight ? "bg-black" : "bg-white"} ${isMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 transition-transform ${isLight ? "bg-black" : "bg-white"} ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className={`fixed inset-x-0 top-[64px] z-[90] md:hidden backdrop-blur-md ${
            isLight
              ? "bg-white/96 border-t border-black/8 shadow-[0_20px_40px_rgba(15,23,42,0.08)]"
              : "bg-black/95 border-t border-white/10"
          }`}
        >
          <nav className="px-6 py-4 space-y-4">
            <div>
              <Link
                href={aboutHref}
                onClick={onAboutClick}
                className={`block text-sm font-semibold py-2 ${
                  isLight ? "text-black/72 hover:text-black" : "text-white/80 hover:text-white"
                }`}
              >
                ABOUT
              </Link>
              <div className="pl-4 space-y-2 mt-2">
                <Link
                  href="/about/"
                  className={`block text-sm font-semibold py-1 ${
                    isLight ? "text-black/58 hover:text-black" : "text-white/60 hover:text-white"
                  }`}
                >
                  ABOUT ME
                </Link>
                <Link
                  href="/about/history"
                  className={`block text-sm font-semibold py-1 ${
                    isLight ? "text-black/58 hover:text-black" : "text-white/60 hover:text-white"
                  }`}
                >
                  HISTORY
                </Link>
                <Link
                  href="/about/resume"
                  className={`block text-sm font-semibold py-1 ${
                    isLight ? "text-black/58 hover:text-black" : "text-white/60 hover:text-white"
                  }`}
                >
                  RESUME
                </Link>
              </div>
            </div>
            <Link
              href={worksHref}
              className={`block text-sm font-semibold py-2 ${
                isLight ? "text-black/72 hover:text-black" : "text-white/80 hover:text-white"
              }`}
            >
              WORKS
            </Link>
            <Link
              href={contactHref}
              className={`block text-sm font-semibold py-2 ${
                isLight ? "text-black/72 hover:text-black" : "text-white/80 hover:text-white"
              }`}
            >
              CONTACT
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
