
const fs = require("fs");
const path = require("path");

// Fix JS
const mainPath = path.join(__dirname, "main.js");
let mainJs = fs.readFileSync(mainPath, "utf8");
mainJs = mainJs.replace(/modalCopyLinkBtn\.onclick = \(\) => {/g, "if(modalCopyLinkBtn) modalCopyLinkBtn.onclick = () => {");
fs.writeFileSync(mainPath, mainJs, "utf8");
console.log("Updated main.js");

// Fix CSS
const stylePath = path.join(__dirname, "style.css");
let styleCss = fs.readFileSync(stylePath, "utf8");

styleCss = styleCss.replace(
  /#previewModal \.modal-image-container {[\s\S]*?}/,
  `#previewModal .modal-image-container {
  padding: 3rem !important;
  border: none !important;
  background: #f1f5f9 !important;
  border-radius: 0 !important;
  display: flex;
  align-items: center;
  justify-content: center;
}`
);

styleCss = styleCss.replace(
  /#previewModal \.modal-image-container img {[\s\S]*?}/,
  `#previewModal .modal-image-container img {
  max-width: 100%;
  max-height: 70vh;
  width: auto;
  height: auto;
  display: block;
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
  background: #fff;
  border-radius: 4px;
}`
);

fs.writeFileSync(stylePath, styleCss, "utf8");
console.log("Updated style.css");

