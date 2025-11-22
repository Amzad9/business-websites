'use client'

import { useEffect, useState } from 'react'

export default function SustainableLoading() {
  const [isOptimized, setIsOptimized] = useState(false)
  const [dataUsage, setDataUsage] = useState(0)

  useEffect(() => {
    // Detect if user prefers reduced data
    const prefersReducedData = window.matchMedia('(prefers-reduced-data: reduce)')
    
    // Apply lightweight mode if preferred
    if (prefersReducedData.matches) {
      setIsOptimized(true)
      // Disable heavy animations and images
      document.documentElement.classList.add('lightweight-mode')
    }

    // Monitor data usage (simplified)
    const updateDataUsage = () => {
      if ('performance' in window && 'memory' in (performance as any)) {
        const memory = (performance as any).memory
        const used = memory.usedJSHeapSize / (1024 * 1024) // MB
        setDataUsage(Math.round(used))
      }
    }

    updateDataUsage()
    const interval = setInterval(updateDataUsage, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed top-4 left-4 z-40">
      {isOptimized && (
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3 shadow-sm">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-xs font-bold text-green-800">Lightweight Mode Active</p>
              <p className="text-xs text-green-700">Optimized for low data usage</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

