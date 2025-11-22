'use client'

import AdaptivePageWrapper from '@/components/AdaptivePageWrapper'
import { useAdaptiveUI } from '@/components/AdaptiveUIProvider'
import { useState, useEffect } from 'react'
import testimonialsData from '@/content/testimonials.json'

interface Testimonial {
  name: string
  role: string
  company: string
  content: string
  avatar?: string
}

export default function Testimonial() {
  const { getFeatureOrder, trackInteraction } = useAdaptiveUI()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [likedTestimonials, setLikedTestimonials] = useState<string[]>([])
  
  let testimonials: Testimonial[] = testimonialsData

  // AI-driven: Reorder testimonials based on likes
  useEffect(() => {
    const saved = localStorage.getItem('chaincraft-liked-testimonials')
    if (saved) {
      try {
        setLikedTestimonials(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load liked testimonials:', e)
      }
    }
  }, [])

  const testimonialIds = testimonials.map((t, i) => `testimonial-${i}`)
  const orderedIds = getFeatureOrder(testimonialIds)
  
  // Prioritize liked testimonials
  testimonials = [...testimonials].sort((a, aIndex) => {
    const aId = `testimonial-${aIndex}`
    const aLiked = likedTestimonials.includes(aId)
    if (aLiked) return -1
    return 1
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      trackInteraction(`testimonial-view-${currentIndex}`)
    }, 6000)
    return () => clearInterval(interval)
  }, [testimonials.length, currentIndex, trackInteraction])

  const handleLike = (index: number) => {
    const id = `testimonial-${index}`
    const newLiked = likedTestimonials.includes(id)
      ? likedTestimonials.filter(lid => lid !== id)
      : [...likedTestimonials, id]
    setLikedTestimonials(newLiked)
    localStorage.setItem('chaincraft-liked-testimonials', JSON.stringify(newLiked))
    trackInteraction(`testimonial-like-${index}`)
  }


  return (
    <AdaptivePageWrapper pageType="testimonial">
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
              Client Testimonials
            </h1>
            <p className="text-2xl md:text-3xl text-amber-900/80 max-w-3xl mx-auto font-medium leading-relaxed">
              Real stories from clients who transformed their businesses with ChainCraft Agency
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel - Big Block Design */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {/* Main Testimonial Card - Big Block */}
          <div className="relative overflow-hidden rounded-3xl shadow-2xl border-4 border-amber-900/20 bg-gradient-to-br from-amber-50 to-orange-50 min-h-[500px]">
            {/* Gradient Background Only */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/30 to-orange-400/30"></div>
            
            {/* Content */}
            <div className="relative p-12 md:p-16 flex flex-col justify-between min-h-[500px]">
              <div className="space-y-8">
                {/* Quote Icon */}
                <div className="text-6xl md:text-7xl font-black text-amber-900/20 leading-none">"</div>
                
                {/* Testimonial Content */}
                <p className="text-2xl md:text-3xl text-amber-900 font-medium leading-relaxed max-w-4xl">
                  {testimonials[currentIndex].content}
                </p>
                
                {/* Rating Stars */}
                <div className="flex gap-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              
              {/* Author Info */}
              <div className="flex items-center gap-6 pt-8 border-t-4 border-amber-900/20 mt-auto">
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center text-white font-black text-3xl md:text-4xl">
                  {testimonials[currentIndex].name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-2xl md:text-3xl font-black text-amber-900 mb-2">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-lg md:text-xl text-amber-900/70 font-semibold">
                    {testimonials[currentIndex].role}
                  </p>
                  <p className="text-base md:text-lg text-amber-900/60 font-medium">
                    {testimonials[currentIndex].company}
                  </p>
                </div>
                
                {/* Like Button */}
                <button
                  onClick={() => handleLike(currentIndex)}
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-3xl md:text-4xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-amber-300 ${
                    likedTestimonials.includes(`testimonial-${currentIndex}`)
                      ? 'bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-xl'
                      : 'bg-white text-gray-400 hover:bg-amber-50 border-4 border-amber-900/20'
                  }`}
                >
                  {likedTestimonials.includes(`testimonial-${currentIndex}`) ? '❤️' : '🤍'}
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Dots - Modern Design */}
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, index) => {
              const isLiked = likedTestimonials.includes(`testimonial-${index}`)
              const isActive = index === currentIndex
              
              return (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index)
                    trackInteraction(`testimonial-nav-${index}`)
                  }}
                  className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-4 focus:ring-amber-300 ${
                    isActive
                      ? 'w-12 h-4 bg-gradient-to-r from-amber-600 to-orange-600 shadow-lg scale-110'
                      : isLiked
                      ? 'w-4 h-4 bg-rose-400 hover:bg-rose-500 hover:scale-125'
                      : 'w-4 h-4 bg-gray-300 hover:bg-amber-400 hover:scale-125'
                  }`}
                />
              )
            })}
          </div>
        </div>
      </section>

      {/* All Testimonials Grid - Big Blocks */}
      <section className="py-32 bg-gradient-to-b from-gray-50 via-amber-50/30 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-amber-900 leading-tight mb-6">
                All Testimonials
              </h2>
              <p className="text-xl text-amber-900/70 max-w-3xl mx-auto font-medium">
                Discover what our clients say about working with ChainCraft Agency
              </p>
            </div>
            
            {/* Testimonials Grid - Big Blocks with Vivid Contrast */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => {
                const isLiked = likedTestimonials.includes(`testimonial-${index}`)
                const gradients = [
                  'from-amber-500 to-orange-600',
                  'from-orange-500 to-rose-600',
                  'from-rose-500 to-pink-600',
                  'from-amber-600 to-yellow-600',
                ]
                const gradient = gradients[index % gradients.length]
                
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index)
                      trackInteraction(`testimonial-select-${index}`)
                    }}
                    className={`group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-amber-300 ${
                      currentIndex === index ? 'ring-4 ring-amber-600 shadow-2xl' : ''
                    }`}
                    style={{ minHeight: '400px' }}
                  >
                    {/* Gradient Background Only */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} ${currentIndex === index ? 'opacity-95' : 'opacity-90 group-hover:opacity-100'} transition-opacity`}></div>
                    
                    {/* Content */}
                    <div className="relative h-full p-8 flex flex-col justify-between text-white min-h-[400px]">
                      <div className="space-y-6">
                        <div className="text-5xl font-black leading-none opacity-30">"</div>
                        <p className="text-lg md:text-xl font-medium leading-relaxed line-clamp-4">
                          {testimonial.content}
                        </p>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      
                      {/* Author */}
                      <div className="flex items-center gap-4 pt-6 border-t-2 border-white/30 mt-auto">
                        <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-white/50 shadow-lg bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center text-white font-black text-2xl">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <p className="text-xl font-black text-white">
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-white/80 font-semibold">
                            {testimonial.role} at {testimonial.company}
                          </p>
                        </div>
                        {isLiked && (
                          <div className="text-2xl">❤️</div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
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
              Ready to Join Our Success Stories?
            </h2>
            <p className="text-2xl text-white/90 max-w-2xl mx-auto font-medium">
              Let's create something extraordinary together and add your story to our testimonials.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <a
                href="/contact"
                className="px-12 py-6 bg-white text-amber-900 rounded-2xl font-black text-xl hover:bg-amber-50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white/50"
                style={{ minHeight: '64px' }}
              >
                Start Your Project
              </a>
              <a
                href="/services"
                className="px-12 py-6 bg-transparent text-white rounded-2xl font-black text-xl border-4 border-white hover:bg-white/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white/50"
                style={{ minHeight: '64px', borderWidth: '4px' }}
              >
                Our Services
              </a>
            </div>
          </div>
        </div>
      </section>
    </AdaptivePageWrapper>
  )
}
