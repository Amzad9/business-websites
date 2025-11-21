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

// Font size reduction mapping
const fontSizeReductions = [
  // Large headings: reduce by 2-3 sizes
  { from: 'text-9xl', to: 'text-7xl', mdFrom: 'md:text-9xl', mdTo: 'md:text-8xl' },
  { from: 'text-8xl', to: 'text-6xl', mdFrom: 'md:text-8xl', mdTo: 'md:text-7xl' },
  { from: 'text-7xl', to: 'text-5xl', mdFrom: 'md:text-7xl', mdTo: 'md:text-6xl' },
  { from: 'text-6xl', to: 'text-4xl', mdFrom: 'md:text-6xl', mdTo: 'md:text-5xl' },
  { from: 'text-5xl', to: 'text-3xl', mdFrom: 'md:text-5xl', mdTo: 'md:text-4xl' },
  { from: 'text-4xl', to: 'text-2xl', mdFrom: 'md:text-4xl', mdTo: 'md:text-3xl' },
  // Subheadings: reduce by 1-2 sizes
  { from: 'text-3xl', to: 'text-2xl', mdFrom: 'md:text-5xl', mdTo: 'md:text-4xl' },
  { from: 'text-3xl', to: 'text-2xl', mdFrom: 'md:text-3xl', mdTo: 'md:text-2xl' },
]

function reduceFontSizes(content) {
  let updated = content
  
  // Replace font sizes, handling both with and without md: variants
  fontSizeReductions.forEach(({ from, to, mdFrom, mdTo }) => {
    // Replace standalone text-*xl classes
    updated = updated.replace(new RegExp(`\\b${from}\\b`, 'g'), to)
    
    // Replace md:text-*xl classes
    if (mdFrom && mdTo) {
      updated = updated.replace(new RegExp(`\\b${mdFrom}\\b`, 'g'), mdTo)
    }
  })
  
  return updated
}

// Process each file
filesToUpdate.forEach(filePath => {
  const fullPath = path.join(siteDir, filePath)
  
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8')
    const originalContent = content
    
    content = reduceFontSizes(content)
    
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

console.log('\n✅ Font size reduction complete!')

