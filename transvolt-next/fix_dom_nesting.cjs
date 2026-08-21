const fs = require('fs');
const path = require('path');

const pageTsxPath = path.resolve('apps/web/app/page.tsx');
let pageContent = fs.readFileSync(pageTsxPath, 'utf8');

const injectionCode = `
    // Fix orphaned tab panes caused by HTML string unclosed tags
    const mainContent = document.querySelector('.main-content');
    const orphanedPanes = document.querySelectorAll('.dashboard-layout > .tab-pane');
    if (mainContent && orphanedPanes.length > 0) {
      orphanedPanes.forEach(pane => mainContent.appendChild(pane));
    }
`;

// Insert it right after the overlay scrollbars initialization in useEffect
if (pageContent.includes('OverlayScrollbars(el, {') && !pageContent.includes('orphanedPanes.forEach')) {
  pageContent = pageContent.replace(
    '  }, []);',
    injectionCode + '\n  }, []);'
  );
  fs.writeFileSync(pageTsxPath, pageContent);
  console.log('Successfully added DOM self-correction script!');
} else {
  console.log('Could not find injection point or already injected.');
}
