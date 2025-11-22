'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function MicroInteractions() {
  const pathname = usePathname()

  useEffect(() => {
    // Add subtle page transition feedback
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      // Check if it's a button or link
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        const element = target.tagName === 'BUTTON' || target.tagName === 'A' 
          ? target 
          : target.closest('button') || target.closest('a')
        
        if (element) {
          // Add ripple effect
          const ripple = document.createElement('span')
          ripple.className = 'ripple-effect'
          ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
          `
          
          const rect = (element as HTMLElement).getBoundingClientRect()
          const size = Math.max(rect.width, rect.height)
          ripple.style.width = ripple.style.height = `${size}px`
          ripple.style.left = `${e.clientX - rect.left - size / 2}px`
          ripple.style.top = `${e.clientY - rect.top - size / 2}px`
          
          if ((element as HTMLElement).style.position !== 'absolute' && (element as HTMLElement).style.position !== 'relative') {
            (element as HTMLElement).style.position = 'relative'
          }
          
          element.appendChild(ripple)
          
          setTimeout(() => {
            ripple.remove()
          }, 600)
        }
      }
    }

    // Add success feedback for form submissions
    const handleFormSubmit = (e: Event) => {
      const form = e.target as HTMLFormElement
      if (form.tagName === 'FORM') {
        const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement
        if (submitButton) {
          submitButton.classList.add('submitted')
          setTimeout(() => {
            submitButton.classList.remove('submitted')
          }, 2000)
        }
      }
    }

    // Add hover feedback for interactive elements
    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'BUTTON' || target.closest('button')) {
        target.style.transition = 'transform 0.2s ease'
      }
    }

    document.addEventListener('click', handleClick)
    document.addEventListener('submit', handleFormSubmit)
    document.addEventListener('mouseover', handleHover)

    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('submit', handleFormSubmit)
      document.removeEventListener('mouseover', handleHover)
    }
  }, [pathname])

  return null // This component only adds event listeners
}

