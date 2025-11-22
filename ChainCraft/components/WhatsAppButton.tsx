'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

export default function WhatsAppButton() {
  // Replace with your actual WhatsApp number (format: country code + number without +)
  const whatsappNumber = '1234567890' // Example: '1234567890' for +1 (234) 567-8900
  const whatsappMessage = encodeURIComponent('Hello! I would like to know more about your services.')
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`
  const linkRef = useRef<HTMLAnchorElement>(null)

  // Force fixed position function - can be called anytime
  const forceFixedPosition = () => {
    if (linkRef.current) {
      const link = linkRef.current
      // Force fixed position via direct style manipulation with !important
      link.style.setProperty('position', 'fixed', 'important')
      link.style.setProperty('bottom', '144px', 'important')
      link.style.setProperty('right', '16px', 'important')
      link.style.setProperty('top', 'auto', 'important')
      link.style.setProperty('left', 'auto', 'important')
      link.style.setProperty('z-index', '9999', 'important')
      link.style.setProperty('transform', 'none', 'important')
      link.style.setProperty('margin', '0', 'important')
    }
  }

  // Force button to always stay fixed - prevent any position changes
  useEffect(() => {
    // Force on mount
    forceFixedPosition()
    
    // Also force after short delays to catch any async changes
    const timeout1 = setTimeout(forceFixedPosition, 10)
    const timeout2 = setTimeout(forceFixedPosition, 100)
    const timeout3 = setTimeout(forceFixedPosition, 300)
    
    // Use MutationObserver to watch for style/class changes on the link
    if (linkRef.current) {
      const observer = new MutationObserver(() => {
        // Debounce the force function
        setTimeout(forceFixedPosition, 0)
      })
      
      observer.observe(linkRef.current, {
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
  }, [])

  return (
    <Link
      ref={linkRef}
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button-fixed bg-[#25D366] text-white rounded-full shadow-xl hover:bg-[#20BA5A] hover:shadow-2xl transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-[#25D366]/50 focus:ring-offset-2 group"
      style={{ 
        position: 'fixed',
        bottom: '144px',
        right: '16px',
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
        <svg
          className="w-6 h-6 relative z-10"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
        {/* Pulse animation - 2s duration */}
        <span 
          className="absolute inset-0 rounded-full bg-[#25D366] pulse-whatsapp opacity-75 group-hover:opacity-0"
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        ></span>
      </div>
    </Link>
  )
}
