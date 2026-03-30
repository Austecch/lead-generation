"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const resourceLinks: Record<string, { title: string; links: { label: string; url: string }[] }> = {
  "Event Planning Checklist": {
    title: "Your Free Checklist",
    links: [
      { label: "Download PDF", url: "#" },
      { label: "Interactive Version", url: "#" },
      { label: "Printable Version", url: "#" },
    ],
  },
  "Budget Calculator": {
    title: "Your Budget Guide",
    links: [
      { label: "Download PDF", url: "#" },
      { label: "Excel Template", url: "#" },
      { label: "Google Sheets", url: "#" },
    ],
  },
  "Vendor Selection Guide": {
    title: "Your Vendor Guide",
    links: [
      { label: "Download PDF", url: "#" },
      { label: "Interview Questions", url: "#" },
      { label: "Contract Checklist", url: "#" },
    ],
  },
  "Free Consultation": {
    title: "Your Consultation",
    links: [
      { label: "Schedule Now", url: "/calendar" },
      { label: "Preparation Guide", url: "#" },
      { label: "FAQ", url: "#" },
    ],
  },
};

const nextSteps = [
  {
    icon: "📧",
    title: "Check Your Email",
    description: "We've sent your resource to your inbox. Add us to your contacts so you don't miss future tips!",
  },
  {
    icon: "📱",
    title: "Follow Us",
    description: "Get daily inspiration and tips by following us on Instagram and Facebook @emilyexperience",
  },
  {
    icon: "💬",
    title: "Join Our Community",
    description: "Connect with other event planners in our private Facebook group for exclusive tips and advice.",
  },
];

export default function ThankYouPage() {
  const [leadMagnet, setLeadMagnet] = useState("your resource");
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Get lead magnet from URL or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const magnet = urlParams.get('resource') || "Event Planning Checklist";
    setLeadMagnet(magnet);

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const resource = resourceLinks[leadMagnet] || {
    title: "Your Resource",
    links: [{ label: "Download", url: "#" }],
  };

  return (
    <div className="min-h-screen bg-emily-dark">
      <Navbar />

      <section className="pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center animate-pulse-glow">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              You're All Set! 🎉
            </h1>

            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Thank you for trusting Emily Experience. {resource.title} is on its way to your inbox!
            </p>
          </div>

          {/* Resource Card */}
          <div className="luxury-card p-8 mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-serif font-semibold text-white mb-2">
                Access Your {resource.title}
              </h2>
              <p className="text-gray-400">
                Choose your preferred format below
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {resource.links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className={`p-4 rounded-xl text-center transition-all ${
                    index === 0
                      ? "btn-primary-gradient"
                      : "border border-purple-500/30 hover:bg-purple-500/10 text-white"
                  }`}
                >
                  <span className="font-medium">{link.label}</span>
                </a>
              ))}
            </div>

            <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📧</span>
                <div>
                  <p className="text-yellow-200 font-medium mb-1">Don't see the email?</p>
                  <p className="text-gray-400 text-sm">
                    Check your spam folder or{" "}
                    <a href="mailto:support@emilyexperience.com" className="text-emily-gold hover:underline">
                      contact our support team
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-semibold text-white text-center mb-8">
              What's Next?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {nextSteps.map((step, index) => (
                <div key={index} className="luxury-card p-6 text-center">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Resources */}
          <div className="luxury-card p-8">
            <h2 className="text-2xl font-serif font-semibold text-white text-center mb-6">
              You Might Also Like
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "Budget Calculator",
                  desc: "Calculate your event budget in seconds",
                  icon: "💰",
                  url: "/leadgen/calculator",
                },
                {
                  title: "Vendor Guide",
                  desc: "Find and vet the perfect vendors",
                  icon: "📖",
                  url: "/leadgen/guide",
                },
                {
                  title: "Free Consultation",
                  desc: "Book a 30-min strategy session",
                  icon: "📅",
                  url: "/leadgen/consultation",
                },
                {
                  title: "Planning Checklist",
                  desc: "The ultimate event planning checklist",
                  icon: "✅",
                  url: "/leadgen/checklist",
                },
              ]
                .filter((item) => !item.title.toLowerCase().includes(leadMagnet.toLowerCase().split(" ")[0]))
                .slice(0, 2)
                .map((item, index) => (
                  <Link
                    key={index}
                    href={item.url}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <span className="text-3xl">{item.icon}</span>
                    <div>
                      <h3 className="font-semibold text-white">{item.title}</h3>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-12">
            <p className="text-gray-400 mb-4">
              Redirecting to homepage in {countdown} seconds...
            </p>
            <Link
              href="/"
              className="text-emily-gold hover:text-emily-gold-light transition-colors font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
