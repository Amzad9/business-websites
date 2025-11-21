'use client'

import { motion } from 'framer-motion'

export default function HeroIllustration() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 dark:opacity-30">
      {/* Abstract geometric shapes - Reduced opacity for better text visibility */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-1/4 left-1/4 w-64 h-64"
      >
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
            scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="w-full h-full border-4 border-primary-400/20 rounded-full"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute top-1/3 right-1/4 w-48 h-48"
      >
        <motion.div
          animate={{
            rotate: -360,
            borderRadius: ['20%', '50%', '20%'],
          }}
          transition={{
            rotate: { duration: 15, repeat: Infinity, ease: 'linear' },
            borderRadius: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="w-full h-full bg-gradient-to-br from-accent-400/15 to-primary-500/15"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="absolute bottom-1/4 left-1/3 w-56 h-56"
      >
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.3, 1],
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
            scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="w-full h-full border-8 border-accent-500/15 transform rotate-45"
        />
      </motion.div>

      {/* Floating particles - Reduced opacity */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{
            opacity: {
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
            },
            x: {
              duration: 10 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatType: 'reverse',
            },
            y: {
              duration: 8 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatType: 'reverse',
            },
          }}
          className="absolute w-2 h-2 bg-primary-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  )
}

