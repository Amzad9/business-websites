import { Metadata } from 'next'
import FadeIn from '@/components/FadeIn'
import KineticText from '@/components/KineticText'
import Link from 'next/link'
import AccessibilityBar from '@/components/AccessibilityBar'

export const metadata: Metadata = {
  title: 'ByteBloom - Where Ideas Blossom into Digital Excellence',
  description: 'Crafting extraordinary digital experiences that transform businesses and captivate audiences. Your vision, our expertise, exceptional results.',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ByteBloom',
  url: 'https://bytebloom.com',
  logo: 'https://bytebloom.com/logo.png',
  description: 'ByteBloom - Where Ideas Blossom into Digital Excellence. Crafting extraordinary digital experiences that transform businesses.',
  slogan: 'Where Ideas Blossom into Digital Excellence',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN',
    addressLocality: 'India',
  },
  sameAs: [
    'https://twitter.com/bytebloom',
    'https://linkedin.com/company/bytebloom',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '150+',
  },
  areaServed: ['IN', 'Worldwide'],
  serviceType: 'Web Design, Web Development, UI/UX Design, Digital Strategy',
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ByteBloom',
  url: 'https://bytebloom.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://bytebloom.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      <AccessibilityBar />
      
      {/* Hero Section - Bold & Creative */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border-4 border-blue-400/30 rotate-45"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border-4 border-cyan-400/30 rotate-12"></div>
          <div className="absolute top-1/2 right-1/3 w-16 h-16 border-4 border-indigo-400/30 rotate-45"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
          <div className="text-center max-w-6xl mx-auto">
            <FadeIn delay={0.1}>
              <div className="inline-block mb-8">
                <span className="px-6 py-3 bg-blue-100 text-blue-700 rounded-full text-sm font-bold tracking-wider uppercase">
                  Digital Innovation Studio
                </span>
              </div>
            </FadeIn>

            <KineticText>
              <FadeIn delay={0.2}>
                <h1 className="text-7xl md:text-9xl font-black mb-8 leading-tight bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 bg-clip-text text-transparent">
                  ByteBloom
                </h1>
              </FadeIn>
            </KineticText>
            
            <FadeIn delay={0.4}>
              <p className="text-3xl md:text-5xl mb-6 font-bold text-gray-900 leading-tight">
                Where Ideas Blossom into
              </p>
              <p className="text-3xl md:text-5xl mb-12 font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Digital Excellence
              </p>
            </FadeIn>
            
            <FadeIn delay={0.6}>
              <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-gray-600 font-semibold leading-relaxed">
                We craft extraordinary digital experiences that transform businesses, captivate audiences, and drive exceptional results. Your vision, our expertise, boundless possibilities.
              </p>
            </FadeIn>
            
            <FadeIn delay={0.8}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                <Link
                  href="/contact"
                  className="group relative px-12 py-6 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 text-white rounded-2xl font-bold text-xl shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-700 via-cyan-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative z-10 flex items-center">
                    Start Your Journey
                    <svg className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
                <Link
                  href="/portfolio"
                  className="group relative px-12 py-6 bg-white text-gray-900 rounded-2xl font-bold text-xl border-4 border-gray-900 hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  <span className="relative z-10 flex items-center">
                    Explore Our Work
                    <svg className="w-6 h-6 ml-2 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </span>
                </Link>
              </div>
            </FadeIn>
            
            <FadeIn delay={1.0}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {[
                  { number: '250+', label: 'Projects Delivered', icon: '🚀' },
                  { number: '98%', label: 'Client Satisfaction', icon: '⭐' },
                  { number: '15+', label: 'Years Experience', icon: '🎯' },
                  { number: '50+', label: 'Team Experts', icon: '👥' },
                ].map((stat, index) => (
                  <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-gray-200 hover:border-blue-500 transition-all duration-300 hover:scale-110 hover:shadow-2xl">
                    <div className="text-4xl mb-3">{stat.icon}</div>
                    <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <p className="text-sm font-bold text-gray-700">{stat.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* What We Do - Unique Grid Layout */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-transparent"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
          <FadeIn>
            <div className="text-center mb-20">
              <span className="inline-block px-6 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-bold mb-6 uppercase tracking-wider">
                Our Expertise
              </span>
              <h2 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-gray-900 via-blue-700 to-gray-900 bg-clip-text text-transparent">
                What We Create
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 font-semibold max-w-3xl mx-auto">
                We don't just build websites—we craft digital experiences that tell your story, engage your audience, and drive real business results.
              </p>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Digital Experiences',
                description: 'Immersive, user-centered designs that captivate and convert. Every pixel tells a story.',
                icon: '✨',
                gradient: 'from-blue-500 to-cyan-400',
                bgColor: 'bg-blue-50',
              },
              {
                title: 'Web Applications',
                description: 'Powerful, scalable solutions built with cutting-edge technology. Performance meets elegance.',
                icon: '💻',
                gradient: 'from-cyan-500 to-teal-400',
                bgColor: 'bg-cyan-50',
              },
              {
                title: 'Brand Identity',
                description: 'Visual narratives that resonate. We give your brand a voice that speaks volumes.',
                icon: '🎨',
                gradient: 'from-indigo-500 to-blue-400',
                bgColor: 'bg-indigo-50',
              },
              {
                title: 'E-Commerce Solutions',
                description: 'Seamless shopping experiences that turn visitors into loyal customers. Conversion optimized.',
                icon: '🛍️',
                gradient: 'from-purple-500 to-pink-400',
                bgColor: 'bg-purple-50',
              },
              {
                title: 'Mobile Experiences',
                description: 'Native and progressive apps that users love. Built for today, ready for tomorrow.',
                icon: '📱',
                gradient: 'from-pink-500 to-rose-400',
                bgColor: 'bg-pink-50',
              },
              {
                title: 'Digital Strategy',
                description: 'Data-driven insights that shape decisions. We help you navigate the digital landscape.',
                icon: '📊',
                gradient: 'from-orange-500 to-amber-400',
                bgColor: 'bg-orange-50',
              },
            ].map((service, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className={`group relative ${service.bgColor} rounded-3xl p-8 border-4 border-transparent hover:border-gray-900 transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10">
                    <div className="text-6xl mb-6 group-hover:scale-125 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black mb-4 text-gray-900 group-hover:text-blue-700 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-700 font-semibold leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  
                  <div className={`absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r ${service.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Creative Process Section */}
      <section className="py-32 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220%200%2060%2060%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
          <FadeIn>
            <div className="text-center mb-20">
              <span className="inline-block px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-bold mb-6 uppercase tracking-wider">
                Our Approach
              </span>
              <h2 className="text-6xl md:text-8xl font-black mb-6 text-white">
                How We Work
              </h2>
              <p className="text-xl md:text-2xl text-blue-200 font-semibold max-w-3xl mx-auto">
                A proven methodology that transforms ideas into exceptional digital products
              </p>
            </div>
          </FadeIn>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  title: 'Discover',
                  description: 'We dive deep into your world, understanding your goals, audience, and vision.',
                  color: 'blue',
                },
                {
                  step: '02',
                  title: 'Design',
                  description: 'Creative concepts come to life. We craft experiences that resonate and inspire.',
                  color: 'cyan',
                },
                {
                  step: '03',
                  title: 'Develop',
                  description: 'Cutting-edge technology meets flawless execution. We build with precision.',
                  color: 'indigo',
                },
                {
                  step: '04',
                  title: 'Deliver',
                  description: 'Your vision realized. We launch with confidence and support your success.',
                  color: 'purple',
                },
              ].map((item, index) => (
                <FadeIn key={index} delay={index * 0.2}>
                  <div className="relative group">
                    <div className={`absolute inset-0 bg-gradient-to-br from-${item.color}-500 to-${item.color}-700 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>
                    <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border-2 border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105">
                      <div className={`text-6xl font-black mb-4 bg-gradient-to-r from-${item.color}-400 to-${item.color}-200 bg-clip-text text-transparent`}>
                        {item.step}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black mb-4 text-white">
                        {item.title}
                      </h3>
                      <p className="text-blue-200 font-semibold leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Creative Layout */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
          <FadeIn>
            <div className="text-center mb-20">
              <span className="inline-block px-6 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-bold mb-6 uppercase tracking-wider">
                Client Stories
              </span>
              <h2 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-gray-900 via-blue-700 to-gray-900 bg-clip-text text-transparent">
                Success Stories
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 font-semibold max-w-3xl mx-auto">
                Don't just take our word for it—hear from the businesses we've transformed
              </p>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                name: 'Sarah Chen',
                role: 'CEO, TechVenture',
                content: 'ByteBloom transformed our digital presence completely. The attention to detail and creative approach exceeded all our expectations. Our conversions increased by 240%.',
                rating: 5,
                company: 'TechVenture Inc.',
              },
              {
                name: 'Marcus Rodriguez',
                role: 'Founder, DesignHub',
                content: 'Working with ByteBloom was transformative. They understood our vision and brought it to life in ways we never imagined. Exceptional team, exceptional results.',
                rating: 5,
                company: 'DesignHub Studios',
              },
              {
                name: 'Emily Park',
                role: 'Marketing Director, GrowthCo',
                content: 'ByteBloom doesn\'t just deliver projects—they deliver solutions that drive real business impact. Professional, creative, and results-driven. Highly recommended!',
                rating: 5,
                company: 'GrowthCo',
              },
            ].map((testimonial, index) => (
              <FadeIn key={index} delay={index * 0.15}>
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 border-4 border-gray-200 hover:border-blue-500 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-800 mb-8 leading-relaxed font-semibold text-lg">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  <div className="border-t-2 border-gray-300 pt-6">
                    <p className="font-black text-gray-900 text-xl mb-1">{testimonial.name}</p>
                    <p className="text-gray-600 font-semibold">{testimonial.role}</p>
                    <p className="text-blue-600 font-bold mt-2">{testimonial.company}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-blue-600 via-cyan-500 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%22100%22 height=%22100%22 viewBox=%220 0 100 100%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z%22 fill=%22%23ffffff%22 fill-opacity=%220.05%22 fill-rule=%22evenodd%22/%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
          <FadeIn>
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-6xl md:text-8xl font-black mb-8 text-white">
                Ready to Bloom?
              </h2>
              <p className="text-2xl md:text-3xl mb-12 text-blue-100 font-bold leading-relaxed">
                Let's transform your vision into an extraordinary digital experience that captivates, converts, and grows.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link
                  href="/contact"
                  className="group relative px-12 py-6 bg-white text-blue-600 rounded-2xl font-black text-xl shadow-2xl hover:shadow-white/50 transform hover:scale-110 transition-all duration-300"
                >
                  <span className="relative z-10 flex items-center">
                    Let's Talk
                    <svg className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
                <Link
                  href="/services"
                  className="group relative px-12 py-6 bg-transparent border-4 border-white text-white rounded-2xl font-black text-xl hover:bg-white/10 transition-all duration-300 transform hover:scale-110"
                >
                  <span className="relative z-10">Explore Services</span>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}

