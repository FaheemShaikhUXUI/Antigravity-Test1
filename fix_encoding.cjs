
const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

html = html.replace(/identityit/g, "identity&mdash;it");
html = html.replace(/elementfrom/g, "element&mdash;from");
html = html.replace(/materialsshould/g, "materials&mdash;should");
html = html.replace(/Transvolts/g, "Transvolt&apos;s");
html = html.replace(//g, ""); // Catch any remaining

fs.writeFileSync(indexPath, html, "utf8");
console.log("Fixed encoding characters.");

