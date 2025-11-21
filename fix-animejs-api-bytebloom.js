const fs = require('fs')
const path = require('path')

const bytebloomPath = path.join(__dirname, 'ByteBloom')

// Files to update
const filesToUpdate = [
  'components/Header.tsx',
  'components/FadeIn.tsx',
  'components/KineticText.tsx',
]

filesToUpdate.forEach((filePath) => {
  const fullPath = path.join(bytebloomPath, filePath)
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${filePath}`)
    return
  }

  let content = fs.readFileSync(fullPath, 'utf8')
  const originalContent = content

  // Replace anime.js v4 API calls
  // Pattern: animate({ targets: ..., ... }) -> animate(targets, { ... })
  
  // Match animate({ targets: element, ... }) and convert to animate(element, { ... })
  content = content.replace(
    /animate\(\s*\{\s*targets:\s*([^,}]+),\s*/g,
    (match, targets) => {
      // Extract the rest of the object
      return `animate(${targets}, {`
    }
  )

  // Fix any remaining animate({ targets: ... }) patterns
  content = content.replace(
    /animate\(\s*\{\s*targets:\s*([^,}]+),\s*([^}]+)\}\s*\)/g,
    (match, targets, rest) => {
      return `animate(${targets}, {${rest}})`
    }
  )

  // Also handle cases where targets might be in quotes or be a variable
  // More comprehensive replacement
  content = content.replace(
    /animate\(\s*\{[\s\S]*?targets:\s*([^,\n}]+),[\s\S]*?\}\s*\)/g,
    (match) => {
      // Extract targets value
      const targetsMatch = match.match(/targets:\s*([^,\n}]+)/)
      if (!targetsMatch) return match

      const targets = targetsMatch[1].trim()
      
      // Extract the rest of the properties
      const restMatch = match.match(/targets:\s*[^,\n}]+,([\s\S]*?)\}/)
      const rest = restMatch ? restMatch[1] : ''
      
      return `animate(${targets}, {${rest}})`
    }
  )

  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content)
    console.log(`✅ Updated ${filePath}`)
  } else {
    console.log(`ℹ️  No changes needed for ${filePath}`)
  }
})

console.log('\n✅ All files updated to use anime.js v4 API!')
console.log('\nChanged: animate({ targets: element, ... }) → animate(element, { ... })')

