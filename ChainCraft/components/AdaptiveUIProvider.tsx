'use client'

import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react'

// User behavior tracking types
interface UserBehavior {
  featureUsage: Record<string, number>
  navigationPattern: string[]
  interactionSpeed: number[] // Milliseconds between interactions
  preferredAnimationSpeed: 'slow' | 'normal' | 'fast'
  colorPreference: 'bright' | 'normal' | 'minimal'
  lastInteraction: number
  sessionStartTime: number
  typingPace: number[] // Characters per minute
  stressLevel: 'low' | 'medium' | 'high'
}

// Adaptive UI context type
interface AdaptiveUIContextType {
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night'
  colorMode: 'bright' | 'normal' | 'monochrome'
  behavior: UserBehavior
  predictNextAction: () => string[]
  getFeatureOrder: (features: string[]) => string[]
  animationSpeed: number
  isStressMode: boolean
  updateBehavior: (type: keyof UserBehavior, value: any) => void
  trackInteraction: (feature: string) => void
}

const AdaptiveUIContext = createContext<AdaptiveUIContextType | undefined>(undefined)

const defaultBehavior: UserBehavior = {
  featureUsage: {},
  navigationPattern: [],
  interactionSpeed: [],
  preferredAnimationSpeed: 'normal',
  colorPreference: 'normal',
  lastInteraction: Date.now(),
  sessionStartTime: Date.now(),
  typingPace: [],
  stressLevel: 'low',
}

