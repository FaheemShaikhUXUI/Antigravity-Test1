const fs = require('fs');
const path = require('path');

const cssPath = path.resolve('apps/web/app/globals.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

// The massive hack we want to remove
const hackScrollbar = `::-webkit-scrollbar {
  width: 42px;
  height: 42px;
}`;

const cleanScrollbar = `::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}`;

const hackThumb = `  border-left: 30px solid transparent !important; /* 30px gap between content and scrollbar */
  border-right: 4px solid transparent !important;
  border-top: 4px solid transparent !important;
  border-bottom: 4px solid transparent !important;
  background-clip: padding-box !important;`;

const cleanThumb = `  border: 2px solid transparent;
  background-clip: padding-box;`;

const hackTrack = `::-webkit-scrollbar-track {
  border-left: 30px solid transparent;
  border-right: 4px solid transparent;
  background-clip: padding-box;
  border-radius: 10px;
}`;

const cleanTrack = `::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 10px;
}`;

if (cssContent.includes(hackScrollbar)) {
  cssContent = cssContent.replace(hackScrollbar, cleanScrollbar);
  cssContent = cssContent.split(hackThumb).join(cleanThumb);
  if (cssContent.includes(hackTrack)) {
    cssContent = cssContent.replace(hackTrack, cleanTrack);
  } else {
    // try a more generic replace if formatting was off
    cssContent = cssContent.replace(/::-webkit-scrollbar-track \{[\s\S]*?border-radius: 10px;\n\}/g, cleanTrack);
  }
}

// Now, ensure .main-content has a solid gap on the right
const paddingCSS = `
/* Gap between tiles and scrollbar */
.main-content {
  padding-right: 40px !important;
}

/* Sidebar gap */
.sidebar-menu {
  padding-right: 30px !important;
}
`;

fs.writeFileSync(cssPath, cssContent + paddingCSS);
console.log('Successfully reverted scrollbar hack and added padding to containers.');
