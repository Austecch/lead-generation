"use client";

import { useEffect, useState } from "react";

interface ExitIntentPopupProps {
  title: string;
  description: string;
  ctaText: string;
  onCtaClick: () => void;
}

export default function ExitIntentPopup({
  title,
  description,
  ctaText,
  onCtaClick,
}: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 10 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasShown]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="luxury-card max-w-md w-full p-8 animate-slide-up relative">
        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Gift Icon */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-emily-gold to-emily-gold-dark flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-[#0F0A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109 5.5V6h3z" />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-serif font-bold text-white text-center mb-3">{title}</h2>
        <p className="text-gray-300 text-center mb-6">{description}</p>

        <button
          onClick={() => {
            onCtaClick();
            setIsVisible(false);
          }}
          className="btn-gold-gradient w-full"
        >
          {ctaText}
        </button>

        <p className="text-center text-gray-400 text-sm mt-4">
          <button
            onClick={() => setIsVisible(false)}
            className="hover:text-white transition-colors"
          >
            No thanks, I don't want to save time
          </button>
        </p>
      </div>
    </div>
  );
}
