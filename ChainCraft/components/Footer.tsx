'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Logo from './Logo'
import { Mail, Phone, MapPin } from 'lucide-react'

// SVG Social Media Icons
const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
)

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

const YoutubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

const footerLinks = {
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/contact', label: 'Contact' },
  ],
  resources: [
    { href: '/blog', label: 'Blog' },
    { href: '/testimonial', label: 'Testimonials' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/cookies', label: 'Cookie Policy' },
  ],
}

// Social Media Icons Component
const SocialIcon = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1, y: -2 }}
    whileTap={{ scale: 0.95 }}
    className="w-12 h-12 flex items-center justify-center bg-black hover:bg-amber-900 text-white rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
  >
    <span className="text-white [&>svg]:text-white [&>svg]:fill-white">
      {children}
    </span>
  </motion.a>
)

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // Here you would typically send the email to your backend/email service
      console.log('Subscribed:', email)
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 text-amber-900 border-t-2 border-amber-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          {/* Company Info & Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4"
          >
            <div className="flex justify-start">
              <Logo showText={true} variant="default" className="mb-4" />
            </div>
            <p className="text-amber-900/70 mb-6 leading-relaxed text-sm">
              Innovative digital agency delivering exceptional web design, development, and marketing solutions that transform businesses.
            </p>
            
          

            {/* Social Media Icons */}
            <div className="flex items-center gap-3 flex-wrap mb-8">
              <SocialIcon href="https://facebook.com/chaincraft">
                <FacebookIcon />
              </SocialIcon>
              <SocialIcon href="https://twitter.com/chaincraft">
                <TwitterIcon />
              </SocialIcon>
              <SocialIcon href="https://linkedin.com/company/chaincraft">
                <LinkedinIcon />
              </SocialIcon>
              <SocialIcon href="https://instagram.com/chaincraft">
                <InstagramIcon />
              </SocialIcon>
              <SocialIcon href="https://youtube.com/@chaincraft">
                <YoutubeIcon />
              </SocialIcon>
            </div>

            {/* Working Hours / Additional Info */}
            <div className="space-y-3">
              <div>
                <h5 className="text-amber-900 font-semibold text-sm mb-2">Business Hours</h5>
                <div className="space-y-1 text-amber-900/70 text-sm">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
              
              <div className="pt-2">
                <p className="text-amber-900/60 text-xs leading-relaxed">
                  Partner with us to transform your digital presence and drive measurable results.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <h4 className="text-amber-900 font-bold text-base mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-amber-900/70 hover:text-amber-700 font-medium text-sm transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-amber-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources & Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h4 className="text-amber-900 font-bold text-base mb-4">Resources</h4>
            <ul className="space-y-2 mb-6">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-amber-900/70 hover:text-amber-700 font-medium text-sm transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-amber-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            <h4 className="text-amber-900 font-bold text-base mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-amber-900/70 hover:text-amber-700 font-medium text-sm transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-amber-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter Subscription */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-4"
          >
            {/* Contact Info */}
            <div className="mb-8">
              <h4 className="text-amber-900 font-bold text-base mb-4">Contact Us</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-1 bg-amber-100 rounded-lg flex-shrink-0">
                    <Mail className="w-4 h-4 text-amber-600" strokeWidth={2} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <a href="mailto:info@chaincraft.com" className="text-amber-900 hover:text-amber-700 font-medium text-sm transition-colors break-all">
                      info@chaincraft.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-1 bg-amber-100 rounded-lg flex-shrink-0">
                    <Phone className="w-4 h-4 text-amber-600" strokeWidth={2} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <a href="tel:+911234567890" className="text-amber-900 hover:text-amber-700 font-medium text-sm transition-colors">
                      +91 123 456 7890
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-1 bg-amber-100 rounded-lg flex-shrink-0">
                    <MapPin className="w-4 h-4 text-amber-600" strokeWidth={2} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-amber-900/80 font-medium text-sm leading-relaxed">
                      123 Digital Street, Tech City, TC 12345, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <h4 className="text-amber-900 font-bold text-base mb-3">Subscribe</h4>
            <p className="text-amber-900/70 mb-4 text-sm leading-relaxed">
              Get the latest updates, insights, and exclusive offers delivered to your inbox.
            </p>
            
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 bg-white border-2 border-amber-200 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200 text-amber-900 placeholder-amber-400 transition-all duration-200"
                />
                <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400" strokeWidth={2} />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white font-bold rounded-xl hover:from-amber-700 hover:via-orange-700 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {subscribed ? 'Subscribed!' : 'Subscribe'}
              </motion.button>
            </form>
            
            {subscribed && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-amber-600 text-sm font-medium mt-2 text-center"
              >
                Thank you for subscribing!
              </motion.p>
            )}
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 mt-8 border-t-2 border-amber-200"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-amber-900/60 text-sm font-medium">
              &copy; {currentYear} Weblibron Digital. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy" className="text-amber-900/60 hover:text-amber-700 font-medium transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-amber-900/60 hover:text-amber-700 font-medium transition-colors">
                Terms
              </Link>
              <Link href="/cookies" className="text-amber-900/60 hover:text-amber-700 font-medium transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

