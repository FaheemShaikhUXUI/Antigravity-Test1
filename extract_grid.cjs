
const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "index.html");
const html = fs.readFileSync(indexPath, "utf8");

// Get the grid block
const startStr = `<div style="display: grid; grid-template-columns: repeat(10, 1fr); gap: 0.8rem;" class="photo-grid-inner">`;
const startIdx = html.indexOf(startStr);
const endIdx = html.indexOf(`<!-- subtab-photos-employee -->`, startIdx) !== -1 ? html.indexOf(`<!-- subtab-photos-employee -->`, startIdx) : startIdx + 10000;

if (startIdx !== -1) {
  const segment = html.substring(startIdx, Math.min(startIdx + 500, html.length));
  console.log("Segment found. Check index manually.");
}

