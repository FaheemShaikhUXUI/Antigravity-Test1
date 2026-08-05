const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

// Rebuild event grid HTML
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

// We want to replace the first `photo-grid-inner` completely
const gridStartIdx = html.indexOf(`class="photo-grid-inner"`);
if (gridStartIdx !== -1) {
  const divStart = html.lastIndexOf(`<div`, gridStartIdx);
  const divContentStart = html.indexOf(`>`, gridStartIdx) + 1;
  
  let nested = 1;
  let cursor = divContentStart;
  while(cursor < html.length && nested > 0) {
    const nextDivOpen = html.indexOf(`<div`, cursor);
    const nextDivClose = html.indexOf(`</div`, cursor);
    if (nextDivClose === -1) break;
    
    if (nextDivOpen !== -1 && nextDivOpen < nextDivClose) {
      nested++;
      cursor = nextDivOpen + 4;
    } else {
      nested--;
      cursor = nextDivClose + 6;
      if (nested === 0) {
        cursor = nextDivClose; // point at `<` of `</div>`
        break;
      }
    }
  }

  html = html.substring(0, divContentStart) + "\n" + eventGridHtml + "\n          " + html.substring(cursor);
}

const scriptPattern = `const lightboxImg = document.getElementById('lightboxImg');`;
const oldScriptStartIdx = html.indexOf(scriptPattern);

if (oldScriptStartIdx !== -1) {
  const scriptTagStart = html.lastIndexOf(`<script>`, oldScriptStartIdx);
  const scriptTagEnd = html.indexOf(`</script>`, oldScriptStartIdx) + 9;
  
  const newScript = `<script>
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
      let zoomScale = 1;

      function updateLightbox(index) {
        if (photos.length === 0) return;
        if (index < 0) index = photos.length - 1;
        if (index >= photos.length) index = 0;
        currentIndex = index;
        const imgUrl = photos[currentIndex].getAttribute('data-img');
        
        zoomScale = 1;
        lightboxImg.style.transform = "scale(1)";
        lightboxImg.src = imgUrl;
      }

      photos.forEach((photo, idx) => {
        photo.addEventListener('click', (e) => {
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

      prevBtn.addEventListener('click', () => updateLightbox(currentIndex - 1));
      nextBtn.addEventListener('click', () => updateLightbox(currentIndex + 1));

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

      // Zoom on Scroll
      lightboxImg.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (e.deltaY < 0) {
          zoomScale = Math.min(3, zoomScale + 0.1);
        } else {
          zoomScale = Math.max(0.5, zoomScale - 0.1);
        }
        lightboxImg.style.transform = "scale(" + zoomScale + ")";
        lightboxImg.style.transition = "transform 0.1s ease-out";
      });
    });
  </script>`;
  
  html = html.substring(0, scriptTagStart) + newScript + html.substring(scriptTagEnd);
}

fs.writeFileSync(indexPath, html, "utf8");
console.log("Fixed grid and added scroll zoom.");
