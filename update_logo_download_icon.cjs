
const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

const oldPath = `<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>`;
const newPath = `<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>`;

html = html.replace(new RegExp(oldPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"), newPath);

fs.writeFileSync(indexPath, html, "utf8");
console.log("Updated index.html");

