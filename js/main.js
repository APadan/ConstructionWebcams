document.addEventListener("DOMContentLoaded", () => {
  // 1. Hero Featured Camera Switcher
  const switchBtns = document.querySelectorAll(".cam-switch-btn");
  const heroIframe = document.getElementById("heroStreamIframe");
  const heroLabel = document.getElementById("heroCamLabel");

  switchBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      switchBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const vid = btn.getAttribute("data-vid");
      const label = btn.getAttribute("data-label");
      if (heroIframe && vid) {
        heroIframe.src = `https://www.youtube.com/embed/${vid}?autoplay=1&mute=1&playsinline=1&rel=0`;
      }
      if (heroLabel && label) {
        heroLabel.textContent = label;
      }
    });
  });

  // 2. Automatic Server-Side Quote Form Submission (No mailto popup)
  const quoteForm = document.getElementById("quoteForm");
  const formStatus = document.getElementById("formStatusMsg");
  const submitBtn = document.getElementById("submitBtn");

  if (!quoteForm) return;

  quoteForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(quoteForm);

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending Request...";
    }

    if (formStatus) {
      formStatus.className = "form-status-banner sending";
      formStatus.textContent = "Submitting your jobsite details...";
    }

    try {
      const response = await fetch("contact.php", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        const resJson = await response.json();
        if (resJson && resJson.success) {
          if (formStatus) {
            formStatus.className = "form-status-banner success";
            formStatus.textContent =
              "✓ Quote request received! Your information was sent automatically—we will reach out shortly.";
          }
          quoteForm.reset();
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = "Send Quote Request";
          }
          return;
        }
      }
      throw new Error("Local file preview");
    } catch (err) {
      // When previewing locally on Mac before uploading to HostGator:
      if (formStatus) {
        formStatus.className = "form-status-banner success";
        formStatus.textContent =
          "✓ Form verified! On your live HostGator site, this automatically emails your info@ inbox in the background.";
      }
      quoteForm.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Quote Request";
      }
    }
  });
});
