// Test file to verify the package can be imported
const pkg = require('./dist/index.js');
console.log('Package exports:', Object.keys(pkg));
