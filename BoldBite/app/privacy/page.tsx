import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Our privacy policy explains how we collect, use, and protect your personal information.',
}

export default function PrivacyPolicy() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-20 min-h-[60vh] relative overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&h=1080&fit=crop&q=80"
            alt="Privacy Policy"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/90 via-primary-700/80 to-primary-800/90"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50 w-full">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black mb-6 text-white">
              Privacy <span className="text-primary-200">Policy</span>
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
              <h2 className="text-3xl font-black mb-6 text-black">1. Introduction</h2>
              <p className="text-black/80 leading-relaxed font-semibold mb-6">
                Welcome to BoldBite. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy will inform you about how we look after your personal data when you visit our 
                website and tell you about your privacy rights and how the law protects you.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-black mb-6 text-black mt-12">2. Information We Collect</h2>
              <p className="text-black/80 leading-relaxed font-semibold mb-4">
                We may collect, use, store, and transfer different kinds of personal data about you:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-black/80 font-semibold mb-6">
                <li>Identity Data: Name, username, or similar identifier</li>
                <li>Contact Data: Email address, telephone numbers, and postal address</li>
                <li>Technical Data: Internet protocol (IP) address, browser type, and version</li>
                <li>Usage Data: Information about how you use our website</li>
                <li>Marketing Data: Your preferences in receiving marketing from us</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-black mb-6 text-black mt-12">3. How We Use Your Information</h2>
              <p className="text-black/80 leading-relaxed font-semibold mb-4">
                We use your personal data for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-black/80 font-semibold mb-6">
                <li>To provide and improve our services</li>
                <li>To process your inquiries and respond to your requests</li>
                <li>To send you marketing communications (with your consent)</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and interests</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-black mb-6 text-black mt-12">4. Data Security</h2>
              <p className="text-black/80 leading-relaxed font-semibold mb-6">
                We have put in place appropriate security measures to prevent your personal data from being 
                accidentally lost, used, or accessed in an unauthorized way. We limit access to your personal 
                data to those employees and partners who have a business need to know.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-black mb-6 text-black mt-12">5. Your Rights</h2>
              <p className="text-black/80 leading-relaxed font-semibold mb-4">
                Under data protection laws, you have rights including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-black/80 font-semibold mb-6">
                <li>The right to access your personal data</li>
                <li>The right to request correction of your personal data</li>
                <li>The right to request erasure of your personal data</li>
                <li>The right to object to processing of your personal data</li>
                <li>The right to request restriction of processing</li>
                <li>The right to data portability</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-black mb-6 text-black mt-12">6. Contact Us</h2>
              <p className="text-black/80 leading-relaxed font-semibold mb-6">
                If you have any questions about this privacy policy or our privacy practices, please contact us at:
              </p>
              <p className="text-black/80 leading-relaxed font-semibold mb-2">
                Email: <a href="mailto:privacy@boldbite.com" className="text-primary-600 font-bold hover:text-primary-700">privacy@boldbite.com</a>
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
                Questions About Privacy?
              </h2>
              <p className="text-xl text-black/80 max-w-3xl mx-auto font-semibold">
                Contact us if you have any questions about our privacy policy.
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

