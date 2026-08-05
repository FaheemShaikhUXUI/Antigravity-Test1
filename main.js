/**
 * Transvolt Branding Portal - Main Client Logic
 * Handles interactive themes, modal access management, dynamic SVG icons, and asset downloads.
 */

// Asset Definition Data
const LOGO_ASSETS = [
  { id: "logo-black", label: "Logo Black", baseName: "Logo_Black", isWhite: false, hasTagline: false, dimensions: "791 x 95 px", colorSpace: "RGB / CMYK / Hex #000000" },
  { id: "logo-white", label: "Logo White", baseName: "Logo_White", isWhite: true, hasTagline: false, dimensions: "791 x 95 px", colorSpace: "White & Brand Green/Blue" },
  { id: "logo-full-white", label: "Logo Full White", baseName: "Logo_Full_White", isWhite: true, hasTagline: false, dimensions: "791 x 95 px", colorSpace: "100% Monochrome White" },
  { id: "logo-black-tagline", label: "Logo Black - Tagline", baseName: "Logo_Black_Tagline", isWhite: false, hasTagline: true, dimensions: "791 x 182 px", colorSpace: "RGB / CMYK with Brand Tagline" },
  { id: "logo-white-tagline", label: "Logo White - Tagline", baseName: "Logo_White_Tagline", isWhite: true, hasTagline: true, dimensions: "791 x 182 px", colorSpace: "White Text with Brand Tagline" },
  { id: "logo-full-white-tagline", label: "Logo Full White - Tagline", baseName: "Logo_Full_White_Tagline", isWhite: true, hasTagline: true, dimensions: "791 x 182 px", colorSpace: "100% Monochrome White with Tagline" }
];

const getSvgPath = (baseName) => `./Logo & Color/SVG/${baseName}.svg`;
const getAssetPath = (baseName, ext) => {
  if (ext.toLowerCase() === 'cdr') {
    return `./Logo & Color/CDR/${baseName}_CDR15.cdr`;
  }
  return `./Logo & Color/${ext.toUpperCase()}/${baseName}.${ext}`;
};

// Minimalist SVG Icons for Action Buttons
const ICON_DELETE = `<svg class="svg-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`;
const ICON_INFO = `<svg class="svg-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
const ICON_DOWNLOAD = `<svg class="svg-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`;
const ICON_REPLACE = `<svg class="svg-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>`;


/**
 * Displays a floating notification toast with minimalist SVG icons
 */
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  let iconSvg = `<svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
  if (type === "success") {
    iconSvg = `<svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
  } else if (type === "warning") {
    iconSvg = `<svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#eab308" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;
  }

  toast.innerHTML = `<span>${iconSvg}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    if (toast && toast.parentNode) toast.remove();
  }, 3200);
}

/**
 * Renders logo preview boxes into a designated grid container
 */
function renderLogoBoxes(containerId, format) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";

  LOGO_ASSETS.forEach(asset => {
    const previewSrc = getSvgPath(asset.baseName);
    const downloadSrc = getAssetPath(asset.baseName, format);
    const item = document.createElement("div");
    item.className = `logo-box-item`;
    item.setAttribute("data-label", asset.label.toLowerCase());
    item.setAttribute("data-format", format.toLowerCase());

    const fileName = downloadSrc.split('/').pop();
    item.innerHTML = `
      <div class="logo-preview-area" title="Click to view details of ${asset.label}">
        <img src="${previewSrc}" alt="${asset.label}" class="logo-preview-img" />
      </div>
      <div class="logo-box-footer">
        <span class="logo-label">${asset.label}</span>
        <div class="logo-actions">
          <button class="action-btn btn-hold lh-hold-btn" title="Hold Asset" aria-label="Delete ${asset.label}">
            ${ICON_DELETE}
          </button>
          <button class="action-btn btn-replace" title="Replace Asset" aria-label="Replace ${asset.label}">
            ${ICON_REPLACE}
          </button>
          ${format.toLowerCase() === 'cdr' ? '' : `<button class="action-btn btn-info" title="Preview / Info" aria-label="Preview ${asset.label}">
            ${ICON_INFO}
          </button>`}
          <a href="${downloadSrc}" download="${fileName}" class="action-btn btn-download" title="Download .${format.toUpperCase()} File" aria-label="Download ${asset.label}">
            ${ICON_DOWNLOAD}
          </a>
        </div>
      </div>
    `;

    

    

    const btnInfo = item.querySelector(".btn-info");
    if (btnInfo) {
      btnInfo.addEventListener("click", (e) => {
        e.stopPropagation();
        openPreviewModal(asset, format, previewSrc, downloadSrc);
      });
    }

    item.querySelector(".logo-preview-area").addEventListener("click", () => {
      openPreviewModal(asset, format, previewSrc, downloadSrc);
    });

    item.querySelector(".btn-download").addEventListener("click", (e) => {
      e.stopPropagation();
      showToast(`Downloading ${asset.label} (.${format.toUpperCase()})...`, "success");
    });

    container.appendChild(item);
  });
}

