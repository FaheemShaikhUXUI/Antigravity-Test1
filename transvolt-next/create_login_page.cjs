const fs = require('fs');
const path = require('path');

const loginDir = path.resolve('apps/web/app/login');
if (!fs.existsSync(loginDir)) {
  fs.mkdirSync(loginDir, { recursive: true });
}

const pageTsxPath = path.join(loginDir, 'page.tsx');

const pageContent = `"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
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
      // Check credentials (allowing both tranvolt and transvolt spellings to be safe)
      if (
        (email === "faheem.s@tranvolt.in" || email === "faheem.s@transvolt.in") && 
        password === "faheemmahi@8080"
      ) {
        // Successful login
        // Optional: Save state in localStorage here if you want to protect routes later
        localStorage.setItem("isAuthenticated", "true");
        router.push("/");
      } else {
        setError("Invalid User ID or Password");
        setIsLoading(false);
      }
    }, 800); // simulate network request for premium feel
  };

  return (
    <div className="login-container">
      {/* Background decorative elements */}
      <div className="login-bg-shape shape-1"></div>
      <div className="login-bg-shape shape-2"></div>
      <div className="login-bg-shape shape-3"></div>

      <div className="login-card">
        <div className="login-header">
          <img src="/Logo & Color/SVG/Logo_Black.svg" alt="Transvolt Logo" className="login-logo light-logo" />
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Enter your credentials to access the dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <input 
              type="text" 
              id="email" 
              className="login-input" 
              placeholder=" " 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email" className="login-label">User ID (Email)</label>
          </div>

          <div className="input-group">
            <input 
              type="password" 
              id="password" 
              className="login-input" 
              placeholder=" " 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password" className="login-label">Password</label>
          </div>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? (
              <div className="login-spinner"></div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
`;

fs.writeFileSync(pageTsxPath, pageContent);
console.log('Successfully created login page component!');
