import { Metadata } from 'next'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'About ByteBloom - Where Ideas Blossom into Digital Excellence',
  description: 'Learn about ByteBloom, our mission to craft extraordinary digital experiences, and the passionate team behind every project.',
}

export default function About() {
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
              ABOUT
            </h1>
            
            <p className="text-lg md:text-3xl text-white font-bold max-w-3xl leading-relaxed">
              Where creativity meets technology, and ideas blossom into extraordinary digital experiences
            </p>
          </div>
        </div>
      </section>

      {/* Story Section - Creative Layout */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-transparent"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn delay={0.1}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-3xl blur-3xl opacity-20 transform rotate-3"></div>
                <div className="relative bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-12 border-4 border-gray-200 shadow-2xl">
                  <h2 className="text-2xl md:text-7xl font-black mb-6 text-gray-900">
                    Our Journey
                  </h2>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed font-semibold">
                    ByteBloom was born from a simple belief: every great idea deserves to bloom. We are not just developers or designers—we are digital storytellers, creative problem-solvers, and innovation catalysts.
                  </p>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed font-semibold">
                    Since our inception, we have been on a mission to transform the digital landscape, one project at a time. We have worked with startups, enterprises, and visionaries who share our passion for excellence.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed font-semibold">
                    Today, ByteBloom stands as a testament to what is possible when creativity meets cutting-edge technology. We are constantly evolving, learning, and pushing boundaries to deliver experiences that do not just meet expectations—they exceed them.
                  </p>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl p-8 text-white shadow-xl hover:scale-105 transition-transform duration-300">
                  <div className="text-2xl font-black mb-4">250+</div>
                  <div className="text-xl font-bold">Projects Delivered</div>
                </div>
                <div className="bg-gradient-to-br from-indigo-500 to-blue-400 rounded-2xl p-8 text-white shadow-xl hover:scale-105 transition-transform duration-300">
                  <div className="text-2xl font-black mb-4">98%</div>
                  <div className="text-xl font-bold">Client Satisfaction</div>
                </div>
                <div className="bg-gradient-to-br from-cyan-500 to-teal-400 rounded-2xl p-8 text-white shadow-xl hover:scale-105 transition-transform duration-300">
                  <div className="text-2xl font-black mb-4">15+</div>
                  <div className="text-xl font-bold">Years Experience</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-pink-400 rounded-2xl p-8 text-white shadow-xl hover:scale-105 transition-transform duration-300">
                  <div className="text-2xl font-black mb-4">50+</div>
                  <div className="text-xl font-bold">Team Experts</div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values Section - Creative Cards */}
      <section className="py-32 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
          <FadeIn>
            <div className="text-center mb-20">
              <span className="inline-block px-6 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-bold mb-6 uppercase tracking-wider">
                Our Values
              </span>
              <h2 className="text-2xl md:text-7xl font-black mb-6 bg-gradient-to-r from-gray-900 via-blue-700 to-gray-900 bg-clip-text text-transparent">
                What Drives Us
              </h2>
              <p className="text-xl text-gray-600 font-semibold">
                The principles that guide every decision, every design, and every line of code
              </p>
            </div>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Innovation First',
                description: 'We embrace cutting-edge technology and creative solutions. Every project is an opportunity to push boundaries and explore new possibilities.',
                icon: '💡',
                gradient: 'from-blue-500 to-cyan-400',
                bgColor: 'bg-blue-50',
              },
              {
                title: 'Client Success',
                description: 'Your success is our success. We are committed to understanding your goals and delivering solutions that drive real business results.',
                icon: '🎯',
                gradient: 'from-cyan-500 to-teal-400',
                bgColor: 'bg-cyan-50',
              },
              {
                title: 'Excellence Always',
                description: 'We do not compromise on quality. Every detail matters, every interaction counts, and every project reflects our commitment to excellence.',
                icon: '⭐',
                gradient: 'from-indigo-500 to-blue-400',
                bgColor: 'bg-indigo-50',
              },
            ].map((value, index) => (
              <FadeIn key={index} delay={index * 0.15}>
                <div className={`group relative ${value.bgColor} rounded-3xl p-10 border-4 border-transparent hover:border-gray-900 transition-all duration-500 hover:scale-105 hover:shadow-2xl`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}></div>
                  <div className="relative z-10">
                    <div className="text-2xl mb-6 group-hover:scale-125 transition-transform duration-300">
                      {value.icon}
                    </div>
                    <h3 className="text-xl md:text-3xl font-black mb-4 text-gray-900 group-hover:text-blue-700 transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-gray-700 font-semibold leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                  <div className={`absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r ${value.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
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
              <span className="inline-block px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-bold mb-6 uppercase tracking-wider">
                Our Mission
              </span>
              <h2 className="text-2xl md:text-7xl font-black mb-8 text-white max-w-4xl mx-auto">
                To Empower Digital Transformation
              </h2>
              <p className="text-base md:text-2xl text-blue-100 font-semibold leading-relaxed mb-12 max-w-4xl mx-auto">
                We are on a mission to help businesses thrive in the digital age. Through innovative design, cutting-edge development, and strategic thinking, we empower organizations to reach their full potential and create lasting impact.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-gray-900 rounded-none font-black text-xl uppercase tracking-widest border-4 border-white hover:bg-blue-50 hover:border-blue-50 transform hover:scale-110 transition-all duration-300 shadow-2xl"
              >
                Let Us Work Together
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
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
