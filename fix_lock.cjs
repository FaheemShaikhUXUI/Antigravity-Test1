
const fs = require("fs");
const path = require("path");

const mainPath = path.join(__dirname, "main.js");
let mainJs = fs.readFileSync(mainPath, "utf8");

const lockSvg = `<svg class="svg-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`;
const unlockSvg = `<svg class="svg-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></svg>`;

const toggleLogic = `
      if (assetBox) {
        assetBox.classList.toggle("on-hold");
        const isHold = assetBox.classList.contains("on-hold");
        holdBtn.innerHTML = isHold ? \`${lockSvg}\` : \`${unlockSvg}\`;
        holdBtn.title = isHold ? "Release Asset" : "Hold Asset";
      }
`;

mainJs = mainJs.replace(/if \(assetBox\) \{\s*assetBox\.classList\.toggle\("on-hold"\);\s*\}/, toggleLogic);
fs.writeFileSync(mainPath, mainJs, "utf8");
console.log("Updated main.js");

// Now update all existing buttons in index.html to be unlocked by default
const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

html = html.replace(/<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"><\/rect><path d="M7 11V7a5 5 0 0 1 10 0v4"><\/path><\/svg>/g, unlockSvg);

// And generate_letterhead.cjs
const genPath = path.join(__dirname, "generate_letterhead.cjs");
if(fs.existsSync(genPath)) {
  let genJs = fs.readFileSync(genPath, "utf8");
  genJs = genJs.replace(/<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"><\/rect><path d="M7 11V7a5 5 0 0 1 10 0v4"><\/path><\/svg>/g, unlockSvg);
  fs.writeFileSync(genPath, genJs, "utf8");
}

fs.writeFileSync(indexPath, html, "utf8");
console.log("Updated HTMLs");

