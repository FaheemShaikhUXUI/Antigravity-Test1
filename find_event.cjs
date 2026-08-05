
const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

const startIdx = html.indexOf("Employee Event");
if (startIdx !== -1) {
  const segment = html.substring(startIdx, startIdx + 1000);
  console.log(segment);
} else {
  console.log("Not found.");
}

