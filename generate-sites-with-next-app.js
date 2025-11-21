const { execSync } = require('child_process');
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

console.log(`Generating ${businessNames.length} websites using create next-app@latest...\n`);

businessNames.forEach((siteName, index) => {
  const siteDir = path.join(baseDir, siteName);
  
  // Skip if directory already exists
  if (fs.existsSync(siteDir)) {
    console.log(`[${index + 1}/${businessNames.length}] Skipping ${siteName} - already exists`);
    return;
  }

  console.log(`[${index + 1}/${businessNames.length}] Creating ${siteName}...`);
  
  try {
    // Use create next-app with non-interactive flags
    execSync(
      `npx create-next-app@latest ${siteName} --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --yes`,
      {
        cwd: baseDir,
        stdio: 'inherit'
      }
    );
    
    console.log(`✅ ${siteName} created successfully\n`);
  } catch (error) {
    console.error(`❌ Error creating ${siteName}:`, error.message);
  }
});

console.log(`\n✅ Successfully generated ${businessNames.length} websites!`);
console.log(`\nNext steps:`);
console.log(`1. Navigate to each website folder`);
console.log(`2. Add custom pages and components`);
console.log(`3. Install additional dependencies (framer-motion, next-sitemap, etc.)`);
console.log(`4. Run npm install && npm run build`);

