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
    const headerPath = path.join(websitePath, 'components', 'Header.tsx')
    
    if (!fs.existsSync(headerPath)) return

    let content = fs.readFileSync(headerPath, 'utf8')
    const originalContent = content

    // Add usePathname import if not present
    if (!content.includes('usePathname')) {
      content = content.replace(
        /import { useState, useEffect } from 'react'/g,
        "import { useState, useEffect } from 'react'\nimport { usePathname } from 'next/navigation'"
      )
    }

    // Add pathname and hasDarkBanner logic
    if (!content.includes('const pathname = usePathname()')) {
      content = content.replace(
        /const \[scrolled, setScrolled\] = useState\(false\)/,
        `const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Home page has white background, inner pages have banner images with dark gradients
  const isHomePage = pathname === '/'
  const hasDarkBanner = !isHomePage // All inner pages have dark banner images`
      )
    }

    // Fix logo color
    if (content.includes("scrolled \n                      ? 'bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent' \n                      : 'text-white'")) {
      content = content.replace(
        /scrolled \n                      \? 'bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent' \n                      : 'text-white'/g,
        `scrolled 
                      ? 'bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent' 
                      : hasDarkBanner
                        ? 'text-white'
                        : 'text-black'`
      )
    } else if (content.includes(": 'text-white'")) {
      content = content.replace(
        /scrolled \s+\? 'bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent' \s+: 'text-white'/g,
        `scrolled 
                      ? 'bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent' 
                      : hasDarkBanner
                        ? 'text-white'
                        : 'text-black'`
      )
    }

    // Fix menu links color
    if (content.includes("scrolled \n                    ? 'text-gray-700 hover:text-primary-600' \n                    : 'text-white hover:text-primary-200'")) {
      content = content.replace(
        /scrolled \n                    \? 'text-gray-700 hover:text-primary-600' \n                    : 'text-white hover:text-primary-200'/g,
        `scrolled 
                    ? 'text-gray-700 hover:text-primary-600' 
                    : hasDarkBanner
                      ? 'text-white hover:text-primary-200'
                      : 'text-gray-700 hover:text-primary-600'`
      )
    }

    // Fix menu underline
    if (content.includes("scrolled ? 'bg-primary-600' : 'bg-white'")) {
      content = content.replace(
        /scrolled \? 'bg-primary-600' : 'bg-white'/g,
        `scrolled 
                    ? 'bg-primary-600' 
                    : hasDarkBanner
                      ? 'bg-white'
                      : 'bg-primary-600'`
      )
    }

    // Fix mobile menu button
    if (content.includes("scrolled ? 'bg-gray-100 text-gray-700' : 'bg-white/20 text-white backdrop-blur-sm'")) {
      content = content.replace(
        /scrolled \? 'bg-gray-100 text-gray-700' : 'bg-white\/20 text-white backdrop-blur-sm'/g,
        `scrolled 
                      ? 'bg-gray-100 text-gray-700' 
                      : hasDarkBanner
                        ? 'bg-white/20 text-white backdrop-blur-sm'
                        : 'bg-gray-100 text-gray-700'`
      )
    }

    if (content !== originalContent) {
      fs.writeFileSync(headerPath, content)
      console.log(`✓ Updated Header.tsx for ${website}`)
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

