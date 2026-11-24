/**
 * CONSTRUCTION WEBCAMS - Site Configuration & Interactive Logic
 * Edit the pricing numbers or contact info below anytime!
 */
const SITE_CONFIG = {
  companyName: "Construction Webcams",
  domain: "constuction-webcams.com",
  contactEmail: "info@constuction-webcams.com",
  pricing: {
    baseInstallPerSite: 950,       // One-time setup & mounting fee
    extraCameraInstall: 350,       // Additional 4K camera on same rig
    monthlyBaseOneCam: 450,        // Includes Starlink unlimited data + 1x 4K stream + NVR security
    monthlyPerExtraCam: 150,       // Each additional 4K camera stream
    timelapseAddonMonthly: 75      // Optional automated 4K time-lapse marketing edit
  },
  sommetBlanc: {
    youtubeStreamsUrl: "https://www.youtube.com/@SommetBlanc/streams",
    clientWebsiteEmbedUrl: "https://sommetblanc.com/live-construction-webcams"
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Navigation Toggle
  const mobileBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.getElementById("navLinks");
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => navLinks.classList.remove("open"));
    });
  }

  // 2. Hero Hardware Interactive Hotspots
  const hotspotData = {
    starlink: {
      title: "① Starlink High-Speed Satellite Uplink",
      badge: "NO JOBSITE WI-FI NEEDED",
      desc: "We mount a dedicated Starlink dish directly on the pole. Even on remote mountain ridges or raw dirt sites with zero cell reception, your 4K live streams run smoothly 24/7."
    },
    box: {
      title: "② Rugged NEMA Weatherproof Box & Local NVR",
      badge: "JUST 1 POWER OUTLET REQUIRED",
      desc: "Sealed against Utah snowstorms, sub-zero windchill, rain, and jobsite dust. Houses our enterprise NVR for continuous 24/7 security recording and direct-to-YouTube encoding—all plugged into a single 110V outlet."
    },
    cam: {
      title: "③ True 4K Ultra-HD Cameras (Live Stream + Security)",
      badge: "3840 × 2160 ULTRA HD",
      desc: "Commercial-grade 4K optics that pull double duty: crystal-clear 24/7 jobsite security footage stored locally AND live 4K broadcasting straight to your own YouTube channel and website."
    }
  };

  const hotspots = document.querySelectorAll(".hotspot");
  const hsTitle = document.getElementById("hotspotTitle");
  const hsBadge = document.getElementById("hotspotBadge");
  const hsDesc = document.getElementById("hotspotDesc");

  hotspots.forEach((btn) => {
    btn.addEventListener("click", () => {
      hotspots.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const key = btn.getAttribute("data-hotspot");
      const info = hotspotData[key];
      if (info && hsTitle && hsDesc && hsBadge) {
        hsTitle.textContent = info.title;
        hsBadge.textContent = info.badge;
        hsDesc.textContent = info.desc;
      }
    });
  });

  // 3. Sommet Blanc Showcase Mode Switcher
  const tabBtns = document.querySelectorAll(".tab-btn");
  const stageTitle = document.getElementById("stageModeTitle");
  const stageDesc = document.getElementById("stageModeDesc");
  const stageBadge = document.getElementById("stageTelemetryTag");

  const showcaseModes = {
    youtube: {
      tag: "CAM 01 & 02 • YOUTUBE LIVE 4K (@SommetBlanc)",
      title: "Live 4K Streaming Direct to Client's YouTube Channel",
      desc: "At Sommét Blanc in Empire Pass (Deer Valley), our Starlink-powered 4K cameras stream live 24/7 directly to their official YouTube channel (@SommetBlanc/streams). Anyone can watch from anywhere, and the client owns 100% of their channel and subscribers."
    },
    embed: {
      tag: "WEB EMBED • SOMMETBLANC.COM/LIVE-CONSTRUCTION-WEBCAMS",
      title: "Embedded Directly on SommetBlanc.com for Buyers & Investors",
      desc: "Because streams run on YouTube Live, embedding multiple 4K live cameras onto SommetBlanc.com took a single line of standard iframe code—zero clunky third-party portals, zero per-viewer bandwidth fees."
    },
    security: {
      tag: "LOCAL NVR • 24/7 CONTINUOUS 4K SECURITY ARCHIVE",
      title: "Simultaneous 24/7 Jobsite Security Recording",
      desc: "While the public or investors watch the live YouTube feed, the weatherproof enclosure simultaneously records continuous 4K security footage onto local NVR storage to protect materials, deliveries, and equipment."
    }
  };

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const mode = btn.getAttribute("data-mode");
      const data = showcaseModes[mode];
      if (data && stageTitle && stageDesc && stageBadge) {
        stageBadge.textContent = data.tag;
        stageTitle.textContent = data.title;
        stageDesc.textContent = data.desc;
      }
    });
  });

  // 4. Live YouTube Video ID / URL Embed Previewer
  const loadYtBtn = document.getElementById("loadYtStreamBtn");
  const ytInput = document.getElementById("ytStreamInput");
  const videoViewport = document.getElementById("videoViewport");

  function extractYouTubeId(input) {
    const trimmed = input.trim();
    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
      return trimmed;
    }
    const match = trimmed.match(
      /(?:youtube\.com\/(?:watch\?v=|live\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
  }

  if (loadYtBtn && ytInput && videoViewport) {
    loadYtBtn.addEventListener("click", () => {
      const raw = ytInput.value;
      const vid = extractYouTubeId(raw);
      if (!vid) {
        window.open(SITE_CONFIG.sommetBlanc.youtubeStreamsUrl, "_blank", "noopener");
        return;
      }
      videoViewport.innerHTML = `
        <iframe
          src="https://www.youtube.com/embed/${vid}?autoplay=1&mute=1&rel=0"
          title="Live 4K Construction Webcam Feed"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen>
        </iframe>
      `;
    });
  }

  // 5. Copy Sample Embed Snippet Button
  const copyEmbedBtn = document.getElementById("copyEmbedBtn");
  const embedSnippet = document.getElementById("embedSnippetCode");
  if (copyEmbedBtn && embedSnippet) {
    copyEmbedBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(embedSnippet.textContent.trim()).then(() => {
        const orig = copyEmbedBtn.textContent;
        copyEmbedBtn.textContent = "✓ Copied Embed Code!";
        setTimeout(() => {
          copyEmbedBtn.textContent = orig;
        }, 2000);
      });
    });
  }

  // 6. Interactive Pricing & Project Calculator
  const camCountInput = document.getElementById("calcCamCount");
  const durationInput = document.getElementById("calcDuration");
  const timelapseCheck = document.getElementById("calcTimelapse");
  const solarCheck = document.getElementById("calcSolarInterest");

  const camCountLabel = document.getElementById("calcCamCountVal");
  const durationLabel = document.getElementById("calcDurationVal");
  const totalMonthlyEl = document.getElementById("calcTotalMonthly");
  const totalSetupEl = document.getElementById("calcTotalSetup");
  const applyCalcBtn = document.getElementById("applyCalcToQuoteBtn");

  function updateCalculator() {
    if (!camCountInput || !durationInput) return;
    const cams = parseInt(camCountInput.value, 10) || 1;
    const months = parseInt(durationInput.value, 10) || 12;
    const includeTimelapse = timelapseCheck && timelapseCheck.checked;

    camCountLabel.textContent = `${cams} × 4K Camera${cams > 1 ? "s" : ""}`;
    durationLabel.textContent = `${months} Months`;

    const setupCost =
      SITE_CONFIG.pricing.baseInstallPerSite +
      (cams - 1) * SITE_CONFIG.pricing.extraCameraInstall;

    let monthlyCost =
      SITE_CONFIG.pricing.monthlyBaseOneCam +
      (cams - 1) * SITE_CONFIG.pricing.monthlyPerExtraCam;

    if (includeTimelapse) {
      monthlyCost += SITE_CONFIG.pricing.timelapseAddonMonthly;
    }

    totalMonthlyEl.innerHTML = `$${monthlyCost.toLocaleString()}<span>/mo</span>`;
    totalSetupEl.textContent = `+$${setupCost.toLocaleString()} one-time turnkey install (Starlink + Weatherproof Box included)`;
  }

  if (camCountInput && durationInput) {
    camCountInput.addEventListener("input", updateCalculator);
    durationInput.addEventListener("input", updateCalculator);
    if (timelapseCheck) timelapseCheck.addEventListener("change", updateCalculator);
    if (solarCheck) solarCheck.addEventListener("change", updateCalculator);
    updateCalculator();
  }

  if (applyCalcBtn) {
    applyCalcBtn.addEventListener("click", () => {
      const cams = camCountInput ? camCountInput.value : 2;
      const months = durationInput ? durationInput.value : 12;
      const pkgSelect = document.getElementById("quotePackage");
      const msgArea = document.getElementById("quoteMessage");

      if (pkgSelect) {
        if (cams === "1") pkgSelect.value = "1-Camera 4K + Starlink Package";
        else if (cams === "2") pkgSelect.value = "Dual-Camera 4K Jobsite Pro (Sommet Blanc Style)";
        else pkgSelect.value = "Multi-Camera Custom Resort / Commercial Setup";
      }

      if (msgArea) {
        const extras = [];
        if (timelapseCheck && timelapseCheck.checked) extras.push("4K Time-Lapse Reels");
        if (solarCheck && solarCheck.checked) extras.push("Off-Grid Solar Pre-Order Info");
        msgArea.value = `Interested in ${cams}x 4K camera(s) with Starlink & weatherproof NVR box for approximately ${months} months.${
          extras.length ? " Add-ons: " + extras.join(", ") + "." : ""
        } We have a 110V power outlet available on site.`;
      }

      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // 7. Quote Form Submission (HostGator PHP + Graceful Fallback)
  const quoteForm = document.getElementById("quoteForm");
  const formStatus = document.getElementById("formStatusMsg");

  if (quoteForm) {
    quoteForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(quoteForm);

      if (formStatus) {
        formStatus.style.display = "block";
        formStatus.style.color = "#38bdf8";
        formStatus.textContent = "Sending your jobsite request...";
      }

      try {
        const response = await fetch("contact.php", {
          method: "POST",
          body: formData
        });

        if (response.ok) {
          const resJson = await response.json();
          if (resJson && resJson.success) {
            formStatus.style.color = "#10b981";
            formStatus.textContent =
              "✓ Request received! We'll reach out shortly to schedule your jobsite camera installation.";
            quoteForm.reset();
            return;
          }
        }
        throw new Error("PHP endpoint unavailable locally");
      } catch (err) {
        const name = formData.get("name") || "";
        const company = formData.get("company") || "";
        const location = formData.get("location") || "";
        const pkg = formData.get("package") || "";
        const message = formData.get("message") || "";

        if (formStatus) {
          formStatus.style.color = "#10b981";
          formStatus.textContent =
            "✓ Quote summary ready! Once uploaded to HostGator, this submits automatically via contact.php.";
        }

        const subject = encodeURIComponent(`4K Construction Webcam Inquiry - ${company || name}`);
        const body = encodeURIComponent(
          `Name: ${name}\nCompany: ${company}\nJobsite Location: ${location}\nPackage: ${pkg}\n\nDetails:\n${message}`
        );
        window.location.href = `mailto:${SITE_CONFIG.contactEmail}?subject=${subject}&body=${body}`;
      }
    });
  }

  // 8. Live Logo Concept Switcher
  const logoCards = document.querySelectorAll(".logo-choice-card");
  const navLogo = document.getElementById("navBrandLogo");
  const footerLogo = document.getElementById("footerBrandLogo");

  logoCards.forEach((card) => {
    card.addEventListener("click", () => {
      logoCards.forEach((c) => c.classList.remove("featured"));
      card.classList.add("featured");
      const newLogoSrc = card.getAttribute("data-logo");
      if (newLogoSrc) {
        if (navLogo) navLogo.src = newLogoSrc;
        if (footerLogo) footerLogo.src = newLogoSrc;
      }
    });
  });
});