// Asset Preview Modal Logic
const modal = document.getElementById("previewModal");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalImgContainer = document.getElementById("modalImgContainer");
const modalDetails = document.getElementById("modalDetails");
const modalDownloadBtn = document.getElementById("modalDownloadBtn");
const modalCopyLinkBtn = document.getElementById("modalCopyLinkBtn");

function openPreviewModal(asset, format, previewSrc, downloadSrc) {
  if (!modal) return;
  modalTitle.textContent = `${asset.label} (${format.toUpperCase()})`;
  modalImage.src = previewSrc;

  if (asset.isWhite) {
    modalImgContainer.classList.add("checker-preview");
  } else {
    modalImgContainer.classList.remove("checker-preview");
  }

  modalDetails.innerHTML = `
    <div class="detail-item">
      <span class="detail-label">Asset Format</span>
      <span class="detail-value">.${format.toUpperCase()} File</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Dimensions</span>
      <span class="detail-value">${asset.dimensions}</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Tagline Status</span>
      <span class="detail-value">${asset.hasTagline ? "Includes Tagline" : "Logo Only (No Tagline)"}</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Color Space</span>
      <span class="detail-value">${asset.colorSpace}</span>
    </div>
  `;

  const fileName = downloadSrc.split('/').pop();
  modalDownloadBtn.href = downloadSrc;
  modalDownloadBtn.setAttribute("download", fileName);

  if(modalCopyLinkBtn) modalCopyLinkBtn.onclick = () => {
    const fullUrl = new URL(downloadSrc, window.location.href).href;
    navigator.clipboard.writeText(fullUrl)
      .then(() => showToast("Asset URL copied to clipboard!", "success"))
      .catch(() => showToast("Failed to copy link", "warning"));
  };

  modal.classList.remove("hidden");
}

if (modalCloseBtn && modal) {
  modalCloseBtn.addEventListener("click", () => modal.classList.add("hidden"));
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.classList.add("hidden"); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) modal.classList.add("hidden");
  });
}

/**
 * Main Navigation Tab Switching
 */
function setupNavTabs() {
  const tabs = document.querySelectorAll(".nav-tab");
  const panes = document.querySelectorAll(".tab-pane");
  const otherTitle = document.getElementById("otherTabTitle");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      panes.forEach(p => {
        p.classList.remove("active-pane");
        p.classList.add("hidden-pane");
      });

      const tabId = tab.getAttribute("data-tab");
      const targetPane = document.getElementById(`tab-${tabId}`);
      if (targetPane) {
        targetPane.classList.remove("hidden-pane");
        targetPane.classList.add("active-pane");
      } else {
        const otherPane = document.getElementById("tab-other");
        if (otherPane && otherTitle) {
          otherTitle.textContent = tab.textContent.trim() + " Module";
          otherPane.classList.remove("hidden-pane");
          otherPane.classList.add("active-pane");
        }
      }
      showToast(`Switched to ${tab.textContent.trim()}`, "info");
    });
  });
}

/**
 * Search Filter for Logo Assets
 */
function setupSearchFilter() {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    const items = document.querySelectorAll(".logo-box-item");
    const sections = document.querySelectorAll(".asset-section-card");

    items.forEach(item => {
      const label = item.getAttribute("data-label") || "";
      const format = item.getAttribute("data-format") || "";
      if (label.includes(query) || format.includes(query) || query === "") {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });

    sections.forEach(sec => {
      const visibleItems = sec.querySelectorAll('.logo-box-item[style="display: flex;"], .logo-box-item:not([style*="display: none"])');
      if (visibleItems.length === 0 && query !== "" && sec.getAttribute("data-section")) {
        sec.style.display = "none";
      } else {
        sec.style.display = "block";
      }
    });
  });
}

