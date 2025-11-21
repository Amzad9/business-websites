import { Metadata } from 'next'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export const metadata: Metadata = {
  title: 'Blog - ByteBloom | Latest Insights and Updates',
  description: 'Latest insights, tips, and updates from ByteBloom. Stay informed about digital trends, web design, and technology.',
}

interface BlogPost {
  slug: string
  frontmatter: {
    title: string
    date: string
    excerpt: string
  }
}

function getBlogPosts(): BlogPost[] {
  const blogDirectory = path.join(process.cwd(), 'content/blog')
  if (!fs.existsSync(blogDirectory)) {
    return []
  }
  const files = fs.readdirSync(blogDirectory)
  const posts = files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const filePath = path.join(blogDirectory, file)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)
      // Ensure date is always a string for rendering
      const dateValue = data.date instanceof Date 
        ? data.date.toISOString().split('T')[0] 
        : String(data.date || '')
      return {
        slug: file.replace('.md', ''),
        frontmatter: {
          ...data,
          date: dateValue,
        } as BlogPost['frontmatter'],
      }
    })
  return posts.sort((a, b) => 
    new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  )
}

export default function Blog() {
  const posts = getBlogPosts()

  return (
    <>
      {/* Hero Section - 2026 Trend: Bold, Dark Background */}
      <section className="pt-24 pb-20 min-h-[70vh] relative overflow-hidden flex items-center bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white">
        {/* Animated Geometric Shapes - 2026 Trend */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 border-4 border-blue-400/20 rotate-45 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 border-4 border-cyan-400/20 rotate-12 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-64 h-64 border-4 border-indigo-400/20 rotate-45 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50 w-full">
          <div>
            <h1 className="text-5xl md:text-9xl font-black mb-8 leading-tight text-white">
              BLOG
            </h1>
            
            <p className="text-lg md:text-3xl text-white font-bold leading-relaxed max-w-4xl">
              Latest insights, tips, and updates from our team. Stay informed about digital trends, web design, and cutting-edge technology.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid - 2026 Trend: Brutalist Cards */}
      <section className="py-32 bg-white relative overflow-hidden border-y-4 border-gray-900">
        {/* Background Pattern - 2026 Trend */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='none'/%3E%3Cpath d='M20 20h60v60H20z' stroke='%23000' stroke-width='2'/%3E%3Cpath d='M40 40h20v20H40z' fill='%23000'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-block px-8 py-4 bg-gray-900 text-white rounded-none border-4 border-gray-900 mb-6">
                <p className="text-2xl font-black uppercase tracking-widest">No Posts Yet</p>
              </div>
              <p className="text-xl text-gray-700 font-bold">Check back soon for updates!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => {
                const dateStr = post.frontmatter.date instanceof Date 
                  ? post.frontmatter.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                  : String(post.frontmatter.date || '')
                
                return (
                  <Link 
                    key={post.slug} 
                    href={`/blog/${post.slug}`}
                    className="group block"
                  >
                    <article className="bg-white border-4 border-gray-900 rounded-none overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                      {/* Image/Visual Area */}
                      <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-blue-600 via-cyan-500 to-indigo-600 flex-shrink-0">
                        {(() => {
                          // Unsplash images for blog posts
                          const blogImages = [
                            'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=450&fit=crop&q=80',
                            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=450&fit=crop&q=80',
                            'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=450&fit=crop&q=80',
                            'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=450&fit=crop&q=80',
                            'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=450&fit=crop&q=80',
                            'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&h=450&fit=crop&q=80',
                          ]
                          const imageUrl = blogImages[index % blogImages.length]
                          return (
                            <img
                              src={imageUrl}
                              alt={post.frontmatter.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                          )
                        })()}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                        <div className="absolute top-4 right-4">
                          <span className="px-4 py-2 bg-white text-gray-900 rounded-none text-xs font-black uppercase tracking-widest border-2 border-gray-900">
                            Blog
                          </span>
                        </div>
                        {/* Date Badge */}
                        <div className="absolute bottom-4 left-4">
                          <span className="px-4 py-2 bg-gray-900 text-white rounded-none text-xs font-black uppercase tracking-widest border-2 border-white">
                            {dateStr}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8 flex-grow flex flex-col">
                        <h2 className="text-xl md:text-3xl font-black text-gray-900 mb-4 uppercase tracking-tight leading-tight">
                          {post.frontmatter.title}
                        </h2>
                        <p className="text-gray-700 font-semibold leading-relaxed mb-6 flex-grow">
                          {post.frontmatter.excerpt}
                        </p>
                        
                        {/* Read More Link - Brutalist Style */}
                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-900 text-white rounded-none font-black text-sm uppercase tracking-widest border-2 border-gray-900 group-hover:bg-blue-600 group-hover:border-blue-600 transform group-hover:scale-105 transition-all duration-300 w-fit mt-auto">
                          Read More
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                      </div>
                    </article>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section - 2026 Trend */}
      <section className="py-32 bg-gradient-to-br from-blue-600 via-cyan-500 to-indigo-600 text-white relative overflow-hidden border-t-4 border-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-2xl md:text-7xl font-black mb-8 uppercase tracking-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
                Stay Updated
              </span>
            </h2>
            <p className="text-lg md:text-3xl text-white/90 font-bold mb-12 leading-relaxed">
              Follow our blog for the latest insights and digital trends
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-4 px-12 py-6 bg-white text-blue-600 rounded-2xl font-black text-xl shadow-2xl hover:shadow-white/50 transform hover:scale-110 transition-all duration-300"
            >
              Get In Touch
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
