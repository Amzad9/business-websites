const fs = require('fs')
const path = require('path')

// Get all website directories
const websitesDir = __dirname
const websites = fs.readdirSync(websitesDir).filter(dir => {
  const dirPath = path.join(websitesDir, dir)
  return fs.statSync(dirPath).isDirectory() && 
         !dir.startsWith('.') && 
         fs.existsSync(path.join(dirPath, 'app'))
})

console.log(`Found ${websites.length} websites to update\n`)

const unsplashImages = [
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop&q=80'
]

let updatedCount = 0

websites.forEach((website, index) => {
  try {
    const websitePath = path.join(websitesDir, website)
    const companyName = website

    // 1. Update portfolio projects.json with Unsplash images
    const projectsJsonPath = path.join(websitePath, 'content', 'projects.json')
    if (fs.existsSync(projectsJsonPath)) {
      const projects = JSON.parse(fs.readFileSync(projectsJsonPath, 'utf8'))
      projects.forEach((project, idx) => {
        if (!project.image && unsplashImages[idx]) {
          project.image = unsplashImages[idx]
        }
      })
      fs.writeFileSync(projectsJsonPath, JSON.stringify(projects, null, 2))
      console.log(`✓ Updated projects.json for ${website}`)
    }

    // 2. Update PortfolioContent.tsx to use images
    const portfolioContentPath = path.join(websitePath, 'components', 'PortfolioContent.tsx')
    if (fs.existsSync(portfolioContentPath)) {
      let content = fs.readFileSync(portfolioContentPath, 'utf8')
      
      // Update interface
      if (content.includes('interface Project')) {
        if (!content.includes('fullDescription?:')) {
          content = content.replace(
            /interface Project \{[\s\S]*?\}/,
            match => {
              if (!match.includes('fullDescription')) {
                return match.replace('}', '  fullDescription?: string\n  technologies?: string[]\n}')
              }
              return match
            }
          )
        }
      }

      // Update image div to use project.image
      if (content.includes('text-5xl transform group-hover:scale-125')) {
        content = content.replace(
          /<div className="h-48[^>]*>[\s\S]*?<span className="text-5xl[^<]*<\/span>[\s\S]*?<\/div>/,
          `<div className="h-48 relative overflow-hidden bg-gradient-to-br from-primary-400 to-primary-600">
                      <img 
                        src={\`\${project.image || \`https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop&q=80&sig=\${index}\`}\`}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    </div>`
        )
      }

      // Fix hero section padding
      content = content.replace(/pt-32 pb-20 min-h-\[60vh\]/g, 'pt-24 pb-20 min-h-[60vh]')
      content = content.replace(/pt-32 pb-20 min-h-\[40vh\]/g, 'pt-24 pb-20 min-h-[40vh]')

      fs.writeFileSync(portfolioContentPath, content)
      console.log(`✓ Updated PortfolioContent.tsx for ${website}`)
    }

    // 3. Fix hero section padding in all inner pages
    const pagesToFix = [
      'app/about/page.tsx',
      'app/services/page.tsx',
      'app/workflow/page.tsx',
      'app/how-to-work/page.tsx',
      'app/blog/page.tsx',
      'app/contact/page.tsx',
      'app/blog/[slug]/page.tsx',
      'app/portfolio/[slug]/page.tsx',
    ]

    pagesToFix.forEach(pagePath => {
      const fullPath = path.join(websitePath, pagePath)
      if (fs.existsSync(fullPath)) {
        let content = fs.readFileSync(fullPath, 'utf8')
        const originalContent = content
        content = content.replace(/pt-32 pb-20 min-h-\[60vh\]/g, 'pt-24 pb-20 min-h-[60vh]')
        content = content.replace(/pt-32 pb-20 min-h-\[40vh\]/g, 'pt-24 pb-20 min-h-[40vh]')
        if (content !== originalContent) {
          fs.writeFileSync(fullPath, content)
        }
      }
    })

    // 4. Fix TestimonialContent hero padding
    const testimonialContentPath = path.join(websitePath, 'components', 'TestimonialContent.tsx')
    if (fs.existsSync(testimonialContentPath)) {
      let content = fs.readFileSync(testimonialContentPath, 'utf8')
      content = content.replace(/pt-32 pb-20 min-h-\[60vh\]/g, 'pt-24 pb-20 min-h-[60vh]')
      fs.writeFileSync(testimonialContentPath, content)
    }

    // 5. Create legal pages
    const legalPages = [
      {
        path: 'app/privacy/page.tsx',
        title: 'Privacy Policy',
        component: getPrivacyPolicyContent(companyName)
      },
      {
        path: 'app/terms/page.tsx',
        title: 'Terms of Service',
        component: getTermsOfServiceContent(companyName)
      },
      {
        path: 'app/cookies/page.tsx',
        title: 'Cookie Policy',
        component: getCookiePolicyContent(companyName)
      }
    ]

    legalPages.forEach(({ path: pagePath, title, component }) => {
      const fullPath = path.join(websitePath, pagePath)
      const dir = path.dirname(fullPath)
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }
      fs.writeFileSync(fullPath, component)
      console.log(`✓ Created ${title} for ${website}`)
    })

    updatedCount++
    console.log(`✅ Completed ${website} (${updatedCount}/${websites.length})\n`)

  } catch (error) {
    console.error(`❌ Error updating ${website}:`, error.message)
  }
})

