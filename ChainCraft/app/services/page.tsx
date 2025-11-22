'use client'

import AdaptivePageWrapper from '@/components/AdaptivePageWrapper'
import { useAdaptiveUI } from '@/components/AdaptiveUIProvider'
import { useState } from 'react'
import Link from 'next/link'

export default function Services() {
  const { getFeatureOrder, trackInteraction } = useAdaptiveUI()
  const [selectedService, setSelectedService] = useState<string | null>(null)

const services = [
  {
      id: 'web-design',
      title: 'Web Design',
      description: 'Stunning, responsive designs that convert visitors into customers and create memorable brand experiences.',
      fullDescription: 'Our web design service creates beautiful, user-friendly interfaces that not only look great but drive conversions. We focus on user experience, accessibility, modern design trends, and creating digital experiences that resonate with your audience.',
      icon: '🎨',
      features: ['Responsive Design', 'UI/UX Optimization', 'Accessibility', 'Performance', 'Brand Identity'],
      gradient: 'from-amber-500 to-orange-600',
      bgGradient: 'from-amber-50 to-orange-50',
  },
  {
      id: 'development',
    title: 'Development',
      description: 'High-performance websites and applications built with cutting-edge technologies and best practices.',
      fullDescription: 'Custom web development using the latest technologies. We build scalable, fast, and secure applications tailored to your business needs. From front-end to back-end, we deliver robust solutions that perform.',
    icon: '💻',
      features: ['Full-Stack Development', 'API Integration', 'Database Design', 'Cloud Deployment', 'DevOps'],
      gradient: 'from-orange-500 to-rose-600',
      bgGradient: 'from-orange-50 to-rose-50',
  },
  {
      id: 'ui-ux-design',
      title: 'UI/UX Design',
      description: 'User-centered design that creates exceptional experiences and drives engagement.',
      fullDescription: 'We create intuitive, beautiful user interfaces that delight users. Our design process focuses on understanding user behavior, conducting research, and creating experiences that convert and build brand loyalty.',
      icon: '✨',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Usability Testing', 'Design Systems'],
      gradient: 'from-rose-500 to-pink-600',
      bgGradient: 'from-rose-50 to-pink-50',
  },
  {
      id: 'consulting',
      title: 'Strategic Consulting',
      description: 'Expert guidance to grow your online presence and achieve your business objectives.',
      fullDescription: 'Expert consulting services to help you make informed decisions about your digital strategy, technology stack, and business growth. We analyze your current state and provide actionable recommendations.',
      icon: '📊',
      features: ['Strategy Planning', 'Technology Assessment', 'Process Optimization', 'Growth Planning', 'Roadmapping'],
      gradient: 'from-amber-600 to-yellow-600',
      bgGradient: 'from-amber-50 to-yellow-50',
  },
  {
      id: 'marketing',
      title: 'Digital Marketing',
      description: 'Data-driven marketing strategies that drive growth, engagement, and measurable ROI.',
      fullDescription: 'Comprehensive digital marketing services including SEO, social media, content marketing, and paid advertising to boost your online presence. We create campaigns that convert and deliver real results.',
      icon: '📢',
      features: ['SEO Optimization', 'Social Media', 'Content Strategy', 'Analytics', 'Conversion Optimization'],
      gradient: 'from-orange-600 to-amber-600',
      bgGradient: 'from-orange-50 to-amber-50',
  },
  {
      id: 'analytics',
      title: 'Analytics & Insights',
      description: 'Data-driven insights to optimize performance and make informed business decisions.',
      fullDescription: 'Advanced analytics and reporting to understand your users, track performance, and make data-driven decisions for continuous improvement. We turn data into actionable insights that drive growth.',
      icon: '📈',
      features: ['Data Analysis', 'Custom Reports', 'Dashboards', 'Predictive Analytics', 'A/B Testing'],
      gradient: 'from-rose-600 to-pink-600',
      bgGradient: 'from-rose-50 to-pink-50',
  },
]

  // AI-driven: Reorder services based on usage
  const serviceIds = services.map(s => s.id)
  const orderedIds = getFeatureOrder(serviceIds)
  const orderedServices = orderedIds.map(id => services.find(s => s.id === id)!).filter(Boolean)
  const missingServices = services.filter(s => !orderedIds.includes(s.id))
  const finalServices = [...orderedServices, ...missingServices]

  return (
    <AdaptivePageWrapper pageType="services">
      {/* Hero Section - Text-Only Hero (Trend #17) */}
      <section className="relative py-32 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 overflow-hidden">
        {/* Organic Shapes Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-amber-200/30 to-orange-300/30 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-rose-200/30 to-pink-300/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-5xl mx-auto space-y-8">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-amber-900 leading-tight">
              Our Services
            </h1>
            <p className="text-2xl md:text-3xl text-amber-900/80 max-w-3xl mx-auto font-medium leading-relaxed">
              Comprehensive digital solutions designed to transform your business and drive exceptional results
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid - Big Blocks with Vivid Contrast (Trend #6) */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Asymmetrical Grid Layout (Anti-Design Trend #3) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {finalServices.map((service, index) => {
              const isSelected = selectedService === service.id
              const isLarge = index === 0 || index === 3
              
              return (
                <div
                  key={service.id}
                  onClick={() => {
                    setSelectedService(isSelected ? null : service.id)
                    trackInteraction(`service-${service.id}`)
                  }}
                  className={`group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-amber-300 ${
                    isSelected ? 'ring-4 ring-amber-600 shadow-2xl' : 'shadow-lg'
                  } ${isLarge && !isSelected ? 'md:col-span-2 lg:col-span-1' : ''} ${isSelected ? 'md:col-span-2 lg:col-span-2' : ''}`}
                  style={{ minHeight: isSelected ? 'auto' : '500px' }}
                >
                  {/* Gradient Background Only */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} ${isSelected ? 'opacity-95' : 'opacity-90 group-hover:opacity-100'} transition-opacity duration-300`}></div>
                  
                  {/* Content */}
                  <div className="relative h-full p-8 md:p-10 flex flex-col justify-between text-white min-h-[500px]">
                    <div className="space-y-6">
                      <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                        {service.icon}
                      </div>
                      <h3 className="text-4xl md:text-5xl font-black leading-tight">
                        {service.title}
                      </h3>
                      <p className={`text-lg md:text-xl font-medium leading-relaxed ${isSelected ? 'opacity-95' : 'opacity-90'}`}>
                        {service.description}
                      </p>
                    </div>

                    {isSelected && (
                      <div className="mt-8 pt-8 border-t-2 border-white/30 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <p className="text-xl font-medium leading-relaxed opacity-95">
                          {service.fullDescription}
                        </p>
                        <div className="flex flex-wrap gap-3">
                          {service.features.map((feature) => (
                            <span
                              key={feature}
                              className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl text-sm font-semibold border border-white/30"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                        <Link
                          href="/contact"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-3 px-8 py-4 bg-white text-amber-900 rounded-xl font-bold text-lg hover:bg-amber-50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white/50"
                        >
                          Get Started
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </Link>
                      </div>
                    )}
                    
                    {!isSelected && (
                      <div className="flex items-center gap-3 text-lg font-bold mt-auto pt-6 group-hover:translate-x-4 transition-transform duration-300">
                        Learn More
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-amber-600 via-orange-600 to-rose-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-10">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
              Ready to Get Started?
            </h2>
            <p className="text-2xl text-white/90 max-w-2xl mx-auto font-medium">
              Let's discuss how we can help transform your business with our services
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
              <Link
                href="/contact"
                className="px-12 py-6 bg-white text-amber-900 rounded-2xl font-black text-xl hover:bg-amber-50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white/50"
                style={{ minHeight: '64px' }}
              >
                Contact Us Today
              </Link>
              <Link
                href="/portfolio"
                className="px-12 py-6 bg-transparent text-white rounded-2xl font-black text-xl border-4 border-white hover:bg-white/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white/50"
                style={{ minHeight: '64px', borderWidth: '4px' }}
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </AdaptivePageWrapper>
  )
}
