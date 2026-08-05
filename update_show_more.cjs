
const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

// 1. Update the hidden photos to have "collapsible-photo" class as well
html = html.replace(/hidden-photo"/g, `hidden-photo collapsible-photo"`);

// 2. Update the button
const oldBtnRegex = /<button class="btn-lh-all" style="padding: 0\.35rem[^>]*>[\s\S]*?<\/button>/;
const newBtn = `<button class="btn-lh-all" style="padding: 0.35rem 0.85rem; border-radius: 6px; font-weight: 600; font-size: 0.75rem; display: flex; align-items: center; gap: 0.4rem; cursor: pointer; transition: all 0.2s ease;" onclick="togglePhotos(this)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              Show More
            </button>`;

if (html.match(oldBtnRegex)) {
  html = html.replace(oldBtnRegex, newBtn);
  
  // 3. Add the toggle script before </body>
  const toggleScript = `
  <script>
    window.togglePhotos = function(btn) {
      const container = btn.closest(".photo-grid-inner");
      const photos = container.querySelectorAll(".collapsible-photo");
      const isExpanded = btn.classList.contains("expanded");
      
      if (isExpanded) {
        photos.forEach(el => el.classList.add("hidden-photo"));
        btn.classList.remove("expanded");
        btn.innerHTML = \`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg> Show More\`;
      } else {
        photos.forEach(el => el.classList.remove("hidden-photo"));
        btn.classList.add("expanded");
        btn.innerHTML = \`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg> Show Less\`;
      }
    };
  </script>
</body>`;
  html = html.replace("</body>", toggleScript);
  
  fs.writeFileSync(indexPath, html, "utf8");
  console.log("Updated button logic.");
} else {
  console.log("Could not find button to replace.");
}