/**
 * Copy Color Code Buttons
 */
function setupColorCopy() {
  document.querySelectorAll(".copy-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const val = btn.getAttribute("data-copy");
      if (!val) return;
      navigator.clipboard.writeText(val).then(() => {
        const origText = btn.textContent;
        btn.textContent = "Copied!";
        btn.style.backgroundColor = "rgba(255, 255, 255, 0.45)";
        showToast(`Copied ${val} to clipboard!`, "success");
        setTimeout(() => {
          btn.textContent = origText;
          btn.style.backgroundColor = "";
        }, 2000);
      }).catch(() => showToast("Failed to copy color value", "warning"));
    });
  });
}

/**
 * Font Package Downloads
 */
function setupFontDownload() {
  document.querySelectorAll(".btn-download-font").forEach(btn => {
    btn.addEventListener("click", () => {
      const fontName = btn.getAttribute("data-font") || "Font Family";
      showToast(`Downloading ${fontName} Font Family package...`, "success");
    });
  });
}

/**
 * Interactive Light / Dark Theme Toggle
 */
function setupThemeToggle() {
  const toggleBtn = document.getElementById("themeToggleBtn");
  const sunIcon = toggleBtn ? toggleBtn.querySelector(".sun-icon") : null;
  const moonIcon = toggleBtn ? toggleBtn.querySelector(".moon-icon") : null;
  const savedTheme = localStorage.getItem("transvolt-theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  let currentTheme = savedTheme || (prefersDark ? "dark" : "light");

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("transvolt-theme", theme);
    if (sunIcon && moonIcon) {
      if (theme === "dark") {
        sunIcon.style.display = "block";
        moonIcon.style.display = "none";
      } else {
        sunIcon.style.display = "none";
        moonIcon.style.display = "block";
      }
    }
    const headerLogo = document.querySelector(".header-logo-img");
    if (headerLogo) {
      headerLogo.src = (theme === "dark") ? "./Logo & Color/SVG/Logo_White.svg" : "./Logo & Color/SVG/Logo_Black.svg";
    }
  }

  applyTheme(currentTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      currentTheme = (currentTheme === "dark") ? "light" : "dark";
      applyTheme(currentTheme);
      showToast(`Switched to ${currentTheme.toUpperCase()} Mode`, "info");
    });
  }
}

/**
 * Login & Access Management Modal Handlers
 * Incorporates 3-option mutually exclusive permission checkboxes and SVG icons.
 */
