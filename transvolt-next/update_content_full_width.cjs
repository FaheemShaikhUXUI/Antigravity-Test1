const fs = require('fs');
const path = require('path');

const targetCssPath = path.resolve('apps/web/app/globals.css');
let cssContent = fs.readFileSync(targetCssPath, 'utf8');

const oldMainContentRule = /\.main-content\s*\{\s*padding-left:\s*5%\s*!important;\s*padding-right:\s*5%\s*!important;\s*\}/;

const newMainContentRule = `.main-content {
  padding-left: 30px !important;
  padding-right: 30px !important;
  max-width: none !important; /* Remove the 1500px max-width limitation */
  margin: 0 !important; /* Remove the auto margin that creates empty space */
  width: 100% !important;
}`;

if (oldMainContentRule.test(cssContent)) {
  cssContent = cssContent.replace(oldMainContentRule, newMainContentRule);
  fs.writeFileSync(targetCssPath, cssContent);
  console.log('Successfully updated .main-content to stretch full width with 30px padding!');
} else {
  fs.appendFileSync(targetCssPath, '\\n' + newMainContentRule + '\\n');
  console.log('Appended the full-width 30px padding rule.');
}
