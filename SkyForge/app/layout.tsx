import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'SkyForge - Innovative Solutions for Modern Business',
    template: '%s | SkyForge'
  },
  description: 'SkyForge delivers cutting-edge solutions to transform your business. Expert services, innovative technology, and proven results.',
  keywords: ['business solutions', 'technology', 'innovation', 'consulting'],
  authors: [{ name: 'SkyForge' }],
  creator: 'SkyForge',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://skyforge.com',
    siteName: 'SkyForge',
    title: 'SkyForge - Innovative Solutions for Modern Business',
    description: 'SkyForge delivers cutting-edge solutions to transform your business.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SkyForge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SkyForge - Innovative Solutions for Modern Business',
    description: 'SkyForge delivers cutting-edge solutions to transform your business.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

