const fs = require("fs");
const path = require("path");

const sourceDir = path.join(__dirname, "All Assets", "Letterhead");
const destDir = path.join(__dirname, "Letterhead");

const items = fs.readdirSync(sourceDir, { withFileTypes: true });
let htmlCards = "";

function generateCard(folderName, companyNum, companyName, files) {
  const headerFile = files.find(f => f.toLowerCase().includes("header"));
  const footerFile = files.find(f => f.toLowerCase().includes("footer"));
  const docxFile = files.find(f => f.toLowerCase().endsWith(".docx"));

  const encodePath = (f) => f ? `./Letterhead/${folderName}/${f}`.replace(/ /g, "%20") : "#";

  const eyeSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
  
  const generateActions = (title, previewSrc, dlSrc) => `
                <div class="lh-asset-actions" style="width:100%; justify-content: flex-end;">
                  <button class="action-btn btn-hold lh-hold-btn" title="Hold Asset" aria-label="Hold">
                    <svg class="svg-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></svg>
                  </button>
                  <button class="action-btn btn-replace lh-replace-btn" title="Replace Asset" aria-label="Replace">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                  </button>
                  <button class="action-btn btn-info lh-preview-btn" data-title="${title}" data-src="${previewSrc}" data-download="${dlSrc}" title="Preview Asset" aria-label="Preview">
                    ${eyeSvg}
                  </button>
                  <a href="${dlSrc}" download="${dlSrc.split('/').pop()}" class="action-btn btn-download lh-download-btn" data-asset="${title}" title="Download Asset" aria-label="Download">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  </a>
                </div>`;

  return `
        <!-- ${folderName} -->
        <div class="lh-card">
          <div class="lh-card-header">
            <div class="lh-title-wrapper">
              <span class="lh-subtitle">${companyNum} - Company Letterhead</span>
              <h3 class="lh-title">${companyName}</h3>
            </div>
            <a href="./Letterhead/${folderName.replace(/ /g, "%20")}.zip" download="${folderName}.zip" class="btn-lh-all" data-asset="${companyNum} - Company Letterhead Package">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              <span>All</span>
            </a>
          </div>

          <div class="lh-row-split">
            <div class="lh-asset-box clickable-preview" data-title="${companyNum} - Header" data-src="${encodePath(headerFile)}" style="align-items: flex-start;">
              <span class="lh-asset-label">Header (JPG - Image)</span>
              <div class="lh-asset-thumb" style="background-image: url('${encodePath(headerFile)}')"></div>
              ${generateActions(`${companyNum} - Header`, encodePath(headerFile), encodePath(headerFile))}
            </div>

            <div class="lh-asset-box clickable-preview" data-title="${companyNum} - Footer" data-src="${encodePath(footerFile)}" style="align-items: flex-start;">
              <span class="lh-asset-label">Footer (JPG - Image)</span>
              <div class="lh-asset-thumb" style="background-image: url('${encodePath(footerFile)}')"></div>
              ${generateActions(`${companyNum} - Footer`, encodePath(footerFile), encodePath(footerFile))}
            </div>
          </div>

          <div class="lh-asset-box lh-box-full">
            <div class="word-file-meta">
              <div class="ms-word-icon" title="Microsoft Word Document (.docx)">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="#EBF3FC" stroke="#2B579A" stroke-width="1.5"/>
                  <path d="M14 2V8H20" fill="#BCCEE7"/>
                  <line x1="12" y1="13" x2="17" y2="13" stroke="#2B579A" stroke-width="1.5" stroke-linecap="round"/>
                  <line x1="12" y1="16" x2="17" y2="16" stroke="#2B579A" stroke-width="1.5" stroke-linecap="round"/>
                  <line x1="12" y1="19" x2="15" y2="19" stroke="#2B579A" stroke-width="1.5" stroke-linecap="round"/>
                  <rect x="2" y="10" width="10" height="10" rx="2" fill="#2B579A"/>
                  <text x="7" y="17.5" fill="#FFFFFF" font-family="Arial, sans-serif" font-weight="900" font-size="8px" text-anchor="middle">W</text>
                </svg>
              </div>
              <div class="word-file-texts">
                <span class="word-file-title">Word File</span>
                <span class="word-file-sub">MS Word Template (.docx)</span>
              </div>
            </div>
            ${generateActions(`${companyNum} - Word File Template`, encodePath(headerFile), encodePath(docxFile))}
          </div>
        </div>
`;
}

const companies = [];
items.forEach(item => {
  if (item.isDirectory() && /^\d+/.test(item.name)) {
    companies.push(item.name);
  }
});

companies.sort((a, b) => parseInt(a) - parseInt(b));

companies.forEach(folderName => {
  const dest = path.join(destDir, folderName);
  
  let match = folderName.match(/^(\d+)\s*-\s*Company Letterhead\s*-\s*(.+)$/i);
  let companyNum = folderName;
  let companyName = folderName;
  if (match) {
    companyNum = match[1];
    companyName = match[2];
  }

  const files = fs.readdirSync(dest);
  htmlCards += generateCard(folderName, companyNum, companyName, files);
});

fs.writeFileSync("letterhead_cards.html", htmlCards, "utf8");
console.log("Regenerated letterhead_cards.html");
