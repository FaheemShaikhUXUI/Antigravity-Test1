const fs = require("fs");
const path = require("path");

// 1. Update style.css
const stylePath = path.join(__dirname, "style.css");
let styleCss = fs.readFileSync(stylePath, "utf8");
if (!styleCss.includes(".lh-asset-thumb")) {
  styleCss += `\n
/* --- THUMBNAIL PREVIEW STYLES --- */
.lh-asset-box.clickable-preview {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.lh-asset-thumb {
  width: 100%;
  height: 90px;
  background-size: cover;
  background-position: center;
  border-radius: var(--border-radius-sm);
  background-color: var(--bg-page);
  border: 1px solid var(--border-color);
  transition: transform 0.2s ease;
}
.lh-asset-box.clickable-preview:hover .lh-asset-thumb {
  transform: scale(1.03);
}
.lh-asset-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
#previewModal .modal-content {
  width: 90% !important;
  max-width: 1200px !important;
  padding: 0 !important;
  border: none !important;
  background: transparent !important;
  box-shadow: none !important;
}
#previewModal .modal-header {
  background: var(--bg-panel);
  padding: 1rem 1.5rem;
  border-radius: 8px 8px 0 0;
}
#previewImage {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 0 0 8px 8px;
  margin: 0;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}
`;
  fs.writeFileSync(stylePath, styleCss, "utf8");
}

// 2. Update generate_letterhead.cjs
const genPath = path.join(__dirname, "generate_letterhead.cjs");
let genCode = fs.readFileSync(genPath, "utf8");

genCode = genCode.replace(
  /<div class="lh-asset-box">\s*<span class="lh-asset-label">Header \(JPG - Image\)<\/span>([\s\S]*?)<\/div>\s*<div class="lh-asset-box">\s*<span class="lh-asset-label">Footer \(JPG - Image\)<\/span>([\s\S]*?)<\/div>/g,
  `<div class="lh-asset-box clickable-preview" data-title="\${companyNum} - Header" data-src="\${encodePath(headerFile)}">
              <div class="lh-asset-thumb" style="background-image: url('\${encodePath(headerFile)}')"></div>
              <div class="lh-asset-bottom">
                <span class="lh-asset-label">Header (JPG - Image)</span>$1
              </div>
            </div>

            <div class="lh-asset-box clickable-preview" data-title="\${companyNum} - Footer" data-src="\${encodePath(footerFile)}">
              <div class="lh-asset-thumb" style="background-image: url('\${encodePath(footerFile)}')"></div>
              <div class="lh-asset-bottom">
                <span class="lh-asset-label">Footer (JPG - Image)</span>$2
              </div>
            </div>`
);

fs.writeFileSync(genPath, genCode, "utf8");
console.log("Updated generator and CSS.");

// 3. Update main.js for clicking the tile
const mainPath = path.join(__dirname, "main.js");
let mainJs = fs.readFileSync(mainPath, "utf8");
if (!mainJs.includes(".clickable-preview")) {
  const replaceTarget = `document.querySelectorAll(".lh-preview-btn").forEach(btn => {`;
  const insertCode = `
  // New tile click listener
  document.querySelectorAll(".clickable-preview").forEach(box => {
    box.addEventListener("click", (e) => {
      // Don't trigger if clicking an action button directly
      if (e.target.closest(".action-btn")) return;
      const title = box.getAttribute("data-title") || "Preview";
      const imgSrc = box.getAttribute("data-src") || "";
      openLetterheadPreviewModal(title, imgSrc, imgSrc);
    });
  });
  
  document.querySelectorAll(".lh-preview-btn").forEach(btn => {`;
  
  mainJs = mainJs.replace(replaceTarget, insertCode);
  fs.writeFileSync(mainPath, mainJs, "utf8");
  console.log("Updated main.js");
}
