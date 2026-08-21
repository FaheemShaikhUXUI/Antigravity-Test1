const fs = require('fs');
const path = require('path');

const nextWebDir = path.resolve('./apps/web');
const rootDir = path.resolve('..');
const oldHtmlPath = path.join(rootDir, '_old_html_version', 'index.html');
const tabsDir = path.join(nextWebDir, 'components', 'tabs');

if (!fs.existsSync(tabsDir)) {
  fs.mkdirSync(tabsDir, { recursive: true });
}

const html = fs.readFileSync(oldHtmlPath, 'utf8');

// The tabs list from the raw HTML
const tabs = [
  { id: 'logo-color', name: 'Logo & Color' },
  { id: 'typography', name: 'Typography' },
  { id: 'letterhead', name: 'Letterhead' },
  { id: 'presentation', name: 'Presentation' },
  { id: 'digital-assets', name: 'Digital' },
  { id: 'print-assets', name: 'Print' },
  { id: 'vehicle-branding', name: 'Vehicle' },
  { id: 'charger-branding', name: 'Charger' },
  { id: 'brand-philosophy', name: 'Brand Philosophy' },
  { id: 'photos', name: 'Photos' },
];

for (const tab of tabs) {
  const sectionStart = `<section id="tab-${tab.id}" class="tab-pane`;
  const startIdx = html.indexOf(sectionStart);
  if (startIdx !== -1) {
    const sectionTagEnd = html.indexOf('>', startIdx);
    const endIdx = html.indexOf('</section>', sectionTagEnd);
    
    let content = html.substring(sectionTagEnd + 1, endIdx);
    
    // Fix paths
    content = content.replace(/src="\.\//g, 'src="/');
    content = content.replace(/href="\.\//g, 'href="/');

    const componentName = tab.id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('') + 'Tab';
    
    const componentCode = `
export function ${componentName}() {
  return (
    <div dangerouslySetInnerHTML={{ __html: \`${content.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }} />
  );
}
    `;
    fs.writeFileSync(path.join(tabsDir, `${componentName}.tsx`), componentCode.trim());
  }
}

console.log('Tab components generated.');
