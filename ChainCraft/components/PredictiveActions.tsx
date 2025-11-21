'use client'

import { useEffect, useState } from 'react'
import { useAdaptiveUI } from './AdaptiveUIProvider'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

interface PredictiveAction {
  label: string
  href: string
  icon: string
  confidence: number
}

const actionIcons: Record<string, string> = {
  '/services': '🎯',
  '/portfolio': '📁',
  '/contact': '📧',
  '/about': 'ℹ️',
  '/blog': '📝',
  '/testimonial': '⭐',
}

export default function PredictiveActions() {
  const { predictNextAction, behavior, trackInteraction } = useAdaptiveUI()
  const [predictions, setPredictions] = useState<PredictiveAction[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const predicted = predictNextAction()
    
    if (predicted.length > 0 && behavior.navigationPattern.length >= 2) {
      const actions: PredictiveAction[] = predicted.map((href, index) => ({
        label: getLabelFromHref(href),
        href,
        icon: actionIcons[href] || '🔗',
        confidence: 100 - (index * 20), // Higher confidence for first prediction
      }))
      
      setPredictions(actions)
      setIsVisible(true)
      
      // Hide after 10 seconds
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 10000)
      
      return () => clearTimeout(timer)
    } else {
      setIsVisible(false)
    }
  }, [predictNextAction, behavior.navigationPattern])

  const getLabelFromHref = (href: string): string => {
    const labels: Record<string, string> = {
      '/services': 'View Services',
      '/portfolio': 'See Portfolio',
      '/contact': 'Get in Touch',
      '/about': 'Learn More',
      '/blog': 'Read Blog',
      '/testimonial': 'Testimonials',
    }
    return labels[href] || 'Explore'
  }

  const handleClick = (href: string) => {
    trackInteraction(`prediction-${href}`)
    setIsVisible(false)
  }

  if (!isVisible || predictions.length === 0) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-6 right-6 z-50 bg-white rounded-2xl shadow-2xl border-2 border-primary-200 p-4 max-w-xs"
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <p className="text-sm font-bold text-gray-700">You might want to:</p>
        </div>
        
        <div className="space-y-2">
          {predictions.map((action, index) => (
            <motion.div
              key={action.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={action.href}
                onClick={() => handleClick(action.href)}
                className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-primary-50 to-accent-50 hover:from-primary-100 hover:to-accent-100 transition-all duration-300 group"
              >
                <span className="text-2xl">{action.icon}</span>
                <span className="flex-1 font-semibold text-gray-800 group-hover:text-primary-700 transition-colors">
                  {action.label}
                </span>
                <span className="text-xs text-gray-500 opacity-70">
                  {action.confidence}%
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="mt-3 w-full text-xs text-gray-500 hover:text-gray-700 font-medium"
        >
          Dismiss
        </button>
      </motion.div>
    </AnimatePresence>
  )
}


