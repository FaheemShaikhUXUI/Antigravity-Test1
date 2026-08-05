
const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

const match = html.match(/.{0,50}Show More.{0,50}/g);
if (match) {
  console.log("MATCH:", match.join("\n"));
} else {
  console.log("No match found.");
}

