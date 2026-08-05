
const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

const startIdx10 = html.indexOf(`<div class="photo-preview-box`);
// We need to find the specific data-index="10" box.
const data10Idx = html.indexOf(`data-index="10"`);
if (data10Idx !== -1) {
  // Find the exact start of that div by looking backwards for `<div`
  const exactStart10 = html.lastIndexOf(`<div`, data10Idx);
  
  const btnWrapperIdx = html.indexOf(`<div style="display: flex; justify-content: flex-end; margin-top: 1.5rem; grid-column: 1 / -1;">`, exactStart10);
  
  if (exactStart10 !== -1 && btnWrapperIdx !== -1) {
    const originalPhotos = html.substring(exactStart10, btnWrapperIdx);
    
    const wrappedPhotos = `
<!-- COLLAPSIBLE WRAPPER -->
<div class="collapsible-wrapper" style="grid-column: 1 / -1; display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease; opacity: 0; pointer-events: none;">
  <div style="overflow: hidden;">
    <div style="display: grid; grid-template-columns: repeat(10, 1fr); gap: 0.8rem; padding-top: 0.2rem;">
${originalPhotos}    </div>
  </div>
</div>
<!-- /COLLAPSIBLE WRAPPER -->
`;
    
    html = html.substring(0, exactStart10) + wrappedPhotos + html.substring(btnWrapperIdx);
    fs.writeFileSync(indexPath, html, "utf8");
    console.log("Successfully wrapped extra photos.");
  } else {
    console.log("Could not find start or end boundary.");
  }
}

