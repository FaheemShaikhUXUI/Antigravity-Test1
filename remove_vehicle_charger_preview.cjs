
const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

// Get the bounds for Vehicle and Charger tabs
const vehicleStart = html.indexOf(`<section id="tab-vehicle-branding"`);
const chargerStart = html.indexOf(`<section id="tab-charger-branding"`);
const afterChargerEnd = html.indexOf(`</section>`, chargerStart); // Roughly the end of the charger section

if (vehicleStart !== -1 && chargerStart !== -1 && afterChargerEnd !== -1) {
  let sectionHtml = html.substring(vehicleStart, afterChargerEnd + 10);
  
  // We want to remove all <button class="action-btn btn-info lh-preview-btn"...> blocks from this section.
  
  let modifiedSection = sectionHtml;
  let startIndex = 0;
  let count = 0;

  while(true) {
    const searchStr = `<button class="action-btn btn-info lh-preview-btn"`;
    let btnStart = modifiedSection.indexOf(searchStr, startIndex);
    if (btnStart === -1) {
      break;
    }
    
    let btnEndTag = modifiedSection.indexOf(`</button>`, btnStart);
    if (btnEndTag === -1) break;
    
    btnEndTag += `</button>`.length;
    
    modifiedSection = modifiedSection.substring(0, btnStart) + modifiedSection.substring(btnEndTag);
    count++;
  }
  
  html = html.substring(0, vehicleStart) + modifiedSection + html.substring(afterChargerEnd + 10);
  fs.writeFileSync(indexPath, html, "utf8");
  console.log(`Removed ${count} View/Preview icons from Vehicle and Charger pages.`);
} else {
  console.log("Could not find Vehicle or Charger tabs.");
}

