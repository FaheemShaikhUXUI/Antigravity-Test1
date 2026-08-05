
const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

const oldModal = `<div class="modal-content" style="max-width: 500px;">
      <button class="modal-close" onclick="document.getElementById('modal-create-gallery').classList.remove('active')">&times;</button>
      <div class="modal-header">
        <h3 class="modal-title">Create Gallery</h3>
        <p class="modal-subtitle">Create a new photo gallery in a specific category.</p>
      </div>`;

const newModal = `<div class="modal-card" style="max-width: 500px;">
      <div class="modal-header" style="position: relative;">
        <div>
          <h3 class="modal-title" style="margin-bottom: 0.25rem;">Create Gallery</h3>
          <p class="modal-subtitle">Create a new photo gallery in a specific category.</p>
        </div>
        <button class="modal-close-btn" onclick="document.getElementById('modal-create-gallery').classList.remove('active')" aria-label="Close modal">&times;</button>
      </div>`;

if (html.includes(oldModal)) {
  html = html.replace(oldModal, newModal);
  fs.writeFileSync(indexPath, html, "utf8");
  console.log("Fixed gallery modal HTML.");
} else {
  console.log("Could not find the target string.");
}

