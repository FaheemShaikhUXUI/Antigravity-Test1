
const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

const startIdx = html.indexOf(`<section id="tab-photos"`);
const endIdx = html.indexOf(`</section>`, startIdx) + `</section>`.length;
let photosHtml = html.substring(startIdx, endIdx);

// We need to keep the intro part
const introEnd = photosHtml.indexOf(`</div>\r\n        </div>`) > -1 
  ? photosHtml.indexOf(`</div>\r\n        </div>`) + `</div>\r\n        </div>`.length 
  : photosHtml.indexOf(`</div>\n        </div>`) + `</div>\n        </div>`.length;

const introPart = photosHtml.substring(0, introEnd);

// Event Images
const eventDir = path.join(__dirname, "Photos/Event/Evergreen - December 2025");
let eventImages = [];
if (fs.existsSync(eventDir)) {
  eventImages = fs.readdirSync(eventDir).filter(f => f.endsWith(".JPG") || f.endsWith(".jpg"));
}

let eventGridHtml = "";
eventImages.forEach((img) => {
  const imgSrc = `./Photos/Event/Evergreen - December 2025/${img}`;
  eventGridHtml += `
            <div class="photo-preview-box" style="aspect-ratio: 1/1; position: relative; border-radius: 6px; background: url('${imgSrc}') center/cover no-repeat; overflow: hidden;">
              <div style="position: absolute; bottom: 6px; right: 6px; display: flex; gap: 4px;">
                <button class="action-btn lh-preview-btn" title="View" style="width: 20px; height: 20px; border-radius: 50%; background: #fff; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; padding: 0;">
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

// Placeholder for empty tiles (Site and Employee)
let placeholderGridHtml = "";
for (let i = 1; i <= 10; i++) {
  placeholderGridHtml += `
            <div class="photo-preview-box" style="aspect-ratio: 1/1; position: relative; border-radius: 6px; background: #eef2f6; overflow: hidden;">
              <span style="position: absolute; top: 6px; left: 8px; color: #fff; font-size: 0.75rem; font-family: sans-serif;">Image</span>
              <div style="position: absolute; bottom: 6px; right: 6px; display: flex; gap: 4px;">
                <button class="action-btn lh-preview-btn" title="View" style="width: 20px; height: 20px; border-radius: 50%; background: #fff; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; padding: 0;">
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
}

function createCard(title, subtitle, gridContent, count) {
  return `
        <h3 class="section-title" style="margin-top: 2rem; margin-bottom: 0.5rem; font-size: 1.25rem; font-weight: 700; color: var(--title-color);">${title.split(":")[0]} Section</h3>
        <div class="lh-card lh-card-general" style="margin-top: 0.5rem; padding: 2rem; margin-bottom: 2rem;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem;">
            <div style="display: flex; flex-direction: column; gap: 0.25rem;">
              <h3 style="margin: 0; font-weight: 800; font-size: 1.75rem; color: #000;">${title}</h3>
              <span style="color: #94a3b8; font-size: 0.85rem;">${subtitle} | Total Photos: ${count}</span>
            </div>
            <button class="btn-lh-all" style="display: flex; align-items: center; gap: 6px; padding: 4px 16px; border-radius: 20px; border: 1px solid #22c55e; background: #dcfce7; color: #22c55e; font-size: 0.9rem; font-weight: 600; cursor: pointer;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              All
            </button>
          </div>

          <div style="display: grid; grid-template-columns: repeat(10, 1fr); gap: 0.8rem;" class="photo-grid-inner">
            ${gridContent}
          </div>
          
          <div style="display: flex; justify-content: flex-end; margin-top: 2rem;">
            <button class="btn-show-all" style="padding: 4px 16px; border-radius: 20px; border: 1px solid #3b82f6; background: #e0f2fe; color: #3b82f6; font-size: 0.85rem; font-weight: 500; cursor: pointer;">
              Show All
            </button>
          </div>
        </div>
`;
}

let newContent = introPart;
newContent += createCard("Evergreen - December 2025", "Date: 15 December 2025", eventGridHtml, 20);
newContent += createCard("Site Name", "Date: Pending", placeholderGridHtml, 10);
newContent += createCard("Employee Event", "Date: Pending", placeholderGridHtml, 10);
newContent += "\n      </section>";

html = html.substring(0, startIdx) + newContent + html.substring(endIdx);

fs.writeFileSync(indexPath, html, "utf8");
console.log("Updated Photo Sections.");

