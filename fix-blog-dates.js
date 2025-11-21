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

function fixBlogPage(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;
    const originalContent = content;

    // Fix the getBlogPosts function to ensure dates are strings
    if (content.includes('matter(fileContents)') && content.includes('frontmatter: data')) {
      // Pattern: const { data } = matter(fileContents) ... frontmatter: data
      content = content.replace(
        /(const \{ data \} = matter\(fileContents\)\s*\n\s*const processedContent = remark\(\)\.use\(html\)\.processSync\(content\)\s*\n\s*const contentHtml = processedContent\.toString\(\)\s*\n\s*return \{[\s\S]*?frontmatter:) data,(\s*content: contentHtml,\s*\})/,
        `$1 {
      ...data,
      date: data.date instanceof Date ? data.date.toISOString().split('T')[0] : String(data.date || ''),
    },$2`
      );

      // Alternative pattern for blog listing page
      content = content.replace(
        /(const \{ data \} = matter\(fileContents\)\s*\n\s*return \{[\s\S]*?frontmatter:) data as BlogPost\['frontmatter'\],(\s*\})/,
        `$1 {
          ...data,
          date: data.date instanceof Date ? data.date.toISOString().split('T')[0] : String(data.date || ''),
        } as BlogPost['frontmatter'],$2`
      );
    }

    // Fix date rendering - replace direct date rendering with safe string conversion
    // Pattern 1: {post.frontmatter.date}
    if (content.includes('{post.frontmatter.date}') && !content.includes('instanceof Date')) {
      content = content.replace(
        /\{post\.frontmatter\.date\}/g,
        `{post.frontmatter.date instanceof Date ? post.frontmatter.date.toLocaleDateString() : String(post.frontmatter.date || '')}`
      );
      updated = true;
    }

    // Pattern 2: {post.frontmatter.date as string}
    if (content.includes('post.frontmatter.date as string') && !content.includes('instanceof Date')) {
      content = content.replace(
        /\{post\.frontmatter\.date as string\}/g,
        `{post.frontmatter.date instanceof Date ? post.frontmatter.date.toLocaleDateString() : String(post.frontmatter.date || '')}`
      );
      updated = true;
    }

    if (content !== originalContent) {
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
let fixedCount = 0;

console.log('🔧 Fixing blog date rendering across all sites...\n');

businessNames.forEach((siteName, index) => {
  const blogPagePath = path.join(baseDir, siteName, 'app', 'blog', 'page.tsx');
  const blogSlugPagePath = path.join(baseDir, siteName, 'app', 'blog', '[slug]', 'page.tsx');
  
  let siteFixed = false;
  
  if (fs.existsSync(blogPagePath)) {
    if (fixBlogPage(blogPagePath)) {
      siteFixed = true;
      fixedCount++;
    }
  }
  
  if (fs.existsSync(blogSlugPagePath)) {
    if (fixBlogPage(blogSlugPagePath)) {
      siteFixed = true;
      fixedCount++;
    }
  }
  
  if (siteFixed) {
    console.log(`[${index + 1}/${businessNames.length}] ✅ Fixed ${siteName}`);
  } else {
    console.log(`[${index + 1}/${businessNames.length}] ⏭️  Skipped ${siteName} (already fixed or no changes needed)`);
  }
});

console.log(`\n✅ Fixed date rendering in ${fixedCount} blog pages!`);

