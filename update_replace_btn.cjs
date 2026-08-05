const fs = require("fs");
const path = require("path");

const mainPath = path.join(__dirname, "main.js");
let mainJs = fs.readFileSync(mainPath, "utf8");

// Remove the existing replace button listeners
const logoReplaceRegex = /item\.querySelector\("\.btn-replace"\)\.addEventListener\("click", \(e\) => \{[\s\S]*?\}\);/;
mainJs = mainJs.replace(logoReplaceRegex, "");

const lhReplaceRegex = /document\.querySelectorAll\("\.lh-replace-btn"\)\.forEach\(btn => \{[\s\S]*?\}\);/g;
mainJs = mainJs.replace(lhReplaceRegex, "");

// Add a global replace logic
const replaceLogic = `
  // Global file replacement logic
  const globalReplaceInput = document.createElement("input");
  globalReplaceInput.type = "file";
  globalReplaceInput.style.display = "none";
  document.body.appendChild(globalReplaceInput);

  globalReplaceInput.addEventListener("change", (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileName = e.target.files[0].name;
      showToast("Asset successfully replaced with " + fileName, "success");
      e.target.value = ""; // Reset for next use
    }
  });

  document.addEventListener("click", (e) => {
    const replaceBtn = e.target.closest(".btn-replace, .lh-replace-btn");
    if (replaceBtn) {
      e.stopPropagation();
      e.preventDefault();
      // Ensure the tile is not on hold
      const box = replaceBtn.closest(".lh-asset-box, .brand-asset-box, .logo-box-item, .color-box");
      if (box && box.classList.contains("on-hold")) return;
      
      globalReplaceInput.click();
    }
  });
`;

if (!mainJs.includes("globalReplaceInput.click()")) {
  mainJs += replaceLogic;
  fs.writeFileSync(mainPath, mainJs, "utf8");
  console.log("Updated main.js with global replace file dialog logic.");
} else {
  console.log("Already updated main.js.");
}
