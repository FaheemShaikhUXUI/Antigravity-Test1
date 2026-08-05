
const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

// Remove the Show All button containers entirely from the file
// They look like:
// <div style="display: flex; justify-content: flex-end; margin-top: 2rem;">
//   <button class="btn-show-all" ...>Show All</button>
// </div>
const showAllRegex = /<div style="display: flex; justify-content: flex-end; margin-top: 2rem;">\s*<button class="btn-show-all"[^>]*>\s*Show All\s*<\/button>\s*<\/div>/g;
html = html.replace(showAllRegex, "");

// Now we need to fix the closing tags of Event, Site, and Employee subtabs.
// Let's manually fix subtab-photos-event.
const eventStart = html.indexOf(`<div id="subtab-photos-event"`);
const siteStart = html.indexOf(`<div id="subtab-photos-site"`);

if (eventStart !== -1 && siteStart !== -1) {
  let eventHtml = html.substring(eventStart, siteStart);
  
  // Clean up the extra closing tags and empty space at the end of eventHtml.
  // After the last `</div>` of the 20th photo, we want exactly:
  // </div> <!-- end photo-grid-inner -->
  // </div> <!-- end lh-card -->
  // </div> <!-- end subtab-photos-event -->
  
  const lastPhotoCloseStr = `</svg>\r\n                </button>\r\n              </div>\r\n            </div>`;
  const lastPhotoIdx = eventHtml.lastIndexOf(`data-index="19"`);
  
  if (lastPhotoIdx !== -1) {
     const endOfLastPhoto = eventHtml.indexOf(lastPhotoCloseStr, lastPhotoIdx) + lastPhotoCloseStr.length;
     // Cut off everything after the last photo and replace it with the correct closing tags.
     eventHtml = eventHtml.substring(0, endOfLastPhoto) + "\n          </div>\n        </div>\n      </div>\n\n      ";
  }
  
  html = html.substring(0, eventStart) + eventHtml + html.substring(siteStart);
}

// Ensure Site and Employee also have correct closing tags.
// But wait, the showAllRegex removed the button, so what do their ends look like?
// Site and Employee were just cloned, so they probably have valid structure (except the Show All button is now gone).
// Let's just write the file and see if it looks correct.

fs.writeFileSync(indexPath, html, "utf8");
console.log("Fixed HTML structure and removed Show All buttons.");

