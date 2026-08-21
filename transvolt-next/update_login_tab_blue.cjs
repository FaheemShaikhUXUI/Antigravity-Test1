const fs = require('fs');
const path = require('path');

const cssPath = path.resolve('apps/web/app/globals.css');
const updateCss = `
/* ==========================================================================
   BLUE EFFECT LOGIN TAB
   ========================================================================== */

.split-login-right {
  /* Replace the dark slate background with a rich, deep translucent blue */
  background: rgba(30, 58, 138, 0.55) !important; /* Blue-900 tint */
  border-left: 1px solid rgba(59, 130, 246, 0.3) !important; /* Subtle blue edge highlight */
  box-shadow: inset 0 0 100px rgba(29, 78, 216, 0.2) !important; /* Inner blue glow */
}
`;

fs.appendFileSync(cssPath, updateCss);
console.log('Successfully added blue effect to the login tab!');
