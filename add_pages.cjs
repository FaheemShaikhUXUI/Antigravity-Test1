
const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

// 1. Add Navigation Tabs
if (!html.includes(`data-tab="brand-philosophy"`)) {
  html = html.replace(
    `<button class="nav-tab" data-tab="charger-branding">Charger</button>`,
    `<button class="nav-tab" data-tab="charger-branding">Charger</button>
        <button class="nav-tab" data-tab="brand-philosophy">Brand Philosophy</button>
        <button class="nav-tab" data-tab="photos">Photos</button>`
  );
}

// 2. Add Brand Philosophy Section
const brandPhilosophyHtml = `
      <!-- Brand Philosophy Section -->
      <section id="tab-brand-philosophy" class="tab-pane hidden-pane">
        <div class="guidelines-intro">
          <h2 class="section-title">Transvolt Brand Philosophy</h2>
          <div class="guidelines-description">
            <p>At Transvolt, our brand represents more than a logo or a visual identity—it reflects our purpose, values, and commitment to transforming the future of sustainable mobility. Every interaction with our brand should communicate trust, innovation, reliability, and operational excellence. Our philosophy is built on delivering intelligent electric mobility solutions that create long-term value for our clients, partners, employees, and the communities we serve.</p>
            <p>As a technology-driven organization, we believe that great design and consistent branding strengthen the confidence people place in our company. Every visual element—from our logo and typography to vehicle branding, charging infrastructure, digital assets, and printed materials—should consistently reflect the same standards of quality, professionalism, and innovation.</p>
            <p>Our brand identity is designed to be clean, modern, and purposeful, representing the values that define Transvolt. Consistency across every touchpoint ensures that our stakeholders experience a unified and recognizable brand, whether they interact with our website, mobile applications, fleet vehicles, charging stations, corporate documents, or marketing communications.</p>
            
            <h3 style="margin-top: 2rem; color: var(--title-color); font-size: 1.25rem;">Our Brand Principles</h3>
            <ul style="list-style: none; padding-left: 0; margin-top: 1rem; display: flex; flex-direction: column; gap: 1rem;">
              <li><strong style="color: var(--title-color); display: block; font-size: 1.05rem; margin-bottom: 0.25rem;">Innovation</strong><span style="color: var(--text-muted); line-height: 1.5;">We embrace technology and continuous improvement to shape the future of electric mobility.</span></li>
              <li><strong style="color: var(--title-color); display: block; font-size: 1.05rem; margin-bottom: 0.25rem;">Reliability</strong><span style="color: var(--text-muted); line-height: 1.5;">We build trust through dependable solutions, consistent service, and professional execution.</span></li>
              <li><strong style="color: var(--title-color); display: block; font-size: 1.05rem; margin-bottom: 0.25rem;">Sustainability</strong><span style="color: var(--text-muted); line-height: 1.5;">We are committed to enabling cleaner transportation and supporting a more sustainable future.</span></li>
              <li><strong style="color: var(--title-color); display: block; font-size: 1.05rem; margin-bottom: 0.25rem;">Consistency</strong><span style="color: var(--text-muted); line-height: 1.5;">Every brand touchpoint should communicate a unified visual identity and a consistent customer experience.</span></li>
              <li><strong style="color: var(--title-color); display: block; font-size: 1.05rem; margin-bottom: 0.25rem;">Quality</strong><span style="color: var(--text-muted); line-height: 1.5;">We maintain high standards in everything we create, from digital experiences to physical branding assets.</span></li>
              <li><strong style="color: var(--title-color); display: block; font-size: 1.05rem; margin-bottom: 0.25rem;">Integrity</strong><span style="color: var(--text-muted); line-height: 1.5;">We communicate honestly, act responsibly, and uphold the values that define the Transvolt brand.</span></li>
              <li><strong style="color: var(--title-color); display: block; font-size: 1.05rem; margin-bottom: 0.25rem;">Customer Focus</strong><span style="color: var(--text-muted); line-height: 1.5;">We design our solutions and experiences around the needs of our clients, partners, and end users.</span></li>
            </ul>

            <h3 style="margin-top: 2rem; color: var(--title-color); font-size: 1.25rem;">Our Commitment</h3>
            <p style="margin-top: 1rem;">The Transvolt brand is one of our most valuable assets. Every employee, partner, vendor, and stakeholder shares the responsibility of protecting and representing it correctly. By following these Brand Guidelines and using only approved assets, we ensure that every communication consistently reflects who we are and what we stand for.</p>
            <p>A strong and consistent brand builds recognition, inspires confidence, and reinforces Transvolt's position as a trusted leader in electric mobility solutions. Every asset, every communication, and every interaction should contribute to that vision, ensuring the Transvolt brand remains recognizable, professional, and respected across all platforms and environments.</p>
          </div>
        </div>
      </section>
`;

