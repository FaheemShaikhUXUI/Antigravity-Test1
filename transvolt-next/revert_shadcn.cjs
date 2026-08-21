const fs = require('fs');
const path = require('path');

const rootDir = path.resolve('..');
const nextWebDir = path.resolve('./apps/web');

// 1. Revert page.tsx
const oldHtmlPath = path.join(rootDir, '_old_html_version', 'index.html');
const pageTsxPath = path.join(nextWebDir, 'app', 'page.tsx');

if (fs.existsSync(oldHtmlPath)) {
  console.log('Processing HTML for rollback...');
  const html = fs.readFileSync(oldHtmlPath, 'utf8');
  
  const bodyStartIdx = html.indexOf('<body');
  const bodyEndIdx = html.lastIndexOf('</body>');
  
  if (bodyStartIdx !== -1 && bodyEndIdx !== -1) {
    const bodyTagEnd = html.indexOf('>', bodyStartIdx);
    let bodyContent = html.substring(bodyTagEnd + 1, bodyEndIdx);
    
    bodyContent = bodyContent.replace(/src="\.\//g, 'src="/');
    bodyContent = bodyContent.replace(/href="\.\//g, 'href="/');
    
    const pageContent = `
export default function Page() {
  return (
    <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: \`${bodyContent.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }} />
  );
}
    `;
    fs.writeFileSync(pageTsxPath, pageContent.trim());
    console.log('Reverted page.tsx to raw HTML wrapper.');
  }
}

// 2. Remove the components we generated
const tabsDir = path.join(nextWebDir, 'components', 'tabs');
if (fs.existsSync(tabsDir)) {
  fs.rmSync(tabsDir, { recursive: true, force: true });
  console.log('Removed extracted tab components.');
}

const themeTogglePath = path.join(nextWebDir, 'components', 'ThemeToggle.tsx');
if (fs.existsSync(themeTogglePath)) {
  fs.unlinkSync(themeTogglePath);
  console.log('Removed ThemeToggle.tsx.');
}

// 3. Remove Shadcn components (tabs, input, dialog) from packages/ui
const uiComponentsDir = path.resolve('./packages/ui/src/components');
const filesToRemove = ['tabs.tsx', 'input.tsx', 'dialog.tsx'];
for (const file of filesToRemove) {
  const filePath = path.join(uiComponentsDir, file);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`Removed ${file} from shadcn UI.`);
  }
}

console.log('Rollback complete.');
