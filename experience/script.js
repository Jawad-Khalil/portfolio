// ================================
// Run only after the DOM is fully loaded
// ================================
document.addEventListener("DOMContentLoaded", function () {
  // ================================
  // 1. Smooth scroll to section if URL has a hash (like #jobs)
  // ================================
  const hash = window.location.hash; // Get hash from URL
  if (hash) {
    const targetElement = document.querySelector(hash); // Find element with that ID
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" }); // Scroll smoothly to it
    }
  }

  // ================================
  // 2. Set footer year dynamically
  // ================================
  const currentYear = new Date().getFullYear(); // Get current year
  const footerYear = document.getElementById("footerYear"); // Target footer <span>
  if (footerYear) {
    footerYear.textContent = currentYear; // Insert year into footer
  }

  // ================================
  // 3. Scroll-to-Top Button
  // ================================
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  if (scrollToTopBtn) {
    // Show button only when page is scrolled down more than 300px
    window.addEventListener("scroll", () => {
      scrollToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });

    // Smooth scroll back to the top when button is clicked
    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ================================
  // 4. Navigation Menu Toggle
  // ================================

  const menuBtn = document.getElementById("menuBtn");
  const navList = document.getElementById("navList");
  menuBtn.addEventListener("click", () => {
    const expanded = menuBtn.getAttribute("aria-expanded") === "true" || false;
    menuBtn.setAttribute("aria-expanded", !expanded);
    navList.classList.toggle("active");
  });

  if (menuBtn && navList) {
    const navLinks = navList.querySelectorAll("a");

    // Toggle menu when button is clicked
    menuBtn.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent click from closing menu immediately
      navList.style.display =
        navList.style.display === "block" ? "none" : "block";
    });

    // Close menu when a link is clicked
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navList.style.display = "none";
      });
    });

    // Close menu if clicking outside of it
    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!navList.contains(target) && target !== menuBtn) {
        navList.style.display = "none";
      }
    });
  }

  // ================================
  // 5. Add counters before <h3> headings
  // Only if there is more than one <h3> inside a job section
  // ================================
  document.querySelectorAll(".experience-category").forEach(function (section) {
    const h3s = section.querySelectorAll("h3");

    // Apply numbering only if more than 1 job exists inside the section
    if (h3s.length > 1) {
      h3s.forEach(function (h3, index) {
        const counterSpan = document.createElement("span");
        counterSpan.textContent = index + 1 + ". "; // Add number (1., 2., 3., etc.)
        counterSpan.style.color = "white"; // Style number
        counterSpan.style.fontWeight = "bold";
        counterSpan.style.marginRight = "4px";
        h3.insertBefore(counterSpan, h3.firstChild); // Insert before heading text
      });
    }
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});
