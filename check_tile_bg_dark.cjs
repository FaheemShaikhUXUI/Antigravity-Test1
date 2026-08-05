
const fs = require("fs");
const path = require("path");

const cssPath = path.join(__dirname, "style.css");
let css = fs.readFileSync(cssPath, "utf8");

const darkMatch = css.match(/\[data-theme="dark"\].*?\.logo-preview-area\s*{[^}]*}/g);
if (darkMatch) {
  console.log("DARK MATCH:", darkMatch.join("\n"));
} else {
  console.log("No dark match.");
}

