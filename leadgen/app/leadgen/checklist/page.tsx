import Navbar from "@/components/ui/Navbar";
import LeadForm from "@/components/ui/LeadForm";
import Benefits from "@/components/ui/Benefits";
import SocialProof from "@/components/ui/SocialProof";
import Footer from "@/components/ui/Footer";

const benefits = [
  {
    icon: "📋",
    title: "50-Point Master Checklist",
    description: "Never miss a detail with our comprehensive checklist covering everything from venue selection to day-of coordination.",
  },
  {
    icon: "📅",
    title: "12-Month Timeline",
    description: "Follow our proven timeline that tells you exactly what to do and when to do it, starting from a year out.",
  },
  {
    icon: "💰",
    title: "Budget Tracking Template",
    description: "Stay on track financially with our built-in budget tracker that automatically calculates your spending.",
  },
  {
    icon: "👥",
    title: "Vendor Interview Questions",
    description: "Ask the right questions to find your perfect vendors with our curated list of essential interview questions.",
  },
  {
    icon: "✓",
    title: "Day-Of Timeline",
    description: "Keep your event running smoothly with a detailed hour-by-hour schedule for the big day.",
  },
  {
    icon: "📱",
    title: "Digital & Printable",
    description: "Access your checklist anywhere with our digital version, or print it for your planning binder.",
  },
];

export default function ChecklistPage() {
  return (
    <div className="min-h-screen bg-emily-dark">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emily-gold/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                <span className="text-emily-gold">★</span>
                <span className="text-gray-300 text-sm">Downloaded by 10,000+ event planners</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                Plan Your Perfect Event with Our{" "}
                <span className="gold-gradient-text">Free 50-Point Checklist</span>
              </h1>

              <p className="text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
                Don't let anything slip through the cracks. Our comprehensive checklist covers every detail from 12 months out to the big day.
              </p>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
                {[
                  "12-Month Timeline",
                  "Budget Tracker",
                  "Vendor Questions",
                  "Day-Of Schedule",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-gray-300">
                    <svg className="w-5 h-5 text-emily-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  {["Sarah", "Mike", "Emma", "David"].map((name, i) => (
                    <div
                      key={name}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center border-2 border-[#0F0A1A]"
                    >
                      <span className="text-white text-sm font-medium">{name[0]}</span>
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-emily-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-gray-400">4.9/5 from 2,000+ reviews</p>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="animate-float">
              <div className="luxury-card p-6 mb-4">
                <h3 className="text-xl font-serif font-semibold text-white text-center mb-2">
                  Get Your Free Checklist
                </h3>
                <p className="text-gray-400 text-center text-sm mb-6">
                  Enter your details below and we'll send it straight to your inbox
                </p>
              </div>
              <LeadForm
                leadMagnet="Event Planning Checklist"
                buttonText="Send Me The Checklist →"
                showEventType={true}
                showEventDate={false}
                showBudget={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <Benefits
        title="What's Inside The Checklist?"
        subtitle="Everything you need to plan your perfect event, organized in a simple, easy-to-follow format"
        benefits={benefits}
      />

      {/* Preview Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white mb-4">
            A Peek Inside Your Checklist
          </h2>
          <div className="gold-divider mb-12"></div>

          <div className="luxury-card p-8 md:p-12 text-left">
            <div className="space-y-8">
              {[
                { phase: "12+ Months Before", tasks: ["Set your budget", "Create guest list", "Research venues", "Book venue"] },
                { phase: "6 Months Before", tasks: ["Book caterer", "Hire photographer", "Send save-the-dates", "Choose décor theme"] },
                { phase: "1 Month Before", tasks: ["Final headcount", "Confirm vendors", "Create seating chart", "Rehearsal dinner"] },
                { phase: "Day Of", tasks: ["Vendor arrival check", "Setup walkthrough", "Guest arrival", "Enjoy your event!"] },
              ].map((section, index) => (
                <div key={index} className="border-b border-purple-500/10 last:border-0 pb-8 last:pb-0">
                  <h3 className="text-lg font-semibold text-emily-gold mb-4">{section.phase}</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {section.tasks.map((task, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-300">
                        <div className="w-5 h-5 rounded border border-purple-500/30 flex items-center justify-center">
                          <div className="w-3 h-3 rounded-sm bg-purple-500/50" />
                        </div>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <SocialProof />

      {/* Final CTA */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="luxury-card p-12">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white mb-4">
              Ready to Plan Your Perfect Event?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join 10,000+ event planners who've already downloaded our checklist
            </p>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-gold-gradient inline-block text-lg"
            >
              Get My Free Checklist Now →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
