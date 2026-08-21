const fs = require('fs');
const path = require('path');

const pageTsxPath = path.resolve('apps/web/app/page.tsx');
let pageContent = fs.readFileSync(pageTsxPath, 'utf8');

// The exact block of extra closing tags before Print Assets
const extraTags = `                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>
  
      <!-- Official Print Assets Section -->`;

// We only need ONE closing section tag for tab-digital-assets. The 6 extra </div> tags are breaking the layout.
const fixedTags = `                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Official Print Assets Section -->`;

if (pageContent.includes(extraTags)) {
  pageContent = pageContent.replace(extraTags, fixedTags);
  fs.writeFileSync(pageTsxPath, pageContent);
  console.log('Successfully removed the extra </div> tag that was breaking the layout!');
} else {
  // Let's do a more robust replacement using regex to just remove all `</div>` tags right before `</section>`
  const regex = /(<\/div>\s*){2,}<\/section>\s*<!-- Official Print Assets Section -->/;
  if (regex.test(pageContent)) {
    pageContent = pageContent.replace(regex, '</div>\n      </section>\n  \n      <!-- Official Print Assets Section -->');
    fs.writeFileSync(pageTsxPath, pageContent);
    console.log('Successfully replaced extra closing tags using regex!');
  } else {
    console.log('Could not find the extra tags to remove.');
  }
}

// Also, let's replace all "lh-card lh-card-general" with "asset-section-card" to match Logo & Color layout perfectly.
let replacedCards = 0;
while (pageContent.includes('lh-card lh-card-general')) {
  pageContent = pageContent.replace('lh-card lh-card-general', 'asset-section-card');
  replacedCards++;
}

if (replacedCards > 0) {
  fs.writeFileSync(pageTsxPath, pageContent);
  console.log(`Successfully replaced ${replacedCards} card layouts to match Logo & Color!`);
}
