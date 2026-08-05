
const fs = require("fs");
const path = require("path");

const mainPath = path.join(__dirname, "main.js");
let mainJs = fs.readFileSync(mainPath, "utf8");

// Replace ICON_DELETE
const trashSvg = `<svg class="svg-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>`;
const lockSvg = `<svg class="svg-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`;
mainJs = mainJs.replace(/const ICON_DELETE = `.*?`;/s, `const ICON_DELETE = \`${lockSvg}\`;`);

// Replace btn-delete in renderLogoBoxes
mainJs = mainJs.replace(/btn-delete/g, "btn-hold lh-hold-btn");
mainJs = mainJs.replace(/title="Delete Asset"/g, `title="Hold Asset"`);

// Remove old listener
const oldListener = /item\.querySelector\("\.btn-hold lh-hold-btn"\)\.addEventListener\("click", \(e\) => \{[\s\S]*?\}\);/;
mainJs = mainJs.replace(oldListener, "");

fs.writeFileSync(mainPath, mainJs, "utf8");
console.log("Updated main.js");

// Update CSS for logo boxes
const stylePath = path.join(__dirname, "style.css");
let styleCss = fs.readFileSync(stylePath, "utf8");

if (!styleCss.includes(".on-hold .logo-preview-img")) {
  styleCss += `\n
.on-hold .logo-preview-img {
  opacity: 0 !important;
}
.on-hold .logo-preview-area {
  background-color: #f1f5f9 !important;
  border: 1px dashed #cbd5e1 !important;
}
`;
  fs.writeFileSync(stylePath, styleCss, "utf8");
}
console.log("Updated style.css");

