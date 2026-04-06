"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 header-blur bg-black/50">
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-medium tracking-wider">
            <span className="font-medium">Gunho</span>
            <span className="text-xs align-super ml-0.5 text-white/60">park</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          <div
            className="relative group"
            onMouseEnter={() => setIsAboutOpen(true)}
            onMouseLeave={() => setIsAboutOpen(false)}
          >
            <Link
              href="/about"
              className="text-sm font-medium text-white/80 hover:text-white transition-colors tracking-wider"
            >
              ABOUT ME
            </Link>
            {isAboutOpen && (
              <div className="absolute top-full left-0 pt-2">
                <div className="bg-black/90 backdrop-blur-md rounded-lg py-2 min-w-[140px] border border-white/10">
                  <Link
                    href="/about/company"
                    className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    COMPANY
                  </Link>
                  <Link
                    href="/about/history"
                    className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    HISTORY
                  </Link>
                  <Link
                    href="/about/partners"
                    className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    PARTNERS
                  </Link>
                </div>
              </div>
            )}
          </div>
          <Link
            href="/works"
            className="text-sm font-medium text-white/80 hover:text-white transition-colors tracking-wider"
          >
            WORKS
          </Link>
          <Link
            href="/news"
            className="text-sm font-medium text-white/80 hover:text-white transition-colors tracking-wider"
          >
            NEWS
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-white/80 hover:text-white transition-colors tracking-wider"
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
          <span className={`w-6 h-0.5 bg-white transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-white transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-white transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10">
          <nav className="px-6 py-4 space-y-4">
            <div>
              <Link
                href="/about"
                className="block text-sm font-semibold text-white/80 hover:text-white py-2"
              >
                ABOUT US
              </Link>
              <div className="pl-4 space-y-2 mt-2">
                <Link href="/about/company" className="block text-sm font-semibold text-white/60 hover:text-white py-1">
                  COMPANY
                </Link>
                <Link href="/about/history" className="block text-sm font-semibold text-white/60 hover:text-white py-1">
                  HISTORY
                </Link>
                <Link href="/about/partners" className="block text-sm font-semibold text-white/60 hover:text-white py-1">
                  PARTNERS
                </Link>
              </div>
            </div>
            <Link href="/works" className="block text-sm font-semibold text-white/80 hover:text-white py-2">
              WORKS
            </Link>
            <Link href="/news" className="block text-sm font-semibold text-white/80 hover:text-white py-2">
              NEWS
            </Link>
            <Link href="/contact" className="block text-sm font-semibold text-white/80 hover:text-white py-2">
              CONTACT
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
