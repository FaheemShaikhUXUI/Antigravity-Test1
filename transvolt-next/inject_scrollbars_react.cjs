const fs = require('fs');
const path = require('path');

const pagePath = path.resolve('apps/web/app/page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

// If already modified, don't double inject
if (!content.includes('"use client"')) {
  const newHeader = `"use client";
import { useEffect } from "react";
import { OverlayScrollbars } from "overlayscrollbars";
import "overlayscrollbars/overlayscrollbars.css";

export default function Page() {
  useEffect(() => {
    // Initialize custom scrollbars for the main content area, the sidebar, and other scrollable areas
    const elements = document.querySelectorAll(".main-wrapper, .main-content, .sidebar, .user-dir-list");
    elements.forEach(el => {
      OverlayScrollbars(el, {
        scrollbars: {
          theme: "os-theme-light",
          autoHide: "never",
          clickScroll: true
        }
      });
    });
  }, []);

  return (
    <div className="w-full" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: \``;

  content = content.replace("export default function Page() {\n  return (\n    <div className=\"w-full\" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: `", newHeader);
  fs.writeFileSync(pagePath, content);
  console.log("Successfully injected OverlayScrollbars into page.tsx");
} else {
  console.log("page.tsx is already a client component.");
}
