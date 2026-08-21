const fs = require('fs');
const path = require('path');

const pageTsxPath = path.resolve('apps/web/app/login/page.tsx');

const pageContent = `"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SplitLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      // Check credentials
      if (
        (email === "faheem.s@tranvolt.in" || email === "faheem.s@transvolt.in") && 
        password === "faheemmahi@8080"
      ) {
        localStorage.setItem("isAuthenticated", "true");
        router.push("/");
      } else {
        setError("Invalid User ID or Password");
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="split-login-wrapper">
      <div className="split-login-card">
        
        {/* Left Side (Image & Text) */}
        <div className="split-login-left">
          <div className="split-login-brand">
            <img src="/Logo & Color/SVG/Logo_White.svg" alt="Transvolt" className="h-8" />
          </div>
          
          <div className="split-login-hero">
            <h2>Sign in to Transvolt</h2>
            <p>Access your centralized brand dashboard.<br/>Manage typography, assets, and guidelines in one place.</p>
            
            <div className="split-login-socials">
              {/* Optional social icons / links */}
            </div>
          </div>
        </div>

        {/* Right Side (Form) */}
        <div className="split-login-right">
          <div className="split-login-right-content">
            <h2>Sign in</h2>
            
            <form onSubmit={handleLogin} className="split-login-form">
              <div className="split-input-group">
                <label>E-mail / User ID</label>
                <input 
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="split-input-group">
                <label>Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="split-login-actions">
                <label className="split-checkbox-label">
                  <input type="checkbox" />
                  <span>I agree to the terms of service</span>
                </label>
              </div>

              {error && <div className="split-error">{error}</div>}

              <div className="split-form-footer">
                <button type="submit" className="split-submit-btn" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign in"} 
                  {!isLoading && <span>&gt;</span>}
                </button>
                <a href="#" className="split-link">Need help?</a>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
`;

fs.writeFileSync(pageTsxPath, pageContent);
console.log('Successfully updated login page component to split layout!');

// Append CSS
const cssPath = path.resolve('apps/web/app/globals.css');
const splitCss = `
/* ==========================================================================
   SPLIT LOGIN PAGE (REFERENCE IMAGE STYLE)
   ========================================================================== */

.split-login-wrapper {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e5e7eb;
  background: linear-gradient(135deg, #f3f4f6, #d1d5db);
  font-family: var(--font-sans), sans-serif;
}

[data-theme="dark"] .split-login-wrapper {
  background: linear-gradient(135deg, #0f172a, #020617);
}

.split-login-card {
  width: 90%;
  max-width: 1000px;
  height: 600px;
  display: flex;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 40px 80px rgba(0,0,0,0.3);
  background-image: url('/traffic-bg.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
}

.split-login-left {
  flex: 1.1;
  padding: 3.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
  position: relative;
  z-index: 2;
  background: linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.6) 100%);
}

.split-login-brand img {
  height: 24px;
}

.split-login-hero h2 {
  font-size: 2.2rem;
  font-weight: 300;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.split-login-hero p {
  font-size: 0.95rem;
  opacity: 0.8;
  line-height: 1.6;
  max-width: 90%;
}

.split-login-right {
  flex: 1;
  position: relative;
  background: rgba(22, 22, 30, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  z-index: 2;
}

.split-login-right h2 {
  font-size: 1.75rem;
  font-weight: 300;
  margin-bottom: 3rem;
  color: rgba(255,255,255,0.9);
}

.split-login-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.split-input-group {
  position: relative;
  display: flex;
  flex-direction: column;
}

.split-input-group label {
  font-size: 0.7rem;
  color: rgba(255,255,255,0.4);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.split-input-group input {
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255,255,255,0.2);
  padding: 0.5rem 0;
  color: white;
  font-size: 1.05rem;
  outline: none;
  transition: border-color 0.3s;
}

.split-input-group input:focus {
  border-bottom-color: #ef4444;
}

.split-login-actions {
  margin-top: -0.5rem;
}

.split-checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.75rem;
  color: rgba(255,255,255,0.5);
  cursor: pointer;
}

.split-checkbox-label input {
  accent-color: #ef4444;
  width: 14px;
  height: 14px;
}

.split-error {
  color: #ef4444;
  font-size: 0.85rem;
  background: rgba(239, 68, 68, 0.1);
  padding: 0.75rem;
  border-left: 2px solid #ef4444;
}

.split-form-footer {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: 1rem;
}

.split-submit-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.75rem 2.5rem;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: background 0.3s;
  box-shadow: 0 4px 14px rgba(239, 68, 68, 0.3);
}

.split-submit-btn:hover:not(:disabled) {
  background: #dc2626;
}

.split-submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.split-link {
  color: rgba(255,255,255,0.4);
  text-decoration: none;
  font-size: 0.8rem;
  transition: color 0.3s;
}

.split-link:hover {
  color: white;
}

/* Responsive */
@media (max-width: 768px) {
  .split-login-card {
    flex-direction: column;
    height: 100%;
    min-height: 100vh;
    border-radius: 0;
    width: 100%;
  }
  .split-login-left {
    flex: 0.6;
    padding: 2rem;
  }
  .split-login-right {
    flex: 1;
    padding: 2rem;
  }
}
`;

fs.appendFileSync(cssPath, splitCss);
console.log('Successfully appended split login CSS!');
