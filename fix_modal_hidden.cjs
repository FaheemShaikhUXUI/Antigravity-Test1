
const fs = require("fs");
const path = require("path");

const indexPath = path.join(__dirname, "index.html");
let html = fs.readFileSync(indexPath, "utf8");

// 1. Fix the modal overlay class
html = html.replace(`<div class="modal-overlay" id="modal-create-gallery">`, `<div class="modal-overlay hidden" id="modal-create-gallery">`);

// 2. Fix the open button
html = html.replace(`onclick="document.getElementById('modal-create-gallery').classList.add('active')"`, `onclick="document.getElementById('modal-create-gallery').classList.remove('hidden')"`);

// 3. Fix the close/cancel buttons (there are 3 instances)
html = html.replace(/classList\.remove\('active'\)/g, `classList.add('hidden')`);

fs.writeFileSync(indexPath, html, "utf8");
console.log("Fixed modal hidden logic.");

