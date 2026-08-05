
const fs = require("fs");
const path = require("path");

const jsPath = path.join(__dirname, "main.js");
let js = fs.readFileSync(jsPath, "utf8");

const searchPattern = /item\.className = `logo-box-item \$\{asset\.isWhite \? "white-bg-checker" : ""\}`;/g;
const newCode = `item.className = \`logo-box-item\`;`;

if (js.match(searchPattern)) {
  js = js.replace(searchPattern, newCode);
  fs.writeFileSync(jsPath, js, "utf8");
  console.log("Removed white-bg-checker class.");
} else {
  console.log("Could not find the target string.");
}

