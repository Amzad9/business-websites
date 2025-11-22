'use client'

import AdaptivePageWrapper from '@/components/AdaptivePageWrapper'
import { useAdaptiveUI } from '@/components/AdaptiveUIProvider'
import { useState } from 'react'
import Image from 'next/image'

export default function About() {
  const { trackInteraction } = useAdaptiveUI()
  const [activeStory, setActiveStory] = useState(0)

  const stories = [
    {
      year: '2015',
      title: 'The Beginning',
      content: 'ChainCraft Agency was founded with a vision to revolutionize digital experiences. We started as a small team of passionate designers and developers committed to creating exceptional work.',
      icon: '🌱',
    },
    {
      year: '2018',
      title: 'Rapid Growth',
      content: 'Our innovative approach and dedication to excellence led to rapid expansion. We built strong partnerships with clients across various industries, from startups to Fortune 500 companies.',
      icon: '🚀',
    },
    {
      year: '2021',
      title: 'Global Reach',
      content: 'We expanded internationally, serving clients worldwide. Our team grew to 50+ experts specializing in web design, development, and digital marketing across multiple continents.',
      icon: '🌍',
    },
    {
      year: '2025',
      title: 'Industry Leadership',
      content: 'Today, ChainCraft is recognized as a leader in digital agency services. We continue to innovate with cutting-edge design trends, AI-driven solutions, and transformative digital experiences.',
      icon: '🤖',
    },
  ]

  const values = [
    { 
      title: 'Innovation First', 
      description: 'We embrace bold ideas, cutting-edge technologies, and creative solutions that push boundaries and deliver exceptional results.',
      icon: '💡',
      gradient: 'from-amber-500 to-orange-600',
    },
    { 
      title: 'Client Success', 
      description: 'Your success is our success. We build lasting partnerships and deliver solutions that drive real business growth.',
      icon: '🤝',
      gradient: 'from-orange-500 to-rose-600',
    },
    { 
      title: 'Excellence Always', 
      description: 'We strive for perfection in every detail, from design to code, ensuring quality that exceeds expectations.',
      icon: '⭐',
      gradient: 'from-rose-500 to-pink-600',
    },
    { 
      title: 'Future Ready', 
      description: 'We stay ahead of trends and continuously evolve our skills and services to meet tomorrow\'s challenges today.',
      icon: '🔄',
      gradient: 'from-amber-600 to-yellow-600',
    },
  ]

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Creative Director',
    },
    {
      name: 'Michael Chen',
      role: 'Lead Developer',
    },
    {
      name: 'Emily Rodriguez',
      role: 'UX Strategist',
    },
    {
      name: 'David Kim',
      role: 'Marketing Lead',
    },
  ]

  return (
    <AdaptivePageWrapper pageType="about">
      {/* Hero Section - Text-Only Hero with Bold Typography */}
      <section className="relative py-32 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 overflow-hidden">
        {/* Organic Shapes Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-amber-200/30 to-orange-300/30 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-rose-200/30 to-pink-300/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className=" mx-auto">
            {/* Asymmetrical Layout */}
            <div className="grid md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-7 space-y-8">
                <div className="space-y-6">
                  <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight">
                    <span className="block text-amber-900">About</span>
                    <span className="block text-orange-600">ChainCraft</span>
                    <span className="block text-rose-600 text-7xl md:text-8xl lg:text-9xl">Agency</span>
            </h1>
                  
                  <p className="text-2xl md:text-3xl text-amber-900/80 font-medium max-w-2xl leading-relaxed">
                    We're a digital agency that transforms businesses through innovative design, strategic thinking, and cutting-edge technology.
                  </p>
                </div>
              </div>
              
              {/* Image with Organic Shape Overlay (Trend #21) */}
              <div className="md:col-span-5 relative">
                <div className="relative aspect-square rounded-3xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=800&fit=crop"
                    alt="ChainCraft Agency Team"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Graphical Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-rose-400/20"></div>
                  {/* Organic Shape Overlay */}
                  <svg className="absolute bottom-0 left-0 w-full h-1/3" viewBox="0 0 400 200" preserveAspectRatio="none">
                    <path d="M0,200 Q100,100 200,150 T400,100 L400,200 Z" fill="rgba(251, 191, 36, 0.3)" className="organic-shape"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section - Big Block with Negative Space (Trend #12) */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center space-y-10">
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-amber-900 leading-tight">
                Our Mission
              </h2>
              <p className="text-2xl md:text-3xl text-amber-900/70 max-w-4xl mx-auto font-medium leading-relaxed">
                To empower businesses with innovative digital solutions that drive growth, enhance user experiences, and create lasting impact in an ever-evolving digital landscape.
            </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Story Section - Organic Shapes (Trend #15) */}
      <section className="py-32 bg-gradient-to-b from-gray-50 via-amber-50/30 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-amber-900 leading-tight mb-6">
            Our Journey
              </h2>
              <p className="text-2xl text-amber-900/70 max-w-3xl mx-auto font-medium">
                A decade of innovation, growth, and exceptional client partnerships
              </p>
            </div>

            <div className="space-y-12">
              {stories.map((story, index) => {
                const isActive = activeStory === index
                
                return (
                  <div
                  key={index}
                  onClick={() => {
                    setActiveStory(index)
                    trackInteraction(`story-${index}`)
                  }}
                    className={`group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-500 ${
                      isActive
                        ? 'ring-4 ring-amber-600 shadow-2xl scale-[1.02]'
                        : 'hover:shadow-xl hover:-translate-y-2'
                    }`}
                  >
                    {/* Asymmetrical Layout */}
                    <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 p-10 bg-gradient-to-br from-white to-gray-50 border-4 ${isActive ? 'border-amber-600' : 'border-gray-200 group-hover:border-amber-300'} transition-all`}>
                      {/* Gradient Background Only */}
                      <div className="flex-shrink-0 w-full md:w-80 relative aspect-video md:aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-400/20"></div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 space-y-6 flex flex-col justify-center">
                        <div className="inline-flex items-center gap-4">
                          <div className={`w-20 h-20 ${isActive ? 'bg-gradient-to-br from-amber-600 to-orange-600' : 'bg-gradient-to-br from-amber-100 to-orange-100'} rounded-2xl flex items-center justify-center text-3xl shadow-lg transition-all duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                            {story.icon}
                          </div>
                          <div className={`text-2xl font-black ${isActive ? 'text-amber-900' : 'text-gray-600'}`}>
                            {story.year}
                          </div>
                        </div>
                        <h3 className={`text-4xl md:text-5xl font-black ${isActive ? 'text-amber-900' : 'text-gray-900'} leading-tight`}>
                          {story.title}
                        </h3>
                        <p className={`text-xl ${isActive ? 'text-amber-900/80' : 'text-gray-700'} leading-relaxed font-medium`}>
                          {story.content}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Big Blocks with Vivid Contrast (Trend #6) */}
      <section className="py-32 bg-amber-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight mb-6">
                Our Core Values
              </h2>
              <p className="text-2xl text-amber-100 max-w-3xl mx-auto font-medium">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  onClick={() => trackInteraction(`value-${value.title.toLowerCase().replace(' ', '-')}`)}
                  className={`group relative p-10 rounded-3xl bg-gradient-to-br ${value.gradient} cursor-pointer transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/50`}
                  style={{ minHeight: '350px' }}
                >
                  <div className="space-y-6">
                    <div className="text-6xl mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                      {value.icon}
                    </div>
                    <h3 className="text-3xl font-black text-white leading-tight mb-4">
                      {value.title}
                    </h3>
                    <p className="text-lg text-white/90 leading-relaxed font-medium">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Blending Photos with Graphical Elements (Trend #21) */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-amber-900 leading-tight mb-6">
                Our Team
              </h2>
              <p className="text-2xl text-amber-900/70 max-w-3xl mx-auto font-medium">
                Meet the talented individuals who bring creativity, expertise, and passion to every project
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="group relative"
                >
                  <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-amber-500/50 transition-all duration-500 group-hover:-translate-y-4 bg-gradient-to-br from-amber-600 to-orange-600 flex flex-col items-center justify-center p-8 text-white">
                    {/* Avatar Circle */}
                    <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center text-5xl font-black mb-6 shadow-xl">
                      {member.name.charAt(0)}
                  </div>

                    {/* Content */}
                    <div className="text-center space-y-2">
                      <h3 className="text-2xl font-black text-white">
                        {member.name}
                      </h3>
                      <p className="text-amber-100 font-semibold">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
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
          <div className="max-w-5xl mx-auto text-center space-y-10">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight">
              Work With Us
            </h2>
            <p className="text-2xl md:text-3xl text-white/90 max-w-3xl mx-auto font-medium leading-relaxed">
              Let's create something extraordinary together. Get in touch and let's discuss your next project.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <a
                href="/contact"
                className="px-12 py-6 bg-white text-amber-900 rounded-2xl font-black text-xl hover:bg-amber-50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white/50"
                style={{ minHeight: '64px' }}
              >
                Get In Touch
              </a>
              <a
                href="/portfolio"
                className="px-12 py-6 bg-transparent text-white rounded-2xl font-black text-xl border-4 border-white hover:bg-white/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white/50"
                style={{ minHeight: '64px', borderWidth: '4px' }}
              >
                View Our Work
              </a>
                </div>
          </div>
        </div>
      </section>
    </AdaptivePageWrapper>
  )
}
