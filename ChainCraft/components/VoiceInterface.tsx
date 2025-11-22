'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function VoiceInterface() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isSupported, setIsSupported] = useState(false)
  const recognitionRef = useRef<any>(null)
  const isListeningRef = useRef(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // Check for Web Speech API support
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      setIsSupported(!!SpeechRecognition)

      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = false
        recognitionRef.current.lang = 'en-US'

        recognitionRef.current.onresult = (event: any) => {
          const command = event.results[event.results.length - 1][0].transcript.toLowerCase()
          setTranscript(command)
          handleVoiceCommand(command)
        }

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error)
          setIsListening(false)
          isListeningRef.current = false
        }

        recognitionRef.current.onend = () => {
          // Auto-restart if it was listening
          if (isListeningRef.current) {
            try {
              recognitionRef.current.start()
            } catch (error) {
              console.error('Failed to restart recognition:', error)
              setIsListening(false)
              isListeningRef.current = false
            }
          }
        }

        // Auto-start voice recognition
        const startVoiceRecognition = async () => {
          try {
            // Request microphone permission
            await navigator.mediaDevices.getUserMedia({ audio: true })
            // Small delay to ensure everything is ready
            setTimeout(() => {
              if (recognitionRef.current) {
                recognitionRef.current.start()
                setIsListening(true)
                isListeningRef.current = true
              }
            }, 1000)
          } catch (error) {
            console.error('Microphone permission denied or not available:', error)
            setIsListening(false)
            isListeningRef.current = false
          }
        }

        // Start after a brief delay
        const timer = setTimeout(() => {
          startVoiceRecognition()
        }, 500)

        return () => {
          clearTimeout(timer)
          if (recognitionRef.current) {
            recognitionRef.current.stop()
          }
        }
      }
    }
  }, [])

  const handleVoiceCommand = (command: string) => {
    // Navigate based on voice commands
    if (command.includes('home') || command.includes('go home')) {
      window.location.href = '/'
    } else if (command.includes('services') || command.includes('show services')) {
      window.location.href = '/services'
    } else if (command.includes('about')) {
      window.location.href = '/about'
    } else if (command.includes('contact') || command.includes('get in touch')) {
      window.location.href = '/contact'
    } else if (command.includes('portfolio')) {
      window.location.href = '/portfolio'
    } else if (command.includes('blog')) {
      window.location.href = '/blog'
    } else if (command.includes('scroll down')) {
      window.scrollBy({ top: 500, behavior: 'smooth' })
    } else if (command.includes('scroll up')) {
      window.scrollBy({ top: -500, behavior: 'smooth' })
    } else if (command.includes('stop listening') || command.includes('disable voice')) {
      setIsListening(false)
      isListeningRef.current = false
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start()
        setIsListening(true)
        isListeningRef.current = true
        setTranscript('')
      } catch (error) {
        console.error('Failed to start recognition:', error)
      }
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
      isListeningRef.current = false
    }
  }

  // Force fixed position function - can be called anytime
  const forceFixedPosition = () => {
    if (buttonRef.current) {
      const button = buttonRef.current
      // Force fixed position via direct style manipulation with !important
      button.style.setProperty('position', 'fixed', 'important')
      button.style.setProperty('bottom', '24px', 'important')
      button.style.setProperty('left', '16px', 'important')
      button.style.setProperty('top', 'auto', 'important')
      button.style.setProperty('right', 'auto', 'important')
      button.style.setProperty('z-index', '9999', 'important')
      button.style.setProperty('transform', 'none', 'important')
      button.style.setProperty('margin', '0', 'important')
    }
  }

  // Force button to always stay fixed - prevent any position changes
  useEffect(() => {
    // Force on mount and when state changes
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
  }, [isListening])

  if (!isSupported) {
    return null
  }

  return (
    <>
      <button
        ref={buttonRef}
        onClick={isListening ? stopListening : startListening}
        className={`voice-button-fixed rounded-full shadow-xl transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 group overflow-hidden ${
          isListening
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
        aria-label={isListening ? 'Stop listening' : 'Start voice'}
        style={{ 
          position: 'fixed',
          bottom: '24px',
          left: '16px',
          height: '56px',
          minWidth: '140px',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          whiteSpace: 'nowrap',
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
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%' }}>
          {isListening ? (
            <svg className="w-5 h-5 relative z-10 animate-pulse flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 012 0v4a1 1 0 11-2 0V7zM12 9a1 1 0 10-2 0v2a1 1 0 102 0V9z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5 relative z-10 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
            </svg>
          )}
          {/* <span className="text-sm font-medium whitespace-nowrap relative z-10">
            {isListening ? 'Stop listening' : 'Start voice'}
          </span> */}
          {/* Pulse animation - 1.5s duration */}
          {!isListening && (
            <span 
              className="absolute inset-0 rounded-full bg-blue-600 pulse-voice opacity-75 group-hover:opacity-0"
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            ></span>
          )}
        </div>
      </button>

      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl p-5 border border-red-100 min-w-[280px] backdrop-blur-sm"
            style={{
              position: 'fixed',
              bottom: '96px',
              left: '16px',
              zIndex: 9998
            }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-75"></div>
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-150"></div>
                  </div>
                  <p className="text-sm font-bold text-gray-900">Listening...</p>
                </div>
                <p className="text-xs text-gray-600 mb-3 leading-relaxed">Say commands like "go to services" or "contact" to navigate</p>
                {transcript && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                    <p className="text-xs font-medium text-blue-900 mb-1">Heard:</p>
                    <p className="text-sm text-blue-700 font-medium italic">{transcript}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

