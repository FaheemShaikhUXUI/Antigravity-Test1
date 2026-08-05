
const fs = require("fs");
const path = require("path");

const cssPath = path.join(__dirname, "style.css");
let css = fs.readFileSync(cssPath, "utf8");

// Fix CSS
css = css.replace(/box-shadow:\s*0 10px 25px rgba\(0,0,0,0\.15\);\s*background:\s*#fff;/g, "");
fs.writeFileSync(cssPath, css, "utf8");
console.log("Fixed CSS background for modal image.");

// Fix HTML
const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

const cdrStartIdx = html.indexOf(`<div class="asset-section-card" data-section="cdr">`);
if (cdrStartIdx !== -1) {
  let cdrHtml = html.substring(cdrStartIdx, html.indexOf("<!-- Brand Guidelines Section -->") === -1 ? html.length : html.indexOf("<!-- Brand Guidelines Section -->", cdrStartIdx));
  
  if(cdrHtml.length > 50000) { cdrHtml = html.substring(cdrStartIdx, html.indexOf(`</section>`, cdrStartIdx)); } // fallback end
  
  const searchPattern = /<button class="action-btn lh-preview-btn"[^>]*>[\s\S]*?<\/button>/g;
  let matchCount = 0;
  
  let modifiedCdr = cdrHtml.replace(searchPattern, () => {
    matchCount++;
    return "";
  });
  
  html = html.substring(0, cdrStartIdx) + modifiedCdr + html.substring(cdrStartIdx + cdrHtml.length);
  fs.writeFileSync(indexPath, html, "utf8");
  console.log(`Removed ${matchCount} preview icons from CDR section.`);
}

