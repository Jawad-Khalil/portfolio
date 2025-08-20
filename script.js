// Function to toggle the menu visibility
function toggleMenu() {
  const menu = document.getElementById("menu"); // Retrieves the HTML element with the ID menu and stores it in a constant variable named "menu"
  menu.classList.toggle("active"); // Toggle the "active" class on the menu
}

//Scroll Event Listener
window.addEventListener("scroll", function () {
  // Adds an event listener for scrolling
  var scrollBtn = document.getElementById("scrollToTopBtn"); // Retrieves the HTML element with the ID scrollToTopBtn and stores it in a variable named "scrollBtn"
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    // Check if the page is scrolled down more than 20px. It checks the scrollTop property of both document.body (for Safari) and document.documentElement (for other browsers like Chrome, Firefox, IE, and Opera)
    scrollBtn.classList.add("show"); // it adds the show class to the scrollBtn element, making the button visible.
  } else {
    scrollBtn.classList.remove("show"); // If the user hasn’t scrolled more than 20 pixels from the top, it removes the show class from the scrollBtn element, hiding the button.
  }
});

// scrollToTop Function
function scrollToTop() {
  // Function to scroll the page to the top
  document.body.scrollTop = 0; // Scroll to top for Safari
  document.documentElement.scrollTop = 0; // Scroll to top for other browsers
}

// Click Event Listener for "Scroll to Top" Button
document
  .getElementById("scrollToTopBtn") // Get the "scroll to top" button by ID
  .addEventListener("click", function (e) {
    // Add a click event listener to the button
    // When the button is clicked, the anonymous function inside this event listener is executed. The e parameter represents the event object.
    e.preventDefault(); // Prevent the default action (if any)
    scrollToTop(); // Call the function to scroll to the top
  });

// OMContentLoaded Event Listener
document.addEventListener("DOMContentLoaded", function () {
  // Run when the DOM is fully loaded
  //This event fires when the initial HTML document has been completely loaded and parsed.
  const currentYear = new Date().getFullYear(); // Get the current year
  document.getElementById("footerYear").textContent = currentYear; // Set the current year in the footer
});
