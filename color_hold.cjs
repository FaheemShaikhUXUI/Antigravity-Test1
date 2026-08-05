const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

const lockSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`;

// Add hold button inside each <div class="color-box...">
html = html.replace(/<div class="color-box ([^"]*)" style="([^"]*)">/g, 
  `<div class="color-box $1" style="$2">
    <button class="action-btn btn-hold lh-hold-btn color-hold-btn" title="Hold Asset" aria-label="Hold" style="position: absolute; top: 8px; right: 8px; background: rgba(255,255,255,0.2); border: none; border-radius: 4px; padding: 4px; cursor: pointer;">
      ${lockSvg}
    </button>`
);

fs.writeFileSync(indexPath, html, "utf8");
console.log("Updated index.html");

const stylePath = path.join(__dirname, "style.css");
let styleCss = fs.readFileSync(stylePath, "utf8");

styleCss += `\n
.color-box.on-hold {
  background-color: #f1f5f9 !important;
  color: #94a3b8 !important;
  border: 1px dashed #cbd5e1 !important;
}
.color-box.on-hold .color-text-values {
  opacity: 0 !important;
}
.color-box.on-hold .copy-btn {
  opacity: 0 !important;
  pointer-events: none !important;
}
.color-box.on-hold .color-hold-btn {
  background: #fee2e2 !important;
  color: #ef4444 !important;
}
`;

fs.writeFileSync(stylePath, styleCss, "utf8");
console.log("Updated style.css");

// Add color-box to the closest selector in main.js
const mainPath = path.join(__dirname, "main.js");
let mainJs = fs.readFileSync(mainPath, "utf8");
mainJs = mainJs.replace(/const assetBox = holdBtn\.closest\("\.lh-asset-box, \.brand-asset-box, \.logo-asset-box"\);/g, 
  'const assetBox = holdBtn.closest(".lh-asset-box, .brand-asset-box, .logo-box-item, .color-box");');

fs.writeFileSync(mainPath, mainJs, "utf8");
console.log("Updated main.js");
