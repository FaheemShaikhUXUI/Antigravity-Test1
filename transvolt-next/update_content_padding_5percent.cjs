const fs = require('fs');
const path = require('path');

const targetCssPath = path.resolve('apps/web/app/globals.css');
let cssContent = fs.readFileSync(targetCssPath, 'utf8');

// The current override
const oldMainContentRule = /\.main-content\s*\{\s*padding-left:\s*15%\s*!important;\s*padding-right:\s*15%\s*!important;\s*\}/;

const newMainContentRule = `.main-content {
  padding-left: 5% !important;
  padding-right: 5% !important;
}`;

if (oldMainContentRule.test(cssContent)) {
  cssContent = cssContent.replace(oldMainContentRule, newMainContentRule);
  fs.writeFileSync(targetCssPath, cssContent);
  console.log('Successfully updated .main-content padding to 5% on each side!');
} else {
  // Fallback
  fs.appendFileSync(targetCssPath, '\\n' + newMainContentRule + '\\n');
  console.log('Appended the 5% padding rule.');
}
