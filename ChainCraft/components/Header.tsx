'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useAdaptiveUI } from './AdaptiveUIProvider'
import Logo from './Logo'

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
  const { trackInteraction } = useAdaptiveUI()

  // Home page has white background, inner pages have light colored banners
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md shadow-lg'
          : isHomePage
            ? 'bg-transparent'
            : 'bg-white/90 backdrop-blur-sm shadow-sm'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Logo variant={scrolled || isHomePage ? 'default' : 'default'} />

          <div className="hidden xl:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => trackInteraction(`nav-${link.href}`)}
                className={`text-base font-semibold transition-colors relative group ${
                  scrolled || !isHomePage
                    ? 'text-gray-700 hover:text-amber-600' 
                    : 'text-gray-700 hover:text-amber-600'
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                  scrolled || !isHomePage
                    ? 'bg-amber-600' 
                    : 'bg-amber-600'
                }`} />
              </Link>
            ))}
          </div>

          <div className="xl:hidden flex items-center space-x-4">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-lg bg-gray-100 relative z-50 touch-manipulation"
              style={{ minWidth: '44px', minHeight: '44px' }}
            >
              <motion.div
                initial={false}
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? <XIcon /> : <MenuIcon />}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Backdrop/Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
            className="xl:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
            style={{ top: 0, left: 0, right: 0, bottom: 0 }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Menu from Right - Full Height for Mobile & Tablet */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ 
              type: 'spring', 
              damping: 30, 
              stiffness: 300,
              duration: 0.4 
            }}
            className="xl:hidden fixed top-0 right-0 w-full sm:w-96 max-w-[90vw] bg-white shadow-2xl z-[9999] overflow-y-auto overscroll-contain flex flex-col"
            style={{ 
              height: '100dvh', /* Dynamic viewport height for mobile */
            }}
          >
            {/* Header with close button - Sticky Top */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 sm:p-6 bg-white border-b border-gray-200 shadow-sm">
              <Logo showText={true} variant="default" />
              <motion.button
                whileTap={{ scale: 0.95, rotate: 90 }}
                onClick={() => setIsOpen(false)}
                className="p-3 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation"
                style={{ minWidth: '44px', minHeight: '44px' }}
              >
                <XIcon />
              </motion.button>
            </div>

            {/* Navigation Links - Scrollable Content */}
            <nav className="p-4 sm:p-6 space-y-2 flex-1 overflow-y-auto min-h-0">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 50, opacity: 0 }}
                  transition={{ 
                    delay: index * 0.05,
                    type: 'spring',
                    damping: 25,
                    stiffness: 200
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => {
                      setIsOpen(false)
                      trackInteraction(`nav-${link.href}`)
                    }}
                    className="group relative block py-4 px-4 rounded-xl text-gray-700 hover:text-amber-600 hover:bg-amber-50 active:bg-amber-100 text-base font-semibold transition-all duration-300 transform hover:translate-x-2 touch-manipulation"
                    style={{ minHeight: '56px' }}
                  >
                    <span className="relative z-10 flex items-center">
                      <span className="w-2 h-2 rounded-full bg-amber-600 opacity-0 group-hover:opacity-100 mr-3 transition-opacity duration-300"></span>
                      {link.label}
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Contact Info Section - Sticky Bottom */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: navLinks.length * 0.05 + 0.1 }}
              className="sticky bottom-0 p-4 sm:p-6 bg-white border-t border-gray-200 mt-auto"
            >
              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                Contact
              </h4>
              <div className="space-y-3">
                <a
                  href="mailto:info@chaincraft.com"
                  className="flex items-center gap-3 text-gray-700 hover:text-amber-600 active:text-amber-700 transition-colors font-semibold py-2 touch-manipulation"
                  style={{ minHeight: '44px' }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="break-all">info@chaincraft.com</span>
                </a>
                <a
                  href="tel:+911234567890"
                  className="flex items-center gap-3 text-gray-700 hover:text-amber-600 active:text-amber-700 transition-colors font-semibold py-2 touch-manipulation"
                  style={{ minHeight: '44px' }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +91 123 456 7890
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

