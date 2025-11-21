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

function fixThemeProvider(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    let updated = false;

    // Fix: Remove early return and always provide context
    if (content.includes('if (!mounted) {') && content.includes('return <>{children}</>')) {
      // Remove the early return that doesn't provide context
      content = content.replace(
        /(\s+)if \(!mounted\) \{\s+return <>\{children\}<\/>\s+\}\s+/,
        '\n'
      );
      updated = true;
    }

    // Fix: Make useTheme return default context instead of throwing
    if (content.includes("throw new Error('useTheme must be used within a ThemeProvider')")) {
      // Add default context before useTheme
      if (!content.includes('defaultThemeContext')) {
        content = content.replace(
          /(const ThemeContext = createContext<ThemeContextType \| undefined>\(undefined\)\n)/,
          `$1\n// Default value to prevent errors during SSR\nconst defaultThemeContext: ThemeContextType = {\n  theme: 'light',\n  toggleTheme: () => {},\n}\n`
        );
      }

      // Replace the throw with return default
      content = content.replace(
        /export function useTheme\(\) \{\s+const context = useContext\(ThemeContext\)\s+if \(context === undefined\) \{\s+throw new Error\('useTheme must be used within a ThemeProvider'\)\s+\}\s+return context\s+\}/,
        `export function useTheme() {
  const context = useContext(ThemeContext)
  // Return default context if not provided (shouldn't happen, but safety check)
  if (context === undefined) {
    console.warn('useTheme used outside ThemeProvider, using default')
    return defaultThemeContext
  }
  return context
}`
      );
      updated = true;
    }

    // Ensure context is always provided
    if (content.includes('return (') && content.includes('ThemeContext.Provider')) {
      // Make sure the comment is there
      if (!content.includes('Always provide context')) {
        content = content.replace(
          /(return \(\s*<ThemeContext\.Provider)/,
          '  // Always provide context, even before mounting to prevent errors\n$1'
        );
        updated = true;
      }
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
let skippedCount = 0;

console.log('🔧 Fixing ThemeProvider across all sites...\n');

businessNames.forEach((siteName, index) => {
  const themeProviderPath = path.join(baseDir, siteName, 'components', 'ThemeProvider.tsx');
  
  if (fs.existsSync(themeProviderPath)) {
    const fixed = fixThemeProvider(themeProviderPath);
    if (fixed) {
      fixedCount++;
      console.log(`[${index + 1}/${businessNames.length}] ✅ Fixed ${siteName}`);
    } else {
      skippedCount++;
      console.log(`[${index + 1}/${businessNames.length}] ⏭️  Skipped ${siteName} (already fixed or no changes needed)`);
    }
  } else {
    console.log(`[${index + 1}/${businessNames.length}] ⚠️  Warning: ${siteName}/components/ThemeProvider.tsx not found`);
  }
});

console.log(`\n✅ Successfully fixed ${fixedCount} ThemeProvider files!`);
console.log(`📊 Skipped ${skippedCount} files (already fixed or no changes needed)`);

