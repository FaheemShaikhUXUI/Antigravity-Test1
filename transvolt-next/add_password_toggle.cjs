const fs = require('fs');
const path = require('path');

const pageTsxPath = path.resolve('apps/web/app/login/page.tsx');
let pageContent = fs.readFileSync(pageTsxPath, 'utf8');

// 1. Add showPassword state
if (!pageContent.includes('const [showPassword')) {
  pageContent = pageContent.replace(
    'const [password, setPassword] = useState("");',
    'const [password, setPassword] = useState("");\n  const [showPassword, setShowPassword] = useState(false);'
  );
}

// 2. Replace password input block
const oldPasswordBlockRegex = /<div className="split-input-group">\s*<label>Password<\/label>\s*<input\s*type="password"\s*value=\{password\}\s*onChange=\{\(e\) => setPassword\(e\.target\.value\)\}\s*required\s*\/>\s*<\/div>/;

const newPasswordBlock = `<div className="split-input-group">
                <label>Password</label>
                <div style={{ position: 'relative', width: '100%' }}>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ width: '100%', paddingRight: '2.5rem' }}
                  />
                  <button 
                    type="button" 
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                </div>
              </div>`;

if (oldPasswordBlockRegex.test(pageContent)) {
  pageContent = pageContent.replace(oldPasswordBlockRegex, newPasswordBlock);
  fs.writeFileSync(pageTsxPath, pageContent);
  console.log('Successfully added show/hide password toggle to page.tsx!');
} else {
  console.log('Could not find password block to replace in page.tsx.');
}

// 3. Add CSS for the toggle button
const cssPath = path.resolve('apps/web/app/globals.css');
const toggleCss = `
/* ==========================================================================
   PASSWORD TOGGLE BUTTON
   ========================================================================== */

.password-toggle-btn {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  transition: color 0.2s ease;
}

.password-toggle-btn:hover {
  color: rgba(255, 255, 255, 0.9);
}

.password-toggle-btn:focus {
  outline: none;
}
`;

fs.appendFileSync(cssPath, toggleCss);
console.log('Successfully added CSS for password toggle!');
