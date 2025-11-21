import { Metadata } from 'next'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Latest insights and updates from InnovateX',
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
    <div className="pt-20 min-h-screen">
      <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-5xl font-bold text-center mb-6">Our Blog</h1>
          </div>
          <div>
            <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Latest insights, tips, and updates from our team
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div>
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">No blog posts yet. Check back soon!</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <div>
                  <Link href={`/blog/${post.slug}`}>
                    <article
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
                    >
                      <div className="p-6">
                        <h2 className="text-2xl font-semibold mb-2">{post.frontmatter.title}</h2>
                        <p className="text-sm text-gray-500 mb-4">{post.frontmatter.date instanceof Date ? post.frontmatter.date.toLocaleDateString() : String(post.frontmatter.date || '')}</p>
                        <p className="text-gray-600 dark:text-gray-400">{post.frontmatter.excerpt}</p>
                      </div>
                    </article>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

