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

const baseDir = __dirname;

const pagesToFix = [
  'app/page.tsx',
  'app/about/page.tsx',
  'app/services/page.tsx',
  'app/workflow/page.tsx',
  'app/how-to-work/page.tsx',
  'app/blog/page.tsx',
];

businessNames.forEach((siteName, index) => {
  console.log(`[${index + 1}/${businessNames.length}] Fixing ${siteName}...`);

  pagesToFix.forEach((pagePath) => {
    const fullPath = path.join(baseDir, siteName, pagePath);
    
    if (!fs.existsSync(fullPath)) {
      return;
    }

    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Remove framer-motion import if it exists and metadata is exported (server component)
    if (content.includes('export const metadata') && content.includes("from 'framer-motion'")) {
      // Remove the import line
      content = content.replace(/import \{ motion \} from 'framer-motion'\n?/g, '');
      content = content.replace(/import \{ motion \} from "framer-motion"\n?/g, '');
      
      // Replace motion.h1, motion.h2, etc. with regular elements
      content = content.replace(/motion\.(h[1-6])/g, '$1');
      
      // Replace motion.div with div and remove motion props
      content = content.replace(/<motion\.div\s+([^>]*?)>/g, (match, attrs) => {
        // Remove motion-specific props
        attrs = attrs.replace(/\s*whileHover=\{[^}]+\}/g, '');
        attrs = attrs.replace(/\s*initial=\{[^}]+\}/g, '');
        attrs = attrs.replace(/\s*animate=\{[^}]+\}/g, '');
        attrs = attrs.replace(/\s*transition=\{[^}]+\}/g, '');
        attrs = attrs.replace(/\s*viewport=\{[^}]+\}/g, '');
        attrs = attrs.replace(/\s*whileInView=\{[^}]+\}/g, '');
        
        // Add hover effect classes if whileHover was present
        if (match.includes('whileHover')) {
          if (!attrs.includes('hover:')) {
            attrs = attrs.trim() + ' className="' + (attrs.match(/className="([^"]*)"/)?.[1] || '') + ' hover:shadow-xl transition-shadow"';
          }
        }
        
        return `<div ${attrs}>`;
      });
      
      // Replace motion.article with article
      content = content.replace(/<motion\.article\s+([^>]*?)>/g, (match, attrs) => {
        attrs = attrs.replace(/\s*whileHover=\{[^}]+\}/g, '');
        return `<article ${attrs}>`;
      });
      
      // Replace </motion.div> with </div>
      content = content.replace(/<\/motion\.div>/g, '</div>');
      content = content.replace(/<\/motion\.article>/g, '</article>');
      
      fs.writeFileSync(fullPath, content, 'utf8');
    }
  });
});

console.log(`\n✅ Successfully fixed motion components in all ${businessNames.length} websites!`);

