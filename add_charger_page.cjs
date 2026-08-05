
const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

// 1. Add Nav Tab
if (!html.includes(`data-tab="charger-branding"`)) {
  html = html.replace(
    `<button class="nav-tab" data-tab="vehicle-branding">Vehicle Branding</button>`,
    `<button class="nav-tab" data-tab="vehicle-branding">Vehicle Branding</button>\n        <button class="nav-tab" data-tab="charger-branding">Charger</button>`
  );
}

// 2. Extract Vehicle Branding Section
const vbStart = html.indexOf(`<section id="tab-vehicle-branding"`);
// Find the exact closing section tag
let vbEnd = html.indexOf(`</section>`, vbStart) + `</section>`.length;
let vbHtml = html.substring(vbStart, vbEnd);

// Make sure we didn`t stop early (if there are nested sections)
// But normally there are no nested sections here.

// 3. Modify for Charger
let chargerHtml = vbHtml.replace(`id="tab-vehicle-branding"`, `id="tab-charger-branding"`);
chargerHtml = chargerHtml.replace(`Vehicle Branding Guidelines`, `Charger Branding Guidelines`);

// Replace paragraphs
const oldIntroStart = chargerHtml.indexOf(`<div class="guidelines-description">`);
const oldIntroEnd = chargerHtml.indexOf(`</div>`, oldIntroStart);
const oldIntro = chargerHtml.substring(oldIntroStart, oldIntroEnd);

const newIntro = `<div class="guidelines-description">
            <p>Charging infrastructure is a key touchpoint of the Transvolt brand and plays an important role in representing the company's identity across client sites, depots, charging stations, and operational facilities. Every branded charger should reflect a consistent, professional, and high-quality brand image while complying with the official Transvolt Brand Guidelines. Whether installed at customer premises or Transvolt-operated facilities, charger branding should maintain uniformity, visibility, and durability.</p>
            <p>Since Transvolt deploys charging infrastructure from multiple OEMs (Original Equipment Manufacturers), the branding design may vary depending on the physical design, dimensions, panel structure, and mounting surfaces of each charger model. Even when the branding follows the same Transvolt Brand Guidelines, different OEM charger models may require different branding layouts, logo placements, graphic arrangements, and artwork to accommodate their unique design and construction. Therefore, always use the officially approved branding artwork specific to the OEM, charger model, and charger type. Do not interchange branding files between different OEMs or charger models, as doing so may result in improper fitting, incorrect brand representation, or non-compliance with installation standards.</p>
          `;

chargerHtml = chargerHtml.replace(oldIntro, newIntro);

// Replace "Vehicle Model" with "Charger Model"
chargerHtml = chargerHtml.replace(/>Vehicle Model (\d+)</g, `>Charger Model $1<`);
chargerHtml = chargerHtml.replace(/download="Vehicle_Model_(\d+)\.pdf"/g, `download="Charger_Model_$1.pdf"`);
chargerHtml = chargerHtml.replace(/download="Vehicle_Model_(\d+)\.jpg"/g, `download="Charger_Model_$1.jpg"`);

// 4. Append Charger Section
if (!html.includes(`id="tab-charger-branding"`)) {
  html = html.slice(0, vbEnd) + `\n\n      <!-- Official Charger Branding Section -->\n      ` + chargerHtml + html.slice(vbEnd);
}

// 5. Add Charger Checkbox to Permission Modal
if (!html.includes(`value="Charger Branding"`)) {
  html = html.replace(
    `<label class="section-check"><input type="checkbox" name="secPage" value="Vehicle Branding" /> <span>Vehicle Branding</span></label>`,
    `<label class="section-check"><input type="checkbox" name="secPage" value="Vehicle Branding" /> <span>Vehicle Branding</span></label>\n                    <label class="section-check"><input type="checkbox" name="secPage" value="Charger Branding" /> <span>Charger</span></label>`
  );
}

fs.writeFileSync(indexPath, html, "utf8");
console.log("Successfully added Charger Branding page.");

