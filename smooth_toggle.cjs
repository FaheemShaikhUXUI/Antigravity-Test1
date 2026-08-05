
const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

// 1. Remove the old hidden-photo classes
html = html.replace(/hidden-photo collapsible-photo"/g, `"`);

// 2. Wrap data-index 10 through 19
// Find data-index="10"
const startIdx10 = html.indexOf(`<div class="photo-preview-box clickable-photo" data-index="10"`);
if (startIdx10 !== -1) {
  // Find where data-index="19" block ends
  const startIdx19 = html.indexOf(`<div class="photo-preview-box clickable-photo" data-index="19"`, startIdx10);
  const endIdx19 = html.indexOf(`</div>\n              </div>\n          <div style="display: flex; justify-content: flex-end; margin-top: 1.5rem; grid-column: 1 / -1;">`, startIdx19);
  
  // We just need to find the exact end of data-index="19" photo-preview-box.
  // The structure is `<div class="photo-preview-box..."> <div class="photo-bg"...></div> <div class="logo-actions..."><button...</button><button...</button></div></div>`
  // An easier way is just matching up to the button wrapper:
  const btnWrapperIdx = html.indexOf(`<div style="display: flex; justify-content: flex-end; margin-top: 1.5rem; grid-column: 1 / -1;">`, startIdx10);
  
  if (btnWrapperIdx !== -1) {
    const originalPhotos = html.substring(startIdx10, btnWrapperIdx);
    
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
    
    html = html.substring(0, startIdx10) + wrappedPhotos + html.substring(btnWrapperIdx);
    console.log("Wrapped photos 10-19 in collapsible wrapper.");
  }
}

// 3. Update the togglePhotos function
const oldScript = /window\.togglePhotos = function\(btn\) \{[\s\S]*?<\/script>/;
const newScript = `window.togglePhotos = function(btn) {
      const container = btn.closest(".lh-card-general").querySelector(".photo-grid-inner");
      const wrapper = container.querySelector(".collapsible-wrapper");
      const isExpanded = btn.classList.contains("expanded");
      
      if (isExpanded) {
        wrapper.style.gridTemplateRows = "0fr";
        wrapper.style.opacity = "0";
        setTimeout(() => { if (!btn.classList.contains("expanded")) wrapper.style.pointerEvents = "none"; }, 400);
        btn.classList.remove("expanded");
        btn.innerHTML = \`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg> Show More\`;
      } else {
        wrapper.style.pointerEvents = "auto";
        wrapper.style.gridTemplateRows = "1fr";
        wrapper.style.opacity = "1";
        btn.classList.add("expanded");
        btn.innerHTML = \`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg> Show Less\`;
      }
    };
  </script>`;

html = html.replace(oldScript, newScript);

fs.writeFileSync(indexPath, html, "utf8");
console.log("Updated index.html for smooth toggle.");

