document.addEventListener('DOMContentLoaded', () => {

    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
  
        const target = el.dataset.target;
        const $target = document.getElementById(target);
  
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
  
      });
    });
  
  });

document.querySelectorAll('.navbar-item.has-dropdown > .navbar-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const parent = this.closest('.navbar-item.has-dropdown');
    document.querySelectorAll('.navbar-item.has-dropdown.is-active').forEach(item => {
      if (item !== parent) item.classList.remove('is-active');

    });
    parent.classList.toggle('is-active');
  });
});

document.addEventListener('click', function(e) {
  const dropdowns = document.querySelectorAll('.navbar-item.has-dropdown.is-active');
  dropdowns.forEach(dropdown => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('is-active');
    }
  });
});

const footer = document.querySelector('footer.footer');
if (footer) {
  function checkFooterVisibility() {
    if (window.innerWidth <= 1024) {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      

      if (scrollTop + windowHeight >= documentHeight - 50) {
        footer.classList.add('visible');
      } else {
        footer.classList.remove('visible');
      }
    }
  }
  
  window.addEventListener('scroll', checkFooterVisibility);
  window.addEventListener('resize', checkFooterVisibility);
  
  checkFooterVisibility();
}

document.addEventListener('DOMContentLoaded', () => {
  const socialMediaCells = document.querySelectorAll('#social-media .cell');
  socialMediaCells.forEach((cell, index) => {
    cell.style.setProperty('--cell-index', index);
  });
});

// Force Bulma dark mode by adding the appropriate class to <html> if user prefers dark mode


