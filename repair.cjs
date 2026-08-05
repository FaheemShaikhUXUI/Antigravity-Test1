
const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

const target = `<span class="header-update-date">Updated Date: 13/07/2025</span>
          <input type="text" id="searchInput"`;

const replacement = `<span class="header-update-date">Updated Date: 13/07/2025</span>
      </div>
    </header>

    <!-- Navigation & Search Bar -->
    <nav class="nav-bar">
      <div class="nav-tabs-container" id="navTabs">
        <button class="nav-tab active" data-tab="logo-color">Logo & Color</button>
        <button class="nav-tab" data-tab="typography">Typography</button>
        <button class="nav-tab" data-tab="letterhead">Letterhead</button>
        <button class="nav-tab" data-tab="presentation">Presentation</button>
        <button class="nav-tab" data-tab="digital-assets">Digital</button>
        <button class="nav-tab" data-tab="print-assets">Print</button>
        <button class="nav-tab" data-tab="vehicle-branding">Vehicle</button>
        <button class="nav-tab" data-tab="charger-branding">Charger</button>
      </div>

      <div class="nav-right-actions">
        <div class="search-input-wrapper">
          <input type="text" id="searchInput"`;

if (html.includes(target)) {
  html = html.replace(target, replacement);
  fs.writeFileSync(indexPath, html, "utf8");
  console.log("Repaired successfully.");
} else {
  console.log("Target not found. Looking with regex...");
  const regex = /<span class="header-update-date">Updated Date: 13\/07\/2025<\/span>\s*<input type="text" id="searchInput"/;
  if (regex.test(html)) {
    html = html.replace(regex, replacement);
    fs.writeFileSync(indexPath, html, "utf8");
    console.log("Repaired successfully with regex.");
  } else {
    console.log("Still not found.");
  }
}

