import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Information about how we use cookies on our website.',
}

export default function CookiePolicy() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-20 min-h-[60vh] relative overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1920&h=1080&fit=crop&q=80"
            alt="Cookie Policy"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/90 via-primary-700/80 to-primary-800/90"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50 w-full">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black mb-6 text-white">
              Cookie <span className="text-primary-200">Policy</span>
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
              <h2 className="text-3xl font-black mb-6 text-black">1. What Are Cookies</h2>
              <p className="text-black/80 leading-relaxed font-semibold mb-6">
                Cookies are small text files that are placed on your computer or mobile device when you 
                visit a website. They are widely used to make websites work more efficiently and to provide 
                information to the website owners.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-black mb-6 text-black mt-12">2. How We Use Cookies</h2>
              <p className="text-black/80 leading-relaxed font-semibold mb-4">
                We use cookies for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-black/80 font-semibold mb-6">
                <li>Essential Cookies: Required for the website to function properly</li>
                <li>Analytics Cookies: Help us understand how visitors interact with our website</li>
                <li>Functionality Cookies: Remember your preferences and choices</li>
                <li>Marketing Cookies: Track your browsing habits to provide relevant advertising</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-black mb-6 text-black mt-12">3. Types of Cookies We Use</h2>
              <p className="text-black/80 leading-relaxed font-semibold mb-4">
                We use the following types of cookies:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-black/80 font-semibold mb-6">
                <li><strong>Session Cookies:</strong> Temporary cookies that are deleted when you close your browser</li>
                <li><strong>Persistent Cookies:</strong> Remain on your device for a set period or until you delete them</li>
                <li><strong>First-Party Cookies:</strong> Set by our website directly</li>
                <li><strong>Third-Party Cookies:</strong> Set by external services we use, such as Google Analytics</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-black mb-6 text-black mt-12">4. Managing Cookies</h2>
              <p className="text-black/80 leading-relaxed font-semibold mb-6">
                You have the right to accept or reject cookies. Most web browsers automatically accept 
                cookies, but you can usually modify your browser settings to decline cookies if you prefer. 
                However, this may prevent you from taking full advantage of our website. You can manage 
                your cookie preferences through your browser settings.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-black mb-6 text-black mt-12">5. Third-Party Cookies</h2>
              <p className="text-black/80 leading-relaxed font-semibold mb-6">
                In addition to our own cookies, we may also use various third-party cookies to report 
                usage statistics of the website and deliver advertisements. These third parties may use 
                cookies to collect information about your online activities across different websites.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-black mb-6 text-black mt-12">6. Contact Us</h2>
              <p className="text-black/80 leading-relaxed font-semibold mb-6">
                If you have any questions about our use of cookies, please contact us at:
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
                Questions About Cookies?
              </h2>
              <p className="text-xl text-black/80 max-w-3xl mx-auto font-semibold">
                Contact us if you have any questions about our cookie policy.
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

