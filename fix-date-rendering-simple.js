const fs = require('fs');
const path = require('path');

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

function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    let updated = false;

    // Fix Pattern 1: {post.frontmatter.date} (same line)
    const pattern1 = /<p([^>]*>\s*)\{post\.frontmatter\.date\}(\s*<\/p>)/;
    if (pattern1.test(content) && !content.includes('instanceof Date')) {
      content = content.replace(
        pattern1,
        `<p$1{post.frontmatter.date instanceof Date 
                            ? post.frontmatter.date.toLocaleDateString() 
                            : String(post.frontmatter.date || '')}$2`
      );
      updated = true;
    }

    // Fix Pattern 2: {post.frontmatter.date as string}
    const pattern2 = /\{post\.frontmatter\.date as string\}/;
    if (pattern2.test(content) && !content.includes('instanceof Date')) {
      content = content.replace(
        pattern2,
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
let fixedCount = 0;

console.log('🔧 Fixing date rendering in blog pages...\n');

businessNames.forEach((siteName) => {
  const blogPagePath = path.join(baseDir, siteName, 'app', 'blog', 'page.tsx');
  const blogSlugPagePath = path.join(baseDir, siteName, 'app', 'blog', '[slug]', 'page.tsx');
  
  if (fs.existsSync(blogPagePath) && fixFile(blogPagePath)) {
    fixedCount++;
  }
  
  if (fs.existsSync(blogSlugPagePath) && fixFile(blogSlugPagePath)) {
    fixedCount++;
  }
});

console.log(`\n✅ Fixed date rendering in ${fixedCount} blog pages!`);

