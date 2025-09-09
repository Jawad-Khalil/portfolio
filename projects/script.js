document.addEventListener("DOMContentLoaded", function () {
  // Smooth scroll to section if URL has hash
  const hash = window.location.hash;
  if (hash) {
    const targetElement = document.querySelector(hash);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  }

  // Scroll to Top button
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.style.display = "block";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  });

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Navigation menu toggle
  const menuBtn = document.getElementById("menuBtn");
  const navList = document.getElementById("navList");
  const navLinks = navList.querySelectorAll("a");

  menuBtn.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent closing when clicking the button
    navList.style.display =
      navList.style.display === "block" ? "none" : "block";
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navList.style.display = "none";
    });
  });

  // Close the menu if clicking outside
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!navList.contains(target) && target !== menuBtn) {
      navList.style.display = "none";
    }
  });
});

// OMContentLoaded Event Listener
document.addEventListener("DOMContentLoaded", function () {
  // Run when the DOM is fully loaded
  //This event fires when the initial HTML document has been completely loaded and parsed.
  const currentYear = new Date().getFullYear(); // Get the current year
  document.getElementById("footerYear").textContent = currentYear; // Set the current year in the footer
});

async function fetchProjectsLastUpdated() {
  try {
    const response = await fetch(
      "https://api.github.com/repos/Jawad-Khalil/portfolio/commits?path=projects/index.html&page=1&per_page=1"
    );
    const data = await response.json();

    if (data.length > 0) {
      const commitDate = new Date(data[0].commit.author.date);

      // Format date (e.g., Sep 9, 2025)
      const options = { year: "numeric", month: "short", day: "numeric" };
      const formattedDate = commitDate.toLocaleDateString("en-US", options);

      // Update header/footer
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

fetchProjectsLastUpdated();
