'use client'

import { Metadata } from 'next'
import AdaptivePageWrapper from '@/components/AdaptivePageWrapper'
import { useAdaptiveUI } from '@/components/AdaptiveUIProvider'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function About() {
  const { timeOfDay, colorMode, animationSpeed, trackInteraction } = useAdaptiveUI()
  const [activeStory, setActiveStory] = useState(0)

  const stories = [
    {
      year: '2014',
      title: 'The Beginning',
      content: 'ChainCraft was founded with a vision to revolutionize how businesses operate in the digital age. We started as a small team of passionate professionals.',
      icon: '🌱',
    },
    {
      year: '2017',
      title: 'Rapid Growth',
      content: 'Our innovative approach and dedication to excellence led to rapid expansion. We built strong partnerships with clients across various industries.',
      icon: '🚀',
    },
    {
      year: '2020',
      title: 'Global Reach',
      content: 'We expanded internationally, serving clients worldwide. Our team grew to 50+ experts specializing in cutting-edge technologies.',
      icon: '🌍',
    },
    {
      year: '2024',
      title: 'AI Leadership',
      content: 'Today, ChainCraft is a leader in AI-driven solutions. We continue to innovate and transform businesses with adaptive, intelligent technologies.',
      icon: '🤖',
    },
  ]

  const values = [
    { title: 'Innovation', description: 'We embrace new ideas and cutting-edge technologies', icon: '💡', color: 'from-blue-500 to-cyan-500' },
    { title: 'Integrity', description: 'We operate with honesty and transparency', icon: '🤝', color: 'from-green-500 to-emerald-500' },
    { title: 'Excellence', description: 'We strive for perfection in everything we do', icon: '⭐', color: 'from-yellow-500 to-orange-500' },
    { title: 'Adaptability', description: 'We evolve with technology and market needs', icon: '🔄', color: 'from-purple-500 to-pink-500' },
  ]

  // Auto-rotate story on mount (AI-driven content presentation)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStory((prev) => (prev + 1) % stories.length)
      trackInteraction('story-rotation')
    }, 4000 * animationSpeed)
    return () => clearInterval(interval)
  }, [animationSpeed, stories.length, trackInteraction])

  return (
    <AdaptivePageWrapper pageType="about">
      {/* Hero Section with Adaptive Gradient */}
      <section className={`py-24 relative overflow-hidden ${
        colorMode === 'monochrome' 
          ? 'bg-gradient-to-br from-slate-800 to-slate-900' 
          : 'bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600'
      }`}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 * animationSpeed }}
            className="text-center"
          >
            <h1 className={`text-6xl md:text-8xl font-black mb-6 ${
              colorMode === 'monochrome' ? 'text-white' : 'text-white'
            }`}>
              About ChainCraft
            </h1>
            <p className={`text-xl md:text-2xl max-w-3xl mx-auto font-bold ${
              colorMode === 'monochrome' ? 'text-gray-300' : 'text-white/90'
            }`}>
              Transforming businesses with adaptive, AI-driven solutions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Adaptive Timeline Story Section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 * animationSpeed }}
            className="text-5xl md:text-6xl font-black text-center mb-16 text-black"
          >
            Our Journey
          </motion.h2>

          <div className="relative max-w-5xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 via-accent-500 to-primary-600 transform md:-translate-x-1/2" />

            {/* Story Items */}
            <div className="space-y-16">
              {stories.map((story, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: activeStory === index ? 1 : 0.6, x: 0 }}
                  transition={{ 
                    duration: 0.6 * animationSpeed,
                    delay: index * 0.15 * animationSpeed
                  }}
                  onClick={() => {
                    setActiveStory(index)
                    trackInteraction(`story-${index}`)
                  }}
                  className={`relative md:flex items-center gap-12 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } cursor-pointer group`}
                >
                  {/* Timeline Dot */}
                  <div className={`absolute left-8 md:left-1/2 top-8 w-16 h-16 rounded-full bg-gradient-to-br ${
                    activeStory === index ? 'from-primary-500 to-accent-500 scale-125' : 'from-gray-300 to-gray-400'
                  } flex items-center justify-center transform md:-translate-x-1/2 transition-all duration-300 z-10 shadow-xl`}>
                    <span className="text-2xl">{story.icon}</span>
                  </div>

                  {/* Story Content */}
                  <div className={`md:flex-1 ml-24 md:ml-0 p-8 rounded-2xl transition-all duration-300 ${
                    activeStory === index
                      ? 'bg-gradient-to-br from-primary-50 to-accent-50 border-4 border-primary-500 shadow-2xl scale-105'
                      : 'bg-white border-2 border-gray-200 shadow-lg group-hover:shadow-xl'
                  }`}>
                    <div className="text-sm font-bold text-primary-600 mb-2">{story.year}</div>
                    <h3 className="text-3xl font-black text-black mb-4">{story.title}</h3>
                    <p className="text-lg text-black/80 leading-relaxed font-semibold">{story.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section with Adaptive Colors */}
      <section className={`py-24 ${
        colorMode === 'monochrome'
          ? 'bg-gradient-to-br from-slate-900 to-slate-800'
          : timeOfDay === 'night'
          ? 'bg-gradient-to-br from-indigo-900 to-purple-900'
          : 'bg-gradient-to-br from-primary-600 to-accent-600'
      } relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 * animationSpeed }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-8 text-white">
              Our Mission
            </h2>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-bold">
              To empower businesses with innovative, AI-driven solutions that adapt to their needs,
              drive growth, efficiency, and success in an ever-evolving digital landscape.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section with AI-Ordered Cards */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 * animationSpeed }}
            className="text-5xl md:text-6xl font-black text-center mb-16 text-black"
          >
            Our Core Values
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6 * animationSpeed,
                  delay: index * 0.1 * animationSpeed
                }}
                onClick={() => trackInteraction(`value-${value.title.toLowerCase()}`)}
                className="group relative p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl border-2 border-gray-200 hover:border-primary-500 transition-all duration-500 hover:-translate-y-2 hover:scale-105 cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`} />
                
                <div className="relative z-10 text-center">
                  <div className="text-6xl mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500">
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-black text-black mb-3 group-hover:text-primary-700 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-black/80 leading-relaxed font-semibold">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </AdaptivePageWrapper>
  )
}
