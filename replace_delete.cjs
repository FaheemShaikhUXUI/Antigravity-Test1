const fs = require("fs");
const path = require("path");

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  
  // Replace the button classes and titles
  content = content.replace(/btn-delete lh-delete-btn/g, "btn-hold lh-hold-btn");
  content = content.replace(/title="Delete Asset"/g, 'title="Hold Asset"');
  content = content.replace(/aria-label="Delete"/g, 'aria-label="Hold"');
  
  // Replace the Trash SVG with a Pause (Hold) SVG
  const trashSvgRegex = /<svg[^>]*><polyline points="3 6 5 6 21 6"><\/polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"><\/path><\/svg>/g;
  const lockSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`;
  
  content = content.replace(trashSvgRegex, lockSvg);
  
  // Also catch generic trash icons if they differ slightly
  // We'll rely on the class name replace and SVG replace working.
  
  fs.writeFileSync(filePath, content, "utf8");
}

replaceInFile(path.join(__dirname, "index.html"));
replaceInFile(path.join(__dirname, "generate_letterhead.cjs"));

// 2. Update style.css
const stylePath = path.join(__dirname, "style.css");
let styleCss = fs.readFileSync(stylePath, "utf8");

styleCss += `\n
/* --- ON HOLD STYLES --- */
.on-hold .lh-asset-thumb {
  background-image: none !important;
  background-color: #f1f5f9 !important;
  border: 1px dashed #cbd5e1 !important;
}

.on-hold .ms-word-icon {
  filter: grayscale(100%) opacity(0.5);
}

.on-hold .btn-replace,
.on-hold .btn-info,
.on-hold .btn-download {
  opacity: 0.3 !important;
  pointer-events: none !important;
  cursor: not-allowed !important;
}

.btn-hold {
  color: #64748b !important;
  background: #f1f5f9 !important;
}
.on-hold .btn-hold {
  color: #ef4444 !important;
  background: #fee2e2 !important;
}
`;

fs.writeFileSync(stylePath, styleCss, "utf8");

// 3. Update main.js
const mainPath = path.join(__dirname, "main.js");
let mainJs = fs.readFileSync(mainPath, "utf8");

const holdScript = `
  // Hold button logic
  document.addEventListener("click", (e) => {
    const holdBtn = e.target.closest(".lh-hold-btn");
    if (holdBtn) {
      e.stopPropagation();
      e.preventDefault();
      const assetBox = holdBtn.closest(".lh-asset-box, .brand-asset-box, .logo-asset-box");
      if (assetBox) {
        assetBox.classList.toggle("on-hold");
      }
    }
  });
`;

if (!mainJs.includes(".lh-hold-btn")) {
  mainJs += holdScript;
  
  // Update clickable-preview logic to ignore on-hold boxes
  mainJs = mainJs.replace(
    /if \(e\.target\.closest\("\.action-btn"\)\) return;/g,
    `if (e.target.closest(".action-btn")) return;
      if (box.classList.contains("on-hold")) return;`
  );
  
  fs.writeFileSync(mainPath, mainJs, "utf8");
}
console.log("Done.");
