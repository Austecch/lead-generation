"use client";

import { useEffect, useState } from "react";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  image?: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Mitchell",
    role: "Wedding Client",
    content: "The vendor guide saved me weeks of research. I found my perfect photographer within days!",
    rating: 5,
  },
  {
    name: "David Chen",
    role: "Corporate Event Planner",
    content: "The budget calculator helped us stay on track and saved us over $3,000 on our annual gala.",
    rating: 5,
  },
  {
    name: "Jennifer Adams",
    role: "Birthday Party Host",
    content: "Emily's checklist made planning my daughter's sweet 16 so much easier. Everything was perfect!",
    rating: 5,
  },
];

export default function SocialProof() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {[
            { value: "10,000+", label: "Happy Clients" },
            { value: "500+", label: "Verified Vendors" },
            { value: "4.9", label: "Average Rating" },
            { value: "95%", label: "Success Rate" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="count-up mb-2">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white mb-4">
              Loved by Event Planners
            </h2>
            <div className="gold-divider"></div>
          </div>

          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="luxury-card p-8 max-w-2xl mx-auto">
                    {/* Stars */}
                    <div className="flex gap-1 mb-4 justify-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-emily-gold"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    <blockquote className="text-lg text-gray-200 text-center mb-6 italic">
                      "{testimonial.content}"
                    </blockquote>

                    <div className="flex items-center justify-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-white">{testimonial.name}</div>
                        <div className="text-sm text-gray-400">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-emily-gold w-6"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: "🔒", title: "Secure & Private", desc: "Your data is encrypted and never shared" },
            { icon: "✓", title: "Verified Vendors", desc: "All vendors are vetted and reviewed" },
            { icon: "♥", title: "Free Forever", desc: "No credit card required, no hidden fees" },
          ].map((badge, index) => (
            <div key={index} className="trust-badge justify-center">
              <span className="text-2xl">{badge.icon}</span>
              <div className="text-left">
                <div className="font-semibold text-white">{badge.title}</div>
                <div className="text-sm text-gray-400">{badge.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
