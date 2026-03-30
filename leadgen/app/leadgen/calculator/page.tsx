"use client";

import { useState } from "react";
import Navbar from "@/components/ui/Navbar";
import LeadForm from "@/components/ui/LeadForm";
import Benefits from "@/components/ui/Benefits";
import SocialProof from "@/components/ui/SocialProof";
import Footer from "@/components/ui/Footer";

const benefits = [
  {
    icon: "🎯",
    title: "Accurate Estimates",
    description: "Get realistic budget estimates based on thousands of real events and current market rates.",
  },
  {
    icon: "📊",
    title: "Category Breakdown",
    description: "See exactly how much to allocate for venue, catering, décor, photography, and more.",
  },
  {
    icon: "💡",
    title: "Money-Saving Tips",
    description: "Get personalized recommendations on where to save and where to splurge for maximum impact.",
  },
  {
    icon: "📈",
    title: "Compare Scenarios",
    description: "Compare different budget scenarios to find the perfect balance for your event.",
  },
  {
    icon: "📱",
    title: "Mobile-Friendly",
    description: "Calculate your budget on the go with our responsive calculator design.",
  },
  {
    icon: "📧",
    title: "Email Summary",
    description: "Receive a detailed budget breakdown sent directly to your inbox for easy reference.",
  },
];

const eventTypes = [
  { value: "wedding", label: "Wedding", baseCost: 30000 },
  { value: "corporate", label: "Corporate Event", baseCost: 15000 },
  { value: "birthday", label: "Birthday Party", baseCost: 5000 },
  { value: "anniversary", label: "Anniversary", baseCost: 8000 },
  { value: "baby-shower", label: "Baby Shower", baseCost: 3000 },
  { value: "graduation", label: "Graduation", baseCost: 4000 },
];

const guestRanges = [
  { value: "1-25", label: "1-25 guests", multiplier: 0.5 },
  { value: "26-50", label: "26-50 guests", multiplier: 0.8 },
  { value: "51-100", label: "51-100 guests", multiplier: 1 },
  { value: "101-200", label: "101-200 guests", multiplier: 1.5 },
  { value: "200+", label: "200+ guests", multiplier: 2.2 },
];

export default function CalculatorPage() {
  const [eventType, setEventType] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [budget, setBudget] = useState<number | null>(null);
  const [breakdown, setBreakdown] = useState<any>(null);

  const calculateBudget = () => {
    const selectedEvent = eventTypes.find((e) => e.value === eventType);
    const selectedGuests = guestRanges.find((g) => g.value === guestCount);

    if (selectedEvent && selectedGuests) {
      const totalBudget = Math.round(selectedEvent.baseCost * selectedGuests.multiplier);
      setBudget(totalBudget);

      // Calculate breakdown
      setBreakdown({
        venue: Math.round(totalBudget * 0.4),
        catering: Math.round(totalBudget * 0.25),
        photography: Math.round(totalBudget * 0.1),
        decor: Math.round(totalBudget * 0.08),
        entertainment: Math.round(totalBudget * 0.07),
        other: Math.round(totalBudget * 0.1),
      });
    }
  };

  return (
    <div className="min-h-screen bg-emily-dark">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-anthropic-blue/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-emily-gold/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                <span className="text-emily-gold">📊</span>
                <span className="text-gray-300 text-sm">Used by 15,000+ event planners</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                Calculate Your Event Budget{" "}
                <span className="gold-gradient-text">In Seconds</span>
              </h1>

              <p className="text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
                Get an instant, accurate estimate for your event budget based on real market data and thousands of successful events.
              </p>

              {/* Mini Calculator */}
              <div className="luxury-card p-6 mb-8">
                <h3 className="text-lg font-serif font-semibold text-white mb-4">Quick Estimate</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="luxury-label">Event Type</label>
                    <select
                      value={eventType}
                      onChange={(e) => { setEventType(e.target.value); setBudget(null); }}
                      className="luxury-input w-full cursor-pointer"
                    >
                      <option value="">Select event type</option>
                      {eventTypes.map((type) => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="luxury-label">Guest Count</label>
                    <select
                      value={guestCount}
                      onChange={(e) => { setGuestCount(e.target.value); setBudget(null); }}
                      className="luxury-input w-full cursor-pointer"
                    >
                      <option value="">Select guest count</option>
                      {guestRanges.map((range) => (
                        <option key={range.value} value={range.value}>{range.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  onClick={calculateBudget}
                  disabled={!eventType || !guestCount}
                  className="btn-primary-gradient w-full disabled:opacity-50"
                >
                  Calculate My Budget
                </button>

                {budget && breakdown && (
                  <div className="mt-6 p-4 bg-emily-card rounded-xl animate-fade-in">
                    <div className="text-center mb-4">
                      <p className="text-gray-400 text-sm mb-1">Estimated Total Budget</p>
                      <div className="text-4xl font-bold gold-gradient-text">
                        ${budget.toLocaleString()}
                      </div>
                    </div>

                    <div className="space-y-2">
                      {Object.entries(breakdown).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-gray-400 capitalize">{key}</span>
                          <span className="text-white font-medium">${(value as number).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>

                    <p className="text-xs text-gray-500 mt-4 text-center">
                      *Get detailed breakdown by submitting the form
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Form */}
            <div>
              <div className="luxury-card p-6 mb-4">
                <h3 className="text-xl font-serif font-semibold text-white text-center mb-2">
                  Get Your Detailed Budget Breakdown
                </h3>
                <p className="text-gray-400 text-center text-sm mb-6">
                  Complete the form below and we'll send you a comprehensive budget guide with money-saving tips
                </p>
              </div>
              <LeadForm
                leadMagnet="Budget Calculator"
                buttonText="Send Me My Budget Guide →"
                showEventType={true}
                showEventDate={true}
                showBudget={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <Benefits
        title="Why Use Our Budget Calculator?"
        subtitle="Stop guessing and start planning with confidence"
        benefits={benefits}
      />

      {/* How It Works */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-b from-transparent to-blue-900/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white mb-4">
              How It Works
            </h2>
            <div className="gold-divider"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Enter Your Details", desc: "Select your event type and expected guest count" },
              { step: "2", title: "Get Your Estimate", desc: "Receive an instant budget estimate based on real data" },
              { step: "3", title: "Download Your Guide", desc: "Get a detailed breakdown with money-saving tips" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-emily-gold to-emily-gold-dark flex items-center justify-center"
003e
                  <span className="text-2xl font-bold text-[#0F0A1A]">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SocialProof />

      {/* Final CTA */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="luxury-card p-12">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white mb-4">
              Know Your Numbers Before You Start
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of smart event planners who budget with confidence
            </p>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-gold-gradient inline-block text-lg"
            >
              Calculate My Budget Now →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
