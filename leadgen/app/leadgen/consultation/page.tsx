'use client'
import Navbar from "@/components/ui/Navbar";
import LeadForm from "@/components/ui/LeadForm";
import Benefits from "@/components/ui/Benefits";
import SocialProof from "@/components/ui/SocialProof";
import Footer from "@/components/ui/Footer";

const benefits = [
  {
    icon: "👩‍💼",
    title: "Expert Guidance",
    description: "Get personalized advice from our senior event planners who've coordinated 500+ successful events.",
  },
  {
    icon: "🎯",
    title: "Custom Strategy",
    description: "Receive a tailored event strategy based on your specific goals, budget, and vision.",
  },
  {
    icon: "💡",
    title: "Insider Tips",
    description: "Learn industry secrets that will save you time, money, and stress throughout your planning journey.",
  },
  {
    icon: "📋",
    title: "Action Plan",
    description: "Leave with a clear, step-by-step action plan to make your event planning smooth and stress-free.",
  },
  {
    icon: "🤝",
    title: "Vendor Introductions",
    description: "Get introduced to our network of trusted, vetted vendors who match your style and budget.",
  },
  {
    icon: "⏰",
    title: "No Obligation",
    description: "Completely free consultation with absolutely no pressure to book - just honest, helpful advice.",
  },
];

const whatToExpect = [
  {
    time: "0-5 min",
    title: "Introduction",
    desc: "We'll learn about your event vision, goals, and current planning status",
  },
  {
    time: "5-20 min",
    title: "Strategy Session",
    desc: "Deep dive into your event needs with personalized recommendations",
  },
  {
    time: "20-25 min",
    title: "Vendor Matching",
    desc: "Introductions to vendors who perfectly match your style and budget",
  },
  {
    time: "25-30 min",
    title: "Next Steps",
    desc: "Clear action plan and timeline to bring your vision to life",
  },
];

export default function ConsultationPage() {
  return (
    <div className="min-h-screen bg-emily-dark">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-anthropic-orange/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-emily-gold/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
                <span className="text-emily-gold">⭐</span>
                <span className="text-gray-300 text-sm">Limited spots available this week</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                Book Your Free{" "}
                <span className="gold-gradient-text">30-Minute Consultation</span>
              </h1>

              <p className="text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
                Get expert guidance from our senior event planners. We'll help you clarify your vision, avoid common pitfalls, and create a roadmap to your perfect event.
              </p>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
                {[
                  "500+ Events Planned",
                  "4.9/5 Rating",
                  "30 Min Session",
                  "100% Free",
                ].map((item) => (
                  <div key={item} className="social-proof-badge">
                    <svg className="w-4 h-4 text-emily-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              {/* Planner Avatars */}
              <div className="bg-emily-card/50 rounded-2xl p-6 inline-block">
                <p className="text-sm text-gray-400 mb-4">You'll speak with one of our expert planners:</p>
                <div className="flex -space-x-3">
                  {[
                    { name: "Sarah", role: "Wedding Specialist", color: "from-pink-500 to-rose-600" },
                    { name: "Michael", role: "Corporate Events", color: "from-blue-500 to-blue-700" },
                    { name: "Emma", role: "Party Planning", color: "from-purple-500 to-purple-700" },
                    { name: "David", role: "Luxury Events", color: "from-emily-gold to-yellow-600" },
                  ].map((planner, i) => (
                    <div
                      key={planner.name}
                      className="relative group"
                      title={`${planner.name} - ${planner.role}`}
                    >
                      <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${planner.color} flex items-center justify-center border-2 border-[#0F0A1A] group-hover:scale-110 transition-transform`}>
                        <span className="text-white font-semibold">{planner.name[0]}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="animate-float">
              <div className="luxury-card p-6 mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-green-400 text-sm font-medium">3 Spots Available This Week</span>
                </div>
                <h3 className="text-xl font-serif font-semibold text-white mb-2">
                  Book Your Free Consultation
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                  Fill out the form below and we'll contact you to schedule your session
                </p>
              </div>
              <LeadForm
                leadMagnet="Free Consultation"
                buttonText="Book My Free Consultation →"
                showEventType={true}
                showEventDate={true}
                showBudget={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-b from-transparent to-orange-900/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white mb-4">
              What Happens In Your Consultation?
            </h2>
            <p className="text-gray-300">
              A structured 30-minute session designed to give you maximum value
            </p>
            <div className="gold-divider mt-6"></div>
          </div>

          <div className="space-y-6">
            {whatToExpect.map((item, index) => (
              <div key={index} className="luxury-card p-6 flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emily-gold to-emily-gold-dark flex flex-col items-center justify-center">
                    <span className="text-[#0F0A1A] text-xs font-bold">{item.time}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-bold text-emily-gold">{index + 1}</span>
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  </div>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <Benefits
        title="What You'll Get From Your Consultation"
        subtitle="Real value, zero pressure, complete clarity"
        benefits={benefits}
      />

      {/* FAQ */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white mb-4">
              Common Questions
            </h2>
            <div className="gold-divider"></div>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Is the consultation really free?",
                a: "Yes! The 30-minute consultation is completely free with no obligation to book our services. We're happy to help regardless.",
              },
              {
                q: "What do I need to prepare?",
                a: "Just come with your event vision in mind. If you have a date, budget range, or venue ideas, that's helpful but not required.",
              },
              {
                q: "How soon can we schedule?",
                a: "We typically have availability within 3-5 business days. Popular weekend slots fill up faster, so book soon!",
              },
              {
                q: "Can I bring my partner or co-host?",
                a: "Absolutely! We encourage bringing anyone involved in the planning decisions. Just let us know in advance.",
              },
              {
                q: "What happens after the consultation?",
                a: "You'll receive a summary email with your action plan and vendor recommendations. No pressure - take your time deciding.",
              },
            ].map((faq, index) => (
              <div key={index} className="luxury-card p-6">
                <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
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
              Ready To Plan Your Perfect Event?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Book your free consultation today - spots fill up fast!
            </p>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-gold-gradient inline-block text-lg"
            >
              Book My Free Consultation →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
