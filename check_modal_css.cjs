
const fs = require("fs");
const path = require("path");

const cssPath = path.join(__dirname, "style.css");
let css = fs.readFileSync(cssPath, "utf8");

const match = css.match(/#previewModal \.modal-image-container img\s*{[^}]*}/);
if (match) {
  console.log("IMG MATCH:", match[0]);
}
const match2 = css.match(/#previewModal \.modal-image-container\s*{[^}]*}/);
if (match2) {
  console.log("CONTAINER MATCH:", match2[0]);
}

