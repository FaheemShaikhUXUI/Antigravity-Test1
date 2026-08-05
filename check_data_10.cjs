
const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "index.html");
const html = fs.readFileSync(indexPath, "utf8");

const idx = html.indexOf(`data-index="10"`);
if (idx !== -1) {
  console.log(html.substring(idx - 100, idx + 200));
} else {
  console.log("NOT FOUND");
}

