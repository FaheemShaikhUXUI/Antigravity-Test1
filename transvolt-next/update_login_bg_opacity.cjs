const fs = require('fs');
const path = require('path');

const cssPath = path.resolve('apps/web/app/globals.css');
const updateCss = `
/* ==========================================================================
   LOGIN BG OPACITY OVERRIDE (30%)
   ========================================================================== */

.split-login-wrapper {
  /* Remove direct background image */
  background: #1e293b !important; /* Slate 800 - dark fallback */
  position: relative !important;
  z-index: 1 !important;
}

[data-theme="dark"] .split-login-wrapper {
  background: #020617 !important; /* Slate 950 - darker fallback */
}

/* Pseudo element for the image to control exact opacity */
.split-login-wrapper::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('/traffic-bg.jpg') no-repeat center center fixed !important;
  background-size: cover !important;
  opacity: 0.3 !important; /* 30% Opacity */
  z-index: -1 !important;
}
`;

fs.appendFileSync(cssPath, updateCss);
console.log('Successfully updated background image opacity to 30%!');
