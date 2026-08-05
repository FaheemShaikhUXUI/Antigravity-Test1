
const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

// The photos tab is wrapped in `<section id="tab-photos"`
const startIdx = html.indexOf(`<section id="tab-photos"`);
const endIdx = html.indexOf(`</section>`, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
  let sectionHtml = html.substring(startIdx, endIdx);
  
  const actionOverlay = `
                  <div class="photo-overlay-actions" style="position: absolute; bottom: 8px; right: 8px; display: flex; gap: 6px; z-index: 2;">
                    <button class="action-btn lh-replace-btn" title="Replace Photo" onclick="event.stopPropagation()" style="width: 26px; height: 26px; border-radius: 50%; background: #fff; border: 1px solid #e2e8f0; color: #64748b; display: flex; align-items: center; justify-content: center; cursor: pointer; padding: 0; transition: all 0.2s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                    </button>
                    <button class="action-btn lh-download-btn" title="Download Photo" onclick="event.stopPropagation()" style="width: 26px; height: 26px; border-radius: 50%; background: #fff; border: 1px solid #e2e8f0; color: #16a34a; display: flex; align-items: center; justify-content: center; cursor: pointer; padding: 0; transition: all 0.2s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    </button>
                  </div>
`;

  // We find every <div class="photo-preview-box clickable-photo"[^>]*>...<div class="photo-bg"[^>]*></div>
  // and inject the actionOverlay right after the photo-bg div.
  
  const searchPattern = /(<div class="photo-bg"[^>]*><\/div>)/g;
  let matchCount = 0;
  
  let modifiedSection = sectionHtml.replace(searchPattern, (match) => {
    matchCount++;
    return match + actionOverlay;
  });

  html = html.substring(0, startIdx) + modifiedSection + html.substring(endIdx);
  fs.writeFileSync(indexPath, html, "utf8");
  console.log(`Added actions to ${matchCount} Photos.`);
} else {
  console.log("Could not find the Photos tab.");
}

