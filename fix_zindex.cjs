
const fs = require("fs");
const path = require("path");

const stylePath = path.join(__dirname, "style.css");
let styleCss = fs.readFileSync(stylePath, "utf8");

styleCss = styleCss.replace(/\.color-box\.on-hold \.color-text-values \{\s*opacity: 0 !important;\s*\}/, 
  ".color-box.on-hold .color-text-values { opacity: 0 !important; pointer-events: none !important; }");
  
styleCss = styleCss.replace(/\.color-box\.on-hold \.color-hold-btn \{/,
  ".color-box.on-hold .color-hold-btn { z-index: 10 !important;");

fs.writeFileSync(stylePath, styleCss, "utf8");

const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");
html = html.replace(/class="action-btn btn-hold lh-hold-btn color-hold-btn"([^>]*?)style="position: absolute;/g, 
  `class="action-btn btn-hold lh-hold-btn color-hold-btn"$1style="position: absolute; z-index: 10;`);
fs.writeFileSync(indexPath, html, "utf8");
console.log("Updated CSS and HTML for z-index");