function getPrivacyPolicyContent(companyName) {
  return `import { Metadata } from 'next'
import FadeIn from '@/components/FadeIn'
import KineticText from '@/components/KineticText'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Our privacy policy explains how we collect, use, and protect your personal information.',
}

export default function PrivacyPolicy() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-20 min-h-[60vh] bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent-400/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
          <FadeIn>
            <div className="text-center max-w-4xl mx-auto">
              <KineticText>
                <h1 className="text-5xl md:text-7xl font-black mb-6 text-black">
                  Privacy <span className="text-primary-700">Policy</span>
                </h1>
              </KineticText>
              <p className="text-xl md:text-2xl text-black/80 font-semibold">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-0 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-accent-400/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50 max-w-4xl">
          <div className="prose prose-lg max-w-none prose-headings:text-black prose-headings:font-black prose-p:text-black/80 prose-p:font-semibold prose-p:leading-relaxed prose-a:text-primary-600 prose-a:font-bold prose-strong:text-black prose-strong:font-black prose-ul:text-black/80 prose-ul:font-semibold">
            <FadeIn>
              <h2 className="text-3xl font-black mb-6 text-black">1. Introduction</h2>
              <p className="text-black/80 leading-relaxed font-semibold mb-6">
                Welcome to ${companyName}. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy will inform you about how we look after your personal data when you visit our 
                website and tell you about your privacy rights and how the law protects you.
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
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
            </FadeIn>

            <FadeIn delay={0.2}>
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
            </FadeIn>

            <FadeIn delay={0.3}>
              <h2 className="text-3xl font-black mb-6 text-black mt-12">4. Data Security</h2>
              <p className="text-black/80 leading-relaxed font-semibold mb-6">
                We have put in place appropriate security measures to prevent your personal data from being 
                accidentally lost, used, or accessed in an unauthorized way. We limit access to your personal 
                data to those employees and partners who have a business need to know.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
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
            </FadeIn>

            <FadeIn delay={0.5}>
              <h2 className="text-3xl font-black mb-6 text-black mt-12">6. Contact Us</h2>
              <p className="text-black/80 leading-relaxed font-semibold mb-6">
                If you have any questions about this privacy policy or our privacy practices, please contact us at:
              </p>
              <p className="text-black/80 leading-relaxed font-semibold mb-2">
                Email: <a href="mailto:privacy@${companyName.toLowerCase()}.com" className="text-primary-600 font-bold hover:text-primary-700">privacy@${companyName.toLowerCase()}.com</a>
              </p>
              <p className="text-black/80 leading-relaxed font-semibold">
                Address: 123 Business Street, Mumbai, Maharashtra 400001, India
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent-400/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black mb-6 text-black">
                Questions About Privacy?
              </h2>
              <p className="text-xl text-black/80 max-w-3xl mx-auto font-semibold">
                Contact us if you have any questions about our privacy policy.
              </p>
            </div>
          </FadeIn>
          
          <div className="max-w-4xl mx-auto">
            <FadeIn delay={0.2}>
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
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}
`
}

