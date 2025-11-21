import { Metadata } from 'next'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Services - ByteBloom | Where Ideas Blossom into Digital Excellence',
  description: 'Comprehensive digital services that transform businesses. From design to development, we deliver exceptional solutions tailored to your needs.',
}

const services = [
  {
    title: 'Digital Experience Design',
    description: 'Immersive, user-centered designs that captivate and convert. Every pixel tells a story, every interaction creates emotion.',
    icon: '✨',
    gradient: 'from-blue-500 to-cyan-400',
    bgColor: 'bg-blue-50',
    features: ['UI/UX Design', 'Brand Identity', 'User Research', 'Design Systems'],
  },
  {
    title: 'Web Development',
    description: 'Powerful, scalable solutions built with cutting-edge technology. Performance meets elegance in every line of code.',
    icon: '💻',
    gradient: 'from-cyan-500 to-teal-400',
    bgColor: 'bg-cyan-50',
    features: ['Custom Development', 'E-Commerce', 'Progressive Web Apps', 'API Integration'],
  },
  {
    title: 'Mobile Applications',
    description: 'Native and progressive apps that users love. Built for today, ready for tomorrow, optimized for every device.',
    icon: '📱',
    gradient: 'from-indigo-500 to-blue-400',
    bgColor: 'bg-indigo-50',
    features: ['iOS Development', 'Android Development', 'React Native', 'Flutter'],
  },
  {
    title: 'E-Commerce Solutions',
    description: 'Seamless shopping experiences that turn visitors into loyal customers. Conversion optimized, revenue driven.',
    icon: '🛍️',
    gradient: 'from-purple-500 to-pink-400',
    bgColor: 'bg-purple-50',
    features: ['Online Stores', 'Payment Integration', 'Inventory Management', 'Order Processing'],
  },
  {
    title: 'Digital Strategy',
    description: 'Data-driven insights that shape decisions. We help you navigate the digital landscape with confidence and clarity.',
    icon: '📊',
    gradient: 'from-orange-500 to-amber-400',
    bgColor: 'bg-orange-50',
    features: ['Market Analysis', 'Competitive Research', 'Growth Strategy', 'Performance Metrics'],
  },
  {
    title: 'Brand & Identity',
    description: 'Visual narratives that resonate. We give your brand a voice that speaks volumes and a presence that commands attention.',
    icon: '🎨',
    gradient: 'from-pink-500 to-rose-400',
    bgColor: 'bg-pink-50',
    features: ['Logo Design', 'Brand Guidelines', 'Visual Identity', 'Marketing Materials'],
  },
]

export default function Services() {
  return (
    <>
      {/* Hero Section - Similar to Portfolio/Blog */}
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
              SERVICES
            </h1>
            
            <p className="text-lg md:text-3xl text-white font-bold max-w-3xl leading-relaxed">
              Comprehensive digital solutions that transform businesses and drive exceptional results
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid - Creative Layout */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-transparent"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
          <FadeIn>
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <span className="inline-block px-6 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-bold mb-6 uppercase tracking-wider">
                Our Expertise
              </span>
              <h2 className="text-2xl md:text-7xl font-black mb-6 bg-gradient-to-r from-gray-900 via-blue-700 to-gray-900 bg-clip-text text-transparent">
                What We Create
              </h2>
              <p className="text-xl text-gray-600 font-semibold">
                We don't just build—we craft experiences, create solutions, and drive transformation
              </p>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className={`group relative ${service.bgColor} rounded-3xl p-8 border-4 border-transparent hover:border-gray-900 transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10">
                    <div className="text-2xl mb-6 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-xl md:text-3xl font-black mb-4 text-gray-900 group-hover:text-blue-700 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-700 font-semibold leading-relaxed mb-6">
                      {service.description}
                    </p>
                    
                    <div className="border-t-2 border-gray-200 pt-6">
                      <div className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-gray-700 font-semibold">
                            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className={`absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r ${service.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-blue-600 via-cyan-600 to-indigo-700 relative overflow-hidden text-white">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
          <FadeIn>
            <div className="text-center">
              <h2 className="text-2xl md:text-7xl font-black mb-8 text-white">
                Ready to Transform Your Business?
              </h2>
              <p className="text-base md:text-2xl text-blue-100 font-semibold leading-relaxed mb-12">
                Let's discuss how our services can help you achieve your goals and drive exceptional results.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-12 py-6 bg-white text-gray-900 rounded-none font-black text-xl uppercase tracking-widest border-4 border-white hover:bg-blue-50 hover:border-blue-50 transform hover:scale-110 transition-all duration-300 shadow-2xl"
                >
                  Get Started Today
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-3 px-12 py-6 bg-transparent border-4 border-white text-white rounded-none font-black text-xl uppercase tracking-widest hover:bg-white/10 transition-all duration-300 transform hover:scale-110"
                >
                  View Our Work
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-32 bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-[900px] mx-auto">
            <FadeIn>
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-7xl font-black mb-6 text-gray-900">
                  Send Us A Message
                </h2>
                <p className="text-base md:text-2xl text-gray-700 font-semibold leading-relaxed">
                  Have a project in mind? We'd love to hear from you. Send us a message and let's bring your ideas to life.
                </p>
              </div>
            </FadeIn>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
