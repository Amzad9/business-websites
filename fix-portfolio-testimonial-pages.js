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

    // Fix Portfolio page - remove pt-20 wrapper
    const portfolioPagePath = path.join(websitePath, 'app', 'portfolio', 'page.tsx')
    if (fs.existsSync(portfolioPagePath)) {
      let content = fs.readFileSync(portfolioPagePath, 'utf8')
      const originalContent = content

      // Replace wrapper div with fragment
      content = content.replace(
        /export default function Portfolio\(\) \{[\s\S]*?return \([\s\S]*?<div className="pt-20 min-h-screen">[\s\S]*?<PortfolioContent \/>[\s\S]*?<\/div>[\s\S]*?\)[\s\S]*?\}/,
        `export default function Portfolio() {
  return (
    <>
      <PortfolioContent />
    </>
  )
}`
      )

      if (content !== originalContent) {
        fs.writeFileSync(portfolioPagePath, content)
        console.log(`✓ Fixed Portfolio page for ${website}`)
      }
    }

    // Fix Testimonial page - remove pt-20 wrapper
    const testimonialPagePath = path.join(websitePath, 'app', 'testimonial', 'page.tsx')
    if (fs.existsSync(testimonialPagePath)) {
      let content = fs.readFileSync(testimonialPagePath, 'utf8')
      const originalContent = content

      // Replace wrapper div with fragment
      content = content.replace(
        /export default function Testimonial\(\) \{[\s\S]*?return \([\s\S]*?<div className="pt-20 min-h-screen">[\s\S]*?<TestimonialContent \/>[\s\S]*?<\/div>[\s\S]*?\)[\s\S]*?\}/,
        `export default function Testimonial() {
  return (
    <>
      <TestimonialContent />
    </>
  )
}`
      )

      if (content !== originalContent) {
        fs.writeFileSync(testimonialPagePath, content)
        console.log(`✓ Fixed Testimonial page for ${website}`)
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

