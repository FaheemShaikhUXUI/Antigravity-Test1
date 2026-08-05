
const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

// The photos tab is wrapped in `<section id="tab-photos"`
const startIdx = html.indexOf(`<section id="tab-photos"`);
const endIdx = html.indexOf(`</section>`, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
  let sectionHtml = html.substring(startIdx, endIdx);
  
  // Replace the entire block:
  // <div style="position: absolute; bottom: 6px; right: 6px; display: flex; gap: 4px; z-index: 2;">
  //   <button ... lh-preview-btn ...>
  //     <svg ...></svg>
  //   </button>
  // </div>
  
  let modifiedSection = sectionHtml;
  
  const searchPattern = /<div style="position: absolute; bottom: 6px; right: 6px; display: flex; gap: 4px; z-index: 2;">\s*<button class="action-btn lh-preview-btn"[^>]*>[\s\S]*?<\/button>\s*<\/div>/g;
  
  let matchCount = 0;
  modifiedSection = modifiedSection.replace(searchPattern, () => {
    matchCount++;
    return ""; // completely remove the div
  });

  html = html.substring(0, startIdx) + modifiedSection + html.substring(endIdx);
  fs.writeFileSync(indexPath, html, "utf8");
  console.log(`Removed ${matchCount} View icons from Photos.`);
} else {
  console.log("Could not find the Photos tab.");
}

