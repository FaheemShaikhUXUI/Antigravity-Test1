const fs = require('fs');
const path = require('path');

const targetCssPath = path.resolve('apps/web/app/globals.css');

const loginCss = `
/* ==========================================================================
   MODERN LOGIN PAGE STYLES
   ========================================================================== */

.login-container {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-page);
  position: relative;
  overflow: hidden;
  font-family: var(--font-sans), sans-serif;
}

/* Animated Background Shapes */
.login-bg-shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 0;
  opacity: 0.6;
  animation: float 10s infinite ease-in-out alternate;
}

.shape-1 {
  width: 400px;
  height: 400px;
  background: rgba(14, 165, 233, 0.4); /* Tailwind sky-500 */
  top: -100px;
  left: -100px;
  animation-delay: 0s;
}

.shape-2 {
  width: 500px;
  height: 500px;
  background: rgba(139, 92, 246, 0.3); /* Tailwind violet-500 */
  bottom: -150px;
  right: -100px;
  animation-delay: -3s;
}

.shape-3 {
  width: 300px;
  height: 300px;
  background: rgba(34, 197, 94, 0.3); /* Tailwind green-500 */
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: -6s;
}

@keyframes float {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(30px, 50px) scale(1.1); }
}

[data-theme="dark"] .login-bg-shape {
  opacity: 0.3;
}

/* Glassmorphism Card */
.login-card {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 420px;
  padding: 3rem 2.5rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-radius: 24px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

[data-theme="dark"] .login-card {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.login-header {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.login-logo {
  height: 48px;
  margin-bottom: 0.5rem;
}

[data-theme="dark"] .login-logo {
  filter: invert(1);
}

.login-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-main);
  margin: 0;
  letter-spacing: -0.025em;
}

.login-subtitle {
  font-size: 0.95rem;
  color: var(--text-muted);
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Floating Label Inputs */
.input-group {
  position: relative;
  width: 100%;
}

.login-input {
  width: 100%;
  padding: 1.25rem 1rem 0.5rem 1rem;
  font-size: 1rem;
  color: var(--text-main);
  background: rgba(255, 255, 255, 0.5);
  border: 2px solid transparent;
  border-radius: 12px;
  outline: none;
  transition: all 0.3s ease;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.02);
}

[data-theme="dark"] .login-input {
  background: rgba(0, 0, 0, 0.3);
}

.login-input:hover {
  background: rgba(255, 255, 255, 0.8);
}

[data-theme="dark"] .login-input:hover {
  background: rgba(0, 0, 0, 0.5);
}

.login-input:focus {
  background: var(--bg-card);
  border-color: #0ea5e9;
  box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.1);
}

.login-label {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
  color: var(--text-muted);
  pointer-events: none;
  transition: all 0.2s ease;
}

.login-input:focus ~ .login-label,
.login-input:not(:placeholder-shown) ~ .login-label {
  top: 0.65rem;
  font-size: 0.75rem;
  color: #0ea5e9;
  font-weight: 600;
}

.login-input:not(:focus):not(:placeholder-shown) ~ .login-label {
  color: var(--text-muted);
}

.login-error {
  color: #ef4444;
  font-size: 0.875rem;
  text-align: center;
  background: rgba(239, 68, 68, 0.1);
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid rgba(239, 68, 68, 0.2);
  animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
}

@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}

.login-button {
  width: 100%;
  padding: 1rem;
  margin-top: 0.5rem;
  background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 14px 0 rgba(14, 165, 233, 0.39);
}

.login-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(14, 165, 233, 0.5);
}

.login-button:active:not(:disabled) {
  transform: translateY(0);
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.login-spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
`;

fs.appendFileSync(targetCssPath, loginCss);
console.log('Successfully appended login CSS to globals.css!');
