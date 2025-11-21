'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { animate } from 'animejs'

// Icons replaced with SVG components
const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)
const XIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
  { href: '/testimonial', label: 'Testimonial' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const headerRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)

  // All pages have dark backgrounds in hero section
  const hasDarkBanner = true

  // Header slide-in animation
  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.style.transform = 'translateY(-100px)'
      animate(headerRef.current, {
        translateY: [ -100, 0 ],
        opacity: [ 0, 1 ],
        duration: 800,
        easing: 'easeOutElastic(1, .8)',
      })
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when menu is open and animate menu links
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      // Animate menu in
      if (menuRef.current) {
        animate(menuRef.current, {translateX: [ '100%', 0 ],
          opacity: [ 0, 1 ],
          duration: 500,
          easing: 'easeOutCubic',
        })
        
        // Animate menu links
        setTimeout(() => {
          navLinks.forEach((_, index) => {
            const linkElement = document.querySelector(`.menu-link-${index}`)
            if (linkElement) {
              animate(linkElement, {translateX: [ 50, 0 ],
                opacity: [ 0, 1 ],
                delay: index * 50,
                duration: 400,
                easing: 'easeOutCubic',
              })
            }
          })
          
          // Animate contact section
          const contactSection = document.querySelector('.contact-section')
          if (contactSection) {
            animate(contactSection, {translateY: [ 20, 0 ],
              opacity: [ 0, 1 ],
              delay: navLinks.length * 50 + 100,
              duration: 400,
            })
          }
        }, 100)
      }
      if (backdropRef.current) {
        animate(backdropRef.current, {opacity: [ 0, 1 ],
          duration: 300,
        })
      }
    } else {
      document.body.style.overflow = 'unset'
      // Animate menu out
      if (menuRef.current) {
        animate(menuRef.current, {translateX: [ 0, '100%' ],
          opacity: [ 1, 0 ],
          duration: 300,
          easing: 'easeInCubic',
        })
      }
      if (backdropRef.current) {
        animate(backdropRef.current, {opacity: [ 1, 0 ],
          duration: 200,
        })
      }
    }
  }, [isOpen])

  // Logo hover animation
  const handleLogoHover = () => {
    if (logoRef.current) {
      animate(logoRef.current, {scale: [ 1, 1.1, 1 ],
        duration: 400,
        easing: 'easeOutElastic(1, .8)',
      })
    }
  }

  return (
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link 
            href="/" 
            className="flex items-center space-x-2"
            onMouseEnter={handleLogoHover}
          >
            <div
              ref={logoRef}
              className={`text-2xl font-bold transition-colors ${
                scrolled 
                  ? 'text-gray-900' // Dark when scrolled (white header background)
                  : 'text-white' // White when not scrolled (dark background)
              }`}
            >
              ByteBloom
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors relative group ${
                  scrolled 
                    ? 'text-gray-700 hover:text-blue-600' 
                    : 'text-white hover:text-blue-200' // White links for all pages (both have dark backgrounds)
                }`}
                onMouseEnter={(e) => {
                  const underline = e.currentTarget.querySelector('span')
                  if (underline) {
                    animate(underline, {width: [ '0%', '100%' ],
                      duration: 400,
                      easing: 'easeOutCubic',
                    })
                  }
                }}
                onMouseLeave={(e) => {
                  const underline = e.currentTarget.querySelector('span')
                  if (underline) {
                    animate(underline, {width: [ '100%', '0%' ],
                      duration: 300,
                      easing: 'easeInCubic',
                    })
                  }
                }}
              >
                {link.label}
                <span className={`absolute bottom-0 left-0 h-0.5 ${
                  scrolled 
                    ? 'bg-blue-600' 
                    : 'bg-white' // White underline for all pages (both have dark backgrounds)
                }`} style={{ width: '0%' }} />
              </Link>
            ))}
          </div>

              <div className="lg:hidden flex items-center space-x-4">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className={`p-2 rounded-lg relative z-[100] transition-colors ${
                    scrolled 
                      ? 'bg-gray-100 text-gray-700' 
                      : 'bg-white/20 text-white backdrop-blur-sm' // White/translucent for all pages (both have dark backgrounds)
                  }`}
                  aria-label="Toggle menu"
                  aria-expanded={isOpen}
                  onMouseDown={(e) => {
                    animate(e.currentTarget, {scale: [ 1, 0.9, 1 ],
                      duration: 200,
                    })
                  }}
                >
                  {isOpen ? <XIcon /> : <MenuIcon />}
                </button>
              </div>
        </div>
      </nav>

          {/* Backdrop/Overlay */}
          {isOpen && (
            <div
              ref={backdropRef}
              onClick={() => setIsOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[90]"
              style={{ opacity: 0 }}
            />
          )}

          {/* Sidebar Menu from Right */}
          {isOpen && (
            <div
              ref={menuRef}
              className="lg:hidden fixed top-0 right-0 h-screen w-80 max-w-[85vw] bg-white shadow-2xl z-[100] overflow-y-auto"
              style={{ transform: 'translateX(100%)', opacity: 0 }}
            >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
              Menu
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
              aria-label="Close menu"
              onMouseDown={(e) => {
                animate(e.currentTarget, {scale: [ 1, 0.9, 1 ],
                  rotate: [ 0, 90 ],
                  duration: 300,
                })
              }}
            >
              <XIcon />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-6 space-y-2">
            {navLinks.map((link, index) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => {
                    setIsOpen(false)
                    // Animate link click
                    const linkElement = document.querySelector(`.menu-link-${index}`)
                    if (linkElement) {
                      animate(linkElement, {
                        scale: [ 1, 0.95, 1 ],
                        duration: 200,
                      })
                    }
                  }}
                  className={`menu-link-${index} group relative block py-4 px-4 rounded-xl text-gray-700 hover:text-primary-600 hover:bg-primary-50 font-semibold transition-all duration-300`}
                  onMouseEnter={(e) => {
                    animate(e.currentTarget, {translateX: [ 0, 8 ],
                      duration: 300,
                      easing: 'easeOutCubic',
                    })
                    const dot = e.currentTarget.querySelector('.menu-dot')
                    if (dot) {
                      animate(dot, {opacity: [ 0, 1 ],
                        scale: [ 0, 1 ],
                        duration: 200,
                      })
                    }
                  }}
                  onMouseLeave={(e) => {
                    animate(e.currentTarget, {translateX: [ 8, 0 ],
                      duration: 200,
                    })
                  }}
                  style={{ transform: 'translateX(50px)', opacity: 0 }}
                >
                  <span className="relative z-10 flex items-center">
                    <span className="menu-dot w-2 h-2 rounded-full bg-primary-600 mr-3" style={{ opacity: 0, transform: 'scale(0)' }}></span>
                    {link.label}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Link>
              </div>
            ))}
          </nav>

          {/* Contact Info Section */}
          <div
            className="contact-section p-6 border-t border-gray-200 mt-6"
            style={{ opacity: 0, transform: 'translateY(20px)' }}
          >
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
              Contact
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:info@bytebloom.com"
                className="flex items-center gap-3 text-gray-700 hover:text-primary-600 transition-colors font-semibold"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@bytebloom.com
              </a>
              <a
                href="tel:+911234567890"
                className="flex items-center gap-3 text-gray-700 hover:text-primary-600 transition-colors font-semibold"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +91 123 456 7890
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
