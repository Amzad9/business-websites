'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Palette, Code, Sparkles, TrendingUp, Megaphone, BarChart3 } from 'lucide-react'
import { SmoothAnimate, StaggerContainer } from './SmoothAnimate'

export default function HomeContent() {
  return (
    <>
      {/* Hero Section - Text-Only Hero (Trend #17) with Bold Typography - Responsive */}
      <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center pt-32 pb-12 sm:pt-40 sm:pb-10 px-4 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 overflow-hidden">
        {/* Organic Shapes Background (Trend #15) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-amber-200/30 to-orange-300/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-rose-200/30 to-pink-300/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -30, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />
        </div>
        
        <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto">
            {/* Asymmetrical Layout (Anti-Design Trend #3) - Responsive */}
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <motion.div
                className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="space-y-6">
                  <motion.h1
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <motion.span
                      className="block text-amber-900"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      Digital Agency
                    </motion.span>
                   
                    <motion.span
                      className="block text-rose-600 text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      Creative Excellence
                    </motion.span>
                  </motion.h1>
            
                  <motion.p
                    className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-amber-900/80 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    We craft exceptional digital experiences that drive growth, innovation, and measurable results for ambitious brands.
                  </motion.p>
                </div>
            
                {/* Big Block CTAs with Vivid Contrast (Trend #6) - Thumb-Friendly Mobile */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 sm:gap-4 pt-6 sm:pt-8 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <Link
                    href="/contact"
                    className="group relative px-8 sm:px-10 py-5 sm:py-6 bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white rounded-2xl font-bold text-lg sm:text-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-amber-300 overflow-hidden touch-manipulation"
                    style={{ minHeight: '56px', minWidth: '160px' }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      Start Your Project
                      <motion.svg
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </motion.svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-700 via-orange-700 to-rose-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </Link>
                  
                  <Link
                    href="/portfolio"
                    className="px-8 sm:px-10 py-5 sm:py-6 bg-white text-amber-900 rounded-2xl font-bold text-lg sm:text-xl border-4 border-amber-900 hover:bg-amber-50 active:scale-95 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-amber-300 touch-manipulation"
                    style={{ minHeight: '56px', minWidth: '160px' }}
                  >
                    View Our Work
                  </Link>
                </motion.div>
              </motion.div>
              
              {/* Organic Shape Blending with Content - Hidden on Mobile */}
              <motion.div
                className="hidden lg:block lg:col-span-5 relative"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.div
                  className="relative aspect-square"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="relative w-full h-full rounded-3xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=800&fit=crop"
                      alt="Digital Agency Team"
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-rose-400/20"></div>
                    <svg className="absolute bottom-0 left-0 w-full h-1/3" viewBox="0 0 400 200" preserveAspectRatio="none" aria-hidden="true">
                      <path d="M0,200 Q100,100 200,150 T400,100 L400,200 Z" fill="rgba(251, 191, 36, 0.3)" className="organic-shape"/>
                    </svg>
                  </div>
                </motion.div>
              </motion.div>
            </div>
        
            {/* Trust Indicators - Big Blocks - Responsive */}
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-6 mt-12 sm:mt-20 pt-8 sm:pt-12 border-t-4 border-amber-900/20" staggerDelay={0.15}>
              {[
                { number: '500+', label: 'Projects Delivered' },
                { number: '98%', label: 'Client Satisfaction' },
                { number: '10+', label: 'Years Experience' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-4xl sm:text-5xl md:text-6xl font-black text-amber-900 mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <p className="text-base sm:text-lg font-semibold text-amber-900/70">{stat.label}</p>
                </motion.div>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Services Section - Big Blocks with Vivid Contrast (Trend #6) - Responsive */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SmoothAnimate direction="up" delay={0.2}>
            <div className="text-center mb-12 sm:mb-16 lg:mb-20 space-y-4 sm:space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-amber-900 leading-[1.1]">
                What We Do
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-amber-900/70 max-w-3xl mx-auto font-medium px-4">
                Comprehensive digital solutions for modern businesses
              </p>
            </div>
          </SmoothAnimate>
          
          {/* Big Block Grid - 6 Cards in 2 Rows of 3 - Responsive */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" staggerDelay={0.15}>
            {[
              {
                title: 'Web Design',
                description: 'Stunning, user-centered designs that convert. We create digital experiences that captivate and engage your audience.',
                bgGradient: 'from-amber-500 to-orange-600',
                icon: Palette,
              },
              {
                title: 'Development',
                description: 'High-performance websites and applications built with cutting-edge technologies and best practices.',
                bgGradient: 'from-orange-500 to-rose-600',
                icon: Code,
              },
              {
                title: 'UI/UX Design',
                description: 'User-centered design that creates exceptional experiences and drives engagement through intuitive interfaces.',
                bgGradient: 'from-rose-500 to-pink-600',
                icon: Sparkles,
              },
              {
                title: 'Strategic Consulting',
                description: 'Expert guidance to grow your online presence and achieve your business objectives with data-driven insights.',
                bgGradient: 'from-amber-600 to-yellow-600',
                icon: TrendingUp,
              },
              {
                title: 'Digital Marketing',
                description: 'Data-driven marketing strategies that drive growth, engagement, and measurable ROI across all channels.',
                bgGradient: 'from-orange-600 to-amber-600',
                icon: Megaphone,
              },
              {
                title: 'Analytics & Insights',
                description: 'Advanced analytics and reporting to optimize performance and make informed business decisions.',
                bgGradient: 'from-rose-600 to-pink-600',
                icon: BarChart3,
              },
            ].map((service, index) => {
              const IconComponent = service.icon
              return (
              <motion.div
                key={index}
                whileHover={{ y: -16, scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href="/services"
                  className="group relative block h-[400px] sm:h-[450px] lg:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl hover:shadow-amber-500/50 active:scale-[0.98] transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-amber-300 touch-manipulation"
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-90`}
                    whileHover={{ opacity: 1, scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  <div className="relative h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 text-white">
                    {/* Icon at Top */}
                    <motion.div
                      className="mb-auto"
                      initial={{ opacity: 0, y: -20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                        <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" strokeWidth={2.5} />
                      </div>
                    </motion.div>
                    
                    {/* Content at Bottom */}
                    <div className="space-y-3 sm:space-y-4">
                      <motion.h3
                        className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.1]"
                        initial={{ x: 0 }}
                        whileHover={{ x: 16 }}
                        transition={{ duration: 0.3 }}
                      >
                        {service.title}
                      </motion.h3>
                      <p className="text-base sm:text-lg lg:text-xl font-medium opacity-90 max-w-md leading-relaxed">
                        {service.description}
                      </p>
                      <motion.div
                        className="flex items-center gap-2 sm:gap-3 pt-3 sm:pt-4 text-base sm:text-lg font-bold"
                        initial={{ x: 0 }}
                        whileHover={{ x: 16 }}
                        transition={{ duration: 0.3 }}
                      >
                        Learn More
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* About/Process Section - Negative Space Emphasis (Trend #12) with Organic Shapes - Responsive */}
      <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-white via-amber-50/30 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto">
            <SmoothAnimate direction="up" delay={0.2}>
              <div className="mb-12 sm:mb-16 lg:mb-20 space-y-6 sm:space-y-12">
                <div className="text-center space-y-4 sm:space-y-6 px-4">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-amber-900 leading-[1.1]">
                    How We Work
                  </h2>
                  <p className="text-lg sm:text-xl md:text-2xl text-amber-900/70 max-w-3xl mx-auto font-medium leading-relaxed">
                    A proven process that delivers exceptional results through collaboration and innovation
                  </p>
                </div>
              </div>
            </SmoothAnimate>
            
            {/* Process Steps with Images and Organic Shapes - Responsive */}
            <StaggerContainer className="space-y-8 sm:space-y-12" staggerDelay={0.2}>
              {[
                {
                  step: '01',
                  title: 'Discover',
                  description: 'We dive deep into understanding your business, goals, and audience to create a strategic roadmap.',
                  image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=800&fit=crop&q=80',
                  gradient: 'from-amber-600/60 via-orange-500/50 to-rose-500/60',
                },
                {
                  step: '02',
                  title: 'Design',
                  description: 'Our creative team designs stunning, user-centered experiences that align with your brand identity.',
                  image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop&q=80',
                  gradient: 'from-orange-600/60 via-rose-500/50 to-pink-500/60',
                },
                {
                  step: '03',
                  title: 'Develop',
                  description: 'We build robust, scalable solutions using cutting-edge technologies and best practices.',
                  image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&q=80',
                  gradient: 'from-rose-600/60 via-pink-500/50 to-amber-500/60',
                },
                {
                  step: '04',
                  title: 'Launch',
                  description: 'We ensure smooth deployment and provide ongoing support to keep your platform running perfectly.',
                  image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&q=80',
                  gradient: 'from-amber-500/60 via-orange-600/50 to-yellow-500/60',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-6 sm:gap-8 items-center group`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="flex-1 relative w-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl group-hover:shadow-2xl transition-all duration-500">
                      <motion.div
                        className="relative w-full h-full"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.7 }}
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                      {/* Enhanced Gradient Overlay - Blending Photos with Graphical Elements (Trend #21) */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}
                        whileHover={{ opacity: 0.4 }}
                        transition={{ duration: 0.3 }}
                      />
                      <svg className={`absolute ${index % 2 === 0 ? 'top-0 right-0' : 'bottom-0 left-0'} w-1/3 h-full opacity-50`} viewBox="0 0 200 600" preserveAspectRatio="none" aria-hidden="true">
                        <path d="M0,0 Q50,300 100,600 T200,0" fill="rgba(251, 191, 36, 0.4)" className="organic-shape"/>
                      </svg>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    className="flex-1 space-y-4 sm:space-y-5 text-center lg:text-left"
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <motion.div
                      className="inline-flex items-center gap-3 sm:gap-4"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-br from-amber-600 to-orange-600 text-white rounded-full text-lg sm:text-xl font-black shadow-lg">
                        {item.step}
                      </div>
                    </motion.div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-amber-900 leading-[1.1]">
                      {item.title}
                    </h3>
                    <p className="text-base sm:text-lg text-amber-900/70 leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Portfolio Preview - Redesigned with Better Layout - Responsive */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <SmoothAnimate direction="up" delay={0.2}>
              <div className="mb-12 sm:mb-16 text-center space-y-3 sm:space-y-4 px-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-amber-900 leading-[1.1]">
                  Featured Work
                </h2>
                <p className="text-lg sm:text-xl text-amber-900/70 max-w-2xl mx-auto font-medium">
                  Explore our portfolio of successful projects and creative solutions
                </p>
              </div>
            </SmoothAnimate>
            
            {/* Improved Grid Layout - Clean Design with Better Images & Gradients - Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {[
                {
                  title: 'Tech Startup Platform',
                  category: 'Web Development',
                  image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=800&fit=crop&q=80',
                  gradient: 'from-amber-600/85 via-orange-500/80 to-rose-500/85',
                },
                {
                  title: 'E-commerce Brand',
                  category: 'Brand & Design',
                  image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop&q=80',
                  gradient: 'from-orange-600/85 via-rose-500/80 to-pink-500/85',
                },
                {
                  title: 'SaaS Dashboard',
                  category: 'UI/UX Design',
                  image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&q=80',
                  gradient: 'from-rose-600/85 via-pink-500/80 to-amber-500/85',
                },
                {
                  title: 'Mobile App',
                  category: 'App Development',
                  image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=800&fit=crop&q=80',
                  gradient: 'from-amber-500/85 via-yellow-500/80 to-orange-600/85',
                },
                {
                  title: 'Corporate Website',
                  category: 'Web Design',
                  image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&q=80',
                  gradient: 'from-orange-600/85 via-amber-500/80 to-yellow-500/85',
                },
                {
                  title: 'Marketing Campaign',
                  category: 'Digital Marketing',
                  image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=800&fit=crop&q=80',
                  gradient: 'from-rose-600/85 via-pink-500/80 to-orange-500/85',
                },
              ].map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  className="group"
                >
                  <Link
                    href="/portfolio"
                    className="relative block h-[350px] sm:h-[400px] lg:h-[450px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl active:scale-[0.98] transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-amber-300 touch-manipulation"
                  >
                    {/* Image Background */}
                    <div className="absolute inset-0">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {/* Enhanced Gradient Overlay - Warm Colors & Vivid Contrast (Trend #1, #6, #21) */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} group-hover:opacity-75 transition-opacity duration-300`}></div>
                      {/* Organic Shape Overlay - Blending Photos with Graphical Elements */}
                      <svg className="absolute top-0 right-0 w-1/2 h-full opacity-30 group-hover:opacity-50 transition-opacity duration-300" viewBox="0 0 400 600" preserveAspectRatio="none" aria-hidden="true">
                        <defs>
                          <linearGradient id={`gradient-organic-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(251, 191, 36, 0.4)" />
                            <stop offset="50%" stopColor="rgba(249, 115, 22, 0.3)" />
                            <stop offset="100%" stopColor="rgba(225, 29, 72, 0.4)" />
                          </linearGradient>
                        </defs>
                        <path d="M0,0 Q100,150 200,300 T400,600 L400,0 Z" fill={`url(#gradient-organic-${index})`} className="organic-shape"/>
                      </svg>
                    </div>
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/90 via-transparent to-transparent"></div>
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 space-y-2 sm:space-y-3">
                      <div className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                        <p className="text-white font-bold text-xs sm:text-sm uppercase tracking-wider">
                          {project.category}
                        </p>
                      </div>
                      <motion.h3
                        className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-[1.1] group-hover:translate-x-3 transition-transform duration-300"
                      >
                        {project.title}
                      </motion.h3>
                      <motion.div
                        className="flex items-center gap-2 text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        View Project
                        <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </motion.div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <SmoothAnimate direction="up" delay={0.4}>
              <div className="text-center mt-16">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-2xl font-black text-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-amber-300"
                >
                  View All Projects
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </SmoothAnimate>
          </div>
        </div>
      </section>

      {/* Stats Section - Data Visualization (Trend #20) */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className=" mx-auto">
            <SmoothAnimate direction="up" delay={0.2}>
              <div className="text-center mb-20">
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-amber-900 leading-tight mb-6">
                  By The Numbers
                </h2>
                <p className="text-2xl text-amber-900/70 max-w-3xl mx-auto font-medium">
                  Real results that speak for themselves
                </p>
              </div>
            </SmoothAnimate>
            
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8" staggerDelay={0.15}>
              {[
                { number: '500+', label: 'Projects Delivered', colorClass: 'text-amber-600' },
                { number: '98%', label: 'Client Satisfaction', colorClass: 'text-orange-600' },
                { number: '150+', label: 'Happy Clients', colorClass: 'text-rose-600' },
                { number: '10+', label: 'Years Experience', colorClass: 'text-amber-600' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  whileHover={{ scale: 1.15, y: -10 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    className={`text-6xl md:text-7xl font-black ${stat.colorClass} mb-4`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1, type: 'spring' }}
                  >
                    {stat.number}
                  </motion.div>
                  <p className="text-lg font-semibold text-amber-900/70">{stat.label}</p>
                </motion.div>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* CTA Section - Big Block with Vivid Contrast */}
      <section className="py-32 bg-gradient-to-br from-amber-600 via-orange-600 to-rose-600 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 overflow-hidden"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="absolute top-0 right-0 w-1/2 h-full bg-amber-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-full bg-rose-400/20 rounded-full blur-3xl"></div>
        </motion.div>
                
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SmoothAnimate direction="up" delay={0.2}>
            <div className="max-w-5xl mx-auto text-center space-y-10">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
                Ready to Transform Your Business?
              </h2>
              <p className="text-2xl md:text-3xl text-white/90 max-w-3xl mx-auto font-medium leading-relaxed">
                Let's create something extraordinary together. Start your project today and experience the difference.
              </p>
            
              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.div whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/contact"
                    className="group px-12 py-6 bg-white text-amber-900 rounded-2xl font-black text-xl hover:bg-amber-50 transition-all duration-300 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/50 block"
                    style={{ minHeight: '64px' }}
                  >
                    Start Your Project
                    <motion.svg
                      className="inline-block ml-3 w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </motion.svg>
                  </Link>
                </motion.div>
              
                <motion.div whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/about"
                    className="px-12 py-6 bg-transparent text-white rounded-2xl font-black text-xl border-4 border-white hover:bg-white/10 transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white/50 block"
                    style={{ minHeight: '64px', borderWidth: '4px' }}
                  >
                    Learn About Us
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </SmoothAnimate>
        </div>
      </section>
    </>
  )
}

