import Navbar from "@/components/ui/Navbar";
import LeadForm from "@/components/ui/LeadForm";
import Benefits from "@/components/ui/Benefits";
import SocialProof from "@/components/ui/SocialProof";
import Footer from "@/components/ui/Footer";

const benefits = [
  {
    icon: "🔍",
    title: "Vetting Checklist",
    description: "Know exactly what to look for when evaluating potential vendors with our comprehensive vetting criteria.",
  },
  {
    icon: "❓",
    title: "Interview Questions",
    description: "Ask the right questions to uncover red flags and find vendors who truly match your vision.",
  },
  {
    icon: "💰",
    title: "Pricing Benchmarks",
    description: "Understand fair market pricing so you can negotiate confidently and avoid overpaying.",
  },
  {
    icon: "📋",
    title: "Contract Checklist",
    description: "Never sign a contract without checking these essential clauses and terms.",
  },
  {
    icon: "⭐",
    title: "Review Guide",
    description: "Learn how to read between the lines of online reviews and spot genuine feedback.",
  },
  {
    icon: "🤝",
    title: "Backup Plan",
    description: "What to do if your vendor cancels last minute - includes emergency contact templates.",
  },
];

const vendorCategories = [
  { name: "Venue", icon: "🏛️", description: "Capacity, accessibility, restrictions" },
  { name: "Catering", icon: "🍽️", description: "Menu options, dietary accommodations" },
  { name: "Photography", icon: "📷", description: "Style, packages, deliverables" },
  { name: "Music/DJ", icon: "🎵", description: "Equipment, playlist management" },
  { name: "Florist", icon: "🌸", description: "Seasonal availability, design style" },
  { name: "Decor", icon: "✨", description: "Rental vs purchase, setup/breakdown" },
];

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-emily-dark">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-anthropic-green/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emily-gold/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
                <span className="text-emily-gold">📖</span>
                <span className="text-gray-300 text-sm">The #1 vendor selection guide</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                Find Your Perfect{" "}
                <span className="gold-gradient-text">Dream Team</span>
              </h1>

              <p className="text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
                Stop stressing about vendor selection. Our comprehensive guide gives you everything you need to find, vet, and book the perfect vendors for your event.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Over 100 questions to ask each vendor type",
                  "Red flags that signal walk away immediately",
                  "Contract terms you must negotiate",
                  "Pricing benchmarks for fair deals",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-300">
                    <svg className="w-5 h-5 text-emily-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-400">
                <svg className="w-5 h-5 text-emily-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Read in 20 minutes • Save 20+ hours of research</span>
              </div>
            </div>

            {/* Right Form */}
            <div className="animate-float">
              <div className="luxury-card p-6 mb-4">
                <h3 className="text-xl font-serif font-semibold text-white text-center mb-2">
                  Download The Ultimate Vendor Guide
                </h3>
                <p className="text-gray-400 text-center text-sm mb-6">
                  Enter your details below and we'll send the guide straight to your inbox
                </p>
              </div>
              <LeadForm
                leadMagnet="Vendor Selection Guide"
                buttonText="Send Me The Guide →"
                showEventType={true}
                showEventDate={false}
                showBudget={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vendor Categories */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-b from-transparent to-green-900/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white mb-4">
              Covered In The Guide
            </h2>
            <p className="text-gray-300">
              Detailed guidance for every vendor type you'll need
            </p>
            <div className="gold-divider mt-6"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {vendorCategories.map((vendor, index) => (
              <div key={index} className="luxury-card p-6 text-center group hover:scale-[1.02] transition-transform">
                <div className="text-4xl mb-3">{vendor.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-1">{vendor.name}</h3>
                <p className="text-sm text-gray-400">{vendor.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <Benefits
        title="What's Inside The Guide?"
        subtitle="Everything you need to build your dream vendor team"
        benefits={benefits}
      />

      {/* Preview Quote */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="luxury-card p-8 md:p-12 text-center">
            <blockquote className="text-2xl md:text-3xl font-serif italic text-white mb-6">
              "This guide saved me from booking a photographer with terrible reviews that I almost missed. Worth its weight in gold!"
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
                <span className="text-white font-semibold">M</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-white">Michelle Roberts</div>
                <div className="text-sm text-gray-400">Wedding Client, Saved $2,400</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SocialProof />

      {/* Final CTA */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="luxury-card p-12">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white mb-4">
              Build Your Dream Team With Confidence
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Download the guide that 8,000+ event planners trust
            </p>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-gold-gradient inline-block text-lg"
            >
              Get My Free Vendor Guide →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
