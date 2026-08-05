
const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

const oldRegex = /<button class="action-btn btn-info lh-preview-btn"([^>]*)>[\s\S]*?<\/button>/g;
const eyeSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;

let replaceCount = 0;
html = html.replace(oldRegex, (match, g1) => {
  replaceCount++;
  return `<button class="action-btn btn-info lh-preview-btn"${g1}>\n                ${eyeSvg}\n              </button>`;
});

fs.writeFileSync(indexPath, html, "utf8");
console.log(`Replaced ${replaceCount} icons in index.html.`);

// Also update the generator script so future generations use the eye icon
const genPath = path.join(__dirname, "generate_letterhead.cjs");
let genCode = fs.readFileSync(genPath, "utf8");
const infoSvgStr = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
genCode = genCode.split(infoSvgStr).join(eyeSvg);
fs.writeFileSync(genPath, genCode, "utf8");
console.log("Updated generate_letterhead.cjs");


