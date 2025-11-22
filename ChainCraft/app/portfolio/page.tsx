'use client'

import AdaptivePageWrapper from '@/components/AdaptivePageWrapper'
import { useAdaptiveUI } from '@/components/AdaptiveUIProvider'
import { useState } from 'react'
import Link from 'next/link'
import projectsData from '@/content/projects.json'

interface Project {
  slug: string
  title: string
  category: string
  description: string
  fullDescription?: string
  technologies?: string[]
  image?: string
}

export default function Portfolio() {
  const { getFeatureOrder, trackInteraction } = useAdaptiveUI()
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  
  const projects: Project[] = projectsData
  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))]
  
  // AI-driven: Reorder projects based on views
  const projectSlugs = projects.map(p => p.slug)
  const orderedSlugs = getFeatureOrder(projectSlugs)
  
  let filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory)

  // Reorder filtered projects
  filteredProjects = orderedSlugs
    .map(slug => filteredProjects.find(p => p.slug === slug))
    .filter(Boolean) as Project[]
  
  const missingProjects = filteredProjects.filter(p => !orderedSlugs.includes(p.slug))
  filteredProjects = [...filteredProjects.filter(p => orderedSlugs.includes(p.slug)), ...missingProjects]

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
    trackInteraction(`portfolio-filter-${category}`)
  }

  // Category gradients
  const categoryGradients: Record<string, string> = {
    'All': 'from-amber-500 to-orange-600',
    'Web Development': 'from-amber-500 to-orange-600',
    'Design': 'from-orange-500 to-rose-600',
    'Consulting': 'from-rose-500 to-pink-600',
    'Marketing': 'from-amber-600 to-yellow-600',
    'Analytics': 'from-rose-600 to-pink-600',
  }


  return (
    <AdaptivePageWrapper pageType="portfolio">
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
              Our Portfolio
            </h1>
            <p className="text-2xl md:text-3xl text-amber-900/80 max-w-3xl mx-auto font-medium leading-relaxed">
              Showcasing exceptional digital experiences that transform businesses and delight users
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter - Experimental Navigation (Trend #5) with Horizontal Scroll on Mobile */}
      <section className="py-12 bg-white sticky top-20 z-40 border-b-4 border-amber-900/10 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Horizontal Scroll Container for Mobile */}
          <div className="overflow-x-auto overflow-y-hidden scrollbar-hide -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0">
            <div className="flex sm:flex-wrap gap-4 justify-start sm:justify-center items-center min-w-max sm:min-w-0 touch-pan-x">
              {categories.map((category) => {
                const isSelected = selectedCategory === category
                const gradient = categoryGradients[category] || 'from-amber-500 to-orange-600'
                
                return (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className={`group relative px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-black text-base sm:text-lg transition-all duration-300 hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-4 focus:ring-amber-300 whitespace-nowrap touch-manipulation ${
                      isSelected
                        ? `bg-gradient-to-r ${gradient} text-white shadow-2xl scale-105`
                        : 'bg-white text-amber-900 border-4 border-amber-900 hover:bg-amber-50 hover:shadow-xl'
                    }`}
                    style={{ minHeight: '56px', minWidth: 'fit-content' }}
                  >
                    {category}
                    {isSelected && (
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-white rounded-full"></div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid - Asymmetrical Layout (Anti-Design Trend #3) with Big Blocks (Trend #6) */}
      <section className="py-32 bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-32">
              <div className="text-8xl mb-8">🔍</div>
              <h3 className="text-5xl font-black mb-6 text-amber-900">No Projects Found</h3>
              <p className="text-2xl text-amber-900/70 font-medium">Try selecting a different category</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-16">
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-amber-900 leading-tight mb-4">
                  {selectedCategory === 'All' ? 'All Projects' : `${selectedCategory} Projects`}
                </h2>
                <p className="text-xl text-amber-900/70 font-medium">
                  {filteredProjects.length} {filteredProjects.length !== 1 ? 'projects' : 'project'} found
                </p>
              </div>

              {/* Asymmetrical Grid - Big Blocks */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {filteredProjects.map((project, index) => {
                  const isSelected = selectedProject === project.slug
                  const isLarge = (index === 0 || index === 3) && !isSelected
                  const gradient = categoryGradients[project.category] || 'from-amber-500 to-orange-600'
                  
                  return (
                    <div
                      key={project.slug}
                      onClick={() => setSelectedProject(isSelected ? null : project.slug)}
                      className={`group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-amber-300 ${
                        isSelected ? 'ring-4 ring-amber-600 shadow-2xl md:col-span-2 lg:col-span-2' : ''
                      } ${isLarge ? 'md:col-span-2 lg:col-span-1' : ''}`}
                      style={{ minHeight: isSelected ? 'auto' : '500px' }}
                    >
                      {/* Gradient Background Only */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} ${isSelected ? 'opacity-95' : 'opacity-90 group-hover:opacity-100'} transition-opacity duration-300`}></div>
                      
                      {/* Content */}
                      <div className="relative h-full p-8 md:p-10 flex flex-col justify-between text-white min-h-[500px]">
                        <div className="space-y-6">
                          <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl text-sm font-bold border border-white/30">
                            {project.category}
                          </div>
                          <h3 className="text-4xl md:text-5xl font-black leading-tight">
                            {project.title}
                          </h3>
                          <p className={`text-lg md:text-xl font-medium leading-relaxed ${isSelected ? 'opacity-95' : 'opacity-90'}`}>
                            {project.description}
                          </p>
                        </div>

                        {isSelected && project.fullDescription && (
                          <div className="mt-8 pt-8 border-t-2 border-white/30 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <p className="text-xl font-medium leading-relaxed opacity-95">
                              {project.fullDescription}
                            </p>
                            {project.technologies && project.technologies.length > 0 && (
                              <div className="flex flex-wrap gap-3">
                                {project.technologies.map((tech) => (
                                  <span
                                    key={tech}
                                    className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl text-sm font-semibold border border-white/30"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            )}
                            <Link
                              href={`/portfolio/${project.slug}`}
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-amber-900 rounded-xl font-bold text-lg hover:bg-amber-50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white/50"
                            >
                              View Full Project
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                            </Link>
                          </div>
                        )}
                        
                        {!isSelected && (
                          <div className="flex items-center gap-3 text-lg font-bold mt-auto pt-6 group-hover:translate-x-4 transition-transform duration-300">
                            View Details
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
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
              Have a Project in Mind?
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
                Start Your Project
              </Link>
              <Link
                href="/services"
                className="px-12 py-6 bg-transparent text-white rounded-2xl font-black text-xl border-4 border-white hover:bg-white/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white/50"
                style={{ minHeight: '64px', borderWidth: '4px' }}
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </AdaptivePageWrapper>
  )
}