export function AdaptiveUIProvider({ children }: { children: React.ReactNode }) {
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening' | 'night'>('afternoon')
  const [behavior, setBehavior] = useState<UserBehavior>(defaultBehavior)
  const [colorMode, setColorMode] = useState<'bright' | 'normal' | 'monochrome'>('normal')
  const [isStressMode, setIsStressMode] = useState(false)
  const typingTimerRef = useRef<NodeJS.Timeout>()
  const lastTypingTimeRef = useRef<number>(0)
  const keystrokeCountRef = useRef<number>(0)

  // Calculate time of day
  useEffect(() => {
    const updateTimeOfDay = () => {
      const hour = new Date().getHours()
      if (hour >= 5 && hour < 12) {
        setTimeOfDay('morning')
        setColorMode('bright')
      } else if (hour >= 12 && hour < 17) {
        setTimeOfDay('afternoon')
        setColorMode('normal')
      } else if (hour >= 17 && hour < 21) {
        setTimeOfDay('evening')
        setColorMode('normal')
      } else {
        setTimeOfDay('night')
        setColorMode('monochrome')
      }
    }

    updateTimeOfDay()
    const interval = setInterval(updateTimeOfDay, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  // Load behavior from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedBehavior = localStorage.getItem('chaincraft-user-behavior')
      if (savedBehavior) {
        try {
          const parsed = JSON.parse(savedBehavior)
          setBehavior({
            ...defaultBehavior,
            ...parsed,
            sessionStartTime: Date.now(),
            lastInteraction: Date.now(),
          })
        } catch (e) {
          console.error('Failed to load user behavior:', e)
        }
      }
    }
  }, [])

  // Save behavior to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && behavior.featureUsage) {
      const behaviorToSave = {
        ...behavior,
        sessionStartTime: Date.now(), // Don't persist session time
      }
      localStorage.setItem('chaincraft-user-behavior', JSON.stringify(behaviorToSave))
    }
  }, [behavior])

  // Track typing pace for stress detection
  useEffect(() => {
    const handleKeyDown = () => {
      const now = Date.now()
      keystrokeCountRef.current += 1

      if (lastTypingTimeRef.current > 0) {
        const timeSinceLastKey = now - lastTypingTimeRef.current
        const cpm = 60000 / timeSinceLastKey // Characters per minute estimate
        
        setBehavior(prev => ({
          ...prev,
          typingPace: [...prev.typingPace.slice(-10), cpm], // Keep last 10 samples
        }))

        // Detect stress: very fast typing (< 100ms between keystrokes) indicates stress
        if (timeSinceLastKey < 100) {
          setBehavior(prev => ({
            ...prev,
            stressLevel: 'high',
          }))
          setIsStressMode(true)
          
          // Auto-disable stress mode after 30 seconds of slower typing
          if (typingTimerRef.current) {
            clearTimeout(typingTimerRef.current)
          }
          typingTimerRef.current = setTimeout(() => {
            setIsStressMode(false)
            setBehavior(prev => ({
              ...prev,
              stressLevel: 'low',
            }))
          }, 30000)
        }
      }

      lastTypingTimeRef.current = now
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current)
      }
    }
  }, [])

  // Track interaction speed
  const trackInteraction = useCallback((feature: string) => {
    const now = Date.now()
    const timeSinceLastInteraction = now - behavior.lastInteraction

    setBehavior(prev => {
      const newBehavior = {
        ...prev,
        featureUsage: {
          ...prev.featureUsage,
          [feature]: (prev.featureUsage[feature] || 0) + 1,
        },
        navigationPattern: [...prev.navigationPattern.slice(-9), feature], // Keep last 10
        interactionSpeed: [...prev.interactionSpeed.slice(-10), timeSinceLastInteraction],
        lastInteraction: now,
      }

      // Calculate preferred animation speed based on interaction speed
      const avgSpeed = newBehavior.interactionSpeed.slice(-5).reduce((a, b) => a + b, 0) / 5
      if (avgSpeed < 300) {
        newBehavior.preferredAnimationSpeed = 'fast'
      } else if (avgSpeed > 2000) {
        newBehavior.preferredAnimationSpeed = 'slow'
      } else {
        newBehavior.preferredAnimationSpeed = 'normal'
      }

      return newBehavior
    })
  }, [behavior.lastInteraction])

  // Update behavior
  const updateBehavior = useCallback((type: keyof UserBehavior, value: any) => {
    setBehavior(prev => ({
      ...prev,
      [type]: value,
    }))
  }, [])

  // Predict next action based on navigation patterns
  const predictNextAction = useCallback(() => {
    const patterns = behavior.navigationPattern
    if (patterns.length < 2) return []

    const predictions: string[] = []
    const lastAction = patterns[patterns.length - 1]

    // Common navigation patterns
    const commonPaths: Record<string, string[]> = {
      '/': ['/services', '/portfolio', '/about'],
      '/services': ['/contact', '/portfolio'],
      '/portfolio': ['/contact', '/testimonial'],
      '/about': ['/services', '/contact'],
      '/blog': ['/contact', '/portfolio'],
      '/testimonial': ['/contact', '/portfolio'],
      '/contact': ['/services', '/portfolio'],
    }

    const predicted = commonPaths[lastAction] || []
    return predicted.slice(0, 3) // Return top 3 predictions
  }, [behavior.navigationPattern])

  // Reorder features based on usage frequency
  const getFeatureOrder = useCallback((features: string[]) => {
    return [...features].sort((a, b) => {
      const usageA = behavior.featureUsage[a] || 0
      const usageB = behavior.featureUsage[b] || 0
      return usageB - usageA // Sort by usage, most used first
    })
  }, [behavior.featureUsage])

  // Calculate animation speed multiplier
  const animationSpeed = {
    slow: 1.5,
    normal: 1,
    fast: 0.6,
  }[behavior.preferredAnimationSpeed]

  const value: AdaptiveUIContextType = {
    timeOfDay,
    colorMode,
    behavior,
    predictNextAction,
    getFeatureOrder,
    animationSpeed,
    isStressMode,
    updateBehavior,
    trackInteraction,
  }

  return (
    <AdaptiveUIContext.Provider value={value}>
      <div 
        className={`adaptive-ui adaptive-${colorMode} adaptive-${timeOfDay}`}
        style={{
          filter: isStressMode ? 'contrast(0.9) brightness(0.95)' : 'none',
          transition: 'filter 0.3s ease',
        }}
      >
        {children}
      </div>
    </AdaptiveUIContext.Provider>
  )
}

const defaultAdaptiveUIContext: AdaptiveUIContextType = {
  timeOfDay: 'afternoon',
  colorMode: 'normal',
  behavior: defaultBehavior,
  predictNextAction: () => [],
  getFeatureOrder: (features) => features,
  animationSpeed: 1,
  isStressMode: false,
  updateBehavior: () => {},
  trackInteraction: () => {},
}

export function useAdaptiveUI() {
  const context = useContext(AdaptiveUIContext)
  // Return default context if not provided (during SSR or before mount)
  if (context === undefined) {
    return defaultAdaptiveUIContext
  }
  return context
}


