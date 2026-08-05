
const fs = require("fs");
const path = require("path");

const jsPath = path.join(__dirname, "main.js");
let js = fs.readFileSync(jsPath, "utf8");

const oldStr = `item.querySelector(".btn-info").addEventListener("click", (e) => {
      e.stopPropagation();
      openPreviewModal(asset, format, previewSrc, downloadSrc);
    });`;

const newStr = `const btnInfo = item.querySelector(".btn-info");
    if (btnInfo) {
      btnInfo.addEventListener("click", (e) => {
        e.stopPropagation();
        openPreviewModal(asset, format, previewSrc, downloadSrc);
      });
    }`;

if (js.includes(oldStr)) {
  js = js.replace(oldStr, newStr);
  fs.writeFileSync(jsPath, js, "utf8");
  console.log("Fixed btn-info error.");
} else {
  console.log("Could not find btn-info event listener.");
}

