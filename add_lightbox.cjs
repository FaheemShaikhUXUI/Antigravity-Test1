const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

// 1. Rebuild Event Photos to include .photo-bg for zoom and data-img for lightbox
const eventDir = path.join(__dirname, "Photos/Event/Evergreen - December 2025");
let eventImages = [];
if (fs.existsSync(eventDir)) {
  eventImages = fs.readdirSync(eventDir).filter(f => f.endsWith(".JPG") || f.endsWith(".jpg"));
}

let eventGridHtml = "";
eventImages.forEach((img, idx) => {
  const imgSrc = `./Photos/Event/Evergreen - December 2025/${img}`;
  eventGridHtml += `
            <div class="photo-preview-box clickable-photo" data-index="${idx}" data-img="${imgSrc}" style="aspect-ratio: 1/1; position: relative; border-radius: 6px; overflow: hidden; cursor: pointer;">
              <div class="photo-bg" style="position: absolute; inset: 0; background: url('${imgSrc}') center/cover no-repeat; transition: transform 0.3s ease;"></div>
              <div style="position: absolute; bottom: 6px; right: 6px; display: flex; gap: 4px; z-index: 2;">
                <button class="action-btn lh-preview-btn" title="View" style="width: 20px; height: 20px; border-radius: 50%; background: #fff; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; padding: 0; pointer-events: none;">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                </button>
                <button class="action-btn lh-replace-btn" title="Replace" style="width: 20px; height: 20px; border-radius: 50%; background: #fff; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; padding: 0;">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                </button>
                <button class="action-btn lh-download-btn" title="Download" style="width: 20px; height: 20px; border-radius: 50%; background: #fff; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; padding: 0;">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                </button>
              </div>
            </div>`;
});

// Replace the inner content of subtab-photos-event grid
const gridStartPattern = `<div id="subtab-photos-event"`;
const gridStart = html.indexOf(gridStartPattern);
if (gridStart > -1) {
  const innerGridStart = html.indexOf(`class="photo-grid-inner"`, gridStart);
  const gridCloseStart = html.indexOf(`>`, innerGridStart) + 1;
  const gridCloseEnd = html.indexOf(`</div>`, gridCloseStart);
  html = html.substring(0, gridCloseStart) + "\n" + eventGridHtml + "\n          " + html.substring(gridCloseEnd);
}

// 2. Add Lightbox HTML
const lightboxHtml = `
  <!-- Photo Lightbox -->
  <div id="photoLightbox" class="lightbox-overlay hidden" style="position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 99999; display: flex; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transition: opacity 0.3s ease;">
    <div class="lightbox-content" style="position: relative; max-width: 90%; max-height: 90vh; border-radius: 16px; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center;">
      <button id="lightboxClose" style="position: absolute; top: 12px; right: 12px; width: 32px; height: 32px; border-radius: 50%; background: rgba(0,0,0,0.5); border: none; color: white; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 2;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
      <img id="lightboxImg" src="" alt="Preview" style="display: block; max-width: 100%; max-height: 90vh; border-radius: 16px; object-fit: contain;" />
      <div class="lightbox-controls" style="position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%); display: flex; align-items: center; gap: 12px; background: rgba(0,0,0,0.6); padding: 8px 16px; border-radius: 30px; z-index: 2;">
        <button id="lightboxPrev" style="background: transparent; border: none; color: white; cursor: pointer; display: flex; align-items: center; justify-content: center;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <button id="lightboxDownloadBtn" style="background: transparent; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #4ade80;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
        </button>
        <button id="lightboxNext" style="background: transparent; border: none; color: white; cursor: pointer; display: flex; align-items: center; justify-content: center;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>
    </div>
  </div>
`;

if (!html.includes('id="photoLightbox"')) {
  html = html.replace('</body>', lightboxHtml + '\n</body>');
}

// 3. Add Script for Lightbox Logic and Zoom CSS
const lightboxScript = `
  <style>
    .photo-preview-box:hover .photo-bg {
      transform: scale(1.1);
    }
    #photoLightbox.show {
      opacity: 1 !important;
      pointer-events: auto !important;
    }
  </style>
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      const photos = Array.from(document.querySelectorAll('.clickable-photo'));
      const lightbox = document.getElementById('photoLightbox');
      if (!lightbox) return;
      const lightboxImg = document.getElementById('lightboxImg');
      const closeBtn = document.getElementById('lightboxClose');
      const prevBtn = document.getElementById('lightboxPrev');
      const nextBtn = document.getElementById('lightboxNext');
      const downloadBtn = document.getElementById('lightboxDownloadBtn');
      
      let currentIndex = 0;

      function updateLightbox(index) {
        if (photos.length === 0) return;
        if (index < 0) index = photos.length - 1;
        if (index >= photos.length) index = 0;
        currentIndex = index;
        const imgUrl = photos[currentIndex].getAttribute('data-img');
        lightboxImg.src = imgUrl;
      }

      photos.forEach((photo, idx) => {
        photo.addEventListener('click', (e) => {
          // Ignore if clicked on replace button
          if (e.target.closest('.lh-replace-btn') || e.target.closest('.lh-download-btn')) return;
          
          currentIndex = idx;
          updateLightbox(currentIndex);
          lightbox.classList.add('show');
        });
      });

      closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('show');
      });

      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
          lightbox.classList.remove('show');
        }
      });

      prevBtn.addEventListener('click', () => {
        updateLightbox(currentIndex - 1);
      });

      nextBtn.addEventListener('click', () => {
        updateLightbox(currentIndex + 1);
      });

      downloadBtn.addEventListener('click', () => {
        const imgUrl = photos[currentIndex].getAttribute('data-img');
        const a = document.createElement('a');
        a.href = imgUrl;
        a.download = imgUrl.split('/').pop();
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
      
      document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('show')) return;
        if (e.key === 'Escape') lightbox.classList.remove('show');
        if (e.key === 'ArrowLeft') updateLightbox(currentIndex - 1);
        if (e.key === 'ArrowRight') updateLightbox(currentIndex + 1);
      });
    });
  </script>
`;

if (!html.includes('photo-preview-box:hover .photo-bg')) {
  html = html.replace('</body>', lightboxScript + '\n</body>');
}

fs.writeFileSync(indexPath, html, "utf8");
console.log("Added lightbox and zoom hover effect.");
