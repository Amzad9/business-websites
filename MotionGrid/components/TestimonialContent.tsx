'use client'

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
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-primary-600 w-8'
                    : 'bg-gray-300 dark:bg-gray-700'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
