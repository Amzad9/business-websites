'use client'

import Slider from 'react-slick'
import FadeIn from '@/components/FadeIn'
import testimonialsData from '@/content/testimonials.json'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

interface Testimonial {
  name: string
  role: string
  company: string
  content: string
  avatar?: string
}

// Custom Arrow Components
function SampleNextArrow(props: any) {
  const { onClick } = props
  return (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-16 bg-white border-4 border-gray-900 rounded-none shadow-2xl flex items-center justify-center text-gray-900 hover:bg-gray-900 hover:text-white hover:scale-110 hover:rotate-12 transition-all duration-300 z-20 font-black text-2xl"
      aria-label="Next testimonial"
    >
      →
    </button>
  )
}

function SamplePrevArrow(props: any) {
  const { onClick } = props
  return (
    <button
      onClick={onClick}
      className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-16 bg-white border-4 border-gray-900 rounded-none shadow-2xl flex items-center justify-center text-gray-900 hover:bg-gray-900 hover:text-white hover:scale-110 hover:-rotate-12 transition-all duration-300 z-20 font-black text-2xl"
      aria-label="Previous testimonial"
    >
      ←
    </button>
  )
}

export default function TestimonialContent() {
  const testimonials: Testimonial[] = testimonialsData

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
    arrows: true,
    fade: true,
    cssEase: 'linear',
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    customPaging: (i: number) => (
      <div className="w-4 h-4 bg-white border-2 border-gray-900 rounded-none mt-4"></div>
    ),
    dotsClass: 'slick-dots custom-dots',
  }

  return (
    <>
      {/* Hero Section - 2026 Trend: Kinetic Typography, Bold */}
      <section className="pt-24 pb-20 min-h-[70vh] relative overflow-hidden flex items-center bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white">
        {/* Animated Background Elements - 2026 Trend */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50 w-full">
          <div className="text-left">
            <h1 className="text-5xl md:text-9xl font-black mb-8 leading-tight text-white">
              TESTIMONIALS
            </h1>
            
            <p className="text-lg md:text-3xl text-white font-bold leading-relaxed">
              Real stories from clients who've experienced our transformative digital solutions
            </p>
          </div>
        </div>
      </section>

      {/* Testimonial Slider - Using Slick Carousel */}
      <section className="py-32 bg-white relative overflow-hidden border-y-4 border-gray-900">
        {/* Background Pattern - Brutalist - 2026 Trend */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23000' stroke-width='2'%3E%3Cpath d='M0 0h80v80H0z'/%3E%3Cpath d='M20 20h40v40H20z'/%3E%3Cpath d='M30 30h20v20H30z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
          <div>
            <Slider {...settings}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="px-4">
                  <div className="bg-white border-4 border-gray-900 rounded-none p-12 md:p-20 shadow-2xl relative">
                    {/* Decorative Corner Elements - 2026 Trend */}
                    <div className="absolute top-0 left-0 w-20 h-20 border-r-4 border-b-4 border-blue-600"></div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 border-t-4 border-l-4 border-cyan-500"></div>
                    
                    {/* Quote Icon - Bold - 2026 Trend */}
                    <div className="mb-10">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-none border-4 border-gray-900 flex items-center justify-center transform rotate-12">
                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                        </svg>
                      </div>
                    </div>

                    {/* Testimonial Content - Brutalist Typography */}
                    <div className="mb-12 pl-8 border-l-4 border-blue-600">
                      <p className="text-xl md:text-3xl text-gray-900 font-black leading-tight mb-8 uppercase tracking-tight">
                        "{testimonial.content}"
                      </p>
                    </div>

                    {/* Author Info - Asymmetric Layout - 2026 Trend */}
                    <div className="flex items-center gap-8 border-t-4 border-gray-900 pt-8">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-none border-4 border-gray-900 flex items-center justify-center text-white text-2xl font-black transform -rotate-12">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-2 uppercase tracking-tight">
                          {testimonial.name}
                        </h3>
                        <p className="text-lg text-gray-600 font-bold">
                          {testimonial.role}
                        </p>
                        <p className="text-xl text-blue-600 font-black uppercase tracking-wider mt-2">
                          {testimonial.company}
                        </p>
                      </div>
                      {/* Rating Stars - 2026 Trend */}
                      <div className="flex gap-2">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-6 h-6 bg-yellow-400 border-2 border-gray-900 rounded-none transform rotate-12"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* Stats Section - Light Gradient Background */}
      <section className="py-32 bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 relative overflow-hidden border-t-4 border-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '500+', label: 'Happy Clients', color: 'from-blue-500 to-cyan-400' },
              { number: '98%', label: 'Satisfaction', color: 'from-cyan-500 to-teal-400' },
              { number: '200+', label: 'Projects', color: 'from-indigo-500 to-blue-400' },
              { number: '15+', label: 'Years', color: 'from-purple-500 to-pink-400' },
            ].map((stat, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className={`bg-gradient-to-br ${stat.color} rounded-none border-4 border-gray-900 p-8 text-center transform hover:scale-110 hover:-rotate-2 transition-all duration-300 shadow-2xl`}>
                  <div className="text-2xl md:text-4xl font-black mb-4 text-white">
                    {stat.number}
                  </div>
                  <div className="text-white font-black text-sm uppercase tracking-widest">
                    {stat.label}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
