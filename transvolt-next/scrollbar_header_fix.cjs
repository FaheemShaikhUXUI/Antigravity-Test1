const fs = require('fs');
const path = require('path');

const targetCssPath = path.resolve('apps/web/app/globals.css');

const cssAppends = `

/* Push the main wrapper's scrollbar down so it doesn't overlap the sticky header */
.main-wrapper::-webkit-scrollbar-track {
  margin-top: 85px; /* Approximate height of the header + padding */
  margin-bottom: 20px;
}
`;

fs.appendFileSync(targetCssPath, cssAppends);
console.log('Successfully added top margin to the main wrapper scrollbar track!');
