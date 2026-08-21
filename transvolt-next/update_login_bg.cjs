const fs = require('fs');
const path = require('path');

const cssPath = path.resolve('apps/web/app/globals.css');
const updateCss = `
/* ==========================================================================
   FULLSCREEN BACKGROUND & GLASSMORPHISM LOGIN OVERRIDE
   ========================================================================== */

.split-login-wrapper {
  background: url('/traffic-bg.jpg') no-repeat center center fixed !important;
  background-size: cover !important;
}

[data-theme="dark"] .split-login-wrapper {
  background: url('/traffic-bg.jpg') no-repeat center center fixed !important;
  background-size: cover !important;
}

.split-login-card {
  background-image: none !important;
  background-color: rgba(0, 0, 0, 0.3) !important; /* Base glass tint */
  backdrop-filter: blur(16px) !important;
  -webkit-backdrop-filter: blur(16px) !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  box-shadow: 0 40px 80px rgba(0,0,0,0.5) !important;
}

.split-login-left {
  background: transparent !important; /* Let the glassmorphism show through */
}

/* The login tab area */
.split-login-right {
  background: rgba(15, 23, 42, 0.6) !important; /* Darker frosted glass for the form */
  backdrop-filter: blur(24px) !important;
  -webkit-backdrop-filter: blur(24px) !important;
  border-left: 1px solid rgba(255, 255, 255, 0.1) !important;
}
`;

fs.appendFileSync(cssPath, updateCss);
console.log('Successfully updated background and blur settings!');
