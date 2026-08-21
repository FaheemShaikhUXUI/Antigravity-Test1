const fs = require('fs');
const path = require('path');

const cssPath = path.resolve('apps/web/app/globals.css');

const modernSidebarCSS = `
/* ==========================================================================
   MODERN SIDEBAR OVERRIDES (2025 DESIGN TRENDS)
   ========================================================================== */

/* 1. Floating Island Sidebar Container */
.dashboard-layout {
  background-color: var(--bg-page) !important;
  padding: 1.25rem !important;
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

/* 2. Logo Area */
.sidebar-logo-container {
  padding: 0 1.5rem 1.75rem !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04) !important;
  margin-bottom: 1.75rem !important;
}

[data-theme="dark"] .sidebar-logo-container {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
}

/* 3. Navigation Links (Tabs) */
.sidebar-menu {
  padding: 0 1rem !important;
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

/* Adjust Main Wrapper */
.main-wrapper {
  background: transparent !important;
  border-radius: 24px !important;
  background-color: var(--bg-card) !important;
  height: calc(100vh - 2.5rem) !important;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.03) !important;
  border: 1px solid var(--border-color) !important;
}

.top-header {
  border-radius: 24px 24px 0 0 !important;
}
`;

fs.appendFileSync(cssPath, modernSidebarCSS);
console.log('Successfully appended modern sidebar CSS to globals.css!');
