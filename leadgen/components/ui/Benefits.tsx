"use client";

import { ReactNode } from "react";

interface Benefit {
  icon: ReactNode;
  title: string;
  description: string;
}

interface BenefitsProps {
  title: string;
  subtitle?: string;
  benefits: Benefit[];
}

export default function Benefits({ title, subtitle, benefits }: BenefitsProps) {
  return (
    <section className="py-20 px-6 lg:px-8 bg-gradient-to-b from-transparent to-purple-900/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">{subtitle}</p>
          )}
          <div className="gold-divider mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="feature-card group hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center mb-5 group-hover:shadow-glow-purple transition-shadow">
                <div className="text-2xl text-white">{benefit.icon}</div>
              </div>
              <h3 className="text-xl font-serif font-semibold text-white mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
