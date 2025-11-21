import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using our services.',
}

export default function TermsOfService() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-20 min-h-[60vh] relative overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&h=1080&fit=crop&q=80"
            alt="Terms of Service"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/90 via-primary-700/80 to-primary-800/90"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50 w-full">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black mb-6 text-white">
              Terms of <span className="text-primary-200">Service</span>
            </h1>
            <p className="text-xl md:text-2xl text-white font-semibold">
              Last updated: November 21, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-0 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-accent-400/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50 max-w-4xl w-full">
          <div className="prose prose-lg max-w-none prose-headings:text-black prose-headings:font-black prose-p:text-black/80 prose-p:font-semibold prose-p:leading-relaxed prose-a:text-primary-600 prose-a:font-bold prose-strong:text-black prose-strong:font-black prose-ul:text-black/80 prose-ul:font-semibold">
            <div>
              <h2 className="text-3xl font-black mb-6 text-black">1. Agreement to Terms</h2>
              <p className="text-black/80 leading-relaxed font-semibold mb-6">
                By accessing and using our website and services, you accept and agree to be bound by the 
                terms and provision of this agreement. If you do not agree to abide by the above, please 
                do not use this service.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-black mb-6 text-black mt-12">2. Use License</h2>
              <p className="text-black/80 leading-relaxed font-semibold mb-4">
                Permission is granted to temporarily access the materials on BoldBite's website for personal, 
                non-commercial transitory viewing only. Under this license you may not:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-black/80 font-semibold mb-6">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or mirror the materials on any other server</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-black mb-6 text-black mt-12">3. Service Description</h2>
              <p className="text-black/80 leading-relaxed font-semibold mb-6">
                BoldBite provides web design, development, and digital marketing services. We reserve the 
                right to modify or discontinue any service at any time without prior notice. We shall not 
                be liable to you or any third party for any modification, suspension, or discontinuance of services.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-black mb-6 text-black mt-12">4. Payment Terms</h2>
              <p className="text-black/80 leading-relaxed font-semibold mb-4">
                All fees are due as specified in your service agreement. Payment terms include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-black/80 font-semibold mb-6">
                <li>Payment is due within the timeframe specified in your agreement</li>
                <li>Late payments may incur additional fees</li>
                <li>All prices are subject to change without notice</li>
                <li>Refunds are subject to our refund policy as outlined in your agreement</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-black mb-6 text-black mt-12">5. Intellectual Property</h2>
              <p className="text-black/80 leading-relaxed font-semibold mb-6">
                All content, designs, graphics, and other materials on this website are the property of 
                BoldBite or its content suppliers and are protected by copyright, trademark, and other 
                intellectual property laws. You may not reproduce, distribute, or use any content without 
                our express written permission.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-black mb-6 text-black mt-12">6. Limitation of Liability</h2>
              <p className="text-black/80 leading-relaxed font-semibold mb-6">
                In no event shall BoldBite or its suppliers be liable for any damages (including, without 
                limitation, damages for loss of data or profit, or due to business interruption) arising 
                out of the use or inability to use the materials on our website, even if we or an authorized 
                representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-black mb-6 text-black mt-12">7. Contact Information</h2>
              <p className="text-black/80 leading-relaxed font-semibold mb-6">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="text-black/80 leading-relaxed font-semibold mb-2">
                Email: <a href="mailto:legal@boldbite.com" className="text-primary-600 font-bold hover:text-primary-700">legal@boldbite.com</a>
              </p>
              <p className="text-black/80 leading-relaxed font-semibold">
                Address: 123 Business Street, Mumbai, Maharashtra 400001, India
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent-400/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50 w-full">
          <div>
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black mb-6 text-black">
                Questions About Terms?
              </h2>
              <p className="text-xl text-black/80 max-w-3xl mx-auto font-semibold">
                Contact us if you have any questions about our terms of service.
              </p>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div>
              <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-8 md:p-12 text-center">
                <Link
                  href="/contact"
                  className="group relative inline-block px-12 py-5 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-bold text-lg hover:from-primary-500 hover:to-primary-400 transition-all duration-300 shadow-2xl hover:shadow-primary-500/50 transform hover:scale-110 active:scale-95 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-500 rounded-xl"></span>
                  <span className="relative z-10 flex items-center">
                    Contact Us
                    <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

