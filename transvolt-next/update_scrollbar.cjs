const fs = require('fs');
const path = require('path');

const cssPath = path.resolve('apps/web/app/globals.css');

const modernScrollbarCSS = `
/* ==========================================================================
   MODERN SCROLLBAR DESIGN (2025 TRENDS)
   ========================================================================== */

/* Firefox support */
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(148, 163, 184, 0.5) transparent;
}

/* Chrome, Edge, and Safari support */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.4);
  border-radius: 10px;
  border: 2px solid transparent;
  background-clip: padding-box;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(100, 116, 139, 0.7);
  border: 2px solid transparent;
  background-clip: padding-box;
}

/* Dark mode scrollbar */
[data-theme="dark"] * {
  scrollbar-color: rgba(71, 85, 105, 0.6) transparent;
}

[data-theme="dark"] ::-webkit-scrollbar-thumb {
  background: rgba(71, 85, 105, 0.6);
  border: 2px solid transparent;
  background-clip: padding-box;
}

[data-theme="dark"] ::-webkit-scrollbar-thumb:hover {
  background: rgba(148, 163, 184, 0.8);
  border: 2px solid transparent;
  background-clip: padding-box;
}
`;

fs.appendFileSync(cssPath, modernScrollbarCSS);
console.log('Successfully appended modern scrollbar CSS to globals.css!');
