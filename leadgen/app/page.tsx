import Link from 'next/link'

export default function RootPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-white mb-6">
          Emily Experience
          <span className="block bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300 bg-clip-text text-transparent">
            Lead Generation Platform
          </span>
        </h1>
        
        <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
          Complete lead capture, scoring, email automation, and consultation booking system
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Link
            href="/leadgen/checklist"
            className="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-bold rounded-lg hover:from-amber-300 hover:to-amber-400 transition-all duration-300 shadow-lg"
          >
            Event Planning Checklist →
          </Link>
          
          <Link
            href="/leadgen/calculator"
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold rounded-lg hover:from-purple-400 hover:to-purple-500 transition-all duration-300 shadow-lg"
          >
            Budget Calculator →
          </Link>
          
          <Link
            href="/leadgen/guide"
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg hover:from-blue-400 hover:to-blue-500 transition-all duration-300 shadow-lg"
          >
            Vendor Selection Guide →
          </Link>
          
          <Link
            href="/leadgen/consultation"
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-lg hover:from-green-400 hover:to-green-500 transition-all duration-300 shadow-lg"
          >
            Free Consultation →
          </Link>
        </div>

        <Link
          href="/leadgen/dashboard"
          className="inline-flex px-6 py-3 bg-slate-700 text-slate-200 font-semibold rounded-lg hover:bg-slate-600 transition-all"
        >
          Dashboard (Admin)
        </Link>

        <p className="text-slate-400 text-sm mt-12">
          ✅ API endpoints • ✅ Email automation • ✅ Lead scoring • ✅ Analytics
        </p>
      </div>
    </div>
  )
}
