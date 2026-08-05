
const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

const scriptStartPattern = `const lightboxImg = document.getElementById('lightboxImg');`;
const oldScriptStartIdx = html.indexOf(scriptStartPattern);

if (oldScriptStartIdx !== -1) {
  const scriptTagStart = html.lastIndexOf(`<script>`, oldScriptStartIdx);
  const scriptTagEnd = html.indexOf(`</script>`, oldScriptStartIdx) + 9;
  
  const newScript = `<script>
    document.addEventListener("DOMContentLoaded", () => {
      const photos = Array.from(document.querySelectorAll(".clickable-photo"));
      const lightbox = document.getElementById("photoLightbox");
      if (!lightbox) return;
      const lightboxImg = document.getElementById("lightboxImg");
      const closeBtn = document.getElementById("lightboxClose");
      const prevBtn = document.getElementById("lightboxPrev");
      const nextBtn = document.getElementById("lightboxNext");
      const downloadBtn = document.getElementById("lightboxDownloadBtn");
      
      let currentIndex = 0;
      let zoomScale = 1;
      let translateX = 0;
      let translateY = 0;
      let isDragging = false;
      let startX = 0, startY = 0;

      function applyTransform() {
        lightboxImg.style.transform = \`translate(\${translateX}px, \${translateY}px) scale(\${zoomScale})\`;
      }

      function updateLightbox(index) {
        if (photos.length === 0) return;
        if (index < 0) index = photos.length - 1;
        if (index >= photos.length) index = 0;
        currentIndex = index;
        const imgUrl = photos[currentIndex].getAttribute("data-img");
        
        zoomScale = 1;
        translateX = 0;
        translateY = 0;
        lightboxImg.style.transformOrigin = "0 0";
        lightboxImg.style.cursor = "default";
        lightboxImg.style.transition = "none";
        applyTransform();
        
        lightboxImg.src = imgUrl;
      }

      photos.forEach((photo, idx) => {
        photo.addEventListener("click", (e) => {
          if (e.target.closest(".lh-replace-btn") || e.target.closest(".lh-download-btn")) return;
          currentIndex = idx;
          updateLightbox(currentIndex);
          lightbox.classList.add("show");
        });
      });

      closeBtn.addEventListener("click", () => {
        lightbox.classList.remove("show");
      });

      lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
          lightbox.classList.remove("show");
        }
      });

      prevBtn.addEventListener("click", () => updateLightbox(currentIndex - 1));
      nextBtn.addEventListener("click", () => updateLightbox(currentIndex + 1));

      downloadBtn.addEventListener("click", () => {
        const imgUrl = photos[currentIndex].getAttribute("data-img");
        const a = document.createElement("a");
        a.href = imgUrl;
        a.download = imgUrl.split("/").pop();
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
      
      document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("show")) return;
        if (e.key === "Escape") lightbox.classList.remove("show");
        if (e.key === "ArrowLeft") updateLightbox(currentIndex - 1);
        if (e.key === "ArrowRight") updateLightbox(currentIndex + 1);
      });

      // Zoom on Scroll (Max 500%)
      lightboxImg.addEventListener("wheel", (e) => {
        e.preventDefault();
        
        const rect = lightboxImg.getBoundingClientRect();
        // Mouse coordinates relative to the top-left of the visual image bounds
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const prevScale = zoomScale;
        
        if (e.deltaY < 0) {
          zoomScale = Math.min(5, zoomScale + 0.2); // Up to 500%
        } else {
          zoomScale = Math.max(1, zoomScale - 0.2); // Down to 100%
        }
        
        // Calculate how much the point under the mouse moved due to scaling
        const dx = x * (zoomScale / prevScale) - x;
        const dy = y * (zoomScale / prevScale) - y;
        
        translateX -= dx;
        translateY -= dy;
        
        // If zoom is back to 1x, reset completely for safety
        if (zoomScale === 1) {
          translateX = 0;
          translateY = 0;
        }
        
        lightboxImg.style.transition = "transform 0.1s ease-out";
        applyTransform();
        
        lightboxImg.style.cursor = zoomScale > 1 ? "grab" : "default";
      });

      // Panning Logic
      lightboxImg.addEventListener("mousedown", (e) => {
        if (zoomScale > 1) {
          isDragging = true;
          startX = e.clientX - translateX;
          startY = e.clientY - translateY;
          lightboxImg.style.cursor = "grabbing";
          lightboxImg.style.transition = "none";
          e.preventDefault();
        }
      });

      window.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        applyTransform();
      });

      window.addEventListener("mouseup", () => {
        if (isDragging) {
          isDragging = false;
          lightboxImg.style.cursor = zoomScale > 1 ? "grab" : "default";
        }
      });
    });
  </script>`;
  
  html = html.substring(0, scriptTagStart) + newScript + html.substring(scriptTagEnd);
  fs.writeFileSync(indexPath, html, "utf8");
  console.log("Updated zoom and pan logic.");
} else {
  console.log("Could not find script block to replace.");
}

