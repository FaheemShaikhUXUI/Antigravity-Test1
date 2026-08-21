const fs = require('fs');
const path = require('path');

const targetCssPath = path.resolve('apps/web/app/globals.css');
let cssContent = fs.readFileSync(targetCssPath, 'utf8');

// We need to replace the .main-wrapper block that I added previously.
// The block looks like this:
// .main-wrapper {
//   background: transparent !important;
//   border-radius: 24px !important;
//   background-color: var(--bg-card) !important;
//   height: calc(100vh - 2.5rem) !important;
//   box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.03) !important;
//   border: 1px solid var(--border-color) !important;
//   overflow-y: auto !important; /* Ensure scrollbar is on the outer wrapper, flush to the right */
// }

const mainWrapperRegex = /\.main-wrapper\s*\{[\s\S]*?overflow-y:\s*auto\s*!important;\s*\/\* Ensure scrollbar is on the outer wrapper, flush to the right \*\/\s*\}/;

const newMainWrapperBlock = `.main-wrapper {
  background: transparent !important;
  border-radius: 0 !important;
  height: calc(100vh - 2.5rem) !important;
  box-shadow: none !important;
  border: none !important;
  overflow-y: auto !important; /* Ensure scrollbar is on the outer wrapper, flush to the right */
}`;

if (mainWrapperRegex.test(cssContent)) {
  cssContent = cssContent.replace(mainWrapperRegex, newMainWrapperBlock);
  fs.writeFileSync(targetCssPath, cssContent);
  console.log('Successfully made .main-wrapper transparent and borderless!');
} else {
  // Try a more generic replace if the exact text doesn't match
  const genericRegex = /\.main-wrapper\s*\{[\s\S]*?border:\s*1px\s*solid\s*var\(--border-color\)\s*!important;[\s\S]*?\}/;
  if (genericRegex.test(cssContent)) {
     cssContent = cssContent.replace(genericRegex, newMainWrapperBlock);
     fs.writeFileSync(targetCssPath, cssContent);
     console.log('Successfully made .main-wrapper transparent and borderless (fallback regex)!');
  } else {
     console.log('Could not find the .main-wrapper block to replace.');
  }
}
