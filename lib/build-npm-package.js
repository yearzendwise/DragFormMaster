#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Building Form Builder NPM Package...\n');

// Helper function to ensure directory exists
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Helper function to copy files recursively
function copyRecursive(src, dest) {
  const stats = fs.statSync(src);
  
  if (stats.isDirectory()) {
    ensureDir(dest);
    const files = fs.readdirSync(src);
    files.forEach(file => {
      copyRecursive(path.join(src, file), path.join(dest, file));
    });
  } else if (stats.isFile() && !src.includes('node_modules')) {
    ensureDir(path.dirname(dest));
    fs.copyFileSync(src, dest);
  }
}

// Step 1: Clean up
console.log('📦 Cleaning up previous builds...');
const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist');

if (fs.existsSync(srcDir)) {
  fs.rmSync(srcDir, { recursive: true });
}
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true });
}

// Step 2: Create src directory structure
console.log('📁 Creating package structure...');
ensureDir(srcDir);

// Step 3: Copy all necessary files from client/src
const clientSrcPath = path.join(__dirname, '..', 'client', 'src');
const filesToCopy = [
  { from: 'components/form-builder', to: 'components/form-builder' },
  { from: 'components/ui', to: 'components/ui' },
  { from: 'hooks', to: 'hooks' },
  { from: 'types', to: 'types' },
  { from: 'utils', to: 'utils' },
  { from: 'lib', to: 'lib' }
];

filesToCopy.forEach(({ from, to }) => {
  const srcPath = path.join(clientSrcPath, from);
  const destPath = path.join(srcDir, to);
  
  if (fs.existsSync(srcPath)) {
    console.log(`  ✓ Copying ${from}...`);
    copyRecursive(srcPath, destPath);
  } else {
    console.log(`  ⚠️  Skipping ${from} (not found)`);
  }
});

// Step 4: Copy local lib files
console.log('  ✓ Copying local data and utils...');
copyRecursive(path.join(__dirname, 'data'), path.join(srcDir, 'data'));
copyRecursive(path.join(__dirname, 'utils'), path.join(srcDir, 'utils'));
copyRecursive(path.join(__dirname, 'components'), path.join(srcDir, 'components'));

// Step 5: Copy styles
console.log('  ✓ Copying styles...');
fs.copyFileSync(
  path.join(__dirname, 'styles.css'),
  path.join(srcDir, 'styles.css')
);

// Also copy the main index.css from client
const clientIndexCss = path.join(clientSrcPath, 'index.css');
if (fs.existsSync(clientIndexCss)) {
  fs.copyFileSync(clientIndexCss, path.join(srcDir, 'index.css'));
}

// Step 6: Clean up "use client" directives from copied files
console.log('\n🧹 Cleaning up "use client" directives...');
function removeUseClient(filePath) {
  if (fs.existsSync(filePath) && filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    content = content.replace(/^["']use client["'];?\s*\n?/m, '');
    fs.writeFileSync(filePath, content);
  }
}

function cleanDirectory(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      cleanDirectory(filePath);
    } else if (stats.isFile()) {
      removeUseClient(filePath);
    }
  });
}

cleanDirectory(srcDir);

// Step 7: Create new index.ts with corrected imports
console.log('\n📝 Creating package index file...');
const indexContent = `// Main form builder components
export { default as FormBuilder } from './components/FormBuilder';
export { FormWizard } from './components/form-builder/form-wizard';

// Individual wizard steps
export { BuildStep } from './components/form-builder/wizard-steps/build-step';
export { StyleStep } from './components/form-builder/wizard-steps/style-step';
export { PreviewStep } from './components/form-builder/wizard-steps/preview-step';

// Form renderers
export { ThemedFormRenderer } from './components/form-builder/themed-form-renderer';
export { CustomThemedForm } from './components/form-builder/custom-themed-form';

// Hooks
export { useFormWizard } from './hooks/use-form-wizard';
export { useFormBuilder } from './hooks/use-form-builder';

// Types
export type {
  FormElement,
  FormTheme,
  FormSettings,
  CustomColors,
  WizardStep,
  FormElementType,
  ComponentPaletteItem,
  DragItem,
  FormBuilderState,
  ValidationRules,
  ElementStyling
} from './types/form-builder';

// Utilities
export { getThemeStyles } from './utils/theme-styles';
export { getThemeGradientPresets } from './utils/theme-gradient-presets';
export { extractThemeColors } from './utils/theme-color-utils';

// Theme definitions
export { themes } from './data/themes';

// Component palette
export { ComponentPalette } from './components/form-builder/component-palette';
export { PropertiesPanel } from './components/form-builder/properties-panel';

// Import styles
import './styles.css';
import './index.css';
`;

fs.writeFileSync(path.join(srcDir, 'index.ts'), indexContent);

// Step 8: Create tsconfig for the build  
console.log('📄 Creating TypeScript config...');
const tsconfigContent = {
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "node",
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
    "downlevelIteration": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.tsx", "**/*.test.ts"]
};

fs.writeFileSync(
  path.join(__dirname, 'tsconfig.build.json'),
  JSON.stringify(tsconfigContent, null, 2)
);

// Step 9: Create Tailwind config for the build
console.log('🎨 Creating Tailwind CSS config...');
const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
}`;

fs.writeFileSync(path.join(__dirname, 'tailwind.config.js'), tailwindConfig);

// Create PostCSS config
const postcssConfig = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;

fs.writeFileSync(path.join(__dirname, 'postcss.config.js'), postcssConfig);

// Step 10: Update rollup config to use src directory
console.log('📋 Updating rollup config...');
const rollupConfig = `import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';
import { readFileSync } from 'fs';

const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'));

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        browser: true,
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.build.json',
      }),
      postcss({
        config: {
          path: './postcss.config.js',
        },
        extensions: ['.css'],
        minimize: true,
        inject: {
          insertAt: 'top',
        },
      }),
    ],
    external: ['react', 'react-dom'],
  },
  {
    input: 'dist/index.d.ts',
    output: [{ file: 'dist/types.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];`;

fs.writeFileSync(path.join(__dirname, 'rollup.config.js'), rollupConfig);

// Step 10: Build with rollup
console.log('\n🔨 Building with Rollup...');
try {
  execSync('npm run build', { 
    cwd: __dirname,
    stdio: 'inherit'
  });
  console.log('\n✅ Build completed successfully!');
} catch (error) {
  console.error('\n❌ Build failed:', error.message);
  process.exit(1);
}

// Step 11: Clean up intermediate files
console.log('\n🧹 Cleaning up temporary files...');
if (fs.existsSync(path.join(distDir, 'src'))) {
  fs.rmSync(path.join(distDir, 'src'), { recursive: true });
}

// Create a simple test file to verify the build
const testContent = `// Test file to verify the package can be imported
const pkg = require('./dist/index.js');
console.log('Package exports:', Object.keys(pkg));
`;

fs.writeFileSync(path.join(__dirname, 'test-package.js'), testContent);

console.log('\n📦 Package built successfully!');
console.log('📁 Output directory: ./dist/');
console.log('\nTo test the package locally:');
console.log('  node test-package.js');
console.log('\nTo publish to npm:');
console.log('  npm publish');