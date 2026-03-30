"use client";

import { useEffect, useState } from "react";

interface StickyCTAProps {
  text: string;
  buttonText: string;
  onClick: () => void;
}

export default function StickyCTA({ text, buttonText, onClick }: StickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past 50% of viewport height
      const scrollPosition = window.scrollY + window.innerHeight;
      const halfwayPoint = document.body.scrollHeight / 2;
      setIsVisible(scrollPosition > halfwayPoint);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="sticky-cta animate-slide-up">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-white font-medium">{text}</p>
        <button
          onClick={onClick}
          className="btn-gold-gradient text-sm whitespace-nowrap"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
