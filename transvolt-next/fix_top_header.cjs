const fs = require('fs');
const path = require('path');

const cssPath = path.resolve('apps/web/app/globals.css');
const headerFixCss = `
/* ==========================================================================
   TOP HEADER OVERLAP & BACKGROUND FIX
   ========================================================================== */

.top-header {
  background-color: var(--bg-page) !important; /* Solid background prevents content bleed */
  width: 100% !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  padding: 1.15rem 30px !important;
  border-bottom: 1px solid var(--border-color) !important;
  box-sizing: border-box !important;
  position: sticky !important;
  top: 0 !important;
  z-index: 100 !important;
  margin: 0 !important;
}

[data-theme="dark"] .top-header {
  background-color: var(--bg-page) !important;
}

.header-left-actions {
  display: flex !important;
  align-items: center !important;
  gap: 1rem !important;
  margin: 0 !important;
  flex: 1; /* Allow taking available space */
}

.nav-right-actions {
  display: flex !important;
  align-items: center !important;
  gap: 1rem !important;
  margin: 0 !important;
  flex-shrink: 0; /* Prevent squishing */
}
`;

fs.appendFileSync(cssPath, headerFixCss);
console.log('Successfully applied the Top Header fix!');
