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

function upgradePackageJson(packageJsonPath) {
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    let updated = false;

    // Update Next.js to version 16
    if (packageJson.dependencies && packageJson.dependencies.next) {
      if (packageJson.dependencies.next.startsWith('^14.') || packageJson.dependencies.next.startsWith('^15.')) {
        packageJson.dependencies.next = '^16.0.0';
        updated = true;
      }
    }

    // Update React to version 19 (required for Next.js 16)
    if (packageJson.dependencies && packageJson.dependencies.react) {
      if (packageJson.dependencies.react.startsWith('^18.')) {
        packageJson.dependencies.react = '^19.0.0';
        updated = true;
      }
    }

    // Update React DOM to version 19
    if (packageJson.dependencies && packageJson.dependencies['react-dom']) {
      if (packageJson.dependencies['react-dom'].startsWith('^18.')) {
        packageJson.dependencies['react-dom'] = '^19.0.0';
        updated = true;
      }
    }

    // Update @types/react to version 19
    if (packageJson.devDependencies && packageJson.devDependencies['@types/react']) {
      if (packageJson.devDependencies['@types/react'].startsWith('^18.')) {
        packageJson.devDependencies['@types/react'] = '^19.0.0';
        updated = true;
      }
    }

    // Update @types/react-dom to version 19
    if (packageJson.devDependencies && packageJson.devDependencies['@types/react-dom']) {
      if (packageJson.devDependencies['@types/react-dom'].startsWith('^18.')) {
        packageJson.devDependencies['@types/react-dom'] = '^19.0.0';
        updated = true;
      }
    }

    // Update eslint-config-next to version 16
    if (packageJson.devDependencies && packageJson.devDependencies['eslint-config-next']) {
      if (packageJson.devDependencies['eslint-config-next'].startsWith('^14.') || 
          packageJson.devDependencies['eslint-config-next'].startsWith('^15.')) {
        packageJson.devDependencies['eslint-config-next'] = '^16.0.0';
        updated = true;
      }
    }

    // Add critters if optimizeCss is enabled (check next.config.js)
    const configPath = path.join(path.dirname(packageJsonPath), 'next.config.js');
    if (fs.existsSync(configPath)) {
      const configContent = fs.readFileSync(configPath, 'utf8');
      if (configContent.includes('optimizeCss') && configContent.includes('true')) {
        if (!packageJson.dependencies.critters) {
          packageJson.dependencies.critters = '^0.0.23';
          updated = true;
        }
      }
    }

    if (updated) {
      // Write back with proper formatting
      fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(packageJson, null, 2) + '\n',
        'utf8'
      );
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error processing ${packageJsonPath}:`, error.message);
    return false;
  }
}

const baseDir = __dirname;
let updatedCount = 0;

console.log('🚀 Upgrading all sites to Next.js 16 and React 19...\n');

businessNames.forEach((siteName, index) => {
  const packageJsonPath = path.join(baseDir, siteName, 'package.json');
  
  if (fs.existsSync(packageJsonPath)) {
    const updated = upgradePackageJson(packageJsonPath);
    if (updated) {
      updatedCount++;
      console.log(`[${index + 1}/${businessNames.length}] ✅ Updated ${siteName}`);
    } else {
      console.log(`[${index + 1}/${businessNames.length}] ⏭️  Skipped ${siteName} (already up to date or no changes needed)`);
    }
  } else {
    console.log(`[${index + 1}/${businessNames.length}] ⚠️  Warning: ${siteName}/package.json not found`);
  }
});

console.log(`\n✅ Successfully updated ${updatedCount} package.json files!`);
console.log(`\n📝 Next steps:`);
console.log(`   1. Run 'npm install' in each site directory to update dependencies`);
console.log(`   2. Review and update code for Next.js 16 breaking changes if needed`);
console.log(`   3. Test your applications to ensure everything works correctly`);

