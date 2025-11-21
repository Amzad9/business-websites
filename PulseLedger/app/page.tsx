import { Metadata } from 'next'
import FadeIn from '@/components/FadeIn'
import KineticText from '@/components/KineticText'
import Link from 'next/link'
import EnhancedCursor from '@/components/EnhancedCursor'
import AccessibilityBar from '@/components/AccessibilityBar'

export const metadata: Metadata = {
  title: 'Home',
  description: 'PulseLedger delivers cutting-edge solutions to transform your business.',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PulseLedger',
  url: 'https://pulseledger.com',
  logo: 'https://pulseledger.com/logo.png',
  description: 'PulseLedger - Leading web design company in India and internationally. Cutting-edge solutions to transform your business.',
  slogan: 'Transforming businesses with innovative solutions',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN',
    addressLocality: 'India',
  },
  sameAs: [
    'https://twitter.com/pulseledger',
    'https://linkedin.com/company/pulseledger',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '100+',
  },
  areaServed: ['IN', 'Worldwide'],
  serviceType: 'Web Design, Web Development, UI/UX Design',
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'PulseLedger',
  url: 'https://pulseledger.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://pulseledger.com/search?q={search_term_string}',
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

      <EnhancedCursor />
      <AccessibilityBar />
      
      {/* Section 1: Hero Area - Complex and Awe-Inspiring */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-white">
        <div className="absolute inset-0 bg-gradient-brilliant opacity-1 animate-gradient-shift bg-[length:200%_200%]" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/3 via-accent-400/2 to-primary-600/3" />
        <div className="absolute inset-0 bg-white"></div>
        
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/3 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-400/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
          <div className="text-center">
            <KineticText>
              <FadeIn>
                <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight text-black">
                  Welcome to PulseLedger
                </h1>
              </FadeIn>
            </KineticText>
            
            <FadeIn delay={0.2}>
              <p className="text-xl md:text-3xl mb-12 max-w-4xl mx-auto font-bold text-black">
                Transforming businesses with <span className="text-primary-700">innovative solutions</span> and cutting-edge technology
              </p>
            </FadeIn>
            
            <FadeIn delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link
                  href="/contact"
                  className="group relative px-10 py-5 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-bold text-lg hover:from-primary-500 hover:to-primary-400 transition-all duration-300 shadow-2xl hover:shadow-primary-500/50 transform hover:scale-110 active:scale-95 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-500 rounded-xl"></span>
                  <span className="relative z-10 flex items-center">
                    Get Started
                    <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </Link>
                <Link
                  href="/services"
                  className="group relative px-10 py-5 bg-white text-primary-700 rounded-xl font-bold text-lg border-2 border-primary-700 hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-110 active:scale-95 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-primary-700/10 transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></span>
                  <span className="relative z-10">Our Services</span>
                </Link>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.6}>
              <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-base font-semibold">
                <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-lg shadow-lg border-2 border-gray-300">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-black font-bold">100+ Projects Delivered</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-lg shadow-lg border-2 border-gray-300">
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-black font-bold">5.0 Rating</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-lg shadow-lg border-2 border-gray-300">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-black font-bold">24/7 Support</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Section 2: Why Choose Us - Feature Cards */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-3">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-400/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
          <KineticText>
            <FadeIn>
              <h2 className="text-5xl md:text-6xl font-black text-center mb-16 text-black">
                Why Choose PulseLedger?
              </h2>
            </FadeIn>
          </KineticText>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Innovation',
                description: 'Cutting-edge solutions tailored to your needs',
                icon: '🚀',
                gradient: 'from-primary-500 to-primary-600',
              },
              {
                title: 'Expertise',
                description: 'Years of experience in delivering excellence',
                icon: '⭐',
                gradient: 'from-accent-400 to-accent-500',
              },
              {
                title: 'Results',
                description: 'Proven track record of successful projects',
                icon: '📈',
                gradient: 'from-primary-400 to-accent-500',
              },
            ].map((feature, index) => (
              <FadeIn key={index} delay={index * 0.15}>
                <div className="group relative p-8 bg-white border-2 border-gray-300 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:border-primary-500 hover:-translate-y-2 hover:scale-105">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    <div className="text-6xl mb-6 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">
                      {feature.icon}
                    </div>
                    <h3 className="text-3xl font-bold mb-4 text-black group-hover:text-primary-700 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-black text-lg leading-relaxed font-semibold">
                      {feature.description}
                    </p>
                  </div>
                  
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Services - Bold Colors and Gradients */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-accent-400/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black mb-6 text-black">
                Services & <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">Solutions</span>
              </h2>
              <p className="text-xl text-black/80 max-w-3xl mx-auto font-semibold">
                Comprehensive solutions to elevate your digital presence
              </p>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Web Design',
                description: 'Stunning, responsive designs that convert visitors into customers',
                gradient: 'from-primary-500 via-primary-600 to-accent-500',
                icon: '🎨',
              },
              {
                title: 'Development',
                description: 'High-performance websites built with modern technologies',
                gradient: 'from-accent-400 via-accent-500 to-primary-500',
                icon: '💻',
              },
              {
                title: 'UI/UX Design',
                description: 'User-centered design that creates exceptional experiences',
                gradient: 'from-primary-400 via-accent-400 to-primary-600',
                icon: '✨',
              },
              {
                title: 'Consulting',
                description: 'Strategic guidance to grow your online presence',
                gradient: 'from-accent-500 via-primary-500 to-accent-600',
                icon: '📊',
              },
            ].map((service, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-200 hover:border-primary-500 hover:-translate-y-2 hover:scale-105">
                  <div className={`h-2 bg-gradient-to-r ${service.gradient}`} />
                  <div className="p-8">
                    <div className="text-5xl mb-4">{service.icon}</div>
                    <h3 className="text-2xl font-bold mb-3 text-black group-hover:text-primary-700 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-black/80 leading-relaxed font-semibold">
                      {service.description}
                    </p>
                  </div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Statistics - Impressive Numbers */}
      <section className="py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-400/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
          <FadeIn>
            <h2 className="text-5xl md:text-6xl font-black text-center mb-16 text-black">
              Our Impact in Numbers
            </h2>
          </FadeIn>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Projects Completed', icon: '🚀' },
              { number: '98%', label: 'Client Satisfaction', icon: '⭐' },
              { number: '50+', label: 'Team Members', icon: '👥' },
              { number: '10+', label: 'Years Experience', icon: '🎯' },
            ].map((stat, index) => (
              <FadeIn key={index} delay={index * 0.15}>
                <div className="text-center p-8 bg-white rounded-2xl shadow-xl border-2 border-gray-200 hover:border-primary-500 transition-all duration-500 hover:scale-110 hover:rotate-2 hover:shadow-2xl">
                  <div className="text-5xl mb-4">{stat.icon}</div>
                  <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent mb-3">
                    {stat.number}
                  </div>
                  <p className="text-black font-bold text-lg">{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Process - How We Work */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-0 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-accent-400/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black mb-6 text-black">
                How We <span className="text-primary-700">Work</span>
              </h2>
              <p className="text-xl text-black/80 max-w-3xl mx-auto font-semibold">
                A proven process that delivers exceptional results
              </p>
            </div>
          </FadeIn>
          
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 via-accent-400 to-primary-600 hidden md:block" />
            
            <div className="space-y-12">
              {[
                {
                  step: '01',
                  title: 'Discovery',
                  description: 'We understand your business goals and target audience to create a strategic roadmap.',
                  icon: '🔍',
                  color: 'primary',
                },
                {
                  step: '02',
                  title: 'Design',
                  description: 'Our creative team designs stunning interfaces that align with your brand identity.',
                  icon: '🎨',
                  color: 'accent',
                },
                {
                  step: '03',
                  title: 'Development',
                  description: 'We build robust, scalable solutions using cutting-edge technologies and best practices.',
                  icon: '⚙️',
                  color: 'primary',
                },
                {
                  step: '04',
                  title: 'Launch & Support',
                  description: 'We ensure smooth deployment and provide ongoing support to keep your platform running perfectly.',
                  icon: '🚀',
                  color: 'accent',
                },
              ].map((item, index) => (
                <FadeIn key={index} delay={index * 0.15}>
                  <div className="relative md:flex items-center gap-8 p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl border-2 border-gray-200 hover:border-primary-500 transition-all duration-500 hover:translate-x-2">
                    <div className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-${item.color === 'primary' ? 'primary' : 'accent'}-500 to-${item.color === 'primary' ? 'primary' : 'accent'}-600 flex items-center justify-center text-white font-black text-xl shadow-lg hidden md:flex`}>
                      {item.step}
                    </div>
                    <div className="md:ml-12">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-4xl">{item.icon}</span>
                        <h3 className="text-3xl font-bold text-black">{item.title}</h3>
                      </div>
                      <p className="text-black/80 text-lg leading-relaxed font-semibold">
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

      {/* Section 6: Testimonials - Social Proof */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent-400/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black mb-6 text-black">
                What Our <span className="text-primary-700">Clients Say</span>
              </h2>
              <p className="text-xl text-black/80 max-w-3xl mx-auto font-semibold">
                Trusted by businesses worldwide
              </p>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'CEO, TechStart Inc.',
                content: 'PulseLedger transformed our digital presence completely. Their innovative approach and attention to detail exceeded our expectations.',
                rating: 5,
              },
              {
                name: 'Michael Chen',
                role: 'Founder, DesignCo',
                content: 'Working with PulseLedger was a game-changer. They delivered on time and created something truly exceptional for our business.',
                rating: 5,
              },
              {
                name: 'Emily Rodriguez',
                role: 'Marketing Director, GrowthHub',
                content: 'Professional, creative, and results-driven. PulseLedger helped us achieve our goals faster than we imagined possible.',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <FadeIn key={index} delay={index * 0.15}>
                <div className="p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl border-2 border-gray-200 hover:border-primary-500 transition-all duration-500 hover:-translate-y-2 hover:scale-105">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-black/80 mb-6 leading-relaxed font-semibold text-lg">
                    "{testimonial.content}"
                  </p>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="font-bold text-black text-lg">{testimonial.name}</p>
                    <p className="text-black/60 font-semibold">{testimonial.role}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: CTA - Call to Action */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-400/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
          <FadeIn>
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-5xl md:text-7xl font-black mb-6 text-black">
                Ready to Transform Your Business?
              </h2>
              <FadeIn delay={0.2}>
                <p className="text-2xl md:text-3xl mb-12 text-black/80 font-bold">
                  Let's create something extraordinary together
                </p>
              </FadeIn>
              <FadeIn delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link
                  href="/contact"
                  className="group relative px-12 py-6 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-bold text-xl hover:from-primary-500 hover:to-primary-400 transition-all duration-300 shadow-2xl hover:shadow-primary-500/50 transform hover:scale-110 active:scale-95 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-500 rounded-xl"></span>
                  <span className="relative z-10 flex items-center">
                    Get Started Today
                    <span className="inline-block ml-2 group-hover:translate-x-2 transition-transform">→</span>
                  </span>
                </Link>
                <Link
                  href="/services"
                  className="group relative px-12 py-6 bg-white text-primary-700 rounded-xl font-bold text-xl border-2 border-primary-700 hover:bg-gray-50 transition-all duration-300 shadow-xl transform hover:scale-110 active:scale-95"
                >
                  <span className="relative z-10">Learn More</span>
                </Link>
              </div>
              </FadeIn>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Section 8: Contact Form */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent-400/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black mb-6 text-black">
                Get In <span className="text-primary-700">Touch</span>
              </h2>
              <p className="text-xl text-black/80 max-w-3xl mx-auto font-semibold">
                Have a project in mind? Let's discuss how we can help bring your vision to life.
              </p>
            </div>
          </FadeIn>
          
          <div className="max-w-4xl mx-auto">
            <FadeIn delay={0.2}>
              <form className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold mb-2 text-black">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 bg-white text-black font-semibold focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 outline-none"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold mb-2 text-black">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 bg-white text-black font-semibold focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 outline-none"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold mb-2 text-black">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 bg-white text-black font-semibold focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 outline-none"
                      placeholder="+91 123 456 7890"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-bold mb-2 text-black">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 bg-white text-black font-semibold focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 outline-none"
                      placeholder="Project Inquiry"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-bold mb-2 text-black">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 bg-white text-black font-semibold focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 outline-none resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>
                
                <div className="text-center">
                  <button
                    type="submit"
                    className="group relative px-12 py-5 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-bold text-lg hover:from-primary-500 hover:to-primary-400 transition-all duration-300 shadow-2xl hover:shadow-primary-500/50 transform hover:scale-110 active:scale-95 overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-500 rounded-xl"></span>
                    <span className="relative z-10 flex items-center justify-center">
                      Send Message
                      <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </button>
                </div>
              </form>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}
