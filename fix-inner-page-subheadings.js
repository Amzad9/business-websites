const fs = require('fs')
const path = require('path')

const websitesDir = __dirname
const websites = fs.readdirSync(websitesDir).filter(dir => {
  const dirPath = path.join(websitesDir, dir)
  return fs.statSync(dirPath).isDirectory() && 
         !dir.startsWith('.') && 
         fs.existsSync(path.join(dirPath, 'app'))
})

console.log(`Found ${websites.length} websites to update\n`)

let updatedCount = 0

websites.forEach((website) => {
  try {
    const websitePath = path.join(websitesDir, website)

    // Pages to update
    const pagesToFix = [
      'app/about/page.tsx',
      'app/services/page.tsx',
      'app/workflow/page.tsx',
      'app/how-to-work/page.tsx',
      'app/blog/page.tsx',
      'app/contact/page.tsx',
      'app/privacy/page.tsx',
      'app/terms/page.tsx',
      'app/cookies/page.tsx',
      'app/blog/[slug]/page.tsx',
      'app/portfolio/[slug]/page.tsx',
    ]

    pagesToFix.forEach((pagePath) => {
      const fullPath = path.join(websitePath, pagePath)
      if (!fs.existsSync(fullPath)) return

      let content = fs.readFileSync(fullPath, 'utf8')
      const originalContent = content

      // Replace text-white/90 with text-white in hero section subheadings
      // Match the pattern in hero sections specifically
      content = content.replace(
        /className="text-xl md:text-2xl text-white\/90 font-semibold"/g,
        'className="text-xl md:text-2xl text-white font-semibold"'
      )
      
      // Also fix any other variations
      content = content.replace(
        /className="text-xl md:text-2xl text-white\/90 font-semibold"/g,
        'className="text-xl md:text-2xl text-white font-semibold"'
      )

      // Fix blog and portfolio slug pages
      content = content.replace(
        /className="text-white\/90 font-semibold mb-8"/g,
        'className="text-white font-semibold mb-8"'
      )
      content = content.replace(
        /className="text-xl text-white\/90 mb-8 font-semibold leading-relaxed"/g,
        'className="text-xl text-white mb-8 font-semibold leading-relaxed"'
      )

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content)
      }
    })

    // Fix PortfolioContent and TestimonialContent components
    const portfolioPath = path.join(websitePath, 'components', 'PortfolioContent.tsx')
    if (fs.existsSync(portfolioPath)) {
      let content = fs.readFileSync(portfolioPath, 'utf8')
      const originalContent = content

      content = content.replace(
        /className="text-xl md:text-2xl text-white\/90 font-semibold"/g,
        'className="text-xl md:text-2xl text-white font-semibold"'
      )

      if (content !== originalContent) {
        fs.writeFileSync(portfolioPath, content)
      }
    }

    const testimonialPath = path.join(websitePath, 'components', 'TestimonialContent.tsx')
    if (fs.existsSync(testimonialPath)) {
      let content = fs.readFileSync(testimonialPath, 'utf8')
      const originalContent = content

      content = content.replace(
        /className="text-xl md:text-2xl text-white\/90 font-semibold"/g,
        'className="text-xl md:text-2xl text-white font-semibold"'
      )

      if (content !== originalContent) {
        fs.writeFileSync(testimonialPath, content)
      }
    }

    updatedCount++
    if (updatedCount % 10 === 0) {
      console.log(`✅ Processed ${updatedCount}/${websites.length} websites\n`)
    }

  } catch (error) {
    console.error(`❌ Error updating ${website}:`, error.message)
  }
})

console.log(`\n✅ Successfully fixed ${updatedCount} websites!`)

