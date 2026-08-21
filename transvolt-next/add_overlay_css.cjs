const fs = require('fs');
const path = require('path');

const targetCssPath = path.resolve('apps/web/app/globals.css');
let cssContent = fs.readFileSync(targetCssPath, 'utf8');

// Strip out the massive border hack webkit scrollbars
cssContent = cssContent.replace(/^::-webkit-scrollbar(?:-track|-thumb|[\s:a-z-]*)\s*\{[\s\S]*?\}/gm, '');
cssContent = cssContent.replace(/^\[data-theme="dark"\]\s+::[^{]*\{[\s\S]*?\}/gm, '');
cssContent = cssContent.replace(/\.main-wrapper::-webkit-scrollbar-track\s*\{[\s\S]*?\}/gm, '');

const overlayScrollbarsCSS = `
/* ==========================================================================
   SMOOTH CUSTOM SCROLLBARS (OverlayScrollbars)
   ========================================================================== */

/* The vertical scrollbar track area */
.os-scrollbar-vertical {
  width: 8px !important;
  padding: 0 !important; /* Remove default padding */
  right: 5px !important; /* 5px gap from edge */
  transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

/* Expand smoothly to 28px on hover */
.os-scrollbar-vertical:hover,
.os-scrollbar-vertical.os-scrollbar-interaction {
  width: 28px !important;
}

/* The scrollbar thumb handle */
.os-scrollbar-handle {
  border-radius: 20px !important;
  background: rgba(148, 163, 184, 0.5) !important;
  transition: background-color 0.3s ease !important;
}

.os-scrollbar-handle:hover {
  background: rgba(100, 116, 139, 0.8) !important;
}

/* Push main wrapper's scrollbar down to avoid sticky header */
.main-wrapper > .os-scrollbar-vertical {
  top: 85px !important;
}

/* Dark mode support */
[data-theme="dark"] .os-scrollbar-handle {
  background: rgba(71, 85, 105, 0.7) !important;
}

[data-theme="dark"] .os-scrollbar-handle:hover {
  background: rgba(148, 163, 184, 0.9) !important;
}
`;

fs.writeFileSync(targetCssPath, cssContent + overlayScrollbarsCSS);
console.log('Successfully added smooth OverlayScrollbars CSS and cleaned up Webkit hacks!');
