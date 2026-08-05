const fs = require("fs");
const path = require("path");

const genPath = path.join(__dirname, "generate_letterhead.cjs");
let genCode = fs.readFileSync(genPath, "utf8");

genCode = genCode.replace(
  /<div class="lh-asset-thumb" style="([^"]*)"><\/div>\s*<div class="lh-asset-bottom">([\s\S]*?)<\/div>\s*<\/div>/g,
  `<div class="lh-asset-bottom">$2</div>
              <div class="lh-asset-thumb" style="$1"></div>
            </div>`
);

fs.writeFileSync(genPath, genCode, "utf8");
console.log("Updated generator to swap order.");
