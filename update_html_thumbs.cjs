
const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

// We only want to replace it for background URLs in .photo-bg
// Example: background: url('./Photos/Event/...') -> background: url('./Photos/Thumbnails/Event/...')

const oldRegex = /background:\s*url\('\.\/Photos\/(.*?)'\)/g;
html = html.replace(oldRegex, (match, photoPath) => {
  // If it already points to Thumbnails, ignore it
  if (photoPath.startsWith("Thumbnails/")) return match;
  return `background: url('./Photos/Thumbnails/${photoPath}')`;
});

fs.writeFileSync(indexPath, html, "utf8");
console.log("Updated HTML to use thumbnails for backgrounds.");

