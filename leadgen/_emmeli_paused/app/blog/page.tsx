'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Clock, Tag } from 'lucide-react'

const posts = [
  {
    id: 1,
    slug: 'how-to-plan-your-dream-wedding',
    category: 'Planning Tips',
    title: '10 Essential Steps to Planning Your Dream Wedding',
    excerpt: 'From setting your budget to choosing the right vendors, we walk you through every milestone you need to nail before the big day arrives.',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=500&fit=crop',
    author: 'Melisa Ogedegbe',
    date: 'March 15, 2025',
    readTime: '8 min read',
    featured: true,
  },
  {
    id: 2,
    slug: 'rental-items-that-transform-venues',
    category: 'Rentals & Decor',
    title: 'The 12 Rental Items That Instantly Transform Any Venue',
    excerpt: 'You do not need a six-figure budget to create a jaw-dropping space. These curated rental pieces do the heavy lifting for you.',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&h=500&fit=crop',
    author: 'Emmanuel Ogedegbe',
    date: 'February 28, 2025',
    readTime: '6 min read',
    featured: true,
  },
  {
    id: 3,
    slug: 'corporate-event-cleaning-checklist',
    category: 'Cleaning & Logistics',
    title: 'The Ultimate Corporate Event Cleaning Checklist',
    excerpt: 'Before, during, and after — here is everything your cleaning team should cover so your event space remains pristine from start to finish.',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=500&fit=crop',
    author: 'Emmeli Experience Team',
    date: 'February 10, 2025',
    readTime: '5 min read',
    featured: false,
  },
  {
    id: 4,
    slug: 'nj-wedding-venue-guide-2025',
    category: 'Venue Guides',
    title: "New Jersey's Most Stunning Wedding Venues in 2025",
    excerpt: 'From rolling vineyard estates in Hunterdon County to glamorous ballrooms in Morristown — our definitive guide to NJ venues this season.',
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=500&fit=crop',
    author: 'Melisa Ogedegbe',
    date: 'January 22, 2025',
    readTime: '10 min read',
    featured: false,
  },
  {
    id: 5,
    slug: 'floral-trends-2025',
    category: 'Design Trends',
    title: 'Floral Trends Dominating Events in 2025',
    excerpt: "Oversized arrangements, dried botanicals, and unexpected colours — here's what is trending in event florals and how to make it work for your celebration.",
    image: 'https://images.unsplash.com/photo-1487530811015-780c6c8cf2c1?w=800&h=500&fit=crop',
    author: 'Emmanuel Ogedegbe',
    date: 'January 8, 2025',
    readTime: '7 min read',
    featured: false,
  },
  {
    id: 6,
    slug: 'destination-wedding-planning-guide',
    category: 'Destination Events',
    title: 'How to Plan a Destination Wedding Without the Stress',
    excerpt: 'International events come with unique challenges — visas, time zones, currency, vendor sourcing. We break it all down so you can focus on the joy.',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=500&fit=crop',
    author: 'Melisa Ogedegbe',
    date: 'December 18, 2024',
    readTime: '9 min read',
    featured: false,
  },
]

