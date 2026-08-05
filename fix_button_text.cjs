
const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

const searchStr = `<span>Download All</span>`;
const replacementStr = `<span>All</span>`;

if (html.includes(searchStr)) {
  html = html.split(searchStr).join(replacementStr);
  fs.writeFileSync(indexPath, html, "utf8");
  console.log("Replaced Download All with All.");
} else {
  console.log("Could not find the target string.");
}

