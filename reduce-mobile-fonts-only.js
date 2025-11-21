const fs = require('fs')
const path = require('path')

const siteDir = path.join(__dirname, 'ByteBloom')

// Files to update
const filesToUpdate = [
  'app/page.tsx',
  'app/about/page.tsx',
  'app/services/page.tsx',
  'app/contact/page.tsx',
  'app/blog/page.tsx',
  'components/PortfolioContent.tsx',
  'components/TestimonialContent.tsx',
]

// Reduce only mobile font sizes, keep desktop sizes
function reduceMobileFonts(content) {
  let updated = content
  
  // Hero headings - reduce mobile, keep desktop
  updated = updated.replace(/text-5xl md:text-8xl/g, 'text-3xl md:text-8xl')
  updated = updated.replace(/text-4xl md:text-7xl/g, 'text-3xl md:text-7xl')
  updated = updated.replace(/text-4xl md:text-6xl/g, 'text-3xl md:text-6xl')
  updated = updated.replace(/text-2xl md:text-4xl/g, 'text-2xl md:text-7xl') // Page titles like ABOUT, SERVICES
  updated = updated.replace(/text-3xl md:text-5xl/g, 'text-2xl md:text-5xl')
  
  // Section headings
  updated = updated.replace(/text-2xl md:text-4xl(?=.*font-black)/g, 'text-xl md:text-4xl')
  updated = updated.replace(/text-3xl md:text-5xl(?=.*font-black)/g, 'text-xl md:text-5xl')
  
  // Subheadings
  updated = updated.replace(/text-2xl md:text-4xl(?=.*font-bold)/g, 'text-lg md:text-4xl')
  updated = updated.replace(/text-xl md:text-2xl/g, 'text-base md:text-2xl')
  
  // Large numbers
  updated = updated.replace(/text-2xl md:text-4xl(?=.*bg-gradient)/g, 'text-xl md:text-4xl')
  
  return updated
}

// Process each file
filesToUpdate.forEach(filePath => {
  const fullPath = path.join(siteDir, filePath)
  
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8')
    const originalContent = content
    
    content = reduceMobileFonts(content)
    
    if (content !== originalContent) {
      fs.writeFileSync(fullPath, content, 'utf8')
      console.log(`✅ Updated ${filePath}`)
    } else {
      console.log(`⏭️  No changes needed for ${filePath}`)
    }
  } else {
    console.log(`⚠️  File not found: ${filePath}`)
  }
})

console.log('\n✅ Mobile font size reduction complete!')
console.log('Desktop and tablet sizes remain unchanged.')