function setupLoginBtn() {
  const loginBtn = document.getElementById("loginBtn") || document.querySelector(".user-profile-btn");
  const loginModal = document.getElementById("loginModal");
  const loginCloseBtn = document.getElementById("loginModalCloseBtn");
  if (!loginBtn || !loginModal) return;

  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    loginModal.classList.remove("hidden");
  });

  const hideModal = () => {
    loginModal.classList.add("hidden");
  };

  if (loginCloseBtn) loginCloseBtn.addEventListener("click", hideModal);
  loginModal.addEventListener("click", (e) => {
    if (e.target === loginModal) hideModal();
  });

  // Strict Modal Tab & Pane Isolation
  const tabBtns = loginModal.querySelectorAll(".login-tab-btn");
  const panes = loginModal.querySelectorAll(".login-pane");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      panes.forEach(p => {
        p.classList.remove("active-pane");
        p.classList.add("hidden-pane");
      });
      btn.classList.add("active");

      const tabId = btn.getAttribute("data-logintab");
      const targetPane = document.getElementById(`pane-${tabId}`);
      if (targetPane) {
        targetPane.classList.remove("hidden-pane");
        targetPane.classList.add("active-pane");
      }
    });
  });

  // Super Admin Password Toggle
  const togglePwdBtn = document.getElementById("togglePwdBtn");
  const pwdInput = document.getElementById("adminPassword");
  if (togglePwdBtn && pwdInput) {
    togglePwdBtn.addEventListener("click", () => {
      const isPwd = pwdInput.type === "password";
      pwdInput.type = isPwd ? "text" : "password";
      togglePwdBtn.innerHTML = isPwd 
        ? `<svg class="svg-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>` 
        : `<svg class="svg-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
    });
  }

  // Super Admin Auth / Logout Actions
  const btnAuth = document.getElementById("btnAdminAuth");
  const btnLogout = document.getElementById("btnAdminLogout");
  const adminPill = document.getElementById("adminStatusPill");

  if (btnAuth) {
    btnAuth.addEventListener("click", () => {
      loginBtn.innerHTML = `
        <svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3 6 6 1-4.5 4.5 1 6.5-5.5-3-5.5 3 1-6.5L2 9l6-1 3-6z"></path></svg>
        <span>Fahem Shaikh (Super Admin)</span>
      `;
      loginBtn.style.background = "#15803D";
      loginBtn.style.color = "#FFFFFF";
      loginBtn.style.boxShadow = "0 0 15px rgba(34, 197, 94, 0.4)";
      if (adminPill) {
        adminPill.textContent = "Full Admin Power Active";
        adminPill.style.background = "#DCFCE7";
        adminPill.style.color = "#15803D";
      }
      btnAuth.style.display = "none";
      if (btnLogout) btnLogout.style.display = "inline-flex";
      showToast("Welcome back, Super Admin Fahem Shaikh! All asset actions (View, Download, Replace, Delete) are unlocked.", "success");
      setTimeout(() => { hideModal(); }, 1200);
    });
  }

  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      loginBtn.innerHTML = `
        <svg class="svg-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        <span>Login</span>
      `;
      loginBtn.style.background = "";
      loginBtn.style.color = "";
      loginBtn.style.boxShadow = "";
      if (adminPill) {
        adminPill.textContent = "Session Signed Out";
        adminPill.style.background = "";
        adminPill.style.color = "";
      }
      if (btnAuth) btnAuth.style.display = "inline-flex";
      btnLogout.style.display = "none";
      showToast("Logged out of Super Admin session.", "info");
    });
  }

  // Grant Access Scope Radios
  const radioAll = document.getElementById("radioScopeAll");
  const radioSpec = document.getElementById("radioScopeSpecific");
  const cardAll = document.getElementById("scopeAllCard");
  const cardSpec = document.getElementById("scopeSpecificCard");
  const specBox = document.getElementById("specificSectionsBox");

  const setScopeSelection = (isAll) => {
    if (isAll) {
      if (radioAll) radioAll.checked = true;
      if (cardAll) cardAll.classList.add("active-radio");
      if (cardSpec) cardSpec.classList.remove("active-radio");
      if (specBox) specBox.classList.add("hidden");
    } else {
      if (radioSpec) radioSpec.checked = true;
      if (cardSpec) cardSpec.classList.add("active-radio");
      if (cardAll) cardAll.classList.remove("active-radio");
      if (specBox) specBox.classList.remove("hidden");
    }
  };

  if (cardAll && cardSpec) {
    cardAll.addEventListener("click", () => setScopeSelection(true));
    cardSpec.addEventListener("click", () => setScopeSelection(false));
  }

  // Mutually Exclusive 3-Option Permission Checkboxes
  const chkView = document.getElementById("powerViewOnly");
  const chkDownload = document.getElementById("powerViewDownload");
  const chkReplace = document.getElementById("powerCanReplace");

  const cardView = chkView ? chkView.closest(".power-card") : null;
  const cardDownload = chkDownload ? chkDownload.closest(".power-card") : null;
  const cardReplace = chkReplace ? chkReplace.closest(".power-card") : null;

  const setPowerSelection = (target) => {
    if (chkView) chkView.checked = (target === "view");
    if (chkDownload) chkDownload.checked = (target === "download");
    if (chkReplace) chkReplace.checked = (target === "replace");

    if (cardView) cardView.classList.toggle("active-power", target === "view");
    if (cardDownload) cardDownload.classList.toggle("active-power", target === "download");
    if (cardReplace) cardReplace.classList.toggle("active-power", target === "replace");
  };

  if (cardView) cardView.addEventListener("click", () => setPowerSelection("view"));
  if (cardDownload) cardDownload.addEventListener("click", () => setPowerSelection("download"));
  if (cardReplace) cardReplace.addEventListener("click", () => setPowerSelection("replace"));

  // Mutually Exclusive Time Limit Options
  const timeAlways = document.getElementById("timeAlways");
  const time46Hours = document.getElementById("time46Hours");
  const time1Month = document.getElementById("time1Month");
  const cardAlways = timeAlways ? timeAlways.closest(".time-card") : null;
  const card46Hours = time46Hours ? time46Hours.closest(".time-card") : null;
  const card1Month = time1Month ? time1Month.closest(".time-card") : null;

  const setTimeSelection = (target) => {
    if (timeAlways) timeAlways.checked = (target === "always");
    if (time46Hours) time46Hours.checked = (target === "46_hours");
    if (time1Month) time1Month.checked = (target === "1_month");

    if (cardAlways) cardAlways.classList.toggle("active-time", target === "always");
    if (card46Hours) card46Hours.classList.toggle("active-time", target === "46_hours");
    if (card1Month) card1Month.classList.toggle("active-time", target === "1_month");
  };

  if (cardAlways) cardAlways.addEventListener("click", () => setTimeSelection("always"));
  if (card46Hours) card46Hours.addEventListener("click", () => setTimeSelection("46_hours"));
  if (card1Month) card1Month.addEventListener("click", () => setTimeSelection("1_month"));

  // Email Invitation Dispatch & Active Access Table Update
  const btnSendInvite = document.getElementById("btnSendInviteMail");
  const inviteEmailInput = document.getElementById("inviteEmailInput");
  const accessListBody = document.getElementById("accessListBody");

  if (btnSendInvite && inviteEmailInput) {
    btnSendInvite.addEventListener("click", (e) => {
      e.preventDefault();
      const email = inviteEmailInput.value.trim();
      if (!email) {
        showToast("Please enter a valid user email address.", "warning");
        inviteEmailInput.focus();
        return;
      }

      const isAll = radioAll && radioAll.checked;
      let scopeText = "All Branding Site";
      let scopeClass = "tag-all";

      if (!isAll) {
        const checkedSecs = Array.from(document.querySelectorAll('input[name="secPage"]:checked')).map(cb => cb.value);
        if (checkedSecs.length === 0) {
          showToast("Please select at least one page for Specific Page Access.", "warning");
          return;
        }
        scopeText = checkedSecs.join(", ");
        scopeClass = "tag-spec";
      }

      let powerText = `<svg class="svg-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> <span>Can View Only</span>`;
      let powerClass = "tag-vo";

      if (chkReplace && chkReplace.checked) {
        powerText = `<svg class="svg-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg> <span>Can View, Download & Replace</span>`;
        powerClass = "tag-rep";
      } else if (chkDownload && chkDownload.checked) {
        powerText = `<svg class="svg-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> <span>Can View and Download (default)</span>`;
        powerClass = "tag-dl";
      }

      let timeText = "Always";
      if (time46Hours && time46Hours.checked) timeText = "46 Hours";
      else if (time1Month && time1Month.checked) timeText = "1 Month";

      const origText = btnSendInvite.innerHTML;
      btnSendInvite.innerHTML = `<span>Dispatching Mail...</span>`;
      btnSendInvite.disabled = true;
      showToast(`Sending access email to ${email}...`, "info");

      setTimeout(() => {
        btnSendInvite.innerHTML = origText;
        btnSendInvite.disabled = false;

        if (accessListBody) {
          const initials = email.split("@")[0].slice(0, 2).toUpperCase();
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>
              <div class="user-cell">
                <span class="cell-avatar alt-av1">${initials}</span>
                <div>
                  <strong>${email.split("@")[0]}</strong>
                  <small>${email}</small>
                </div>
              </div>
            </td>
            <td><span class="scope-tag ${scopeClass}">${scopeText}</span></td>
            <td><span class="power-tag ${powerClass}">${powerText}</span></td>
            <td>
              <span class="status-dot online"></span> Invited & Active
              <small style="display:block; color:var(--text-muted); font-size:0.75rem; margin-top:3px;">⏱️ Limit: ${timeText}</small>
            </td>
            <td><button class="btn-revoke-mini" title="Revoke Access">Revoke</button></td>
          `;
          const revokeBtn = tr.querySelector(".btn-revoke-mini");
          if (revokeBtn) {
            revokeBtn.addEventListener("click", () => {
              tr.remove();
              showToast(`Revoked access for ${email}`, "warning");
            });
          }
          accessListBody.insertBefore(tr, accessListBody.children[1] || null);
        }
        inviteEmailInput.value = "";
        showToast(`Invitation Mail sent to ${email} (Limit: ${timeText})!`, "success");
        const listTabBtn = loginModal.querySelector('[data-logintab="access-list"]');
        if (listTabBtn) listTabBtn.click();
      }, 1000);
    });
  }

  // Revoke Action for Existing Access Rows
  document.querySelectorAll(".btn-revoke-mini").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const row = e.target.closest("tr");
      if (row) {
        row.remove();
        showToast("User access revoked successfully.", "warning");
      }
    });
  });

  // Active Access Table Live Filter & Select Filter
  const accessSearchInput = document.getElementById("accessSearchInput");
  const userFilterSelect = document.getElementById("userFilterSelect");

  const filterUserTable = () => {
    const query = accessSearchInput ? accessSearchInput.value.toLowerCase().trim() : "";
    const typeFilter = userFilterSelect ? userFilterSelect.value : "all";

    document.querySelectorAll("#accessListBody tr").forEach(row => {
      const matchesQuery = row.textContent.toLowerCase().includes(query);
      const userType = row.getAttribute("data-user-type") || "internal";
      const matchesType = (typeFilter === "all") || (typeFilter === userType);

      if (matchesQuery && matchesType) {
        row.classList.remove("hidden-row");
      } else {
        row.classList.add("hidden-row");
      }
    });
  };

  if (accessSearchInput) {
    accessSearchInput.addEventListener("input", filterUserTable);
  }
  if (userFilterSelect) {
    userFilterSelect.addEventListener("change", filterUserTable);
  }

  // User Directory — Search Filter + Select Button inside Email Hero Block
  const userDirSearch = document.getElementById("userDirSearch");
  const userDirList = document.getElementById("userDirList");
  const userDirCount = document.getElementById("userDirCount");
  const inviteEmailRef = document.getElementById("inviteEmailInput");

  if (userDirSearch && userDirList) {
    userDirSearch.addEventListener("input", () => {
      const q = userDirSearch.value.toLowerCase().trim();
      const items = userDirList.querySelectorAll(".user-dir-item");
      let visible = 0;
      items.forEach(item => {
        const name = (item.dataset.name || "").toLowerCase();
        const email = (item.dataset.email || "").toLowerCase();
        if (!q || name.includes(q) || email.includes(q)) {
          item.classList.remove("dir-hidden");
          visible++;
        } else {
          item.classList.add("dir-hidden");
        }
      });
      if (userDirCount) userDirCount.textContent = `${visible} user${visible !== 1 ? "s" : ""}`;

      // Show no-results message
      let noRes = userDirList.querySelector(".user-dir-no-results");
      if (visible === 0) {
        if (!noRes) {
          noRes = document.createElement("div");
          noRes.className = "user-dir-no-results";
          noRes.textContent = "No users match your search";
          userDirList.appendChild(noRes);
        }
      } else {
        if (noRes) noRes.remove();
      }
    });

    // Select button — fills the email input
    userDirList.addEventListener("click", (e) => {
      const btn = e.target.closest(".user-dir-select-btn");
      if (!btn) return;
      const item = btn.closest(".user-dir-item");
      if (!item || !inviteEmailRef) return;
      inviteEmailRef.value = item.dataset.email || "";
      inviteEmailRef.focus();
      showToast(`Selected: ${item.dataset.name} (${item.dataset.email})`, "info");
      // Highlight selected
      userDirList.querySelectorAll(".user-dir-item").forEach(i => i.style.background = "");
      item.style.background = "rgba(255,255,255,0.18)";
    });
  }
}

/**
 * Letterhead Asset Preview Modal & Action Handlers
 */
function openLetterheadPreviewModal(title, imgSrc, downloadUrl) {
  if (!modal) return;
  modalTitle.textContent = title;
  modalImage.src = imgSrc;
  modalImgContainer.classList.remove("checker-preview");

  const isDocx = title.includes("Word") || downloadUrl.endsWith(".docx");
  const formatText = isDocx ? "DOCX" : "JPG";

  modalDetails.innerHTML = `
    <div class="detail-item">
      <span class="detail-label">Asset Format</span>
      <span class="detail-value">${formatText} File Template</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Dimensions / Page Size</span>
      <span class="detail-value">${isDocx ? "A4 Document (Standard)" : "3508 x 2480 px (300 DPI)"}</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Usage Context</span>
      <span class="detail-value">Official Transvolt Letterhead</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Compliance</span>
      <span class="detail-value">Strict Corporate Brand Standard</span>
    </div>
  `;

  modalDownloadBtn.href = downloadUrl;
  modalDownloadBtn.setAttribute("download", downloadUrl.split("/").pop());

  if(modalCopyLinkBtn) modalCopyLinkBtn.onclick = () => {
    const fullUrl = new URL(downloadUrl, window.location.href).href;
    navigator.clipboard.writeText(fullUrl)
      .then(() => showToast("Asset URL copied to clipboard!", "success"))
      .catch(() => showToast("Failed to copy link", "warning"));
  };

  modal.classList.remove("hidden");
}

function setupLetterheadActions() {
  
  // New tile click listener
  document.querySelectorAll(".clickable-preview").forEach(box => {
    box.addEventListener("click", (e) => {
      // Don't trigger if clicking an action button directly
      if (e.target.closest(".action-btn")) return;
      if (box.classList.contains("on-hold")) return;
      const title = box.getAttribute("data-title") || "Preview";
      const imgSrc = box.getAttribute("data-src") || "";
      openLetterheadPreviewModal(title, imgSrc, imgSrc);
    });
  });
  
  document.querySelectorAll(".lh-preview-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const title = btn.getAttribute("data-title") || "Letterhead Asset";
      const imgSrc = btn.getAttribute("data-src") || "";
      const downloadUrl = btn.getAttribute("data-download") || imgSrc;
      openLetterheadPreviewModal(title, imgSrc, downloadUrl);
    });
  });

  document.querySelectorAll(".lh-download-btn, .btn-lh-all").forEach(btn => {
    btn.addEventListener("click", () => {
      const title = btn.getAttribute("data-asset") || "Letterhead Asset";
      showToast(`Downloading ${title}...`, "success");
    });
  });

  document.querySelectorAll(".lh-delete-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const box = btn.closest(".lh-asset-box");
      if (box) {
        box.style.opacity = "0.35";
        box.style.pointerEvents = "none";
        showToast("Asset removed from active view.", "info");
      }
    });
  });  document.querySelectorAll(".logo-dl-all-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const format = btn.getAttribute("data-format") || "Logo";
      showToast(`Downloading All ${format} Logos Package (.ZIP)...`, "success");
    });
  });
}

// Initialize application on DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  renderLogoBoxes("grid-png", "png");
  renderLogoBoxes("grid-svg", "svg");
  renderLogoBoxes("grid-cdr", "cdr");
  setupThemeToggle();
  setupNavTabs();
  setupSearchFilter();
  setupColorCopy();
  setupFontDownload();
  setupLetterheadActions();
  setupLoginBtn();
  console.log("Transvolt Branding Portal loaded successfully.");
});

  // Hold button logic
  document.addEventListener("click", (e) => {
    const holdBtn = e.target.closest(".lh-hold-btn");
    if (holdBtn) {
      e.stopPropagation();
      e.preventDefault();
      const assetBox = holdBtn.closest(".lh-asset-box, .brand-asset-box, .logo-box-item, .color-box");
      
      if (assetBox) {
        assetBox.classList.toggle("on-hold");
        const isHold = assetBox.classList.contains("on-hold");
        holdBtn.innerHTML = isHold ? `<svg class="svg-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>` : `<svg class="svg-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></svg>`;
        holdBtn.title = isHold ? "Release Asset" : "Hold Asset";
      }

    }
  });

  // Global file replacement logic
  const globalReplaceInput = document.createElement("input");
  globalReplaceInput.type = "file";
  globalReplaceInput.style.display = "none";
  document.body.appendChild(globalReplaceInput);

  globalReplaceInput.addEventListener("change", (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileName = e.target.files[0].name;
      showToast("Asset successfully replaced with " + fileName, "success");
      e.target.value = ""; // Reset for next use
    }
  });

  document.addEventListener("click", (e) => {
    const replaceBtn = e.target.closest(".btn-replace, .lh-replace-btn");
    if (replaceBtn) {
      e.stopPropagation();
      e.preventDefault();
      // Ensure the tile is not on hold
      const box = replaceBtn.closest(".lh-asset-box, .brand-asset-box, .logo-box-item, .color-box");
      if (box && box.classList.contains("on-hold")) return;
      
      globalReplaceInput.click();
    }
  });
