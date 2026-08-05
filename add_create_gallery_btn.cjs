
const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

const oldSubNav = `<div class="sub-nav-container" style="display: flex; gap: 2.5rem; border-bottom: 2px solid #e2e8f0; margin-top: 2.5rem; margin-bottom: 2.5rem;">
          <button class="sub-nav-tab active" data-subtab="photos-event" style="background: transparent; border: none; font-size: 1.15rem; font-family: var(--font-heading); font-weight: 500; color: #3b82f6; padding: 0.75rem 0.25rem; position: relative; cursor: pointer; border-bottom: 2px solid #3b82f6; margin-bottom: -2px;">Event</button>
          <button class="sub-nav-tab" data-subtab="photos-site" style="background: transparent; border: none; font-size: 1.15rem; font-family: var(--font-heading); font-weight: 500; color: #94a3b8; padding: 0.75rem 0.25rem; position: relative; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -2px; transition: color 0.2s;">Site</button>
          <button class="sub-nav-tab" data-subtab="photos-employee" style="background: transparent; border: none; font-size: 1.15rem; font-family: var(--font-heading); font-weight: 500; color: #94a3b8; padding: 0.75rem 0.25rem; position: relative; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -2px; transition: color 0.2s;">Employee</button>
        </div>`;

const newSubNav = `<div class="sub-nav-container" style="display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2px solid #e2e8f0; margin-top: 2.5rem; margin-bottom: 2.5rem;">
          <div style="display: flex; gap: 2.5rem;">
            <button class="sub-nav-tab active" data-subtab="photos-event" style="background: transparent; border: none; font-size: 1.15rem; font-family: var(--font-heading); font-weight: 500; color: #3b82f6; padding: 0.75rem 0.25rem; position: relative; cursor: pointer; border-bottom: 2px solid #3b82f6; margin-bottom: -2px;">Event</button>
            <button class="sub-nav-tab" data-subtab="photos-site" style="background: transparent; border: none; font-size: 1.15rem; font-family: var(--font-heading); font-weight: 500; color: #94a3b8; padding: 0.75rem 0.25rem; position: relative; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -2px; transition: color 0.2s;">Site</button>
            <button class="sub-nav-tab" data-subtab="photos-employee" style="background: transparent; border: none; font-size: 1.15rem; font-family: var(--font-heading); font-weight: 500; color: #94a3b8; padding: 0.75rem 0.25rem; position: relative; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -2px; transition: color 0.2s;">Employee</button>
          </div>
          <button class="btn-create-gallery" onclick="document.getElementById('modal-create-gallery').classList.add('active')" style="background: var(--color-primary); color: white; padding: 0.65rem 1.25rem; border-radius: 6px; border: none; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; margin-bottom: 0.75rem; font-size: 0.9rem; transition: background 0.2s; box-shadow: 0 4px 10px rgba(59,130,246,0.2);">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Create Gallery
          </button>
        </div>`;

if (html.includes(oldSubNav)) {
  html = html.replace(oldSubNav, newSubNav);
  fs.writeFileSync(indexPath, html, "utf8");
  console.log("Added Create Gallery button to sub-nav.");
} else {
  console.log("Could not find the target string.");
}

