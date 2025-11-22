'use client'

import AdaptivePageWrapper from '@/components/AdaptivePageWrapper'
import { useAdaptiveUI } from '@/components/AdaptiveUIProvider'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface BlogPost {
  slug: string
  frontmatter: {
    title: string
    date: string
    excerpt: string
    category?: string
  }
}

export default function Blog() {
  const { getFeatureOrder, trackInteraction } = useAdaptiveUI()
  const [readPosts, setReadPosts] = useState<string[]>([])
  
  // Agency-focused blog posts
  const posts: BlogPost[] = [
    {
      slug: 'web-design-trends-2025',
      frontmatter: {
        title: 'Web Design Trends 2025: What Every Agency Should Know',
        date: '2025-01-15',
        excerpt: 'Discover the latest web design trends shaping 2025, from organic shapes to experimental navigation. Learn how to stay ahead in the digital landscape.',
        category: 'Design',
      },
    },
    {
      slug: 'agency-best-practices',
      frontmatter: {
        title: 'Best Practices for Modern Digital Agencies',
        date: '2025-01-10',
        excerpt: 'Essential strategies and practices that successful digital agencies use to deliver exceptional results and build lasting client relationships.',
        category: 'Agency',
      },
    },
    {
      slug: 'sustainable-web-design',
      frontmatter: {
        title: 'Sustainable Web Design 2.0: Building Eco-Friendly Websites',
        date: '2025-01-05',
        excerpt: 'Learn how to create environmentally friendly websites through optimized code, efficient hosting, and conscious design choices that reduce carbon footprint.',
        category: 'Sustainability',
      },
    },
    {
      slug: 'client-success-stories',
      frontmatter: {
        title: 'Client Success Stories: Transformative Digital Projects',
        date: '2024-12-28',
        excerpt: 'Real stories from our clients about how ChainCraft Agency transformed their businesses through innovative digital solutions.',
        category: 'Case Studies',
      },
    },
    {
      slug: 'ui-ux-fundamentals',
      frontmatter: {
        title: 'UI/UX Fundamentals for Exceptional User Experiences',
        date: '2024-12-20',
        excerpt: 'Master the fundamentals of UI/UX design and learn how to create intuitive, beautiful interfaces that delight users and drive conversions.',
        category: 'UX Design',
      },
    },
    {
      slug: 'digital-marketing-2025',
        frontmatter: {
        title: 'Digital Marketing Strategies for 2025',
        date: '2024-12-15',
        excerpt: 'Explore the latest digital marketing strategies, tools, and tactics that will dominate 2025 and help you achieve exceptional ROI.',
        category: 'Marketing',
      },
    },
  ]

  // Load read posts from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('chaincraft-read-posts')
    if (saved) {
      try {
        setReadPosts(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load read posts:', e)
      }
    }
  }, [])

  // AI-driven: Reorder posts - unread first
  const postSlugs = posts.map(p => p.slug)
  const orderedSlugs = getFeatureOrder(postSlugs.filter(slug => !readPosts.includes(slug)))
  const readSlugs = postSlugs.filter(slug => readPosts.includes(slug))
  const finalOrder = [...orderedSlugs, ...readSlugs]
  
  const orderedPosts = finalOrder.map(slug => posts.find(p => p.slug === slug)!).filter(Boolean)

  const handlePostRead = (slug: string) => {
    if (!readPosts.includes(slug)) {
      const newReadPosts = [...readPosts, slug]
      setReadPosts(newReadPosts)
      localStorage.setItem('chaincraft-read-posts', JSON.stringify(newReadPosts))
      trackInteraction(`blog-read-${slug}`)
    }
  }

  // Category colors
  const categoryColors: Record<string, { bg: string; text: string; gradient: string }> = {
    'Design': { bg: 'bg-amber-50', text: 'text-amber-900', gradient: 'from-amber-500 to-orange-600' },
    'Agency': { bg: 'bg-orange-50', text: 'text-orange-900', gradient: 'from-orange-500 to-rose-600' },
    'Sustainability': { bg: 'bg-green-50', text: 'text-green-900', gradient: 'from-green-500 to-emerald-600' },
    'Case Studies': { bg: 'bg-rose-50', text: 'text-rose-900', gradient: 'from-rose-500 to-pink-600' },
    'UX Design': { bg: 'bg-blue-50', text: 'text-blue-900', gradient: 'from-blue-500 to-indigo-600' },
    'Marketing': { bg: 'bg-purple-50', text: 'text-purple-900', gradient: 'from-purple-500 to-pink-600' },
  }


  return (
    <AdaptivePageWrapper pageType="blog">
      {/* Hero Section - Text-Only Hero */}
      <section className="relative py-32 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 overflow-hidden">
        {/* Organic Shapes Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-amber-200/30 to-orange-300/30 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-rose-200/30 to-pink-300/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-5xl mx-auto space-y-8">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-amber-900 leading-tight">
              Our Blog
            </h1>
            <p className="text-2xl md:text-3xl text-amber-900/80 max-w-3xl mx-auto font-medium leading-relaxed">
              Insights, trends, and stories from our agency team
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid - Big Blocks with Vivid Contrast (Trend #6) */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {orderedPosts.length === 0 ? (
            <div className="text-center py-32">
              <div className="text-8xl mb-8">📝</div>
              <h2 className="text-5xl font-black mb-6 text-amber-900">No Posts Yet</h2>
              <p className="text-2xl text-amber-900/70 font-medium">Check back soon for new content!</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-16">
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-amber-900 leading-tight mb-4">
                  Latest Articles
                </h2>
                <p className="text-xl text-amber-900/70 font-medium">
                  {orderedPosts.length} {orderedPosts.length !== 1 ? 'articles' : 'article'} available
                </p>
              </div>

              {/* Asymmetrical Grid - Big Blocks */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {orderedPosts.map((post, index) => {
                  const isRead = readPosts.includes(post.slug)
                  const category = post.frontmatter.category || 'Article'
                  const colors = categoryColors[category] || { bg: 'bg-gray-50', text: 'text-gray-900', gradient: 'from-gray-500 to-gray-600' }
                  const dateStr = String(post.frontmatter.date || '')

                  return (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      onClick={() => handlePostRead(post.slug)}
                      className="group block"
                    >
                      <article className={`relative overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-amber-300 ${
                        isRead ? 'opacity-75' : ''
                      }`}
                      style={{ minHeight: '600px' }}
                      >
                        {/* Gradient Background Only */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} ${isRead ? 'opacity-95' : 'opacity-90 group-hover:opacity-100'} transition-opacity`}></div>
                        {/* Organic Shape Overlay */}
                        <svg className="absolute bottom-0 left-0 w-full h-1/3 opacity-30" viewBox="0 0 400 200" preserveAspectRatio="none">
                          <path d="M0,200 Q100,100 200,150 T400,100 L400,200 Z" fill="rgba(255, 255, 255, 0.1)" className="organic-shape"/>
                        </svg>
                        
                        {/* Content */}
                        <div className="relative h-full p-8 md:p-10 flex flex-col justify-between text-white min-h-[600px]">
                          <div className="space-y-6">
                            <div className="flex items-center gap-3">
                              <span className={`px-4 py-2 ${colors.bg} ${colors.text} rounded-xl text-sm font-black border-2 border-white/30 backdrop-blur-sm`}>
                                {category}
                              </span>
                              {isRead && (
                                <span className="px-4 py-2 bg-green-500/80 backdrop-blur-sm text-white rounded-xl text-sm font-black border-2 border-white/30">
                                  ✓ Read
                                </span>
                              )}
                            </div>
                            
                            <div className="text-amber-200 font-semibold text-sm">
                              {new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </div>
                            
                            <h2 className="text-3xl md:text-4xl font-black leading-tight line-clamp-2">
                              {post.frontmatter.title}
                            </h2>
                            
                            <p className="text-lg md:text-xl font-medium leading-relaxed line-clamp-3 opacity-95">
                              {post.frontmatter.excerpt}
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-3 text-lg font-bold mt-auto pt-6 group-hover:translate-x-4 transition-transform duration-300">
                            {isRead ? 'Re-read Article' : 'Read Article'}
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </div>
                      </div>
                    </article>
                  </Link>
                  )
                })}
                </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-amber-600 via-orange-600 to-rose-600 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-amber-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-full bg-rose-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-10">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
              Ready to Work With Us?
            </h2>
            <p className="text-2xl text-white/90 max-w-2xl mx-auto font-medium">
              Let's create something extraordinary together. Get in touch to discuss your next project.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Link
                href="/contact"
                className="px-12 py-6 bg-white text-amber-900 rounded-2xl font-black text-xl hover:bg-amber-50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white/50"
                style={{ minHeight: '64px' }}
              >
                Contact Us
              </Link>
              <Link
                href="/portfolio"
                className="px-12 py-6 bg-transparent text-white rounded-2xl font-black text-xl border-4 border-white hover:bg-white/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white/50"
                style={{ minHeight: '64px', borderWidth: '4px' }}
              >
                View Portfolio
              </Link>
            </div>
          </div>
    </div>
      </section>
    </AdaptivePageWrapper>
  )
}
