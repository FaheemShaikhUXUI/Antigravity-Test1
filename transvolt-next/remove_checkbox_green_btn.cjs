const fs = require('fs');
const path = require('path');

// 1. Remove the checkbox HTML
const pageTsxPath = path.resolve('apps/web/app/login/page.tsx');
let pageContent = fs.readFileSync(pageTsxPath, 'utf8');

const checkboxRegex = /<div className="split-login-actions">[\s\S]*?<\/label>[\s\S]*?<\/div>/;

if (checkboxRegex.test(pageContent)) {
  pageContent = pageContent.replace(checkboxRegex, '');
  fs.writeFileSync(pageTsxPath, pageContent);
  console.log('Successfully removed the Terms of Service checkbox block from page.tsx!');
} else {
  console.log('Could not find the checkbox block to remove in page.tsx.');
}

// 2. Add green CSS for the button
const cssPath = path.resolve('apps/web/app/globals.css');
const greenButtonCss = `
/* ==========================================================================
   GREEN LOGIN BUTTON OVERRIDE
   ========================================================================== */

.split-submit-btn {
  background: #22c55e !important; /* Tailwind green-500 */
  box-shadow: 0 4px 14px rgba(34, 197, 94, 0.3) !important;
}

.split-submit-btn:hover:not(:disabled) {
  background: #16a34a !important; /* Tailwind green-600 */
}

/* Also update the input focus line color to match the green theme instead of red */
.split-input-group input:focus {
  border-bottom-color: #22c55e !important;
}
`;

fs.appendFileSync(cssPath, greenButtonCss);
console.log('Successfully updated the button to green in globals.css!');
