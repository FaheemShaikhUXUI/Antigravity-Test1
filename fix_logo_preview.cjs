
const fs = require("fs");
const path = require("path");

// 1. Fix CSS
const cssPath = path.join(__dirname, "style.css");
let css = fs.readFileSync(cssPath, "utf8");

const oldCss = `box-shadow: 0 10px 25px rgba(0,0,0,0.15);
  background: #fff;`;
const newCss = `/* Removed background and shadow for transparent preview */`;

if (css.includes(oldCss)) {
  css = css.replace(oldCss, newCss);
  fs.writeFileSync(cssPath, css, "utf8");
  console.log("Fixed CSS background for modal image.");
} else {
  console.log("Could not find CSS match.");
}

// 2. Fix HTML (Remove CDR preview)
const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

// The CDR tab is wrapped in `<div class="asset-section-card" data-section="cdr">`
const cdrStartIdx = html.indexOf(`<div class="asset-section-card" data-section="cdr">`);
if (cdrStartIdx !== -1) {
  // Find the next `</div></div></div>` or similar to bound the replacement, or just find the end of the section
  const cdrEndIdx = html.indexOf(`<!-- Brand Guidelines Section -->`, cdrStartIdx);
  
  if (cdrEndIdx !== -1) {
    let cdrHtml = html.substring(cdrStartIdx, cdrEndIdx);
    
    // Replace all Preview buttons in this block
    const searchPattern = /<button class="action-btn lh-preview-btn"[^>]*>[\s\S]*?<\/button>/g;
    let matchCount = 0;
    
    let modifiedCdr = cdrHtml.replace(searchPattern, () => {
      matchCount++;
      return ""; // completely remove the button
    });
    
    html = html.substring(0, cdrStartIdx) + modifiedCdr + html.substring(cdrEndIdx);
    fs.writeFileSync(indexPath, html, "utf8");
    console.log(`Removed ${matchCount} preview icons from CDR section.`);
  } else {
    console.log("Could not find end of CDR section.");
  }
} else {
  console.log("Could not find CDR section.");
}

