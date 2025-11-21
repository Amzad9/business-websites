import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import projectsData from '@/content/projects.json'

interface PageProps {
  params: {
    slug: string
  }
}

interface Project {
  slug: string
  title: string
  category: string
  description: string
  fullDescription: string
  technologies: string[]
  image?: string
}

function getProject(slug: string): Project | null {
  const projects: Project[] = projectsData
  return projects.find((p) => p.slug === slug) || null
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = getProject(params.slug)
  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: project.title,
    description: project.description,
  }
}

export default function ProjectPage({ params }: PageProps) {
  const project = getProject(params.slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="pt-20 min-h-screen">
      <article className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div>
            <Link
              href="/portfolio"
              className="text-primary-600 hover:text-primary-700 mb-6 inline-block"
            >
              ← Back to Portfolio
            </Link>
          </div>
          <div>
            <div className="mb-4">
              <span className="text-sm text-primary-600 font-semibold">{project.category}</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">{project.title}</h1>
          </div>
          <div>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              {project.description}
            </p>
          </div>
          <div>
            <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
              <p>{project.fullDescription}</p>
            </div>
          </div>
          {project.technologies && project.technologies.length > 0 && (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  )
}

