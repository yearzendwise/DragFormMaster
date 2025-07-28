#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Function to calculate the relative path from a file to another directory
function getRelativePath(fromFile, toDir) {
  const fromDir = path.dirname(fromFile);
  let relativePath = path.relative(fromDir, toDir);
  
  // Ensure we use forward slashes and add ./ prefix if needed
  relativePath = relativePath.replace(/\\/g, '/');
  if (!relativePath.startsWith('.')) {
    relativePath = './' + relativePath;
  }
  
  return relativePath;
}

// Function to fix imports in a single file
function fixImportsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Get the directory of the current file relative to dist
  const relativeFilePath = path.relative(path.join(__dirname, 'dist'), filePath);
  const fileDepth = relativeFilePath.split('/').length - 1;
  
  // Define import replacements based on file location
  const replacements = [
    // @/components/ui imports
    {
      pattern: /@\/components\/ui\//g,
      replacement: (match) => {
        const pathToComponents = getRelativePath(filePath, path.join(__dirname, 'dist/components/ui'));
        return pathToComponents + '/';
      }
    },
    // @/components/form-builder imports
    {
      pattern: /@\/components\/form-builder\//g,
      replacement: (match) => {
        const pathToComponents = getRelativePath(filePath, path.join(__dirname, 'dist/components/form-builder'));
        return pathToComponents + '/';
      }
    },
    // @/hooks imports
    {
      pattern: /@\/hooks\//g,
      replacement: (match) => {
        const pathToHooks = getRelativePath(filePath, path.join(__dirname, 'dist/hooks'));
        return pathToHooks + '/';
      }
    },
    // @/types imports
    {
      pattern: /@\/types\//g,
      replacement: (match) => {
        const pathToTypes = getRelativePath(filePath, path.join(__dirname, 'dist/types'));
        return pathToTypes + '/';
      }
    },
    // @/lib imports
    {
      pattern: /@\/lib\//g,
      replacement: (match) => {
        const pathToLib = getRelativePath(filePath, path.join(__dirname, 'dist/lib'));
        return pathToLib + '/';
      }
    },
    // @/utils imports
    {
      pattern: /@\/utils\//g,
      replacement: (match) => {
        const pathToUtils = getRelativePath(filePath, path.join(__dirname, 'dist/utils'));
        return pathToUtils + '/';
      }
    },
    // @/data imports
    {
      pattern: /@\/data\//g,
      replacement: (match) => {
        const pathToData = getRelativePath(filePath, path.join(__dirname, 'dist/data'));
        return pathToData + '/';
      }
    }
  ];
  
  // Apply all replacements
  replacements.forEach(({ pattern, replacement }) => {
    const newContent = content.replace(pattern, replacement);
    if (newContent !== content) {
      content = newContent;
      modified = true;
    }
  });
  
  // Handle imports that use single or double quotes
  const importPatterns = [
    /from\s+["']@\/([^"']+)["']/g,
    /import\s+["']@\/([^"']+)["']/g,
  ];
  
  importPatterns.forEach(pattern => {
    content = content.replace(pattern, (match, importPath) => {
      modified = true;
      
      // Determine the target directory based on the import path
      const pathParts = importPath.split('/');
      const baseDir = pathParts[0];
      
      let targetDir;
      switch (baseDir) {
        case 'components':
          targetDir = path.join(__dirname, 'dist/components');
          break;
        case 'hooks':
          targetDir = path.join(__dirname, 'dist/hooks');
          break;
        case 'types':
          targetDir = path.join(__dirname, 'dist/types');
          break;
        case 'lib':
          targetDir = path.join(__dirname, 'dist/lib');
          break;
        case 'utils':
          targetDir = path.join(__dirname, 'dist/utils');
          break;
        case 'data':
          targetDir = path.join(__dirname, 'dist/data');
          break;
        default:
          console.warn(`Unknown import base: ${baseDir} in ${filePath}`);
          return match;
      }
      
      const relativePath = getRelativePath(filePath, targetDir);
      const restOfPath = pathParts.slice(1).join('/');
      const fullPath = restOfPath ? `${relativePath}/${restOfPath}` : relativePath;
      
      return match.replace(`@/${importPath}`, fullPath);
    });
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed imports in: ${path.relative(process.cwd(), filePath)}`);
  }
}

// Main function
function fixAllImports() {
  console.log('Fixing alias imports in compiled files...');
  
  // Find all .js files in the dist directory
  const files = glob.sync(path.join(__dirname, 'dist/**/*.js'));
  
  console.log(`Found ${files.length} JavaScript files to process`);
  
  files.forEach(file => {
    fixImportsInFile(file);
  });
  
  console.log('Import fixing complete!');
}

// Run the script
fixAllImports();