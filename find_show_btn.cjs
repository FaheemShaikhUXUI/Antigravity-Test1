
const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

const match = html.match(/<button[^>]*>.*?Show.*?<\/button>/ig);
if (match) {
  console.log("MATCH:", match.join("\n"));
} else {
  console.log("No match found.");
}

