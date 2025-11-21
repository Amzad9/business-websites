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
    default: 'LumenCart - Innovative Solutions for Modern Business',
    template: '%s | LumenCart'
  },
  description: 'LumenCart delivers cutting-edge solutions to transform your business. Expert services, innovative technology, and proven results.',
  keywords: ['business solutions', 'technology', 'innovation', 'consulting'],
  authors: [{ name: 'LumenCart' }],
  creator: 'LumenCart',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lumencart.com',
    siteName: 'LumenCart',
    title: 'LumenCart - Innovative Solutions for Modern Business',
    description: 'LumenCart delivers cutting-edge solutions to transform your business.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LumenCart',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LumenCart - Innovative Solutions for Modern Business',
    description: 'LumenCart delivers cutting-edge solutions to transform your business.',
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

