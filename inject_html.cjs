
const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const cards = fs.readFileSync("letterhead_cards.html", "utf8");

const startIdx = html.indexOf("<div class=\"lh-grid\">");
const endSectionIdx = html.indexOf("</section>", startIdx);
const endGridIdx = html.lastIndexOf("</div>", endSectionIdx);

const before = html.substring(0, startIdx);
const after = html.substring(endGridIdx + "</div>".length);

const newHtml = before + "<div class=\"lh-grid\">\n" + cards + "\n      </div>" + after;
fs.writeFileSync("index.html", newHtml);
console.log("Injected successfully.");

