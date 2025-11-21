'use client'

import { useAdaptiveUI } from './AdaptiveUIProvider'
import { useEffect } from 'react'

interface AdaptivePageWrapperProps {
  children: React.ReactNode
  pageType: string
}

export default function AdaptivePageWrapper({ children, pageType }: AdaptivePageWrapperProps) {
  const { colorMode, timeOfDay, trackInteraction, animationSpeed } = useAdaptiveUI()

  useEffect(() => {
    // Track page visit
    trackInteraction(`page-${pageType}`)
    
    // Apply page-specific adaptive classes
    const root = document.documentElement
    root.setAttribute('data-page', pageType)
    root.setAttribute('data-time', timeOfDay)
    root.setAttribute('data-color-mode', colorMode)
    root.style.setProperty('--animation-speed', animationSpeed.toString())

    return () => {
      root.removeAttribute('data-page')
      root.removeAttribute('data-time')
      root.removeAttribute('data-color-mode')
      root.style.removeProperty('--animation-speed')
    }
  }, [pageType, timeOfDay, colorMode, animationSpeed, trackInteraction])

  return <>{children}</>
}
