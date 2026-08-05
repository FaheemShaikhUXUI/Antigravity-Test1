
const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

const startIdx = html.indexOf("Evergreen - December 2025");
const nextTabIdx = html.indexOf("Employee Event", startIdx);

if (startIdx !== -1 && nextTabIdx !== -1) {
  const segment = html.substring(nextTabIdx - 1500, nextTabIdx + 500);
  console.log(segment);
} else {
  console.log("Not found.");
}

