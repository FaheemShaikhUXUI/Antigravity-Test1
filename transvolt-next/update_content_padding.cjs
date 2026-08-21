const fs = require('fs');
const path = require('path');

const targetCssPath = path.resolve('apps/web/app/globals.css');
let cssContent = fs.readFileSync(targetCssPath, 'utf8');

const oldMainContentRule = /\.main-content\s*\{[^}]*padding-right:\s*40px\s*!important;\s*\}/;

const newMainContentRule = `.main-content {
  padding-left: 30px !important;
  padding-right: 30px !important;
}`;

if (oldMainContentRule.test(cssContent)) {
  cssContent = cssContent.replace(oldMainContentRule, newMainContentRule);
  fs.writeFileSync(targetCssPath, cssContent);
  console.log('Successfully updated .main-content padding to 30px on left and right!');
} else {
  // Fallback if the regex doesn't match
  fs.appendFileSync(targetCssPath, '\\n' + newMainContentRule + '\\n');
  console.log('Appended the new 30px left/right padding rule to the end of the file.');
}
