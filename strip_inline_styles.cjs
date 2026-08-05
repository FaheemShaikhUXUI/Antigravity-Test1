
const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

// The inline style in the Photo tab is:
const targetStyle = `style="display: flex; align-items: center; gap: 6px; padding: 4px 16px; border-radius: 20px; border: 1px solid #22c55e; background: #dcfce7; color: #22c55e; font-size: 0.9rem; font-weight: 600; cursor: pointer;"`;

if (html.includes(targetStyle)) {
  html = html.split(targetStyle).join("");
  fs.writeFileSync(indexPath, html, "utf8");
  console.log("Stripped inline styles from btn-lh-all.");
} else {
  console.log("Inline style not found.");
}

