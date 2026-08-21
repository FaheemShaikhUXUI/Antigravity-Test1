const fs = require('fs');
const path = require('path');

const cssPath = path.resolve('apps/web/app/globals.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

// The original strings to replace (from our previous update)
const oldScrollbar = `::-webkit-scrollbar {
  width: 16px;
  height: 16px;
}`;

const newScrollbar = `::-webkit-scrollbar {
  width: 42px;
  height: 42px;
}`;

const oldThumb1 = `  border: 5px solid transparent; /* Creates a large gap */
  background-clip: padding-box;`;

const newThumb1 = `  border-left: 30px solid transparent !important; /* 30px gap between content and scrollbar */
  border-right: 4px solid transparent !important;
  border-top: 4px solid transparent !important;
  border-bottom: 4px solid transparent !important;
  background-clip: padding-box !important;`;

if (cssContent.includes(oldScrollbar)) {
  cssContent = cssContent.replace(oldScrollbar, newScrollbar);
  cssContent = cssContent.split(oldThumb1).join(newThumb1);
  
  // also update track to match
  cssContent = cssContent.replace('::-webkit-scrollbar-track {', '::-webkit-scrollbar-track {\n  border-left: 30px solid transparent;\n  border-right: 4px solid transparent;\n  background-clip: padding-box;');
  
  fs.writeFileSync(cssPath, cssContent);
  console.log('Successfully added a 30px gap between the scrollbar and the content!');
} else {
  console.log('Error: Could not find the original scrollbar CSS. String matching failed.');
}
