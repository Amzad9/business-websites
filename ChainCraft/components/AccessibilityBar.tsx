'use client'

import { useState, useEffect } from 'react'

export default function AccessibilityBar() {
  const [fontSize, setFontSize] = useState(100) // percentage
  const [highContrast, setHighContrast] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`
    
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
                aria-label=""
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
