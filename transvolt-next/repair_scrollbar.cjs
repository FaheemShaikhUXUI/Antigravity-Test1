const fs = require('fs');
const path = require('path');

const cssPath = path.resolve('apps/web/app/globals.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

// Use regex to carefully strip out broken global scrollbar rules added today.
// We are careful NOT to strip out `.user-dir-list::-webkit-scrollbar` 
// so we only match `::-webkit-scrollbar` at the start of a line.

cssContent = cssContent.replace(/^::-webkit-scrollbar(?:-track|-thumb|[\s:a-z-]*)\s*\{[\s\S]*?\}/gm, '');
cssContent = cssContent.replace(/^\[data-theme="dark"\]\s+::[^{]*\{[\s\S]*?\}/gm, '');

// Also strip out the padding we added so we can re-add it cleanly
cssContent = cssContent.replace(/\/\* Gap between tiles and scrollbar \*\/[\s\S]*?\.main-content\s*\{[^}]+\}/g, '');
cssContent = cssContent.replace(/\/\* Sidebar gap \*\/[\s\S]*?\.sidebar-menu\s*\{[^}]+\}/g, '');

const freshCSS = `
/* ==========================================================================
   SCROLLBAR & GAP FIX
   ========================================================================== */

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

/* 30px gap between content and scrollbar */
.main-wrapper {
  overflow-y: hidden !important; /* Move scrolling to inner container to allow padding gaps to work */
}

.main-content {
  overflow-y: auto !important; 
  height: 100%;
  padding-right: 30px !important; /* Ensure minimum 30px gap for content tiles */
}

.sidebar-menu {
  padding-right: 30px !important; /* Ensure minimum 30px gap for sidebar tiles */
}
`;

fs.writeFileSync(cssPath, cssContent + freshCSS);
console.log('Successfully repaired globals.css!');
