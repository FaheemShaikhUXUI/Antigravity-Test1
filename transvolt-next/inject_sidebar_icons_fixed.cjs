const fs = require('fs');
const path = require('path');

const targetHtmlPath = path.resolve('apps/web/app/page.tsx');
let htmlContent = fs.readFileSync(targetHtmlPath, 'utf8');

const svgs = {
  logoColor: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',
  typography: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>',
  letterhead: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>',
  presentation: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><polygon points="10 8 15 10 10 12 10 8"/></svg>',
  digital: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
  print: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>',
  vehicle: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
  charger: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  philosophy: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.2 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>',
  photos: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>'
};

// Use simple string replacements to avoid regex escaping errors
const replacements = [
  { match: '<button class="nav-tab active" data-tab="logo-color">Logo & Color</button>', replace: '<button class="nav-tab active" data-tab="logo-color">' + svgs.logoColor + ' <span>Logo & Color</span></button>' },
  { match: '<button class="nav-tab" data-tab="typography">Typography</button>', replace: '<button class="nav-tab" data-tab="typography">' + svgs.typography + ' <span>Typography</span></button>' },
  { match: '<button class="nav-tab" data-tab="letterhead">Letterhead</button>', replace: '<button class="nav-tab" data-tab="letterhead">' + svgs.letterhead + ' <span>Letterhead</span></button>' },
  { match: '<button class="nav-tab" data-tab="presentation">Presentation</button>', replace: '<button class="nav-tab" data-tab="presentation">' + svgs.presentation + ' <span>Presentation</span></button>' },
  { match: '<button class="nav-tab" data-tab="digital-assets">Digital</button>', replace: '<button class="nav-tab" data-tab="digital-assets">' + svgs.digital + ' <span>Digital</span></button>' },
  { match: '<button class="nav-tab" data-tab="print-assets">Print</button>', replace: '<button class="nav-tab" data-tab="print-assets">' + svgs.print + ' <span>Print</span></button>' },
  { match: '<button class="nav-tab" data-tab="vehicle-branding">Vehicle</button>', replace: '<button class="nav-tab" data-tab="vehicle-branding">' + svgs.vehicle + ' <span>Vehicle</span></button>' },
  { match: '<button class="nav-tab" data-tab="charger-branding">Charger</button>', replace: '<button class="nav-tab" data-tab="charger-branding">' + svgs.charger + ' <span>Charger</span></button>' },
  { match: '<button class="nav-tab" data-tab="brand-philosophy">Brand Philosophy</button>', replace: '<button class="nav-tab" data-tab="brand-philosophy">' + svgs.philosophy + ' <span>Brand Philosophy</span></button>' },
  { match: '<button class="nav-tab" data-tab="photos">Photos</button>', replace: '<button class="nav-tab" data-tab="photos">' + svgs.photos + ' <span>Photos</span></button>' }
];

replacements.forEach(item => {
  htmlContent = htmlContent.replace(item.match, item.replace);
});

fs.writeFileSync(targetHtmlPath, htmlContent);
console.log('Successfully injected SVGs into sidebar menus using string replacement!');
