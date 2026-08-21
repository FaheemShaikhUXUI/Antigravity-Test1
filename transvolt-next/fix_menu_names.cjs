const fs = require('fs');
const path = require('path');

const pageTsxPath = path.resolve('apps/web/app/page.tsx');
let pageContent = fs.readFileSync(pageTsxPath, 'utf8');

// The replacements to fix the truncated menu names
const replacements = {
  '<span>Digital</span></button>': '<span>Digital Assets</span></button>',
  '<span>Print</span></button>': '<span>Print Assets</span></button>',
  '<span>Vehicle</span></button>': '<span>Vehicle Branding</span></button>',
  '<span>Charger</span></button>': '<span>Charger Branding</span></button>'
};

let updated = false;

for (const [oldStr, newStr] of Object.entries(replacements)) {
  if (pageContent.includes(oldStr)) {
    pageContent = pageContent.replace(oldStr, newStr);
    updated = true;
  }
}

if (updated) {
  fs.writeFileSync(pageTsxPath, pageContent);
  console.log('Successfully updated the sidebar menu names!');
} else {
  console.log('Could not find the menu names to update.');
}
