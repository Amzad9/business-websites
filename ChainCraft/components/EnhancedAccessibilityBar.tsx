'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function EnhancedAccessibilityBar() {
  const [fontSize, setFontSize] = useState(100)
  const [highContrast, setHighContrast] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // Load saved preferences
    const savedFontSize = localStorage.getItem('chaincraft-font-size')
    const savedContrast = localStorage.getItem('chaincraft-high-contrast')
    const savedMotion = localStorage.getItem('chaincraft-reduced-motion')
    
    if (savedFontSize) setFontSize(Number(savedFontSize))
    if (savedContrast === 'true') setHighContrast(true)
    if (savedMotion === 'true') setReducedMotion(true)

    // Apply font size
    document.documentElement.style.fontSize = `${fontSize}%`
    
    // Apply high contrast
    if (highContrast) {
      document.documentElement.classList.add('high-contrast')
    } else {
      document.documentElement.classList.remove('high-contrast')
    }

    // Apply reduced motion
    if (reducedMotion) {
      document.documentElement.classList.add('reduce-motion')
    } else {
      document.documentElement.classList.remove('reduce-motion')
    }

    // Check for system preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (prefersReducedMotion.matches && !savedMotion) {
      setReducedMotion(true)
    }
  }, [fontSize, highContrast, reducedMotion])

  const handleFontSizeChange = (value: number) => {
    setFontSize(value)
    localStorage.setItem('chaincraft-font-size', String(value))
  }

  const handleContrastToggle = (value: boolean) => {
    setHighContrast(value)
    localStorage.setItem('chaincraft-high-contrast', String(value))
  }

  const handleMotionToggle = (value: boolean) => {
    setReducedMotion(value)
    localStorage.setItem('chaincraft-reduced-motion', String(value))
  }

  const handleVoiceToggle = async () => {
    if (!voiceEnabled) {
      try {
        // Request microphone permission for voice commands
        await navigator.mediaDevices.getUserMedia({ audio: true })
        setVoiceEnabled(true)
      } catch (error) {
        alert('Voice commands require microphone permission. Please enable it in your browser settings.')
      }
    } else {
      setVoiceEnabled(false)
    }
  }

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  // Force fixed position function - can be called anytime
  const forceFixedPosition = () => {
    if (buttonRef.current) {
      const button = buttonRef.current
      // Force fixed position via direct style manipulation with !important
      button.style.setProperty('position', 'fixed', 'important')
      button.style.setProperty('bottom', '80px', 'important')
      button.style.setProperty('right', '16px', 'important')
      button.style.setProperty('top', 'auto', 'important')
      button.style.setProperty('left', 'auto', 'important')
      button.style.setProperty('z-index', '9999', 'important')
      button.style.setProperty('transform', 'none', 'important')
      button.style.setProperty('margin', '0', 'important')
    }
  }

  // Force button to always stay fixed - prevent any position changes
  useEffect(() => {
    // Force immediately on mount and when state changes
    forceFixedPosition()
    
    // Also force after short delays to catch any async changes
    const timeout1 = setTimeout(forceFixedPosition, 10)
    const timeout2 = setTimeout(forceFixedPosition, 100)
    const timeout3 = setTimeout(forceFixedPosition, 300)
    
    // Use MutationObserver to watch for style/class changes on the button
    if (buttonRef.current) {
      const observer = new MutationObserver(() => {
        // Debounce the force function
        setTimeout(forceFixedPosition, 0)
      })
      
      observer.observe(buttonRef.current, {
        attributes: true,
        attributeFilter: ['style', 'class']
      })

      return () => {
        clearTimeout(timeout1)
        clearTimeout(timeout2)
        clearTimeout(timeout3)
        observer.disconnect()
      }
    }

    return () => {
      clearTimeout(timeout1)
      clearTimeout(timeout2)
      clearTimeout(timeout3)
    }
  }, [isOpen])

  // Handle button click - ensure position stays fixed
  const handleButtonClick = () => {
    setIsOpen(!isOpen)
    // Force position immediately after state change
    setTimeout(() => {
      forceFixedPosition()
    }, 0)
  }

  // Button is always visible at fixed position - no scroll behavior

  return (
    <>
      {/* Toggle Button - Always fixed position */}
      <button
        ref={buttonRef}
        onClick={handleButtonClick}
        className="accessibility-button-fixed bg-blue-600 text-white rounded-full shadow-xl hover:bg-blue-700 hover:shadow-2xl transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 group"
        aria-label=""
        aria-expanded={isOpen}
        style={{ 
          position: 'fixed',
          bottom: '88px',
          right: '16px',
          top: 'auto',
          left: 'auto',
          width: '56px',
          height: '56px',
          minWidth: '56px', 
          minHeight: '56px',
          maxWidth: '56px',
          maxHeight: '56px',
          padding: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          margin: 0,
          border: 'none',
          cursor: 'pointer',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitTransform: 'translateZ(0)',
          isolation: 'isolate'
        } as React.CSSProperties}
      >
        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg className="w-6 h-6 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          {/* Pulse animation - 1.8s duration */}
          <span 
            className="absolute inset-0 rounded-full bg-blue-600 pulse-accessibility opacity-75 group-hover:opacity-0"
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          ></span>
        </div>
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-black/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9997
            }}
          />
        )}
      </AnimatePresence>

      {/* Settings Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 max-w-[calc(100vw-7rem)] flex flex-col"
            style={{
              position: 'fixed',
              bottom: '128px',
              right: '16px',
              height: '50vh',
              maxHeight: '50vh',
              zIndex: 9998
            }}
          >
          {/* Header - Modern Design */}
          <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 text-white px-5 py-5 rounded-t-2xl flex-shrink-0 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-md">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold">Web Accessibility</h2>
                  <p className="text-xs text-blue-100 mt-0.5">Customize your experience</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label=""
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content - Modern Clean Design */}
          <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-1 min-h-0 bg-gradient-to-b from-gray-50 to-white">
            {/* Font Size - Improved Design with Better Spacing */}
            <div className="space-y-5">
              <div className="flex items-center justify-between mb-2">
                <label className="text-base font-bold text-gray-900 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shadow-sm">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <span className="text-base">Font Size</span>
                </label>
                <span className="text-base font-bold text-blue-600 bg-gradient-to-r from-blue-50 to-blue-100 px-5 py-2 rounded-full border-2 border-blue-200 shadow-sm">
                  {fontSize}%
                </span>
              </div>
              
              <div className="relative py-3">
                <input
                  type="range"
                  min="80"
                  max="150"
                  step="5"
                  value={fontSize}
                  onChange={(e) => handleFontSizeChange(Number(e.target.value))}
                  className="w-full h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full appearance-none cursor-pointer accent-blue-600 hover:accent-blue-500 transition-all shadow-inner"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((fontSize - 80) / 70) * 100}%, #e5e7eb ${((fontSize - 80) / 70) * 100}%, #e5e7eb 100%)`
                  }}
                  aria-label=""
                />
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <span className="text-sm text-gray-600 font-medium">Smaller</span>
                <span className="text-sm font-bold text-blue-600">Default (100%)</span>
                <span className="text-sm text-gray-600 font-medium">Larger</span>
              </div>
              
              <div className="flex justify-between text-xs text-gray-400 font-medium pt-1">
                <span>80%</span>
                <span>150%</span>
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

            {/* High Contrast - Improved Card */}
            <div className="group flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg bg-white hover:border-blue-300 hover:-translate-y-0.5"
              style={{
                borderColor: highContrast ? '#3b82f6' : '#e5e7eb',
                boxShadow: highContrast ? '0 4px 12px rgba(59, 130, 246, 0.15)' : 'none'
              }}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shadow-md ${
                  highContrast 
                    ? 'bg-gradient-to-br from-blue-600 to-blue-500 text-white scale-110' 
                    : 'bg-gray-100 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500'
                }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm mb-0.5">High Contrast</p>
                  <p className="text-xs text-gray-500">Better visibility</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={highContrast}
                  onChange={(e) => handleContrastToggle(e.target.checked)}
                  className="sr-only peer"
                  aria-label="Toggle high contrast mode"
                />
                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-blue-600 transition-all duration-300 shadow-inner after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all after:shadow-md peer-checked:after:translate-x-7"></div>
              </label>
            </div>

            {/* Reduced Motion - Improved Card */}
            <div className="group flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg bg-white hover:border-blue-300 hover:-translate-y-0.5"
              style={{
                borderColor: reducedMotion ? '#3b82f6' : '#e5e7eb',
                boxShadow: reducedMotion ? '0 4px 12px rgba(59, 130, 246, 0.15)' : 'none'
              }}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shadow-md ${
                  reducedMotion 
                    ? 'bg-gradient-to-br from-blue-600 to-blue-500 text-white scale-110' 
                    : 'bg-gray-100 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500'
                }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm mb-0.5">Reduce Motion</p>
                  <p className="text-xs text-gray-500">Minimize animations</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={reducedMotion}
                  onChange={(e) => handleMotionToggle(e.target.checked)}
                  className="sr-only peer"
                  aria-label="Toggle reduce motion"
                />
                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-blue-600 transition-all duration-300 shadow-inner after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all after:shadow-md peer-checked:after:translate-x-7"></div>
              </label>
            </div>

            {/* Voice Commands - Improved Card */}
            <div className="group flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg bg-white hover:border-green-300 hover:-translate-y-0.5"
              style={{
                borderColor: voiceEnabled ? '#16a34a' : '#e5e7eb',
                boxShadow: voiceEnabled ? '0 4px 12px rgba(22, 163, 74, 0.15)' : 'none'
              }}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shadow-md ${
                  voiceEnabled 
                    ? 'bg-gradient-to-br from-green-600 to-green-500 text-white scale-110' 
                    : 'bg-gray-100 text-gray-400 group-hover:bg-green-50 group-hover:text-green-500'
                }`}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm mb-0.5">Voice Commands</p>
                  <p className="text-xs text-gray-500">Navigate with voice</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={voiceEnabled}
                  onChange={handleVoiceToggle}
                  className="sr-only peer"
                  aria-label="Toggle voice commands"
                />
                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-500 rounded-full peer peer-checked:bg-green-600 transition-all duration-300 shadow-inner after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all after:shadow-md peer-checked:after:translate-x-7"></div>
              </label>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

            {/* Keyboard Shortcuts Info - Modern Design */}
            <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-2xl p-5 border-2 border-blue-100 shadow-inner">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-xs font-bold text-gray-800 uppercase tracking-wider">Keyboard Shortcuts</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 px-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all">
                  <span className="text-sm font-medium text-gray-700">Navigate</span>
                  <kbd className="px-3 py-1.5 bg-gradient-to-b from-gray-50 to-white rounded-lg border-2 border-gray-300 font-mono font-bold text-xs shadow-sm hover:shadow-md transition-shadow">Tab</kbd>
                </div>
                <div className="flex items-center justify-between py-2 px-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all">
                  <span className="text-sm font-medium text-gray-700">Select</span>
                  <kbd className="px-3 py-1.5 bg-gradient-to-b from-gray-50 to-white rounded-lg border-2 border-gray-300 font-mono font-bold text-xs shadow-sm hover:shadow-md transition-shadow">Enter</kbd>
                </div>
                <div className="flex items-center justify-between py-2 px-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all">
                  <span className="text-sm font-medium text-gray-700">Close</span>
                  <kbd className="px-3 py-1.5 bg-gradient-to-b from-gray-50 to-white rounded-lg border-2 border-gray-300 font-mono font-bold text-xs shadow-sm hover:shadow-md transition-shadow">Esc</kbd>
                </div>
              </div>
            </div>
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
