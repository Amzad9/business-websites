const fs = require('fs');
const path = require('path');

// Find all directories (websites)
const directories = fs.readdirSync('.', { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && dirent.name !== 'node_modules' && !dirent.name.startsWith('.'))
  .map(dirent => dirent.name);

let updatedCount = 0;
let errorCount = 0;

// Read the BoldBite page.tsx as template
const templatePath = path.join('BoldBite', 'app', 'page.tsx');
const templateContent = fs.readFileSync(templatePath, 'utf8');

directories.forEach(dir => {
  const pagePath = path.join(dir, 'app', 'page.tsx');
  
  if (fs.existsSync(pagePath)) {
    try {
      // Read current page
      let content = fs.readFileSync(pagePath, 'utf8');
      
      // Extract metadata and JSON-LD (if exists) to preserve company-specific info
      const companyName = dir;
      const companyUrl = `https://${dir.toLowerCase()}.com`;
      
      // Replace company name in the template content
      let newContent = templateContent
        .replace(/BoldBite/g, companyName)
        .replace(/boldbite/g, companyName.toLowerCase())
        .replace(/boldbite\.com/g, `${companyName.toLowerCase()}.com`)
        .replace(/https:\/\/boldbite\.com/g, companyUrl);
      
      // Write updated content
      fs.writeFileSync(pagePath, newContent, 'utf8');
      console.log(`✓ Updated: ${dir}/app/page.tsx`);
      updatedCount++;
    } catch (error) {
      console.error(`✗ Error updating ${dir}/app/page.tsx:`, error.message);
      errorCount++;
    }
  } else {
    console.log(`⚠ File not found: ${dir}/app/page.tsx`);
  }
});

console.log(`\n✅ Updated ${updatedCount} files`);
if (errorCount > 0) {
  console.log(`❌ Errors: ${errorCount} files`);
}

