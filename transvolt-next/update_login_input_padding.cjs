const fs = require('fs');
const path = require('path');

const cssPath = path.resolve('apps/web/app/globals.css');
const updateCss = `
/* ==========================================================================
   INPUT LEFT/RIGHT PADDING SPACING
   ========================================================================== */

.split-input-group input {
  padding: 0.5rem 0.75rem !important; /* Add left and right spacing inside the input bar */
}

.split-input-group label {
  padding-left: 0.75rem !important; /* Align label with the padded text */
}
`;

fs.appendFileSync(cssPath, updateCss);
console.log('Successfully added left/right spacing to the login inputs!');
