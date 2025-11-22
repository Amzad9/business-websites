'use client'

import { useState, useEffect } from 'react'

export default function EthicalUXBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [privacyAccepted, setPrivacyAccepted] = useState(false)
  const [dataTransparencyOpen, setDataTransparencyOpen] = useState(false)

  useEffect(() => {
    // Show banner if privacy not accepted yet
    const accepted = localStorage.getItem('chaincraft-privacy-accepted')
    if (!accepted) {
      setIsVisible(true)
    } else {
      setPrivacyAccepted(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('chaincraft-privacy-accepted', 'true')
    setPrivacyAccepted(true)
    setIsVisible(false)
  }

  const handleReject = () => {
    localStorage.setItem('chaincraft-privacy-accepted', 'false')
    setIsVisible(false)
    // Could redirect to a privacy policy page or disable certain features
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-gray-200 shadow-2xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Privacy & Data Transparency
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              We respect your privacy. We use <button 
                onClick={() => setDataTransparencyOpen(!dataTransparencyOpen)}
                className="text-blue-600 underline font-semibold hover:text-blue-700"
              >
                minimal data
              </button> to personalize your experience. You're always in control.
            </p>
            
            {dataTransparencyOpen && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">What We Collect:</h4>
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Navigation patterns (to improve page order)</li>
                  <li>Feature preferences (to personalize content)</li>
                  <li>Interaction speed (to adjust animations)</li>
                  <li>All data stored locally in your browser</li>
                </ul>
                <p className="text-xs text-gray-600 mt-3">
                  <strong>No tracking cookies. No third-party analytics. No data sold.</strong>
                </p>
                <button
                  onClick={() => setDataTransparencyOpen(false)}
                  className="mt-3 text-xs text-blue-600 underline hover:text-blue-700"
                >
                  Close
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={handleReject}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
              style={{ minHeight: '44px', minWidth: '100px' }}
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
              style={{ minHeight: '44px', minWidth: '100px' }}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

