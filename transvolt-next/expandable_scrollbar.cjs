const fs = require('fs');
const path = require('path');

const targetCssPath = path.resolve('apps/web/app/globals.css');
let cssContent = fs.readFileSync(targetCssPath, 'utf8');

// Strip out existing scrollbar rules to safely rebuild them
cssContent = cssContent.replace(/^::-webkit-scrollbar(?:-track|-thumb|[\s:a-z-]*)\s*\{[\s\S]*?\}/gm, '');
cssContent = cssContent.replace(/^\[data-theme="dark"\]\s+::[^{]*\{[\s\S]*?\}/gm, '');
cssContent = cssContent.replace(/\.main-wrapper::-webkit-scrollbar-track\s*\{[\s\S]*?\}/gm, '');

const borderHackScrollbarCSS = `
/* ==========================================================================
   HOVER-EXPANDABLE SCROLLBAR (BORDER HACK)
   ========================================================================== */

::-webkit-scrollbar {
  width: 108px; /* Permanent massive width to accommodate the 100px hover expansion */
  height: 108px;
}

::-webkit-scrollbar-track {
  background: transparent;
  border-left: 100px solid transparent; /* Hide most of the track by default */
  background-clip: padding-box;
}

/* Push the main wrapper's scrollbar down so it doesn't overlap the sticky header */
.main-wrapper::-webkit-scrollbar-track {
  margin-top: 85px; 
  margin-bottom: 20px;
}

/* Default state: looks 6px wide */
::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.5);
  border-radius: 20px;
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;
  border-right: 2px solid transparent;
  border-left: 100px solid transparent; /* The magic! Pushes the visible part to the right edge */
  background-clip: padding-box;
}

/* Hover state: expands to 104px wide */
::-webkit-scrollbar-thumb:hover {
  background: rgba(100, 116, 139, 0.8);
  border-left: 2px solid transparent; /* Reveal the full width! */
}

/* Dark mode */
[data-theme="dark"] ::-webkit-scrollbar-thumb {
  background: rgba(71, 85, 105, 0.7);
  border-left: 100px solid transparent;
}

[data-theme="dark"] ::-webkit-scrollbar-thumb:hover {
  background: rgba(148, 163, 184, 0.9);
  border-left: 2px solid transparent;
}
`;

fs.writeFileSync(targetCssPath, cssContent + borderHackScrollbarCSS);
console.log('Successfully applied the border-hack expandable scrollbar!');
