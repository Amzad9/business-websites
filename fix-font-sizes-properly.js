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

// Proper font size reductions - reduce by 1-2 sizes, not too much
const replacements = [
  // Main hero headings (h1) - reduce moderately
  { pattern: /text-2xl md:text-2xl/g, replacement: 'text-4xl md:text-6xl' }, // For page titles that got too small
  { pattern: /text-2xl md:text-3xl/g, replacement: 'text-2xl md:text-4xl' },
  { pattern: /text-2xl md:text-4xl/g, replacement: 'text-2xl md:text-4xl' }, // Keep these
  
  // Section headings (h2) - reduce moderately  
  { pattern: /text-2xl md:text-2xl(?=.*font-black)/g, replacement: 'text-3xl md:text-5xl' },
  { pattern: /text-3xl md:text-4xl/g, replacement: 'text-3xl md:text-4xl' }, // Keep these
  { pattern: /text-3xl md:text-5xl/g, replacement: 'text-3xl md:text-5xl' }, // Keep these
  
  // Large display text - reduce by 2 sizes
  { pattern: /text-5xl md:text-7xl/g, replacement: 'text-4xl md:text-6xl' },
  { pattern: /text-4xl md:text-6xl/g, replacement: 'text-3xl md:text-5xl' },
  { pattern: /text-3xl md:text-5xl/g, replacement: 'text-2xl md:text-4xl' },
  
  // Very large headings - reduce significantly but not too much
  { pattern: /text-4xl md:text-7xl/g, replacement: 'text-3xl md:text-6xl' },
  { pattern: /text-5xl md:text-8xl/g, replacement: 'text-4xl md:text-7xl' },
  { pattern: /text-6xl md:text-9xl/g, replacement: 'text-4xl md:text-7xl' },
  { pattern: /text-7xl md:text-9xl/g, replacement: 'text-5xl md:text-7xl' },
  { pattern: /text-8xl md:text-9xl/g, replacement: 'text-5xl md:text-7xl' },
]

function fixFontSizes(content) {
  let updated = content
  
  // Apply replacements in order
  replacements.forEach(({ pattern, replacement }) => {
    updated = updated.replace(pattern, replacement)
  })
  
  return updated
}

// Process each file
filesToUpdate.forEach(filePath => {
  const fullPath = path.join(siteDir, filePath)
  
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8')
    const originalContent = content
    
    content = fixFontSizes(content)
    
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

console.log('\n✅ Font size fixes complete!')

