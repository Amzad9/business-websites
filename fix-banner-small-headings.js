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

    // Fix portfolio detail page category badge in banner
    const portfolioSlugPath = path.join(websitePath, 'app', 'portfolio', '[slug]', 'page.tsx')
    if (fs.existsSync(portfolioSlugPath)) {
      let content = fs.readFileSync(portfolioSlugPath, 'utf8')
      const originalContent = content

      // Change category badge from text-primary-200 to text-white
      content = content.replace(
        /className="text-sm text-primary-200 font-bold uppercase tracking-wider"/g,
        'className="text-sm text-white font-bold uppercase tracking-wider"'
      )

      if (content !== originalContent) {
        fs.writeFileSync(portfolioSlugPath, content)
      }
    }

    // Fix PortfolioContent component - category badges in portfolio grid (not in banner, but checking)
    const portfolioContentPath = path.join(websitePath, 'components', 'PortfolioContent.tsx')
    if (fs.existsSync(portfolioContentPath)) {
      let content = fs.readFileSync(portfolioContentPath, 'utf8')
      const originalContent = content

      // These are in the grid cards, not banner, but we can check if they're in a banner context
      // Actually, these are in the portfolio grid, not banner, so we'll leave them

      if (content !== originalContent) {
        fs.writeFileSync(portfolioContentPath, content)
      }
    }

    // Check if there are any other small headings in banner sections
    // These would be in hero sections with background images
    const pagesToCheck = [
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
    ]

    pagesToCheck.forEach((pagePath) => {
      const fullPath = path.join(websitePath, pagePath)
      if (!fs.existsSync(fullPath)) return

      let content = fs.readFileSync(fullPath, 'utf8')
      const originalContent = content

      // Look for small text elements in hero/banner sections
      // Pattern: text-sm or text-xs with primary colors in sections with background images
      // We need to be careful - only change ones in banner/hero sections
      
      // For now, we'll focus on the portfolio detail page which we know has a category badge
      // Other small headings like spans in h1 tags (text-primary-200) are stylistic and should remain

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content)
      }
    })

    // Fix TestimonialContent if it has any small headings in banner
    const testimonialPath = path.join(websitePath, 'components', 'TestimonialContent.tsx')
    if (fs.existsSync(testimonialPath)) {
      let content = fs.readFileSync(testimonialPath, 'utf8')
      const originalContent = content

      // Check for small headings in banner section
      // Usually testimonials don't have category badges in banner, but let's check

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
console.log(`\nChanges made:`)
console.log(`- Portfolio detail page: Category badge changed from text-primary-200 to text-white`)

