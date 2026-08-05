
const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

// Find Evergreen event grid
const searchStr = `<div class="photo-preview-box clickable-photo" data-index="10"`;

if (html.includes(searchStr)) {
  // Hide photos from index 10 onwards in Evergreen
  html = html.replace(/<div class="photo-preview-box clickable-photo" data-index="([1-9][0-9])"/g, `<div class="photo-preview-box clickable-photo hidden-photo" data-index="$1"`);
  
  // Add CSS for hidden-photo if not exists
  if (!html.includes(`.hidden-photo { display: none !important; }`)) {
    html = html.replace(`</style>`, `  .hidden-photo { display: none !important; }\n</style>`);
  }
  
  // Add the Show More button at the end of the grid
  // We need to find the end of the photo-grid-inner for Evergreen.
  // We can just find data-index="19" and put the button after it.
  const index19End = html.indexOf(`</div>`, html.indexOf(`data-index="19"`));
  // The structure is `<div class="photo-preview-box...">...</div></div>`
  
  // A better way: find where the grid ends
  const gridInnerStr = `class="photo-grid-inner">`;
  const nextTabIdx = html.indexOf(`id="subtab-photos-employee"`);
  
  // Insert button after the grid
  const btnHtml = `
          <div style="display: flex; justify-content: center; margin-top: 1.5rem; grid-column: 1 / -1;">
            <button class="btn-lh-all" style="padding: 0.35rem 0.85rem; border-radius: 6px; font-weight: 600; font-size: 0.75rem; display: flex; align-items: center; gap: 0.4rem; cursor: pointer; transition: all 0.2s ease;" onclick="this.parentElement.parentElement.querySelectorAll('.hidden-photo').forEach(el => el.classList.remove('hidden-photo')); this.style.display='none';">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              Show More
            </button>
          </div>
  `;
  
  // Instead of complex parsing, I will just append the button inside the grid, using grid-column: 1 / -1
  html = html.replace(/(data-index="19".*?<\/div>\s*<\/div>\s*<\/div>)/s, `$1${btnHtml}`);
  
  fs.writeFileSync(indexPath, html, "utf8");
  console.log("Added Show More button and hid extra photos.");
} else {
  console.log("Could not find data-index=10");
}

