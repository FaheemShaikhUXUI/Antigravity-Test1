const fs = require('fs');
const path = require('path');

const targetCssPath = path.resolve('apps/web/app/globals.css');
let cssContent = fs.readFileSync(targetCssPath, 'utf8');

const oldMainContentRule = /\.main-content\s*\{\s*padding-left:\s*30px\s*!important;\s*padding-right:\s*30px\s*!important;\s*\}/;

const newMainContentRule = `.main-content {
  padding-left: 15% !important;
  padding-right: 15% !important;
}`;

if (oldMainContentRule.test(cssContent)) {
  cssContent = cssContent.replace(oldMainContentRule, newMainContentRule);
  fs.writeFileSync(targetCssPath, cssContent);
  console.log('Successfully updated .main-content padding to 15% on each side (30% total)!');
} else {
  // Fallback
  fs.appendFileSync(targetCssPath, '\\n' + newMainContentRule + '\\n');
  console.log('Appended the 15% padding rule.');
}
