
const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

// We want to replace color: #000; with color: var(--title-color); in those h3 headers.
// Let's just use regex to find those specific h3 tags and replace the color.
// The exact string: <h3 style="margin: 0; font-weight: 800; font-size: 1.75rem; color: #000;">
const searchStr = `<h3 style="margin: 0; font-weight: 800; font-size: 1.75rem; color: #000;">`;
const replacementStr = `<h3 style="margin: 0; font-weight: 800; font-size: 1.75rem; color: var(--title-color);">`;

if (html.includes(searchStr)) {
  html = html.split(searchStr).join(replacementStr);
  fs.writeFileSync(indexPath, html, "utf8");
  console.log("Fixed text color for dark mode.");
} else {
  console.log("Could not find the target string.");
}

