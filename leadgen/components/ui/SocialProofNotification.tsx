"use client";

import { useEffect, useState } from "react";

interface Notification {
  id: number;
  name: string;
  location: string;
  action: string;
  time: string;
}

const names = ["Sarah M.", "Michael C.", "Emma L.", "David R.", "Jennifer K.", "Chris T.", "Lisa P.", "Mark H."];
const locations = ["Chicago, IL", "New York, NY", "Los Angeles, CA", "Miami, FL", "Austin, TX", "Seattle, WA", "Denver, CO", "Boston, MA"];
const actions = [
  "downloaded the checklist",
  "booked a consultation",
  "calculated their budget",
  "got the vendor guide",
  "joined our community",
];

export default function SocialProofNotification() {
  const [notification, setNotification] = useState<Notification | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show first notification after 5 seconds
    const initialTimeout = setTimeout(() => {
      showRandomNotification();
    }, 5000);

    // Show notifications periodically
    const interval = setInterval(() => {
      showRandomNotification();
    }, 15000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const showRandomNotification = () => {
    const newNotification: Notification = {
      id: Date.now(),
      name: names[Math.floor(Math.random() * names.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      action: actions[Math.floor(Math.random() * actions.length)],
      time: "Just now",
    };

    setNotification(newNotification);
    setIsVisible(true);

    // Hide after 5 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 5000);
  };

  if (!notification) return null;

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 transition-all duration-500 transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="luxury-card p-4 flex items-center gap-3 max-w-sm">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center flex-shrink-0">
          <span className="text-white font-semibold text-sm">{notification.name.charAt(0)}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-medium truncate">
            {notification.name} from {notification.location}
          </p>
          <p className="text-gray-400 text-xs truncate">
            {notification.action} • {notification.time}
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
