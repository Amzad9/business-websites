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

businessNames.forEach((siteName, index) => {
  const globalsPath = path.join(baseDir, siteName, 'app', 'globals.css');
  
  if (!fs.existsSync(globalsPath)) {
    console.log(`[${index + 1}/${businessNames.length}] Skipping ${siteName} - globals.css not found`);
    return;
  }

  console.log(`[${index + 1}/${businessNames.length}] Fixing ${siteName}...`);

  let content = fs.readFileSync(globalsPath, 'utf8');
  
  // Replace @apply border-border with proper CSS
  content = content.replace(/@apply border-border;/g, 'border-color: hsl(var(--border));');
  
  // Replace @apply bg-background text-foreground with proper CSS
  content = content.replace(/@apply bg-background text-foreground;/g, 'background-color: hsl(var(--background));\n    color: hsl(var(--foreground));');
  
  // Replace focus-visible @apply with proper CSS
  content = content.replace(/\* \{[^}]*@apply focus-visible:[^}]+\}/s, '*:focus-visible {\n  outline: none;\n  box-shadow: 0 0 0 2px hsl(var(--ring)), 0 0 0 4px hsl(var(--ring-offset, var(--background)));\n}');
  
  fs.writeFileSync(globalsPath, content, 'utf8');
});

console.log(`\n✅ Successfully fixed CSS in all ${businessNames.length} websites!`);

