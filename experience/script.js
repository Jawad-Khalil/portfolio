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
  // 4. Navigation Menu Toggle (Clean Version)
  // ================================
  const menuBtn = document.getElementById("menuBtn");
  const navList = document.getElementById("navList");

  if (menuBtn && navList) {
    // Toggle menu on button click
    menuBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      const expanded = menuBtn.getAttribute("aria-expanded") === "true";
      menuBtn.setAttribute("aria-expanded", !expanded);
      navList.classList.toggle("active");
    });

    // Close menu when a link is clicked
    navList.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navList.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", false);
      });
    });

    // Close menu if clicking outside
    document.addEventListener("click", (event) => {
      if (!navList.contains(event.target) && event.target !== menuBtn) {
        navList.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", false);
      }
    });

    // Close menu on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        navList.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", false);
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

async function fetchExperienceLastUpdated() {
  try {
    const response = await fetch(
      "https://api.github.com/repos/Jawad-Khalil/portfolio/commits?path=experience/index.html&page=1&per_page=1"
    );
    const data = await response.json();

    if (data.length > 0) {
      const commitDate = new Date(data[0].commit.author.date);

      // Format date nicely (e.g., Sep 9, 2025)
      const options = { year: "numeric", month: "short", day: "numeric" };
      const formattedDate = commitDate.toLocaleDateString("en-US", options);

      // Update both header and footer
      const headerSpan = document.getElementById("last-updated-header");
      const footerSpan = document.getElementById("last-updated-footer");

      if (headerSpan) headerSpan.textContent = "Last Updated: " + formattedDate;
      if (footerSpan) footerSpan.textContent = "Updated on: " + formattedDate;
    } else {
      if (document.getElementById("last-updated-header"))
        document.getElementById("last-updated-header").textContent =
          "No update info available.";
      if (document.getElementById("last-updated-footer"))
        document.getElementById("last-updated-footer").textContent =
          "No update info available.";
    }
  } catch (error) {
    console.error("Error fetching update date:", error);
    if (document.getElementById("last-updated-header"))
      document.getElementById("last-updated-header").textContent =
        "Error loading update date.";
    if (document.getElementById("last-updated-footer"))
      document.getElementById("last-updated-footer").textContent =
        "Error loading update date.";
  }
}

fetchExperienceLastUpdated();
