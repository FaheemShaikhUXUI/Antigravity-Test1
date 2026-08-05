
const fs = require("fs");
const path = require("path");

const jsPath = path.join(__dirname, "main.js");
let js = fs.readFileSync(jsPath, "utf8");

const oldHtmlBlock = `<button class="action-btn btn-info" title="Preview / Info" aria-label="Preview \${asset.label}">
            \${ICON_INFO}
          </button>`;

const newHtmlBlock = `\${format.toLowerCase() === 'cdr' ? '' : \`<button class="action-btn btn-info" title="Preview / Info" aria-label="Preview \${asset.label}">
            \${ICON_INFO}
          </button>\`}`;

if (js.includes(oldHtmlBlock)) {
  js = js.replace(oldHtmlBlock, newHtmlBlock);
  fs.writeFileSync(jsPath, js, "utf8");
  console.log("Fixed CDR preview button in JS.");
} else {
  console.log("Could not find button block in JS.");
}

