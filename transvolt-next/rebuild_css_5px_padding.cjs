const fs = require('fs');
const path = require('path');

const pristineCssPath = path.resolve('../_old_html_version/style.css');
const targetCssPath = path.resolve('apps/web/app/globals.css');

const pristineCSS = fs.readFileSync(pristineCssPath, 'utf8');

const customCSS = `

/* ==========================================================================
   MODERN SIDEBAR OVERRIDES (2025 DESIGN TRENDS)
   ========================================================================== */

.dashboard-layout {
  background-color: var(--bg-page) !important;
  padding: 1.25rem !important;
  padding-right: 5px !important; /* Stick scrollbar 5px from right edge */
  gap: 1.5rem !important;
  box-sizing: border-box;
}

.sidebar {
  width: 280px !important;
  border-radius: 24px !important;
  background: rgba(255, 255, 255, 0.7) !important;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.8) !important;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255,255,255,0.6) !important;
  height: calc(100vh - 2.5rem) !important;
  padding: 2rem 0.5rem !important;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

[data-theme="dark"] .sidebar {
  background: rgba(15, 23, 42, 0.5) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05) !important;
}

.sidebar-logo-container {
  padding: 0 1.5rem 1.75rem !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04) !important;
  margin-bottom: 1.75rem !important;
}

[data-theme="dark"] .sidebar-logo-container {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
}

.sidebar-menu {
  padding: 0 1rem !important;
  padding-right: 20px !important; /* Keep gap in sidebar */
}

.nav-tabs-container {
  gap: 0.35rem !important;
}

.nav-tab {
  font-family: var(--font-body);
  font-size: 0.925rem !important;
  font-weight: 500 !important;
  color: var(--text-muted) !important;
  padding: 0.85rem 1.25rem !important;
  border-radius: 99px !important;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
  position: relative;
  background: transparent !important;
  box-shadow: none !important;
}

.nav-tab:hover {
  background-color: var(--bg-input) !important;
  color: var(--text-main) !important;
  transform: translateX(4px) !important;
}

.nav-tab.active {
  background: linear-gradient(135deg, var(--color-primary), #3B82F6) !important;
  color: #ffffff !important;
  font-weight: 600 !important;
  box-shadow: 0 8px 20px -6px rgba(68, 114, 196, 0.4) !important;
  transform: translateX(4px) !important;
}

.main-wrapper {
  background: transparent !important;
  border-radius: 24px !important;
  background-color: var(--bg-card) !important;
  height: calc(100vh - 2.5rem) !important;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.03) !important;
  border: 1px solid var(--border-color) !important;
  overflow-y: auto !important; /* Ensure scrollbar is on the outer wrapper, flush to the right */
}

.top-header {
  border-radius: 24px 24px 0 0 !important;
}

.main-content {
  /* Reverted to natural flex block to keep tiles away from wrapper's scrollbar */
  padding-right: 40px !important; 
}

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
`;

fs.writeFileSync(targetCssPath, pristineCSS + customCSS);
console.log('Successfully positioned the scrollbar to the right side with 5px padding!');
