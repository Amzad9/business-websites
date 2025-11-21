'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { animate, stagger } from 'animejs'

interface KineticTextProps {
  children: ReactNode
  className?: string
}

export default function KineticText({ children, className = '' }: KineticTextProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Initial state
    element.style.opacity = '0'
    element.style.transform = 'translateY(50px) scale(0.9)'

    // Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Kinetic text animation - multiple effects
            animate(element, {opacity: [0, 1],
              translateY: [50, 0],
              scale: [0.9, 1],
              duration: 1000,
              easing: 'easeOutElastic(1, .8)',
            })

            // Animate children (text letters if possible)
            const textElement = element.querySelector('h1, h2, h3, p, span')
            if (textElement) {
              const text = textElement.textContent || ''
              const letters = text.split('')
              
              // Wrap letters in spans for animation
              if (!textElement.querySelector('.letter')) {
                textElement.innerHTML = letters
                  .map((letter, i) => 
                    letter === ' ' 
                      ? '<span class="letter" style="display: inline-block;">&nbsp;</span>'
                      : `<span class="letter" style="display: inline-block;">${letter}</span>`
                  )
                  .join('')

                // Animate each letter
                animate(textElement.querySelectorAll('.letter'), {
                  opacity: [0, 1],
                  translateY: [50, 0],
                  rotateX: [-90, 0],
                  delay: stagger(30),
                  duration: 800,
                  easing: 'easeOutCubic',
                })
              }
            }

            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(element)

    // Scroll-based animations
    const handleScroll = () => {
      if (!element) return
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / windowHeight))

      // Parallax effect
              animate(element, {translateY: [0, -50 * progress],
        opacity: [1, 1 - progress * 0.5],
        scale: [1, 1 + progress * 0.2],
        duration: 0,
        easing: 'linear',
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform, opacity' }}>
      {children}
    </div>
  )
}
