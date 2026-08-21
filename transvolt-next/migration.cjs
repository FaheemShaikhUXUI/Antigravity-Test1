const fs = require('fs');
const path = require('path');

const rootDir = path.resolve('..');
const nextWebDir = path.resolve('./apps/web');
const publicDir = path.join(nextWebDir, 'public');

// 1. Copy Asset Directories
const assetDirs = ['All Assets', 'Fonts', 'Letterhead', 'Login Page & Settings', 'Logo & Color', 'Photos', 'Typography'];
for (const dir of assetDirs) {
  const src = path.join(rootDir, dir);
  const dest = path.join(publicDir, dir);
  if (fs.existsSync(src)) {
    console.log(`Copying ${dir}...`);
    fs.cpSync(src, dest, { recursive: true });
  } else {
    console.log(`Warning: ${src} does not exist`);
  }
}

// 2. Append CSS
const oldCssPath = path.join(rootDir, '_old_html_version', 'style.css');
const globalsCssPath = path.join(nextWebDir, 'app', 'globals.css');
if (fs.existsSync(oldCssPath)) {
  console.log('Appending CSS...');
  const oldCss = fs.readFileSync(oldCssPath, 'utf8');
  fs.appendFileSync(globalsCssPath, '\n\n/* Legacy CSS */\n' + oldCss);
}

// 3. Copy main.js
const oldJsPath = path.join(rootDir, '_old_html_version', 'main.js');
const newJsPath = path.join(publicDir, 'main.js');
if (fs.existsSync(oldJsPath)) {
  console.log('Copying main.js...');
  fs.copyFileSync(oldJsPath, newJsPath);
}

// 4. Extract HTML and generate page.tsx
const oldHtmlPath = path.join(rootDir, '_old_html_version', 'index.html');
const pageTsxPath = path.join(nextWebDir, 'app', 'page.tsx');
if (fs.existsSync(oldHtmlPath)) {
  console.log('Processing HTML...');
  const html = fs.readFileSync(oldHtmlPath, 'utf8');
  
  const bodyStartIdx = html.indexOf('<body');
  const bodyEndIdx = html.lastIndexOf('</body>');
  
  if (bodyStartIdx !== -1 && bodyEndIdx !== -1) {
    const bodyTagEnd = html.indexOf('>', bodyStartIdx);
    let bodyContent = html.substring(bodyTagEnd + 1, bodyEndIdx);
    
    // Replace relative paths
    bodyContent = bodyContent.replace(/src="\.\//g, 'src="/');
    bodyContent = bodyContent.replace(/href="\.\//g, 'href="/');
    
    // Create the page component
    // Note: React requires a single root element if dangerouslySetInnerHTML is used,
    // so we wrap the whole body content in a fragment or a div.
    // Also, we must escape backticks and interpolation inside the template literal string.
    const pageContent = `
export default function Page() {
  return (
    <div dangerouslySetInnerHTML={{ __html: \`${bodyContent.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\` }} />
  );
}
    `;
    fs.writeFileSync(pageTsxPath, pageContent.trim());
    console.log('Updated page.tsx!');
  }
}

// 5. Update layout.tsx to include the script
const layoutPath = path.join(nextWebDir, 'app', 'layout.tsx');
if (fs.existsSync(layoutPath)) {
  console.log('Updating layout.tsx...');
  let layoutCode = fs.readFileSync(layoutPath, 'utf8');
  if (!layoutCode.includes('<Script src="/main.js" />')) {
    // Inject import Script
    if (!layoutCode.includes('import Script')) {
      layoutCode = 'import Script from "next/script";\n' + layoutCode;
    }
    // Inject inside body
    layoutCode = layoutCode.replace('</body>', '  <Script src="/main.js" />\n      </body>');
    fs.writeFileSync(layoutPath, layoutCode);
  }
}

console.log('Migration done.');