function getTermsOfServiceContent(companyName) {
  return `import { Metadata } from 'next'
import FadeIn from '@/components/FadeIn'
import KineticText from '@/components/KineticText'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using our services.',
}

export default function TermsOfService() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-20 min-h-[60vh] bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent-400/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
          <FadeIn>
            <div className="text-center max-w-4xl mx-auto">
              <KineticText>
                <h1 className="text-5xl md:text-7xl font-black mb-6 text-black">
                  Terms of <span className="text-primary-700">Service</span>
                </h1>
              </KineticText>
              <p className="text-xl md:text-2xl text-black/80 font-semibold">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-0 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-accent-400/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50 max-w-4xl">
          <div className="prose prose-lg max-w-none prose-headings:text-black prose-headings:font-black prose-p:text-black/80 prose-p:font-semibold prose-p:leading-relaxed prose-a:text-primary-600 prose-a:font-bold prose-strong:text-black prose-strong:font-black prose-ul:text-black/80 prose-ul:font-semibold">
            <FadeIn>
              <h2 className="text-3xl font-black mb-6 text-black">1. Agreement to Terms</h2>
              <p className="text-black/80 leading-relaxed font-semibold mb-6">
                By accessing and using our website and services, you accept and agree to be bound by the 
                terms and provision of this agreement. If you do not agree to abide by the above, please 
                do not use this service.
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="text-3xl font-black mb-6 text-black mt-12">2. Use License</h2>
              <p className="text-black/80 leading-relaxed font-semibold mb-4">
                Permission is granted to temporarily access the materials on ${companyName}'s website for personal, 
                non-commercial transitory viewing only. Under this license you may not:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-black/80 font-semibold mb-6">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or mirror the materials on any other server</li>
              </ul>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h2 className="text-3xl font-black mb-6 text-black mt-12">3. Service Description</h2>
              <p className="text-black/80 leading-relaxed font-semibold mb-6">
                ${companyName} provides web design, development, and digital marketing services. We reserve the 
                right to modify or discontinue any service at any time without prior notice. We shall not 
                be liable to you or any third party for any modification, suspension, or discontinuance of services.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
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
            </FadeIn>

            <FadeIn delay={0.4}>
              <h2 className="text-3xl font-black mb-6 text-black mt-12">5. Intellectual Property</h2>
              <p className="text-black/80 leading-relaxed font-semibold mb-6">
                All content, designs, graphics, and other materials on this website are the property of 
                ${companyName} or its content suppliers and are protected by copyright, trademark, and other 
                intellectual property laws. You may not reproduce, distribute, or use any content without 
                our express written permission.
              </p>
            </FadeIn>

            <FadeIn delay={0.5}>
              <h2 className="text-3xl font-black mb-6 text-black mt-12">6. Limitation of Liability</h2>
              <p className="text-black/80 leading-relaxed font-semibold mb-6">
                In no event shall ${companyName} or its suppliers be liable for any damages (including, without 
                limitation, damages for loss of data or profit, or due to business interruption) arising 
                out of the use or inability to use the materials on our website, even if we or an authorized 
                representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </FadeIn>

            <FadeIn delay={0.6}>
              <h2 className="text-3xl font-black mb-6 text-black mt-12">7. Contact Information</h2>
              <p className="text-black/80 leading-relaxed font-semibold mb-6">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="text-black/80 leading-relaxed font-semibold mb-2">
                Email: <a href="mailto:legal@${companyName.toLowerCase()}.com" className="text-primary-600 font-bold hover:text-primary-700">legal@${companyName.toLowerCase()}.com</a>
              </p>
              <p className="text-black/80 leading-relaxed font-semibold">
                Address: 123 Business Street, Mumbai, Maharashtra 400001, India
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent-400/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black mb-6 text-black">
                Questions About Terms?
              </h2>
              <p className="text-xl text-black/80 max-w-3xl mx-auto font-semibold">
                Contact us if you have any questions about our terms of service.
              </p>
            </div>
          </FadeIn>
          
          <div className="max-w-4xl mx-auto">
            <FadeIn delay={0.2}>
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
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}
`
}

