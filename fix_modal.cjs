
const fs = require("fs");
const path = require("path");

const stylePath = path.join(__dirname, "style.css");
let styleCss = fs.readFileSync(stylePath, "utf8");

// Remove the old buggy CSS block
const bugBlock = /#previewModal \.modal-card {[\s\S]*?#previewImage {[\s\S]*?}/;
styleCss = styleCss.replace(bugBlock, "");

// Replace the previous `#previewModal .modal-content` just in case it is still there
styleCss = styleCss.replace(/#previewModal \.modal-content {[\s\S]*?#previewImage {[\s\S]*?}/, "");

// Append the correct CSS block
styleCss += `
#previewModal .modal-card {
  width: 90% !important;
  max-width: 1000px !important; 
}
#previewModal .modal-body {
  padding: 0 !important; 
}
#previewModal .modal-image-container {
  padding: 0 !important;
  border: none !important;
  background: transparent !important;
  border-radius: 0 !important;
}
#previewModal .modal-image-container img {
  width: 100%;
  height: auto;
  display: block;
}
#previewModal .modal-details {
  padding: 1.5rem 1.75rem !important;
  background: var(--bg-page) !important;
}
#previewModal .modal-footer {
  background: var(--bg-input) !important;
}
`;

fs.writeFileSync(stylePath, styleCss, "utf8");
console.log("Fixed modal CSS.");

