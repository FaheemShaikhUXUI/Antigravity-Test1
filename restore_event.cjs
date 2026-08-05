
const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

const eventDir = path.join(__dirname, "Photos/Event/Evergreen - December 2025");
let eventImages = [];
if (fs.existsSync(eventDir)) {
  eventImages = fs.readdirSync(eventDir).filter(f => f.endsWith(".JPG") || f.endsWith(".jpg"));
}

let eventGridHtml = "";
eventImages.forEach((img, idx) => {
  const imgSrc = `./Photos/Event/Evergreen - December 2025/${img}`;
  eventGridHtml += `
              <div class="photo-preview-box clickable-photo" data-index="${idx}" data-img="${imgSrc}" style="aspect-ratio: 1/1; position: relative; border-radius: 6px; overflow: hidden; cursor: pointer;">
                <div class="photo-bg" style="position: absolute; inset: 0; background: url('${imgSrc}') center/cover no-repeat; transition: transform 0.3s ease;"></div>
                <div style="position: absolute; bottom: 6px; right: 6px; display: flex; gap: 4px; z-index: 2;">
                  <button class="action-btn lh-preview-btn" title="View" style="width: 20px; height: 20px; border-radius: 50%; background: #fff; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; padding: 0; pointer-events: none;">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  </button>
                  <button class="action-btn lh-replace-btn" title="Replace" style="width: 20px; height: 20px; border-radius: 50%; background: #fff; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; padding: 0;">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                  </button>
                  <button class="action-btn lh-download-btn" title="Download" style="width: 20px; height: 20px; border-radius: 50%; background: #fff; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; padding: 0;">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  </button>
                </div>
              </div>`;
});

const correctEventHtml = `
          <div id="subtab-photos-event" class="sub-tab-pane" style="display: block;">
            <div class="lh-card lh-card-general" style="margin-top: 0.5rem; padding: 2rem; margin-bottom: 2rem;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem;">
                <div style="display: flex; flex-direction: column; gap: 0.25rem;">
                  <h3 style="margin: 0; font-weight: 800; font-size: 1.75rem; color: #000;">Evergreen - December 2025</h3>
                  <span style="color: #94a3b8; font-size: 0.85rem;">Date: 15 December 2025 | Total Photos: 20</span>
                </div>
                <button class="btn-lh-all" style="display: flex; align-items: center; gap: 6px; padding: 4px 16px; border-radius: 20px; border: 1px solid #22c55e; background: #dcfce7; color: #22c55e; font-size: 0.9rem; font-weight: 600; cursor: pointer;">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  All
                </button>
              </div>
    
              <div style="display: grid; grid-template-columns: repeat(10, 1fr); gap: 0.8rem;" class="photo-grid-inner">
  ${eventGridHtml}
              </div>
            </div>
          </div>

`;

const eventStart = html.indexOf(`<div id="subtab-photos-event"`);
const siteStart = html.indexOf(`<div id="subtab-photos-site"`);

if (eventStart !== -1 && siteStart !== -1) {
  html = html.substring(0, eventStart) + correctEventHtml + "          " + html.substring(siteStart);
  fs.writeFileSync(indexPath, html, "utf8");
  console.log("Restored Event tab successfully!");
} else {
  console.log("Could not find start or end bounds.");
}

