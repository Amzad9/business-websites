const fs = require('fs');
const path = require('path');

// Find all Footer.tsx files
const directories = fs.readdirSync('.', { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && dirent.name !== 'node_modules')
  .map(dirent => dirent.name);

let updatedCount = 0;
let errorCount = 0;

directories.forEach(dir => {
  const footerPath = path.join(dir, 'components', 'Footer.tsx');
  
  if (fs.existsSync(footerPath)) {
    try {
      let content = fs.readFileSync(footerPath, 'utf8');
      
      // Pattern to match various copyright formats
      const patterns = [
        /&copy;\s*\{currentYear\}\s*[^.]*\.\s*All rights reserved\./g,
        /©\s*\{currentYear\}\s*[^.]*\.\s*All rights reserved\./g,
        /&copy;\s*\{currentYear\}\s*[A-Za-z\s]+\.\s*All rights reserved\./g,
      ];
      
      let updated = false;
      patterns.forEach(pattern => {
        if (pattern.test(content)) {
          content = content.replace(pattern, `&copy; {currentYear} Weblibron Digital. All rights reserved.`);
          updated = true;
        }
      });
      
      // Also try to match any company name before "All rights reserved"
      if (!updated) {
        content = content.replace(
          /(&copy;|©)\s*\{currentYear\}\s*([A-Za-z\s]+)\.\s*All rights reserved\./g,
          '&copy; {currentYear} Weblibron Digital. All rights reserved.'
        );
        updated = true;
      }
      
      if (updated) {
        fs.writeFileSync(footerPath, content, 'utf8');
        console.log(`✓ Updated: ${dir}/components/Footer.tsx`);
        updatedCount++;
      } else {
        console.log(`⚠ No copyright found: ${dir}/components/Footer.tsx`);
      }
    } catch (error) {
      console.error(`✗ Error updating ${dir}/components/Footer.tsx:`, error.message);
      errorCount++;
    }
  }
});

console.log(`\n✅ Updated ${updatedCount} files`);
if (errorCount > 0) {
  console.log(`❌ Errors: ${errorCount} files`);
}

