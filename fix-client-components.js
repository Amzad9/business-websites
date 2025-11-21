const fs = require('fs');
const path = require('path');

const businessNames = [
  'ApexGrid', 'BoldBite', 'BrightFox', 'ByteBloom', 'ChainCraft',
  'CloudMint', 'CodeCrate', 'CraftNova', 'DataDrift', 'DigiDawn',
  'DriveLoop', 'EchoPeak', 'EdgeSpark', 'ElevateX', 'EmberLink',
  'FinForge', 'FlowGrid', 'FluxBridge', 'FunnelFox', 'FuseStack',
  'GainSmith', 'GlidePath', 'GlowCart', 'GridBee', 'GrowthMint',
  'HatchLoop', 'HiveLift', 'HorizonDrift', 'HoverCart', 'HypeMint',
  'IngotHub', 'InnovateX', 'InsightFox', 'JetScale', 'JumpPulse',
  'KiteStack', 'LaunchLoop', 'LiftLedger', 'LiftWave', 'LinkBloom',
  'LoopCraft', 'LumenCart', 'LuminateX', 'MagneMint', 'MarketBee',
  'MetricFox', 'MetroMint', 'MomentumX', 'MoonStack', 'MotionGrid',
  'NexusBloom', 'NovaForge', 'OrbitCart', 'PeakPulse', 'PivotFox',
  'PivotGrid', 'PixelBridge', 'PulseLedger', 'QuestMint', 'QuickBloom',
  'RadiusX', 'RallyHub', 'RankSpark', 'RapidMint', 'RiseLoop',
  'ScaleSmith', 'ShiftBee', 'SignalFox', 'SkyForge', 'SlateCart',
  'SlideLift', 'SnapBridge', 'SparkNest', 'SprintFox', 'StackGlow',
  'StackNova', 'StartMint', 'StreamHub', 'SwiftScale', 'SyncBloom',
  'TractionX', 'TrendMint', 'TurboFox', 'VaultGrid', 'VentureBee',
  'VertexLoop', 'VibeStack', 'VitalMint', 'VividForge', 'VoltCart',
  'WaveLift', 'WebBloom', 'WingHub', 'WireFox', 'ZenithCart',
  'ZigZagX', 'ZipGrid', 'ZoomMint', 'ZestForge', 'ZenLoop'
];

const baseDir = __dirname;

// PortfolioContent component template
const portfolioContentTemplate = (siteName) => `'use client'

import { useState } from 'react'
import Link from 'next/link'
import FadeIn from '@/components/FadeIn'
import { motion } from 'framer-motion'
import projectsData from '@/content/projects.json'

interface Project {
  slug: string
  title: string
  category: string
  description: string
  image?: string
}

export default function PortfolioContent() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const projects: Project[] = projectsData
  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))]

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory)

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h1 className="text-5xl font-bold text-center mb-6">Our Portfolio</h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Showcasing our best work and successful projects
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={\`px-6 py-2 rounded-full transition-all \${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }\`}
                >
                  {category}
                </button>
              ))}
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <FadeIn key={project.slug} delay={index * 0.1}>
                <Link href={\`/portfolio/\${project.slug}\`}>
                  <motion.div
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
                  >
                    <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                      <span className="text-4xl">📁</span>
                    </div>
                    <div className="p-6">
                      <span className="text-sm text-primary-600 font-semibold">
                        {project.category}
                      </span>
                      <h3 className="text-xl font-semibold mt-2 mb-2">{project.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{project.description}</p>
                    </div>
                  </motion.div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
`;

// TestimonialContent component template
const testimonialContentTemplate = (siteName) => `'use client'

import { useState, useEffect } from 'react'
import FadeIn from '@/components/FadeIn'
import { motion, AnimatePresence } from 'framer-motion'
import testimonialsData from '@/content/testimonials.json'

interface Testimonial {
  name: string
  role: string
  company: string
  content: string
  avatar?: string
}

export default function TestimonialContent() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const testimonials: Testimonial[] = testimonialsData

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h1 className="text-5xl font-bold text-center mb-6">Client Testimonials</h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              See what our clients have to say about working with us
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="relative h-96">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
              >
                <div className="flex flex-col items-center text-center h-full justify-center">
                  <div className="text-6xl mb-6">"</div>
                  <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
                    {testimonials[currentIndex].content}
                  </p>
                  <div>
                    <p className="font-semibold text-lg">{testimonials[currentIndex].name}</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={\`w-3 h-3 rounded-full transition-all \${
                  index === currentIndex
                    ? 'bg-primary-600 w-8'
                    : 'bg-gray-300 dark:bg-gray-700'
                }\`}
                aria-label={\`Go to testimonial \${index + 1}\`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
`;

// Portfolio page template
const portfolioPageTemplate = (siteName) => `import { Metadata } from 'next'
import PortfolioContent from '@/components/PortfolioContent'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Explore our portfolio of successful projects',
}

export default function Portfolio() {
  return (
    <div className="pt-20 min-h-screen">
      <PortfolioContent />
    </div>
  )
}
`;

// Testimonial page template
const testimonialPageTemplate = (siteName) => `import { Metadata } from 'next'
import TestimonialContent from '@/components/TestimonialContent'

export const metadata: Metadata = {
  title: 'Testimonials',
  description: 'What our clients say about ${siteName}',
}

export default function Testimonial() {
  return (
    <div className="pt-20 min-h-screen">
      <TestimonialContent />
    </div>
  )
}
`;

businessNames.forEach((siteName, index) => {
  const siteDir = path.join(baseDir, siteName);
  
  if (!fs.existsSync(siteDir)) {
    console.log(`[${index + 1}/${businessNames.length}] Skipping ${siteName} - directory not found`);
    return;
  }

  console.log(`[${index + 1}/${businessNames.length}] Fixing ${siteName}...`);

  // Create components directory if it doesn't exist
  const componentsDir = path.join(siteDir, 'components');
  if (!fs.existsSync(componentsDir)) {
    fs.mkdirSync(componentsDir, { recursive: true });
  }

  // Write PortfolioContent component
  const portfolioContentPath = path.join(componentsDir, 'PortfolioContent.tsx');
  fs.writeFileSync(portfolioContentPath, portfolioContentTemplate(siteName), 'utf8');

  // Write TestimonialContent component
  const testimonialContentPath = path.join(componentsDir, 'TestimonialContent.tsx');
  fs.writeFileSync(testimonialContentPath, testimonialContentTemplate(siteName), 'utf8');

  // Update portfolio page
  const portfolioPagePath = path.join(siteDir, 'app', 'portfolio', 'page.tsx');
  if (fs.existsSync(portfolioPagePath)) {
    fs.writeFileSync(portfolioPagePath, portfolioPageTemplate(siteName), 'utf8');
  }

  // Update testimonial page
  const testimonialPagePath = path.join(siteDir, 'app', 'testimonial', 'page.tsx');
  if (fs.existsSync(testimonialPagePath)) {
    fs.writeFileSync(testimonialPagePath, testimonialPageTemplate(siteName), 'utf8');
  }
});

console.log(`\n✅ Successfully fixed all ${businessNames.length} websites!`);

