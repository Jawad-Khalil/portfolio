// ================================
// Toggle the menu visibility
// ================================
function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("active");
}

// ================================
// Scroll Event Listener for Scroll-to-Top Button
// ================================
window.addEventListener("scroll", function () {
  const scrollBtn = document.getElementById("scrollToTopBtn");
  if (window.scrollY > 20) {
    scrollBtn.classList.add("show");
  } else {
    scrollBtn.classList.remove("show");
  }
});

// ================================
// Scroll-to-Top Function (Smooth)
// ================================
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// ================================
// Click Event Listener for "Scroll to Top" Button
// ================================
document
  .getElementById("scrollToTopBtn")
  .addEventListener("click", function (e) {
    e.preventDefault();
    scrollToTop();
  });

// ================================
// DOMContentLoaded Event Listener
// ================================
document.addEventListener("DOMContentLoaded", function () {
  // Set current year in footer
  const currentYear = new Date().getFullYear();
  document.getElementById("footerYear").textContent = currentYear;

  // Smooth scroll for all internal anchor links
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
});

async function fetchLastUpdated() {
  try {
    const response = await fetch(
      "https://api.github.com/repos/Jawad-Khalil/portfolio/commits?path=index.html&page=1&per_page=1"
    );
    const data = await response.json();

    if (data.length > 0) {
      const commitDate = new Date(data[0].commit.author.date);

      // Format date nicely (e.g., Sep 7, 2025)
      const options = { year: "numeric", month: "short", day: "numeric" };
      const formattedDate = commitDate.toLocaleDateString("en-US", options);

      // Update both header and footer
      document.getElementById("last-updated-header").textContent =
        "Last Updated: " + formattedDate;
      document.getElementById("last-updated-footer").textContent =
        "Updated on: " + formattedDate;
    } else {
      document.getElementById("last-updated-header").textContent =
        "No update info available.";
      document.getElementById("last-updated-footer").textContent =
        "No update info available.";
    }
  } catch (error) {
    console.error("Error fetching update date:", error);
    document.getElementById("last-updated-header").textContent =
      "Error loading update date.";
    document.getElementById("last-updated-footer").textContent =
      "Error loading update date.";
  }
}

fetchLastUpdated();
