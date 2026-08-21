const fs = require('fs');
const path = require('path');

const targetCssPath = path.resolve('apps/web/app/globals.css');
let cssContent = fs.readFileSync(targetCssPath, 'utf8');

// Replace the 28px width with 108px
const oldWidth = `::-webkit-scrollbar:hover {
  width: 28px; /* 8px + 20px */
}`;

const newWidth = `::-webkit-scrollbar:hover {
  width: 108px; /* 8px + 100px */
}`;

if (cssContent.includes(oldWidth)) {
  cssContent = cssContent.replace(oldWidth, newWidth);
  fs.writeFileSync(targetCssPath, cssContent);
  console.log('Successfully updated hover width to 108px!');
} else {
  console.log('Error: Could not find the specific CSS block for 28px.');
}
