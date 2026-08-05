
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const photosDir = path.join(__dirname, "Photos");
const thumbnailsDir = path.join(photosDir, "Thumbnails");

if (!fs.existsSync(thumbnailsDir)) {
  fs.mkdirSync(thumbnailsDir, { recursive: true });
}

function processDirectory(dirPath) {
  const items = fs.readdirSync(dirPath);
  for (const item of items) {
    if (item === "Thumbnails") continue;
    
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      const targetSubdir = path.join(thumbnailsDir, path.relative(photosDir, fullPath));
      if (!fs.existsSync(targetSubdir)) {
        fs.mkdirSync(targetSubdir, { recursive: true });
      }
      processDirectory(fullPath);
    } else if (item.toLowerCase().match(/\.(jpg|jpeg|png)$/)) {
      const relPath = path.relative(photosDir, fullPath);
      const thumbPath = path.join(thumbnailsDir, relPath);
      
      if (!fs.existsSync(thumbPath)) {
        console.log(`Generating thumbnail for ${relPath}...`);
        sharp(fullPath)
          .resize({ width: 300, height: 300, fit: "cover" })
          .jpeg({ quality: 80 })
          .toFile(thumbPath)
          .catch(err => console.error("Error processing " + relPath, err));
      }
    }
  }
}

processDirectory(photosDir);
console.log("Started thumbnail generation.");

