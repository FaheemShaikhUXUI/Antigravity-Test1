
const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

// Find the end of the Event photos grid
const lastPhotoStr = `data-index="19" data-img="./Photos/Event/Evergreen - December 2025/_T3A7880.JPG"`;
const lastPhotoIdx = html.indexOf(lastPhotoStr);

if (lastPhotoIdx !== -1) {
  // Find the closing </div> of this last photo
  let cursor = lastPhotoIdx;
  let nested = 1;
  const divContentStart = html.indexOf(`>`, cursor) + 1;
  cursor = divContentStart;
  
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
        cursor = nextDivClose + 6; // Include the closing </div> itself
        break;
      }
    }
  }
  
  // cursor is now right after the </div> of the last clickable photo.
  // The next thing should be the closing </div> of the photo-grid-inner.
  const endOfGrid = html.indexOf(`</div>`, cursor) + 6;
  
  // Now find the start of the next section (Site tab)
  const nextSectionStr = `<div id="subtab-photos-site"`;
  const nextSectionIdx = html.indexOf(nextSectionStr, endOfGrid);
  
  if (nextSectionIdx !== -1) {
    // Cut out everything between endOfGrid and nextSectionIdx
    // EXCEPT we need to make sure we don't delete the closing tags of the Event tab itself if they are in between.
    // Wait, the Event tab has:
    // <div id="subtab-photos-event"> ... <div class="photo-grid-inner"> ... </div> </div> </div>
    // Let's just look at what's immediately before nextSectionIdx.
    // It should be the closing </div>s of subtab-photos-event and lh-card.
    
    // Instead of parsing, let's use a regex to remove all orphaned <div class="photo-preview-box">...</div> blocks.
    // An orphaned block DOES NOT have `clickable-photo`.
    
    let modifiedHtml = html;
    let count = 0;
    
    // We only want to remove these from the subtab-photos-event section.
    const eventTabStart = html.indexOf(`<div id="subtab-photos-event"`);
    const siteTabStart = html.indexOf(`<div id="subtab-photos-site"`);
    
    let eventHtml = html.substring(eventTabStart, siteTabStart);
    
    // Replace all non-clickable photo-preview-box in eventHtml
    const regex = /<div class="photo-preview-box"(?! clickable-photo)[^>]*>[\s\S]*?<\/button>\s*<\/div>\s*<\/div>/g;
    
    eventHtml = eventHtml.replace(regex, () => {
      count++;
      return "";
    });
    
    // wait, what if the regex doesn't match perfectly? 
    // Let's just use string replacement in a loop.
    let searchIdx = 0;
    while(true) {
       let start = eventHtml.indexOf(`<div class="photo-preview-box" style="aspect-ratio`, searchIdx);
       if(start === -1) break;
       // Find closing div
       let c = start + 1;
       let nest = 0;
       while(c < eventHtml.length) {
         let nO = eventHtml.indexOf(`<div`, c);
         let nC = eventHtml.indexOf(`</div`, c);
         if (nO !== -1 && nO < nC) { nest++; c = nO + 4; }
         else if (nC !== -1) { 
           nest--; c = nC + 6; 
           if (nest === -1) { // -1 because the first tag didn't increment nest yet, we started inside it
             break;
           }
         }
       }
       eventHtml = eventHtml.substring(0, start) + eventHtml.substring(c);
       count++;
    }
    
    html = html.substring(0, eventTabStart) + eventHtml + html.substring(siteTabStart);
    fs.writeFileSync(indexPath, html, "utf8");
    console.log("Removed " + count + " orphaned photos.");
  }
}

