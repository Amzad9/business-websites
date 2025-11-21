'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { animate } from 'animejs'

interface FadeInProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

export default function FadeIn({ children, delay = 0, direction = 'up' }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Set initial state
    const translateX = direction === 'left' ? 50 : direction === 'right' ? -50 : 0
    const translateY = direction === 'up' ? 50 : direction === 'down' ? -50 : 0

    element.style.opacity = '0'
    element.style.transform = `translate(${translateX}px, ${translateY}px)`

    // Intersection Observer for scroll-triggered animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(element, {opacity: [0, 1],
              translateX: [translateX, 0],
              translateY: [translateY, 0],
              scale: [0.9, 1],
              duration: 800,
              delay: delay * 1000,
              easing: 'easeOutCubic',
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '-50px' }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [delay, direction])

  return (
    <div ref={ref} style={{ willChange: 'transform, opacity' }}>
      {children}
    </div>
  )
}