// 3. Add Photos Section
let photosGridHtml = "";
for (let i = 1; i <= 20; i++) {
  photosGridHtml += `
              <div class="lh-asset-box photo-preview-box" style="aspect-ratio: 1/1; position: relative; padding: 0; overflow: hidden; border-radius: 4px; display: flex; align-items: center; justify-content: center; background: #e2e8f0; color: #94a3b8; font-size: 0.75rem;">
                Photo ${i}
                <div class="lh-asset-actions" style="position: absolute; inset: 0; background: rgba(0,0,0,0.5); opacity: 0; display: flex; align-items: center; justify-content: center; gap: 4px; transition: opacity 0.2s; pointer-events: none;">
                  <button class="action-btn btn-info lh-preview-btn" title="Preview" style="padding: 4px;"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></button>
                  <button class="action-btn btn-replace lh-replace-btn" title="Replace" style="padding: 4px;"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg></button>
                  <button class="action-btn btn-download lh-download-btn" title="Download" style="padding: 4px;"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg></button>
                </div>
              </div>
  `;
}

const photosHtml = `
      <!-- Photos Section -->
      <section id="tab-photos" class="tab-pane hidden-pane">
        <div class="guidelines-intro">
          <h2 class="section-title">Photo Gallery</h2>
          <div class="guidelines-description">
            <p>The Photo Gallery serves as the central repository for all official Transvolt photographs captured across corporate events, project milestones, business operations, employee engagement activities, site visits, vehicle deployments, charging infrastructure, client interactions, training programs, exhibitions, and other company initiatives. It provides a well-organized collection of high-quality images that can be accessed by authorized users for future reference and official business use.</p>
            <p>This repository enables employees, HR, Marketing, Corporate Communications, stakeholders, and other authorized teams to quickly locate approved photographs for presentations, social media, company profiles, annual reports, internal communications, recruitment campaigns, event documentation, and other business requirements. Maintaining a centralized photo library ensures consistency, eliminates duplicate storage, and preserves valuable company memories in a structured and searchable format.</p>
            <p>All photographs uploaded to the gallery should be official, high-resolution, and accurately categorized with relevant details such as the event name, date, location, department, project, or business unit. This helps users easily search and retrieve images whenever required.</p>
          </div>
        </div>

        <div class="lh-card lh-card-general" style="margin-top: 1.5rem;">
          <div class="lh-card-header" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; margin-bottom: 1.25rem;">
            <div class="lh-title-wrapper" style="display: flex; flex-direction: column; gap: 0.25rem;">
              <h3 class="lh-title" style="margin: 0; font-weight: 700; font-size: 1.15rem;">Event Name</h3>
              <span style="color: var(--text-muted); font-size: 0.85rem;">Date: 14 August 2025</span>
            </div>
            <button class="btn-lh-all">
              <svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Download All
            </button>
          </div>

          <!-- Light Gray Tile inside -->
          <div style="background: var(--bg-input); padding: 1.25rem; border-radius: var(--border-radius-md); border: 1px solid var(--border-color);">
            <div style="display: grid; grid-template-columns: repeat(10, 1fr); gap: 0.5rem;" class="photo-grid-inner">
              ${photosGridHtml}
            </div>
            
            <div style="text-align: center; margin-top: 1.25rem;">
              <button class="btn-primary" style="padding: 0.5rem 1rem; font-size: 0.85rem; border-radius: 4px; border: none; cursor: pointer;">
                Show More Photos
              </button>
            </div>
          </div>
        </div>
      </section>
`;

if (!html.includes(`id="tab-brand-philosophy"`)) {
  const injectionPoint = html.indexOf(`</main>`);
  html = html.slice(0, injectionPoint) + brandPhilosophyHtml + photosHtml + "\n  " + html.slice(injectionPoint);
}

// 4. Update CSS for photo hover
const stylePath = path.join(__dirname, "style.css");
let styleCss = fs.readFileSync(stylePath, "utf8");

if (!styleCss.includes(`.photo-preview-box:hover .lh-asset-actions`)) {
  styleCss += `\n.photo-preview-box:hover .lh-asset-actions { opacity: 1 !important; pointer-events: auto !important; }\n`;
  styleCss += `\n@media (max-width: 1200px) { .photo-grid-inner { grid-template-columns: repeat(8, 1fr) !important; } }\n`;
  styleCss += `@media (max-width: 992px) { .photo-grid-inner { grid-template-columns: repeat(6, 1fr) !important; } }\n`;
  styleCss += `@media (max-width: 768px) { .photo-grid-inner { grid-template-columns: repeat(4, 1fr) !important; } }\n`;
  styleCss += `@media (max-width: 480px) { .photo-grid-inner { grid-template-columns: repeat(3, 1fr) !important; } }\n`;
  fs.writeFileSync(stylePath, styleCss, "utf8");
}

// 5. Add Checkboxes
if (!html.includes(`value="Brand Philosophy"`)) {
  html = html.replace(
    `<label class="section-check"><input type="checkbox" name="secPage" value="Charger Branding" /> <span>Charger</span></label>`,
    `<label class="section-check"><input type="checkbox" name="secPage" value="Charger Branding" /> <span>Charger</span></label>
                    <label class="section-check"><input type="checkbox" name="secPage" value="Brand Philosophy" /> <span>Brand Philosophy</span></label>
                    <label class="section-check"><input type="checkbox" name="secPage" value="Photos" /> <span>Photos</span></label>`
  );
}

fs.writeFileSync(indexPath, html, "utf8");
console.log("Successfully added Brand Philosophy and Photos pages.");

