'use client'

import Link from 'next/link'
import { ArrowLeft, Clock, Tag, User, Calendar } from 'lucide-react'
import { useParams } from 'next/navigation'

const posts: Record<string, {
  category: string; title: string; author: string; date: string;
  readTime: string; image: string; body: { heading?: string; text: string }[]
}> = {
  'how-to-plan-your-dream-wedding': {
    category: 'Planning Tips',
    title: '10 Essential Steps to Planning Your Dream Wedding',
    author: 'Melisa Ogedegbe',
    date: 'March 15, 2025',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1400&h=600&fit=crop',
    body: [
      { text: 'Planning a wedding is one of the most exciting and intricate projects you will ever take on. At Emmeli Experience, Mr & Mrs Ogedegbe and the team have guided over 200 couples through every milestone — here are the 10 steps we recommend to every client.' },
      { heading: '1. Set Your Budget First', text: 'Before you fall in love with a venue or a floral concept, establish your total budget. Break it into categories — venue, catering, flowers, photography, music, attire, and a 10% contingency buffer. Everything else flows from this number.' },
      { heading: '2. Define Your Vision', text: 'Are you dreaming of an intimate garden ceremony or a grand ballroom affair? Gather images, colours, and textures that speak to you. A mood board is the single most useful tool in the early stages of planning.' },
      { heading: '3. Choose Your Date', text: 'Popular venues in New Jersey book 12–18 months in advance. Saturdays in May, June, September, and October go first. If flexibility is possible, a Friday or Sunday wedding can unlock significant savings.' },
      { heading: '4. Select Your Venue', text: 'Your venue sets the tone for everything — catering, decor, guest capacity, and logistics all follow from this choice. Visit at least three venues before committing, and always ask about exclusive vendor lists.' },
      { heading: '5. Build Your Vendor Team', text: 'Photographer, caterer, florist, DJ or band, officiant, hair and makeup — each requires careful vetting. Ask for references, review portfolios, and ensure their style aligns with your vision before signing.' },
      { heading: '6. Send Save the Dates', text: 'Send save-the-dates 8–12 months before the wedding for local events, and 12+ months for destination celebrations. This gives guests time to arrange travel and accommodation.' },
      { heading: '7. Design Your Decor', text: 'Work with your planner and florist to create a cohesive design language — colour palette, floral style, linen, lighting, and stationery should all tell the same story.' },
      { heading: '8. Send Formal Invitations', text: 'Invitations should go out 6–8 weeks before the wedding. Include RSVP details, meal choices if applicable, accommodation suggestions, and a wedding website link.' },
      { heading: '9. Confirm All Vendors', text: 'Three weeks before the wedding, confirm every vendor with a detailed timeline. Share the run-of-show, key contact numbers, and venue logistics with everyone involved.' },
      { heading: '10. Trust Your Planner', text: 'On the day itself, hand over control completely. Your job is to be present, joyful, and in love. Let the Emmeli Experience team handle every detail so you can live the moment you have been planning for.' },
    ],
  },
  'rental-items-that-transform-venues': {
    category: 'Rentals & Decor',
    title: 'The 12 Rental Items That Instantly Transform Any Venue',
    author: 'Emmanuel Ogedegbe',
    date: 'February 28, 2025',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1400&h=600&fit=crop',
    body: [
      { text: 'You do not need an unlimited budget to create a jaw-dropping event space. With the right rental pieces, even a plain venue can be transformed into something breathtaking. Here are the 12 items our rental team recommends most.' },
      { heading: 'Chiavari Chairs', text: 'Nothing elevates a reception more instantly than swapping plastic banquet chairs for elegant Chiavari chairs in gold, silver, or white. They photograph beautifully and create a sense of luxury at a fraction of the cost of custom furniture.' },
      { heading: 'Linen & Table Overlays', text: 'Floor-length linens in silk, velvet, or sequin transform basic folding tables into statement centrepieces. Layer different textures for a rich, editorial look.' },
      { heading: 'Floral Arches & Backdrops', text: 'A custom floral arch behind the ceremony or sweetheart table creates an instant focal point. Our rental team offers pre-made and custom structures in metal, bamboo, and acrylic.' },
      { heading: 'Edison String Lights', text: 'Warm Edison bulb canopies draped across a reception ceiling or garden space create an intimate, magical atmosphere after dark. One of our most-requested rental items.' },
      { heading: 'Lounge Furniture Sets', text: 'Cocktail-hour lounge areas with velvet sofas, coffee tables, and vintage rugs create social pockets that encourage conversation and make for stunning photography moments.' },
      { heading: 'Ghost Chairs & Acrylic Pieces', text: 'Transparent acrylic furniture adds modern elegance without visual clutter. Ghost chairs work in virtually any design scheme, from rustic to ultra-modern.' },
      { heading: 'Cake & Dessert Stands', text: 'A layered display of mixed-height cake stands, cheese boards, and lanterns transforms a simple dessert table into a styled installation. We carry over 200 stand styles.' },
      { heading: 'Draping & Ceiling Treatments', text: 'Fabric draping along walls or ceilings softens hard venue lines and adds a sense of intimacy to large ballrooms. Chiffon, tulle, and velvet are our most-rented options.' },
      { heading: 'Charger Plates', text: 'Gold, silver, or mirror charger plates beneath dinner settings elevate every table instantly. A small detail with an outsized visual impact.' },
      { heading: 'Candle Holders & Votives', text: 'Layering pillar candles, taper holders, and scattered votives across tables creates warmth and depth. We carry hurricane lanterns, geometric holders, and vintage candelabras.' },
      { heading: 'Dance Floor Overlays', text: 'A custom monogram, floral, or geometric vinyl dance floor overlay turns a plain parquet surface into a personalised design statement.' },
      { heading: 'Photo Booth Props & Structures', text: 'A branded neon sign, flower wall, or styled photo booth corner creates a memorable guest experience and generates shareable content organically.' },
    ],
  },
  'corporate-event-cleaning-checklist': {
    category: 'Cleaning & Logistics',
    title: 'The Ultimate Corporate Event Cleaning Checklist',
    author: 'Emmeli Experience Team',
    date: 'February 10, 2025',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1400&h=600&fit=crop',
    body: [
      { text: 'A spotless venue is the foundation of a professional event. Whether you are hosting a corporate conference, product launch, or gala dinner, our cleaning team covers three distinct phases to ensure an impeccable environment from start to finish.' },
      { heading: 'Phase 1: Pre-Event Setup Cleaning', text: 'Before guests arrive, every surface must be flawlessly prepared. This includes deep-vacuuming all carpeted areas, polishing hard floors to a streak-free finish, sanitising all touchpoints (door handles, AV equipment, podiums), cleaning restrooms to hospitality standards, and wiping all tables, chairs, and staging surfaces.' },
      { heading: 'Phase 2: During-Event Maintenance', text: 'Our discrete during-event team circulates throughout the event, clearing used crockery and glassware, restocking restroom consumables every 45 minutes, managing waste stations and recycling, spot-cleaning spills immediately, and maintaining a tidy catering and serving area.' },
      { heading: 'Phase 3: Post-Event Breakdown & Deep Clean', text: 'After guests depart, our full breakdown team handles removal of all rental items and rubbish, deep cleaning of all food and beverage areas, floor restoration (vacuuming, mopping, polishing), restroom sanitisation and reset, and final venue inspection with a handover report to the venue manager.' },
      { heading: 'Corporate Office Cleaning Add-On', text: 'For multi-day corporate events, we offer an overnight office cleaning service covering workstations, conference rooms, reception areas, kitchens, and communal spaces — ensuring a fresh environment every morning.' },
      { heading: 'Why Professional Event Cleaning Matters', text: 'Venues increasingly require professional cleaning riders in their contracts. Our team is fully insured, trained in hospitality-grade standards, and experienced with NJ venue requirements. We handle everything so your event team can focus entirely on the experience.' },
    ],
  },
  'nj-wedding-venue-guide-2025': {
    category: 'Venue Guides',
    title: "New Jersey's Most Stunning Wedding Venues in 2025",
    author: 'Melisa Ogedegbe',
    date: 'January 22, 2025',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1400&h=600&fit=crop',
    body: [
      { text: "New Jersey is home to some of the most diverse and stunning wedding venues on the East Coast — from vineyard estates in Hunterdon County to glamorous ballrooms in Morristown. Here is the Emmeli Experience team's curated guide for 2025." },
      { heading: 'Natirar Mansion, Peapack-Gladstone', text: 'A 500-acre estate with a restored 19th-century mansion, walled garden, and sweeping countryside views. Perfect for romantic, editorial-style celebrations with an intimate guest count of up to 150.' },
      { heading: 'The Ryland Inn, Whitehouse Station', text: 'A restored 1796 farmhouse with multiple ceremony and reception spaces. The gardens, stone barn, and indoor ballroom provide versatile backdrops for any design aesthetic.' },
      { heading: 'Park Chateau Estate & Gardens, East Brunswick', text: 'A French chateau-inspired estate with manicured gardens, a grand staircase, and an elegant ballroom. Accommodates up to 350 guests and offers exclusive-use booking.' },
      { heading: 'The Manor, West Orange', text: 'A classic New Jersey institution with multiple indoor and outdoor event spaces, lush grounds, and exceptional in-house catering. Ideal for large, traditional celebrations.' },
      { heading: 'Liberty House, Jersey City', text: 'Set directly on the Hudson River waterfront with the Manhattan skyline as a backdrop, Liberty House is the premier choice for modern, cosmopolitan celebrations.' },
      { heading: 'Crossed Keys Inn, Andover', text: 'A charming boutique inn with a warm, vintage character. Ideal for intimate ceremonies of up to 100 guests who want a cosy, personal atmosphere with excellent food.' },
      { heading: 'Crystal Springs Resort, Hamburg', text: 'New Jersey\'s premier resort destination, with multiple ceremony sites across 3,000 acres of the Kittatinny Mountains. Offers on-site lodging for destination-style celebrations.' },
    ],
  },
  'floral-trends-2025': {
    category: 'Design Trends',
    title: 'Floral Trends Dominating Events in 2025',
    author: 'Emmanuel Ogedegbe',
    date: 'January 8, 2025',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1487530811015-780c6c8cf2c1?w=1400&h=600&fit=crop',
    body: [
      { text: 'Florals are the most emotionally immediate design element at any event. In 2025, we are seeing a dramatic shift away from structured, symmetrical arrangements toward organic, wild, and unexpected expressions. Here is what is defining the season.' },
      { heading: 'Oversized & Sculptural Installations', text: 'Large-scale floral installations — ceiling canopies, floor-to-ceiling arches, and suspended cloud arrangements — continue to dominate. The emphasis is on drama and immersion rather than table-by-table decoration.' },
      { heading: 'Dried & Preserved Botanicals', text: 'Pampas grass, dried protea, wheat, and preserved eucalyptus are increasingly integrated with fresh flowers. The textural contrast adds warmth and the arrangements remain beautiful long after the event.' },
      { heading: 'Unexpected Colour Palettes', text: 'Burnt terracotta, deep burgundy, burnt orange, and warm chocolate tones are replacing the pastel pinks and whites of recent years. These rich, earthy palettes photograph strikingly in golden-hour light.' },
      { heading: 'Foliage-Forward Designs', text: 'Rather than packing arrangements with blooms, 2025 sees florals that celebrate leaves, branches, vines, and greenery as statement elements in their own right. Less flower, more forest.' },
      { heading: 'Locally Sourced & Seasonal Flowers', text: 'Clients are increasingly prioritising locally grown, in-season flowers. Beyond the environmental benefit, locally sourced blooms are fresher, more fragrant, and support NJ\'s growing network of boutique flower farms.' },
      { heading: 'Unexpected Vessels & Containers', text: 'Centrepieces are moving away from standard vases into candlesticks, terracotta urns, aged bronze vessels, vintage books, and even fruit bowls. The container is part of the art.' },
    ],
  },
  'destination-wedding-planning-guide': {
    category: 'Destination Events',
    title: 'How to Plan a Destination Wedding Without the Stress',
    author: 'Melisa Ogedegbe',
    date: 'December 18, 2024',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1400&h=600&fit=crop',
    body: [
      { text: 'Destination weddings are among the most extraordinary celebrations we plan at Emmeli Experience. They require a different skill set, deeper logistics coordination, and longer lead times — but the results are unforgettable. Here is how we make it seamless for our clients.' },
      { heading: 'Start Planning 18–24 Months Out', text: 'Popular destination venues — particularly in Italy, France, the Caribbean, and Mexico — book years in advance. Begin your search at least 18 months before your target date, and be prepared to move quickly when you find the right property.' },
      { heading: 'Hire a Local Vendor Network', text: 'A destination planner connects you with vetted local caterers, florists, photographers, and officiants who know the venue, the logistics, and the legal requirements. Do not attempt to coordinate international vendors remotely without professional support.' },
      { heading: 'Understand Legal Requirements', text: 'Marriage licence requirements vary significantly by country. Some require weeks of residency; others have strict document apostille requirements. Always clarify legal requirements before committing to a location.' },
      { heading: 'Create a Guest Travel Hub', text: 'A dedicated wedding website with group flight suggestions, hotel room blocks, visa information, local transport options, and a detailed event schedule is essential. Your guests are investing significantly in attending — make it effortless for them.' },
      { heading: 'Plan a Welcome Event', text: 'A welcome dinner or cocktail evening the night before the wedding creates connection between guests who may not know each other and sets the tone for the celebration. It also provides a buffer if any travel delays occur.' },
      { heading: 'Build a Contingency Budget of 15%', text: 'International logistics, currency fluctuations, and import duties on shipped goods can create unexpected costs. We always recommend a 15% contingency buffer for destination events versus 10% for local ones.' },
      { heading: 'Trust the Process', text: 'Destination weddings require you to relinquish more control than local events simply because of the distance involved. The key is hiring professionals you deeply trust — and then trusting them completely. That is exactly what the Emmeli Experience team is here for.' },
    ],
  },
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params?.slug as string
  const post = posts[slug]

  if (!post) {
    return (
      <div style={{ minHeight: '100vh', background: '#FAF6EF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-sans)', color: '#C9A84C', fontSize: '0.6rem', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '1rem' }}>404</div>
          <h1 style={{ fontFamily: 'var(--font-serif)', color: '#2C2C2C', fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1rem', fontWeight: 400 }}>Post Not Found</h1>
          <p style={{ fontFamily: 'var(--font-sans)', color: '#7A7068', fontSize: '0.9rem', fontWeight: 300, marginBottom: '2rem' }}>This article does not exist or may have been moved.</p>
          <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#2C2C2C', color: '#FFFDF7', fontFamily: 'var(--font-sans)', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '0.9rem 2rem', textDecoration: 'none' }}>
            <ArrowLeft size={13} /> Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#FAF6EF' }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: 'clamp(320px, 50vh, 520px)', overflow: 'hidden' }}>
        <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,22,16,0.85) 40%, rgba(28,22,16,0.2) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(2rem, 6vw, 4rem)' }}>
          <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#C9A84C', fontFamily: 'var(--font-sans)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none', marginBottom: '1.5rem' }}>
            <ArrowLeft size={12} /> Back to Blog
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#C9A84C', color: '#1C1610', fontFamily: 'var(--font-sans)', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '0.3rem 0.75rem' }}>
              <Tag size={9} /> {post.category}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'rgba(245,230,200,0.7)', fontFamily: 'var(--font-sans)', fontSize: '0.72rem' }}>
              <Clock size={11} /> {post.readTime}
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', color: '#FFFDF7', fontSize: 'clamp(1.6rem, 4vw, 2.8rem)', lineHeight: 1.15, fontWeight: 400, maxWidth: 800 }}>
            {post.title}
          </h1>
        </div>
      </div>

      {/* Meta bar */}
      <div style={{ background: '#FFFDF7', borderBottom: '1px solid #E2D9CC', padding: '1.25rem clamp(1.5rem, 6vw, 7rem)' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#F5E6C8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={14} style={{ color: '#9B7A2F' }} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-sans)', color: '#2C2C2C', fontSize: '0.8rem', fontWeight: 400 }}>{post.author}</div>
              <div style={{ fontFamily: 'var(--font-sans)', color: '#B5AFA8', fontSize: '0.65rem', fontWeight: 300 }}>Emmeli Experience Team</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#7A7068' }}>
            <Calendar size={13} />
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', fontWeight: 300 }}>{post.date}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <article style={{ maxWidth: 820, margin: '0 auto', padding: '4rem clamp(1.5rem, 6vw, 3rem) 7rem' }}>
        {post.body.map((block, i) => (
          <div key={i} style={{ marginBottom: '2rem' }}>
            {block.heading && (
              <h2 style={{ fontFamily: 'var(--font-serif)', color: '#2C2C2C', fontSize: 'clamp(1.15rem, 2.5vw, 1.5rem)', fontWeight: 400, lineHeight: 1.3, marginBottom: '0.875rem', paddingTop: i === 0 ? 0 : '0.5rem' }}>
                {block.heading}
              </h2>
            )}
            <p style={{ fontFamily: 'var(--font-sans)', color: '#5C5248', fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.95 }}>
              {block.text}
            </p>
          </div>
        ))}

        {/* Author card */}
        <div style={{ borderTop: '1px solid #E2D9CC', marginTop: '3rem', paddingTop: '2.5rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, #9B7A2F, #C9A84C)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <User size={22} style={{ color: '#FFFDF7' }} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-sans)', color: '#C9A84C', fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Written by</div>
            <div style={{ fontFamily: 'var(--font-serif)', color: '#2C2C2C', fontSize: '1.1rem', marginBottom: '0.4rem' }}>{post.author}</div>
            <p style={{ fontFamily: 'var(--font-sans)', color: '#7A7068', fontSize: '0.82rem', fontWeight: 300, lineHeight: 1.7 }}>
              Co-founder of Emmeli Experience, passionate about crafting meaningful, beautifully executed celebrations for every client.
            </p>
          </div>
        </div>

        {/* Back CTA */}
        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#2C2C2C', color: '#FFFDF7', fontFamily: 'var(--font-sans)', fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', padding: '1rem 2.5rem', textDecoration: 'none' }}>
            <ArrowLeft size={12} /> Back to All Articles
          </Link>
        </div>
      </article>
    </div>
  )
}