const categories = ['All', 'Planning Tips', 'Rentals & Decor', 'Cleaning & Logistics', 'Venue Guides', 'Design Trends', 'Destination Events']

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All' ? posts : posts.filter(p => p.category === activeCategory)
  const featuredPosts = filtered.filter(p => p.featured)
  const regularPosts = filtered.filter(p => !p.featured)

  return (
    <div>
      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '55vh', background: '#1C1610', paddingTop: 'calc(76px + 6rem)', paddingBottom: '6rem', paddingLeft: 'clamp(1.5rem, 6vw, 7rem)', paddingRight: 'clamp(1.5rem, 6vw, 7rem)' }}>
        <img
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920&h=800&fit=crop"
          alt="Elegant event inspiration"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.18 }}
        />
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 760 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <div style={{ width: 40, height: 1, background: '#C9A84C' }} />
            <span style={{ fontFamily: 'var(--font-sans)', color: '#C9A84C', fontSize: '0.6rem', letterSpacing: '0.4em', textTransform: 'uppercase' }}>Our Journal</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', color: '#FFFDF7', fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1.05, fontWeight: 400, marginBottom: '1.75rem' }}>
            The Emmeli<br /><em style={{ color: '#C9A84C' }}>Experience Blog</em>
          </h1>
          <p style={{ color: '#B5AFA8', fontFamily: 'var(--font-sans)', fontWeight: 300, lineHeight: 1.9, fontSize: '1rem', maxWidth: 500 }}>
            Planning tips, design inspiration, venue guides, and behind-the-scenes stories from Mr &amp; Mrs Ogedegbe and the team.
          </p>
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <div style={{ background: '#FFFDF7', borderBottom: '1px solid #E2D9CC', padding: '1.25rem clamp(1.5rem, 6vw, 7rem)', position: 'sticky', top: 76, zIndex: 40 }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                fontFamily: 'var(--font-sans)', fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase',
                padding: '0.45rem 1rem', border: '1px solid', cursor: 'pointer', transition: 'all 0.25s',
                background: activeCategory === cat ? '#2C2C2C' : 'transparent',
                borderColor: activeCategory === cat ? '#2C2C2C' : '#E2D9CC',
                color: activeCategory === cat ? '#FFFDF7' : '#7A7068',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* POSTS */}
      <section style={{ background: '#FAF6EF', paddingTop: '5rem', paddingBottom: '7rem', paddingLeft: 'clamp(1.5rem, 6vw, 7rem)', paddingRight: 'clamp(1.5rem, 6vw, 7rem)' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto' }}>

          {/* Featured */}
          {featuredPosts.length > 0 && (
            <div style={{ marginBottom: '4rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                <div style={{ width: 32, height: 1, background: '#C9A84C' }} />
                <span style={{ fontFamily: 'var(--font-sans)', color: '#C9A84C', fontSize: '0.58rem', letterSpacing: '0.35em', textTransform: 'uppercase' }}>Featured</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
                {featuredPosts.map(post => (
                  <article key={post.id} style={{ background: '#FFFDF7', border: '1px solid #E2D9CC', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ overflow: 'hidden', height: 260 }}>
                      <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', display: 'block' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)' }}
                      />
                    </div>
                    <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#F5E6C8', color: '#9B7A2F', fontFamily: 'var(--font-sans)', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '0.25rem 0.65rem' }}>
                          <Tag size={9} /> {post.category}
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: '#B5AFA8', fontFamily: 'var(--font-sans)', fontSize: '0.72rem' }}>
                          <Clock size={11} /> {post.readTime}
                        </span>
                      </div>
                      <h2 style={{ fontFamily: 'var(--font-serif)', color: '#2C2C2C', fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', fontWeight: 400, lineHeight: 1.3, marginBottom: '0.875rem' }}>
                        {post.title}
                      </h2>
                      <p style={{ fontFamily: 'var(--font-sans)', color: '#7A7068', fontWeight: 300, lineHeight: 1.8, fontSize: '0.87rem', flex: 1, marginBottom: '1.5rem' }}>
                        {post.excerpt}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1.25rem', borderTop: '1px solid #E2D9CC' }}>
                        <div>
                          <div style={{ fontFamily: 'var(--font-sans)', color: '#2C2C2C', fontSize: '0.78rem', fontWeight: 400 }}>{post.author}</div>
                          <div style={{ fontFamily: 'var(--font-sans)', color: '#B5AFA8', fontSize: '0.7rem' }}>{post.date}</div>
                        </div>
                        <Link href={`/blog/${post.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#C9A84C', fontFamily: 'var(--font-sans)', fontSize: '0.63rem', letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none' }}>
                          Read More <ArrowRight size={12} />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* Regular posts */}
          {regularPosts.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                <div style={{ width: 32, height: 1, background: '#C9A84C' }} />
                <span style={{ fontFamily: 'var(--font-sans)', color: '#C9A84C', fontSize: '0.58rem', letterSpacing: '0.35em', textTransform: 'uppercase' }}>All Articles</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {regularPosts.map(post => (
                  <article key={post.id} style={{ background: '#FFFDF7', border: '1px solid #E2D9CC', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ overflow: 'hidden', height: 200 }}>
                      <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', display: 'block' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)' }}
                      />
                    </div>
                    <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.875rem' }}>
                        <span style={{ background: '#F5E6C8', color: '#9B7A2F', fontFamily: 'var(--font-sans)', fontSize: '0.52rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '0.2rem 0.5rem' }}>
                          {post.category}
                        </span>
                        <span style={{ color: '#B5AFA8', fontFamily: 'var(--font-sans)', fontSize: '0.7rem' }}>{post.readTime}</span>
                      </div>
                      <h3 style={{ fontFamily: 'var(--font-serif)', color: '#2C2C2C', fontSize: '1.1rem', fontWeight: 400, lineHeight: 1.3, marginBottom: '0.75rem' }}>
                        {post.title}
                      </h3>
                      <p style={{ fontFamily: 'var(--font-sans)', color: '#7A7068', fontWeight: 300, lineHeight: 1.75, fontSize: '0.82rem', flex: 1, marginBottom: '1.25rem' }}>
                        {post.excerpt}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid #E2D9CC' }}>
                        <span style={{ fontFamily: 'var(--font-sans)', color: '#B5AFA8', fontSize: '0.7rem' }}>{post.date}</span>
                        <Link href={`/blog/${post.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#C9A84C', fontFamily: 'var(--font-sans)', fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none' }}>
                          Read <ArrowRight size={11} />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '5rem 2rem' }}>
              <p style={{ fontFamily: 'var(--font-sans)', color: '#B5AFA8', fontSize: '0.87rem' }}>No posts found in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section style={{ background: '#2C2C2C', padding: '6rem clamp(1.5rem, 6vw, 7rem)', textAlign: 'center' }}>
        <div style={{ maxWidth: 580, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ height: 1, width: 40, background: '#C9A84C' }} />
            <span style={{ fontFamily: 'var(--font-sans)', color: '#C9A84C', fontSize: '0.6rem', letterSpacing: '0.4em', textTransform: 'uppercase' }}>Stay Inspired</span>
            <div style={{ height: 1, width: 40, background: '#C9A84C' }} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', color: '#F5E6C8', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 400, lineHeight: 1.2, marginBottom: '1rem' }}>
            Get Event Tips Delivered<br /><em style={{ color: '#C9A84C' }}>to Your Inbox</em>
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', color: '#B5AFA8', fontWeight: 300, lineHeight: 1.9, fontSize: '0.87rem', marginBottom: '2rem' }}>
            Subscribe to the Emmeli Experience journal for planning guides, venue spotlights, and exclusive event inspiration.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', maxWidth: 440, margin: '0 auto', flexWrap: 'wrap' }}>
            <input type="email" placeholder="Your email address" style={{ flex: 1, minWidth: 200, background: 'rgba(255,253,247,0.08)', border: '1px solid rgba(226,217,204,0.3)', padding: '0.9rem 1.1rem', color: '#F5E6C8', fontFamily: 'var(--font-sans)', fontSize: '0.87rem', fontWeight: 300, outline: 'none' }} />
            <button style={{ background: '#C9A84C', color: '#1C1610', fontFamily: 'var(--font-sans)', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '0.9rem 1.75rem', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
