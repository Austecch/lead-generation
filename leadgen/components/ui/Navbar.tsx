"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0F0A1A]/95 backdrop-blur-lg shadow-lg border-b border-purple-500/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6B21A8] to-[#9333EA] flex items-center justify-center shadow-glow-purple">
              <span className="text-white font-bold text-xl font-serif">E</span>
            </div>
            <span className="text-xl font-serif font-semibold gold-gradient-text group-hover:opacity-80 transition-opacity">
              Emily Experience
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/leadgen/checklist" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Free Checklist
            </Link>
            <Link href="/leadgen/calculator" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Budget Calculator
            </Link>
            <Link href="/leadgen/guide" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Vendor Guide
            </Link>
            <Link
              href="/leadgen/consultation"
              className="btn-primary-gradient text-sm"
            >
              Free Consultation
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
