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
