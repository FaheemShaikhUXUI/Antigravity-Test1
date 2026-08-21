const fs = require('fs');
const path = require('path');

const targetCssPath = path.resolve('apps/web/app/globals.css');

const cssAppends = `

/* Expand scrollbar width on hover */
::-webkit-scrollbar:hover {
  width: 28px; /* 8px + 20px */
}

/* Ensure the thumb stays rounded and nice when expanded */
::-webkit-scrollbar-thumb:hover {
  border: 4px solid transparent; /* Keep some transparent padding so it doesn't look overly thick, but bigger than before */
  background-clip: padding-box;
}
`;

fs.appendFileSync(targetCssPath, cssAppends);
console.log('Successfully added scrollbar hover width expansion!');
