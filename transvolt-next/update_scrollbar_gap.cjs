const fs = require('fs');
const path = require('path');

const cssPath = path.resolve('apps/web/app/globals.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

// The original strings to replace
const oldScrollbar = `::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}`;

const newScrollbar = `::-webkit-scrollbar {
  width: 16px;
  height: 16px;
}`;

const oldThumb1 = `  border: 2px solid transparent;
  background-clip: padding-box;`;

const newThumb1 = `  border: 5px solid transparent; /* Creates a large gap */
  background-clip: padding-box;`;

if (cssContent.includes(oldScrollbar)) {
  cssContent = cssContent.replace(oldScrollbar, newScrollbar);
  // We have multiple instances of oldThumb1 (light mode, hover, dark mode, dark mode hover)
  cssContent = cssContent.split(oldThumb1).join(newThumb1);
  
  fs.writeFileSync(cssPath, cssContent);
  console.log('Successfully added a gap to the scrollbar!');
} else {
  console.log('Error: Could not find the original scrollbar CSS. String matching failed.');
}
