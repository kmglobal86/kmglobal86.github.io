const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;
const scrollThreshold = 5;

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (Math.abs(currentScroll - lastScrollTop) < scrollThreshold) {
        return;
    }

    if (currentScroll <= 50) {
        navbar.classList.remove('navbar-hidden');
    } else if (currentScroll > lastScrollTop) {
        navbar.classList.add('navbar-hidden');
    } else {
        navbar.classList.remove('navbar-hidden');
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}, { passive: true });
