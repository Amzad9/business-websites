const fs = require('fs');
const path = require('path');

// Read the updated Header.tsx from BoldBite as template
const templatePath = path.join('BoldBite', 'components', 'Header.tsx');
const templateContent = fs.readFileSync(templatePath, 'utf8');

// Find all directories (websites)
const directories = fs.readdirSync('.', { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && dirent.name !== 'node_modules' && !dirent.name.startsWith('.'))
  .map(dirent => dirent.name);

let updatedCount = 0;
let errorCount = 0;

directories.forEach(dir => {
  const headerPath = path.join(dir, 'components', 'Header.tsx');
  
  if (fs.existsSync(headerPath)) {
    try {
      // Read current header
      let content = fs.readFileSync(headerPath, 'utf8');
      
      // Extract company name from directory
      const companyName = dir;
      const companyEmail = `info@${dir.toLowerCase()}.com`;
      
      // Replace company name and email in template
      let newContent = templateContent
        .replace(/BoldBite/g, companyName)
        .replace(/boldbite/g, dir.toLowerCase())
        .replace(/info@boldbite\.com/g, companyEmail);
      
      // Write updated content
      fs.writeFileSync(headerPath, newContent, 'utf8');
      console.log(`✓ Updated: ${dir}/components/Header.tsx`);
      updatedCount++;
    } catch (error) {
      console.error(`✗ Error updating ${dir}/components/Header.tsx:`, error.message);
      errorCount++;
    }
  } else {
    console.log(`⚠ File not found: ${dir}/components/Header.tsx`);
  }
});

console.log(`\n✅ Updated ${updatedCount} files`);
if (errorCount > 0) {
  console.log(`❌ Errors: ${errorCount} files`);
}

