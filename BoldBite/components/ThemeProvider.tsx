'use client'

import { useEffect } from 'react'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Always set light theme and remove dark class
    document.documentElement.setAttribute('data-theme', 'light')
    document.documentElement.classList.remove('dark')
  }, [])

    return <>{children}</>
  }

// Keep useTheme for backwards compatibility but it doesn't do anything now
export function useTheme() {
  return {
    theme: 'light' as const,
    toggleTheme: () => {},
  }
}

