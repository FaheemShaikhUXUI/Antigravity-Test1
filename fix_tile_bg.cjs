
const fs = require("fs");
const path = require("path");

const cssPath = path.join(__dirname, "style.css");
let css = fs.readFileSync(cssPath, "utf8");

const searchStr = `background-color: #f1f5f9 !important;`;
const newStr = `background-color: #cfd6e0 !important; /* ~20% darker */`;

if (css.includes(searchStr)) {
  css = css.replace(searchStr, newStr);
  fs.writeFileSync(cssPath, css, "utf8");
  console.log("Darkened tile bg by ~20%.");
} else {
  console.log("Could not find background-color string.");
}

