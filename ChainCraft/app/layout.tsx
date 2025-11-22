import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'
import { AdaptiveUIProvider } from '@/components/AdaptiveUIProvider'
import PredictiveActions from '@/components/PredictiveActions'
import EnhancedAccessibilityBar from '@/components/EnhancedAccessibilityBar'
import VoiceInterface from '@/components/VoiceInterface'
import EthicalUXBanner from '@/components/EthicalUXBanner'
import MicroInteractions from '@/components/MicroInteractions'
import SustainableLoading from '@/components/SustainableLoading'
import ConversationalInterface from '@/components/ConversationalInterface'
import WhatsAppButton from '@/components/WhatsAppButton'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://chaincraft.weblibron.com'),
  title: {
    default: 'ChainCraft Digital Agency - Transform Your Business with Innovative Design & Development',
    template: '%s | ChainCraft Digital Agency'
  },
  description: 'ChainCraft is a leading digital agency delivering innovative web design, development, and marketing solutions. We transform businesses with cutting-edge design trends, AI-driven experiences, and exceptional results.',
  keywords: ['digital agency', 'web design', 'web development', 'UI/UX design', 'branding', 'digital marketing', 'creative agency', 'website design', 'web design agency', 'modern design'],
  authors: [{ name: 'ChainCraft Digital Agency' }],
  creator: 'ChainCraft Digital Agency',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://chaincraft.weblibron.com',
    siteName: 'ChainCraft Digital Agency',
    title: 'ChainCraft Digital Agency - Transform Your Business with Innovative Design & Development',
    description: 'Leading digital agency delivering innovative web design, development, and marketing solutions that transform businesses.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ChainCraft Digital Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChainCraft Digital Agency - Transform Your Business with Innovative Design & Development',
    description: 'Leading digital agency delivering innovative web design, development, and marketing solutions.',
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
          <AdaptiveUIProvider>
          <div className="flex min-h-screen flex-col">
              <a href="#main-content" className="skip-to-main">
                Skip to main content
              </a>
            <Header />
              <main id="main-content" className="flex-1">{children}</main>
            <Footer />
              <PredictiveActions />
              <EnhancedAccessibilityBar />
              <VoiceInterface />
              <ConversationalInterface />
              <WhatsAppButton />
              <EthicalUXBanner />
              <MicroInteractions />
              <SustainableLoading />
          </div>
          </AdaptiveUIProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

