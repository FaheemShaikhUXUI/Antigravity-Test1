const fs = require('fs');
const path = require('path');

const targetCssPath = path.resolve('apps/web/app/globals.css');
let cssContent = fs.readFileSync(targetCssPath, 'utf8');

const oldHeaderRuleRegex = /\.top-header\s*\{\s*border-radius:\s*24px\s*24px\s*0\s*0\s*!important;\s*position:\s*sticky\s*!important;\s*top:\s*0\s*!important;\s*z-index:\s*100\s*!important;\s*\}/;

const newHeaderRule = `.top-header {
  border-radius: 0 !important;
  position: sticky !important;
  top: 0 !important;
  z-index: 100 !important;
}`;

if (oldHeaderRuleRegex.test(cssContent)) {
  cssContent = cssContent.replace(oldHeaderRuleRegex, newHeaderRule);
  fs.writeFileSync(targetCssPath, cssContent);
  console.log('Successfully removed the curve from the header!');
} else {
  // Fallback
  const fallbackRegex = /\.top-header\s*\{\s*border-radius:\s*24px\s*24px\s*0\s*0\s*!important;\s*\}/;
  if (fallbackRegex.test(cssContent)) {
     cssContent = cssContent.replace(fallbackRegex, newHeaderRule);
     fs.writeFileSync(targetCssPath, cssContent);
     console.log('Successfully removed the curve from the header (fallback regex)!');
  } else {
     fs.appendFileSync(targetCssPath, '\\n' + newHeaderRule + '\\n');
     console.log('Appended the flat header rule.');
  }
}
