const fs = require('fs');
const path = require('path');

const targetCssPath = path.resolve('apps/web/app/globals.css');
let cssContent = fs.readFileSync(targetCssPath, 'utf8');

const oldHeaderRule = /\.top-header\s*\{\s*border-radius:\s*24px\s*24px\s*0\s*0\s*!important;\s*\}/;

const newHeaderRule = `.top-header {
  border-radius: 24px 24px 0 0 !important;
  position: sticky !important;
  top: 0 !important;
  z-index: 100 !important;
}`;

if (oldHeaderRule.test(cssContent)) {
  cssContent = cssContent.replace(oldHeaderRule, newHeaderRule);
  fs.writeFileSync(targetCssPath, cssContent);
  console.log('Successfully made .top-header sticky!');
} else {
  fs.appendFileSync(targetCssPath, '\\n' + newHeaderRule + '\\n');
  console.log('Appended sticky .top-header rule.');
}
