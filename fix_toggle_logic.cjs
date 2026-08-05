
const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

const oldStr = `const container = btn.closest(".photo-grid-inner");`;
const newStr = `const container = btn.closest(".lh-card-general").querySelector(".photo-grid-inner");`;

if (html.includes(oldStr)) {
  html = html.replace(oldStr, newStr);
  fs.writeFileSync(indexPath, html, "utf8");
  console.log("Fixed toggle logic.");
} else {
  console.log("Could not find the target string.");
}

