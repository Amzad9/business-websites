'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'
import KineticText from '@/components/KineticText'
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
      {/* Hero Section - Aligned to Container */}
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
              PORTFOLIO
            </h1>
            
            <p className="text-lg md:text-3xl text-white font-bold leading-relaxed max-w-4xl">
              Where creativity meets innovation. Explore our transformative projects that push boundaries and redefine digital excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter - Brutalist Style - 2026 Trend */}
      <section className="pt-16 pb-16 bg-white border-t-4 border-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
              <div className="flex flex-nowrap justify-start sm:justify-center gap-4 min-w-max sm:min-w-0 pb-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 sm:px-8 py-4 rounded-none font-black text-sm sm:text-base uppercase tracking-widest transition-all duration-300 transform hover:scale-110 hover:-rotate-2 border-4 whitespace-nowrap flex-shrink-0 ${
                      selectedCategory === category
                        ? 'bg-gray-900 text-white border-gray-900 shadow-2xl'
                        : 'bg-white text-gray-900 border-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Portfolio Cards Grid - Simple Layout */}
      <section className="pt-16 pb-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => {
              // Unsplash images based on category
              const categoryImages: Record<string, string> = {
                'Web Development': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80',
                'Design': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop&q=80',
                'Consulting': 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop&q=80',
                'Marketing': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80',
                'Analytics': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80',
              }
              const imageUrl = project.image || categoryImages[project.category] || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80'
              
              return (
                <FadeIn key={project.slug} delay={index * 0.1}>
                  <div className="group relative bg-white border-4 border-gray-900 rounded-none overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-blue-600 to-cyan-500 flex-shrink-0">
                      <img
                        src={imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <span className="px-4 py-2 bg-white text-gray-900 rounded-none text-xs font-black uppercase tracking-widest border-2 border-gray-900">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex-grow flex flex-col">
                      <h3 className="text-xl md:text-3xl font-black text-gray-900 mb-4 uppercase tracking-tight">
                        {project.title}
                      </h3>
                      <p className="text-gray-700 font-semibold leading-relaxed mb-6 flex-grow">
                        {project.description}
                      </p>
                      <Link
                        href={`/portfolio/${project.slug}`}
                        className="inline-flex items-center gap-3 px-6 py-3 bg-gray-900 text-white rounded-none font-black text-sm uppercase tracking-widest border-2 border-gray-900 group-hover:bg-blue-600 group-hover:border-blue-600 transform group-hover:scale-105 transition-all duration-300 w-fit mt-auto"
                      >
                        View Project
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section - Changed Background Color */}
      <section className="py-32 bg-gradient-to-br from-blue-600 via-cyan-500 to-indigo-600 text-white relative overflow-hidden border-t-4 border-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <FadeIn>
              <h2 className="text-2xl md:text-7xl font-black mb-8 uppercase tracking-tight">
                <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
                  Ready?
                </span>
              </h2>
              <p className="text-lg md:text-3xl text-white/90 font-bold mb-12 leading-relaxed">
                Let's create something extraordinary together
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-4 px-12 py-6 bg-white text-blue-600 rounded-2xl font-black text-xl shadow-2xl hover:shadow-white/50 transform hover:scale-110 transition-all duration-300"
              >
                Start Your Project
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}
