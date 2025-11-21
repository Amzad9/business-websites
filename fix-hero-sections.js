const fs = require('fs')
const path = require('path')

const websitesDir = __dirname
const websites = fs.readdirSync(websitesDir).filter(dir => {
  const dirPath = path.join(websitesDir, dir)
  return fs.statSync(dirPath).isDirectory() && 
         !dir.startsWith('.') && 
         fs.existsSync(path.join(dirPath, 'app'))
})

const heroTemplates = {
  'app/services/page.tsx': {
    h1: 'Services & <span className="bg-gradient-to-r from-primary-200 to-accent-300 bg-clip-text text-transparent">Solutions</span>',
    p: 'Comprehensive solutions to help your business thrive in the digital landscape'
  },
  'app/about/page.tsx': {
    h1: 'About <span className="text-primary-200">BoldBite</span>',
    p: 'We are a team of passionate professionals dedicated to delivering exceptional results'
  },
  'app/portfolio/page.tsx': {
    h1: 'Our <span className="text-primary-200">Portfolio</span>',
    p: 'Showcasing our best work and successful projects'
  },
  'app/blog/page.tsx': {
    h1: 'Our <span className="text-primary-200">Blog</span>',
    p: 'Latest insights, tips, and updates from our team'
  },
  'app/contact/page.tsx': {
    h1: 'Get In <span className="text-primary-200">Touch</span>',
    p: 'We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.'
  },
  'app/workflow/page.tsx': {
    h1: 'Our <span className="text-primary-200">Workflow</span>',
    p: 'A streamlined process designed to deliver exceptional results every time'
  },
  'app/how-to-work/page.tsx': {
    h1: 'How We <span className="text-primary-200">Work</span>',
    p: 'A clear, transparent process from start to finish'
  },
  'app/privacy/page.tsx': {
    h1: 'Privacy <span className="text-primary-200">Policy</span>',
    p: `Last updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`
  },
  'app/terms/page.tsx': {
    h1: 'Terms of <span className="text-primary-200">Service</span>',
    p: `Last updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`
  },
  'app/cookies/page.tsx': {
    h1: 'Cookie <span className="text-primary-200">Policy</span>',
    p: `Last updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`
  },
  'app/blog/[slug]/page.tsx': {
    h1: 'post.frontmatter.title as string',
    p: 'post.frontmatter.date'
  },
  'app/portfolio/[slug]/page.tsx': {
    h1: 'project.title',
    p: 'project.description'
  },
}

let updatedCount = 0

websites.forEach((website) => {
  try {
    const websitePath = path.join(websitesDir, website)
    const companyName = website

    Object.keys(heroTemplates).forEach((pagePath) => {
      const fullPath = path.join(websitePath, pagePath)
      if (!fs.existsSync(fullPath)) return

      const template = heroTemplates[pagePath]
      let content = fs.readFileSync(fullPath, 'utf8')
      const originalContent = content

      // Replace company name in templates
      let h1Text = template.h1.replace(/BoldBite/g, companyName)
      let pText = template.p

      // Special handling for dynamic pages
      if (pagePath.includes('[slug]')) {
        // These pages have dynamic content, so we need to preserve their structure
        // Just fix the broken template code
        if (content.includes('title.includes')) {
          if (pagePath.includes('blog')) {
            h1Text = '{post.frontmatter.title as string}'
            pText = '{post.frontmatter.date instanceof Date ? post.frontmatter.date.toLocaleDateString() : String(post.frontmatter.date || \'\')}'
          } else if (pagePath.includes('portfolio')) {
            h1Text = '{project.title}'
            pText = '{project.description}'
          }
        }
      }

      // Fix the broken hero section
      const brokenPattern = /\{title\.includes\([^}]+\}\}/g
      
      // Replace broken h1 with proper JSX
      const h1Pattern = /<h1 className="text-5xl md:text-7xl font-black mb-6 text-white">[\s\S]*?<\/h1>/
      if (content.match(h1Pattern)) {
        content = content.replace(h1Pattern, `<h1 className="text-5xl md:text-7xl font-black mb-6 text-white">
              ${h1Text}
            </h1>`)
      }

      // Replace broken p with proper JSX
      const pPattern = /<p className="text-xl md:text-2xl text-white\/90 font-semibold">[\s\S]*?<\/p>/
      if (content.match(pPattern)) {
        content = content.replace(pPattern, `<p className="text-xl md:text-2xl text-white/90 font-semibold">
              ${pText}
            </p>`)
      }

      // Clean up any remaining template code
      content = content.replace(/\{title\.includes\([^}]+\}\}/g, '')
      content = content.replace(/title\.includes\([^)]+\)/g, '')

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content)
        console.log(`✓ Fixed ${pagePath} for ${website}`)
      }
    })

    updatedCount++
    if (updatedCount % 10 === 0) {
      console.log(`✅ Processed ${updatedCount}/${websites.length} websites\n`)
    }

  } catch (error) {
    console.error(`❌ Error updating ${website}:`, error.message)
  }
})

console.log(`\n✅ Successfully fixed ${updatedCount} websites!`)

