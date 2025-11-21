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

function replaceInFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, 'utf8');
  replacements.forEach(({ from, to }) => {
    content = content.replace(new RegExp(from, 'g'), to);
  });
  fs.writeFileSync(filePath, content, 'utf8');
}

function copyDirectory(src, dest, siteName) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath, siteName);
    } else {
      fs.copyFileSync(srcPath, destPath);
      // Replace site name in file content
      if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts') || entry.name.endsWith('.js') || entry.name.endsWith('.json') || entry.name.endsWith('.md')) {
        replaceInFile(destPath, [
          { from: /ApexGrid/g, to: siteName },
          { from: /apexgrid/g, to: siteName.toLowerCase() },
          { from: /apexgrid\.com/g, to: `${siteName.toLowerCase()}.com` },
        ]);
      }
    }
  }
}

const templateDir = path.join(__dirname, 'ApexGrid');
const baseDir = __dirname;

// Skip ApexGrid as it's already created
const sitesToGenerate = businessNames.slice(1);

console.log(`Generating ${sitesToGenerate.length} websites...`);

sitesToGenerate.forEach((siteName, index) => {
  const destDir = path.join(baseDir, siteName);
  console.log(`[${index + 1}/${sitesToGenerate.length}] Creating ${siteName}...`);
  copyDirectory(templateDir, destDir, siteName);
});

console.log(`\n✅ Successfully generated ${sitesToGenerate.length} websites!`);
console.log(`Total websites: ${businessNames.length}`);

