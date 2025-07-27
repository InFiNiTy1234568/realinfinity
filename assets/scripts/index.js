document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
  
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);
  
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
  
      });
    });
  
  });
// Dropdown logic: show/hide dropdown on click/tap of .navbar-link

document.querySelectorAll('.navbar-item.has-dropdown > .navbar-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const parent = this.closest('.navbar-item.has-dropdown');
    // Close other open dropdowns (optional, for single open at a time)
    document.querySelectorAll('.navbar-item.has-dropdown.is-active').forEach(item => {
      if (item !== parent) item.classList.remove('is-active');
    });
    parent.classList.toggle('is-active');
  });
});

// Optional: close dropdown when clicking outside
document.addEventListener('click', function(e) {
  const dropdowns = document.querySelectorAll('.navbar-item.has-dropdown.is-active');
  dropdowns.forEach(dropdown => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('is-active');
    }
  });
});

// Footer visibility logic for mobile
const footer = document.querySelector('footer.footer');
if (footer) {
  function checkFooterVisibility() {
    if (window.innerWidth <= 1024) {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show footer when user is near the bottom of the page
      if (scrollTop + windowHeight >= documentHeight - 50) {
        footer.classList.add('visible');
      } else {
        footer.classList.remove('visible');
      }
    }
  }
  
  // Check on scroll and resize
  window.addEventListener('scroll', checkFooterVisibility);
  window.addEventListener('resize', checkFooterVisibility);
  
  // Initial check
  checkFooterVisibility();
}

// Set cell indices for staggered animation in social-media grid
document.addEventListener('DOMContentLoaded', () => {
  const socialMediaCells = document.querySelectorAll('#social-media .cell');
  socialMediaCells.forEach((cell, index) => {
    cell.style.setProperty('--cell-index', index);
  });
});