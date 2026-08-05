
const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

// Change justification
html = html.replace(
  `<div style="display: flex; justify-content: center; margin-top: 1.5rem; grid-column: 1 / -1;">`,
  `<div style="display: flex; justify-content: flex-end; margin-top: 1.5rem; grid-column: 1 / -1;">`
);

// Add styling for light gray background
html = html.replace(
  `<button class="btn-lh-all" style="padding: 0.35rem 0.85rem;`,
  `<button style="background: var(--bg-input); color: var(--title-color); border: 1px solid var(--border-color); padding: 0.35rem 0.85rem;`
);

fs.writeFileSync(indexPath, html, "utf8");
console.log("Updated button styling and position.");

