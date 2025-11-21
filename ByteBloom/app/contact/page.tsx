import { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import FadeIn from '@/components/FadeIn'

export const metadata: Metadata = {
  title: 'Contact Us - ByteBloom | Get In Touch',
  description: 'Contact ByteBloom for your digital transformation needs. Reach out to us via email, phone, or visit our office in Mumbai, India.',
}

export default function Contact() {
  return (
    <>
      {/* Hero Section - Similar to Other Pages */}
      <section className="pt-24 pb-20 min-h-[70vh] relative overflow-hidden flex items-center bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white">
        {/* Animated Geometric Shapes - 2026 Trend */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 border-4 border-blue-400/20 rotate-45 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 border-4 border-cyan-400/20 rotate-12 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-64 h-64 border-4 border-indigo-400/20 rotate-45 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50 w-full">
          <div>
            <h1 className="text-5xl md:text-9xl font-black mb-8 leading-tight text-white">
              CONTACT
            </h1>
            
            <p className="text-lg md:text-3xl text-white font-bold leading-relaxed max-w-4xl">
              Get in touch with us. We're here to help transform your digital vision into reality.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Address Section */}
      <section className="py-32 bg-white relative overflow-hidden border-y-4 border-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Email */}
            <FadeIn delay={0}>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-none border-4 border-gray-900 p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-none border-4 border-gray-900 flex items-center justify-center mx-auto mb-6 transform hover:rotate-12 transition-transform duration-300 flex-shrink-0">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight">Email</h3>
                <a 
                  href="mailto:info@bytebloom.com" 
                  className="text-lg text-blue-600 font-bold hover:text-cyan-600 transition-colors"
                >
                  info@bytebloom.com
                </a>
              </div>
            </FadeIn>

            {/* Phone */}
            <FadeIn delay={0.1}>
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-none border-4 border-gray-900 p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-none border-4 border-gray-900 flex items-center justify-center mx-auto mb-6 transform hover:rotate-12 transition-transform duration-300 flex-shrink-0">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight">Phone</h3>
                <a 
                  href="tel:+911234567890" 
                  className="text-lg text-blue-600 font-bold hover:text-cyan-600 transition-colors"
                >
                  +91 123 456 7890
                </a>
              </div>
            </FadeIn>

            {/* Address */}
            <FadeIn delay={0.2}>
              <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-none border-4 border-gray-900 p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 md:col-span-2 lg:col-span-1 h-full flex flex-col">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-600 to-teal-500 rounded-none border-4 border-gray-900 flex items-center justify-center mx-auto mb-6 transform hover:rotate-12 transition-transform duration-300 flex-shrink-0">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight">Address</h3>
                <p className="text-lg text-gray-700 font-bold leading-relaxed">
                  123 Business Street<br />
                  Mumbai, Maharashtra 400001<br />
                  India
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-32 bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <FadeIn>
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-7xl font-black mb-6 text-gray-900">
                  Send Us A Message
                </h2>
                <p className="text-base md:text-2xl text-gray-700 font-semibold leading-relaxed">
                  Have a project in mind? We'd love to hear from you. Send us a message and let's bring your ideas to life.
                </p>
              </div>
            </FadeIn>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-0 bg-white border-y-4 border-gray-900">
        <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.2205996999444!2d72.87765591490228!3d19.075983587099082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9a6c8c8c8c9%3A0x3b3b3b3b3b3b3b3b!2sMumbai%2C%20Maharashtra%20400001%2C%20India!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
            title="ByteBloom Office Location"
          ></iframe>
          
          {/* Overlay for better visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20 pointer-events-none"></div>
          
          {/* Info Card Overlay */}
          <div className="absolute bottom-8 left-8 bg-white border-4 border-gray-900 rounded-none p-6 shadow-2xl">
            <h3 className="text-xl font-black text-gray-900 mb-2 uppercase tracking-tight">Visit Our Office</h3>
            <p className="text-gray-700 font-bold leading-relaxed text-sm">
              123 Business Street<br />
              Mumbai, Maharashtra 400001<br />
              India
            </p>
            <div className="mt-4 pt-4 border-t-2 border-gray-900">
              <p className="text-sm text-gray-600 font-semibold">
                <span className="font-black">Hours:</span> Mon - Fri, 9:00 AM - 6:00 PM IST
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-blue-600 via-cyan-500 to-indigo-600 text-white relative overflow-hidden border-t-4 border-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <FadeIn>
              <h2 className="text-2xl md:text-7xl font-black mb-8 uppercase tracking-tight">
                <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
                  Ready?
                </span>
              </h2>
              <p className="text-lg md:text-3xl text-white/90 font-bold mb-12 leading-relaxed">
                Let's create something extraordinary together
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a
                  href="mailto:info@bytebloom.com"
                  className="inline-flex items-center gap-3 px-12 py-6 bg-white text-gray-900 rounded-none font-black text-xl uppercase tracking-widest border-4 border-white hover:bg-blue-50 hover:border-blue-50 transform hover:scale-110 hover:rotate-2 transition-all duration-300 shadow-2xl"
                >
                  Email Us
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href="tel:+911234567890"
                  className="inline-flex items-center gap-3 px-12 py-6 bg-transparent border-4 border-white text-white rounded-none font-black text-xl uppercase tracking-widest hover:bg-white/10 transform hover:scale-110 transition-all duration-300"
                >
                  Call Us
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}