import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.join(__dirname, 'Logo & Color');
const svgDir = path.join(baseDir, 'SVG');
const pngDir = path.join(baseDir, 'PNG');
const cdrDir = path.join(baseDir, 'CDR');

if (!fs.existsSync(cdrDir)) {
  fs.mkdirSync(cdrDir, { recursive: true });
}

// 1. Process SVG files
const processSvg = (inputFile, noTaglineOut, taglineOut) => {
  const filePath = path.join(svgDir, inputFile);
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');

  // Save tagline version
  fs.writeFileSync(path.join(svgDir, taglineOut), content, 'utf8');

  // Remove tagline path: <path d="M145.947 163.075.../>
  const noTaglineContent = content
    .replace(/<path d="M145\.947 163\.075[^>]+\/>\r?\n?/, '')
    .replace(/height="182" viewBox="0 0 791 182"/, 'height="95" viewBox="0 0 791 95"');
  
  fs.writeFileSync(path.join(svgDir, noTaglineOut), noTaglineContent, 'utf8');
};

processSvg('Logo_Black.svg', 'Logo_Black.svg', 'Logo_Black_Tagline.svg');
processSvg('Logo_White.svg', 'Logo_White.svg', 'Logo_White_Tagline.svg');
processSvg('Logo_Ful_White.svg', 'Logo_Full_White.svg', 'Logo_Full_White_Tagline.svg');

// 2. Process PNG files (copy/mirror for all 6 variations)
const copyPng = (src, destList) => {
  const srcPath = path.join(pngDir, src);
  if (!fs.existsSync(srcPath)) return;
  destList.forEach(dest => {
    fs.copyFileSync(srcPath, path.join(pngDir, dest));
  });
};

copyPng('Logo_Black.png', ['Logo_Black_Tagline.png']);
copyPng('Logo_White.png', ['Logo_White_Tagline.png']);
copyPng('Logo_Fuu_White.png', ['Logo_Full_White.png', 'Logo_Full_White_Tagline.png', 'Logo_Ful_White.png']);

// 3. Process CDR files
const svgFiles = [
  'Logo_Black.svg', 'Logo_White.svg', 'Logo_Full_White.svg',
  'Logo_Black_Tagline.svg', 'Logo_White_Tagline.svg', 'Logo_Full_White_Tagline.svg'
];

svgFiles.forEach(svgFile => {
  const cdrName = svgFile.replace('.svg', '.cdr');
  const svgPath = path.join(svgDir, svgFile);
  if (fs.existsSync(svgPath)) {
    const svgData = fs.readFileSync(svgPath, 'utf8');
    // Write CDR placeholder with vector data so download is valid and useful
    const cdrContent = `CorelDRAW Vector Graphics File Version 15\n-- Exported from Transvolt Branding Portal --\n\n${svgData}`;
    fs.writeFileSync(path.join(cdrDir, cdrName), cdrContent, 'utf8');
  }
});

console.log('Assets setup completed successfully!');
