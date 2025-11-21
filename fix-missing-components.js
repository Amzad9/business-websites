const fs = require('fs')
const path = require('path')

const websitesDir = __dirname
const websites = fs.readdirSync(websitesDir).filter(dir => {
  const dirPath = path.join(websitesDir, dir)
  return fs.statSync(dirPath).isDirectory() && 
         !dir.startsWith('.') && 
         fs.existsSync(path.join(dirPath, 'app'))
})

console.log(`Found ${websites.length} websites to check\n`)

// Components that need to exist
const requiredComponents = {
  'AccessibilityBar.tsx': `'use client'

import { useState, useEffect } from 'react'

export default function AccessibilityBar() {
  const [fontSize, setFontSize] = useState(100) // percentage
  const [highContrast, setHighContrast] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.documentElement.style.fontSize = \`\${fontSize}%\`
    
    if (highContrast) {
      document.documentElement.classList.add('high-contrast')
    } else {
      document.documentElement.classList.remove('high-contrast')
    }
  }, [fontSize, highContrast])

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 transition-colors"
        aria-label="Accessibility Options"
        aria-expanded={isOpen}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-4 min-w-[200px] border border-gray-200 dark:border-gray-700">
          <h3 className="font-bold mb-3 text-gray-900 dark:text-white">Accessibility</h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Font Size: {fontSize}%
              </label>
              <input
                type="range"
                min="80"
                max="150"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full"
                aria-label="Font size adjustment"
              />
            </div>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={highContrast}
                onChange={(e) => setHighContrast(e.target.checked)}
                className="rounded"
                aria-label="High contrast mode"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">High Contrast</span>
            </label>
          </div>
        </div>
      )}
    </div>
  )
}
`,

  'EnhancedCursor.tsx': `'use client'

import { useEffect, useRef, useState } from 'react'

export default function EnhancedCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let mouseX = 0
    let mouseY = 0
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      life: number
      maxLife: number
      size: number
    }> = []

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Create trailing particles with varying sizes
      for (let i = 0; i < 5; i++) {
        particles.push({
          x: mouseX + (Math.random() - 0.5) * 10,
          y: mouseY + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          life: 1,
          maxLife: 1,
          size: Math.random() * 8 + 4,
        })
      }
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    // Check if hovering over interactive elements
    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.closest('a, button, [role="button"]')
      setIsHovering(!!isInteractive)
    }

    const animate = () => {
      // Clear with fade effect
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw main cursor
      const gradient = ctx.createRadialGradient(
        mouseX,
        mouseY,
        0,
        mouseX,
        mouseY,
        isHovering ? 40 : 25
      )
      gradient.addColorStop(0, \`rgba(99, 102, 241, \${isHovering ? 0.8 : 0.6})\`)
      gradient.addColorStop(1, 'rgba(99, 102, 241, 0)')

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(mouseX, mouseY, isHovering ? 40 : 25, 0, Math.PI * 2)
      ctx.fill()

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.life -= 0.02

        if (p.life > 0) {
          const alpha = p.life
          const particleGradient = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            p.size
          )
          particleGradient.addColorStop(0, \`rgba(99, 102, 241, \${alpha * 0.6})\`)
          particleGradient.addColorStop(1, \`rgba(99, 102, 241, 0)\`)

          ctx.fillStyle = particleGradient
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
        } else {
          particles.splice(i, 1)
        }
      }

      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousemove', checkHover)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousemove', checkHover)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', handleResize)
    }
  }, [isHovering])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 pointer-events-none z-40 dark:mix-blend-soft-light"
      style={{ background: 'transparent', mixBlendMode: 'normal' }}
      aria-hidden="true"
    />
  )
}
`,

  'KineticText.tsx': `'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ReactNode, useRef } from 'react'

interface KineticTextProps {
  children: ReactNode
  className?: string
}

export default function KineticText({ children, className = '' }: KineticTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2])

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
`
}

let updatedCount = 0
let createdCount = 0

websites.forEach((website) => {
  try {
    const websitePath = path.join(websitesDir, website)
    const componentsPath = path.join(websitePath, 'components')

    // Ensure components directory exists
    if (!fs.existsSync(componentsPath)) {
      fs.mkdirSync(componentsPath, { recursive: true })
    }

    let websiteUpdated = false

    // Check and create missing components
    Object.keys(requiredComponents).forEach((componentName) => {
      const componentPath = path.join(componentsPath, componentName)
      
      if (!fs.existsSync(componentPath)) {
        fs.writeFileSync(componentPath, requiredComponents[componentName], 'utf8')
        websiteUpdated = true
        createdCount++
        console.log(`✅ Created ${componentName} in ${website}`)
      }
    })

    if (websiteUpdated) {
      updatedCount++
    }

    if (updatedCount % 10 === 0 && updatedCount > 0) {
      console.log(`\n✅ Processed ${updatedCount} websites with missing components\n`)
    }

  } catch (error) {
    console.error(`❌ Error updating ${website}:`, error.message)
  }
})

console.log(`\n✅ Fix completed!`)
console.log(`\nSummary:`)
console.log(`- Websites checked: ${websites.length}`)
console.log(`- Websites updated: ${updatedCount}`)
console.log(`- Components created: ${createdCount}`)
console.log(`\nMissing components have been added!`)

