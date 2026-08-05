
const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

const startIdx = html.indexOf(`onclick="togglePhotos(this)"`);
if (startIdx !== -1) {
  const segment = html.substring(startIdx - 500, startIdx + 500);
  console.log(segment);
} else {
  console.log("Not found.");
}

