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
    const globalsCssPath = path.join(websitePath, 'app', 'globals.css')

    if (!fs.existsSync(globalsCssPath)) {
      console.log(`⚠️  globals.css not found in ${website}`)
      return
    }

    let content = fs.readFileSync(globalsCssPath, 'utf8')
    const originalContent = content

    // Check if the override rule already exists
    if (content.includes('section.relative.overflow-hidden p.text-white')) {
      // Already updated
      updatedCount++
      return
    }

    // Find the paragraph styling rule and add override after it
    const paragraphRule = /\/\* Paragraph text - Force visibility \*\/\s*p\s*\{[^}]*\}/g
    const match = content.match(paragraphRule)

    if (match) {
      // Add the override rule right after the paragraph rule
      const overrideRule = `\n/* Override for paragraphs in banner/hero sections with background images - must be white */\nsection.relative.overflow-hidden p.text-white,\nsection[class*="relative"][class*="overflow-hidden"] p.text-white,\nsection.pt-24 p.text-white,\nsection.relative p.text-white {\n  color: #ffffff !important;\n}`
      
      content = content.replace(
        /(\/\* Paragraph text - Force visibility \*\/\s*p\s*\{[^}]*\})/,
        `$1${overrideRule}`
      )
    } else {
      // If paragraph rule not found, add both rules
      const rules = `\n/* Paragraph text - Force visibility */\np {\n  color: #000000 !important; /* Pure black */\n  font-weight: 600 !important;\n}\n\n/* Override for paragraphs in banner/hero sections with background images - must be white */\nsection.relative.overflow-hidden p.text-white,\nsection[class*="relative"][class*="overflow-hidden"] p.text-white,\nsection.pt-24 p.text-white,\nsection.relative p.text-white {\n  color: #ffffff !important;\n}`
      
      // Add at the end of the file
      content = content + rules
    }

    if (content !== originalContent) {
      fs.writeFileSync(globalsCssPath, content)
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
console.log(`\nChanges:`)
console.log(`- Added CSS override rule to ensure banner subheadings (paragraphs) are white`)
console.log(`- Override applies to paragraphs with text-white class in banner sections`)

