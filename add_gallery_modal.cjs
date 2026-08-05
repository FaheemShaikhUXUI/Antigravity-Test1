
const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

const modalHtml = `
  <!-- Create Gallery Modal -->
  <div class="modal-overlay" id="modal-create-gallery">
    <div class="modal-content" style="max-width: 500px;">
      <button class="modal-close" onclick="document.getElementById('modal-create-gallery').classList.remove('active')">&times;</button>
      <div class="modal-header">
        <h3 class="modal-title">Create Gallery</h3>
        <p class="modal-subtitle">Create a new photo gallery in a specific category.</p>
      </div>
      <div class="modal-body">
        <form class="login-form" id="create-gallery-form" onsubmit="event.preventDefault(); document.getElementById('modal-create-gallery').classList.remove('active');">
          <div class="form-group">
            <label>Gallery Name <span class="req">*</span></label>
            <input type="text" placeholder="e.g. Evergreen - December 2025" required>
          </div>
          <div class="form-group">
            <label>Date <span class="req">*</span></label>
            <input type="date" required style="width:100%; padding: 0.75rem 1rem; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color); background: var(--bg-page); color: var(--text-main); font-family: var(--font-body); font-size: 0.925rem; outline: none; transition: all 0.2s ease;">
          </div>
          <div class="form-group">
            <label>Category <span class="req">*</span></label>
            <select required style="width:100%; padding: 0.75rem 1rem; border-radius: var(--border-radius-sm); border: 1px solid var(--border-color); background: var(--bg-page); color: var(--text-main); font-family: var(--font-body); font-size: 0.925rem; outline: none; transition: all 0.2s ease;">
              <option value="Event">Event</option>
              <option value="Site">Site</option>
              <option value="Employee">Employee</option>
            </select>
          </div>
          <div class="form-group">
            <label>Upload Photos <span class="req">*</span></label>
            <div style="border: 2px dashed var(--border-color); border-radius: 8px; padding: 2rem; text-align: center; background: var(--bg-input); cursor: pointer; transition: all 0.2s ease;" onmouseover="this.style.borderColor='var(--color-primary)'" onmouseout="this.style.borderColor='var(--border-color)'">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--text-muted); margin-bottom: 0.5rem;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
              <p style="margin: 0; font-size: 0.9rem; color: var(--title-color); font-weight: 600;">Click to upload or drag and drop</p>
              <p style="margin: 0; font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem;">SVG, PNG, JPG or GIF (max. 10MB)</p>
            </div>
          </div>
          <div class="login-actions" style="margin-top: 1.5rem; justify-content: flex-end;">
            <button type="button" class="btn-secondary" onclick="document.getElementById('modal-create-gallery').classList.remove('active')" style="width: auto;">Cancel</button>
            <button type="submit" class="btn-primary" style="width: auto;">Create Gallery</button>
          </div>
        </form>
      </div>
    </div>
  </div>
`;

if (!html.includes("id=\"modal-create-gallery\"")) {
  // Insert before closing body tag
  html = html.replace("</body>", modalHtml + "\n</body>");
  fs.writeFileSync(indexPath, html, "utf8");
  console.log("Added Create Gallery modal.");
} else {
  console.log("Modal already exists.");
}

