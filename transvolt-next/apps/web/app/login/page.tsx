"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SplitLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
