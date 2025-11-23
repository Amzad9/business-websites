'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function VoiceInterface() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isSupported, setIsSupported] = useState(false)
  const [permissionDenied, setPermissionDenied] = useState(false)
  const [autoStarted, setAutoStarted] = useState(false) // Track if auto-started
  const recognitionRef = useRef<any>(null)
  const isListeningRef = useRef(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const onstartFiredRef = useRef(false) // Track if onstart actually fired
  const streamRef = useRef<MediaStream | null>(null) // Track microphone stream
  const autoStartAttemptedRef = useRef(false) // Track if auto-start was attempted
  const isChromeRef = useRef(false) // Track if browser is Chrome

  // Helper function to fill contact form fields
  const fillContactFormField = (fieldName: string, value: string) => {
    // Navigate to contact page if not already there
    if (window.location.pathname !== '/contact') {
      window.location.href = '/contact'
      // Wait for page to load, then fill the field
      setTimeout(() => {
        fillField(fieldName, value)
      }, 1000)
    } else {
      fillField(fieldName, value)
    }
  }

  const fillField = (fieldName: string, value: string) => {
    // Try different selectors for form fields
    const selectors = [
      `input[name="${fieldName}"]`,
      `textarea[name="${fieldName}"]`,
      `input[id="${fieldName}"]`,
      `textarea[id="${fieldName}"]`,
      `input[placeholder*="${fieldName}" i]`,
      `textarea[placeholder*="${fieldName}" i]`,
    ]

    for (const selector of selectors) {
      const field = document.querySelector(selector) as HTMLInputElement | HTMLTextAreaElement
      if (field) {
        // Set value
        field.value = value
        
        // Trigger input event for React form libraries
        const inputEvent = new Event('input', { bubbles: true })
        field.dispatchEvent(inputEvent)
        
        // Trigger change event
        const changeEvent = new Event('change', { bubbles: true })
        field.dispatchEvent(changeEvent)
        
        // Focus the field
        field.focus()
        
        console.log(`✅ Filled ${fieldName} field with: ${value}`)
        return true
      }
    }

    // If not found, try to save to localStorage for progressive forms
    const savedData = localStorage.getItem('chaincraft-lead-data') || '{}'
    const data = JSON.parse(savedData)
    data[fieldName] = value
    localStorage.setItem('chaincraft-lead-data', JSON.stringify(data))
    
    console.log(`✅ Saved ${fieldName} to localStorage: ${value}`)
    return false
  }

  // Handle voice commands - use useCallback to avoid closure issues
  const handleVoiceCommand = useCallback((command: string) => {
    // Clean and normalize the command
    const cleanCommand = command.toLowerCase().trim().replace(/[^\w\s]/g, '')
    console.log('Processing command:', cleanCommand, 'original:', command)
    
    // More flexible matching - check for keywords (order matters - most specific first)
    if (cleanCommand.includes('go to service') || cleanCommand.includes('open service') || cleanCommand.includes('show service')) {
      console.log('Navigating to services page')
      window.location.href = '/services'
    } else if (cleanCommand.includes('go to about') || cleanCommand.includes('open about') || cleanCommand.includes('show about')) {
      console.log('Navigating to about page')
      window.location.href = '/about'
    } else if (cleanCommand.includes('go to contact') || cleanCommand.includes('open contact') || cleanCommand.includes('show contact')) {
      console.log('Navigating to contact page')
      window.location.href = '/contact'
    } else if (cleanCommand.includes('go to portfolio') || cleanCommand.includes('open portfolio') || cleanCommand.includes('show portfolio')) {
      console.log('Navigating to portfolio page')
      window.location.href = '/portfolio'
    } else if (cleanCommand.includes('go to blog') || cleanCommand.includes('open blog') || cleanCommand.includes('show blog')) {
      console.log('Navigating to blog page')
      window.location.href = '/blog'
    } else if (cleanCommand.includes('go home') || cleanCommand.includes('go to home') || cleanCommand.includes('home page')) {
      console.log('Navigating to home page')
      window.location.href = '/'
    } else if (cleanCommand.includes('service') && !cleanCommand.includes('contact')) {
      console.log('Navigating to services page (matched "service")')
      window.location.href = '/services'
    } else if (cleanCommand.includes('about') && !cleanCommand.includes('contact')) {
      console.log('Navigating to about page (matched "about")')
      window.location.href = '/about'
    } else if (cleanCommand.includes('contact')) {
      console.log('Navigating to contact page (matched "contact")')
      window.location.href = '/contact'
    } else if (cleanCommand.includes('portfolio') || (cleanCommand.includes('work') && !cleanCommand.includes('how'))) {
      console.log('Navigating to portfolio page (matched "portfolio/work")')
      window.location.href = '/portfolio'
    } else if (cleanCommand.includes('blog')) {
      console.log('Navigating to blog page (matched "blog")')
      window.location.href = '/blog'
    } else if (cleanCommand.includes('home') && !cleanCommand.includes('phone')) {
      console.log('Navigating to home page (matched "home")')
      window.location.href = '/'
    } else if (cleanCommand.includes('scroll down') || cleanCommand.includes('scroll down page') || cleanCommand.includes('scroll down')) {
      console.log('Scrolling down')
      window.scrollBy({ top: 500, behavior: 'smooth' })
      setTranscript('✅ Scrolling down...')
      setTimeout(() => setTranscript(''), 2000)
    } else if (cleanCommand.includes('scroll up') || cleanCommand.includes('scroll up page') || cleanCommand.includes('scroll up')) {
      console.log('Scrolling up')
      window.scrollBy({ top: -500, behavior: 'smooth' })
      setTranscript('✅ Scrolling up...')
      setTimeout(() => setTranscript(''), 2000)
    } else if (cleanCommand.includes('scroll to top') || cleanCommand.includes('go to top')) {
      console.log('Scrolling to top')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setTranscript('✅ Scrolling to top...')
      setTimeout(() => setTranscript(''), 2000)
    } else if (cleanCommand.includes('scroll to bottom') || cleanCommand.includes('go to bottom')) {
      console.log('Scrolling to bottom')
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
      setTranscript('✅ Scrolling to bottom...')
      setTimeout(() => setTranscript(''), 2000)
    } else if (cleanCommand.includes('fill contact form') || cleanCommand.includes('open contact form') || cleanCommand.includes('go to contact form')) {
      console.log('Navigating to contact page to fill form')
      window.location.href = '/contact'
      setTranscript('✅ Opening contact form...')
      setTimeout(() => setTranscript(''), 2000)
    } else if (cleanCommand.includes('fill name') || cleanCommand.includes('my name is') || cleanCommand.includes('name is')) {
      const match = command.match(/\b(?:fill name|my name is|name is|i am|i'm)\s+(.+?)(?:\s|$)/i)
      if (match && match[1]) {
        const name = match[1].trim()
        console.log('Filling name field:', name)
        fillContactFormField('name', name)
        setTranscript(`✅ Filling name: ${name}`)
        setTimeout(() => setTranscript(''), 2000)
      }
    } else if (cleanCommand.includes('fill email') || cleanCommand.includes('my email is') || cleanCommand.includes('email is')) {
      const match = command.match(/\b(?:fill email|my email is|email is|e mail is)\s+([^\s]+@[^\s]+)/i)
      if (match && match[1]) {
        const email = match[1].trim()
        console.log('Filling email field:', email)
        fillContactFormField('email', email)
        setTranscript(`✅ Filling email: ${email}`)
        setTimeout(() => setTranscript(''), 2000)
      }
    } else if (cleanCommand.includes('fill phone') || cleanCommand.includes('my phone is') || cleanCommand.includes('phone is') || cleanCommand.includes('phone number')) {
      const match = command.match(/\b(?:fill phone|my phone is|phone is|phone number is|number is)\s+(.+?)(?:\s|$)/i)
      if (match && match[1]) {
        const phone = match[1].trim().replace(/\s+/g, '')
        console.log('Filling phone field:', phone)
        fillContactFormField('phone', phone)
        setTranscript(`✅ Filling phone: ${phone}`)
        setTimeout(() => setTranscript(''), 2000)
      }
    } else if (cleanCommand.includes('fill message') || cleanCommand.includes('my message is') || cleanCommand.includes('message is')) {
      const match = command.match(/\b(?:fill message|my message is|message is|say|tell|write)\s+(.+)/i)
      if (match && match[1]) {
        const message = match[1].trim()
        console.log('Filling message field:', message)
        fillContactFormField('message', message)
        setTranscript(`✅ Filling message: ${message.substring(0, 50)}${message.length > 50 ? '...' : ''}`)
        setTimeout(() => setTranscript(''), 3000)
      }
    } else if (cleanCommand.includes('submit form') || cleanCommand.includes('send form') || cleanCommand.includes('submit contact')) {
      console.log('Submitting contact form')
      const submitButton = document.querySelector('button[type="submit"], input[type="submit"]')
      if (submitButton) {
        (submitButton as HTMLElement).click()
        setTranscript('✅ Submitting form...')
      } else {
        setTranscript('❌ Submit button not found. Please fill the form first.')
      }
      setTimeout(() => setTranscript(''), 2000)
    } else if (cleanCommand.includes('open menu') || cleanCommand.includes('show menu') || cleanCommand.includes('toggle menu')) {
      console.log('Opening mobile menu')
      const menuButton = document.querySelector('button[class*="menu"], button[aria-label*="menu" i]') as HTMLElement
      if (menuButton) {
        menuButton.click()
        setTranscript('✅ Opening menu...')
      } else {
        setTranscript('❌ Menu button not found')
      }
      setTimeout(() => setTranscript(''), 2000)
    } else if (cleanCommand.includes('close menu') || cleanCommand.includes('hide menu')) {
      console.log('Closing mobile menu')
      const closeButton = document.querySelector('button[aria-label*="close" i], button[class*="close"]') as HTMLElement
      if (closeButton) {
        closeButton.click()
        setTranscript('✅ Closing menu...')
      }
      setTimeout(() => setTranscript(''), 2000)
    }
    // Portfolio Filter Commands
    else if (cleanCommand.includes('filter portfolio') || cleanCommand.includes('show portfolio filter')) {
      const match = command.match(/\b(?:filter portfolio|show portfolio filter|filter by)\s+(.+)/i)
      if (match && match[1]) {
        const category = match[1].trim()
        console.log('Filtering portfolio by:', category)
        const filterButtons = document.querySelectorAll('button[class*="rounded"], button[class*="filter"]')
        filterButtons.forEach(btn => {
          if (btn.textContent?.toLowerCase().includes(category.toLowerCase())) {
            (btn as HTMLElement).click()
            setTranscript(`✅ Filtering by: ${category}`)
          }
        })
        setTimeout(() => setTranscript(''), 2000)
      }
    } else if (cleanCommand.includes('show all projects') || cleanCommand.includes('show all portfolio')) {
      const allButton = Array.from(document.querySelectorAll('button')).find(btn => 
        btn.textContent?.toLowerCase().includes('all')
      )
      if (allButton) {
        (allButton as HTMLElement).click()
        setTranscript('✅ Showing all projects')
      }
      setTimeout(() => setTranscript(''), 2000)
    }
    // Button Click Commands
    else if (cleanCommand.includes('click button') || (cleanCommand.includes('click') && cleanCommand.includes('button'))) {
      const match = command.match(/\b(?:click|press|tap)\s+(?:the\s+)?(.+?)\s+(?:button|link)/i)
      if (match && match[1]) {
        const buttonName = match[1].trim().toLowerCase()
        console.log('Clicking button:', buttonName)
        const buttons = Array.from(document.querySelectorAll('button, a, [role="button"]'))
        const button = buttons.find(btn => 
          btn.textContent?.toLowerCase().includes(buttonName) ||
          btn.getAttribute('aria-label')?.toLowerCase().includes(buttonName)
        )
        if (button) {
          (button as HTMLElement).click()
          setTranscript(`✅ Clicked ${buttonName} button`)
        } else {
          setTranscript(`❌ Button "${buttonName}" not found`)
        }
        setTimeout(() => setTranscript(''), 2000)
      }
    }
    // CTA Commands
    else if (cleanCommand.includes('get started') || cleanCommand.includes('start now')) {
      const ctaButton = Array.from(document.querySelectorAll('button, a')).find(btn => 
        btn.textContent?.toLowerCase().includes('get started') ||
        btn.textContent?.toLowerCase().includes('start now')
      )
      if (ctaButton) {
        (ctaButton as HTMLElement).click()
        setTranscript('✅ Clicked CTA button')
      } else {
        window.location.href = '/contact'
        setTranscript('✅ Opening contact page...')
      }
      setTimeout(() => setTranscript(''), 2000)
    }
    // Browser Navigation
    else if (cleanCommand.includes('go back') || cleanCommand.includes('back page')) {
      console.log('Going back')
      window.history.back()
      setTranscript('✅ Going back...')
      setTimeout(() => setTranscript(''), 2000)
    } else if (cleanCommand.includes('go forward') || cleanCommand.includes('forward page')) {
      console.log('Going forward')
      window.history.forward()
      setTranscript('✅ Going forward...')
      setTimeout(() => setTranscript(''), 2000)
    } else if (cleanCommand.includes('refresh page') || cleanCommand.includes('reload page') || cleanCommand.includes('refresh')) {
      console.log('Refreshing page')
      window.location.reload()
    }
    // Modal/Dialog Controls
    else if (cleanCommand.includes('close popup') || cleanCommand.includes('close modal') || cleanCommand.includes('close dialog')) {
      const closeButtons = document.querySelectorAll('button[aria-label*="close" i], [role="dialog"] button')
      closeButtons.forEach(btn => {
        if ((btn as HTMLElement).click) {
          (btn as HTMLElement).click()
        }
      })
      setTranscript('✅ Closing modal...')
      setTimeout(() => setTranscript(''), 2000)
    }
    // Accessibility Controls
    else if (cleanCommand.includes('open accessibility') || cleanCommand.includes('show accessibility')) {
      const accessibilityButton = document.querySelector('[aria-label*="accessibility" i], [class*="accessibility"] button') as HTMLElement
      if (accessibilityButton) {
        accessibilityButton.click()
        setTranscript('✅ Opening accessibility options...')
      } else {
        setTranscript('❌ Accessibility button not found')
      }
      setTimeout(() => setTranscript(''), 2000)
    }
    // Reading Content
    else if (cleanCommand.includes('read page') || cleanCommand.includes('read content') || cleanCommand.includes('read aloud')) {
      const mainContent = document.querySelector('main, article, [role="main"]')
      if (mainContent) {
        const text = mainContent.textContent || ''
        const utterance = new SpeechSynthesisUtterance(text.substring(0, 500))
        utterance.rate = 0.9
        window.speechSynthesis.speak(utterance)
        setTranscript('✅ Reading page content...')
      } else {
        setTranscript('❌ Content not found')
      }
      setTimeout(() => setTranscript(''), 3000)
    } else if (cleanCommand.includes('stop reading') || cleanCommand.includes('pause reading')) {
      window.speechSynthesis.cancel()
      setTranscript('✅ Stopped reading')
      setTimeout(() => setTranscript(''), 2000)
    }
    // Search Functionality
    else if (cleanCommand.includes('search') || cleanCommand.includes('find')) {
      const match = command.match(/\b(?:search|find)\s+(?:for\s+)?(.+)/i)
      if (match && match[1]) {
        const searchTerm = match[1].trim()
        console.log('Searching for:', searchTerm)
        const searchInput = document.querySelector('input[type="search"], input[placeholder*="search" i]') as HTMLInputElement
        if (searchInput) {
          searchInput.value = searchTerm
          searchInput.dispatchEvent(new Event('input', { bubbles: true }))
          const searchButton = searchInput.closest('form')?.querySelector('button[type="submit"]')
          if (searchButton) {
            (searchButton as HTMLElement).click()
          }
          setTranscript(`✅ Searching for: ${searchTerm}`)
        } else {
          setTranscript(`❌ Search function not available`)
        }
        setTimeout(() => setTranscript(''), 2000)
      }
    }
    // Stop Listening
    else if (cleanCommand.includes('stop listening') || cleanCommand.includes('disable voice') || cleanCommand.includes('stop voice')) {
      console.log('Stopping voice recognition')
      setIsListening(false)
      isListeningRef.current = false
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      setTranscript('✅ Voice recognition stopped')
      setTimeout(() => setTranscript(''), 2000)
    }
    // Help Command
    else if (cleanCommand.includes('help') || cleanCommand.includes('what can i say') || cleanCommand.includes('show commands')) {
      const helpText = `Available commands: Navigation (home, services, about, contact), Scrolling (scroll up/down), Forms (fill name/email/phone), Menu (open/close menu), Portfolio (filter portfolio, show all), Buttons (click button), Search (search for term), Reading (read page), Accessibility (open accessibility), and more.`
      setTranscript(helpText.substring(0, 200) + '...')
      console.log('Help requested')
      setTimeout(() => setTranscript(''), 5000)
    }
    // Default - unrecognized command
    else {
      console.log('Command not recognized:', cleanCommand)
      setTranscript(`Command not recognized: "${cleanCommand}". Say "help" for available commands.`)
      setTimeout(() => setTranscript(''), 3000)
    }
  }, [])

  useEffect(() => {
    // Check for Web Speech API support
    if (typeof window !== 'undefined') {
      // Chrome uses webkitSpeechRecognition, Safari uses SpeechRecognition
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
      isChromeRef.current = isChrome
      
      setIsSupported(!!SpeechRecognition)

      if (SpeechRecognition) {
        try {
          recognitionRef.current = new SpeechRecognition()
          
          // Chrome-specific configuration
          if (isChrome) {
            // Chrome needs explicit service URI for better reliability
            if ((recognitionRef.current as any).serviceURI) {
              (recognitionRef.current as any).serviceURI = 'wss://www.google.com/speech-api/full-duplex/v1'
            }
          }
          
          recognitionRef.current.continuous = true // Keep listening continuously
          recognitionRef.current.interimResults = true // Enable interim results for real-time feedback
          recognitionRef.current.lang = 'en-US'
          recognitionRef.current.maxAlternatives = 1
          
          console.log('Speech Recognition initialized:', {
            browser: isChrome ? 'Chrome' : 'Other',
            continuous: recognitionRef.current.continuous,
            interimResults: recognitionRef.current.interimResults,
            lang: recognitionRef.current.lang,
            serviceURI: (recognitionRef.current as any).serviceURI
          })

          recognitionRef.current.onresult = (event: any) => {
            console.log('🎤 Recognition result event received!', event)
            console.log('Event results count:', event.results ? event.results.length : 0)
            
            if (!event.results || event.results.length === 0) {
              console.warn('⚠️ No results in recognition event')
              return
            }

            // Process all results to get the complete transcript
            let fullTranscript = ''
            let finalTranscript = ''
            
            for (let i = 0; i < event.results.length; i++) {
              const result = event.results[i]
              if (result && result[0]) {
                const text = result[0].transcript
                const confidence = result[0].confidence || 0
                console.log(`Result ${i}: "${text}" (isFinal: ${result.isFinal}, confidence: ${confidence})`)
                fullTranscript += text + ' '
                
                // Save final transcripts separately
                if (result.isFinal) {
                  finalTranscript += text + ' '
                }
              }
            }

            // Clean up the transcript
            const transcriptText = fullTranscript.toLowerCase().trim()
            const finalText = finalTranscript.toLowerCase().trim()
            
            console.log('📝 Full transcript:', transcriptText)
            console.log('📝 Final transcript:', finalText || 'none yet')
            
            // Show interim results in real-time for user feedback
            if (transcriptText) {
              console.log('✅ Setting transcript to:', transcriptText)
              // Auto-show popup when we get any transcript (user is speaking)
              setIsListening(true)
              isListeningRef.current = true
              setTranscript(transcriptText)
            }
            
            // Process final results as commands
            if (finalText) {
              console.log('✅✅ Final transcript received, processing command:', finalText)
              // Process the command immediately
              handleVoiceCommand(finalText)
              // Show success feedback
              setTranscript(`✅ Executing: "${finalText}"`)
            }
            
            // Also process interim results if they contain command keywords
            // (Sometimes browsers don't mark results as final immediately)
            if (transcriptText && !finalText && transcriptText.length > 3) {
              // Check if transcript contains command keywords
              const hasCommand = transcriptText.includes('service') || 
                                transcriptText.includes('contact') || 
                                transcriptText.includes('about') || 
                                transcriptText.includes('portfolio') || 
                                transcriptText.includes('blog') ||
                                transcriptText.includes('home')
              
              console.log('Checking interim result for commands - hasCommand:', hasCommand)
              
              // Process immediately if it looks like a command (don't wait)
              if (hasCommand && !transcriptText.includes('✅')) {
                console.log('✅✅ Processing interim result as command (immediately):', transcriptText)
                handleVoiceCommand(transcriptText)
                setTranscript(`✅ Executing: "${transcriptText}"`)
              }
            }
          }

          recognitionRef.current.onerror = (event: any) => {
            console.error('❌ Recognition error:', event.error, event)
            
            // Handle errors
            if (event.error === 'no-speech') {
              console.log('ℹ️ No speech detected - continuing to listen (this is normal)')
              // Don't show transcript - just keep listening
              return
            } else if (event.error === 'aborted') {
              console.log('ℹ️ Recognition aborted')
              return
            } else if (event.error === 'audio-capture') {
              console.error('❌ No microphone found')
              setTranscript('❌ Microphone not found. Please check your microphone settings.')
              if (isListeningRef.current) {
                setTimeout(() => {
                  setIsListening(false)
                  isListeningRef.current = false
                }, 3000)
              }
            } else if (event.error === 'network') {
              console.error('❌ Network error')
              setTranscript('❌ Network error. Please check your internet connection.')
              if (isListeningRef.current) {
                setTimeout(() => {
                  setIsListening(false)
                  isListeningRef.current = false
                }, 3000)
              }
            } else if (event.error === 'not-allowed') {
              // Permission denied - even if site info shows microphone as "on"
              console.error('❌ Permission denied (not-allowed error)')
              console.error('⚠️ This can happen even if the site info popup shows microphone as "on"')
              setPermissionDenied(true)
              const isChrome = isChromeRef.current
              
              // Check permission state to provide specific instructions (async)
              checkMicrophonePermission().then((permissionState) => {
                const state: PermissionState = permissionState === 'unknown' ? 'prompt' : permissionState
                
              const errorMsg = isChrome 
                ? state === 'denied'
                  ? '🔒 Microphone blocked. Click 🔒 lock icon → Site settings → Reset permission → Refresh page'
                  : '❌ Permission denied. Click 🔒 lock icon → Site settings → Reset permission → Refresh page'
                : '❌ Microphone permission denied. Allow access in browser settings.'
                
                setTranscript(errorMsg)
              }).catch(() => {
                // Fallback message if permission check fails
                const errorMsg = isChrome 
                  ? '❌ Permission denied - try "Reset permission" in Site settings, then refresh and try again.'
                  : '❌ Microphone permission denied. Please click the microphone icon in your browser address bar and allow access, then click the voice button again.'
                setTranscript(errorMsg)
              })
              
              // Keep popup open so user can see instructions
              // Don't stop listening state - let user see the message
              return
            } else if (event.error === 'service-not-allowed') {
              // Chrome-specific: Service not allowed
              console.error('❌ Service not allowed (Chrome specific)')
              setPermissionDenied(true)
              setTranscript('❌ Speech recognition service not available. Please check your internet connection and try again. Chrome requires internet connection for speech recognition.')
              return
            } else {
              console.error('❌ Unknown recognition error:', event.error)
              const isChrome = isChromeRef.current
              if (isChrome && (event.error === 'bad-grammar' || event.error === 'language-not-supported')) {
                setTranscript(`❌ Language error: ${event.error}. Please ensure your browser language is set to English (US).`)
              } else {
                setTranscript(`❌ Error: ${event.error}`)
              }
            }
          }

          recognitionRef.current.onstart = () => {
            onstartFiredRef.current = true
            console.log('✅✅ Recognition started successfully - microphone is ACTIVE')
            // Show popup immediately when recognition starts (user expects to see it)
            setIsListening(true)
            isListeningRef.current = true
            setTranscript('🎤 Listening... Say a command like "go to services" or "contact"')
            console.log('🎤 Recognition started - popup should be visible')
          }

          recognitionRef.current.onaudiostart = () => {
            console.log('✅ Audio capture started - microphone is recording')
            // Don't call setIsListening here - onstart already did it
            // Just confirm state in ref
            if (!isListeningRef.current) {
              isListeningRef.current = true
            }
          }

          recognitionRef.current.onaudioend = () => {
            console.log('Audio capture ended - but continuing to listen')
            // Don't stop - this is normal during speech pauses
          }

          recognitionRef.current.onsoundstart = () => {
            console.log('🎤 Sound detected - speech recognition active')
            // Auto-show popup when sound is detected
            setIsListening(true)
            isListeningRef.current = true
            setTranscript('🎤 Sound detected... listening...')
          }

          recognitionRef.current.onsoundend = () => {
            console.log('Sound ended - waiting for next sound')
          }

          recognitionRef.current.onspeechstart = () => {
            console.log('🗣️🗣️ Speech started - voice detected!')
            // Auto-show popup when speech is detected
            setIsListening(true)
            isListeningRef.current = true
            setTranscript('🗣️ Speaking detected... processing...')
          }

          recognitionRef.current.onspeechend = () => {
            console.log('Speech ended - still listening')
          }


          recognitionRef.current.onend = () => {
            console.log('Recognition ended, isListeningRef:', isListeningRef.current, 'onstartFired:', onstartFiredRef.current)
            
            // Chrome-specific: Chrome might end recognition more frequently
            // Only auto-restart if:
            // 1. User didn't manually stop (isListeningRef is true)
            // 2. Recognition actually started successfully (onstart fired)
            if (isListeningRef.current && onstartFiredRef.current) {
              // Reset the flag for next attempt
              onstartFiredRef.current = false
              
              // Chrome needs slightly longer delay for restart
              const delay = isChromeRef.current ? 800 : 500
              console.log(`🔄 Auto-restarting recognition in ${delay}ms... (Chrome: ${isChromeRef.current})`)
              
              setTimeout(() => {
                if (recognitionRef.current && isListeningRef.current) {
                  try {
                    console.log('Attempting to restart recognition...')
                    // Chrome: Stop any existing recognition before starting new one
                    if (isChromeRef.current) {
                      try {
                        recognitionRef.current.stop()
                      } catch (e) {
                        // Ignore errors when stopping
                      }
                    }
                    recognitionRef.current.start()
                    console.log('✅ Restart command sent')
                    // onstart will confirm if it actually started
                  } catch (error: any) {
                    console.error('Restart error:', error)
                    if (error.name === 'InvalidStateError') {
                      // Already started - this is fine
                      console.log('Recognition already running - that\'s OK')
                      onstartFiredRef.current = true
                    } else {
                      // Failed to restart - don't try again, let user know
                      console.error('Failed to restart recognition - stopping')
                      setIsListening(false)
                      isListeningRef.current = false
                    }
                  }
                } else {
                  console.log('Not restarting - user stopped or state changed')
                }
              }, delay)
            } else {
              // If onstart never fired, recognition probably isn't working
              if (isListeningRef.current && !onstartFiredRef.current) {
                console.warn('⚠️ Recognition ended but never actually started - closing popup')
                setIsListening(false)
                isListeningRef.current = false
              } else {
                console.log('Not restarting - user stopped')
              }
              onstartFiredRef.current = false
            }
          }
        } catch (error) {
          console.error('Failed to initialize speech recognition:', error)
          setIsSupported(false)
        }
      }
    }
  }, []) // Empty dependency array - handlers are stable and don't need to be recreated

  // Auto-start voice recognition when component mounts (if permission already granted)
  useEffect(() => {
    const autoStartListening = async () => {
      // Don't auto-start if already attempted or not supported
      if (autoStartAttemptedRef.current || !isSupported || !recognitionRef.current) {
        return
      }

      autoStartAttemptedRef.current = true

      // Check if we already have microphone permission
      try {
        console.log('🔍 Checking microphone permission for auto-start...')
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        
        // We have permission! Stop the test stream
        stream.getTracks().forEach(track => track.stop())
        
        console.log('✅ Microphone permission already granted - auto-starting recognition...')
        
        // Small delay to ensure everything is ready
        setTimeout(() => {
          if (recognitionRef.current && !isListeningRef.current) {
            try {
              // Start recognition automatically
              recognitionRef.current.start()
              setAutoStarted(true)
              console.log('✅ Auto-started voice recognition')
            } catch (error: any) {
              console.log('Auto-start failed (will require manual start):', error.name)
              // Not an error - just means we need user interaction
            }
          }
        }, 500)
      } catch (error: any) {
        // Permission not granted yet - that's OK, user will need to click button
        console.log('ℹ️ Microphone permission not yet granted - will require button click')
        autoStartAttemptedRef.current = false // Allow retry after permission is granted
      }
    }

    // Try to auto-start after a short delay
    if (isSupported && recognitionRef.current) {
      const timer = setTimeout(() => {
        autoStartListening()
      }, 1000) // Wait 1 second after component mounts

      return () => clearTimeout(timer)
    }
  }, [isSupported, isListening])

  // Check microphone permission state (Chrome-specific helper)
  const checkMicrophonePermission = async (): Promise<'granted' | 'denied' | 'prompt' | 'unknown'> => {
    try {
      // Check if Permissions API is available
      if (navigator.permissions && navigator.permissions.query) {
        const result = await navigator.permissions.query({ name: 'microphone' as PermissionName })
        console.log('Microphone permission state:', result.state)
        return result.state as 'granted' | 'denied' | 'prompt'
      }
    } catch (error: any) {
      console.log('Permission query not supported or failed:', error)
    }
    return 'unknown'
  }

  // Request microphone permission explicitly
  const requestMicrophonePermission = async (): Promise<boolean> => {
    try {
      console.log('🎤 Requesting microphone permission...')
      setTranscript('🎤 Requesting microphone access...')
      
      // Request microphone permission using getUserMedia
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      
      // Store the stream to keep permission active
      streamRef.current = stream
      
      // Stop the stream tracks (we don't need to keep recording, just needed permission)
      stream.getTracks().forEach(track => track.stop())
      streamRef.current = null
      
      console.log('✅ Microphone permission granted!')
      setPermissionDenied(false)
      setTranscript('✅ Microphone access granted! Starting voice recognition...')
      return true
    } catch (error: any) {
      console.error('❌ Microphone permission denied:', error)
      setPermissionDenied(true)
      
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        setTranscript('❌ Microphone permission denied. Allow access in browser settings.')
      } else if (error.name === 'NotFoundError') {
        setTranscript('❌ No microphone found. Please connect a microphone and try again.')
      } else {
        setTranscript(`❌ Error requesting microphone: ${error.message || 'Unknown error'}`)
      }
      
      return false
    }
  }

  const startListening = async () => {
    console.log('🔴 START LISTENING CALLED')
    console.log('Current state:', { isSupported, hasRecognition: !!recognitionRef.current, isListening })
    
    if (!isSupported || !recognitionRef.current) {
      console.log('Cannot start:', { isSupported, hasRecognition: !!recognitionRef.current })
      if (!isSupported) {
        alert('Voice recognition is not supported in your browser. Please use Chrome, Edge, or Safari.')
      }
      return
    }

    if (isListening) {
      console.log('Already listening')
      return
    }

    // Set listening state FIRST - before anything else
    // This ensures popup is ALWAYS visible when button is clicked (even if permission denied)
    console.log('✅ Setting isListening to TRUE - popup should appear now')
    setIsListening(true)
    isListeningRef.current = true
    setTranscript('🎤 Requesting microphone access...')
    setPermissionDenied(false)
    
    // Force popup to be visible immediately (especially for Chrome)
    // Double-check to ensure popup shows
    setTimeout(() => {
      setIsListening(true)
      isListeningRef.current = true
      console.log('Force-set isListening to true after 10ms')
    }, 10)
    
    // Chrome-specific: Double-check again after a longer delay
    if (isChromeRef.current) {
      setTimeout(() => {
        setIsListening(true)
        isListeningRef.current = true
        console.log('Chrome: Force-set isListening to true after 100ms')
      }, 100)
    }

    try {
      const isChrome = isChromeRef.current
      
      // IMPORTANT: Chrome's Web Speech API handles permissions differently
      // In Chrome, we MUST NOT pre-request with getUserMedia - it causes conflicts
      // Chrome will automatically request permission when recognition.start() is called
      // For Safari, we can pre-request with getUserMedia
      
      if (!isChrome) {
        // Safari: Pre-request microphone permission with getUserMedia
        console.log('🎙️ Requesting microphone permission first (Safari)...')
        const hasPermission = await requestMicrophonePermission()
        
        if (!hasPermission) {
          console.log('Permission denied - keeping popup open for instructions')
          return
        }

        // Wait a moment for permission to be fully granted
        await new Promise(resolve => setTimeout(resolve, 300))
        console.log('🎙️ Starting voice recognition (Safari)...')
        setTranscript('🎤 Starting voice recognition...')
      } else {
        // Chrome: DO NOT use getUserMedia - it conflicts with Web Speech API permission
        // Chrome's Web Speech API will request permission automatically when .start() is called
        console.log('🎙️ Chrome detected - checking permission state first...')
        
        // IMPORTANT: Check permission state FIRST to detect if it's already denied
        // If permission is "denied", Chrome won't show popup - we need to guide user to fix it
        try {
          const permissionStateResult = await Promise.race([
            checkMicrophonePermission(),
            new Promise<'prompt'>((resolve) => setTimeout(() => resolve('prompt'), 500)) // Timeout after 500ms
          ])
          
          // Convert 'unknown' to 'prompt' for TypeScript compatibility
          const permissionState: PermissionState = permissionStateResult === 'unknown' ? 'prompt' : permissionStateResult
          
          console.log('Chrome microphone permission state:', permissionState)
          
          if (permissionState === 'denied') {
            // Permission is already blocked for THIS SITE (even though global Chrome setting is enabled)
            // Chrome won't show popup because site-specific permission is denied
            // Show clear instructions to user
            setTranscript('🔒 Microphone blocked. Click 🔒 lock icon → Site settings → Microphone → Allow → Refresh page')
            setPermissionDenied(true)
            // Don't try to start - it will fail anyway
            return
          } else if (permissionState === 'granted') {
            // Permission already granted - proceed
            console.log('✅ Microphone permission already granted - proceeding')
            setTranscript('✅ Microphone permission granted - starting recognition...')
          } else {
            // 'prompt' or 'unknown' - Chrome will show permission popup when .start() is called
            // Even if the site info shows microphone as "on", Web Speech API has its own permission
            setTranscript('🎤 Starting voice recognition...\n\n💡 If permission popup appears, click "Allow"')
          }
        } catch (e) {
          // Permission query failed - proceed anyway (Chrome will show popup)
          console.log('Permission check failed, proceeding anyway:', e)
          setTranscript('🎤 Starting voice recognition - Chrome will show permission popup...')
        }
      }
      
      // Chrome-specific: Ensure recognition is stopped before starting
      if (isChrome) {
        try {
          recognitionRef.current.stop()
        } catch (e) {
          // Ignore if not running
        }
        // Minimal delay for Chrome - don't wait too long or permission prompt might not show
        // Chrome's permission prompt must be triggered from user gesture, so minimize delays
        await new Promise(resolve => setTimeout(resolve, 50))
      }
      
      // CRITICAL: For Chrome, .start() must be called directly to trigger permission prompt
      // Chrome's permission popup only appears when .start() is called from a user gesture
      console.log('🎙️ Calling recognition.start() - Chrome should show permission popup now...')
      console.log('📍 Current URL:', window.location.href)
      console.log('📍 Protocol:', window.location.protocol)
      console.log('📍 Hostname:', window.location.hostname)
      
      try {
        recognitionRef.current.start()
        console.log('✅ Recognition.start() called successfully (Chrome:', isChrome + ')')
      } catch (startError: any) {
        console.error('❌ Error calling recognition.start():', startError)
        setTranscript(`❌ Error starting: ${startError.message || 'Unknown error'}. Try clicking "Reset permission" in site settings, then try again.`)
        setIsListening(true)
        isListeningRef.current = true
        return
      }
      
      // For Chrome, the permission popup should appear now
      // If it doesn't appear, the permission might already be set to "denied" at site level
      // Note: Even if site info shows microphone "on", Web Speech API might need separate permission
      
      // Confirm popup is visible after a short delay
      setTimeout(() => {
        console.log('State check after 100ms - isListening state:', isListening, 'isListeningRef:', isListeningRef.current)
        if (!isListeningRef.current) {
          console.warn('⚠️ Listening stopped unexpectedly - restoring')
          setIsListening(true)
          isListeningRef.current = true
        }
      }, 100)
      
      // Double-check after longer delay
      setTimeout(() => {
        if (isListeningRef.current) {
          console.log('✅ Still listening after 500ms - recognition is active')
        } else {
          console.warn('⚠️ Listening stopped - check errors above')
        }
      }, 500)
    } catch (error: any) {
      console.error('Start error:', error)
      
      if (error.name === 'InvalidStateError') {
        // Already started - this is fine, keep listening state
        console.log('Recognition already started')
        setIsListening(true)
        isListeningRef.current = true
      } else if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        // Permission denied
        console.warn('Permission denied when starting:', error)
        setPermissionDenied(true)
        const isChrome = isChromeRef.current
        
        // Check permission state to provide more specific feedback
        const permissionState = await checkMicrophonePermission()
        console.log('Permission state after error:', permissionState)
        
        let errorMsg = ''
        if (isChrome) {
          if (permissionState === 'denied') {
            errorMsg = '🔒 Microphone blocked. Click 🔒 lock icon → Site settings → Microphone → Allow → Refresh page'
          } else {
            errorMsg = '❌ Permission denied. Click 🔒 lock icon → Site settings → Reset permission → Refresh page'
          }
        } else {
          errorMsg = '❌ Microphone permission denied. Allow access in browser settings.'
        }
        
        setTranscript(errorMsg)
        // Keep popup open so user can see instructions
        // Don't close popup - user needs to see the instructions
      } else {
        // Other errors - reset state
        console.error('Unknown start error:', error)
        setIsListening(false)
        isListeningRef.current = false
        setTranscript(`❌ Error: ${error.message || 'Unknown error'}. Please try again.`)
      }
    }
  }

  const stopListening = () => {
    console.log('Stopping listening...')
    if (recognitionRef.current) {
      try {
        isListeningRef.current = false // Set this first to prevent auto-restart
        recognitionRef.current.stop()
      } catch (error) {
        console.error('Stop error:', error)
      }
      setIsListening(false)
      setTranscript('')
    }
  }

  // Force fixed position
  useEffect(() => {
    const forceFixed = () => {
      if (buttonRef.current) {
        buttonRef.current.style.setProperty('position', 'fixed', 'important')
        buttonRef.current.style.setProperty('bottom', '24px', 'important')
        buttonRef.current.style.setProperty('left', '16px', 'important')
        buttonRef.current.style.setProperty('z-index', '9999', 'important')
      }
    }

    forceFixed()
    const timeout1 = setTimeout(forceFixed, 10)
    const timeout2 = setTimeout(forceFixed, 100)
    
    const observer = new MutationObserver(() => {
      setTimeout(forceFixed, 0)
    })
    
    if (buttonRef.current) {
      observer.observe(buttonRef.current, {
        attributes: true,
        attributeFilter: ['style', 'class']
      })
      
      return () => {
        clearTimeout(timeout1)
        clearTimeout(timeout2)
        observer.disconnect()
      }
    }
    
    return () => {
      clearTimeout(timeout1)
      clearTimeout(timeout2)
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
        aria-label={isListening ? 'Stop listening' : 'Start voice command'}
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
          cursor: 'pointer'
        } as React.CSSProperties}
      >
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%' }}>
          {isListening ? (
            <>
              <svg className="w-5 h-5 relative z-10 animate-pulse flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 012 0v4a1 1 0 11-2 0V7zM12 9a1 1 0 10-2 0v2a1 1 0 102 0V9z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-semibold whitespace-nowrap">Stop</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5 relative z-10 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-semibold whitespace-nowrap">Voice</span>
              <span 
                className="absolute inset-0 rounded-full bg-blue-600 pulse-voice opacity-75 group-hover:opacity-0"
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
              ></span>
            </>
          )}
        </div>
      </button>

      {/* Voice popup - render when listening */}
      {isListening && (
        <div
          className="bg-white rounded-2xl shadow-2xl p-5 border border-red-100 min-w-[280px] backdrop-blur-sm"
          style={{
            position: 'fixed',
            bottom: '96px',
            left: '16px',
            zIndex: 9998,
            pointerEvents: 'auto',
            display: 'block',
            visibility: 'visible',
            opacity: 1,
            maxWidth: '320px'
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
                  <div className={`border rounded-lg p-3 mt-3 ${
                    transcript.includes('❌') || transcript.includes('🔒') 
                      ? 'bg-red-50 border-red-200' 
                      : 'bg-blue-50 border-blue-200'
                  }`}>
                    <p className={`text-xs font-medium mb-2 ${
                      transcript.includes('❌') || transcript.includes('🔒')
                        ? 'text-red-900'
                        : 'text-blue-900'
                    }`}>
                      {transcript.includes('❌') || transcript.includes('🔒') ? '⚠️ Error:' : transcript.includes(' ') ? 'Heard:' : 'Listening...'}
                    </p>
                    <p className={`text-sm font-medium whitespace-pre-line leading-relaxed ${
                      transcript.includes('❌') || transcript.includes('🔒')
                        ? 'text-red-700'
                        : 'text-blue-700 italic'
                    }`}>{transcript}</p>
                    {transcript.includes('🔒') && (
                      <div className="mt-3 pt-3 border-t border-red-200">
                        <button
                          onClick={async () => {
                            try {
                              await navigator.clipboard.writeText('chrome://settings/content/microphone')
                              setTranscript('✅ URL copied! Paste it in a new Chrome tab and press Enter.')
                              setTimeout(() => {
                                if (transcript.includes('🔒')) {
                                  setTranscript(transcript) // Restore original message
                                }
                              }, 3000)
                            } catch (e) {
                              console.error('Failed to copy:', e)
                            }
                          }}
                          className="text-xs bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1.5 rounded-md transition-colors font-medium"
                        >
                          📋 Copy Chrome Settings URL
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
        </div>
      )}
    </>
  )
}
