const fs = require('fs');
const path = require('path');

const cssPath = path.resolve('apps/web/app/globals.css');
const updateCss = `
/* ==========================================================================
   LOGIN BG: 100% BLACK BASE & 15% IMAGE OPACITY
   ========================================================================== */

.split-login-wrapper {
  background: #000000 !important; /* 100% black */
}

[data-theme="dark"] .split-login-wrapper {
  background: #000000 !important; /* 100% black */
}

.split-login-wrapper::before {
  opacity: 0.15 !important; /* Reduced from 30% by 50% -> 15% opacity */
}
`;

fs.appendFileSync(cssPath, updateCss);
console.log('Successfully updated background to 100% black with 15% image opacity!');
