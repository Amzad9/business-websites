'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface SmoothAnimateProps {
  children: ReactNode
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  className?: string
}

export function SmoothAnimate({ 
  children, 
  delay = 0, 
  duration = 0.6,
  direction = 'up',
  className = ''
}: SmoothAnimateProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: 50, x: 0 }
      case 'down': return { y: -50, x: 0 }
      case 'left': return { y: 0, x: 50 }
      case 'right': return { y: 0, x: -50 }
      case 'fade': return { y: 0, x: 0, scale: 0.95 }
      default: return { y: 50, x: 0 }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...getInitialPosition() }}
      animate={isInView ? { opacity: 1, y: 0, x: 0, scale: 1 } : { opacity: 0, ...getInitialPosition() }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
}

export function StaggerContainer({ 
  children, 
  className = '',
  staggerDelay = 0.1 
}: StaggerContainerProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.6,
                delay: index * staggerDelay,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {child}
            </motion.div>
          ))
        : children
      }
    </div>
  )
}

