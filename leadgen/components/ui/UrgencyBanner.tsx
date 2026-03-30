"use client";

import { useEffect, useState } from "react";

interface UrgencyBannerProps {
  text: string;
  endTime?: Date;
}

export default function UrgencyBanner({ text, endTime }: UrgencyBannerProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (!endTime) return;

    const calculateTimeLeft = () => {
      const difference = endTime.getTime() - new Date().getTime();

      if (difference <= 0) {
        setIsExpired(true);
        return;
      }

      setTimeLeft({
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  if (isExpired) return null;

  return (
    <div className="bg-gradient-to-r from-red-600 to-red-500 text-white py-3 px-4 text-center">
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="font-medium">{text}</span>

        {endTime && (
          <div className="flex items-center gap-2 font-mono text-lg">
            <span className="bg-white/20 px-2 py-1 rounded">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            :
            <span className="bg-white/20 px-2 py-1 rounded">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            :
            <span className="bg-white/20 px-2 py-1 rounded">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