function getCookiePolicyContent(companyName) {
  return `import { Metadata } from 'next'
import FadeIn from '@/components/FadeIn'
import KineticText from '@/components/KineticText'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Information about how we use cookies on our website.',
}

export default function CookiePolicy() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-20 min-h-[60vh] bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent-400/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
          <FadeIn>
            <div className="text-center max-w-4xl mx-auto">
              <KineticText>
                <h1 className="text-5xl md:text-7xl font-black mb-6 text-black">
                  Cookie <span className="text-primary-700">Policy</span>
                </h1>
              </KineticText>
              <p className="text-xl md:text-2xl text-black/80 font-semibold">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-0 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-accent-400/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50 max-w-4xl">
          <div className="prose prose-lg max-w-none prose-headings:text-black prose-headings:font-black prose-p:text-black/80 prose-p:font-semibold prose-p:leading-relaxed prose-a:text-primary-600 prose-a:font-bold prose-strong:text-black prose-strong:font-black prose-ul:text-black/80 prose-ul:font-semibold">
            <FadeIn>
              <h2 className="text-3xl font-black mb-6 text-black">1. What Are Cookies</h2>
              <p className="text-black/80 leading-relaxed font-semibold mb-6">
                Cookies are small text files that are placed on your computer or mobile device when you 
                visit a website. They are widely used to make websites work more efficiently and to provide 
                information to the website owners.
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
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
            </FadeIn>

            <FadeIn delay={0.2}>
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
            </FadeIn>

            <FadeIn delay={0.3}>
              <h2 className="text-3xl font-black mb-6 text-black mt-12">4. Managing Cookies</h2>
              <p className="text-black/80 leading-relaxed font-semibold mb-6">
                You have the right to accept or reject cookies. Most web browsers automatically accept 
                cookies, but you can usually modify your browser settings to decline cookies if you prefer. 
                However, this may prevent you from taking full advantage of our website. You can manage 
                your cookie preferences through your browser settings.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <h2 className="text-3xl font-black mb-6 text-black mt-12">5. Third-Party Cookies</h2>
              <p className="text-black/80 leading-relaxed font-semibold mb-6">
                In addition to our own cookies, we may also use various third-party cookies to report 
                usage statistics of the website and deliver advertisements. These third parties may use 
                cookies to collect information about your online activities across different websites.
              </p>
            </FadeIn>

            <FadeIn delay={0.5}>
              <h2 className="text-3xl font-black mb-6 text-black mt-12">6. Contact Us</h2>
              <p className="text-black/80 leading-relaxed font-semibold mb-6">
                If you have any questions about our use of cookies, please contact us at:
              </p>
              <p className="text-black/80 leading-relaxed font-semibold mb-2">
                Email: <a href="mailto:privacy@${companyName.toLowerCase()}.com" className="text-primary-600 font-bold hover:text-primary-700">privacy@${companyName.toLowerCase()}.com</a>
              </p>
              <p className="text-black/80 leading-relaxed font-semibold">
                Address: 123 Business Street, Mumbai, Maharashtra 400001, India
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent-400/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black mb-6 text-black">
                Questions About Cookies?
              </h2>
              <p className="text-xl text-black/80 max-w-3xl mx-auto font-semibold">
                Contact us if you have any questions about our cookie policy.
              </p>
            </div>
          </FadeIn>
          
          <div className="max-w-4xl mx-auto">
            <FadeIn delay={0.2}>
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
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}
`

console.log(`\n✅ Successfully updated ${updatedCount} websites!`)