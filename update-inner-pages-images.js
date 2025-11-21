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

// Unsplash images for different pages
const unsplashImages = {
  about: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop&q=80',
  services: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop&q=80',
  portfolio: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop&q=80',
  blog: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&h=1080&fit=crop&q=80',
  contact: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=1080&fit=crop&q=80',
  workflow: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&h=1080&fit=crop&q=80',
  'how-to-work': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop&q=80',
  testimonial: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&h=1080&fit=crop&q=80',
  'blog-slug': 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1920&h=1080&fit=crop&q=80',
  'portfolio-slug': 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1920&h=1080&fit=crop&q=80',
  privacy: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&h=1080&fit=crop&q=80',
  terms: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&h=1080&fit=crop&q=80',
  cookies: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1920&h=1080&fit=crop&q=80',
}

let updatedCount = 0

websites.forEach((website) => {
  try {
    const websitePath = path.join(websitesDir, website)

    // Pages to update
    const pagesToUpdate = [
      { path: 'app/about/page.tsx', image: unsplashImages.about, title: 'About Us' },
      { path: 'app/services/page.tsx', image: unsplashImages.services, title: 'Services' },
      { path: 'app/portfolio/page.tsx', image: unsplashImages.portfolio, title: 'Portfolio' },
      { path: 'app/blog/page.tsx', image: unsplashImages.blog, title: 'Blog' },
      { path: 'app/contact/page.tsx', image: unsplashImages.contact, title: 'Contact' },
      { path: 'app/workflow/page.tsx', image: unsplashImages.workflow, title: 'Workflow' },
      { path: 'app/how-to-work/page.tsx', image: unsplashImages['how-to-work'], title: 'How to Work' },
      { path: 'app/blog/[slug]/page.tsx', image: unsplashImages['blog-slug'], title: 'Blog Post' },
      { path: 'app/portfolio/[slug]/page.tsx', image: unsplashImages['portfolio-slug'], title: 'Project' },
      { path: 'app/privacy/page.tsx', image: unsplashImages.privacy, title: 'Privacy Policy' },
      { path: 'app/terms/page.tsx', image: unsplashImages.terms, title: 'Terms of Service' },
      { path: 'app/cookies/page.tsx', image: unsplashImages.cookies, title: 'Cookie Policy' },
    ]

    pagesToUpdate.forEach(({ path: pagePath, image, title }) => {
      const fullPath = path.join(websitePath, pagePath)
      if (!fs.existsSync(fullPath)) return

      let content = fs.readFileSync(fullPath, 'utf8')
      const originalContent = content

      // Remove FadeIn and KineticText imports
      content = content.replace(/import FadeIn from.*\n/g, '')
      content = content.replace(/import KineticText from.*\n/g, '')
      content = content.replace(/,\s*FadeIn/g, '')
      content = content.replace(/,\s*KineticText/g, '')
      content = content.replace(/FadeIn,\s*/g, '')
      content = content.replace(/KineticText,\s*/g, '')

      // Replace hero section with Unsplash image and gradient
      const heroPattern = /<section className="pt-24 pb-20 min-h-\[60vh\] bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">[\s\S]*?<\/section>/
      const heroReplacement = `<section className="pt-24 pb-20 min-h-[60vh] relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="${image}"
            alt="${title}"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/90 via-primary-700/80 to-primary-800/90"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black mb-6 text-white">
              {title.includes('About') ? 'About' : title.includes('Services') ? 'Services &' : title.includes('Portfolio') ? 'Our' : title.includes('Blog') && !title.includes('Post') ? 'Our' : title.includes('Contact') ? 'Get In' : title.includes('Workflow') ? 'Our' : title.includes('How to Work') ? 'How We' : title.includes('Privacy') ? 'Privacy' : title.includes('Terms') ? 'Terms of' : title.includes('Cookie') ? 'Cookie' : title}
              {title.includes('About') ? ' <span className="text-primary-200">BoldBite</span>' : title.includes('Services') ? ' <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">Solutions</span>' : title.includes('Portfolio') ? ' <span className="text-primary-200">Portfolio</span>' : title.includes('Blog') && !title.includes('Post') ? ' <span className="text-primary-200">Blog</span>' : title.includes('Contact') ? ' <span className="text-primary-200">Touch</span>' : title.includes('Workflow') ? ' <span className="text-primary-200">Workflow</span>' : title.includes('How to Work') ? ' <span className="text-primary-200">Work</span>' : title.includes('Privacy') ? ' <span className="text-primary-200">Policy</span>' : title.includes('Terms') ? ' <span className="text-primary-200">Service</span>' : title.includes('Cookie') ? ' <span className="text-primary-200">Policy</span>' : ''}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-semibold">
              {title.includes('About') ? 'We are a team of passionate professionals dedicated to delivering exceptional results' : title.includes('Services') ? 'Comprehensive solutions to help your business thrive in the digital landscape' : title.includes('Portfolio') ? 'Showcasing our best work and successful projects' : title.includes('Blog') && !title.includes('Post') ? 'Latest insights, tips, and updates from our team' : title.includes('Contact') ? 'We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.' : title.includes('Workflow') ? 'A streamlined process designed to deliver exceptional results every time' : title.includes('How to Work') ? 'A clear, transparent process from start to finish' : title.includes('Privacy') ? 'Last updated: ' + new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : title.includes('Terms') ? 'Last updated: ' + new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : title.includes('Cookie') ? 'Last updated: ' + new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
            </p>
          </div>
        </div>
      </section>`

      if (content.match(heroPattern)) {
        content = content.replace(heroPattern, heroReplacement)
      }

      // Remove all FadeIn wrappers
      content = content.replace(/<FadeIn[^>]*>/g, '<div>')
      content = content.replace(/<\/FadeIn>/g, '</div>')
      content = content.replace(/<FadeIn delay=\{[\d.]+\}[^>]*>/g, '<div>')
      content = content.replace(/<FadeIn key=\{[\w.]+\}[^>]*>/g, '<div key={$1}>')
      content = content.replace(/<FadeIn key=\{[\w.]+\} delay=\{[\d.]+\}[^>]*>/g, '<div key={$1}>')

      // Remove KineticText wrappers
      content = content.replace(/<KineticText[^>]*>/g, '')
      content = content.replace(/<\/KineticText>/g, '')

      // Fix text colors in hero sections (should be white)
      content = content.replace(/text-black(?=.*text-primary-700)/g, 'text-white')
      
      // Clean up empty lines after imports
      content = content.replace(/\n{3,}/g, '\n\n')

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content)
        console.log(`✓ Updated ${pagePath} for ${website}`)
      }
    })

    // Update TestimonialContent and PortfolioContent components
    const testimonialPath = path.join(websitePath, 'components', 'TestimonialContent.tsx')
    if (fs.existsSync(testimonialPath)) {
      let content = fs.readFileSync(testimonialPath, 'utf8')
      let modified = false

      // Update hero section
      if (content.includes('pt-24 pb-20 min-h-[60vh] bg-gradient-to-br from-gray-50')) {
        content = content.replace(
          /<section className="pt-24 pb-20 min-h-\[60vh\] bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">[\s\S]*?<\/section>/,
          `<section className="pt-24 pb-20 min-h-[60vh] relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="${unsplashImages.testimonial}"
            alt="Testimonials"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/90 via-primary-700/80 to-primary-800/90"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black mb-6 text-white">
              Client <span className="text-primary-200">Testimonials</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-semibold">
              See what our clients have to say about working with us
            </p>
          </div>
        </div>
      </section>`
        )
        modified = true
      }

      // Remove FadeIn and KineticText
      content = content.replace(/import FadeIn from.*\n/g, '')
      content = content.replace(/import KineticText from.*\n/g, '')
      content = content.replace(/<FadeIn[^>]*>/g, '<div>')
      content = content.replace(/<\/FadeIn>/g, '</div>')
      content = content.replace(/<KineticText[^>]*>/g, '')
      content = content.replace(/<\/KineticText>/g, '')

      if (modified || content.includes('FadeIn') || content.includes('KineticText')) {
        fs.writeFileSync(testimonialPath, content)
        console.log(`✓ Updated TestimonialContent.tsx for ${website}`)
      }
    }

    const portfolioPath = path.join(websitePath, 'components', 'PortfolioContent.tsx')
    if (fs.existsSync(portfolioPath)) {
      let content = fs.readFileSync(portfolioPath, 'utf8')
      let modified = false

      // Update hero section
      if (content.includes('pt-24 pb-20 min-h-[60vh] bg-gradient-to-br from-gray-50')) {
        content = content.replace(
          /<section className="pt-24 pb-20 min-h-\[60vh\] bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">[\s\S]*?<\/section>/,
          `<section className="pt-24 pb-20 min-h-[60vh] relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="${unsplashImages.portfolio}"
            alt="Portfolio"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/90 via-primary-700/80 to-primary-800/90"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black mb-6 text-white">
              Our <span className="text-primary-200">Portfolio</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-semibold">
              Showcasing our best work and successful projects
            </p>
          </div>
        </div>
      </section>`
        )
        modified = true
      }

      // Remove FadeIn from portfolio items
      content = content.replace(/<FadeIn[^>]*>/g, '<div>')
      content = content.replace(/<\/FadeIn>/g, '</div>')
      content = content.replace(/import FadeIn from.*\n/g, '')
      content = content.replace(/import KineticText from.*\n/g, '')
      content = content.replace(/<KineticText[^>]*>/g, '')
      content = content.replace(/<\/KineticText>/g, '')

      if (modified || content.includes('<FadeIn')) {
        fs.writeFileSync(portfolioPath, content)
        console.log(`✓ Updated PortfolioContent.tsx for ${website}`)
      }
    }

    updatedCount++
    console.log(`✅ Completed ${website} (${updatedCount}/${websites.length})\n`)

  } catch (error) {
    console.error(`❌ Error updating ${website}:`, error.message)
  }
})

console.log(`\n✅ Successfully updated ${updatedCount} websites!`)

