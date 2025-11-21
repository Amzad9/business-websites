'use client'

import { useState } from 'react'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'
import { motion } from 'framer-motion'
import projectsData from '@/content/projects.json'

interface Project {
  slug: string
  title: string
  category: string
  description: string
  image?: string
}

export default function PortfolioContent() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const projects: Project[] = projectsData
  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))]

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory)

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h1 className="text-5xl font-bold text-center mb-6">Our Portfolio</h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Showcasing our best work and successful projects
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full transition-all ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <FadeIn key={project.slug} delay={index * 0.1}>
                <Link href={`/portfolio/${project.slug}`}>
                  <motion.div
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
                  >
                    <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                      <span className="text-4xl">📁</span>
                    </div>
                    <div className="p-6">
                      <span className="text-sm text-primary-600 font-semibold">
                        {project.category}
                      </span>
                      <h3 className="text-xl font-semibold mt-2 mb-2">{project.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{project.description}</p>
                    </div>
                  </motion.div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
