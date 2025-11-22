'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

interface LogoProps {
  className?: string
  showText?: boolean
  variant?: 'default' | 'light' | 'dark'
}

export default function Logo({ className = '', showText = true, variant }: LogoProps) {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Determine variant based on context
  const logoVariant = variant || (scrolled || isHomePage ? 'default' : 'light')
  return (
    <Link href="/" className={`flex items-center gap-3 group ${className}`}>
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center justify-center"
      >
        {/* Logo Icon - Geometric Chain/Craft Design */}
        <div className="relative w-12 h-12 flex items-center justify-center">
          {/* Main Circle */}
          <div className={`absolute inset-0 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300 ${
            logoVariant === 'light'
              ? 'bg-gradient-to-br from-white/90 via-white/80 to-white/90'
              : 'bg-gradient-to-br from-amber-600 via-orange-600 to-rose-600'
          }`}></div>
          
          {/* Inner Design - Creative Agency Icon with Connected Elements */}
          <svg
            className={`relative z-10 w-7 h-7 ${
              logoVariant === 'light' ? 'text-amber-600' : 'text-white'
            }`}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Modern Agency Icon - Connected shapes representing creativity and connection */}
            {/* Top Circle */}
            <circle cx="16" cy="12" r="3" fill="currentColor" stroke="currentColor" strokeWidth="1.5" />
            {/* Left Circle */}
            <circle cx="10" cy="20" r="3" fill="currentColor" stroke="currentColor" strokeWidth="1.5" />
            {/* Right Circle */}
            <circle cx="22" cy="20" r="3" fill="currentColor" stroke="currentColor" strokeWidth="1.5" />
            {/* Connecting Lines */}
            <path
              d="M16 15L10 17M16 15L22 17M10 17L16 23M22 17L16 23"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Center Dot - Connection Point */}
            <circle cx="16" cy="20" r="2" fill="currentColor" />
          </svg>
          
          {/* Pulse Animation Ring */}
          <motion.div
            className={`absolute inset-0 rounded-xl border-2 ${
              logoVariant === 'light' ? 'border-white/50' : 'border-amber-500'
            }`}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </motion.div>
      
      {/* Logo Text */}
      {showText && (
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {logoVariant === 'light' ? (
            <span className="text-2xl md:text-3xl font-black text-white leading-none transition-all duration-300 tracking-tight group-hover:text-amber-100">
              ChainCraft
            </span>
          ) : (
            <span className="text-2xl md:text-3xl font-black bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent leading-none group-hover:from-amber-700 group-hover:via-orange-700 group-hover:to-rose-700 transition-all duration-300 tracking-tight">
              ChainCraft
            </span>
          )}
          <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] leading-none mt-0.5 opacity-90 ${
            logoVariant === 'light' ? 'text-white/80' : 'text-amber-600/70'
          }`}>
            Digital Agency
          </span>
        </motion.div>
      )}
    </Link>
  )
}

