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

    // 1. Fix Header.tsx - Menu colors on banner
    const headerPath = path.join(websitePath, 'components', 'Header.tsx')
    if (fs.existsSync(headerPath)) {
      let content = fs.readFileSync(headerPath, 'utf8')
      const originalContent = content

      // Fix menu links - white when not scrolled
      if (content.includes('text-gray-700 hover:text-primary-600') && !content.includes('scrolled ?')) {
        content = content.replace(
          /className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors relative group"/g,
          `className={\`text-sm font-medium transition-colors relative group \${
                  scrolled 
                    ? 'text-gray-700 hover:text-primary-600' 
                    : 'text-white hover:text-primary-200'
                }\`}`
        )
      }

      // Fix menu underline
      if (content.includes('bg-primary-600 group-hover:w-full') && !content.includes('scrolled ?')) {
        content = content.replace(
          /<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300" \/>/g,
          `<span className={\`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full \${
                  scrolled ? 'bg-primary-600' : 'bg-white'
                }\`} />`
        )
      }

      // Fix logo - white when not scrolled
      if (content.includes('bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent') && !content.includes('scrolled ?')) {
        content = content.replace(
          /className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent"/g,
          `className={\`text-2xl font-bold \${
                    scrolled 
                      ? 'bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent' 
                      : 'text-white'
                  }\`}`
        )
      }

      // Fix mobile menu button
      if (content.includes('bg-gray-100 relative z-50') && !content.includes('scrolled ?')) {
        content = content.replace(
          /className="p-2 rounded-lg bg-gray-100 relative z-50"/g,
          `className={\`p-2 rounded-lg relative z-50 transition-colors \${
                    scrolled ? 'bg-gray-100 text-gray-700' : 'bg-white/20 text-white backdrop-blur-sm'
                  }\`}`
        )
      }

      if (content !== originalContent) {
        fs.writeFileSync(headerPath, content)
        console.log(`✓ Updated Header.tsx for ${website}`)
      }
    }

    // 2. Fix all inner page hero sections - vertical alignment
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

      // Add flex items-center to hero section and w-full to container
      content = content.replace(
        /<section className="pt-24 pb-20 min-h-\[60vh\] relative overflow-hidden">/g,
        '<section className="pt-24 pb-20 min-h-[60vh] relative overflow-hidden flex items-center">'
      )
      content = content.replace(
        /<section className="pt-24 pb-20 min-h-\[40vh\] relative overflow-hidden">/g,
        '<section className="pt-24 pb-20 min-h-[40vh] relative overflow-hidden flex items-center">'
      )
      
      // Add w-full to container div
      content = content.replace(
        /<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50">/g,
        '<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50 w-full">'
      )
      content = content.replace(
        /<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50 max-w-4xl">/g,
        '<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50 max-w-4xl w-full">'
      )

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content)
      }
    })

    // 3. Fix PortfolioContent and TestimonialContent hero sections
    const portfolioPath = path.join(websitePath, 'components', 'PortfolioContent.tsx')
    if (fs.existsSync(portfolioPath)) {
      let content = fs.readFileSync(portfolioPath, 'utf8')
      const originalContent = content

      content = content.replace(
        /<section className="pt-24 pb-20 min-h-\[60vh\] relative overflow-hidden">/g,
        '<section className="pt-24 pb-20 min-h-[60vh] relative overflow-hidden flex items-center">'
      )
      content = content.replace(
        /<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50">/g,
        '<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50 w-full">'
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
        /<section className="pt-24 pb-20 min-h-\[60vh\] relative overflow-hidden">/g,
        '<section className="pt-24 pb-20 min-h-[60vh] relative overflow-hidden flex items-center">'
      )
      content = content.replace(
        /<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50">/g,
        '<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50 w-full">'
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

