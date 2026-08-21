const fs = require('fs');
const path = require('path');

const pageTsxPath = path.resolve('apps/web/app/page.tsx');
let pageContent = fs.readFileSync(pageTsxPath, 'utf8');

const oldLoginBtn = `<button class="user-profile-btn login-btn" id="loginBtn" title="Login / Profile" aria-label="Login">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <span>Login</span>
          </button>`;

const newButtons = `<!-- Settings Button -->
          <button class="circle-action-btn" id="settingsBtn" title="Settings" aria-label="Settings">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          </button>
          
          <!-- Login Button (Circular) -->
          <button class="circle-action-btn login-btn" id="loginBtn" title="Login / Profile" aria-label="Login">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </button>`;

if (pageContent.includes(oldLoginBtn)) {
  pageContent = pageContent.replace(oldLoginBtn, newButtons);
  fs.writeFileSync(pageTsxPath, pageContent);
  console.log('Successfully updated HTML buttons in page.tsx');
} else {
  console.log('Error: Could not find old login button HTML in page.tsx. The string matching might have failed due to spacing differences.');
}

// Now append CSS for the new .circle-action-btn
const cssPath = path.resolve('apps/web/app/globals.css');
const cssAppends = `
/* ==========================================================================
   CIRCULAR ACTION BUTTONS
   ========================================================================== */
.circle-action-btn {
  background: var(--bg-input) !important;
  border: 1px solid var(--border-color) !important;
  width: 38px !important;
  height: 38px !important;
  border-radius: 50% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  color: var(--text-main) !important;
  cursor: pointer !important;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
  outline: none !important;
  padding: 0 !important;
}

.circle-action-btn:hover {
  background: var(--color-primary-light) !important;
  color: var(--color-primary) !important;
  border-color: #bfdbfe !important;
  transform: translateY(-2px) scale(1.05) !important;
  box-shadow: 0 4px 10px rgba(68, 114, 196, 0.25) !important;
}

[data-theme="dark"] .circle-action-btn:hover {
  border-color: rgba(68, 114, 196, 0.5) !important;
}
`;

fs.appendFileSync(cssPath, cssAppends);
console.log('Successfully appended CSS for circle buttons.');
