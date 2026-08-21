const fs = require('fs');
const path = require('path');

const targetCssPath = path.resolve('apps/web/app/globals.css');

const cssAppends = `

/* ==========================================================================
   SIDEBAR MENU ICONS ALIGNMENT
   ========================================================================== */
.nav-tab {
  display: flex !important;
  align-items: center !important;
  gap: 0.65rem !important;
  justify-content: flex-start !important;
}

.nav-tab svg {
  opacity: 0.7;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.nav-tab:hover svg {
  opacity: 1;
  transform: scale(1.1);
}

.nav-tab.active svg {
  opacity: 1;
  transform: scale(1.1);
}
`;

fs.appendFileSync(targetCssPath, cssAppends);
console.log('Successfully aligned sidebar icons with Flexbox!');
