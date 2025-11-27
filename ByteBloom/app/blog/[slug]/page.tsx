import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

interface PageProps {
  params: {
    slug: string
  }
}

interface BlogFrontmatter {
  title: string
  date: string
  excerpt: string
}

interface BlogPost {
  slug: string
  frontmatter: BlogFrontmatter
  content: string
}

function getBlogPost(slug: string): BlogPost | null {
  const blogDirectory = path.join(process.cwd(), 'content/blog')
  const filePath = path.join(blogDirectory, `${slug}.md`)
  
  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  const processedContent = remark().use(html).processSync(content)
  const contentHtml = processedContent.toString()

  // Ensure date is always a string for rendering
  const dateValue = data.date instanceof Date 
    ? data.date.toISOString().split('T')[0] 
    : String(data.date || '')

  const frontmatter: BlogFrontmatter = {
    title: typeof data.title === 'string' ? data.title : '',
    excerpt: typeof data.excerpt === 'string' ? data.excerpt : '',
    date: dateValue,
  }

  return {
    slug,
    frontmatter,
    content: contentHtml,
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getBlogPost(params.slug)
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
  }
}

export default function BlogPost({ params }: PageProps) {
  const post = getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="pt-20 min-h-screen">
      <article className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div>
            <h1 className="text-5xl font-bold mb-6">{post.frontmatter.title}</h1>
          </div>
          <div>
            <p className="text-gray-500 mb-8">{post.frontmatter.date}</p>
          </div>
          <div>
            <div
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </article>
    </div>
  )
}

