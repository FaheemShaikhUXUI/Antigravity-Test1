const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

const startIdx = html.indexOf(`<section id="tab-photos"`);
const endIdx = html.indexOf(`</section>`, startIdx) + `</section>`.length;
let photosHtml = html.substring(startIdx, endIdx);

// Find the end of the intro part
const introEnd = photosHtml.indexOf(`</div>\r\n        </div>`) > -1 
  ? photosHtml.indexOf(`</div>\r\n        </div>`) + `</div>\r\n        </div>`.length 
  : photosHtml.indexOf(`</div>\n        </div>`) + `</div>\n        </div>`.length;

const introPart = photosHtml.substring(0, introEnd);

// Extract the three cards, but drop the <h3> titles we added in the previous step
const cards = [];
let currentIndex = introEnd;
for(let i=0; i<3; i++) {
  const cardStart = photosHtml.indexOf(`<div class="lh-card lh-card-general"`, currentIndex);
  if(cardStart === -1) break;
  // find the end of the card
  let nested = 0;
  let cardEnd = cardStart;
  while(cardEnd < photosHtml.length) {
    if(photosHtml.substring(cardEnd).startsWith("<div")) {
      nested++;
      cardEnd += 4;
    } else if (photosHtml.substring(cardEnd).startsWith("</div")) {
      nested--;
      cardEnd += 6;
      if(nested === 0) {
        break;
      }
    } else {
      cardEnd++;
    }
  }
  cards.push(photosHtml.substring(cardStart, cardEnd));
  currentIndex = cardEnd;
}

if(cards.length !== 3) {
  console.log("Could not find exactly 3 cards. Found: " + cards.length);
  process.exit(1);
}

// Now wrap them in the new structure
const newPhotosHtml = `${introPart}

        <div class="sub-nav-container" style="display: flex; gap: 2.5rem; border-bottom: 2px solid #e2e8f0; margin-top: 2.5rem; margin-bottom: 2.5rem;">
          <button class="sub-nav-tab active" data-subtab="photos-event" style="background: transparent; border: none; font-size: 1.15rem; font-family: var(--font-heading); font-weight: 500; color: #3b82f6; padding: 0.75rem 0.25rem; position: relative; cursor: pointer; border-bottom: 2px solid #3b82f6; margin-bottom: -2px;">Event</button>
          <button class="sub-nav-tab" data-subtab="photos-site" style="background: transparent; border: none; font-size: 1.15rem; font-family: var(--font-heading); font-weight: 500; color: #94a3b8; padding: 0.75rem 0.25rem; position: relative; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -2px; transition: color 0.2s;">Site</button>
          <button class="sub-nav-tab" data-subtab="photos-employee" style="background: transparent; border: none; font-size: 1.15rem; font-family: var(--font-heading); font-weight: 500; color: #94a3b8; padding: 0.75rem 0.25rem; position: relative; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -2px; transition: color 0.2s;">Employee</button>
        </div>

        <div id="subtab-photos-event" class="sub-tab-pane" style="display: block;">
          ${cards[0]}
        </div>

        <div id="subtab-photos-site" class="sub-tab-pane" style="display: none;">
          ${cards[1]}
        </div>

        <div id="subtab-photos-employee" class="sub-tab-pane" style="display: none;">
          ${cards[2]}
        </div>
      </section>`;

html = html.substring(0, startIdx) + newPhotosHtml + html.substring(endIdx);

// Append the script for the sub-tabs logic right before </body>
const scriptLogic = `
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      const subTabs = document.querySelectorAll(".sub-nav-tab");
      const subPanes = document.querySelectorAll(".sub-tab-pane");

      subTabs.forEach(tab => {
        tab.addEventListener("click", () => {
          // Reset all tabs
          subTabs.forEach(t => {
            t.style.color = "#94a3b8";
            t.style.borderBottom = "2px solid transparent";
            t.classList.remove("active");
          });
          
          // Set active tab
          tab.style.color = "#3b82f6";
          tab.style.borderBottom = "2px solid #3b82f6";
          tab.classList.add("active");

          // Hide all panes
          subPanes.forEach(p => p.style.display = "none");

          // Show target pane
          const targetId = tab.getAttribute("data-subtab");
          const targetPane = document.getElementById("subtab-" + targetId);
          if (targetPane) {
            targetPane.style.display = "block";
          }
        });
      });
    });
  </script>
`;

if (!html.includes('data-subtab="photos-event"')) {
  // It is already included in newPhotosHtml, so this check is just for the script
}

if (!html.includes('const subTabs = document.querySelectorAll(".sub-nav-tab");')) {
  html = html.replace("</body>", scriptLogic + "\n</body>");
}

fs.writeFileSync(indexPath, html, "utf8");
console.log("Sub-tabs created successfully.");
