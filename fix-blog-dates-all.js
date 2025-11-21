const fs = require('fs');
const path = require('path');

// Get all business site directories
const businessNames = [
  'ApexGrid', 'BoldBite', 'BrightFox', 'ByteBloom', 'ChainCraft',
  'CloudMint', 'CodeCrate', 'CraftNova', 'DataDrift', 'DigiDawn',
  'DriveLoop', 'EchoPeak', 'EdgeSpark', 'ElevateX', 'EmberLink',
  'FinForge', 'FlowGrid', 'FluxBridge', 'FunnelFox', 'FuseStack',
  'GainSmith', 'GlidePath', 'GlowCart', 'GridBee', 'GrowthMint',
  'HatchLoop', 'HiveLift', 'HorizonDrift', 'HoverCart', 'HypeMint',
  'IngotHub', 'InnovateX', 'InsightFox', 'JetScale', 'JumpPulse',
  'KiteStack', 'LaunchLoop', 'LiftLedger', 'LiftWave', 'LinkBloom',
  'LoopCraft', 'LumenCart', 'LuminateX', 'MagneMint', 'MarketBee',
  'MetricFox', 'MetroMint', 'MomentumX', 'MoonStack', 'MotionGrid',
  'NexusBloom', 'NovaForge', 'OrbitCart', 'PeakPulse', 'PivotFox',
  'PivotGrid', 'PixelBridge', 'PulseLedger', 'QuestMint', 'QuickBloom',
  'RadiusX', 'RallyHub', 'RankSpark', 'RapidMint', 'RiseLoop',
  'ScaleSmith', 'ShiftBee', 'SignalFox', 'SkyForge', 'SlateCart',
  'SlideLift', 'SnapBridge', 'SparkNest', 'SprintFox', 'StackGlow',
  'StackNova', 'StartMint', 'StreamHub', 'SwiftScale', 'SyncBloom',
  'TractionX', 'TrendMint', 'TurboFox', 'VaultGrid', 'VentureBee',
  'VertexLoop', 'VibeStack', 'VitalMint', 'VividForge', 'VoltCart',
  'WaveLift', 'WebBloom', 'WingHub', 'WireFox', 'ZenithCart',
  'ZigZagX', 'ZipGrid', 'ZoomMint', 'ZestForge', 'ZenLoop'
];

function fixBlogListingPage(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    let updated = false;

    // Fix 1: Ensure date is converted to string when parsing
    // Pattern: const { data } = matter(fileContents) ... frontmatter: data as BlogPost['frontmatter']
    if (content.includes('matter(fileContents)') && content.includes('frontmatter: data') && !content.includes('dateValue')) {
      // Find the mapping function and add date conversion
      const pattern1 = /(const \{ data \} = matter\(fileContents\))\s*\n\s*(return \{)/;
      if (pattern1.test(content)) {
        content = content.replace(
          /(const \{ data \} = matter\(fileContents\))\s*\n\s*(return \{)/,
          `$1
      // Ensure date is always a string for rendering
      const dateValue = data.date instanceof Date 
        ? data.date.toISOString().split('T')[0] 
        : String(data.date || '')
      $2`
        );
        updated = true;
      }

      // Update frontmatter to use dateValue
      if (content.includes('dateValue') && content.includes('frontmatter: data')) {
        content = content.replace(
          /frontmatter: data as BlogPost\['frontmatter'\],/,
          `frontmatter: {
          ...data,
          date: dateValue,
        } as BlogPost['frontmatter'],`
        );
        updated = true;
      }
    }

    // Fix 2: Safe date rendering in JSX
    // Pattern: {post.frontmatter.date} or {post.frontmatter.date as string}
    if (content.includes('post.frontmatter.date') && !content.includes('instanceof Date')) {
      // Replace direct date rendering
      content = content.replace(
        /\{post\.frontmatter\.date(?:\s+as\s+string)?\}/g,
        `{post.frontmatter.date instanceof Date 
                            ? post.frontmatter.date.toLocaleDateString() 
                            : String(post.frontmatter.date || '')}`
      );
      updated = true;
    }

    if (updated && content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

function fixBlogDetailPage(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    let updated = false;

    // Fix 1: Ensure date is converted to string when parsing
    // Pattern: const { data, content } = matter(fileContents) ... frontmatter: data
    if (content.includes('matter(fileContents)') && content.includes('frontmatter: data') && !content.includes('dateValue')) {
      // Find where we process the data and add date conversion
      const pattern1 = /(const \{ data, content \} = matter\(fileContents\))\s*\n\s*(const processedContent = remark\(\))/;
      if (pattern1.test(content)) {
        content = content.replace(
          /(const \{ data, content \} = matter\(fileContents\))\s*\n\s*(const processedContent = remark\(\))/,
          `$1
  $2`
        );
        
        // Add date conversion before return
        content = content.replace(
          /(const contentHtml = processedContent\.toString\(\))\s*\n\s*(return \{)/,
          `$1

  // Ensure date is always a string for rendering
  const dateValue = data.date instanceof Date 
    ? data.date.toISOString().split('T')[0] 
    : String(data.date || '')

  $2`
        );
        updated = true;
      }

      // Update frontmatter to use dateValue
      if (content.includes('dateValue') && content.includes('frontmatter: data,')) {
        content = content.replace(
          /frontmatter: data,/,
          `frontmatter: {
      ...data,
      date: dateValue,
    },`
        );
        updated = true;
      }
    }

    // Fix 2: Safe date rendering in JSX
    if (content.includes('post.frontmatter.date') && !content.includes('instanceof Date')) {
      // Replace direct date rendering
      content = content.replace(
        /\{post\.frontmatter\.date(?:\s+as\s+string)?\}/g,
        `{post.frontmatter.date instanceof Date 
                ? post.frontmatter.date.toLocaleDateString() 
                : String(post.frontmatter.date || '')}`
      );
      updated = true;
    }

    if (updated && content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

const baseDir = __dirname;
let fixedListingCount = 0;
let fixedDetailCount = 0;
let skippedCount = 0;

console.log('🔧 Fixing blog date handling across all sites...\n');

businessNames.forEach((siteName, index) => {
  const blogPagePath = path.join(baseDir, siteName, 'app', 'blog', 'page.tsx');
  const blogSlugPagePath = path.join(baseDir, siteName, 'app', 'blog', '[slug]', 'page.tsx');
  
  let siteUpdated = false;
  
  if (fs.existsSync(blogPagePath)) {
    if (fixBlogListingPage(blogPagePath)) {
      fixedListingCount++;
      siteUpdated = true;
    }
  }
  
  if (fs.existsSync(blogSlugPagePath)) {
    if (fixBlogDetailPage(blogSlugPagePath)) {
      fixedDetailCount++;
      siteUpdated = true;
    }
  }
  
  if (siteUpdated) {
    console.log(`[${index + 1}/${businessNames.length}] ✅ Fixed ${siteName}`);
  } else {
    skippedCount++;
    console.log(`[${index + 1}/${businessNames.length}] ⏭️  Skipped ${siteName} (already fixed or no changes needed)`);
  }
});

console.log(`\n✅ Fixed ${fixedListingCount} blog listing pages and ${fixedDetailCount} blog detail pages!`);
console.log(`📊 Skipped ${skippedCount} files (already fixed or no changes needed)`);

