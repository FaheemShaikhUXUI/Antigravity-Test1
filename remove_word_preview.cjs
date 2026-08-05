
const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

// Regex to match a preview button block:
// <button class="action-btn btn-info lh-preview-btn"[^>]*data-download="[^"]*\.docx"[^>]*>
//   ... svg ...
// </button>

// We need to match the entire <button ...> ... </button> block if it contains .docx in data-download.
// We can use a loop instead of regex for better reliability with nested tags (though there's only one svg inside).

let modifiedHtml = html;
let startIndex = 0;
let count = 0;

while(true) {
  const searchStr = `<button class="action-btn btn-info lh-preview-btn"`;
  let btnStart = modifiedHtml.indexOf(searchStr, startIndex);
  if (btnStart === -1) break;
  
  let btnEndTag = modifiedHtml.indexOf(`</button>`, btnStart);
  if (btnEndTag === -1) break;
  
  btnEndTag += `</button>`.length;
  
  const btnContent = modifiedHtml.substring(btnStart, btnEndTag);
  
  if (btnContent.includes(`.docx"`)) {
    // This is a Word file preview button!
    // Let's remove it.
    modifiedHtml = modifiedHtml.substring(0, btnStart) + modifiedHtml.substring(btnEndTag);
    count++;
    // Do not increment startIndex because we removed the text
  } else {
    startIndex = btnEndTag;
  }
}

fs.writeFileSync(indexPath, modifiedHtml, "utf8");
console.log(`Removed ${count} Word file preview buttons.`);

