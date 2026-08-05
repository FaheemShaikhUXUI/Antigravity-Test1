
const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

const startIdx = html.indexOf("Evergreen - December 2025");
if (startIdx !== -1) {
  const segment = html.substring(startIdx - 500, startIdx + 1000);
  console.log(segment);
} else {
  console.log("Not found.");
}

