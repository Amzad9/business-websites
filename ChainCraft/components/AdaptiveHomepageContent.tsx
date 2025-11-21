'use client'

import { useAdaptiveUI } from './AdaptiveUIProvider'
import { useEffect } from 'react'

export default function AdaptiveHomepageContent() {
  const { colorMode, timeOfDay, isStressMode, animationSpeed } = useAdaptiveUI()

  useEffect(() => {
    // Apply adaptive color mode classes to document
    const root = document.documentElement
    root.classList.remove('adaptive-bright', 'adaptive-normal', 'adaptive-monochrome')
    root.classList.add(`adaptive-${colorMode}`)
    root.classList.add(`time-${timeOfDay}`)

    // Apply stress mode class if active
    if (isStressMode) {
      root.classList.add('stress-mode')
    } else {
      root.classList.remove('stress-mode')
    }

    // Apply animation speed CSS variable
    root.style.setProperty('--animation-speed', animationSpeed.toString())

    return () => {
      root.classList.remove('adaptive-bright', 'adaptive-normal', 'adaptive-monochrome', 'stress-mode', `time-${timeOfDay}`)
      root.style.removeProperty('--animation-speed')
    }
  }, [colorMode, timeOfDay, isStressMode, animationSpeed])

  return null // This component only handles side effects
}


